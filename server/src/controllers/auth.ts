import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User";
import { passwordValidation } from "../helpers/passwordValidation";
import { IUser } from "../interfaces";

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
    details: "Nouvel utilisateur crée",
    userId: user[0]._id,
  });
};

export { LoginController, RegisterController };
