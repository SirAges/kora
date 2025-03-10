import React, { useState } from "react";
import {
    View,
    ScrollView,
    Dimensions,
    Image,
    Text,
    TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import { Link } from "expo-router";
import * as FileSystem from "expo-file-system";

import ScreenLoader from "@/components/ScreenLoader";
import Alert from "@/components/Alert";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import ProfileModal from "@/components/ProfileModal";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import useAuth from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/auth/authSlice";

// Schema & Hooks
import { onboardingSchema, OnboardingSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { onboardingMetaData } from "@/lib/data";
import countries from "@/lib/countries";
import { useUpdateUserMutation } from "@/redux/user/userApiSlice";
import { useGetUserQuery } from "@/redux/user/userApiSlice";
import { useSignoutMutation } from "@/redux/auth/authApiSlice";

import { useLocalSearchParams } from "expo-router";
export enum ModalOptions {
    PROFILE = "profile",
    PREFERENCE = "preference",
    NOTIFICATION = "notification",
    SECURITY = "security",
    PAYMENT = "payment",
    APPEARANCE = "appearance",
    HELP = "help",
    RATE = "rate"
}
const Index = () => {
    const { userId } = useAuth();
    const { data, error } = useGetUserQuery(userId);
    const [signout, { isLoading }] = useSignoutMutation();
    const color = useThemeColor({}, "text");
    const iconColor = useThemeColor({}, "icon");
    const primary = useThemeColor({}, "primary");
    const [showModal, setShowModal] = useState(false);
    const [option, setOption] = useState(null);
    const card = useThemeColor({}, "card");

    const onPressOption = clicked => {
        setOption(ModalOptions[clicked]);
        setShowModal(true);
    };

    const backgroundColor = useThemeColor({}, "background");
    if (!data)
        return (
            <ScreenLoader
                title="Loading your profile"
                message="please
    wait..."
            />
        );
    const user = data?.data;
    return (
        <>
            <SafeAreaView
                style={{ backgroundColor }}
                className="flex-1 pt-4 px-2
        space-y-2"
            >
                <View
                    className="flex-row items-center justify-between
        "
                >
                    <Image
                        className="w-9 h-9 rounded-full"
                        source={require("@/assets/images/icon.png")}
                        alt="profile image"
                    />

                    <ThemedText type="title" className="text-center flex-1">
                        Account
                    </ThemedText>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color={iconColor}
                    />
                </View>

                <TouchableOpacity onPress={() => onPressOption("PROFILE")}>
                    <ThemedView
                        className="flex-row items-center justify-between
            relative w-full px-2 py-4 rounded-md space-x-2 border
            border-gray-200"
                    >
                        <Image
                            className="w-9 h-9 rounded-full"
                            source={{ uri: user?.profile_image?.secure_url }}
                            alt="profile image"
                        />
                        <View className="flex-1">
                            <ThemedText type="semibold" className="capitalize">
                                {`${user?.last_name} ${user?.first_name}`}
                            </ThemedText>
                            <ThemedText type="subtitle" className="lowercase">
                                {user?.email}
                            </ThemedText>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={iconColor}
                        />
                    </ThemedView>
                </TouchableOpacity>

                <ScrollView>
                    {["car_owner", "driver", "company"].includes(
                        user.user_type
                    ) && (
                        <View>
                            <ThemedButton
                                onPress={() => router.navigate("list-car")}
                                title="list car"
                            />
                        </View>
                    )}
                    <View
                        className="rounded-md px-2 py-2 border
                border-gray-200"
                    >
                        <Option
                            onPress={() => onPressOption("PREFERENCE")}
                            leftIcon="settings-outline"
                            title="Preferences"
                        />
                        <Option
                            onPress={() => onPressOption("NOTIFICATION")}
                            leftIcon="notifications-outline"
                            title="Notification"
                        />
                        <Option
                            onPress={() => onPressOption("SECURITY")}
                            leftIcon="shield-outline"
                            title="Account & Security"
                        />
                        <Option
                            onPress={() => onPressOption("PAYMENT")}
                            leftIcon="card-outline"
                            title="Payment methods"
                        />

                        <Option
                            onPress={() => onPressOption("APPEARANCE")}
                            leftIcon="eye-outline"
                            title="App appearance"
                        />
                        <Option
                            onPress={() => onPressOption("HELP")}
                            leftIcon="help-circle-outline"
                            title="Help & Support"
                        />
                        <Option
                            onPress={() => onPressOption("RATE")}
                            leftIcon="star-outline"
                            title="Rate Us"
                        />
                        <Option
                            onPress={signout}
                            leftIcon="exit-outline"
                            title="Sign Out"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <ProfileModal
                showModal={showModal}
                setShowModal={setShowModal}
                option={option}
                user={user}
            />
            {isLoading && (
                <ScreenLoader title="Making update" messages="Please wait..." />
            )}
        </>
    );
};

export default Index;

const Option = ({ leftIcon, title, onPress }) => {
    const iconColor = useThemeColor({}, "icon");
    const borderColor = useThemeColor({}, "border");

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{ borderColor }}
                className="flex-row items-center justify-between my-2 py-2 px-2 
        rounded-md"
            >
                <Ionicons name={leftIcon} size={24} color={iconColor} />
                <ThemedText
                    className="capitalize font-semibold flex-1
                    text-md px-2"
                >
                    {title}
                </ThemedText>

                <Ionicons name="chevron-forward" size={16} color={iconColor} />
            </View>
        </TouchableOpacity>
    );
};
