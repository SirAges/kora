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
import ThemedButton from "@/components/ThemedButton";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

// Schema & Hooks
import { authSchema, AuthSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";

const SignUp: React.FC = () => {
    const [togglePassword, setTogglePassword] = useState(true);
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");
    const method = useForm<AuthSchemaType>({
        resolver: zodResolver(authSchema.omit({ confirm_password: true })),
        defaultValues: {
            email: "",
            password: "",
            term: ""
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading }
    } = method;
    const onSubmit = (data: AuthSchemaType) => {
        //Alert.alert("Form Submitted", JSON.stringify(data, null, 2));
        router.replace("(onboard)");
    };

    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1 px-2 py-2">
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
                    <View className="flex-row items-center space-x-2">
                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            secureTextEntry={togglePassword}
                            control={control}
                            name="terms"
                            label={
                                <View
                                    className="flex-row items-center
                                space-x-1"
                                >
                                    <ThemedText>I agree to Kora</ThemedText>
                                    <ThemedText style={{ color }}>
                                        Terms and Conditions
                                    </ThemedText>
                                </View>
                            }
                        />
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
    );
};

export default SignUp;
