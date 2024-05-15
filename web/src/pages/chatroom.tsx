import MessageInput from "../features/chat/message-input";
import MessageList from "../features/chat/message-list";
import WithSignedIn from "../features/auth-usr-mgmt/with-signed-in";

function Chatroom() {
  return (
    <>
      <h1 className="text-3xl font-bold">Chatroom Page</h1>
      <MessageList />
      <MessageInput />
    </>
  );
}

const ChatroomPage = WithSignedIn(Chatroom);
export default ChatroomPage;
