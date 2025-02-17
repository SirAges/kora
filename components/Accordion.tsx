import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import ThemedText from "@/components/ThemedText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
const Accordion = ({ children, title, hide = false }) => {
    const [show, setShow] = useState(true);

    const iconColor = useThemeColor({}, "icon");
    const backgroundColor = useThemeColor({}, "card");
    useEffect(() => {
        setShow(hide);
        return () => {};
    }, [hide]);

    return (
        <View
            style={{ backgroundColor: backgroundColor + 90 }}
            className="my-0.5 w-full rounded-md"
        >
            <TouchableOpacity
                onPress={() => setShow(prev => !prev)}
                style={{ backgroundColor }}
                className="px-2 py-2 rounded-md flex-row items-center justify-between h-14 w-full "
            >
                <ThemedText type="semibold" className="capitalize flex-1">
                    {title}
                </ThemedText>
                <MaterialCommunityIcons
                    name={show ? "chevron-down" : "chevron-right"}
                    size={24}
                    color={iconColor}
                />
            </TouchableOpacity>
            {show && children}
        </View>
    );
};
export default Accordion;
