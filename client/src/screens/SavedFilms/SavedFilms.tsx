import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TMDB_API_KEY } from "@env";
import axios from "axios";

import Header from "../../components/Dashboard/Header";
import Card from "../../components/Dashboard/Movie/Card";
import { AppContext, AppContextType } from "../../contexts/AppContext";
import { IMovieData } from "../../interfaces";

export const SavedFilms: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IMovieData[]>([]);
  const [error, setError] = useState<string>("");

  const { savedMovieIds } = useContext(AppContext) as AppContextType;

  const getSavedMoviesData = () => {
    setLoading(true);
    // pour chaque id dans la liste, on va faire une requête vers l'API de TMDB pour récupérer les données correspondant aux films sauvegardés
    savedMovieIds.map(async (id) => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`
        );
        // on récupère la data et on l'ajoute dans un tableau
        setData((prev) => [...prev, data]);
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
        setError(error.message);
      }
    });
  };

  useEffect(() => {
    getSavedMoviesData();
    // clean up funtion pour réinitialiser le tableau lorsqu'on démonte le composant
    return () => {
      setData([]);
    };
  }, []);

  return (
    <SafeAreaView className="bg-[#151516] h-full">
      <Header />
      <ScrollView className="bg-[#151516] mt-10 mb-14">
        <Text className="text-white text-2xl font-bold ml-10">
          Films sauvegardés
        </Text>

        {/* {loading && <DataLoader />} */}

        {data.map((x: IMovieData) => (
          <Card key={x.id} data={x} />
        ))}

        {error ? (
          <Text className="text-white text-2xl mt-10 px-10">{error}</Text>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
