import React, { useEffect, useState } from "react";
import axios from "axios";
import Todocard from "../Todocard";
import { Link } from "react-router-dom";

function Home() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getall");
        setTodo(response.data.allUsers);
      } catch (error) {
        console.error("Error fetching todo items:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deletetodo/${id}`);
      setTodo(todo.filter(item => item._id !== id));
      console.log(`Todo item with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/updatetodo/${id}`, updatedData);
      setTodo(todo.map(item => (item._id === id ? { ...item, ...updatedData } : item)));
      console.log(`Todo item with ID ${id} updated successfully.`);
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {todo.map((item) => (
          <Todocard
            key={item._id}
            id={item._id}
            title={item.title}
            description={item.description}
            onDelete={() => handleDelete(item._id)}
            onEdit={handleUpdate}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to="/createtodo">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Create Todo
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
