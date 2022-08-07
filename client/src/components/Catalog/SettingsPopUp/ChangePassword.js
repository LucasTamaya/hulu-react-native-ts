import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotiView, AnimatePresence } from "moti";

import { auth } from "../../../firebase-config";
import { updatePwdValidationSchema } from "../../../utils/validationSchemas";
import SuccessMessage from "../../StateMessages/SuccessMessage";
import ErrorMessage from "../../StateMessages/ErrorMessage";

const ChangePassword = ({ setChangePasswordPopUp }) => {
  const windowHeight = Dimensions.get("window").height;

  // tous les outils nécessaires afin de gérer mon formulaire
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePwdValidationSchema),
  });

  let user = auth.currentUser;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (input) => {
    setError("");
    Keyboard.dismiss();
    // on récupère les credits de l'utilisateur: email + mot de passe
    const credentials = EmailAuthProvider.credential(
      user.email,
      input.currentPassword
    );

    // on réauthentifie l'utilisateur afin de s'assurer qu'il connaisse le mot de passe actuel, avant de le modifier
    reauthenticateWithCredential(user, credentials)
      // si la réauthentification est réussie
      .then(() => {
        console.log("réauthentification réussi");
        // on met à jour le mot de passe
        updatePassword(user, input.newPassword)
          .then(() => {
            // affichage du message de réussite
            setSuccess("Mot de passe modifié");
            // marque un petit temps d'arrêt pour afficher le message
            setTimeout(() => {
              // fermeture du pop up
              setChangePasswordPopUp(false);
            }, 2000);
          })
          // si errreur lors de l'update du mot de passe
          .catch((error) => {
            console.log(error.message);
            setError("Une erreur inconnue est survenue");
          });
      })
      // sinon, on affiche un message d'erreur
      .catch((error) => {
        console.log(error.message);
        setError("Mot de passe actuel invalide");
      });
  };

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
      <View className="bg-white w-full p-5 rounded-md">
        <Text className="font-bold mb-2 uppercase">Mot de passe actuel</Text>
        <KeyboardAvoidingView className="mb-10">
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <TextInput
                  value={value || ""}
                  className="border-2 border-black px-4 py-2 rounded"
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
                {/* Message d'erreur, si erreur il y a */}
                {!!error && (
                  <Text className="text-red-500 text-xs">{error?.message}</Text>
                )}
              </View>
            )}
          />
        </KeyboardAvoidingView>

        <KeyboardAvoidingView className="mb-10">
          <Text className="font-bold mb-2 uppercase">Nouveau mot de passe</Text>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <TextInput
                  value={value || ""}
                  className="border-2 border-black px-4 py-2 rounded"
                  onChangeText={onChange}
                  secureTextEntry={true}
                  keyboardType="web-search"
                  onSubmitEditing={handleSubmit(handleInput)}
                />
                {/* Message d'erreur, si erreur il y a */}
                {!!error && (
                  <Text className="text-red-500 text-xs">{error?.message}</Text>
                )}
              </View>
            )}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity
          className="w-full py-4 flex flex-row justify-center items-center bg-[#01ED83] rounded-md mb-5"
          onPress={handleSubmit(handleInput)}
        >
          <Text className="uppercase text-black font-bold">Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full py-4 flex flex-row justify-center items-center bg-[#2e2e30] rounded-md"
          onPress={() => setChangePasswordPopUp(false)}
        >
          <Text className="uppercase text-white font-bold">Annuler</Text>
        </TouchableOpacity>
      </View>
      {/* Si aucune erreur lors de la requête */}
      <AnimatePresence className="mb-5">
        {success ? <SuccessMessage message={success} /> : <></>}
      </AnimatePresence>

      {/* Si erreur lors de la requête */}
      <AnimatePresence>
        {error ? <ErrorMessage message={error} /> : <></>}
      </AnimatePresence>
    </MotiView>
  );
};

export default ChangePassword;
