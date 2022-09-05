export const registerUserInput: any = {
  name: "John",
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const registerPayload: any = {
  error: false,
  details: "Compte crée avec succès",
  savedMovieIds: [],
};

export const registerPayloadError: any = {
  error: true,
  details: "Utilisateur déjà existant",
};

export const loginUserInput: any = {
  email: "john.doe@gmail.com",
  password: "P4ssword",
};

export const loginUserInputError: any = {
  email: "john.doe@gmail.com",
  password: "aWrongPassword",
};

export const loginPayload: any = {
  error: false,
  details: "Connexion réussie",
  savedMovieIds: [],
};

export const loginPayloadError: any = {
  error: true,
  details: "Email ou mot de passe invalide",
};

export const updatePasswordInput: any = {
  currentPassword: "P4ssword",
  newPassword: "NewP4ssword",
};

export const updatePasswordInputError: any = {
  currentPassword: "aWrongPassword",
  newPassword: "NewP4ssword",
};

export const updatePasswordPayload: any = {
  error: false,
  details: "Mot de passe correctement modifié",
};

export const updatePasswordPayloadError: any = {
  error: true,
  details: "Mot de passe invalide",
};

export const updatePasswordPayloadError2: any = {
  error: true,
  details:
    'Cast to ObjectId failed for value "12345" (type string) at path "_id" for model "User"',
};
