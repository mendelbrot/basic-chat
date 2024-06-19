import {
  createContext,
  useReducer,
  PropsWithChildren,
  useContext,
  Dispatch,
} from "react";
import api from "@/lib/api";

export type Message = {
  id: number;
  senderId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  username: string;
  activeAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DraftMessage = { text: string };

export type UsernameLookup = { [key: number]: string };

export type WorkingState =
  | "messages:fetch"
  | "users:fetch"
  | "everything:fetch"
  | "message:send";

export type SendingState = "message";

export type MainState = {
  messages: Message[];
  failedMessages: DraftMessage[];
  users: User[];
  usernameLookup: UsernameLookup;
  error: string | null;
  workingState: WorkingState | null;
};

const initialMainState: MainState = {
  messages: [],
  failedMessages: [],
  users: [],
  usernameLookup: {},
  error: null,
  workingState: null,
};

type Action1 = {
  type: "working:start";
  payload: {
    workingState: WorkingState;
  };
};

type Action2 = {
  type: "messages:fetch";
  payload: {
    messages: Message[];
  };
};

type Action3 = {
  type: "users:fetch";
  payload: {
    users: User[];
  };
};

type Action4 = {
  type: "everything:fetch";
  payload: {
    messages: Message[];
    users: User[];
  };
};

type Action5 = {
  type: "message:send";
  payload: {
    message: Message;
  };
};

type Action6 = {
  type: "failed-message:delete";
  payload: {
    index: number;
  };
};

type Action7 = {
  type: "failed-message:resend";
  payload: {
    message: Message;
    index: number;
  };
};

type Action8 = {
  type: "general-error:handle";
  payload: {
    error: string | null;
  };
};

type Action9 = {
  type: "message-send-error:handle";
  payload: {
    failedMessage: DraftMessage;
    error: string | null;
  };
};

type Action10 = {
  type: "error:dismiss";
};

export type MainAction =
  | Action1
  | Action2
  | Action3
  | Action4
  | Action5
  | Action6
  | Action7
  | Action8
  | Action9
  | Action10;

const mainReducer = (state: MainState, action: MainAction): MainState => {
  switch (action.type) {
    case "working:start": {
      return {
        ...state,
        error: null,
        workingState: action.payload.workingState,
      };
    }
    case "messages:fetch": {
      return {
        ...state,
        messages: action.payload.messages,
        workingState: null,
      };
    }
    case "users:fetch": {
      const usernameLookup = action.payload.users.reduce((acc, item) => {
        acc[item.id] = item.username;
        return acc;
      }, {} as UsernameLookup);
      return {
        ...state,
        users: action.payload.users,
        usernameLookup,
        workingState: null,
      };
    }
    case "everything:fetch": {
      const usernameLookup = action.payload.users.reduce((acc, item) => {
        acc[item.id] = item.username;
        return acc;
      }, {} as UsernameLookup);
      return {
        ...state,
        messages: action.payload.messages,
        users: action.payload.users,
        usernameLookup,
        workingState: null,
      };
    }
    case "message:send": {
      return {
        ...state,
        // messages: [...state.messages, action.payload.message],
        workingState: null,
      };
    }
    case "failed-message:delete": {
      return {
        ...state,
        failedMessages: state.failedMessages.filter(
          (_: any, index: number) => index !== action.payload.index
        ),
        workingState: null,
      };
    }
    case "failed-message:resend": {
      return {
        ...state,
        // messages: [...state.messages, action.payload.message],
        failedMessages: state.failedMessages.filter(
          (_: any, index: number) => index !== action.payload.index
        ),
        workingState: null,
      };
    }
    case "general-error:handle": {
      return {
        ...state,
        error: action.payload.error,
        workingState: null,
      };
    }
    case "message-send-error:handle": {
      return {
        ...state,
        failedMessages: [...state.failedMessages, action.payload.failedMessage],
        error: action.payload.error,
        workingState: null,
      };
    }
    case "error:dismiss": {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
};

const fetchMessages = async (dispatch: Dispatch<MainAction>) => {
  dispatch({
    type: "working:start",
    payload: { workingState: "messages:fetch" },
  });

  const { error, data: messages } = await api.callServer("GET", "messages");

  if (error) {
    dispatch({ type: "general-error:handle", payload: { error } });
    return;
  }

  dispatch({
    type: "messages:fetch",
    payload: { messages: messages as Message[] },
  });
};

const fetchUsers = async (dispatch: Dispatch<MainAction>) => {
  dispatch({ type: "working:start", payload: { workingState: "users:fetch" } });

  const { error, data: users } = await api.callServer("GET", "users");

  if (error) {
    dispatch({ type: "general-error:handle", payload: { error } });
    return;
  }

  dispatch({ type: "users:fetch", payload: { users: users as User[] } });
};

const fetchEverything = async (dispatch: Dispatch<MainAction>) => {
  dispatch({
    type: "working:start",
    payload: { workingState: "everything:fetch" },
  });

  const { error: messagesError, data: messages } = await api.callServer(
    "GET",
    "messages"
  );

  if (messagesError) {
    dispatch({
      type: "general-error:handle",
      payload: { error: messagesError },
    });
    return;
  }

  const { error: usersError, data: users } = await api.callServer(
    "GET",
    "users"
  );

  if (usersError) {
    dispatch({ type: "general-error:handle", payload: { error: usersError } });
    return;
  }

  dispatch({
    type: "everything:fetch",
    payload: { messages: messages as Message[], users: users as User[] },
  });
};

const sendMessage = async (
  dispatch: Dispatch<MainAction>,
  draft: DraftMessage
) => {
  dispatch({
    type: "working:start",
    payload: { workingState: "message:send" },
  });

  const { error, data: message } = await api.callServer("POST", "messages", {
    body: draft,
  });

  if (error) {
    dispatch({
      type: "message-send-error:handle",
      payload: { error, failedMessage: draft as DraftMessage },
    });
    return;
  }

  dispatch({
    type: "message:send",
    payload: { message: message as Message },
  });
};

const deleteFailedMessage = (dispatch: Dispatch<MainAction>, index: number) => {
  console.log("deleteFailedMessage")
  dispatch({ type: "failed-message:delete", payload: { index } });
};

const resendFailedMessage = async (
  dispatch: Dispatch<MainAction>,
  draft: DraftMessage,
  index: number
) => {
  console.log("resendFailedMessage")
  dispatch({
    type: "working:start",
    payload: { workingState: "message:send" },
  });

  const { error, data: message } = await api.callServer("POST", "messages", {
    body: draft,
  });

  if (error) {
    dispatch({
      type: "general-error:handle",
      payload: { error },
    });
    return;
  }

  dispatch({
    type: "failed-message:resend",
    payload: { message: message as Message, index },
  });
};

const dismissError = (dispatch: Dispatch<MainAction>) => {
  dispatch({ type: "error:dismiss" });
};

export const mainDispatchers = {
  fetchMessages,
  fetchUsers,
  fetchEverything,
  sendMessage,
  deleteFailedMessage,
  resendFailedMessage,
  dismissError,
};

export const MainContext = createContext<MainState>(initialMainState);
export const MainDispatchContext = createContext<Dispatch<MainAction>>(
  (_obj) => {}
);

export const useMain = () => {
  return useContext(MainContext);
};

export const useMainDispatch = () => {
  return useContext(MainDispatchContext);
};

const MainProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, initialMainState);

  return (
    <MainContext.Provider value={state}>
      <MainDispatchContext.Provider value={dispatch}>
        {props.children}
      </MainDispatchContext.Provider>
    </MainContext.Provider>
  );
};

export default MainProvider;

// https://react.dev/learn/scaling-up-with-reducer-and-context
