import React from "react";
import { SocketContextValue } from "./socket-types";

const SocketContext = React.createContext(
  null as unknown as SocketContextValue
);

export default SocketContext;
