import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import { users } from "@/lib/data";
import { useThemeColor } from "@/hooks/useThemeColor";

const RateCard = ({ rate, days }) => {
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");

    return (
        <View className="w-1/2 pl-1 pt-1">
            <View
                style={{ backgroundColor }}
                className="rounded py-2 px-2 flex-row items-center space-x-2"
            >
                <View>
                    <ThemedText className="capitalize font-semibold">
                        ${rate}/day
                    </ThemedText>
                    <ThemedText style={{ color }} className="lowercase">
                        total: ${parseInt(days) * rate}/{days}
                    </ThemedText>
                </View>
                <View>
                    <ThemedText className="capitalize font-semibold"></ThemedText>
                </View>
            </View>
        </View>
    );
};

export default RateCard;
