import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";

interface TextAreaProps {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    numberOfLines?: number;
}

export default function TextArea({
    control,
    name,
    label,
    placeholder,
    numberOfLines = 4
}: TextAreaProps) {
    const backgroundColor = useThemeColor({}, "card");
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                }) => (
                    <>
                        <TextInput
                            style={[
                                styles.textArea,
                                {
                                    backgroundColor,
                                    borderColor: error ? "red" : borderColor,
                                    color: textColor
                                }
                            ]}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderColor}
                            multiline
                            numberOfLines={numberOfLines}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        {error && (
                            <Text style={styles.error}>{error.message}</Text>
                        )}
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
       // fontWeight: "bold"
    },
    textArea: {
        borderWidth: 0,
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        textAlignVertical: "top" // Makes text start from the top
    },
    error: {
        color: "red",
        marginTop: 4,
        fontSize: 12
    }
});
