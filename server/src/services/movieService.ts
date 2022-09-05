import { fetchSavedMovies } from "./../helpers/fetchSavedMovies";
import { searchUserById } from "./../helpers/searchUserById";
import User from "../models/User";

export const saveMovie = async (userId: string, movieId: number) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { savedMovieIds: movieId },
    });

    return {
      response: { error: false, details: "Film correctement sauvegardé" },
    };
  } catch (error: any) {
    return { response: { error: true, details: error.message } };
  }
};

export const unsaveMovie = async (userId: string, movieId: number) => {
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { savedMovieIds: movieId },
    });

    return {
      response: { error: false, details: "Film correctement désenregistré" },
    };
  } catch (error: any) {
    return {
      response: { error: true, details: error.message },
    };
  }
};

export const getSavedMovies = async (userId: string) => {
  try {
    const user = await searchUserById(userId);

    // si l'utilisateur est introuvable
    if (!user) {
      throw Error("Utilisateur introuvable");
    }
    // si l'utilisateur n'a pas sauvegardé de films
    if (user.savedMovieIds.length === 0) {
      return { response: { error: false, savedMovies: [] } };
    }
    // si l'utilisateur a sauvegardé des films, on fetch l'api TMDB
    const savedMovies = await fetchSavedMovies(user.savedMovieIds);

    return { response: { error: false, savedMovies } };
  } catch (error: any) {
    return { response: { error: true, details: error.message } };
  }
};
