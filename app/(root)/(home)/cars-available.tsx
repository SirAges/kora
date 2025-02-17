import SearchCard from "@/components/SearchCard";
import AvailableCard from "@/components/AvailableCard";
import FilterCard from "@/components/FilterCard";
import React, { useState } from "react";
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
import ThemedModal from "@/components/ThemedModal";
import GoBack from "@/components/GoBack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { truncate, formatDateTime } from "@/lib/utils";
import { Image } from "expo-image";
import { cars } from "@/lib/data";
import { useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
const CarAvailable = () => {
    const dispatch = useDispatch();
    

    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState(null);
    const { withDriver, startDate, endDate, days } =
        useSelector(selectCurrentBooking);

    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const onSearchedOpenPress = () => {
        setShowModal(true);
    };
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
                    <ScrollView className="h-20" horizontal>
                        <View
                            className="flex-row items-center w-full space-x-2 w-full
                justify-between px-2 py-2 "
                        >
                            {["all", "small", "medium", "large"].map(
                                (s, index) => (
                                    <ThemedText
                                        key={`${s}-${index}`}
                                        onPress={() =>
                                            setFilter(prev => ({
                                                ...prev,
                                                type: s
                                            }))
                                        }
                                        style={{
                                            color:
                                                filter.type === s
                                                    ? card
                                                    : iconColor,
                                            backgroundColor:
                                                filter.type === s
                                                    ? iconColor
                                                    : card
                                        }}
                                        className=" whitespace-nowrap text-sm min-w-[100px]
                            text-center font-semibold rounded-md
                            px-2 py-2"
                                    >
                                        {s}
                                    </ThemedText>
                                )
                            )}
                        </View>
                    </ScrollView>
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
            </SafeAreaView>
            <FilterCard filter={filter} setFilter={setFilter} />
        </>
    );
};

export default CarAvailable;
