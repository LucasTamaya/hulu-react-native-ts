import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import Header from "../../components/Dashboard/Header";
import Nav from "../../components/Dashboard/Nav";
import List from "../../components/Dashboard/Movie/List";
import { getUserId } from "../../utils/asyncStorage";
import { AppContext, AppContextType } from "../../contexts/AppContext";

interface Props {}

export const Dashboard: React.FC<Props> = ({}) => {
  // index afin de changer de catégorie pour afficher différents types de films
  // const [index, setIndex] = useState<number>(0);
  // const [userId, setUserId] = useState<string | any>("");

  const { setUserId } = useContext(AppContext) as AppContextType

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
      {/* <AppContext.Provider value={{ index, userId, setIndex }}> */}
      <Header />
      <ScrollView className="bg-[#151516] mt-10">
        <Nav />
        <List />
      </ScrollView>
      {/* </AppContext.Provider> */}
    </SafeAreaView>
  );
};
