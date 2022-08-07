import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { MotiView } from "moti";

const Logout = ({ navigation, setLogOutPopUp }) => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <MotiView
      className="absolute w-full bg-black/70 flex-row justify-center items-center px-5"
      style={{ height: windowHeight }}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
    >
      <View className="w-full bg-white rounded-md p-5">
        <Text className="text-lg text-center font-bold mb-8">
          Vous nous quittez déjà ?
        </Text>
        <TouchableOpacity
          className="w-full py-4 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="uppercase text-black font-bold">Me déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full py-4 flex flex-row justify-center items-center bg-[#2e2e30] rounded-md"
          onPress={() => setLogOutPopUp(false)}
        >
          <Text className="uppercase text-white font-bold">Annuler</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};

export default Logout;
