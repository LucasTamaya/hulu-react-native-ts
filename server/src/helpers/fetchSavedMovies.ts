import axios from "axios";
export const fetchSavedMovies = async (movieIds: number[]) => {
  const savedMovies = await Promise.all(
    movieIds.map(async (id) => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
      );
      return data;
    })
  );

  return savedMovies;
};
