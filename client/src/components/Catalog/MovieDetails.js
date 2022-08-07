import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";

const MovieDetails = ({ data, save, setSave, docRef }) => {
  // ajoute l'id du film dans la liste d'ids de films sauvegardés au niveau de firebase
  const saveFilm = async () => {
    try {
      await updateDoc(docRef, { moviesList: arrayUnion(data.id) });
    } catch (error) {
      console.log(error.message);
    }
  };

  // supprime l'id du film dans la liste d'ids de films sauvegardés au niveau de firebase
  const unsaveFilm = async () => {
    try {
      await updateDoc(docRef, { moviesList: arrayRemove(data.id) });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View className="absolute top-0 left-0 bg-[#2e2e30]/90 w-full h-full p-4">
      <Text className="text-white text-2xl text-center font-bold mb-3">
        {data.original_title || data.original_name}
      </Text>
      <Text
        numberOfLines={12}
        className="text-white text-base mb-3 max-h-[310px]"
      >
        {data.overview || "Aucune description pour ce film."}
      </Text>

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-white">
          {data.release_date || data.first_air_date}
        </Text>
        <View className="flex-row items-center gap-x-1">
          <FontAwesome name="thumbs-o-up" size={20} color="#fff" />
          <Text className="text-sm text-white">{data.vote_count}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (save) {
            setSave(!save);
            unsaveFilm();
          } else {
            setSave(!save);
            saveFilm();
          }
        }}
        className="w-[30px] h-[30px] flex-row justify-center items-center"
      >
        {/* si film sauvegardé, coeur plein, sinon coeur vide */}
        {save ? (
          <FontAwesome name="heart" size={25} color="#fff" />
        ) : (
          <FontAwesome name="heart-o" size={25} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
