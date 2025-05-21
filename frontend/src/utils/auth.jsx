import { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const signup = async (email, password) => {
    const res = await axios.post("/signup", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
