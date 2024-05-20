import React from "react";
import AuthContext from "./auth-context";
import { useLocation } from "wouter";
import { useLocalStorage } from "../../lib/use-local-storage";
import { UserCredentials } from "./auth-types";
import api from "../../lib/api";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [_location, navigate] = useLocation();

  const login = async (
    credentials: UserCredentials
  ): Promise<"ok" | "error"> => {
    try {
      const { user, token } = await api.login(credentials);

      setUser(user);
      setToken(token);
      navigate("/");

      return "ok";
    } catch (error) {
      return "error";
    }
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
