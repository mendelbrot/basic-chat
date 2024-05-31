import { ExtendedError } from "socket.io/dist/namespace";

export type SocketNextFunction = (err?: ExtendedError | undefined) => void