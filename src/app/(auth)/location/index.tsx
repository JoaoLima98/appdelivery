import { Input } from "@/components/ui/Input";
import { Feather } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { useForm, Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React from "react";

const Location = () => {
  const { setItem, getItem } = useAsyncStorage("@cep");
  const [cep, setCEP] = useState<string>();
  const [localization, setLocalization] = useState({
    latitude: 49.2576508,
    longitude: -123.2639868,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const { control, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

  const searchCEP = async ({ cep }: any) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json`,
    );

    const data = await response.json();

    setLocalization({
      ...localization,
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    });
  };

  const initialRegion = {
    latitude: 49.2576508,
    longitude: -123.2639868,
    latitudeDelta: 100,
    longitudeDelta: 100,
  };

  const getCart = async () => {
    const cepItem = await getItem();
    setCEP(cepItem || "");
    setValue("cep", cepItem || "");
    searchCEP({ cep: cepItem });
  };

  useFocusEffect(
    React.useCallback(() => {
      getCart();
      return () => {};
    }, []),
  );

  return (
    <View className="flex-col justify-center items-center pt-5 px-2">
      <Text className="text-primary font-bold text-2xl">
        Cadastrar endereço
      </Text>
      <Controller
        control={control}
        name="cep"
        rules={{
          required: "O CEP é obrigatório.",
          pattern: {
            value: /^[0-9]{8}$/,
            message: "O CEP deve conter exatamente 8 dígitos numéricos.",
          },
        }}
        render={({ field }) => (
          <View className="flex-row items-center justify-between gap-3 mt-5">
            <Input
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              className="flex-1"
              placeholder="Digite seu CEP"
              cursorColor="#b91c1c"
              defaultValue={cep}
              keyboardType="numeric"
            />
            <Pressable
              className="p-3 bg-primary rounded-full"
              onPress={handleSubmit(searchCEP)}
            >
              <Feather name="search" size={24} color="#ffffff" />
            </Pressable>
          </View>
        )}
      />
      {errors.cep && (
        <Text className="text-red-600 mt-1">{errors.cep.message}</Text>
      )}

      <MapView
        style={{
          height: "80%",
          width: "100%",
          marginTop: 12,
          borderRadius: 12,
          marginBottom: 8,
        }}
        region={localization}
        initialRegion={initialRegion}
      >
        <Marker
          calloutAnchor={{
            x: 2.9,
            y: 0.8,
          }}
          coordinate={localization}
        ></Marker>
      </MapView>

      <Button
        text="Cadastrar CEP"
        className="w-full"
        onPress={async () => {
          await setItem(getValues("cep"));
          router.back();
        }}
      />
    </View>
  );
};

export default Location;
