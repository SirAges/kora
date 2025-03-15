import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface InputProps extends TextInputProps {
    name: string;
    label: string;
    rules?: object;
    onChange: (text: string) => void;
    onBlur: () => void;
    value: string;
}
const Input = forwardRef<TextInput, InputProps>(
    ({ name, onChange, onBlur, value, style, ...otherProps }, ref) => {
        const textColor = useThemeColor({}, "text");
        const placeholderColor = useThemeColor({}, "placeholder");

        return (
            <TextInput
                ref={ref}
            
                style={[
                    {
                        color: textColor,
                        textAlignVertical: "center", // Important for Android
                        paddingVertical: 0 // Ensure no extra padding
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

Input.displayName = "Input";

export default Input;
