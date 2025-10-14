import express from "express";
import { Login, SignUp } from "../controllers/AuthControllers.js";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.json({ msg: "Testing the connection for the AuthRoutes" })
})

// login routes
routes.post("/login", Login);

// signup routes
routes.post("/sign-up", SignUp);

export default routes;
