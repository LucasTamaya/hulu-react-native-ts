import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import { TMDB_API_KEY } from "@env";
import Card from "../Movie/Card";
// import DataLoader from "../Loaders/DataLoader";
import { IMovieData } from "../../../interfaces";

export const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // lance la recherche du film via l'api TMDB
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${searchInput}&page=1&include_adult=false`
      );
      // si aucune donnée ne corresponde à la recherche, on affiche un message d'erreur
      if (data.data.results.length === 0) {
        setError(`Nous n'avons rien trouvé à propos de ${searchInput}...`);
        setLoading(false);
        setData([]);
      }
      // si des données ont été trouvées
      if (data.data.results.length > 0) {
        setData(data.data.results);
        // marque un petit temps d'arrêt le temps que la data arrive
        setTimeout(() => {
          setLoading(false);
        }, 1800);
      }
      // si erreur pendant la requête, on affiche un message d'erreur
    } catch (error: any) {
      console.log(error.message);
      setError("Une erreur au niveau du serveur est survenue...");
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView className="border border-white rounded flex-row mt-10">
        <View className="h-full border-r border-white p-4">
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Rechercher un film, une série..."
          placeholderTextColor="#808080"
          className="flex-1 text-white font-bold ml-2"
          keyboardType="web-search"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          onSubmitEditing={handleSearch}
        />
      </KeyboardAvoidingView>

      {/* {loading && <DataLoader />} */}

      {data.map((x: IMovieData) => (
        <Card key={x.id} data={x} />
      ))}

      {error ? (
        <Text className="text-white text-2xl mt-10">{error}</Text>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};
