import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isLogged = localStorage.getItem("access_token");
  const vendorId = localStorage.getItem("vendor_id");
  const userRole = localStorage.getItem("user_role");
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!isLogged);
  const [isVendor, setIsVendor] = useState(!!vendorId && userRole === "vendor");
  const [isAdmin, setIsAdmin] = useState(userRole === "admin");

  const login = (data) => {

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_role", data.user_role);
    if (data.vendor_id) {
      localStorage.setItem("vendor_id", data.vendor_id);
      setIsVendor(true);
    }
    setIsAuthenticated(true);
    setIsAdmin(data.user_role === "admin");
    localStorage.setItem("user_id", data.user_id);
  }
    
  const logout = () => {
    setIsAuthenticated(false);
    setIsVendor(false);
    setIsAdmin(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("vendor_id");
    localStorage.removeItem("user_role");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,  isVendor, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
