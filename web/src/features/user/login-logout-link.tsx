import React from "react";
import { RootState } from "../../main";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function loginlogoutLink() {
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  if (signedInUser) {
    return <NavLink to="/auth/logout">Sign Out</NavLink>;
  } else {
    return <NavLink to="/auth/login">Sign In</NavLink>;
  }
}

export default loginlogoutLink;
