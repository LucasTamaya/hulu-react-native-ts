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
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotiView, AnimatePresence } from "moti";
import axios from "axios";

import { updatePasswordValidationSchema } from "../../../schemas/validation";
import SuccessMessage from "../../StateMessages/SuccessMessage";
import ErrorMessage from "../../StateMessages/ErrorMessage";
import { IUpdatePasswordFormValues } from "../../../interfaces";
import { BASE_URL } from "../../../utils/urlTemplate";
import { AppContext, AppContextType } from "../../../contexts/AppContext";

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

  const onSubmit = handleSubmit(
    async ({ currentPassword, newPassword }): Promise<void> => {
      console.log("testtts");
      Keyboard.dismiss();

      try {
        const { data } = await axios.post(
          `${BASE_URL}/update/password/${userId}`,
          {
            currentPassword,
            newPassword,
          }
        );

        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );

  return (
    <MotiView
      className="absolute top-0 left-0 w-full flex flex-col justify-center items-center bg-black/70 px-5"
      style={{ height: windowHeight }}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
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
                    onSubmitEditing={onSubmit}
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

          <TouchableOpacity onPress={onSubmit}>
            <View className="w-full py-4 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5">
              <Text className="uppercase text-black font-bold">Modifier</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setChangePasswordPopUp(false)}>
            <View className="w-full py-4 flex flex-row justify-center items-center bg-[#2e2e30] rounded-md">
              <Text className="uppercase text-white font-bold">Annuler</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Si aucune erreur lors de la requête */}
        {/* <AnimatePresence className="mb-5">
        {success ? <SuccessMessage message={success} /> : <></>}
      </AnimatePresence> */}

        {/* Si erreur lors de la requête */}
        {/* <AnimatePresence>
        {error ? <ErrorMessage message={error} /> : <></>}
      </AnimatePresence> */}
      </TouchableWithoutFeedback>
    </MotiView>
  );
};
