import { ScrollView, Text, TouchableOpacity } from "react-native";
import React from "react";

const Nav = ({ setIndex }) => {
  return (
    <ScrollView horizontal={true} className="flex-row gap-x-10">
      <TouchableOpacity onPress={() => setIndex(0)}>
        <Text className="text-white font-bold text-lg pl-10">Tendance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(1)}>
        <Text className="text-white font-bold text-lg">Mieux notés</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(2)}>
        <Text className="text-white font-bold text-lg">Action</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(3)}>
        <Text className="text-white font-bold text-lg">Comédie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(4)}>
        <Text className="text-white font-bold text-lg">Horreur</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(5)}>
        <Text className="text-white font-bold text-lg">Romance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(6)}>
        <Text className="text-white font-bold text-lg">Mystère</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(7)}>
        <Text className="text-white font-bold text-lg">SciFi</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(8)}>
        <Text className="text-white font-bold text-lg">Western</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(9)}>
        <Text className="text-white font-bold text-lg">Animation</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIndex(10)}>
        <Text className="text-white font-bold text-lg">Films TV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Nav;
