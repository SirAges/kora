import React, { forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
    Controller,
    Control,
    FieldValues,
    RegisterOptions
} from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "@/components/ThemedText";
import { default as ExpoCheckBox } from "expo-checkbox";

interface CheckboxProps {
    control: Control<FieldValues>;
    name: string;
    label: string;
    rules?: RegisterOptions;
    placeholder?: string;
    children?: React.ReactNode;
}

const Checkbox = forwardRef<ExpoCheckBox, CheckboxProps>(
    (
        {
            control,
            name,
            label,
            onChange,
            onBlur,
            value,
            ...otherProps
        }: CheckboxProps,
        ref
    ) => {
        const backgroundColor = useThemeColor({}, "card");
        const textColor = useThemeColor({}, "text");
        const iconColor = useThemeColor({}, "icon");
        const borderColor = useThemeColor({}, "border");
        const placeholderColor = useThemeColor({}, "placeholder");

        // Expose methods to the parent if necessary
        useImperativeHandle(ref, () => ({
            focus: () => {}, // Focus method if needed
            blur: () => {} // Blur method if needed
        }));

        return (
            <View className="flex-row items-center space-x-2">
                <ExpoCheckBox
                    ref={ref}
                    value={value}
                    onValueChange={onChange}
                    color={value ? iconColor : undefined}
                    {...otherProps}
                />
                <ThemedText>{label}</ThemedText>
            </View>
        );
    }
);

export default Checkbox;
