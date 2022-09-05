import { Request, Response } from "express";

import {
  getSavedMovies,
  saveMovie,
  unsaveMovie,
} from "./../services/movieService";

// sauvegarde l'id d'un film
const SaveMovieController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { movieId } = req.body;

  const { response } = await saveMovie(userId, movieId);

  return res.json(response);
};

// supprime l'id d'un film
const UnsaveMovieController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { movieId } = req.body;

  const { response } = await unsaveMovie(userId, movieId);

  return res.json(response);
};

// récupère les films sauvegardéscde l'utilisateur
const GetSavedMoviesController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { response } = await getSavedMovies(userId);

  return res.json(response);
};

export { SaveMovieController, UnsaveMovieController, GetSavedMoviesController };
