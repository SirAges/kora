import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: "default" | "title" | "semibold" | "subtitle" | "link" | "error";
};

export default ThemedText = ({
    style,
    lightColor,
    darkColor,
    type,
    ...rest
}: ThemedTextProps) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text style={[{ color }, styles[type || "default"], style]} {...rest} />
    );
};

const styles = StyleSheet.create({
    default: {
        fontSize: 12
    },
    semibold: {
        fontSize: 16,
        fontWeight: 600
    },
    button: {
        fontSize: 16,
        fontWeight: 500,
        textTransform: "capitalize"
    },
    title: {
        fontSize: 20,
        fontWeight: 700
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 400
    },
    link: {
        fontSize: 16,
        color: "#0a7ea4"
    },
    error: {
        fontSize: 12,
        color: "#a40a0a"
    }
});
