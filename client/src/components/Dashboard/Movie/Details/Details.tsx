import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import { IMovieData } from "../../../../interfaces";
import { BASE_URL } from "../../../../utils/urlTemplate";
import { AppContext, AppContextType } from "../../../../contexts/AppContext";

interface Props {
  data: IMovieData;
  save: boolean;
  setSave: (state: boolean) => void;
}

export const Details: React.FC<Props> = ({ data, save, setSave }) => {
  const { userId, savedMovieIds, setSavedMovieIds } = useContext(
    AppContext
  ) as AppContextType;

  const handleSaveMovie = () => {
    if (save) {
      setSave(false);
      unsaveMovie();
    } else {
      setSave(true);
      saveMovie();
    }
  };

  // sauvegarde le film
  const saveMovie = async () => {
    // update rapide côté frontend, pour voir les modifications casi instantannément
    setSavedMovieIds([...savedMovieIds, data.id]);
    // update côté backend qui prend un peu plus de temps
    try {
      await axios.post(`${BASE_URL}/movie/save/${userId}`, {
        filmId: data.id,
      });
    } catch (error: any) {}
  };

  // supprime la sauvegarde du film
  const unsaveMovie = async () => {
    // crée un nouveau tableau en filtrant uniquement les ids qui sont différents du film
    const savedFilmIdsUpdate = savedMovieIds.filter((id) => {
      return id !== data.id;
    });
    setSavedMovieIds([...savedFilmIdsUpdate]);
    try {
      await axios.post(`${BASE_URL}/movie/unsave/${userId}`, {
        filmId: data.id,
      });
    } catch (error: any) {}
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
      <TouchableOpacity onPress={handleSaveMovie} testID="saveBtn">
        <View className="w-[30px] h-[30px] flex-row justify-center items-center">
          {/* si film sauvegardé, coeur plein, sinon coeur vide */}
          {save ? (
            <FontAwesome
              name="heart"
              size={25}
              color="#fff"
              testID="heartIcon"
            />
          ) : (
            <FontAwesome
              name="heart-o"
              size={25}
              color="#fff"
              testID="emptyHeartIcon"
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
