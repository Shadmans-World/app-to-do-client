import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import useAuthProvider from "../Hooks/useAuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthProvider()

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
