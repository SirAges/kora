import React, { useState } from "react";
import { View, Alert, ScrollView, Dimensions, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import PersonSvg from "@/assets/svgs/person.svg";
import GlobeSvg from "@/assets/svgs/globe.svg";
import MapSvg from "@/assets/svgs/map.svg";
import PinSvg from "@/assets/svgs/pin.svg";
import { Link } from "expo-router";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

// Schema & Hooks
import { onboardingSchema, OnboardingSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { onboardingMetaData } from "@/lib/data";
import countries from "@/lib/countries";

import { useLocalSearchParams } from "expo-router";
const Onboard = () => {
    const [page, setPage] = useState(0);
    const { role } = useLocalSearchParams();
    const isCarOwner = role === "car_owner";
    const isDriver = role === "driver";
    const isCompany = role === "company";
    const length = isCarOwner ? 2 : 3;
    const { title, description } = onboardingMetaData[role] || {
        title: "Welcome to Our Car Rental Platform",
        description: "Choose your role and start your journey with us today!"
    };

    const { height } = Dimensions.get("window");
    const color = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const method = useForm<OnboardingSchemaType>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            user_type: role,
            emergency_contact: {}
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading }
    } = method;
    const onSubmit = (data: OnboardingSchemaType) => {
        Alert.alert("Form Submitted", JSON.stringify(data, null, 2));
        // reset(); // Reset form after submission
    };

    return (
        <SafeAreaView style={{ backgroundColor }} className="h-full px-2 py-2">
            <GoBack />
            <ScrollView showsVerticalScrollIndicator={false}>
                {page === 0 && (
                    <>
                        <View className="items-center w-full my-4">
                            <ThemedText
                                className="text-center text-2xl font-bold"
                                type="title"
                            >
                                {title}
                            </ThemedText>
                            <ThemedText
                                className="text-center text-sm text-gray-500 mt-1"
                                type="subtitle"
                            >
                                {description}
                            </ThemedText>
                        </View>
                        <ThemedText type="title">Personal Data</ThemedText>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name="last_name"
                            label="last name"
                            placeholder="Smart"
                            leftIconName="person"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name="first_name"
                            label="first name"
                            placeholder="John"
                            leftIconName="person"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.PHONE_INPUT}
                            control={control}
                            name="phone"
                            label="phone number"
                            inputMode="numeric"
                            placeholder="566 677 8765"
                        />
                        <View className="flex-row flex-1">
                            <CustomFormField
                           style={{flex:1}}     className="flex-1"
                                fieldType={FormFieldType.SELECT}
                                control={control}
                                options={countries.map(({ name, flag }) => ({
                                    value: name,
                                    label: `${flag} ${name}`
                                }))}
                                name="country"
                                label="country"
                                placeholder="nigeria"
                                leftIconName="globe"
                                position="top"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={control}
                                name="state"
                                label="state"
                                placeholder="abuja"
                                leftIconName="map"
                            />
                        </View>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name="address"
                            label="address"
                            placeholder="123 street"
                            leftIconName="location"
                        />
                    </>
                )}
                {page === 1 && (
                    <>
                        {isDriver ? (
                            <View>
                                <ThemedText
                                    type="title"
                                    className="capitalize flex-1"
                                >
                                    Professional Info
                                </ThemedText>
                                <View className="flex-row items-center">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={control}
                                        label="experience"
                                        inputMode="numeric"
                                        LeftIcon="Entypo"
                                        placeholder="2 years"
                                        leftIconName="clock"
                                        name="experience"
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={control}
                                        label="hourly rate"
                                        placeholder="$30/hr"
                                        inputMode="numeric"
                                        LeftIcon="Entypo"
                                        leftIconName="hour-glass"
                                        name="hourly_rate"
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={control}
                                        label="km rate"
                                        placeholder="$10/km"
                                        LeftIcon="MaterialCommunityIcons"
                                        leftIconName="speedometer"
                                        inputMode="numeric"
                                        name="km_rate"
                                    />
                                </View>
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    control={control}
                                    leftIconName="car-sport"
                                    label="car type"
                                    options={[
                                        "sedan",
                                        "SUV",
                                        "convertible",
                                        "pickup",
                                        "hatchback",
                                        "coupe",
                                        "van",
                                        "wagon"
                                    ].map(c => ({
                                        label: c,
                                        value: c.toLowerCase()
                                    }))}
                                    name="car_type"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.SKELETON}
                                    keys={["name", "phone", "relationship"]}
                                    control={control}
                                    label="Emergency contact"
                                    placeholder="$10/km"
                                    name="emergency_contact"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.FILE}
                                    control={control}
                                    instruction="pick a file not more than 2mb"
                                    name="license"
                                />
                            </View>
                        ) : isCompany ? (
                            <View>
                                <ThemedText
                                    type="title"
                                    className="capitalize flex-1"
                                >
                                    company Info
                                </ThemedText>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="company name"
                                    LeftIcon="MaterialCommunityIcons"
                                    placeholder="Geolo ltd"
                                    leftIconName="office-building"
                                    name="company_name"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="company registeration number"
                                    placeholder="AZR448888"
                                    LeftIcon="MaterialCommunityIcons"
                                    leftIconName="registered-trademark"
                                    name="company_registration_number"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.FILE}
                                    control={control}
                                    instruction="pick your company logo (png or
                                    jpeg), not more than 2mb"
                                    name="company_logo"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="company address"
                                    placeholder="No24. frt street"
                                    LeftIcon="Entypo"
                                    leftIconName="address"
                                    name="company_address"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.FILE}
                                    control={control}
                                    instruction="pick your company licence
                                    file pdf  not more than 2mb"
                                    name="company_license"
                                />
                            </View>
                        ) : isCarOwner ? (
                            <View>
                                <ThemedText
                                    type="title"
                                    className="capitalize flex-1"
                                >
                                    Account Details
                                </ThemedText>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="account name"
                                    placeholder="John Joe"
                                    leftIconName="person"
                                    name="account_name"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="account number"
                                    placeholder="1234567890"
                                    LeftIcon="MaterialCommunityIcons"
                                    leftIconName="transfer"
                                    name="account_number"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="bank name"
                                    placeholder="Zenith"
                                    LeftIcon="MaterialCommunityIcons"
                                    leftIconName="bank"
                                    name="account_name"
                                />
                            </View>
                        ) : null}
                    </>
                )}

                {page === 2 && (
                    <View>
                        <ThemedText type="title" className="capitalize flex-1">
                            Account Details
                        </ThemedText>{" "}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            label="account name"
                            placeholder="John Joe"
                            leftIconName="person"
                            name="account_name"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            label="account number"
                            placeholder="1234567890"
                            LeftIcon="MaterialCommunityIcons"
                            leftIconName="transfer"
                            name="account_number"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            label="bank name"
                            placeholder="Zenith"
                            LeftIcon="MaterialCommunityIcons"
                            leftIconName="bank"
                            name="account_name"
                        />
                    </View>
                )}
            </ScrollView>
            {/* Submit Button */}
            <View className="flex-row items-center space-x-2">
                {page > 0 && (
                    <ThemedButton
                        type="outline"
                        title="back"
                        onPress={() =>
                            setPage(prev => (prev > 0 ? prev - 1 : 0))
                        }
                    />
                )}
                <ThemedButton
                    title={page === length - 1 ? "Submit" : "continue"}
                    onPress={
                        page === length - 1
                            ? handleSubmit(onSubmit)
                            : () =>
                                  setPage(prev =>
                                      prev < length - 1 ? prev + 1 : length - 1
                                  )
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Onboard;
