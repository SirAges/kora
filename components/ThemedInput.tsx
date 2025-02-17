import React from "react";
import { TextInput, View, StyleSheet, type TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

const ThemedInput = ({
    style,
    lightColor,
    darkColor,
    leftIcon,
    rightIcon,
    ...otherProps
}: ThemedInputProps) => {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "inputBackground"
    );
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");
    const iconColor = useThemeColor({}, "icon");

    return (
        <View
            style={[styles.container, { backgroundColor, borderColor }, style]}
        >
            {leftIcon && (
                <View style={styles.icon}>
                    {React.cloneElement(leftIcon as React.ReactElement, {
                        color: iconColor
                    })}
                </View>
            )}

            <TextInput
                style={[styles.input, { color: textColor }]}
                placeholderTextColor={placeholderColor}
                {...otherProps}
            />

            {rightIcon && (
                <View style={styles.icon}>
                    {React.cloneElement(rightIcon as React.ReactElement, {
                        color: iconColor
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 8
    },
    icon: {
        paddingHorizontal: 8
    }
});
export default ThemedInput;
