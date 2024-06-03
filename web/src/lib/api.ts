import { UserCredentials } from "../features/auth/auth-types";
import { Message } from "../features/chat/message-type";
import { User } from "../features/user/user-type";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function login(
  credentials: UserCredentials
): Promise<{ user: User; token: string }> {
  const request = new Request(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const response = await fetch(request);

  if (response.status !== 200) {
    throw new Error(`login response status ${response.status}`);
  }

  const { user, token } = await response.json();

  if (!user || !token) {
    throw new Error("user or token not supplied");
  }

  return {
    user,
    token,
  };
}

async function loadMessages(): Promise<Array<Message>> {
  const request = new Request(`${baseURL}/api/messages`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      authorization: JSON.parse(window.localStorage.getItem("token") as string),
    },
  });

  const response = await fetch(request);

  if (response.status !== 200) {
    throw new Error(`/api/messages response status ${response.status}`);
  }

  const messages = await response.json();

  return messages;
}

async function sendMessage(content: string): Promise<Message> {
  const request = new Request(`${baseURL}/api/messages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: JSON.parse(window.localStorage.getItem("token") as string),
    },
    body: JSON.stringify({ content }),
  });

  const response = await fetch(request);

  if (response.status !== 201) {
    throw new Error(`/api/messages response status ${response.status}`);
  }

  const message = await response.json();

  return message;
}

const api = {
  login,
  loadMessages,
  sendMessage,
};

export default api;
