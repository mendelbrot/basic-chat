import { Message } from "./message";

type MessageListItemProps = {
  message: Message;
  sendDirection: 'outbound' | 'inbound';
};

function MessageListItem({ message }: MessageListItemProps) {
  return (
    <li>
      <div>{message.content}</div>
    </li>
  );
}

export default MessageListItem;
