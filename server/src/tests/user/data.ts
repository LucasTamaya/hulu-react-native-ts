export const registerUserInput = {
  name: "John",
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const registerPayload: any = {
  error: false,
  details: "Compte crée avec succès",
  userId: "631351289ce5241318748b45",
  savedFilmIds: [],
};

export const loginUserInput = {
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const loginPayload: any = {
  error: false,
  details: "Connexion réussie",
  savedFilmIds: [],
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
