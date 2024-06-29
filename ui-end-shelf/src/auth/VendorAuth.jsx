import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const VendorAuth = ({ children }) => {
  const { isAuthenticated, isVendor } = useAuth();
  return isAuthenticated && isVendor ? children : <Navigate to="/" />;
};

export default VendorAuth;