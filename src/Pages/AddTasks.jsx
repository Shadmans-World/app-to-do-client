import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider";

const AddTasks = ({ onAddTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const {user} = useAuthProvider()
  // Function to handle form submission
  const onSubmit = (data) => {
    const newTask = {
      ...data,
      timestamp: new Date().toISOString(), // Auto-generated timestamp
      email: user.email
    };
    axiosPublic.post("/tasks", newTask).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "This tasks has been added",
          showConfirmButton: false,
          timer: 1500,
        });
        reset(); // Clear form after submission
        navigate('/tasks')
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    });
  };

  return (
    <div className="">
      <div className="px-5 w-full bg-white shadow-lg ">
        <h2 className="text-xl font-semibold mb-4 text-center">Add a New Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
                maxLength: 50,
              })}
              className="input input-bordered w-full"
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
  
          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", { maxLength: 200 })}
              className="textarea textarea-bordered w-full"
              placeholder="Enter task description (optional)"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">Max 200 characters allowed</p>
            )}
          </div>
  
          {/* Task Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              {...register("category")}
              className="select select-bordered w-full"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AddTasks;
