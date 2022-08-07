import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export const LiveTvMakesItBetter: React.FC = () => {
  return (
    <ScrollView className="bg-[#151516]">
      <View className="flex flex-col items-center gap-y-6 pb-5 px-5">
        <Text className="text-[#00ed82] text-sm text-center font-bold uppercase">
          Hulu + live tv, maintenant avec disney+ and espn+
        </Text>
        <Text className="text-white text-3xl text-center font-bold">
          Live TV Makes It Better
        </Text>
        <Text className="text-white text-center max-w-[730px]">
          Abandonnez le câble. Obtenez plus de 75 chaînes de premier plan sur
          Hulu avec vos sports, actualités et événements préférés en direct,
          ainsi que toute la bibliothèque de streaming Hulu. Avec le DVR
          illimité, stockez les enregistrements de Live TV jusqu'à neuf mois et
          faites une avance rapide sur le contenu de votre DVR. Accédez à un
          divertissement sans fin avec Disney+ et aux sports en direct avec
          ESPN+. Les trois pour un nouveau prix de 69,99 $/mois.
        </Text>

        <View className="flex flex-row items-center cursor-pointer gap-x-2 mb-8">
          <Text className="text-white text-center uppercase font-bold">
            Voir les chaînes dans votre région
          </Text>
          <AntDesign name="arrowright" size={15} color="#fff" />
        </View>
        <AntDesign name="arrowdown" size={15} color="#fff" />
      </View>
    </ScrollView>
  );
};
