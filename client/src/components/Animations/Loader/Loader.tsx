import React from "react";
import { View, Dimensions } from "react-native";
import { SkypeIndicator } from "react-native-indicators";

const { height } = Dimensions.get("window");

export const Loader: React.FC = () => {
  return (
    <View
      className="absolute top-0 left-0 z-10 w-full flex flex-row justify-center items-center"
      style={{ height: height / 2 }}
    >
      <SkypeIndicator color="#00ed82" size={80} />
    </View>
  );
};
