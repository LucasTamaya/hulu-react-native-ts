export const saveMoviePayload: any = {
  error: false,
  details: "Film correctement sauvegardé",
};

export const unsaveMoviePayload: any = {
  error: false,
  details: "Film correctement désenregistré",
};

export const mockSavedMovies: any = [{ movie: 1 }, { movie: 2 }, { movie: 3 }];

export const getSavedMoviesPayload: any = {
  error: false,
  savedMovies: mockSavedMovies,
};

export const getSavedMoviesEmptyListPayload: any = {
  error: false,
  savedMovies: [],
};

export const userNotFoundPayload: any = {
  error: true,
  details:
    'Cast to ObjectId failed for value "12345" (type string) at path "_id" for model "User"',
};
