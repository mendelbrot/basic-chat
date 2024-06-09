import { createContext, useReducer, useEffect } from "react";

export type Message = {
  id: number;
  senderId: number;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type LoadMessagesAction = { type: "LOAD_MESSAGES"; payload: Message[] };
type SendMessageAction = { type: "SEND_MESSAGE"; payload: Message };

type ChatAction = LoadMessagesAction | SendMessageAction;

const chatReducer = (state: { messages: Message[] }, action: ChatAction) => {
  switch (action.type) {
    case "LOAD_MESSAGES":
      return { ...state, messages: action.payload };
    case "SEND_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const initialState = {
  messages: [],
};

const ChatContext = createContext({
  messages: [],
  dispatch: () => {},
});

export const MessagesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, initialState);

  useEffect(() => {
    // Load initial messages from your API here
    const fetchMessages = async () => {
      const messages = await fetchMessagesFromApi(); // Replace with your API call
      dispatch({ type: LOAD_MESSAGES, payload: messages });
    };

    fetchMessages();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <MessagesContext.Provider value={{ messages: state.messages, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;

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

// export type MessagesContextValue = {
//   sendMessage: (text: string) => void;
//   loadMessages: () => void;
//   dismissMessageError: () => void;
//   isLoadingMessages: boolean;
//   messageError: string | null;
//   messages: Message[];
// };

// const MessagesContext = createContext<MessagesContextValue>({
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
//     <MessagesContext.Provider value={value}>
//       {props.children}
//     </MessagesContext.Provider>
//   );
// };
