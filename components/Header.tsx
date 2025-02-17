import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";

const Header = () => {
    const primary = useThemeColor({}, "primary");

    return (
        <ThemedView
            className="flex-row items-center justify-between border-b
        border-b-gray-100/50 relative w-full px-2 py-2 space-x-2"
        >
            <Image
                className="w-9 h-9 rounded-full"
                source={require("@/assets/images/profile.jpg")}
                alt="profile image"
            />
            <View className="flex-1">
                <ThemedText type="semibold" className="capitalize">
                    Jonathan Smith
                </ThemedText>
                <ThemedText type="subtitle" className="capitalize">
                    Welcome back 👋
                </ThemedText>
            </View>
            <Ionicons name="notifications-outline" size={24} color={primary} />
        </ThemedView>
    );
};

export default Header;
