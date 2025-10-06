import express from "express";
import NotesRouter from './routes/notes.routes.js';

const App = express();

// Middleware
App.use(express.json());

// health check
App.get('/', (req, res) => res.send({ msg: "health check" }));

// routes
App.use('/notes', NotesRouter);

export default App;