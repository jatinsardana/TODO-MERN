import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TodoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      const res = await axios.post("http://localhost:3000/createtodo", {
        title: title,
        description: description,
        tag: tag,
      });
      console.log("done");
      navigate("/getall");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto m-10">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title 
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tag" className="block text-gray-700 font-bold mb-2">
          Tag
        </label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
