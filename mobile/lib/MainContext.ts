import {
  createContext,
  useReducer,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import AuthContext from "@/lib/auth/AuthContext";
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

export type FailedMessage = { text: string };

export type UsernameLookup = { [key: number]: string };

export type LoadingState = "users" | "messages" | "everything";

type MainContextValue = {
  messages: Message[];
  failedMessages: FailedMessage[];
  users: [];
  usernameLookup: UsernameLookup;
  error: string | null;
  loadingState: LoadingState | null;
};

const mainContextInitialState: MainContextValue = {
  messages: [],
  failedMessages: [],
  users: [],
  usernameLookup: {},
  error: null,
  loadingState: null,
}

const MainContext = createContext<MainContextValue>(mainContextInitialState);

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
    failedMessage: FailedMessage;
    error: string | null;
  };
};

type Action =
  | Action1
  | Action2
  | Action3
  | Action4
  | Action5
  | Action6
  | Action7
  | Action8;

const mainReducer = (state: MainContextValue, action: Action) => {
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

export const MainProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer<MainContextValue>(mainReducer, mainContextInitialState);
  const { session } = useContext(AuthContext);

  const token = session?.token;

  useEffect(() => {
    const fetchMessages = async () => {
      if (token) {
        const { data, error } = await api.callServer(
          "GET",
          "messages",
          undefined,
          token
        );
        dispatch({ type: "fetch", payload: messages });
      }
    };

    fetchMessages();
  }, [token]);

  return (
    <MainContext.Provider value={{ messages: state.messages, dispatch }}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;

// import {
//   PropsWithChildren,
//   createContext,
//   useCallback,
//   useMemo,
//   useState,
// } from "react";
// import api from "../api";

// export type Message = {
//   id: number;
//   userId: number;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type MainContextValue = {
//   sendMessage: (text: string) => void;
//   loadMessages: () => void;
//   dismissMessageError: () => void;
//   isLoadingMessages: boolean;
//   messageError: string | null;
//   messages: Message[];
// };

// const MainContext = createContext<MainContextValue>({
//   sendMessage: async (_text) => {},
//   loadMessages: () => {},
//   dismissMessageError: () => {},
//   isLoadingMessages: false,
//   messageError: null,
//   messages: [],
// });

// export const MessagesProvider = (props: PropsWithChildren) => {
//   const [sessionIsLoading, session, setSession] =
//     useStorageState<Session>("session");
//   const [loginIsLoading, setLoginIsLoading] = useState<boolean>(false);
//   const [loginError, setLoginError] = useState<string | null>(null);

//   const login = useCallback(
//     async (credentials: UserCredentials) => {
//       setLoginIsLoading(true);
//       setLoginError(null);
//       setSession(null);

//       const { error, data: session } = (await api.callServer(
//         "POST",
//         "auth/login",
//         credentials
//       )) as {
//         error?: string | null;
//         data?: Session | null;
//       };

//       if (error) {
//         setLoginIsLoading(false);
//         setLoginError(error);
//         return;
//       }

//       if (!session || !session.token || !session.user) {
//         setLoginIsLoading(false);
//         setLoginError("The server reply was not in the expected format.");
//         return;
//       }

//       setLoginIsLoading(false);
//       setSession(session);
//     },
//     [setSession]
//   );

//   const logout = useCallback(() => {
//     setSession(null);
//   }, []);

//   const dismissLoginError = useCallback(() => {
//     setLoginError(null);
//   }, []);

//   const isLoading = sessionIsLoading || loginIsLoading;

//   const value = useMemo(
//     () => ({
//       login,
//       logout,
//       dismissLoginError,
//       isLoading,
//       loginError,
//       session,
//     }),
//     [isLoading, loginError, session]
//   );

//   return (
//     <MainContext.Provider value={value}>
//       {props.children}
//     </MainContext.Provider>
//   );
// };
