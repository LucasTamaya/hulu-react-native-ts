import bcrypt from "bcrypt";

import { IUser } from "../interfaces";
import User from "../models/User";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
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

  return { userId: newUser._id, savedFilmIds: newUser.savedFilmIds };
};
