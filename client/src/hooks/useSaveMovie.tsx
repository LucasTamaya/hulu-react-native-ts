import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../utils/urlTemplate";

const fetchSaveMovie = async (
  userId: string | undefined,
  movieId: number
): Promise<void> => {
  await axios.post(`${BASE_URL}/save-movie/${userId}`, {
    movieId,
  });
};

export const useSaveMovie = (userId: string | undefined, movieId: number) => {
  return useMutation(() => fetchSaveMovie(userId, movieId));
};
