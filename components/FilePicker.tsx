import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as FilePickerExpo from "expo-document-picker";
import { Controller } from "react-hook-form";
import ThemedText from "@/components/ThemedText";

import { useThemeColor } from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";

import FileViewer from "./FileViewer";

interface FilePickerProps {
    control: any;
    name: string;
    instruction: string;
}

export default function FilePicker({
    control,
    name,
    instruction,
    onChange,
    multiple,
    type
}: FilePickerProps) {
    const [pickedFiles, setPickedFiles] = useState<any[]>([]);
    const backgroundColor = useThemeColor({}, "card");
    const color = useThemeColor({}, "text");
    const iconColor = useThemeColor({}, "icon");
    const pickDocument = async (onChange: (file: any) => void) => {
        const { assets, canceled } = await FilePickerExpo.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true,
            multiple
        });
        console.log("result", assets);
        if (canceled) {
            console.log("canceled file picking");
            return;
        }
        const newFiles = multiple ? [...pickedFiles, ...assets] : assets;
        setPickedFiles(newFiles);
        onChange(newFiles);
    };

    return (
        <View className="flex-1">
            <TouchableOpacity
                className="items-center justify-center flex-1 h-24 rounded-md"
                style={[{ backgroundColor }]}
                onPress={() => pickDocument(onChange)}
            >
                <Ionicons
                    name="cloud-upload-outline"
                    color={iconColor}
                    size={32}
                />
                <ThemedText>{instruction}</ThemedText>
            </TouchableOpacity>

            <FileViewer files={pickedFiles} />
        </View>
    );
}
