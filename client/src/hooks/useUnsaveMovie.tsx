import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../utils/urlTemplate";

const fetchUnsaveMovie = async (
  userId: string | undefined,
  movieId: number
): Promise<void> => {
  await axios.post(`${BASE_URL}/unsave-movie/${userId}`, {
    movieId,
  });
};

export const useUnsaveMovie = (userId: string | undefined, movieId: number) => {
  return useMutation(() => fetchUnsaveMovie(userId, movieId));
};
