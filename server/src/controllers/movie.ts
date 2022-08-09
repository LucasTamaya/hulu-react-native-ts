import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../interfaces";

const SavedMovieIdsController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log("j'ai été appellé pour recevoir les ids");

  const user: IUser | null = await User.findById(userId);

  // si l'utilisateur n'existe pas
  if (!user) {
    console.log("Erreur, utilisateur non existant");
    return res.json({ error: true, details: "Utilisateur non existant" });
  }

  // si l'utilisateur existe, on lui retourne la liste d'ids des films qu'il a sauvegardé
  return res.json({ error: false, savedFilmIds: user.savedFilmIds });
};

// sauvegarde l'id d'un film
const SaveMovieController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { filmId } = req.body;

    const user: IUser | null = await User.findByIdAndUpdate(userId, {
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

    const user: IUser | null = await User.findByIdAndUpdate(userId, {
      $pull: { savedFilmIds: filmId },
    });

    return res.json({ error: false, details: "Film correctement sauvegardé" });
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: true, details: error.message });
  }
};

export { SavedMovieIdsController, SaveMovieController, UnsaveMovieController };
