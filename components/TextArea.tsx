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

const TextArea = forwardRef<TextInput, InputProps>(
    ({ name, onChange, onBlur, value, style, ...otherProps }, ref) => {
        const textColor = useThemeColor({}, "text");
        const placeholderColor = useThemeColor({}, "placeholder");

        return (
            <TextInput
                className="h-full w-full"
                ref={ref}
                style={[{ color: textColor, textAlignVertical: "top" }, style]}
                placeholderTextColor={placeholderColor}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={10}
                {...otherProps}
            />
        );
    }
);

TextArea.displayName = "TextArea";

export default TextArea;
