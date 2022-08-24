import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TMDB_API_KEY } from "@env";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Header from "../../components/Dashboard/Header";
import Card from "../../components/Dashboard/Movie/Card";
import Loader from "../../components/Animations/Loader";
import { AppContext, AppContextType } from "../../contexts/AppContext";
import { IMovieData } from "../../interfaces";

export const SavedFilms: React.FC = () => {
  const { savedMovieIds } = useContext(AppContext) as AppContextType;

  const {
    isLoading,
    error,
    data: savedMovies,
  } = useQuery(["savedMovies"], async () => {
    // pour chaque id dans la liste, on va faire une requête vers l'API de TMDB pour récupérer les données correspondant aux films sauvegardés
    const allReq = await Promise.all(
      savedMovieIds.map(async (id) => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`
        );
        return data;
      })
    );
    return allReq;
  });

  return (
    <SafeAreaView className="bg-[#151516] h-full" testID="savedFilms">
      <Header />
      <ScrollView className="bg-[#151516] mt-10 mb-14">
        <Text className="text-white text-2xl font-bold ml-10">
          Films sauvegardés
        </Text>

        {isLoading && <Loader size={80} color="#00ed82" />}

        {savedMovies?.map((savedMovie: IMovieData) => (
          <Card key={savedMovie.id} data={savedMovie} />
        ))}

        {error && (
          <Text className="text-white text-2xl mt-10 px-10">
            Une erreur est survenue
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
