import React from "react";
import MessageInput from "../features/chat/message-input";
import MessageList from "../features/chat/message-list";
import { loadMessages } from "../features/chat/chat-slice";
import { store } from "../main";
import socket from "../features/websockets/socket";

function Chatroom() {
  React.useEffect(() => {
    store.dispatch(loadMessages());
    socket.connect();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold p-4">Chat</h1>
      <MessageList />
      <MessageInput />
    </>
  );
}

export default Chatroom;

// https://github.com/envomer/tailwindcss-chat/tree/master
