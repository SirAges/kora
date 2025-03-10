import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as FilePickerExpo from "expo-document-picker";
import { Controller } from "react-hook-form";
import ThemedText from "@/components/ThemedText";
import CustomFormField from "@/components/CustomFormField";
import * as FileSystem from "expo-file-system";

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
  value,
  multiple,
  type,
}: FilePickerProps) {
  const [pickedFiles, setPickedFiles] = useState<any[]>([]);
  const backgroundColor = useThemeColor({}, "card");
  const color = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const pickDocument = async (onChange: (file: any) => void) => {
    const { assets, canceled } = await FilePickerExpo.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
      multiple,
    });
    if (canceled) {
      console.log("canceled file picking");
      return;
    }
    const newFiles = multiple ? [...pickedFiles, ...assets] : assets;

    setPickedFiles(newFiles);
    onChange(multiple ? newFiles : newFiles[0]);
  };

  return (
    <View className="flex-1 h-24 py-2">
      <TouchableOpacity
        className="items-center justify-center flex-1"
        onPress={() => pickDocument(onChange)}
      >
        <Ionicons
          name="cloud-upload-outline"
          color={iconColor}
          size={32}
        />
      </TouchableOpacity>
      <ThemedText className="text-center">{instruction}</ThemedText>

      {value && <FileViewer files={multiple ? value : [value]} />}
    </View>
  );
}
