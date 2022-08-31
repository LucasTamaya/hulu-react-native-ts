import { ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { AppContext, AppContextType } from "../../../contexts/AppContext";

export const Nav: React.FC = () => {
  const { setIndex } = useContext(AppContext) as AppContextType;

  return (
    <ScrollView horizontal={true} className="flex-row gap-x-10" testID="nav">
      <TouchableOpacity onPress={() => setIndex(0)} testID="navBtn">
        <Text className="text-white font-bold text-lg pl-10">Tendance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(1)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Mieux notés</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(2)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Action</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(3)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Comédie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(4)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Horreur</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(5)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Romance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(6)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Mystère</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(7)} testID="navBtn">
        <Text className="text-white font-bold text-lg">SciFi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(8)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Western</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(9)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Animation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(10)} testID="navBtn">
        <Text className="text-white font-bold text-lg">Films TV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
