import React, { useState } from "react";

function Todocard({ id, title, description, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(id, { title: updatedTitle, description: updatedDescription });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-2">
      <div className="bg-gray-700 text-white px-4 py-2 flex justify-between items-center">
        {!isEditing ? (
          <h3 className="text-2xl font-semibold">
            <b className="text-black">Title : </b>
            {title}
          </h3>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border rounded px-2 py-1 mr-2 text-black"
            />
            <input
              type="text"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border rounded px-2 py-1 mr-2 text-black"
            />
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </form>
        )}
        <div>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            {!isEditing ? "Edit" : "Cancel"}
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      {!isEditing && (
        <div className="p-4">
          <h1 className="text-gray-700 text-xl">
            <b className="text-black">Description : </b>
            {description}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Todocard;
