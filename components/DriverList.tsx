import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import DriverCard from "@/components/DriverCard";
import ThemedText from "@/components/ThemedText";
import { users } from "@/lib/data";
const DriverList = ({ title, params }) => {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        const filtered = users.filter(
            ({ user_type }) => user_type === "driver"
        );
        setDrivers(filtered);
        return () => {};
    }, []);

    const renderItem = ({ item }) => <DriverCard item={item} />;
    return (
        <View className="px-2">
            <ThemedText className="capitalize" type="semibold">
                {title}
            </ThemedText>
            <FlatList
                data={drivers}
                renderItem={renderItem}
                keyExtractor={(item, index) => `driver-${index}`}
                horizontal
            />
        </View>
    );
};

export default DriverList;
