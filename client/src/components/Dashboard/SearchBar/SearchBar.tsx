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
import { useMutation } from "@tanstack/react-query";

import Card from "../Movie/Card";
import Loader from "../../Animations/Loader";
import { IMovieData } from "../../../interfaces";
import { TMDB_API_KEY } from "@env";

export const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${searchInput}&page=1&include_adult=false`
    );
    return data.results;
  };

  const {
    isLoading,
    error,
    data: searchMovies,
    mutate,
  } = useMutation(handleSearch);

  return (
    <ScrollView>
      <KeyboardAvoidingView className="border border-white rounded flex-row mt-10">
        <View className="h-full border-r border-white p-4">
          <TouchableOpacity onPress={() => mutate()}>
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
          onSubmitEditing={() => mutate()}
        />
      </KeyboardAvoidingView>

      {isLoading ? <Loader /> : <></>}

      {searchMovies?.map((x: IMovieData) => (
        <Card key={x.id} data={x} />
      ))}

      {error ? (
        <Text className="text-white text-2xl mt-10">
          Une erreur est survenue
        </Text>
      ) : (
        <></>
      )}
    </ScrollView>
  );
};
