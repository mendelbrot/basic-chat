import { Outlet } from "react-router-dom";
import AuthProvider from "./auth-provider";

// convert AuthProvider so it can be treated as a layout by react router
const AuthProviderOutlet = () => (
  <AuthProvider>
    <Outlet />
  </AuthProvider>
);

export default AuthProviderOutlet;
