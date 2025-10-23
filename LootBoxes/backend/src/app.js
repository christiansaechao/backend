import express from "express";
import PokemonRouter from "./routes/pokemon.routes.js";

const App = express();
App.use("/", PokemonRouter);

export default App;