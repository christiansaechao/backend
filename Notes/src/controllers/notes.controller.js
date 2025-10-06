import prisma from "../prisma/client.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (err) {
    console.error(err);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send({ error: "No ID was passed as a parameter" });

    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!note)
      res.send({
        error: "An incorrect id or one that doesn't exists was passed",
      });

    res.json(note);
  } catch (err) {
    console.error(err);
  }
};

export const createNote = async (req, res) => {
  console.log(req.body);
  try {
    const { title, content } = req.body;
    const createNote = await prisma.note.create({ data: { title, content } });
    res.status(201).json(createNote);
  } catch (err) {
    console.error(err);
  }
};

export const updateNote = (req, res) => {};

export const deleteNote = (req, res) => {};
