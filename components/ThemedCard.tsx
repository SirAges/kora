import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedCardProps = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    lightColor?: string;
    darkColor?: string;
};

export default ThemedCard = ({
    children,
    style,
    lightColor,
    darkColor,
    color
}: ThemedCardProps) => {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        color || "card"
    );
    const borderColor = useThemeColor({}, "border");

    return (
        <View
            className="flex-1 rounded-md shadow shadow-md shadow-black"
            style={[{ backgroundColor, borderColor, elevation: 2 }, style]}
        >
            {children}
        </View>
    );
};
