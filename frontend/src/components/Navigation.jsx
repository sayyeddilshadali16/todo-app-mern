import { NavLink } from "react-router-dom";
import React from "react";

const Navigation = () => {
  return (
    <div>
      <button className="px-4 py-2 rounded-md bg-purple-500 text-white no-underline">
        <NavLink to="/taskdetails">Task Details</NavLink>
      </button>
    </div>
  );
};

export default Navigation;
