import { AntDesign, Entypo } from "@expo/vector-icons";
import { MotiView } from "moti";
import React from "react";
import { Dimensions, Text, View } from "react-native";

interface Props {
  message: string;
  error: boolean;
}

export const StateMessage: React.FC<Props> = ({ message, error }) => {
  const windowWidth = Dimensions.get("window").width;

  return (
    <MotiView
      className="absolute p-2 flex flex-row justify-center"
      style={{ width: windowWidth }}
      from={{ opacity: 0, left: -windowWidth }}
      animate={{ opacity: 1, left: -windowWidth / 2 }}
      exit={{
        opacity: 0,
      }}
    >
      <View
        className={`${
          error === true ? "bg-red-500" : "bg-green-500"
        } w-fit flex flex-row items-center gap-x-2 px-3 py-3 rounded`}
      >
        <Text className="text-white font-bold">{message}</Text>
        {error === true ? (
          <Entypo name="cross" size={20} color="#fff" testID="crossIcon" />
        ) : (
          <AntDesign name="check" size={20} color="#fff" testID="checkIcon" />
        )}
      </View>
    </MotiView>
  );
};
