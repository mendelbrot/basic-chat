import React from "react";
import useAuth from "../../features/auth/use-auth";
import ErrorToast from "../../lib/error-toast";

function Login() {
  const auth = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("ok");

  const dismissError = () => {
    setStatus("ok");
  };

  const login = async () => {
    const status = await auth.login({ username, password });
    setStatus(status);
  };
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-xs">
          {status === "error" && <ErrorToast dismissError={dismissError} />}
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                data-cy="username-input"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                data-cy="password-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                data-cy="login-button"
                type="button"
                onClick={login}
              >
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
