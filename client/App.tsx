import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { AppContext } from "./src/contexts/AppContext";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  // index afin de changer de catégorie pour afficher différents types de films
  const [index, setIndex] = useState<number>(0);
  const [userId, setUserId] = useState<string | any>("");
  const [savedFilmIds, setSavedFilmIds] = useState<any[]>([]);

  return (
    <TailwindProvider>
      <SafeAreaProvider>
        <AppContext.Provider
          value={{
            index,
            userId,
            savedFilmIds,
            setIndex,
            setUserId,
            setSavedFilmIds,
          }}
        >
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AppContext.Provider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </TailwindProvider>
  );
};

export default App;
