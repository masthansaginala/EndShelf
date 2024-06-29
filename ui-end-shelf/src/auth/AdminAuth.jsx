import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminAuth = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
};

export default AdminAuth;