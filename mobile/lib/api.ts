import { Session, UserCredentials } from "./auth/ctx";
import { Message } from "../types/message-type";
import { User } from "../types/user-type";
import React from "react";

const baseURL = process.env.API_URL || "http://localhost:8000";

const login = async (credentials: UserCredentials): Promise<Session> => {
  const request = new Request(`${baseURL}/api/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const response = await fetch(request);

  const { user, token, error } = await response.json();

  if (error) {
    throw new Error(error);
  }

  if (!user || !token) {
    throw new Error("user or token not returned from server");
  }

  return {
    user,
    token,
  };
}

const loadMessages = async (): Promise<Array<Message>> => {
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

const sendMessage = async (content: string): Promise<Message> => {
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
