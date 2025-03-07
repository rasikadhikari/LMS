import { createContext } from "react";

export interface User {
  name: string;
}

export interface AuthToken {
  token: string | null;
  user?: User | null;
}

export interface AuthContextType {
  auth: AuthToken;
  changeAuth: (token: string, user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
