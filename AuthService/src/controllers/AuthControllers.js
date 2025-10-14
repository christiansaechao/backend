import bcrypt from "bcrypt";

const saltRounds = 12;

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    return res.json({ password, hashed_password: hashedPassword });
  } catch (err) {
    next(err);
  }
};

export const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return res.json({ password, hashed_password: hashedPassword });
  } catch (err) {
    next(err);
  }
};
