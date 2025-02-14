import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children } : any) => {
  const [user, setUser] = useState(null); // Store user data (e.g., JWT, user object)
  const navigate = useNavigate();

  const login = ({userData}: any)  => {
    setUser(userData);
    localStorage.setItem("user", userData);
  };

  const logout = () => {
    setUser(null);
    // Clear session or token
    localStorage.removeItem("user");
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div>
    {/* 
    // @ts-ignore */}
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
    </div>
  );
};
