import React from "react";
import { View, Text, TouchableWithoutFeedback, Alert } from "react-native";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { truncate } from "@/lib/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
const CarCard = ({ item, style }) => {
    const card = useThemeColor({}, "card");

    const onPressCard = () => {
        router.navigate(`cars/${item._id}`);
    };
    return (
        <TouchableWithoutFeedback onPress={onPressCard}>
            <View className="w-44 px-1 py-1">
                <View
                    style={{ backgroundColor: card }}
                    className="items-center relative rounded-md"
                >
                    <Image
                        source={item.featured_image.secure_url}
                        className="w-full h-44 rounded-md"
                    />
                    <View className=" rounded-md w-full px-2 py-2">
                        <ThemedText className="capitalize text-center text-[15px] font-semibold">
                            {truncate(`${item.make} ${item.model}`, 15)}
                        </ThemedText>
                        <ThemedText
                            type="primary"
                            className="capitalize text-center "
                        >
                            ${item.price_per_day}/day
                        </ThemedText>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CarCard;
