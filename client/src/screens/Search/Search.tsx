import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Dashboard/Header";
import SearchBar from "../../components/Dashboard/SearchBar";

interface Props {}

export const Search: React.FC<Props> = ({}) => {
  return (
    <SafeAreaView className="bg-[#151516] h-full" testID="search">
      <ScrollView className="px-7 mb-14">
        <Header />
        <SearchBar />
      </ScrollView>
    </SafeAreaView>
  );
};
