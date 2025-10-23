import { useLoaderData } from "react-router-dom";
import api from "../utils/api";
import { useUserStore } from '../store/useUserStore';

export async function notesLoader() {
  try {
    const { data } = await api.get("/notes");

    if (!data.success) {
      throw new Response("Getting notes was unsuccessful", { status: 400 });
    }

    return data.data; // return the array of notes directly
  } catch (err) {
    // You can throw to trigger an error boundary, or handle gracefully
    throw new Response("Failed to load notes", { status: 500, error: err });
  }
}

export const DisplayNotes = () => {
  const notes = useLoaderData();

  return (
    <div>
      {!notes.length ? (
        <h3>No notes to display</h3>
      ) : (
        notes.map((note, index) => (
          <div key={note.title + index} className="p-4 border-2 border-white w-40">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
};
