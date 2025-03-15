import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedText from "@/components/ThemedText";
import FilterCard from "@/components/FilterCard";
import CarCard from "@/components/CarCard";
import GoBack from "@/components/GoBack";

import ThemedView from "@/components/ThemedView";

import { useGetCarsQuery } from "@/redux/car/carApiSlice";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    const {car_type}=useLocalSearchParams()
    const [cars, setCars] = useState([]);
    const [filter, setFilter] = useState(null);
    const [params, setParams] = useState(null);
    const { data, isFetching } = useGetCarsQuery({...params,car_type});

    useEffect(() => {
        if (data && data !== undefined) {
            setCars(data.data.cars);
        }
        return () => {};
    }, [data]);

    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <View className="flex-row items-center space-x-2">
                <GoBack />
                <ThemedText type="title">All Cars</ThemedText>
            </View>
            <FlatList
                data={cars}
                renderItem={RenderCar}
                numColumns={2}
                keyExtractor={(item, index) => item._id}
            />
            <FilterCard
                filter={filter}
                setFilter={setFilter}
                setParams={setParams}
            />
            {isFetching && <ScreenLoader title="Fetching cars" />}
        </SafeAreaView>
    );
};

export default Index;
const RenderCar = ({ item }) => {
    return <CarCard item={item} />;
};
