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
import ThemedText from "@/components/ThemedText";
import ThemedModal from "@/components/ThemedModal";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedButton from "@/components/ThemedButton";
import OtpInput from "@/components/OtpInput";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import {
    useSignupMutation,
    useVerifyMutation
} from "@/redux/auth/authApiSlice";
// Schema & Hooks
import { authSchema, AuthSchemaType } from "@/lib/schema";
import { toastMessage } from "@/lib/utils";
import { useThemeColor } from "@/hooks/useThemeColor";

const SignUp: React.FC = () => {
    const [signup, { isLoading }] = useSignupMutation();
    const [verify, { isLoading: isVerifyLoading }] = useVerifyMutation();
    const [togglePassword, setTogglePassword] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [otp, setOtp] = useState("");
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");
    const method = useForm<AuthSchemaType>({
        resolver: zodResolver(
            authSchema.pick({
                email: true,
                password: true,
                term: true,
                user_type: true
            })
        ),
        defaultValues: {
            email: "",
            password: "",
            term: "",
            user_type: "user"
        }
    });
    const { control, handleSubmit, reset, watch } = method;
    const { email, user_type } = watch();
    const onSubmit = async (value: AuthSchemaType) => {
        try {
            const { data, error } = await signup(value);
            if (error) {
                console.log("error", error);
                toastMessage(error?.data?.message, "error");
                return;
            }
            if (data.success) {
                console.log("data", data);
                setShowModal(true);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    const onPressVerify = async () => {
        const { data, error } = await verify({ otp, email });
        toastMessage(
            data?.success ? "Successful" : "An error occurred",
            error ? error?.data?.message || error.error : data?.message
        );
        if (error) {
            console.log("error", error);
        }
        if (data?.success) {
            setShowModal(false);
            router.navigate("sign-in");
        }
        // router.replace("(onboard)");
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
                            Join Kora Today 🚗
                        </ThemedText>
                        <ThemedText
                            className="text-center text-sm text-gray-500 mt-1"
                            type="subtitle"
                        >
                            Start your journey with Kora
                        </ThemedText>
                    </View>

                    <View className="flex-1">
                        {/* Name Field */}
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name="email"
                            label="email"
                            placeholder="john@example.com"
                            leftIconName="mail"
                            iconSize={16}
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            secureTextEntry={togglePassword}
                            control={control}
                            name="password"
                            label="password"
                            placeholder="********"
                            iconSize={16}
                            leftIconName="key"
                            rightIconName={togglePassword ? "eye-off" : "eye"}
                            onPressRightIcon={() =>
                                setTogglePassword(prev => !prev)
                            }
                        />
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={control}
                            name="user_type"
                            label="profile"
                            placeholder="Car owner"
                            leftIconName="person"
                            options={[
                                { label: "Renter", value: "renter" },
                                { label: "Car owner", value: "car_owner" },
                                { label: "Driver", value: "driver" },
                                { label: "Company", value: "company" }
                            ]}
                            iconSize={16}
                        />
                        <View className="flex-row items-center justify-between">
                            <CustomFormField
                                fieldType={FormFieldType.CHECKBOX}
                                secureTextEntry={togglePassword}
                                control={control}
                                name="terms"
                                label="I agree to Kora"
                            />
                            <Link style={{ color }} className="" href="policy">
                                Privacy Policy
                            </Link>
                        </View>

                        <View className="items-center space-y-4">
                            <View className="flex-row items-center space-x-1">
                                <ThemedText>Already have an account</ThemedText>
                                <Link style={{ color }} href="sign-in" navigate>
                                    Sign In
                                </Link>
                            </View>

                            <View className="flex-row items-center w-full">
                                <View className="h-[1px] bg-gray-300 flex-1" />
                                <ThemedText>Or Continue With</ThemedText>
                                <View className="h-[1px] bg-gray-300 flex-1" />
                            </View>
                            <OAuths />
                        </View>
                    </View>
                    {/* Submit Button */}
                </ScrollView>
                <ThemedButton
                    title="Sign Up"
                    textStyle={{ color: "white" }}
                    onPress={handleSubmit(onSubmit)}
                />
            </SafeAreaView>
            {(isLoading || isVerifyLoading) && (
                <ScreenLoader
                    title="signing up"
                    messages="please
            wait..."
                />
            )}
            <ThemedModal
                visible={showModal}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                position="center"
            >
                <View className="px-2 py-4 items-center justify-center">
                    <ThemedText
                        className="text-center text-2xl font-bold"
                        type="title"
                    >
                        Enter your OTP Code 🔐
                    </ThemedText>
                    <ThemedText
                        className="text-center text-sm text-gray-500"
                        type="subtitle"
                    >
                        Check your email for the otp code sent to you. Enter the
                        OTP code below to continue resetting your password
                    </ThemedText>
                    <View className="py-3">
                        <OtpInput
                            value={otp}
                            onChange={otp => setOtp(otp)}
                            name="otp"
                        />
                    </View>
                    <ThemedButton title="verify" onPress={onPressVerify} />
                </View>
            </ThemedModal>
        </>
    );
};

export default SignUp;
