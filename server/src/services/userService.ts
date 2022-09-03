import bcrypt from "bcrypt";

import { IUser, ISearchUser } from "../interfaces";
import User from "../models/User";

export const searchUser = async (email: string): Promise<ISearchUser> => {
  console.log(email);
  const user: IUser[] = await User.find({});
  //   const user: IUser | any = await User.find({ email });
  console.log(user);

  // si l'utilisateur n'existe pas
  if (user.length === 0) {
    console.log("email invalide");
    return { existingUser: false };
  } else {
    console.log("email valide");
    return { existingUser: true, user };
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  // hash du mot de passe
  const hashPassword: string = await bcrypt.hash(password, 10);

  console.log(name, email, password);

  // création du nouvel utilisateur
  const newUser: IUser = new User({
    name,
    email,
    password: hashPassword,
    savedFilmIds: [],
  });

  // sauvegarde du nouvel utilisateur dans la BDD
  newUser.save();

  const user = await User.find({});

  console.log(user);

  return { userId: newUser._id, savedFilmIds: newUser.savedFilmIds };
};

export const passwordValidation = async (
  userPassword: string,
  dbPassword: string
): Promise<boolean | undefined> => {
  const matchPasswords: boolean = await bcrypt.compare(
    dbPassword,
    userPassword
  );

  // si mot de passe invalide
  if (!matchPasswords) {
    console.log("mot de passe invalide");
    return false;
  }

  // si mot de passe valide
  console.log("mot de passe valide");
  return true;
};
