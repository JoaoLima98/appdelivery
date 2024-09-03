import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { Input, InputProps } from "../ui/Input";
import { cn } from "@/lib/cn";

export function ControllerTextInput<FormType extends FieldValues>({
  control,
  name,
  passwordType,
  messageErrorClassname,
  ...textInputProps
}: UseControllerProps<FormType> &
  InputProps & { passwordType?: boolean; messageErrorClassname?: string }) {
  const [showPassword, setShowPassword] = useState(passwordType);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <View className="flex flex-row items-center w-full gap-5">
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
            <Text
              className={cn(
                "text-red-700 font-bold -mt-4",
                messageErrorClassname,
              )}
            >
              {error.message}
            </Text>
          ) : null}
        </>
      )}
    />
  );
}
