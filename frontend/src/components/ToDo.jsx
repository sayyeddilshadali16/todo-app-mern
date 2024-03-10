import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ToDo = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dataFetch();
  }, []);

  const dataFetch = async () => {
    try {
      const response = await axios.get("http://localhost:8082/cruds");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addingData = async (e) => {
    e.preventDefault();
    try {
      if (!editingId) {
        await axios.post("http://localhost:8082/cruds", { name, description });
      } else {
        await axios.put(`http://localhost:8082/cruds/${editingId}`, {
          name,
          description,
        });
        setEditingId(null);
      }
      dataFetch();
      setName("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const dataDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/cruds/${id}`);
      dataFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (data) => {
    setEditingId(data._id);
    setName(data.name);
    setDescription(data.description);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="h-screen w-full bg-zinc-900 text-white flex items-center justify-center">
      <div className="h-[80%] w-[80%] p-10">
        <h1 className="text-3xl text-center mb-9">To Do List</h1>
        <form onSubmit={addingData} className="flex gap-10">
          <input
            type="text"
            placeholder="Add title"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="p-2 rounded-md outline-none focus:border-sky-500 text-black"
          />
          <input
            type="text"
            placeholder="Add description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="p-2 rounded-md outline-none focus:border-sky-500 w-[650px] text-black"
          />
          <button className="bg-zinc-400 rounded-md w-56 font-semibold">
            {editingId ? "Update Task" : "Add Task"}
          </button>
        </form>
        <div className="mt-5">
          {items.map((item) => (
            <div
              className="flex items-center justify-between gap-10"
              key={item._id}
            >
              <div class="w-[80%] flex items-center ps-4 border mt-2 border-gray-200 rounded dark:border-gray-700">
                <input
                  onChange={handleChecked}
                  id="bordered-checkbox-1"
                  type="checkbox"
                  value=""
                  name="bordered-checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="bordered-checkbox-1"
                  className={`w-full py-2 ms-2 font-medium text-gray-900 dark:text-gray-300 ${
                    isChecked ? "line-through" : "decoration-none"
                  }`}
                >
                  {item.name} - {item.description}
                </label>
              </div>
              <div className="w-[20%] flex items-center justify-center gap-10">
                <button
                  className="bg-sky-500 p-2 rounded-md  w-[35px]"
                  onClick={() => {
                    handleEdit(item);
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  className="bg-red-500 p-2 rounded-md w-[35px]"
                  onClick={() => {
                    dataDelete(item._id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[100px]">
        <Navigation />
      </div>
    </div>
  );
};

export default ToDo;
