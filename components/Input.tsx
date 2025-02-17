import React, { useState, useEffect, forwardRef } from "react";
import { TextInput, View, Text, StyleSheet, Image } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Icon from "@expo/vector-icons";
interface InputProps {
    name: string;
    placeholder?: string;
    label: string;
    rules?: object;
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
}

const Input = forwardRef<TextInput, InputProps>(
    ({ style, name, onChange, onBlur, value, ...otherProps }, ref) => {
        const textColor = useThemeColor({}, "text");
        const borderColor = useThemeColor({}, "border");
        const placeholderColor = useThemeColor({}, "placeholder");

        return (
            <TextInput
                ref={ref}
                className="px-1 flex-1"
                style={[
                    {
                        color: textColor
                    },
                    style
                ]}
                placeholderTextColor={placeholderColor}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                {...otherProps}
            />
        );
    }
);

export default Input;
