import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteParams } from "../../../navigation/RootNavigator";

export const Header: React.FC = () => {
  const { height, width } = Dimensions.get("window");

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  return (
    <View testID="header">
      <ImageBackground
        source={require("../../../../assets/images/header.jpg")}
        resizeMode="cover"
        style={{ height: height, width: width }}
      />
      <View className="absolute top-0 left-0 w-full flex flex-row justify-between items-center p-5">
        <Image
          source={require("../../../../assets/images/logo.png")}
          className="w-[60px] h-[20px]"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-white text-lg font-bold">LOG IN</Text>
        </TouchableOpacity>
      </View>

      <View className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-y-5 px-4">
        <Text className="text-[#01ED83] text-lg text-center uppercase font-bold">
          Regardez vos films et séries préférés
        </Text>
        <Image
          source={require("../../../../assets/images/logos.png")}
          resizeMode="contain"
          className="w-[280px] h-[70px]"
        />
        <Text className="text-white font-bold text-xl text-center max-w-[670px]">
          Obtenez un divertissement sans fin, des sports en direct, et les
          émissions et films que vous aimez.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} testID="login-btn">
          <View className="bg-[#01ED83] py-4 w-72 flex flex-row justify-center items-center rounded-md">
            <Text className="text-black font-bold uppercase">
              Connexion à mon compte
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
