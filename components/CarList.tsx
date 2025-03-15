import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CarCard from "@/components/CarCard";
import { useGetCarsQuery } from "@/redux/car/carApiSlice";
import ThemedText from "@/components/ThemedText";
const CarList = ({ title, params }) => {
    const { data, error, isFetching } = useGetCarsQuery();
    const [cars, setCars] = useState([]);
    console.log("data", data, error);
    useEffect(() => {
        const getData = () => {
            if (data && data !== undefined) {
                setCars(data.data.cars);
            }
        };
        getData();
        return () => {};
    }, [data]);

    const renderItem = ({ item }) => <CarCard item={item} />;
    return (
        cars && (
            <View className="px-2">
                <ThemedText className="capitalize" type="semibold">
                    {title}
                </ThemedText>
                <FlatList
                    data={cars}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `car-${index}`}
                    horizontal
                />
            </View>
        )
    );
};

export default CarList;
