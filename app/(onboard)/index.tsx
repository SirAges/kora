import React, { useState } from "react";
import { View, ScrollView, Dimensions, Image, Text, Alert } from "react-native";
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
import * as FileSystem from "expo-file-system";

import ScreenLoader from "@/components/ScreenLoader";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/auth/authSlice";

// Schema & Hooks
import { onboardingSchema, OnboardingSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CAR_TYPES } from "@/constants/enums";
import { onboardingMetaData } from "@/lib/data";
import { convertToBase64 } from "@/lib/utils";
import countries from "@/lib/countries";
import { useUpdateUserMutation } from "@/redux/user/userApiSlice";
import { useLocalSearchParams } from "expo-router";
const Index = () => {
    const [updateUser, { data, error, isLoading }] = useUpdateUserMutation();
    const [page, setPage] = useState(0);
    const { user_type, userId } = useAuth();
    const dispatch = useDispatch();
    const isRenter = user_type === "renter";
    const isCarOwner = user_type === "car_owner";
    const isDriver = user_type === "driver";
    const isCompany = user_type === "company";
    const length = isRenter ? 1 : isCarOwner ? 1 : 2;
    const { title, description } = onboardingMetaData[user_type] || {
        title: "Welcome to Our Car Rental Platform",
        description:
            "Choose your user_type and start your journey with us today!"
    };

    const { height } = Dimensions.get("window");
    const color = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const method = useForm<OnboardingSchemaType>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            user_type,
            emergency_contact: {}
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = method;
    console.log("error", errors, data, error);
    const onSubmit = async (values: OnboardingSchemaType) => {
        try {
            const {
                license,
                profile_image,
                company_logo,
                emergency_name,
                emergency_phone,
                emergency_relationship,
                user_type,company_license,
                ...others
            } = values;

            const transformedData = {
                emergency_contact: {
                    name: emergency_name,
                    phone: emergency_phone,
                    relationship: emergency_relationship
                },
                license: await convertToBase64(license),
                onboarded: true,
                profile_image: await convertToBase64(profile_image),
                company_logo: await convertToBase64(company_logo),
                company_license: await convertToBase64(company_license),
                ...others
            };

            const { data, error } = await updateUser({
                user_id: userId,
                value: transformedData
            });

            if (data?.success) {
                console.log(data);
                dispatch(setCredentials(null));
            }
            if (error) {
                console.log(error);
                return;
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const { id_card } = watch();
    const onPressButton = () => {
        if (isCompany || isCarOwner || isDriver) {
            if (length - 1 === page) {
                handleSubmit(onSubmit)(); // Execute handleSubmit
            } else {
                setPage(prev => (prev < length - 1 ? prev + 1 : length - 1));
            }
        } else {
            handleSubmit(onSubmit)();
        }
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
                            fieldType={FormFieldType.FILE}
                            control={control}
                            instruction={`pick your ${
                                isCompany ? "company logo" : "profile image"
                            } (png or jpeg), not more than 2mb`}
                            name={isCompany ? "company_logo" : "profile_image"}
                        />
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
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            options={[
                                { label: "NIN", value: "nin" },
                                { label: "BVN", value: "bvn" }
                            ]}
                            name="id_card"
                            label="id card"
                            placeholder="id card"
                            position="bottom"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            inputMode="numeric"
                            control={control}
                            name="card_number"
                            label={id_card}
                            placeholder="234456667"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            options={countries.map(({ name, flag }) => ({
                                value: name,
                                label: `${flag} ${name}`
                            }))}
                            name="country"
                            label="country"
                            placeholder="nigeria"
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
                                <View
                                    className="flex-row items-center
                                justify-between space-x-2"
                                >
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
                                    multiple={true}
                                    leftIconName="car-sport"
                                    label="car type"
                                    options={CAR_TYPES.map(c => ({
                                        label: c,
                                        value: c.toLowerCase()
                                    }))}
                                    name="car_types"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.TEXTAREA}
                                    control={control}
                                    label="About you"
                                    placeholder="about you"
                                    name="description"
                                />
                                <ThemedText type="title" className="py-2">
                                    Emergency contact
                                </ThemedText>
                                <CustomFormField
                                    fieldType={FormFieldType.INPUT}
                                    control={control}
                                    label="Emergency name"
                                    placeholder="emergency name"
                                    name="emergency_name"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.PHONE_INPUT}
                                    control={control}
                                    label="emergency phone"
                                    placeholder="phone number"
                                    name="emergency_phone"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    options={[
                                        { label: "Father", value: "father" },
                                        { label: "Mother", value: "mother" },
                                        { label: "Brother", value: "brother" },
                                        { label: "Sister", value: "sister" },

                                        { label: "Friend", value: "friend" },
                                        { label: "Neighbor", value: "neighbor" }
                                    ]}
                                    control={control}
                                    label="relationship"
                                    placeholder="relationship"
                                    name="emergency_relationship"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.FILE}
                                    control={control}
                                    instruction="add your driver license; file not more than 2mb"
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
                        ) : null}
                    </>
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
                        (isCompany || isCarOwner || isDriver) &&
                        page < length - 1
                            ? () => setPage(prev => prev + 1)
                            : handleSubmit(onSubmit)
                    }
                />
            </View>
            {(data?.success || data?.error) && (
                <Alert
                    title={data?.success ? "Successfull" : "An error occured"}
                    message={data?.message}
                />
            )}

            {isLoading && (
                <ScreenLoader
                    title="onboarding you"
                    messages="please
            wait..."
                />
            )}
        </SafeAreaView>
    );
};

export default Index;
