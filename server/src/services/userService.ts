import { searchUser } from "../helpers/searchUser";
import { passwordValidation } from "../helpers/passwordValidation";
import { createUser } from "../helpers/createUser";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const { existingUser } = await searchUser(email);

  if (existingUser) {
    console.log("Utilisateur deja existant");
    return { response: { error: true, details: "Utilisateur déjà existant" } };
  }

  const { userId, savedFilmIds } = await createUser(name, email, password);

  console.log("Nouvel utilisateur crée");
  return {
    response: {
      error: false,
      details: "Compte crée avec succès",
      userId,
      savedFilmIds,
    },
  };
};

export const logUser = async (email: string, password: string) => {
  // cherche si l'utilisateur existe
  const { existingUser, user } = await searchUser(email);

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
      savedFilmIds: user[0].savedFilmIds,
    },
  };
};
