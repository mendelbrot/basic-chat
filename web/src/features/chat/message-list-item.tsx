import { Message } from "./message-type";

type MessageListItemProps = {
  message: Message;
  outbound: boolean;
};

const inboundStyle =
  "inline-block bg-blue-600 rounded-full p-2 px-6 text-white";

const outboundStyle =
  "inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700";

function MessageListItem({ message, outbound }: MessageListItemProps) {
  return (
    <li>
      <div className="flex-1 px-2">
        <div className={outbound ? outboundStyle : inboundStyle}>
          <span>{message.content}</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">{message.createdAt}</small>
        </div>
      </div>
    </li>
  );
}

export default MessageListItem;
