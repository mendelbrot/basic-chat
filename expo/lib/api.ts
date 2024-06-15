import { JSONValue } from "@/lib/useStorageState";
import p from "@/lib/parameters";
import { storage } from "@/lib/useStorageState";
import { Session } from "./context/AuthContext";

const baseURL = p.serverURL;

export type CallServerOptions = {
  body?: JSONValue | null;
  token?: string | null;
  useTheSessionToken?: boolean;
};

export type CallServerReturnValue = {
  error?: string | null;
  data?: JSONValue | null;
};

const callServer = async (
  method: string,
  path: string,
  options: CallServerOptions = {}
): Promise<CallServerReturnValue> => {
  try {
    // set the options defaults
    if (typeof options.useTheSessionToken !== "boolean") {
      options.useTheSessionToken = true;
    }

    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    if (options.token && !options.useTheSessionToken) {
      headers.set("Authorization", `Bearer ${options.token}`);
    }

    if (options.useTheSessionToken) {
      const session = await storage.getItem<Session>("session");
      if (!session) {
        return { error: "Session token not found: session is null." };
      }
      headers.set("Authorization", `Bearer ${session.token}`);
    }

    const requestSettings: RequestInit = {
      method: method.toUpperCase(),
      headers,
    };

    if (options.body) {
      requestSettings.body = JSON.stringify(options.body);
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
