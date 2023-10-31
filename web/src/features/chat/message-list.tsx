import { RootState } from "../../main";
import MessageListItem from "./message-list-item";
import { useSelector } from "react-redux";

function MessageList() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const signedInUser = useSelector(
    (state: RootState) => state.user.signedInUser
  );

  if (!signedInUser) return;

  return (
    <>
      <ul>
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            sendDirection={
              signedInUser.id === message.userId ? "outbound" : "inbound"
            }
          />
        ))}
      </ul>
    </>
  );
}

export default MessageList;
