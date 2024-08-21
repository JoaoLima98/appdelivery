import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { Input, InputProps } from "../ui/Input";

export function ControllerTextInput<FormType extends FieldValues>({
  control,
  name,
  passwordType,
  ...textInputProps
}: UseControllerProps<FormType> & InputProps & { passwordType?: boolean }) {
  const [showPassword, setShowPassword] = useState(passwordType);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <View
            className="flex flex-row items-center w-full"
            style={{ gap: 12 }}
          >
            <Input
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              secureTextEntry={showPassword}
              className="flex-1"
              {...textInputProps}
            />

            {passwordType ? (
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                className="mt-7 p-2"
              >
                <Feather size={26} name={!showPassword ? "eye" : "eye-off"} />
              </Pressable>
            ) : null}
          </View>
          {error?.message ? (
            <Text className="text-red-700 -mt-4">{error.message}</Text>
          ) : null}
        </>
      )}
    />
  );
}
