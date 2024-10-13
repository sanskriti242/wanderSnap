import { createContext } from "react";

//this is a object shared between components and when it is updated any component that listens to it will also update
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
