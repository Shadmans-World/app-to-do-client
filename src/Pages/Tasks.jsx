import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();

  const handleAddTasks = () => {
    navigate('/addTasks');
  };

  return (
    <div className="flex">
      {/* 3 cards */}
      <div></div>

      {/* Bottom right and fixed */}
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          onClick={handleAddTasks}
          className="relative group p-4 bg-blue-600 text-white rounded-full"
        >
          <IoAddCircleOutline className="text-4xl transition-transform group-hover:rotate-45" />
          
          {/* Hidden text that appears on hover */}
          <span className="w-24 text-black absolute left-1/2 bottom-14 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:bottom-16 transition-all duration-300">
            Add Task
          </span>
        </button>
      </div>
    </div>
  );
};

export default Tasks;
