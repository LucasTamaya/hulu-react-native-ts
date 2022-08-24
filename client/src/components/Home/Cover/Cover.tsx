import { View, Text, ImageBackground } from "react-native";
import React from "react";

import { ICover } from "../../../interfaces";

export const Cover: React.FC<ICover> = ({ bgSrc, details, category }) => {
  return (
    <ImageBackground
      source={bgSrc}
      resizeMode="cover"
      style={{
        width: "100%",
        maxWidth: 294,
        height: 450,
        position: "relative",
        marginBottom: 40,
      }}
      testID="cover"
    >
      <View className="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-7 bg-black/30">
        <Text className="text-white text-xl z-10">{details}</Text>
        <Text className="text-white text-2xl z-10 font-bold">{category}</Text>
      </View>
    </ImageBackground>
  );
};
