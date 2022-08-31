import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import eventsData from "../../../../assets/data/events";
import { RouteParams } from "../../../navigation/RootNavigator";

export const Events = () => {
  const [index, setIndex] = useState(0);

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  return (
    <ScrollView testID="events">
      <ImageBackground
        source={{ uri: eventsData[index].bgUri }}
        resizeMode="cover"
        style={{ width: "100%", height: 700, position: "relative" }}
        testID="bgImage"
      >
        <View className="absolute top-0 left-0 w-full h-full flex flex-col items-center pt-8 bg-black/30">
          <View className="flex flex-row items-center gap-x-6 px-8">
            <TouchableOpacity
              onPress={() => setIndex(0)}
              testID="liveSportsBtn"
            >
              <Text
                className={`relative text-xs text-center uppercase font-bold cursor-pointer transition ${
                  index === 0 ? "text-white" : "text-[#cccccc]"
                }`}
              >
                Live sports
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIndex(1)}
              testID="breakingNewsBtn"
            >
              <Text
                className={`relative text-xs text-center uppercase font-bold cursor-pointer transition ${
                  index === 1 ? "text-white" : "text-[#cccccc]"
                }`}
              >
                Breaking news
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIndex(2)}
              testID="biggestEventsBtn"
            >
              <Text
                className={`relative text-xs text-center uppercase font-bold cursor-pointer transition ${
                  index === 2 ? "text-white" : "text-[#cccccc]"
                }`}
              >
                Biggest events
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-[0.6] flex flex-col justify-center items-center gap-y-5">
            <Text className="text-white text-4xl sm:text-5xl font-bold mt-10">
              {eventsData[index].title}
            </Text>

            <Text className="text-white max-w-[420px] text-center px-5">
              {eventsData[index].description}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              testID="loginNavBtn"
            >
              <View className="bg-[#01ED83] py-4 w-72 flex flex-row justify-center items-center rounded-md">
                <Text className="uppercase text-black font-bold">
                  Connexion à mon compte
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};
