import { Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signup" />;
};



export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  return user?.isAdmin === true ? children : <Navigate to="/" />;
};

