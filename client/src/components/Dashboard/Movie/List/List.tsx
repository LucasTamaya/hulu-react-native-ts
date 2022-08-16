import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MotiView } from "moti";
import { useQuery } from "@tanstack/react-query";

import Card from "../Card";
import Loader from "../../../Animations/Loader";
import requests from "../../../../../assets/data/movieRequests";
import { AppContext, AppContextType } from "../../../../contexts/AppContext";
import { IMovieData } from "../../../../interfaces";

export const List: React.FC = () => {
  const { index } = useContext(AppContext) as AppContextType;

  // récupère l'url dans la liste des requêtes, à l'index correspondant, par défault index = 0. La navigation va nous permettre de varier l'index selon la catégorie de films qu'on souhaite afficher
  const url = requests[index];

  const {
    isLoading,
    error,
    data: movies,
  } = useQuery(["allMovies"], async () => {
    const { data } = await axios.get(url);
    return data.results;
  });

  // pendant le chargement de la data, on affiche un loader
  if (isLoading) {
    return (
      <View className="mb-14">
        <Loader />
      </View>
    );
  }

  // si il y a une erreur lors de la requête, on affiche un message d'erreur
  if (error) {
    return (
      <View className="mb-14">
        <Text className="text-white text-2xl mt-10 ml-10">
          Une erreur est survenue
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="mb-14">
      {movies &&
        movies.map((movie: IMovieData) => <Card key={movie.id} data={movie} />)}
    </ScrollView>
  );
};