import React from "react";
import useAuth from "./use-auth";
import Login from "../../features/auth/login";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;

// https://blog.logrocket.com/authentication-react-router-v6/
