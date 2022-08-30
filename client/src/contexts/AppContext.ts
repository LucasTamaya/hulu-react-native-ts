import { createContext } from "react";

export type AppContextType = {
  index: number;
  userId: string | undefined;
  savedMovieIds: number[];
  setIndex: (index: number) => void;
  setUserId: (userId: string | undefined) => void;
  setSavedMovieIds: (prev: number[]) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
