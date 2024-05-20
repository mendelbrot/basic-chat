import MessageInput from "../features/chat/message-input";
import MessageList from "../features/chat/message-list";

function Chatroom() {
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
