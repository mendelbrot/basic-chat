import React from "react";
import { AuthContextValue } from "./auth-types";

const AuthContext = React.createContext(null as AuthContextValue);

export default AuthContext;

// https://blog.logrocket.com/authentication-react-router-v6/
