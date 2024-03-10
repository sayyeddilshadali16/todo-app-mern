import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdatedTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  console.log(id);

  const updateData = async () => {
    try {
      await axios.put(`http://localhost:8082/cruds/${id}`, {
        name,
        description,
      });
      setName("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, [id]);

  const dataFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:8082/cruds/${id}`);
      console.log(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={updateData} >
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
          <button>Update Task</button>
      </form>
    </div>
  );
};

export default UpdatedTask;
