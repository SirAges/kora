import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ThemedDriverd from "@/components/ThemedDriverd";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";

import { truncate } from "@/lib/utils";
import { Image } from "expo-image";
const DriverCard = ({ item, style }) => {
    const backgroundColor = useThemeColor({}, "card");
    const onPressDriver = () => {
        router.navigate(`drivers/${item._id}`);
    };
    return (
        <TouchableOpacity onPress={onPressDriver} className="w-44 px-1 py-1">
            <View
                style={{ backgroundColor: backgroundColor }}
                className="items-center relative py-2 rounded-md"
            >
                <Image
                    source={item.profile_image.secure_url}
                    className="w-36 h-36 rounded-full"
                />
                <View className=" rounded-md w-full px-2 py-2">
                    <ThemedText className="capitalize text-center text-[15px] font-semibold">
                        {truncate(`${item.last_name} ${item.first_name}`, 15)}
                    </ThemedText>
                    <ThemedText
                        type="primary"
                        className="capitalize text-center "
                    >
                        ${item.hourly_rate}/hr
                    </ThemedText>
                    <ThemedText
                        type="primary"
                        className="capitalize text-center "
                    >
                        ${item.km_rate}/km
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DriverCard;
