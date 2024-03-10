import React, { useState, useEffect } from "react";
import axios from "axios";
// import UpdatedTask from "./UpdatedTask";

const TaskDetails = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    datafetch();
  });
  const datafetch = async () => {
    try {
      const response = await axios.get("http://localhost:8082/cruds");
      setDatas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-zinc-900 text-white ">
      <div className="w-[80%] h-[80%]">
        <h1 className="text-5xl font-semibold text-center mb-10">
          Task Details
        </h1>
        {datas.map((data) => (
          <li className="list-decimal mb-5" key={data._id}>
            {data.name} - {data.description}
          </li>
        ))}
      </div>
    </div>
  );
};

export default TaskDetails;
