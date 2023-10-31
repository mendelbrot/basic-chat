import { useNavigate } from "react-router-dom";
import MessageInput from "../features/chat/message-input";
import MessageList from "../features/chat/message-list";
import { useSelector } from "react-redux";
import { RootState } from "../main";
import React from "react";

function Chatroom() {
  const navigate = useNavigate();
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  React.useEffect(() => {
    if (!signedInUser) {
      navigate("/auth/sign-in");
    }
  }, [navigate, signedInUser]);

  return (
    <>
      <h1 className="text-3xl font-bold">Chatroom Page</h1>
      <MessageList />
      <MessageInput />
    </>
  );
}

export default Chatroom;
