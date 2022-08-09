import { createContext } from "react";

export type AppContextType = {
  index: number;
  userId: string;
  savedFilmIds: any[];
  setIndex: (index: number) => void;
  setUserId: (userId: string | undefined) => void;
  setSavedFilmIds: (prev: any[]) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

// export const AppContext = createContext({
//   index: 0,
//   userId: "",
//   savedFilmIds: [],
//   setIndex: (index: number) => {},
//   setUserId: (userId: string | undefined) => {},
//   setSavedFilmIds: (prev: any[]) => {},
// });
