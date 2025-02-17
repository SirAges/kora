import React, { useState } from "react";
import { View, Alert, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import EmailSvg from "@/assets/svgs/email.svg";
import EyeSvg from "@/assets/svgs/eye.svg";
import EyeHiddenSvg from "@/assets/svgs/eye_hidden.svg";
import PadlockSvg from "@/assets/svgs/padlock.svg";
import { Link } from "expo-router";

import OAuths from "@/components/OAuths";
import ThemedView from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { z } from "zod";
// Schema & Hooks
import { authSchema, AuthSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";

const Forgot: React.FC = () => {
    const [secret, setSecret] = useState("123456");
    const [open, setOpen] = useState(false);

    const [isValid, setIsValid] = useState(false);
    const color = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");

    const method = useForm<AuthSchemaType>({
        resolver: zodResolver(
            authSchema.pick({
                email: true,
                otp: open
            })
        ),
        defaultValues: {
            email: "",
            otp: ""
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isLoading }
    } = method;
    const onSubmit = (data: AuthSchemaType) => {
        // Alert.alert("Form Submitted", JSON.stringify(data, null, 2));
        //reset(); // Reset form after submission
        setOpen(true);
    };

    return (
        <>
            <SafeAreaView
                style={{ backgroundColor }}
                className="flex-1 px-2 py-2"
            >
                <GoBack />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="items-center w-full my-4">
                        <ThemedText
                            className="text-center text-2xl font-bold"
                            type="title"
                        >
                            Forgot Password? 🗝️
                        </ThemedText>
                        <ThemedText
                            className="text-center text-sm text-gray-500 mt-1"
                            type="subtitle"
                        >
                            Enter your registered email address. You will
                            recieve an OTP (One Time Passsword) which you will
                            use to reset your password
                        </ThemedText>
                    </View>

                    <View className="flex-1">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name="email"
                            label="email"
                            placeholder="john@example.com"
                            iconSize={20}
                            leftIconName="mail"
                        />
                    </View>
                </ScrollView>
                {/* Submit Button */}
                <ThemedButton
                    title="Send OTP Code"
                    textStyle={{ color: "white" }}
                    onPress={handleSubmit(onSubmit)}
                />
            </SafeAreaView>
            <ThemedModal
                visible={open}
                onRequestClose={() => setOpen(false)}
                position="center"
            >
                <View className="max-h-56">
                    <ThemedText
                        className="text-center text-2xl font-bold"
                        type="title"
                    >
                        Enter your OTP Code 🔐
                    </ThemedText>
                    <ThemedText
                        className="text-center text-sm text-gray-500 mt-1"
                        type="subtitle"
                    >
                        Check your email for the otp code sent to you. Enter the
                        email below to continue resetting your password
                    </ThemedText>

                    <CustomFormField
                        fieldType={FormFieldType.OTP_INPUT}
                        onRequestClose={() => {
                            setOpen(false);
                            router.replace("reset-password");
                        }}
                        control={control}
                        name="otp"
                        placeholder="-"
                    />
                </View>
            </ThemedModal>
        </>
    );
};

export default Forgot;
