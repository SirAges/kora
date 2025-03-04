import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";

import ThemedButton from "@/components/ThemedButton";
import { Image } from "expo-image";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
const Index = () => {
    const onPressButton = clicked => {
        switch (clicked) {
            case "google":
                break;
            case "apple":
                break;
            case "facebook":
                break;
            case "twitter":
                break;
            case "sign-in":
                router.navigate("/sign-in");
                break;
            case "sign-up":
                router.navigate("/sign-up");
                break;
            default:
        }
    };

    return (
        <SafeAreaView
            className="flex-1 items-center justify-center px-2 py-2
        space-y-4"
        >
            <View>
                <Image
                    className="h-16 w-16"
                    source={require("@/assets/images/icon.png")}
                    alt="icon"
                />
            </View>
            <View>
                <ThemedText className="text-center" type="title">
                    Let's Get Started
                </ThemedText>
                <ThemedText className="text-center" type="subtitle">
                    get access to your account
                </ThemedText>
            </View>

            <View className="flex-1 w-full space-y-3 justify-center">
                <ThemedButton
                    type="outline"
                    leftIcon={<Ionicons name="logo-google" size={24} />}
                >
                    continue with google
                </ThemedButton>

                <ThemedButton
                    type="outline"
                    leftIcon={<Ionicons name="logo-facebook" size={24} />}
                >
                    continue with facebook
                </ThemedButton>

                <ThemedButton
                    type="outline"
                    leftIcon={<Ionicons name="logo-apple" size={24} />}
                >
                    continue with apple
                </ThemedButton>
                <ThemedButton
                    type="outline"
                    leftIcon={<Ionicons name="logo-twitter" size={24} />}
                >
                    continue with x
                </ThemedButton>

                <ThemedButton
                    title="Sign up"
                    onPress={() => onPressButton("sign-up")}
                />

                <ThemedButton
                    title="Sign in"
                    onPress={() => onPressButton("sign-in")}
                    type="ghost"
                />
            </View>
            <View className="flex-row space-x-3">
                <ThemedText type="subtitle">Privacy policy</ThemedText>
                <ThemedText type="subtitle">Terms of Services</ThemedText>
            </View>
        </SafeAreaView>
    );
};

export default Index;
