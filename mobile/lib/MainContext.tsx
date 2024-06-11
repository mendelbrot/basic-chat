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

export type LoadingState = "users" | "messages" | "everything";

export type MainState = {
  messages: Message[];
  failedMessages: DraftMessage[];
  users: User[];
  usernameLookup: UsernameLookup;
  error: string | null;
  loadingState: LoadingState | null;
};

const initialMainState: MainState = {
  messages: [],
  failedMessages: [],
  users: [],
  usernameLookup: {},
  error: null,
  loadingState: null,
};

type Action1 = {
  type: "loading:start";
  payload: {
    loadingState: LoadingState;
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
  type: "fetch-error:handle";
  payload: {
    error: string | null;
  };
};

type Action8 = {
  type: "message-send-error:handle";
  payload: {
    failedMessage: DraftMessage;
    error: string | null;
  };
};

export type MainAction =
  | Action1
  | Action2
  | Action3
  | Action4
  | Action5
  | Action6
  | Action7
  | Action8;

const mainReducer = (state: MainState, action: MainAction): MainState => {
  switch (action.type) {
    case "loading:start": {
      return {
        ...state,
        loadingState: action.payload.loadingState,
        error: null,
      };
    }
    case "messages:fetch": {
      return {
        ...state,
        messages: action.payload.messages,
        loadingState: null,
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
        loadingState: null,
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
        loadingState: null,
      };
    }
    case "message:send": {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        loadingState: null,
      };
    }
    case "failed-message:delete": {
      return {
        ...state,
        failedMessages: state.failedMessages.filter(
          (_: any, index: number) => index !== action.payload.index
        ),
        loadingState: null,
      };
    }
    case "fetch-error:handle": {
      return {
        ...state,
        error: action.payload.error,
        loadingState: null,
      };
    }
    case "message-send-error:handle": {
      return {
        ...state,
        failedMessages: [...state.messages, action.payload.failedMessage],
        error: action.payload.error,
        loadingState: null,
      };
    }
    default: {
      return state;
    }
  }
};

const fetchMessages = async (dispatch: Dispatch<MainAction>, token: string) => {
  dispatch({ type: "loading:start", payload: { loadingState: "everything" } });

  const { error, data: messages } = await api.callServer(
    "GET",
    "messages",
    undefined,
    token,
  );

  if (error) {
    dispatch({ type: "fetch-error:handle", payload: { error } });
    return;
  }

  dispatch({ type: "messages:fetch", payload: { messages: messages as Message[] } });
};

const fetchUsers = async (dispatch: Dispatch<MainAction>, token: string) => {};

const fetchEverything = async (
  dispatch: Dispatch<MainAction>,
  token: string
) => {};

const sendMessage = async (
  dispatch: Dispatch<MainAction>,
  token: string,
  draft: DraftMessage
) => {};

const deleteFailedMessage = async (
  dispatch: Dispatch<MainAction>,
  token: string,
  index: number
) => {};

const resendFailedMessage = async (
  dispatch: Dispatch<MainAction>,
  token: string,
  index: number
) => {};

export const mainActioners = {
  fetchMessages,
  fetchUsers,
  fetchEverything,
  sendMessage,
  deleteFailedMessage,
  resendFailedMessage,
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
