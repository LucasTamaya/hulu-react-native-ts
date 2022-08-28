import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import requests from "../../assets/data/movieRequests";
import { IMovieData } from "../interfaces";

// récupère l'url dans la liste des requêtes, à l'index correspondant, par défault index = 0. La navigation va nous permettre de varier l'index selon la catégorie de films qu'on souhaite afficher

const fetchAllMovies = async (index: number): Promise<IMovieData[]> => {
  const { data } = await axios.get(requests[index]);
  return data.results;
};

export const useAllMovies = (index: number) => {
  return useQuery(["allMovies"], () => fetchAllMovies(index));
};
