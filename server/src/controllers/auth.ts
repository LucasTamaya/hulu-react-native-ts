import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User";
import { passwordValidation } from "../helpers/passwordValidation";
import { IUser, IChangePassword } from "../interfaces";

const LoginController = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  console.log(email, password);

  const user: IUser[] = await User.find({ email });

  // si l'utilisateur n'existe pas
  if (user.length === 0) {
    console.log("nom utilisateur invalide");
    return res.json({ error: true, details: "Nom d'utilisateur invalide" });
  }

  console.log(user);

  // test la correspondance des mots de passes
  const isMatch: boolean | undefined = await passwordValidation(
    user[0].password,
    password
  );

  // si les mots de passes correspondent pas
  if (!isMatch) {
    console.log("mot de passe invalide");
    return res.json({ error: true, details: "Mot de passe invalide" });
  }

  // si les mots de passe correspondent
  return res.json({
    error: false,
    userId: user[0]._id,
    savedFilmIds: user[0].savedFilmIds,
  });
};

const RegisterController = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password }: IUser = req.body;

  const user = await User.find({ email });

  // si utilisateur deja existant
  if (user.length > 0) {
    console.log("Utilisateur deja existant");
    return res.json({ error: true, details: "Utilisateur déjà existant" });
  }

  // hash du mot de passe
  const hashPassword: string = await bcrypt.hash(password, 10);

  // création du nouvel utilisateur
  const newUser: IUser = new User({
    name,
    email,
    password: hashPassword,
    savedFilmIds: [],
  });

  // sauvegarde du nouvel utilisateur dans la BDD
  newUser.save();
  console.log("Nouvel utilisateur crée");
  return res.json({
    error: false,
    userId: user[0]._id,
    savedFilmIds: user[0].savedFilmIds,
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

/*
// test la correspondance des mots de passes
  const isMatch: boolean | undefined = await passwordValidation(
    user[0].password,
    password
  );

  // si mot de passe invalide
  if (!isMatch) {
    console.log("mot de passe invalide");
    return res.json({ error: true, details: "Mot de passe invalide" });
  }

  console.log(user);

  return res.json({
    error: false,
    userId: user[0]._id,
    savedFilmIds: user[0].savedFilmIds,
  });
*/
