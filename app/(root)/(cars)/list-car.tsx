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
    CAR_BRANDS
} from "@/constants/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSchema } from "@/lib/schema";
const ListCar = () => {
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);

    const backgroundColor = useThemeColor({}, "background");

    const method = useForm<CarSchemaType>({
        resolver: zodResolver(carSchema),
        defaultValues: {}
    });

    const { control, handleSubmit, reset, setValue, watch } = method;
    const { brand, make, year, model } = watch();
    const onSubmit = handleSubmit(data => {
        alert("Issue reported successfully!");
        reset();
    });
    const getOptions = array =>
        array.map(a => ({ label: c, value: c.toLowerCase() }));
    const apiBaseUrl = "https://www.carqueryapi.com/api/0.3/?cmd=";

    const getCarDetails = async (type, params = {}) => {
        let url = new URL(apiBaseUrl + type);

        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        console.log("url", url);
        try {
            const response = await fetch(url);
            const text = await response.text();

            const data = JSON.parse(text.replace(/^\?|\);$/g, "")); // Remove JSONP wrapper

            if (type === "getMakes")
                return (data.Makes || []).map(m => String(m.make_display));

            if (type === "getModels")
                return (data.Models || []).map(m => String(m.model_name));

            if (type === "getTrims")
                return (data.Trims || []).map(t => String(t.model_trim));

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
            console.error(`Error fetching ${type}:`, error);
            return [];
        }
    };
    (async () => {
        const makes = await getCarDetails("getMakes", { year: "2022" });
        console.log("Makes:", makes); // Expected: ["Toyota", "Honda", "Ford", ...]

        const models = await getCarDetails("getModels", {
            make: "Toyota",
            year: "2022"
        });
        console.log("Models:", models); // Expected: ["Camry", "Corolla", "RAV4", ...]

        const trims = await getCarDetails("getTrims", {
            make: "Toyota",
            model: "Camry",
            year: "2022"
        });
        console.log("Trims:", trims); // Expected: ["LE", "XLE", "SE", ...]

        const years = await getCarDetails("getYears");
        console.log("Years:", years); // Expected: ["1941", "1942", ..., "2022"]
    })();
    useEffect(() => {
        const fetchYears = async () => {
            const availableYears = await getCarDetails("getYears");
            if (availableYears)
                setYears(
                    availableYears.map(y => ({ label: y, value: y + "" }))
                );
        };

        fetchYears();
    }, []);

    useEffect(() => {
        const fetchMakes = async () => {
            const availableMakes = await getCarDetails("getMakes", { year });

            if (availableMakes)
                console.log("availableMakes", availableMakes, year);
            setMakes(
                availableMakes.map(m => ({
                    label: m,
                    value: m.toLowerCase()
                }))
            );
        };

        if (year) fetchMakes();
    }, [year]);

    useEffect(() => {
        const fetchModels = async () => {
            const avaiabeModels = await getCarDetails("getModels", {
                make,
                year
            });

            if (avaiabeModels)
                setModels(
                    avaiabeModels.map(m => ({
                        label: m,
                        value: m.toLowerCase()
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
                    "model_seats"
                ])
            );
        };

        if (make && year && model) fetchTrims();
    }, [make, year, model]);
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <ThemedText className="text-center font-semibold text-2xl border-b border-gray-200 py-2">
                List a Car
            </ThemedText>
            <ScrollView className="px-2">
                <View className="px-2">
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        options={years}
                        control={control}
                        placeholder="Select car year"
                        name="year"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="car make"
                        options={CAR_BRANDS.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        name="make"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="car model"
                        options={models}
                        name="model"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        options={CAR_TYPES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        placeholder="car type"
                        name="car_type"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="fuel type"
                        options={FUEL_TYPES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        name="fuel_type"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="transmission"
                        options={TRANSMISSIONS.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        name="transmission"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="mileage"
                        name="mileage"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="seats"
                        name="seats"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="car doors"
                        name="doors"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="car color"
                        name="color"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car featured image"
                        name="featured_image"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car images"
                        name="images"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="car price per day"
                        name="price_per_day"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        options={INSURANCE_TYPES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        placeholder="car insurance"
                        name="insurance"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        options={MILEAGE_TYPES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        control={control}
                        placeholder="car mileage policy"
                        name="mileage_policy"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        options={FUEL_POLICIES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        control={control}
                        placeholder="car fuel policy"
                        name="fuel_policy"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        options={CONFIRMATION_POLICIES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        control={control}
                        placeholder="car confirmation policy"
                        name="confirmation_policy"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        options={CANCELLATION_POLICIES.map(c => ({
                            label: c,
                            value: c.toLowerCase()
                        }))}
                        control={control}
                        placeholder="car cancellation policy"
                        name="cancellation_policy"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car registration document"
                        name="registration_document"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car insurance document"
                        name="insurance_document"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car insurance document"
                        name="insurance_document"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car  inspection document"
                        name="inspection_document"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="car  extra services"
                        name="extra_services"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={control}
                        placeholder="car  drivers"
                        name="drivers"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListCar;
