import React, { useState, useEffect } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "@/components/ThemedText";
import Input from "@/components/Input";

interface SkeletonProps {
    keys: string[]; // Array of keys to generate inputs
    onChange: (values: Record<string, string>) => void; // Callback function to return updated values
}

const Skeleton: React.FC<SkeletonProps> = ({
    keys,
    onChange,
    onBlur,
    value
}) => {
    useEffect(() => {
        onChange(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
        return () => {};
    }, []);

    const color = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");
    const backgroundColor = useThemeColor({}, "card");
    const handleChange = (key: string, text: string) => {
        const newValues = { ...value, [key]: text };

        onChange(newValues); // Pass updated values to parent component
    };

    return (
        <View className="flex-1">
            {keys.map(key => (
                <View key={key} className="flex-1 space-y-1 py-2">
                    <ThemedText className="capitalize">{key}</ThemedText>
                    <Input
                        className="rounded-md py-4 px-2"
                        style={[{ backgroundColor, color }]}
                        value={value[key] || {}}
                        placeholder={key}
                        placeholderTextColor={placeholderColor}
                        onBlur={onBlur}
                        onChange={text => handleChange(key, text)}
                    />
                </View>
            ))}
        </View>
    );
};

export default Skeleton;
