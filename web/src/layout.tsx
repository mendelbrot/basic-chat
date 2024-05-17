import { Outlet } from "react-router-dom";
import UserInfo from "./features/user/user-info";
import loginlogoutLink from "./features/user/login-logout-link";

function Layout() {
  return (
    <div>
      <div className="border-b-2 border-gray-600 flex justify-between">
        <div></div>
        <div className="flex flex-col">
          <UserInfo />
          <loginlogoutLink />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
