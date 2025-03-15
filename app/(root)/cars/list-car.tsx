import { View, Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBack from "@/components/GoBack";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import ThemedModal from "@/components/ThemedModal";
import PolicySetting from "@/components/PolicySetting";
import { useThemeColor } from "@/hooks/useThemeColor";
import { toastConfig } from "@/app/_layout";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { convertToBase64, toastMessage } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import { useCreateCarMutation } from "@/redux/car/carApiSlice";
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
import { carSchema, CarSchemaType } from "@/lib/schema";

const ListCar = () => {
    const [createCar, { isLoading }] = useCreateCarMutation();
    const { userId } = useAuth();
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);

    const backgroundColor = useThemeColor({}, "background");

    const method = useForm<CarSchemaType>({
        resolver: zodResolver(carSchema),
        defaultValues: { model: "camry" }
    });

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = method;
    // console.log("watch", watch());
    const { make, year, model } = watch();
    const onSubmit = async (values: CarSchemaType) => {
        const {
            featured_image,
            images,
            insurance_document,
            registration_document,
            inspection_document,
            ...others
        } = values;
        // console.log("data", JSON.stringify(values, null, 2));
        const newData = {
            featured_image: await convertToBase64(featured_image),
            images: await convertToBase64(images),
            insurance_document: await convertToBase64(insurance_document),
            registration_document: await convertToBase64(registration_document),
            inspection_document: await convertToBase64(inspection_document),
            user_id: userId,
            ...others
        };

        const { data, error } = await createCar(newData);
        toastMessage(
            data?.success ? "Successful" : "An error occurred",
            error ? error?.data?.message || error.error : data?.message
        );

        if (data.success) {
            reset();
        }
    };

    const apiBaseUrl = "https://www.carqueryapi.com/api/0.3/?cmd=";

    const getCarDetails = async (type, params = {}, fields?: string[]) => {
        let url = new URL(apiBaseUrl + type);

        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
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
            return [];
        }
    };
    (async () => {
        const makes = await getCarDetails("getMakes", { year: "2022" });

        const models = await getCarDetails("getModels", {
            make: "Toyota",
            year: "2022"
        });

        const trims = await getCarDetails("getTrims", {
            make: "Toyota",
            model: "Camry",
            year: "2022"
        });

        const years = await getCarDetails("getYears");
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
                setMakes(
                    availableMakes.map(m => ({
                        label: m,
                        value: m
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
                        value: m
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
        <SafeAreaView style={{ backgroundColor }} className="flex-1 px-2">
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
                        options={CAR_BRANDS.map(c => ({
                            label: c,
                            value: c
                        }))}
                        name="make"
                    />
                    <CustomFormField
                        label="select car model"
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="car model"
                        options={["camry", "avalon"].map(m => ({
                            label: m,
                            value: m
                        }))}
                        name="model"
                    />

                    <CustomFormField
                        label="select car type"
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        options={CAR_TYPES.map(c => ({
                            label: c,
                            value: c
                        }))}
                        placeholder="car type"
                        name="car_type"
                    />
                    <CustomFormField
                        label="select fuel type"
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="fuel type"
                        options={FUEL_TYPES.map(c => ({
                            label: c,
                            value: c
                        }))}
                        name="fuel_type"
                    />
                    <CustomFormField
                        label="select car transmission"
                        fieldType={FormFieldType.SELECT}
                        control={control}
                        placeholder="transmission"
                        options={TRANSMISSIONS.map(c => ({
                            label: c,
                            value: c
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
                        options={[
                            "Black",
                            "White",
                            "Silver",
                            "Gray",
                            "Blue",
                            "Red",
                            "Green",
                            "Yellow",
                            "Orange",
                            "Brown",
                            "Gold",
                            "Beige",
                            "Purple",
                            "Pink"
                        ].map(c => ({ label: c, value: c.toLowerCase() }))}
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
                        fieldType={FormFieldType.SUGGESTION}
                        control={control}
                        leftIconName="location"
                        position="bottom"
                        label="location"
                        name="location"
                    />

                    <PolicySetting
                        selectedPolicy={watch("fuel_policy")}
                        setValue={setValue}
                        availableKeys={[
                            "prepaid_cost",
                            "no_refund",
                            "service_fee",
                            "fuel_price_per_liter",
                            "included_in_price",
                            "minimum_return_charge",
                            "charging_fee",
                            "penalty_fee"
                        ]}
                        policy="fuel_policy"
                        subPolicy={FUEL_POLICIES}
                    />
                    <PolicySetting
                        selectedPolicy={watch("confirmation_policy")}
                        setValue={setValue}
                        availableKeys={["security_deposit"]}
                        policy="confirmation_policy"
                        subPolicy={CONFIRMATION_POLICIES}
                    />

                    <PolicySetting
                        selectedPolicy={watch("cancellation_policy")}
                        setValue={setValue}
                        availableKeys={["refund_percentage"]}
                        policy="cancellation_policy"
                        subPolicy={CANCELLATION_POLICIES}
                    />
                    <PolicySetting
                        selectedPolicy={watch("mileage_policy")}
                        setValue={setValue}
                        availableKeys={[
                            "daily_limit",
                            "extra_mile_charge",
                            "description"
                        ]}
                        policy="mileage_policy"
                        subPolicy={MILEAGE_TYPES}
                    />
                    <PolicySetting
                        selectedPolicy={watch("insurance_policy")}
                        setValue={setValue}
                        availableKeys={["price_per_day"]}
                        policy="insurance_policy"
                        subPolicy={INSURANCE_TYPES}
                    />

                    <CustomFormField
                        label="car registration document"
                        type="application/pdf"
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car registration document"
                        name="registration_document"
                        instruction="An evidence of registration for this car (pdf not grater than 2mb)"
                    />
                    <CustomFormField
                        label="car insurance document"
                        type="application/pdf"
                        fieldType={FormFieldType.FILE}
                        control={control}
                        placeholder="car insurance document"
                        name="insurance_document"
                        instruction="An evidence of insurance for this car (pdf not grater than 2mb)"
                    />

                    <CustomFormField
                        label="car  inspection document"
                        type="application/pdf"
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
            <ThemedButton title="list car" onPress={handleSubmit(onSubmit)} />
            {isLoading && (
                <ScreenLoader
                    title="signing you in"
                    messages="please
            wait..."
                />
            )}
        </SafeAreaView>
    );
};

export default ListCar;
