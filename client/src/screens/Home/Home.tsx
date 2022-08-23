import { ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Home/Header";
import AllTheTvYouLove from "../../components/Home/AllTheTvYouLove";
import LiveTvMakesItBetter from "../../components/Home/LiveTvMakesItBetter";
import Events from "../../components/Home/Events";

export const Home: React.FC = () => {
  return (
    <ScrollView className="bg-[#151516]" testID="home">
      <SafeAreaView className="h-full">
        <Header />
        <ScrollView>
          <AllTheTvYouLove />
          <LiveTvMakesItBetter />
          <Events />
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};
