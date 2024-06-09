import JSONValue from "@/types/json-value-type";

const baseURL = process.env.API_URL || "http://localhost:8000";

export type CallServerReturnValue = {
  error?: string | null;
  data?: JSONValue | null;
};

const callServer = async (
  method: string,
  path: string,
  body: JSONValue | undefined = undefined,
  token: string | null | undefined = undefined
): Promise<CallServerReturnValue> => {
  try {
    const headers = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });

    if (token) {
      headers.set("Authorization", token);
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
    return { error: "client or network error. Server was not reachable." };
  }
};

const api = {
  callServer
};

export default api;
