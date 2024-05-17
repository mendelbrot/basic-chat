import React from "react";
import AuthContext from "./auth-context";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../lib/use-local-storage";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    // TODO: call backend for token
    setUser(user);
    setToken(token);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    navigate("/auth/login");
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
