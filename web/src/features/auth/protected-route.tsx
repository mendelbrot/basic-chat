import { Navigate } from "react-router-dom";
import useAuth from "./use-auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

// https://blog.logrocket.com/authentication-react-router-v6/
