import React from "react";
import { View, Text, FlatList } from "react-native";
import CarCard from "@/components/CarCard";
import ThemedText from "@/components/ThemedText";
import { cars } from "@/lib/data";
const CarList = ({ title, params }) => {
    const data =cars
    const renderItem = ({ item }) => <CarCard item={item} />;
    return (
        <View className="px-2">
            <ThemedText className="capitalize" type="semibold">
                {title}
            </ThemedText>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `car-${index}`}
                horizontal
            />
        </View>
    );
};

export default CarList;
