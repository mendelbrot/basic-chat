import React from "react";
import { RootState } from "../../main";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SignInSignOutLink() {
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  if (signedInUser) {
    return <NavLink to="/auth/sign-out">Sign Out</NavLink>;
  } else {
    return <NavLink to="/auth/sign-in">Sign In</NavLink>;
  }
}

export default SignInSignOutLink;
