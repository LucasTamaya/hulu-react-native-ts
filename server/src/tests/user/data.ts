export const registerUserInput = {
  name: "John",
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const registerPayload: any = {
  error: false,
  details: "Compte crée avec succès",
  savedFilmIds: [],
};

export const registerPayloadError: any = {
  error: true,
  details: "Utilisateur déjà existant",
};

export const loginUserInput = {
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const loginUserInputError = {
  email: "john.doe@gmail.com",
  password: "aWrongPassword",
};

export const loginPayload: any = {
  error: false,
  details: "Connexion réussie",
  savedFilmIds: [],
};

export const loginPayloadError: any = {
  error: true,
  details: "Email ou mot de passe invalide",
};

export const userPayload: any = {
  existingUser: true,
  user: {
    _id: 1,
    name: "John",
    email: "john.doe@gmail.com",
    password: "aStrongPassword",
    savedFilmIds: [],
  },
};
