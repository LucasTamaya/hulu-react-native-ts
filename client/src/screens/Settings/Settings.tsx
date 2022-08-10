import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RouteParams } from "../../navigation/RootNavigator";
import Header from "../../components/Dashboard/Header";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnimatePresence } from "moti";
import Logout from "../../components/SettingsPopUp/Logout";
import ChangePassword from "../../components/SettingsPopUp/ChangePassword";

interface Props {}

export const Settings: React.FC<Props> = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const [logOutPopUp, setLogOutPopUp] = useState<boolean>(false);
  const [changePasswordPopUp, setChangePasswordPopUp] =
    useState<boolean>(false);

  return (
    <SafeAreaView className="bg-[#151516] h-full">
      <ScrollView>
        <Header />
        <Text className="text-white text-2xl font-bold mt-10 ml-10">
          Paramètres
        </Text>
        <View className="border-t border-b border-white mt-10">
          <TouchableOpacity onPress={() => setLogOutPopUp(true)}>
            <View className="flex-row justify-between items-center p-5">
              <View className="flex-row items-center">
                <AntDesign name="logout" size={20} color="#fff" />
                <Text className="text-white ml-2">Déconnexion</Text>
              </View>
              <AntDesign name="arrowright" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="border-t border-b border-white">
          <TouchableOpacity onPress={() => setChangePasswordPopUp(true)}>
            <View className="flex-row justify-between items-center p-5">
              <View className="flex-row items-center">
                <FontAwesome name="user-secret" size={20} color="#fff" />
                <Text className="text-white ml-2">
                  Changer mon mot de passe
                </Text>
              </View>
              <AntDesign name="arrowright" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View className="border-t border-b border-white">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Legal");
            }}
          >
            <View className="flex-row justify-between items-center p-5">
              <View className="flex-row items-center">
                <FontAwesome name="legal" size={20} color="#fff" />
                <Text className="text-white ml-2">Mentions légales</Text>
              </View>
              <AntDesign name="arrowright" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="border-t border-b border-white">
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://www.linkedin.com/in/lucas-tamaya-41a09621b/"
              );
            }}
          >
            <View className="flex-row justify-between items-center p-5">
              <View className="flex-row items-center">
                <AntDesign name="linkedin-square" size={20} color="#fff" />
                <Text className="text-white ml-2">Linkedin</Text>
              </View>
              <AntDesign name="arrowright" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="border-t border-b border-white">
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://github.com/LucasTamaya");
            }}
          >
            <View className="flex-row justify-between items-center p-5">
              <View className="flex-row items-center">
                <AntDesign name="github" size={20} color="#fff" />
                <Text className="text-white ml-2">Github</Text>
              </View>
              <AntDesign name="arrowright" size={15} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AnimatePresence>
        {logOutPopUp && <Logout setLogOutPopUp={setLogOutPopUp} />}
      </AnimatePresence>

      <AnimatePresence>
        {changePasswordPopUp && (
          <ChangePassword setChangePasswordPopUp={setChangePasswordPopUp} />
        )}
      </AnimatePresence>
    </SafeAreaView>
  );
};
