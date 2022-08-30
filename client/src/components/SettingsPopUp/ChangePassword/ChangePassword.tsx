import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotiView, AnimatePresence } from "moti";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

import { updatePasswordValidationSchema } from "../../../schemas/validation";
import StateMessage from "../../StateMessage";
import { IUpdatePasswordFormValues } from "../../../interfaces";
import { BASE_URL } from "../../../utils/urlTemplate";
import { AppContext, AppContextType } from "../../../contexts/AppContext";
import Loader from "../../Animations/Loader";

interface Props {
  setChangePasswordPopUp: (state: boolean) => void;
}

export const ChangePassword: React.FC<Props> = ({ setChangePasswordPopUp }) => {
  const { userId } = useContext(AppContext) as AppContextType;

  const windowHeight = Dimensions.get("window").height;

  // tous les outils nécessaires afin de gérer mon formulaire
  const { control, handleSubmit } = useForm<IUpdatePasswordFormValues>({
    resolver: yupResolver(updatePasswordValidationSchema),
  });

  const onSubmit = (data: IUpdatePasswordFormValues): void => {
    Keyboard.dismiss();
    mutate(data);
  };

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
  }: IUpdatePasswordFormValues): Promise<any> => {
    const { data } = await axios.post(`${BASE_URL}/update/password/${userId}`, {
      currentPassword,
      newPassword,
    });
    return data;
  };

  const { isLoading, error, data, mutate } = useMutation(handleChangePassword);

  return (
    <MotiView
      className="absolute top-0 left-0 w-full flex flex-col justify-center items-center bg-black/70 px-5"
      style={{ height: windowHeight }}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      testID="changePasswordPopUp"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="bg-white w-full p-5 rounded-md">
          <Text className="font-bold mb-2 uppercase">Mot de passe actuel</Text>
          <KeyboardAvoidingView className="mb-10">
            <Controller
              control={control}
              name="currentPassword"
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
                    testID="currentPassword-input"
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
            <Text className="font-bold mb-2 uppercase mt-10">
              Nouveau mot de passe
            </Text>
            <Controller
              control={control}
              name="newPassword"
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
                    testID="newPassword-input"
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
            testID="modify-btn"
          >
            <View className="w-full h-12 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5">
              {isLoading ? (
                <Loader size={30} color="black" />
              ) : (
                <Text className="uppercase text-black font-bold">Modifier</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setChangePasswordPopUp(false)}
            testID="cancel-btn"
          >
            <View className="w-full h-12 flex flex-row justify-center items-center bg-[#2e2e30] rounded-md">
              <Text className="uppercase text-white font-bold">Annuler</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      {/* Message d'erreur ou de succès lors de la validation du formulaire */}
      <AnimatePresence>
        <View className="mb-5">
          {data && <StateMessage message={data?.details} error={data?.error} />}
          {error && (
            <StateMessage message="Erreur du serveur interne" error={true} />
          )}
        </View>
      </AnimatePresence>
    </MotiView>
  );
};
