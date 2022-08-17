import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../interfaces";

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

export { SaveMovieController, UnsaveMovieController };
