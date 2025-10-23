import express from "express";
import { saveData, getCards } from "../controllers/pokemon.controllers.js";

const routes = express.Router();

routes.get("/cards", getCards);
routes.post("/saveData", saveData);

export default routes;
