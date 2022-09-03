import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { BASE_URL } from "../utils/urlTemplate";

const fetchSaveMovie = async (
  userId: string | undefined,
  filmId: number
): Promise<void> => {
  await axios.post(`${BASE_URL}/save-movie/${userId}`, {
    filmId,
  });
};

export const useSaveMovie = (userId: string | undefined, filmId: number) => {
  return useMutation(() => fetchSaveMovie(userId, filmId));
};
