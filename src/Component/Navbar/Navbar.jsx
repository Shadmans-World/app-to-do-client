import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthProvider from "../../Hooks/useAuthProvider";

const Navbar = () => {
  const { user, logOut, setLoading } = useAuthProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true); // Indicate loading before logout
      await logOut();
      setLoading(false);
      navigate("/"); // Redirect after setting loading state
    } catch (error) {
      setLoading(false);
      console.error("Logout Error:", error.message);
      alert("Failed to log out. Please try again!"); // User-friendly error message
    }
  };

  return (
    <div className="flex items-center justify-between px-5 mb-2 bg-gray-100 w-full h-14 shadow-md">
      <Link to={'/tasks'} className="text-xl font-bold">Task Manager</Link>
      {user && (
        <button onClick={handleLogout} className="btn btn-primary">
          Log out
        </button>
      )}
    </div>
  );
};

export default Navbar;
