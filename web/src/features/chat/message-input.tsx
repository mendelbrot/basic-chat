import { useSelector } from "react-redux";
import { RootState, store } from "../../main";
import { typeMessage, sendMessage } from "./chat-slice";

function MessageInput() {
  const draft = useSelector((state: RootState) => state.chat.draft);
  return (
    <>
      <textarea
        value={draft}
        onChange={(event) => store.dispatch(typeMessage(event.target.value))}
      />
      <button
        disabled={draft === ""}
        onClick={() => store.dispatch(sendMessage())}
      >
        Send
      </button>
    </>
  );
}

export default MessageInput;
