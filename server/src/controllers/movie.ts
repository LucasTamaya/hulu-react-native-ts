import axios from "axios";
import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../interfaces";

// sauvegarde l'id d'un film
const SaveMovieController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { filmId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $push: { savedFilmIds: filmId },
    });

    return res.json({ error: false, details: "Film correctement sauvegardé" });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: true, details: error.message });
  }
};

// supprime l'id d'un film
const UnsaveMovieController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { filmId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedFilmIds: filmId },
    });

    return res.json({ error: false, details: "Film correctement sauvegardé" });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: true, details: error.message });
  }
};

// récupère les films sauvegardéscde l'utilisateur
const GetSavedMovies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user: IUser | null = await User.findById(userId);

    const movieIds = user?.savedFilmIds;
    // si l'utilisateur n'a pas sauvegardé de films
    if (!movieIds) {
      return res.status(200).json({ savedMovies: [] });
    }

    // si l'utilisateur a sauvegardé des films, on fetch l'api TMDB
    const savedMovies = await Promise.all(
      movieIds.map(async (id) => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
        );
        return data;
      })
    );

    return res.status(200).json({ savedMovies });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: true, details: error.message });
  }
};

export { SaveMovieController, UnsaveMovieController, GetSavedMovies };
