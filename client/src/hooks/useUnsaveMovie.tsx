import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../utils/urlTemplate";

const fetchUnsaveMovie = async (
  userId: string | undefined,
  filmId: number
): Promise<void> => {
  await axios.post(`${BASE_URL}/movie/unsave/${userId}`, {
    filmId,
  });
};

export const useUnsaveMovie = (userId: string | undefined, filmId: number) => {
  return useMutation(() => fetchUnsaveMovie(userId, filmId));
};
