import React from "react";
import AuthContext from "./auth-context";
import { useLocation } from "wouter";
import { useLocalStorage } from "../../lib/use-local-storage";
import { UserCredentials } from "./auth-types";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [_location, navigate] = useLocation();

  const login = async (credentials: UserCredentials) => {
    // TODO: call backend for token
    const user = { username: credentials.username };
    const token = "sometoken";
    setUser(user);
    setToken(token);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/");
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// https://blog.logrocket.com/authentication-react-router-v6/
