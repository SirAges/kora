import React, { useState } from "react";
import { View, Alert, ScrollView, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const SignIn: React.FC = () => {
    const [togglePassword, setTogglePassword] = useState(true);
    const { height } = Dimensions.get("window");
    const color = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const method = useForm<AuthSchemaType>({
        resolver: zodResolver(
            authSchema.omit({ terms: true, confirm_password: true })
        ),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading }
    } = method;
    const onSubmit = (data: AuthSchemaType) => {
        Alert.alert("Form Submitted", JSON.stringify(data, null, 2));
        // reset(); // Reset form after submission
    };

    return (
        <SafeAreaView style={{ backgroundColor }} className="h-full px-2 py-2">
            <GoBack />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center w-full my-4">
                    <ThemedText
                        className="text-center text-2xl font-bold"
                        type="title"
                    >
                        Welcome back 👋
                    </ThemedText>
                    <ThemedText
                        className="text-center text-sm text-gray-500 mt-1"
                        type="subtitle"
                    >
                        Log into your account
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
                        iconSize={16}
                        leftIconName="key"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        secureTextEntry={togglePassword}
                        control={control}
                        name="password"
                        label="password"
                        placeholder="********"
                      
                        leftIconName="key"
                        rightIconName={togglePassword ? "eye-off" : "eye"}
                        onPressRightIcon={() =>
                            setTogglePassword(prev => !prev)
                        }
                    />
                    <View className="flex-row items-center space-x-2">
                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            control={control}
                            name="remember"
                            label={
                                <View
                                    className="flex-row items-center
                                justify-between"
                                >
                                    <ThemedText>Remember me</ThemedText>
                                    <Link
                                        href="forgot"
                                        className="text-right"
                                        style={{ color }}
                                    >
                                        Forgot password?
                                    </Link>
                                </View>
                            }
                        />
                    </View>

                    <View className="items-center space-y-4">
                        <View className="flex-row items-center space-x-1">
                            <ThemedText>Don't have an account?</ThemedText>
                            <Link style={{ color }} href="sign-up" navigate>
                                Sign Up
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
            </ScrollView>
            {/* Submit Button */}
            <ThemedButton
                title="Sign In"
                textStyle={{ color: "white" }}
                onPress={handleSubmit(onSubmit)}
                // type="ghost"
            />
        </SafeAreaView>
    );
};

export default SignIn;
