import { Link, Outlet } from "react-router-dom";
import useAuth from "./features/auth/use-auth";

function Layout() {
  console.log(useAuth());
  const auth = useAuth();

  return (
    <div>
      <div className="border-b-2 border-gray-600 flex justify-between">
        <div>{auth.user && auth.user.username}</div>
        <div className="flex flex-col">
          {auth.user ? (
            <a href="#!" onClick={auth.logout}>
              Log Out
            </a>
          ) : (
            <Link to={"/auth/login"}>Log In</Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
