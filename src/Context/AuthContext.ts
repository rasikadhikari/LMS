import { createContext } from "react";

export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthToken {
  token: string | null;
  user: User | null;
}

export interface AuthContextType {
  auth: AuthToken;
  user: User | null;
  changeAuth: (token: string, user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
