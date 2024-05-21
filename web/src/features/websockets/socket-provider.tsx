import React from "react";
import SocketContext from "./socket-context";
import { SocketContextValue } from "./socket-types";
import socket from "./socket";
import { store } from "../../main";
import { loadMessages } from "../chat/chat-slice";

type Props = {
  children: React.ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [lastMessageEvent, setLastMessageEvent] = React.useState(null);

  React.useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onBroadcastMessageCreate(value) {
      setLastMessageEvent(value);
      store.dispatch(loadMessages());
    }
    console.log("subscribing");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("broadcast:message:create", onBroadcastMessageCreate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("broadcast:message:create", onBroadcastMessageCreate);
    };
  }, []);

  const value: SocketContextValue = {
    isConnected,
    lastMessageEvent,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;

// https://blog.logrocket.com/Socketentication-react-router-v6/
