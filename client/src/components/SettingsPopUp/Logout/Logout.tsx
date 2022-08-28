import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RouteParams } from "../../../navigation/RootNavigator";

interface Props {
  setLogoutPopUp: (state: boolean) => void;
}

export const Logout: React.FC<Props> = ({ setLogoutPopUp }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

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
      testID="logoutPopUp"
    >
      <View className="w-full bg-white rounded-md p-5">
        <Text className="text-lg text-center font-bold mb-8">
          Vous nous quittez déjà ?
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          testID="disconnectBtn"
        >
          <View className="w-full py-4 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5">
            <Text className="uppercase text-black font-bold">
              Me déconnecter
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLogoutPopUp(false)}
          testID="cancelBtn"
        >
          <View className="w-full py-4 flex flex-row justify-center items-center bg-[#2e2e30] rounded-md">
            <Text className="uppercase text-white font-bold">Annuler</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
};
