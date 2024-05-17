import React from "react";
import { RootState } from "../../main";
import { useSelector } from "react-redux";

function UserInfo() {
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  return signedInUser && <span>{signedInUser.username}</span>;
}

export default UserInfo;
