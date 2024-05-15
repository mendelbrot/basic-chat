import { Outlet } from "react-router-dom";
import UserInfo from "./features/auth-usr-mgmt/user-info";
import SignInSignOutLink from "./features/auth-usr-mgmt/sign-in-sign-out-link";

function Layout() {
  return (
    <div>
      <div className="border-b-2 border-gray-600 flex justify-between">
        <div></div>
        <div className="flex flex-col">
          <UserInfo />
          <SignInSignOutLink />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
