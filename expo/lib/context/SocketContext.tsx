import { io } from "socket.io-client";
import p from "@/lib/parameters";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { mainDispatchers, useMainDispatch } from "@/lib/context/MainContext";
import { Session, useAuth } from "@/lib/context/AuthContext";
import { storage } from "@/lib/useStorageState";

export const socket = io(p.serverURL, {
  autoConnect: false,
  auth: async (callBack) => {
    const session = await storage.getItem<Session>("session");
    if (session) {
      callBack({
        token: session.token,
      });
    }
  },
});

export type SocketContextValue = {
  isConnected: boolean;
  lastMessageEvent: string | null;
};

const initialSocketContextValue = {
  isConnected: false,
  lastMessageEvent: null,
};

export const SocketContext = createContext<SocketContextValue>(
  initialSocketContextValue
);

const SocketProvider = (props: PropsWithChildren) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessageEvent, setLastMessageEvent] = useState<string | null>(null);
  const { session } = useAuth();

  const dispatch = useMainDispatch();

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function onBroadcastMessageCreate(value: string | null) {
    setLastMessageEvent(value);
    mainDispatchers.fetchMessages(dispatch);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("broadcast:message:create", onBroadcastMessageCreate);

    if (session) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("broadcast:message:create", onBroadcastMessageCreate);
    };
  }, [session, dispatch]);

  const value: SocketContextValue = {
    isConnected,
    lastMessageEvent,
  };

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

// https://blog.logrocket.com/Socketentication-react-router-v6/
// https://socket.io/how-to/use-with-react
