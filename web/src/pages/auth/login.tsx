import React from "react";
import useAuth from "../../features/auth/use-auth";

function Login() {
  const auth = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <div>
      <h1 className="text-3xl font-bold">Login Page</h1>

      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={() => auth.login({ username, password })}>Login</button>
    </div>
  );
}

export default Login;
