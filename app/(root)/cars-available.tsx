import SearchCard from "@/components/SearchCard";
import AvailableCard from "@/components/AvailableCard";
import FilterCard from "@/components/FilterCard";
import { CAR_TYPES } from "@/constants/enums";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView
} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ScreenLoader from "@/components/ScreenLoader";

import ThemedModal from "@/components/ThemedModal";
import GoBack from "@/components/GoBack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { truncate, formatDateTime } from "@/lib/utils";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
import { useGetCarsQuery } from "@/redux/car/carApiSlice";
const CarAvailable = () => {
    const dispatch = useDispatch();
    const {
        withDriver,
        startDate,
        endDate,
        days,
        dropoff_location,
        pickup_location
    } = useSelector(selectCurrentBooking);
    const [showModal, setShowModal] = useState(false);
    const [cars, setCars] = useState([]);
    const [filter, setFilter] = useState(null);
    const [params, setParams] = useState(null);

    const { data, isFetching } = useGetCarsQuery({
        withDriver,
        startDate,
        endDate,
        dropoff_location:[dropoff_location.lat,dropoff_location.lng],
        pickup_location:[pickup_location.lat,pickup_location.lng],
        ...params
    });
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const onSearchedOpenPress = () => {
        setShowModal(true);
    };
    useEffect(() => {
        if (data && data !== undefined) {
            setCars(data.data.cars);
        }
        return () => {};
    }, [data]);

    return (
        <>
            <SafeAreaView className="flex-1" style={{ backgroundColor }}>
                <View className="flex-row items-center justify-between">
                    <GoBack />
                    <View className="items-center">
                        <ThemedText type="title">Available cars</ThemedText>
                        <TouchableOpacity onPress={onSearchedOpenPress}>
                            <View className="flex-row items-center">
                                <ThemedText>
                                    {formatDateTime(startDate).dateTime}-
                                </ThemedText>
                                <ThemedText>
                                    {formatDateTime(endDate).dateTime}
                                </ThemedText>
                                <Ionicons
                                    name="chevron-down"
                                    size={24}
                                    color={iconColor}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Ionicons
                        name="ellipsis-vertical"
                        color={iconColor}
                        size={24}
                    />
                </View>
                {filter && (
                    <View className="h-14">
                        <ScrollView horizontal>
                            <View
                                className="flex-row items-center h-14
                        justify-between  px-2 space-x-2"
                            >
                                {" "}
                                {CAR_TYPES.map((s, index) => (
                                    <ThemedText
                                        key={`${s}-${index}`}
                                        onPress={() =>
                                            setParams(prev => ({
                                                ...prev,
                                                type: s
                                            }))
                                        }
                                        style={{
                                            color:
                                                params?.type === s
                                                    ? card
                                                    : iconColor,
                                            backgroundColor:
                                                params?.type === s
                                                    ? iconColor
                                                    : card
                                        }}
                                        className="rounded py-2 px-2"
                                    >
                                        {s}
                                    </ThemedText>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}
                <FlatList
                    data={cars}
                    renderItem={({ item }) => (
                        <AvailableCard item={item} days={days} />
                    )}
                    keyExtractor={(item, index) => `${index}`}
                />

                <ThemedModal
                    visible={showModal}
                    onRequestClose={() => setShowModal(false)}
                    position="top"
                >
                    <ScrollView>
                        <View>
                            <SearchCard action={() => setShowModal(false)} />
                        </View>
                    </ScrollView>
                </ThemedModal>
                {isFetching && <ScreenLoader title="Fetching cars" />}
            </SafeAreaView>
            <FilterCard
                filter={filter}
                setFilter={setFilter}
                setParams={setParams}
            />
        </>
    );
};

export default CarAvailable;
