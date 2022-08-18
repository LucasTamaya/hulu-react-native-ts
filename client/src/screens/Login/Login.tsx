import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence } from "moti";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { setUserId } from "../../utils/asyncStorage";
import { loginValidationSchema } from "../../schemas/validation";
import { ILoginFormValues } from "../../interfaces/index";
import { RouteParams } from "../../navigation/RootNavigator";
import { BASE_URL } from "../../utils/urlTemplate";
import { AppContext, AppContextType } from "../../contexts/AppContext";
import StateMessage from "../../components/StateMessage";
import Loader from "../../components/Animations/Loader";

export const Login: React.FC = () => {
  const { setSavedMovieIds } = useContext(AppContext) as AppContextType;

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  // tous les outils nécessaires afin de gérer mon formulaire
  const { control, handleSubmit } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: ILoginFormValues): void => {
    Keyboard.dismiss();
    mutate(data);
  };

  const handleChangeLogin = async ({
    email,
    password,
  }: ILoginFormValues): Promise<any> => {
    const { data } = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    // si l'email et le mot de passe sont valides
    if (!data.error) {
      console.log("Email et mot de passe valide");

      // on enregistre l'id de l'utilisateur dans le asyncStorage afin de pouvoir intéragir avec son document dans la BDD
      await setUserId(data.userId);

      // on enregistre la liste d'ids des films
      setSavedMovieIds(data.savedFilmIds);

      // fait une pause de 1.5 secondes pour afficher un message
      setTimeout(() => {
        // redirige l'utilisateur vers le dashboard
        navigation.navigate("UserLogged");
      }, 2000);
    }

    return data;
  };

  const { isLoading, error, data, mutate } = useMutation(handleChangeLogin);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="w-full h-full flex flex-col justify-center items-center px-5 bg-[#151516]">
        <View className="bg-white w-full p-5 rounded-md mb-5">
          <Text className="text-black font-bold text-3xl mb-10">Connexion</Text>
          <KeyboardAvoidingView className="mb-10">
            <Text className="font-bold mb-2 uppercase">Email</Text>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value || ""}
                    className="border-2 border-black px-4 py-2 rounded"
                    onChangeText={onChange}
                    keyboardType="email-address"
                    secureTextEntry={false}
                  />
                  {/* Message d'erreur, si erreur il y a */}
                  {!!error && (
                    <Text className="text-red-500 text-xs">
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Text className="font-bold mb-2 mt-10 uppercase">Mot de passe</Text>
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value || ""}
                    className="border-2 border-black px-4 py-2 rounded"
                    onChangeText={onChange}
                    secureTextEntry={true}
                    keyboardType="web-search"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  {/* Message d'erreur, si erreur il y a */}
                  {!!error && (
                    <Text className="text-red-500 text-xs">
                      {error?.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </KeyboardAvoidingView>

          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View className="w-full h-12 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5">
              {isLoading ? (
                <Loader size={30} color="black" />
              ) : (
                <Text className="uppercase text-black font-bold">
                  Connexion
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Text>Pas encore de compte? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-[#61AFFB] underline">Créer mon compte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Message d'erreur ou de succès lors de la validation du formulaire */}
        <AnimatePresence>
          <View>
            {data && (
              <StateMessage message={data?.details} error={data?.error} />
            )}
            {error && (
              <StateMessage message="Erreur du serveur interne" error={true} />
            )}
          </View>
        </AnimatePresence>
      </View>
    </TouchableWithoutFeedback>
  );
};
