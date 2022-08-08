import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import Header from "../../components/Dashboard/Header";
import Nav from "../../components/Dashboard/Nav";
import { getUserId } from "../../utils/asyncStorage";
import { UserIdContext } from "../../Contexts/UserIdContext";
import List from "../../components/Dashboard/Movie/List";

interface Props {}

export const Dashboard: React.FC<Props> = ({}) => {
  // index afin de changer de catégorie pour afficher différents types de films
  const [index, setIndex] = useState<number>(0);
  const [userId, setUserId] = useState<string | any>("");

  // création de la référence au document contenant la liste d'IDS des films sauvegardés dans firebase
  const getDocRef = async () => {
    const userId = await getUserId();
    setUserId(userId);
  };

  useEffect(() => {
    getDocRef();
  }, []);

  return (
    <SafeAreaView className="bg-[#151516] h-full">
      <UserIdContext.Provider value={{ index, userId, setIndex }}>
        <Header />
        <ScrollView className="bg-[#151516] mt-10">
          <Nav />
          <List />
        </ScrollView>
      </UserIdContext.Provider>
    </SafeAreaView>
  );
};
