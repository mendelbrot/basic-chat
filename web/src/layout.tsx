import useAuth from "./features/auth/use-auth";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const auth = useAuth();
  console.log(auth);

  return (
    auth.user && (
      <div>
        <div className="border-b-2 border-gray-600 flex justify-between">
          <div>{auth.user.username}</div>
          <div className="flex flex-col">
            <button onClick={auth.logout}>logout</button>
          </div>
        </div>
        {children}
      </div>
    )
  );
}

export default Layout;
