import useAuth from "./features/auth/use-auth";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const auth = useAuth();

  return (
    auth.user && (
      <div>
        <div className="border-b-2 border-gray-600 flex justify-between">
          <div className="p-4">{auth.user.username}</div>
          <div className="flex flex-col p-4">
            <button onClick={auth.logout}>logout</button>
          </div>
        </div>
        {children}
      </div>
    )
  );
}

export default Layout;
