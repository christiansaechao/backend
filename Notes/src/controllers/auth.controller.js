import bcrypt from "bcrypt";
import crypto from "crypto";
import { signAccessToken } from "../lib/access.js";
import { generateRefreshToken, validateRefreshToken } from "../lib/refresh.js";
import prisma from "../prisma/client.js";

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.send({
        success: false,
        error: "One of the required fields is missing.",
        data: null,
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      return res.send({
        success: false,
        data: null,
        error: "A user with that username or email already exists.",
      });
    }

    // password -> algorithm function -> test -> xicjopjretkjlkjoixcksdfasdf
    // sha-256 (hashing algorithm)
    // bcrypt.hash(whatever text to hash, how many salt rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    const accessToken = signAccessToken(user); // creating the jwt, session identifier
    const { refreshToken, hashedToken } = generateRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userId: req.user.sub,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send({ success: true, data: user, accessToken });
  } catch (err) {
    next(err);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.send({
        success: false,
        data: null,
        error: "The username or password was not provided.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.send({
        success: false,
        data: null,
        error: "There was no user found with that email and password.",
      });
    }

    // compare the password that we stored on the database with the password the user entered on the client side
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.send({
        success: false,
        data: null,
        error:
          "The password that was provided was incorrect. Please try again.",
      });
    }

    const accessToken = signAccessToken(user);
    const { refreshToken, hashedToken } = generateRefreshToken();

    await prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true },
    });

    await prisma.refreshToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.clearCookie("refreshToken");
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("cookie being set");

    res.send({
      success: true,
      data: user,
      error: null,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const Refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "Missing refresh token" });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const dbToken = await prisma.refreshToken.findUnique({
      where: {
        token: hashedToken,
      },
      include: { user: true },
    });

    const isValidToken = validateRefreshToken(token, dbToken.token);
    if (!dbToken || dbToken.revoked || dbToken.expiresAt < new Date() || !isValidToken)
      return res
        .status(401)
        .json({ error: "Invalid or expired refresh token" });

    const accessToken = signAccessToken(dbToken.user);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};
