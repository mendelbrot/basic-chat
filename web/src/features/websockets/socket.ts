import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? window.location.href
    : "http://localhost:8000";

const socket = io(URL, {
  autoConnect: false,
  auth: (callBack) => {
    callBack({
      token: JSON.parse(window.localStorage.getItem("token") as string),
    });
  },
});

export default socket;

// https://socket.io/how-to/use-with-react
