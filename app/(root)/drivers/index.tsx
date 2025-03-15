import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedText from "@/components/ThemedText";

import DriverCard from "@/components/DriverCard";
import GoBack from "@/components/GoBack";

import ThemedView from "@/components/ThemedView";

import { useGetDriversQuery } from "@/redux/user/userApiSlice";

import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    const { data, isFetching } = useGetDriversQuery();
    const [drivers, setDrivers] = useState([]);
    const [filter, setFilter] = useState(null);
    useEffect(() => {
        if (data && data !== undefined) {
            setDrivers(data.data.users);
        }
        return () => {};
    }, [data]);
   
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <View className="flex-row items-center space-x-2">
                <GoBack />
                <ThemedText type="title">All Drivers</ThemedText>
            </View>
            <FlatList
                data={drivers}
                renderItem={RenderDriver}
                numColumns={2}
                keyExtractor={(item, index) => item._id}
            />

            {isFetching && <ScreenLoader title="Fetching drivers" />}
        </SafeAreaView>
    );
};

export default Index;
const RenderDriver = ({ item }) => {
    return <DriverCard item={item} />;
};
