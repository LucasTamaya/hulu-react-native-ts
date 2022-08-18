import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, View, TextInput } from "react-native";
import {
  ILoginFormValues,
  IRegisterFormValues,
  IUpdatePasswordFormValues,
} from "../../interfaces";

enum ControlInterface {
  
}

interface Props {
  label: string;
  control: Control<ILoginFormValues | IUpdatePasswordFormValues>;
}

export const Input: React.FC<Props> = ({ label, control }) => {
  return (
    <View>
      <Text className="font-bold mb-2 uppercase">{label}</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              value={value || ""}
              className="border-2 border-black px-4 py-2 rounded"
              onChangeText={onChange}
            />
            {/* Message d'erreur, si erreur il y a */}
            {!!error && (
              <Text className="text-red-500 text-xs">{error?.message}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
