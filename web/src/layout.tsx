import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <div className="border-b-2 border-gray-600">
        <NavLink to="/auth/sign-in">Sign In</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
