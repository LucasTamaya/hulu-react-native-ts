import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Dashboard/Header";
import Card from "../../components/Dashboard/Movie/Card";
import Loader from "../../components/Animations/Loader";
import { AppContext, AppContextType } from "../../contexts/AppContext";
import { IMovieData } from "../../interfaces";
import { useSavedMovies } from "../../hooks/useSavedMovies";

export const SavedMovies: React.FC = () => {
  const { userId } = useContext(AppContext) as AppContextType;

  const { isLoading, isError, isSuccess, data } = useSavedMovies(userId);

  if (isSuccess) {
    console.log(data);
  }

  return (
    <SafeAreaView className="bg-[#151516] h-full" testID="savedFilms">
      <Header />
      <ScrollView className="bg-[#151516] mt-10 mb-14">
        <Text className="text-white text-2xl font-bold ml-10">
          Films sauvegardés
        </Text>

        {isLoading && <Loader size={80} color="#00ed82" />}

        {isSuccess && data.length == 0 && (
          <Text className="text-white text-2xl mt-10 px-10">
            Aucun films sauvegardés
          </Text>
        )}

        {isSuccess &&
          data.length > 0 &&
          data.map((savedMovie: IMovieData) => (
            <Card key={savedMovie.id} data={savedMovie} />
          ))}

        {isError && (
          <Text className="text-white text-2xl mt-10 px-10">
            Une erreur est survenue, veuillez réessayer
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
