import { View, Image } from "react-native";
import React from "react";

export const Header: React.FC = () => {
  return (
    <View className="flex-row justify-center mt-10" testID="header">
      <Image
        source={require("../../../../assets/images/logo.png")}
        className="w-[120px] h-[40px]"
        testID="header-img"
      />
    </View>
  );
};
