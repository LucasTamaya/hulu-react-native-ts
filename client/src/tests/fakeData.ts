import { IAllMoviesFakeData } from "../interfaces";

const nb: number = 20;
export const allMovies: IAllMoviesFakeData[] = [];

for (let i = 1; i <= nb; i++) {
  allMovies.push({
    id: i,
    movieData: {},
  });
}
