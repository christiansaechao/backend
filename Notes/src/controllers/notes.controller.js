import prisma from "../prisma/client.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    if (!notes.length) {
      return res.status(404).send({
        success: false,
        error: "Error trying to get all of the notes",
      });
    }

    return res.send({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.send({
        success: false,
        error: "No ID was passed as a parameter",
      });

    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!note)
      return res.status(404).send({
        success: false,
        error: "An incorrect id or one that doesn't exists was passed",
      });

    return res.json({ success: true, data: note });
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return res.json({
        success: false,
        error: "One of the required parameters were left empty.",
      });
    }

    const createNote = await prisma.note.create({
      data: { title: trimmedTitle, content: trimmedContent },
    });

    if (!createNote) {
      return res.status(403).json({
        success: false,
        error: "An error occurred when trying to create a note ",
      });
    }

    return res.status(201).json(createNote);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id, title, content } = req.body;

    const updatedNote = await prisma.note.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        content: content,
      },
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        error: "An error occurred when updating the note.",
      });
    }

    return res.status(203).json({ success: true, data: updatedNote });
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json({ success: true, data: deletedNote });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Note not found" });
    }
  }
};
