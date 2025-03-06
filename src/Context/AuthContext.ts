import { createContext } from "react";

export interface AuthToken {
  token: string | null;
  user?: any;
}
export interface AuthContextType {
  auth: AuthToken;
  changeAuth: (token: string) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>({
  auth: { token: null },
  changeAuth: () => {},
});
