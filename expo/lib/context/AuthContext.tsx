import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useStorageState from "@/lib/useStorageState";
import { User } from "@/lib/context/MainContext";
import api from "../api";

export type Session = {
  user: User | null;
  token: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};

export type AuthContextValue = {
  login: (credentials: UserCredentials) => void;
  logout: () => void;
  dismissLoginError: () => void;
  isLoading: boolean;
  loginError: string | null;
  session: Session | null;
};

export const AuthContext = createContext<AuthContextValue>({
  login: async (_credentials) => {},
  logout: () => {},
  dismissLoginError: () => {},
  isLoading: false,
  loginError: null,
  session: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props: PropsWithChildren) => {
  const [sessionIsLoading, session, setSession] =
    useStorageState<Session>("session");
  const [loginIsLoading, setLoginIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const login = useCallback(
    async (credentials: UserCredentials) => {
      setLoginIsLoading(true);
      setLoginError(null);
      setSession(null);

      const { error, data: session } = (await api.callServer(
        "POST",
        "auth/login",
        {
          body: credentials,
          useTheSessionToken: false,
        }
      )) as {
        error?: string | null;
        data?: Session | null;
      };

      if (error) {
        setLoginIsLoading(false);
        setLoginError(error);
        return;
      }

      if (!session || !session.token || !session.user) {
        setLoginIsLoading(false);
        setLoginError("The server reply was not in the expected format.");
        return;
      }

      setLoginIsLoading(false);
      setSession(session);
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null);
  }, []);

  const dismissLoginError = useCallback(() => {
    setLoginError(null);
  }, []);

  const isLoading = sessionIsLoading || loginIsLoading;

  const value = useMemo(
    () => ({
      login,
      logout,
      dismissLoginError,
      isLoading,
      loginError,
      session,
    }),
    [isLoading, loginError, session]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;

// https://blog.logrocket.com/authentication-react-router-v6/
// https://docs.expo.dev/router/reference/authentication/
