import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from "./components/TaskDetails";
import UpdatedTask from "./components/UpdatedTask";
import ToDo from "./components/ToDo";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/taskdetails" element={<TaskDetails />} />
          <Route path="/updatedtask/:id" element={<UpdatedTask />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
