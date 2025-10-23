import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";

const App = express();

App.use(express.json());
App.use(cors());

App.get("/", (req, res) => {
  res.send({ msg: "Health check this is working correctly" });
});

App.use("/", AuthRoutes);

export default App;
