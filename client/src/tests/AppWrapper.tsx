import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { AppContext } from "../contexts/AppContext";

interface Props {
  children: ReactNode;
  index?: number;
  userId?: string;
  savedMovieIds?: number[];
  setIndex?: React.Dispatch<React.SetStateAction<number>>;
  setUserId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSavedMovieIds?: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}

export const AppWrapper: React.FC<Props> = ({
  children,
  index = 0,
  userId,
  savedMovieIds = [],
  setIndex = () => {},
  setUserId = () => {},
  setSavedMovieIds = () => {},
}) => {
  return (
    <TailwindProvider>
      <AppContext.Provider
        value={{
          index,
          userId,
          savedMovieIds,
          setIndex,
          setUserId,
          setSavedMovieIds,
        }}
      >
        <NavigationContainer>{children}</NavigationContainer>
      </AppContext.Provider>
      <StatusBar style="auto" />
    </TailwindProvider>
  );
};
