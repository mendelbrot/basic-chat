import { JSONValue } from "@/lib/useStorageState";
import p from "@/lib/parameters";
import { storage } from "@/lib/useStorageState";
import { Session } from "./context/AuthContext";

const baseURL = p.serverURL;

export type CallServerReturnValue = {
  error?: string | null;
  data?: JSONValue | null;
};

const callServer = async (
  method: string,
  path: string,
  body: JSONValue | undefined = undefined,
  token: "USE_SESSION_TOKEN" | string | null | undefined = undefined
): Promise<CallServerReturnValue> => {
  try {
    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    if (token) {
      if (token === "USE_STORAGE_TOKEN") {
        const session = await storage.getItem<Session>("session");
        if (!session) {
          return { error: "Session token not found: session is null." };
        }
        headers.set("Authorization", session.token)
      } else {
        headers.set("Authorization", token);
      }
    }

    const requestSettings: RequestInit = {
      method: method.toUpperCase(),
      headers,
    };

    if (body) {
      requestSettings.body = JSON.stringify(body);
    }

    const request = new Request(`${baseURL}/api/${path}`, requestSettings);

    const response = await fetch(request);

    const { data, error } = await response.json();

    if (!data && !error) {
      return {
        error: `${response.status}: Server response was not in expected format.`,
      };
    }

    return {
      data,
      error,
    };
  } catch (error) {
    return { error: "Client or network error: server was not reachable." };
  }
};

const api = {
  callServer,
};

export default api;
