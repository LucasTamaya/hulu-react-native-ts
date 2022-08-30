import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { IMovieData } from "../interfaces";

const fetchSavedMovies = async (
  apiKey: string,
  movieIds: number[]
): Promise<IMovieData[]> => {
  // pour chaque id dans la liste, on va faire une requête vers l'API de TMDB pour récupérer les données correspondant aux films sauvegardés
  const allReq = await Promise.all(
    movieIds.map(async (id) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`
      );
      return data;
    })
  );
  return allReq;
};

export const useSavedMovies = (apiKey: string, movieIds: number[]) => {
  return useQuery(["savedMovies"], () => fetchSavedMovies(apiKey, movieIds));
};
