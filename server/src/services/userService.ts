import bcrypt from "bcrypt";

import { searchUserById } from "./../helpers/searchUserById";
import { searchUserByEmail } from "../helpers/searchUserByEmail";
import { passwordValidation } from "../helpers/passwordValidation";
import { createUser } from "../helpers/createUser";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const { existingUser } = await searchUserByEmail(email);

  if (existingUser) {
    console.log("Utilisateur deja existant");
    return { response: { error: true, details: "Utilisateur déjà existant" } };
  }

  const { userId, savedMovieIds } = await createUser(name, email, password);

  console.log("Nouvel utilisateur crée");
  return {
    response: {
      error: false,
      details: "Compte crée avec succès",
      userId,
      savedMovieIds,
    },
  };
};

export const logUser = async (email: string, password: string) => {
  // cherche si l'utilisateur existe
  const { existingUser, user } = await searchUserByEmail(email);

  // si l'utilisateur n'existe pas
  if (!existingUser) {
    return {
      response: { error: true, details: "Email ou mot de passe invalide" },
    };
  }

  // test la correspondance des mots de passes
  const isMatch: boolean | undefined = await passwordValidation(
    user[0].password,
    password
  );

  // si les mots de passes correspondent pas
  if (!isMatch) {
    console.log("mot de passe invalide");
    return {
      response: { error: true, details: "Email ou mot de passe invalide" },
    };
  }

  // si les mots de passe correspondent
  return {
    response: {
      error: false,
      details: "Connexion réussie",
      userId: user[0]._id,
      savedMovieIds: user[0].savedMovieIds,
    },
  };
};

export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const user = await searchUserById(userId);

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    // test la correspondance des mots de passes
    const isMatch: boolean | undefined = await passwordValidation(
      user.password,
      currentPassword
    );

    // si les mots de passe correspondent pas
    if (!isMatch) {
      console.log("Mot de passe invalide");
      return { response: { error: true, details: "Mot de passe invalide" } };
    }

    // si les mots de passe correspondent
    // hash du nouveau mot de passe
    const hashPassword: string = await bcrypt.hash(newPassword, 10);

    // mise à jour du mot de passe dans la BDD
    await user.updateOne({
      $set: { password: hashPassword },
    });

    return {
      response: {
        error: false,
        details: "Mot de passe correctement modifié",
      },
    };
  } catch (error: any) {
    console.log(error.message);

    return {
      response: {
        error: true,
        details: error.message,
      },
    };
  }
};
