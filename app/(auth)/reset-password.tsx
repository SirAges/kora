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
    const [togglePassword, setTogglePassword] = useState(true);

    const color = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const method = useForm<AuthSchemaType>({
        resolver: zodResolver(
            authSchema
                .pick({
                    password: true,
                    confirm_password: true // corrected here
                })
                .refine(
                    (
                        { password, confirm_password } // corrected here
                    ) => password === confirm_password,
                    {
                        message: "password don't match",
                        path: ["confirm_password"] // corrected here
                    }
                )
        ),
        defaultValues: {
            password: "",
            confirm_password: "" // corrected here
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
                            Secure your account 🔐
                        </ThemedText>
                        <ThemedText
                            className="text-center text-sm text-gray-500 mt-1"
                            type="subtitle"
                        >
                            Enter your new password here make sure it is 8
                            characters long, must contain minimum of one
                            lowercase, one uppercase and one special character
                        </ThemedText>
                    </View>

                    <View className="">
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
                            fieldType={FormFieldType.INPUT}
                            secureTextEntry={togglePassword}
                            control={control}
                            name="confirm_password"
                            label="confirm password"
                            placeholder="********"
                            iconSize={16}
                        leftIconName="key"
                        rightIconName={togglePassword ? "eye-off" : "eye"}
                       
                            onPressRightIcon={() =>
                                setTogglePassword(prev => !prev)
                            }
                        />
                    </View>
                </ScrollView>
                {/* Submit Button */}
                <ThemedButton
                    title="Save your password"
                    textStyle={{ color: "white" }}
                    onPress={handleSubmit(onSubmit)}
                    // type="ghost"
                    icon={<Ionicons name="person-add" size={20} />}
                />
            </SafeAreaView>
            <ThemedModal visible={open} onRequestClose={() => setOpen(false)}>
                <ThemedText
                    className="text-center text-2xl font-bold"
                    type="title"
                >
                    You're all set!
                </ThemedText>
                <ThemedText
                    className="text-center text-sm text-gray-500 py-3"
                    type="subtitle"
                >
                    Your password have been updated successfully
                </ThemedText>
                <ThemedButton
                    title="sign in"
                    onPress={() => router.replace("sign-in")}
                />
            </ThemedModal>
        </>
    );
};

export default Forgot;
