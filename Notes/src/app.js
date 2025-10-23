import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// custom middleware
import { requireAuth } from "./middleware/require.auth.js";
import { errorHandler } from "./middleware/error.handler.js";

// routes
import NotesRouter from "./routes/notes.routes.js";
import AuthRouter from "./routes/auth.routes.js";

const App = express();

// Middleware
App.use(express.json());
App.use(
  cors({
    origin: "http://localhost:5173", // your frontend’s exact URL
    credentials: true, // <-- this allows cookies
  })
);
App.use(cookieParser());

// health check
App.get("/", (req, res) => res.send({ msg: "health check" }));

// routes
App.use("/notes", requireAuth, NotesRouter);
App.use("/auth", AuthRouter);

App.use(errorHandler);

export default App;
