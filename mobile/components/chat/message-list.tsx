import { RootState } from "../../main";
import MessageListItem from "./message-list-item";
import { useSelector } from "react-redux";
import useAuth from "../auth/use-auth";

function MessageList() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const auth = useAuth();

  return (
    <ul>
      {messages.map((message) => (
        <MessageListItem
          key={message.id}
          message={message}
          outbound={auth.user?.id === message.userId}
        />
      ))}
    </ul>
  );
}

export default MessageList;
