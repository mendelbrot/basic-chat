import React from "react";
import { RootState, store } from "../../main";
import { signIn } from "../../features/auth-usr-mgmt/auth-user-mgmt-slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  React.useEffect(() => {
    if (signedInUser) {
      navigate("/");
    }
  }, [navigate, signedInUser]);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <>
      <h1 className="text-3xl font-bold">Sign In Page</h1>
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
      <button onClick={() => store.dispatch(signIn(username, password))}>
        Sign in
      </button>
    </>
  );
}

export default SignIn;
