import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Optional: You can decode the JWT here if needed
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/login", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    setUser({ email }); // You can decode the token if needed
    setIsAuthenticated(true);
    return token;
  };

  const signup = async (email, password) => {
    const res = await axios.post("/signup", { email, password });
    const token = res.data.access_token;
    localStorage.setItem("token", token);
    setUser({ email });
    setIsAuthenticated(true);
    return token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
