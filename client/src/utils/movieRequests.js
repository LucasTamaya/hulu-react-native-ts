import { TMDB_API_KEY } from "@env";

// ensemble des requêtes API utilisables par mon appli. Source de l'API: https://www.themoviedb.org/?language=en-US

const requests = [
  `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}&language=fr-FR`,
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=35&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=9648&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=37&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16&language=fr-FR`,
  `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10770&language=fr-FR`,
];

export default requests;
