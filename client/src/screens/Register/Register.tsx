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
import { registerValidationSchema } from "../../schemas/validation";
import { IRegisterFormValues } from "../../interfaces/index";
import { RouteParams } from "../../navigation/RootNavigator";
import { BASE_URL } from "../../utils/urlTemplate";
import { AppContext, AppContextType } from "../../contexts/AppContext";
import StateMessage from "../../components/StateMessage";
import Loader from "../../components/Animations/Loader";

export const Register: React.FC = () => {
  const { setSavedMovieIds } = useContext(AppContext) as AppContextType;

  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  // tous les outils nécessaires afin de gérer mon formulaire
  const { control, handleSubmit } = useForm<IRegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (data: IRegisterFormValues): void => {
    Keyboard.dismiss();
    mutate(data);
  };

  const handleChangeRegister = async ({
    name,
    email,
    password,
  }: IRegisterFormValues): Promise<any> => {
    const { data } = await axios.post(`${BASE_URL}/register`, {
      email,
      name,
      password,
    });

    // si l'email et le mot de passe sont valides
    if (!data.error) {
      console.log("Nouvel utilisateur crée");
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

  const { isLoading, error, data, mutate } = useMutation(handleChangeRegister);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      testID="register"
    >
      <View className="w-full h-full flex flex-col justify-center items-center px-5 bg-[#151516]">
        <View className="bg-white w-full p-5 rounded-md">
          <Text className="text-black font-bold text-3xl mb-10">Connexion</Text>

          <KeyboardAvoidingView className="mb-10">
            <Text className="font-bold mb-2 uppercase">Nom d'utilisateur</Text>
            <Controller
              control={control}
              name="name"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View>
                  <TextInput
                    value={value || ""}
                    className="border-2 border-black px-4 py-2 rounded"
                    onChangeText={onChange}
                    testID="registerNameInput"
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

            <Text className="font-bold mb-2 mt-10 uppercase">Email</Text>
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
                    testID="registerEmailInput"
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
                    testID="registerPwdInput"
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

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            testID="registerBtn"
          >
            <View className="w-full h-12 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5">
              {isLoading ? (
                <Loader size={30} color="black" />
              ) : (
                <Text className="uppercase text-black font-bold">
                  Créer mon compte
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Text>Déjà un compte ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              testID="loginNavBtn"
            >
              <Text className="text-[#61AFFB] underline">Me connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Message d'erreur ou de succès lors de la validation du formulaire */}
        <AnimatePresence>
          <View className="mb-12">
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
