import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import Card from "../Movie/Card";
import Loader from "../../Animations/Loader";
import { IMovieData } from "../../../interfaces";
import { TMDB_API_KEY } from "@env";
import { useSearchMovie } from "../../../hooks/useSearchMovie";

export const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  const windowHeight = Dimensions.get("window").height;

  const { mutate, data, isSuccess, isLoading, isError } = useSearchMovie(
    TMDB_API_KEY,
    searchInput
  );

  return (
    <ScrollView testID="searchBar">
      <KeyboardAvoidingView className="border border-white rounded flex-row mt-10">
        <View className="h-full border-r border-white p-4">
          <TouchableOpacity onPress={() => mutate()} testID="searchBtn">
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

      {isLoading && (
        <View
          className="absolute top-0 left-0 z-10 w-full flex flex-row justify-center items-center"
          style={{ height: windowHeight / 2 }}
        >
          <Loader size={80} color="#00ed82" />
        </View>
      )}

      {isSuccess && data.length === 0 && (
        <Text className="text-white text-2xl mt-10">
          Nous n'avons rien trouvé à propos de {searchInput}
        </Text>
      )}

      {isSuccess &&
        data.length > 0 &&
        data.map((x: IMovieData) => <Card key={x.id} data={x} />)}

      {isError && (
        <Text className="text-white text-2xl mt-10">
          Une erreur au niveau du serveur interne est survenue
        </Text>
      )}
    </ScrollView>
  );
};
