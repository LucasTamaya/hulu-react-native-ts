import React from "react";
import { View, Dimensions } from "react-native";
import { SkypeIndicator } from "react-native-indicators";

interface Props {
  size: number;
  color: string;
}

export const Loader: React.FC<Props> = ({ size, color }) => {
  const { height } = Dimensions.get("window");
  return (
    // <View
    //   className="absolute top-0 left-0 z-10 w-full flex flex-row justify-center items-center bg-red-500"
    //   style={{ height: height / 2 }}
    // >
    //   <SkypeIndicator color="#00ed82" size={size} />
    // </View>
    <SkypeIndicator color={color} size={size} />
  );
};
