import { View, Image } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View className="flex-row justify-center mt-10">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-[120px] h-[40px]"
      />
    </View>
  );
};

export default Header;
