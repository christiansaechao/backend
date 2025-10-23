import express from "express";
import { Login, SignUp } from "../controllers/AuthControllers.js";

const routes = express.Router();

// signup routes
routes.post("/sign-up", SignUp);

// login routes
routes.post("/login", Login);

export default routes;
