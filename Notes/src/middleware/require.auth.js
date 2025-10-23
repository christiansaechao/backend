import { verifyAccessToken } from "../lib/access.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // authorization: "Bearer sadlkfjasdfwigox43902pl;ksdafasdf"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    // we're adding a new property called user
    req.user = payload;
    console.log("User has been verified")
    next();
  } catch (err) {
    next(err);
  }
};
