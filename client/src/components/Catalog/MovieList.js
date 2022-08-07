import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MotiView } from "moti";

import requests from "../../utils/movieRequests";
import MovieCard from "./MovieCard";
import DataLoader from "../Loaders/DataLoader";

const MovieList = ({ index, docRef }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    setData([]);
    setLoading(true);
    setError("");

    // récupère l'url dans la liste des requêtes, à l'index correspondant, par défault index = 0. La navigation va nous permettre de varier l'index selon la catégorie de films qu'on souhaite afficher
    const url = requests[index];

    // si aucune erreur dans la requête, on récupère la data dans un tableau
    try {
      const data = await axios.get(url);
      setData(data.data.results);
      // marque un petit temps d'arrêt le temps que la data arrive
      setTimeout(() => {
        setLoading(false);
      }, 1800);
      // si erreur pendant la requête, on affiche un message d'erreur
    } catch (error) {
      setError("Une erreur inconnue est survenue");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [index]);

  return (
    <ScrollView className="mb-14">
      {loading && <DataLoader />}

      {data.map((x) => (
        <MovieCard key={x.id} data={x} docRef={docRef} />
      ))}

      {error ? (
        <Text className="text-white text-2xl mt-10">{error}</Text>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default MovieList;
