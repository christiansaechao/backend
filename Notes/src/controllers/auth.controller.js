import bcrypt from "bcrypt";
import { signAccessToken } from "../lib/access.js";
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

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = signAccessToken(user);

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
    res.send({ success: true, data: user, error: null, accessToken});
  } catch (err) {
    next(err);
  }
};
