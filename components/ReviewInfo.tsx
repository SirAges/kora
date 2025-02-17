import React from "react";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "@/components/ThemedText";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const ReviewInfo = ({ rating, count }) => {
    console.log(rating, count);
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    return (
        <View className="items-end">
            <View className="flex-row items-center space-x-1">
                <MaterialCommunityIcons
                    name="star"
                    size={14}
                    color={iconColor}
                />
                <ThemedText className="font-semibold">{`${rating}/5.0`}</ThemedText>
            </View>
            <View className="flex-row items-center space-x-1">
                <ThemedText>{`${count} reviews`}</ThemedText>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={16}
                    color={iconColor}
                />
            </View>
        </View>
    );
};

export default ReviewInfo;
