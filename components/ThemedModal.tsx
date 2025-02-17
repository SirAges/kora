import ThemedText from "./ThemedText";
import React from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
    ScrollView
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    position?: "top" | "center" | "bottom";
    lightColor?: string;
    darkColor?: string;
    children: React.ReactNode;
};

export default ThemedModal = ({
    visible,
    onRequestClose,
    position = "center",
    lightColor,
    darkColor,
    children,
    title
}: ThemedModalProps) => {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    const handleOutsidePress = (event: GestureResponderEvent) => {
        event.stopPropagation();
        onRequestClose();
    };

    const positionStyle = {
        top: {
            justifyContent: "flex-start",
            alignItems: "stretch"
        },
        center: {
            justifyContent: "center",
            alignItems: "center"
        },
        bottom: {
            justifyContent: "flex-end",
            alignItems: "stretch"
        }
    };

    const contentStyle = {
        top: {
            borderBottomLeftRadius: 10, // Rounded at bottom
            borderBottomRightRadius: 10,
            width: "100%",
           // maxHeight: "70%"
        },
        center: {
            borderRadius: 10, // Rounded on all sides
            minWidth: "80%",
            maxHeight: "70%"
        },
        bottom: {
            borderTopLeftRadius: 10, // Rounded at top
            borderTopRightRadius: 10,
            width: "100%",
            maxHeight: "70%"
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={[styles.modalOverlay, positionStyle[position]]}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                styles.modalContent,
                                contentStyle[position],
                                { backgroundColor }
                            ]}
                        >
                            {title && (
                                <ThemedText
                                    type="title"
                                    className="text-center py-2"
                                >
                                    {title}
                                </ThemedText>
                            )}

                            <ScrollView>{children}</ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        padding: 10,
        shadowOpacity: 0.3,
        shadowRadius: 4
    }
});
