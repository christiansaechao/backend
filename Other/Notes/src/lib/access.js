import jwt from "jsonwebtoken";

const exp = "15m";

// sign = create a token, verify = check if the token is the correct one

export const signAccessToken = (user) => {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: exp,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
