import { User } from "../user/user-type";

export type UserCredentials = {
  username: string;
  password: string;
};

export type LoginFunction = (
  credentials: UserCredentials
) => Promise<"ok" | "error">;

export type LogoutFunction = () => void;

export type AuthContextValue = {
  user: User | null;
  login: LoginFunction;
  logout: LogoutFunction;
};
