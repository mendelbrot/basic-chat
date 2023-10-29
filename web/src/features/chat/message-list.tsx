import { Message } from "./message";
import MessageListItem from "./message-list-item";

const messages: Message[] = [
  {
    id: 1,
    userId: 1,
    content: "hello",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function MessageList() {
  return (
    <>
      <ul>
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message}
            sendDirection={"inbound"}
          />
        ))}
      </ul>
    </>
  );
}

export default MessageList;
