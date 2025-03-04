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
import ThemedText from "./ThemedText";

export type ThemedModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    position?: "top" | "center" | "bottom";
    lightColor?: string;
    darkColor?: string;
    children: React.ReactNode;
    title?: string;
};

const ThemedModal: React.FC<ThemedModalProps> = ({
    visible,
    onRequestClose,
    position = "center",
    lightColor,
    darkColor,
    children,
    title
}) => {
    const backgroundColor = useThemeColor({}, "background");

    const handleOutsidePress = (event: GestureResponderEvent) => {
        event.stopPropagation();
        onRequestClose();
    };

    const positionStyles = StyleSheet.create({
        top: { justifyContent: "flex-start", alignItems: "stretch" },
        center: {
            justifyContent: "center",
            alignItems: "center"
        },
        bottom: { justifyContent: "flex-end", alignItems: "stretch" }
    });

    const contentStyles = StyleSheet.create({
        top: {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            width: "100%",
            maxHeight: "70%"
        },
        center: {
            borderRadius: 10,
            width: "95%",
            maxHeight: "80%",
            alignSelf: "center"
        },
        bottom: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
            maxHeight: "70%"
        }
    });

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={[styles.modalOverlay, positionStyles[position]]}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                styles.modalContent,
                                contentStyles[position],
                                {
                                    backgroundColor
                                }
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
                            <View>{children}</View>
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

        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 10
    }
});

export default ThemedModal;
