import MessageInput from "../features/chat/message-input";
import MessageList from "../features/chat/message-list";

function Chatroom() {
  return (
    <>
      <h1 className="text-3xl font-bold">Chatroom Page</h1>
      <MessageList />
      <MessageInput />
    </>
  );
}

export default Chatroom;
