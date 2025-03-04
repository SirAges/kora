import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    ScrollView
} from "react-native";
import { Video } from "expo-av";
import * as WebBrowser from "expo-web-browser";
import { Image } from "expo-image";
import { Buffer } from "buffer";
import ThemedModal from "@/components/ThemedModal";
import { useThemeColor } from "@/hooks/useThemeColor";

import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import * as FileSystem from "expo-file-system";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Sharing from "expo-sharing";

interface FileViewerProps {
    files: any[];
}

export default function FileViewer({ files }: FileViewerProps) {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const isImage = (mimeType: string) => mimeType?.startsWith("image/");
    const isVideo = (mimeType: string) => mimeType?.startsWith("video/");
    const isPDF = (mimeType: string) => mimeType === "application/pdf";
    const iconColor = useThemeColor({}, "icon");
    interface FileData {
        uri: string;
        name: string;
        mimeType: string;
    }

    const getUTI = (mimeType: string): string => {
        const utiMap: { [key: string]: string } = {
            "application/pdf": "com.adobe.pdf",
            "text/plain": "public.plain-text",
            "application/json": "public.json",
            "application/msword": "com.microsoft.word.doc",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                "org.openxmlformats.wordprocessingml.document",
            "application/vnd.ms-excel": "com.microsoft.excel.xls",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                "org.openxmlformats.spreadsheetml.sheet"
        };
        return utiMap[mimeType] || "";
    };

    const isSupportedFile = (mimeType: string): boolean => {
        return (
            mimeType === "application/pdf" ||
            mimeType.startsWith("text/") ||
            mimeType.startsWith("application/")
        );
    };

    const openFile = async (file: FileData): Promise<void> => {
        if (isSupportedFile(file.mimeType)) {
            const uti = getUTI(file.mimeType);

            try {
                await Sharing.shareAsync(file.uri, {
                    dialogTitle: file.name,
                    mimeType: file.mimeType,
                    UTI: uti
                });
            } catch (error) {
                console.error("Error sharing file:", error);
            }
        } else {
            setSelectedFile(file); // Ensure setSelectedFile is defined in the parent scope
        }
    };

    return (
        <View className="py-2">
            <ScrollView horizontal>
                <View className="flex-row items-center space-x-2">
                    {files.map((file, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => openFile(file)}
                        >
                            <View
                                className={`h-20 w-20 flex-row rounded items-center
                        justify-center   ${
                            isImage(file.mimeType)
                                ? "bg-blue-500"
                                : isVideo(file.mimeType)
                                ? "bg-amber-500"
                                : isPDF(file.mimeType)
                                ? "bg-red-500"
                                : "bg-gray-500"
                        }`}
                            >
                                {isImage(file.mimeType) ||
                                isVideo(file.mimeType) ? (
                                    <Image
                                        className="flex-1 w-full h-full rounded"
                                        source={{ uri: file.uri }}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <Text
                                        className="text-white uppercase
                                font-semibold"
                                    >
                                        {file.name.split(".").pop()}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <ThemedModal
                visible={!!selectedFile}
                onRequestClose={() => setSelectedFile(null)}
            >
                <View className=" w-full h-full">
                    <View className="flex-row items-center justify-between py-2">
                        <Text className="font-semibold text-lg ">
                            {selectedFile?.name}
                        </Text>
                        <MaterialCommunityIcons
                            onPress={() => setSelectedFile(null)}
                            color={iconColor}
                            name="close"
                            size={24}
                        />
                    </View>

                    {isImage(selectedFile?.mimeType) && (
                        <Image
                            className="w-full flex-1"
                            source={{ uri: selectedFile.uri }}
                            contentFit="contain"
                        />
                    )}

                    {isVideo(selectedFile?.mimeType) && (
                        <Video
                            source={{ uri: selectedFile.uri }}
                            className="flex-1 h-48"
                            useNativeControls
                            resizeMode="contain"
                        />
                    )}

                    {!isImage(selectedFile?.mimeType) &&
                        !isVideo(selectedFile?.mimeType) &&
                        !isPDF(selectedFile?.mimeType) && (
                            <Text>
                                No preview available. Click the file name to
                                open in browser.
                            </Text>
                        )}
                </View>
            </ThemedModal>
        </View>
    );
}
