import { View, Text, ScrollView } from "react-native";
import React from "react";

import Cover from "../Cover";
import coversData from "../../../../assets/data/covers";

export const AllTheTvYouLove: React.FC = () => {
  return (
    <ScrollView className="bg-[#151516]">
      <View className="flex flex-col items-center gap-y-5 px-5 mt-7">
        <Text className="text-[#00ed82] text-sm uppercase font-bold">
          Inclus dans tous les plans
        </Text>

        <Text className="text-white text-center font-bold text-3xl">
          All The TV You Love
        </Text>

        <Text className="text-white text-center max-w-[860px] mb-12">
          Regardez en streaming des saisons complètes de séries exclusives, des
          épisodes de la saison en cours, des films à succès, des programmes
          originaux Hulu, des émissions pour enfants, et bien plus encore.
        </Text>
      </View>

      <View className="w-full flex flex-col items-center mt-7">
        {coversData.map((cover, index) => (
          <Cover
            key={index}
            details={cover.details}
            category={cover.category}
            bgSrc={cover.bgSrc}
          />
        ))}
      </View>
    </ScrollView>
  );
};
