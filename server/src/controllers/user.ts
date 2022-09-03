import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User";
import { IUser, IChangePassword } from "../interfaces";
import {
  createUser,
  searchUser,
  passwordValidation,
} from "../services/userService";

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { existingUser, user } = await searchUser(email);

  if (!existingUser) {
    return res.json({ error: true, details: "Email ou mot de passe invalide" });
  }

  // test la correspondance des mots de passes
  const isMatch: boolean | undefined = await passwordValidation(
    user[0].password,
    password
  );

  // si les mots de passes correspondent pas
  if (!isMatch) {
    console.log("mot de passe invalide");
    return res.json({ error: true, details: "Email ou mot de passe invalide" });
  }

  // si les mots de passe correspondent
  return res.json({
    error: false,
    details: "Connexion réussie",
    userId: user[0]._id,
    savedFilmIds: user[0].savedFilmIds,
  });
};

const RegisterController = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;

  const { existingUser, user } = await searchUser(email);

  // si utilisateur deja existant
  if (existingUser) {
    console.log("Utilisateur deja existant");
    return res.json({ error: true, details: "Utilisateur déjà existant" });
  }
  // création de l'utilisateur
  const { userId, savedFilmIds } = await createUser(name, email, password);

  console.log("Nouvel utilisateur crée");
  return res.json({
    error: false,
    details: "Compte crée avec succès",
    userId,
    savedFilmIds,
  });
};

const UpdatePasswordController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { currentPassword, newPassword }: IChangePassword = req.body;

  User.findById(userId, async (err: any, user: IUser) => {
    // si il y a une erreur
    if (err) {
      console.log(err.message);
    }

    // si aucune erreur
    // test la correspondance des mots de passes
    const isMatch: boolean | undefined = await passwordValidation(
      user.password,
      currentPassword
    );

    // si les mots de passe correspondent pas
    if (!isMatch) {
      console.log("Mot de passe invalide");
      return res.json({ error: true, details: "Mot de passe invalide" });
    }

    // si les mots de passe correspondent
    // hash du nouveau mot de passe
    const hashPassword: string = await bcrypt.hash(newPassword, 10);

    // mise à jour du mot de passe dans la BDD
    await user.updateOne({
      $set: { password: hashPassword },
    });

    return res.json({
      error: false,
      details: "Mot de passe correctement modifié",
    });
  });
};

export { LoginController, RegisterController, UpdatePasswordController };
