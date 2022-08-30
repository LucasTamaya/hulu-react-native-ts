import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode, useState } from "react";
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
  // const [index, setIndex] = useState<number>(0);
  // const [userId, setUserId] = useState<string | undefined>("");
  // const [savedMovieIds, setSavedMovieIds] = useState<number[]>([]);
  const client = new QueryClient();

  return (
    // <QueryClientProvider client={client}>
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
    // </QueryClientProvider>
  );
};

/*
<QueryClientProvider client={client}>
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
    </QueryClientProvider>
*/
