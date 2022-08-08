import { createContext } from "react";

export const UserIdContext = createContext({
  index: 0,
  userId: "",
  setIndex: (index: number) => {},
});
