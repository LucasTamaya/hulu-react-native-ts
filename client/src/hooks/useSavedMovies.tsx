import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { IMovieData } from "../interfaces";
import { BASE_URL } from "../utils/urlTemplate";

const fetchSavedMovies = async (
  userId: string | undefined
): Promise<IMovieData[]> => {
  const { data } = await axios.get(`${BASE_URL}/movies/saved/${userId}`);
  return data.savedMovies;
};

export const useSavedMovies = (userId: string | undefined) => {
  return useQuery(["savedMovies"], () => fetchSavedMovies(userId));
};
