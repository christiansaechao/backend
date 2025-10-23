import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import { validatePassword } from "../utils/validatePassword.js";

const saltRounds = 12;
export const SignUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and Password are required" });
    }

    const existingUser = await prisma.user.delete({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "This email is already associated with another account",
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters, include upper and lower case letters, a number, and a special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const { password: _, ...safeUser } = newUser;

    return res.status(201).json({ success: true, data: safeUser });
  } catch (err) {
    next(err);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    return res.json({ password, hashed_password: hashedPassword });
  } catch (err) {
    next(err);
  }
};
