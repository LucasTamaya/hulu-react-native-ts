import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User";
import { passwordValidation } from "../helpers/passwordValidation";
import { IUser } from "../interfaces";

const LoginController = async (req: Request, res: Response) => {
  console.log("testtt")
  const { email, password }: IUser = req.body;

  const user = await User.find({ email });

  if (user.length === 0) {
    console.log("nom utilisateur invalide");
    return res.json({ errorMessage: "Nom d'utilisateur invalide" });
  }

  // test pour vérifier si le mot de passe correspond
  const isMatch: boolean | undefined = await passwordValidation(
    user[0],
    password
  );

  if (!isMatch) {
    console.log("mot de passe invalide");
    return res.json({ errorMessage: "Mot de passe invalide" });
  }

  console.log(user);

  return res.json({
    successMessage: "Connexion réussie",
  });
};

const RegisterController = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password }: IUser = req.body;

  const user = await User.find({ email });

  // si utilisateur deja existant
  if (user.length > 0) {
    console.log("user deja existant");
    return res.status(500).json({ errorMessage: "Utilisateur déjà existant" });
  }

  const hashPassword: string = await bcrypt.hash(password, 10);

  const newUser: IUser = new User({
    name,
    email,
    password: hashPassword,
    savedFilmIds: [],
  });
  newUser.save();

  return res.json({ successMessage: "Nouvel utilisateur crée" });
};

export { LoginController, RegisterController };
