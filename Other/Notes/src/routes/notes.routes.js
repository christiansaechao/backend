import express from "express";
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.controller.js";

const router = express.Router();

// all routes prefixed by /notes

router.get("/", getNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
// router.put('/notes/:id', );
// router.delete('/notes/:id', )

export default router;
