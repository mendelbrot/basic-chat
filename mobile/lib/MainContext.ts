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

type MainContextValue = {
  messages: Message[];
  failedMessages: FailedMessage[];
  users: [];
  usernameLookup: UsernameLookup;
  error: string | null;
  isLoadingMessages: boolean;
  isLoadingUsers: boolean;
  isLoadingEverything: boolean;
  isLoading: boolean;
  sendMessage: ({ text }: { text: string }) => void;
  resendFailedMessage: (index: number) => void;
  deleteFailedMessage: (index: number) => void;
  fetchMessages: () => void;
  fetchUsers: () => void;
  fetchEverything: () => void;
};

const MainContext = createContext<MainContextValue>({
  messages: [],
  failedMessages: [],
  users: [],
  usernameLookup: {},
  error: null,
  isLoadingMessages: false,
  isLoadingUsers: false,
  isLoadingEverything: false,
  isLoading: false,
  sendMessage: (_obj) => {},
  resendFailedMessage: (_index) => {},
  deleteFailedMessage: (_index) => {},
  fetchMessages: () => {},
  fetchUsers: () => {},
  fetchEverything: () => {},
});

type FetchMessagesAction = {
  type: "fetchMessages";
  payload: { messages: Message[] };
};
type FetchUsersAction = { type: "fetchUsers"; payload: { users: User[] } };
type FetchEverythingAction = {
  type: "fetchEverything";
  payload: { messages: Message[]; users: User[] };
};
type SendMessageAction = { type: "sendMessage"; payload: { message: Message } };

type Action =
  | FetchMessagesAction
  | FetchUsersAction
  | FetchEverythingAction
  | SendMessageAction;

const mainReducer = (state: { messages: Message[] }, action: Action) => {
  switch (action.type) {
    case "fetchMessages": {
      return { ...state, messages: action.payload.messages };
    }
    case "fetchUsers": {
      const usernameLookup = action.payload.users.reduce((acc, item) => {
        acc[item.id] = item.username;
        return acc;
      }, {} as UsernameLookup);
      return { ...state, users: action.payload.users, usernameLookup };
    }
    case "fetchEverything": {
      const usernameLookup = action.payload.users.reduce((acc, item) => {
        acc[item.id] = item.username;
        return acc;
      }, {} as UsernameLookup);
    }
    case "sendMessage": {
      return { ...state, messages: [...state.messages, action.payload] };
    }
    default: {
      return state;
    }
  }
};

export const MainProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(mainReducer, { messages: [] });
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
