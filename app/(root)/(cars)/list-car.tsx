import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/components/GoBack";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import ThemedModal from "@/components/ThemedModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { toastConfig } from "@/app/_layout";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import {
  CAR_TYPES,
  FUEL_TYPES,
  TRANSMISSIONS,
  MILEAGE_TYPES,
  FUEL_POLICIES,
  CONFIRMATION_POLICIES,
  CANCELLATION_POLICIES,
  INSURANCE_TYPES,
  CAR_BRANDS,
} from "@/constants/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema, CarSchemaType } from "@/lib/schema";
const ListCar = () => {
  const [years, setYears] = useState([]);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [trims, setTrims] = useState([]);

  const backgroundColor = useThemeColor({}, "background");

  const method = useForm<CarSchemaType>({
    resolver: zodResolver(carSchema),
    defaultValues: {},
  });

  const { control, handleSubmit, reset, setValue, watch } = method;
  const { make, year, model } = watch();
  const onSubmit = (data: CarSchemaType) => {
    alert("Issue reported successfully!");
    reset();
  };

  const apiBaseUrl = "https://www.carqueryapi.com/api/0.3/?cmd=";

  const getCarDetails = async (type, params = {}, fields?: string[]) => {
    let url = new URL(apiBaseUrl + type);

    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });
    try {
      const response = await fetch(url);
      const text = await response.text();

      const data = JSON.parse(text.replace(/^\?|\);$/g, "")); // Remove JSONP wrapper

      if (type === "getMakes")
        return (data.Makes || []).map((m) => String(m.make_display));

      if (type === "getModels")
        return (data.Models || []).map((m) => String(m.model_name));

      if (type === "getTrims")
        return (data.Trims || []).map((t) => String(t.model_trim));

      if (type === "getYears") {
        const { min_year, max_year } = data.Years || {};
        return min_year && max_year
          ? Array.from(
              { length: max_year - min_year + 1 },
              (_, i) => parseInt(min_year) + i
            )
          : [];
      }
      return [];
    } catch (error) {
      return [];
    }
  };
  (async () => {
    const makes = await getCarDetails("getMakes", { year: "2022" });

    const models = await getCarDetails("getModels", {
      make: "Toyota",
      year: "2022",
    });

    const trims = await getCarDetails("getTrims", {
      make: "Toyota",
      model: "Camry",
      year: "2022",
    });

    const years = await getCarDetails("getYears");
  })();
  useEffect(() => {
    const fetchYears = async () => {
      const availableYears = await getCarDetails("getYears");
      if (availableYears)
        setYears(availableYears.map((y) => ({ label: y, value: y + "" })));
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchMakes = async () => {
      const availableMakes = await getCarDetails("getMakes", { year });

      if (availableMakes)
        setMakes(
          availableMakes.map((m) => ({
            label: m,
            value: m,
          }))
        );
    };

    if (year) fetchMakes();
  }, [year]);

  useEffect(() => {
    const fetchModels = async () => {
      const avaiabeModels = await getCarDetails("getModels", {
        make,
        year,
      });

      if (avaiabeModels)
        setModels(
          avaiabeModels.map((m) => ({
            label: m,
            value: m,
          }))
        );
    };

    if (make && year) fetchModels();
  }, [make, year]);

  useEffect(() => {
    const fetchTrims = async () => {
      setTrims(
        await getCarDetails("getTrims", { make, year, model }, [
          "model_trim",
          "model_fuel_cap_l",
          "model_seats",
        ])
      );
    };

    if (make && year && model) fetchTrims();
  }, [make, year, model]);
  return (
    <SafeAreaView
      style={{ backgroundColor }}
      className="flex-1 px-2"
    >
      <ThemedText className="text-center font-semibold text-2xl border-b border-gray-200 py-2">
        List a Car
      </ThemedText>
      <ScrollView>
        <View>
          <CustomFormField
            label="select car year"
            fieldType={FormFieldType.SELECT}
            options={years}
            control={control}
            placeholder="Select car year"
            name="year"
          />
          <CustomFormField
            label="select car make"
            fieldType={FormFieldType.SELECT}
            control={control}
            placeholder="car make"
            options={CAR_BRANDS.map((c) => ({
              label: c,
              value: c,
            }))}
            name="make"
          />
          <CustomFormField
            label="select car model"
            fieldType={FormFieldType.SELECT}
            control={control}
            placeholder="car model"
            options={models}
            name="model"
          />

          <CustomFormField
            label="select car type"
            fieldType={FormFieldType.SELECT}
            control={control}
            options={CAR_TYPES.map((c) => ({
              label: c,
              value: c,
            }))}
            placeholder="car type"
            name="car_type"
          />
          <CustomFormField
            label="select fuel type"
            fieldType={FormFieldType.SELECT}
            control={control}
            placeholder="fuel type"
            options={FUEL_TYPES.map((c) => ({
              label: c,
              value: c,
            }))}
            name="fuel_type"
          />
          <CustomFormField
            label="select car transmission"
            fieldType={FormFieldType.SELECT}
            control={control}
            placeholder="transmission"
            options={TRANSMISSIONS.map((c) => ({
              label: c,
              value: c,
            }))}
            name="transmission"
          />
          <CustomFormField
            label="millage"
            fieldType={FormFieldType.INPUT}
            control={control}
            placeholder="mileage"
            name="mileage"
          />
          <CustomFormField
            label="number of seats"
            fieldType={FormFieldType.INPUT}
            control={control}
            placeholder="seats"
            name="seats"
            inputMode="numeric"
          />
          <CustomFormField
            label="number of doors"
            fieldType={FormFieldType.INPUT}
            control={control}
            placeholder="car doors"
            name="doors"
            inputMode="numeric"
          />
          <CustomFormField
            label="select car color"
            fieldType={FormFieldType.SELECT}
            control={control}
            placeholder="car color"
            name="color"
          />
          <CustomFormField
            label="Featured image"
            fieldType={FormFieldType.FILE}
            control={control}
            placeholder="car featured image"
            name="featured_image"
            instruction="pick a featurable image for this car"
          />
          <CustomFormField
            label="car images"
            fieldType={FormFieldType.FILE}
            control={control}
            placeholder="car images"
            name="images"
            multiple={true}
            instruction="add car images. Each image must not be grater than 1mb"
          />
          <CustomFormField
            label="price per day"
            fieldType={FormFieldType.INPUT}
            control={control}
            placeholder="price per day"
            name="price_per_day"
          />
          <CustomFormField
            label="car insurance"
            fieldType={FormFieldType.SELECT}
            control={control}
            options={INSURANCE_TYPES.map((c) => ({
              label: c,
              value: c,
            }))}
            placeholder="car insurance policy"
            name="insurance"
          />
          <CustomFormField
            label="car millage policy"
            fieldType={FormFieldType.SELECT}
            options={MILEAGE_TYPES.map((c) => ({
              label: c,
              value: c,
            }))}
            control={control}
            placeholder="car mileage policy"
            name="mileage_policy"
          />
          <CustomFormField
            label="car fuel policy"
            fieldType={FormFieldType.SELECT}
            options={FUEL_POLICIES.map((c) => ({
              label: c,
              value: c,
            }))}
            control={control}
            placeholder="car fuel policy"
            name="fuel_policy"
          />
          <CustomFormField
            label="car confirmation policy"
            fieldType={FormFieldType.SELECT}
            options={CONFIRMATION_POLICIES.map((c) => ({
              label: c,
              value: c,
            }))}
            control={control}
            placeholder="car confirmation policy"
            name="confirmation_policy"
          />
          <CustomFormField
            label="car cancellation policy"
            fieldType={FormFieldType.SELECT}
            options={CANCELLATION_POLICIES.map((c) => ({
              label: c,
              value: c,
            }))}
            control={control}
            placeholder="car cancellation policy"
            name="cancellation_policy"
          />
          <CustomFormField
            label="car registration document"
            fieldType={FormFieldType.FILE}
            control={control}
            placeholder="car registration document"
            name="registration_document"
            instruction="An evidence of registration for this car (pdf not grater than 2mb)"
          />
          <CustomFormField
            label="car insurance document"
            fieldType={FormFieldType.FILE}
            control={control}
            placeholder="car insurance document"
            name="insurance_document"
            instruction="An evidence of insurance for this car (pdf not grater than 2mb)"
          />

          <CustomFormField
            label="car  inspection document"
            fieldType={FormFieldType.FILE}
            control={control}
            placeholder="car  inspection document"
            name="inspection_document"
            instruction="A detailed inspection report for this car (pdf not grater than 2mb)"
          />
          <CustomFormField
            label="car  extra services"
            fieldType={FormFieldType.INPUT}
            control={control}
            placeholder="comma separated values eg. gps,ac,tracker"
            name="extra_services"
          />
        </View>
      </ScrollView>
      <ThemedButton
        title="list car"
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

export default ListCar;
