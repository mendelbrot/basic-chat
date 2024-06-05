import React from "react";
import useStorageState from "../use-storage-state";
import { User } from "@/types/user-type";
import api from "../api";

export type Session = {
  user: User | null;
  token: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};

const AuthContext = React.createContext<{
  login: (credentials: UserCredentials) => void;
  logout: () => void;
  dismissLoginError: () => void;
  loginError: string | null;
  session: Session | null;
  isLoading: boolean;
}>({
  login: async (_credentials: UserCredentials) => {},
  logout: () => null,
  dismissLoginError: () => {},
  loginError: null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export const useSession = () => {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "prod") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
};

export const SessionProvider = (props: React.PropsWithChildren) => {
  const [sessionIsLoading, session, setSession] = useStorageState<Session>("session");
  const [loginIsLoading, setLoginIsLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const apiLogin = async (credentials: UserCredentials): Promise<void> => {
    try {
      const session: Session = await api.login(credentials);
      setSession(session);
      setLoginIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message)
      }
    }
  };

  const isLoading = sessionIsLoading || loginIsLoading;

  return (
    <AuthContext.Provider
      value={{
        login: (credentials) => {
          setLoginIsLoading(true);
          apiLogin(credentials);
        },
        logout: () => {
          setSession(null);
        },
        dismissLoginError: () => {
          setLoginError(null)
        },
        loginError,
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// https://docs.expo.dev/router/reference/authentication/
