import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { IMovieData } from "../interfaces";

const fetchSearchMovie = async (
  apiKey: string,
  searchInput: string
): Promise<IMovieData[]> => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=fr-FR&query=${searchInput}&page=1&include_adult=false`
  );
  return data.results;
};

export const useSearchMovie = (apiKey: string, searchInput: string) => {
  return useMutation(() => fetchSearchMovie(apiKey, searchInput));
};
