import React, { useContext, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import Header from "../../components/Dashboard/Header";
import Nav from "../../components/Dashboard/Nav";
import List from "../../components/Dashboard/Movie/List";
import { getUserId } from "../../utils/asyncStorage";
import { AppContext, AppContextType } from "../../contexts/AppContext";

interface Props {}

export const Dashboard: React.FC<Props> = ({}) => {
  const { setUserId } = useContext(AppContext) as AppContextType;

  // création de la référence au document contenant la liste d'IDS des films sauvegardés dans firebase
  const getUserIdAsync = async () => {
    const userId = await getUserId();
    setUserId(userId);
  };

  useEffect(() => {
    getUserIdAsync();
  }, []);

  return (
    <SafeAreaView className="bg-[#151516] h-full">
      <Header />
      <ScrollView className="bg-[#151516] mt-10">
        <Nav />
        <List />
      </ScrollView>
    </SafeAreaView>
  );
};
