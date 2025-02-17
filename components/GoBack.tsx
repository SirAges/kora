import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

const GoBack = () => {
    const onPressBack = () => {
        if (router.canGoBack()) {
            router.back();
        }
    };
    const iconColor = useThemeColor({}, "icon");
    const backgroundColor = useThemeColor({}, "background");
    return (
        <View
            className="rounded-full w-10 h-10 items-center justify-center"
            style={{ backgroundColor }}
        >
            <Ionicons
                onPress={onPressBack}
                name="chevron-back"
                size={24}
                color={iconColor}
            />
        </View>
    );
};

export default GoBack;
