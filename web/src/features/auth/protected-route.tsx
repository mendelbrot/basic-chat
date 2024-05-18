import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./use-auth";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

// https://blog.logrocket.com/authentication-react-router-v6/
