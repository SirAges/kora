import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ThemedCard from "@/components/ThemedCard";
import RateCard from "@/components/RateCard";
import ThemedText from "@/components/ThemedText";
import CarAttr from "@/components/CarAttr";
import ThemedView from "@/components/ThemedView";
import ThemedModal from "@/components/ThemedModal";
import ProviderInfo from "@/components/ProviderInfo";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const AvailableCard = ({ item, days }) => {
    const backgroundColor = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const onPressAvailableCar = () => {
        router.navigate(`/(cars)/${item._id}`);
    };

    return (
        <TouchableOpacity onPress={onPressAvailableCar}>
            <View className="px-2 pb-2">
                <View
                    className="w-full rounded-md px-2 py-2"
                    style={{ backgroundColor }}
                >
                    <View className="flex-row justify-between items-center">
                        <ThemedText type="semibold">{`${item.make} ${item.model}`}</ThemedText>
                        <ThemedText className="font-semibold" type="subtitle">
                            {item.year}
                        </ThemedText>
                    </View>
                    <View className="w-full flex-row space-x-2">
                        <Image
                            className="h-full w-1/2 rounded-md"
                            source={item.featured_image.secure_url}
                        />

                        <View
                            className="w-1/2 flex-row items-center
                    flex-wrap px-2 py-2"
                        >
                            <CarAttr icon="car" data={item.car_type} />
                            <CarAttr icon="fuel" data={item.fuel_type} />
                            <CarAttr
                                icon="car-shift-pattern"
                                data={item.transmission}
                            />
                            <CarAttr icon="gas-station" data={item.mileage} />
                            <CarAttr icon="car-seat" data={item.seats} />
                            <CarAttr icon="car-door" data={item.doors} />
                            <CarAttr
                                icon="format-color-fill"
                                data={item.color}
                            />
                        </View>
                    </View>

                    <View className="flex-row items-center w-full space-x-1">
                        <ProviderInfo user_id={item.user_id} />

                        <RateCard rate={item.price_per_day} days={days} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AvailableCard;
