import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
    ScrollView
} from "react-native";
import { Video } from "expo-av";
import * as WebBrowser from "expo-web-browser";
import { Buffer } from "buffer";
import ThemedModal from "@/components/ThemedModal";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

interface FileViewerProps {
    files: any[];
}

export default function FileViewer({ files }: FileViewerProps) {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const isImage = (mimeType: string) => mimeType?.startsWith("image/");
    const isVideo = (mimeType: string) => mimeType?.startsWith("video/");
    const isPDF = (mimeType: string) => mimeType === "application/pdf";

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
        <View style={styles.container}>
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
                <Text style={styles.modalTitle}>{selectedFile?.name}</Text>

                {isImage(selectedFile?.mimeType) && (
                    <Image
                        className="flex-1 max-h-48"
                        source={{ uri: selectedFile.uri }}
                        resizeMode="contain"
                    />
                )}

                {isVideo(selectedFile?.mimeType) && (
                    <Video
                        source={{ uri: selectedFile.uri }}
                        className="flex-1 max-h-48"
                        useNativeControls
                        resizeMode="contain"
                    />
                )}

                {!isImage(selectedFile?.mimeType) &&
                    !isVideo(selectedFile?.mimeType) &&
                    !isPDF(selectedFile?.mimeType) && (
                        <Text>
                            No preview available. Click the file name to open in
                            browser.
                        </Text>
                    )}

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setSelectedFile(null)}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </ThemedModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    title: {
        fontWeight: "bold",
        marginBottom: 5
    },
    fileItem: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5
    },
    fileName: {
        color: "#333"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        maxHeight: "80%"
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10
    },
    previewImage: {
        width: "100%",
        height: 300,
        marginBottom: 10
    },
    video: {
        width: "100%",
        height: 300,
        marginBottom: 10
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: "#ff4d4d",
        padding: 10,
        borderRadius: 5,
        alignItems: "center"
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "bold"
    }
});
