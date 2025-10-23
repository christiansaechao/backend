import React, { useState } from "react";
import api from "../utils/api";

export const NewNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const clearInputs = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function createNewNote() {
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const postData = {
          title,
          content,
        };

        const { data } = await api.post("/notes", postData, options);
        clearInputs();
        console.log(data);
      } catch (err) {
        setError(err);
      }
    }

    createNewNote();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-center items-center gap-4 border-2 border-white">
        {/* Username */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center gap-4 border-2 border-white">
        {/* Email */}
        <label htmlFor="content">Content</label>
        <textarea
          type="text"
          name="content"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
