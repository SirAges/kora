import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { formatAmount, formatDateTime } from "@/lib/utils";
import ThemedText from "@/components/ThemedText";
import GoBack from "@/components/GoBack";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedView from "@/components/ThemedView";
import ProviderDetails from "@/components/ProviderDetails";

import { useGetUserBookingsQuery } from "@/redux/booking/bookingApiSlice";

import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    const { data, error, isFetching } = useGetUserBookingsQuery();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        console.log("data", data, error);

        if (data && data !== undefined) {
            setBookings(data.data);
        }
        return () => {};
    }, [data]);
    console.log("data", JSON.stringify(data, null, 2), error);
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1 px-2">
            <View className="flex-row items-center space-x-2">
                <GoBack />
                <ThemedText type="title">My Bookings</ThemedText>
            </View>
            <FlatList
                data={bookings.bookings}
                renderItem={RenderBooking}
                keyExtractor={(item, index) => item._id}
            />
              {isFetching && <ScreenLoader title="Fetching bookings" />}
        </SafeAreaView>
    );
};

export default Index;
const RenderBooking = ({ item }) => {
    const {
        status,
        startDate,
        endDate,
        total_amount,
        driver,
        self_driver,
        price_per_day,
        car_id
    } = item;
    const { make, model, year } = car_id;
    return (
        <ThemedView className="rounded-md px-2 py-4 my-2 mx-2">
            <View
                className="flex-row items-center justify-between border-b
                border-gray-100 py-2"
            >
                <View className="flex-row items-center space-x-2 ">
                    <ThemedText className="font-semibold capitalize text-md">
                        {make}
                    </ThemedText>
                    <ThemedText className="font-semibold capitalize text-md">
                        {model}
                    </ThemedText>
                </View>
                <ThemedText>{year}</ThemedText>
            </View>
            <View>
                <View className="flex-row items-center justify-between py-2">
                    <View className="flex-row items-center">
                        <ThemedText className="font-semibold">
                            Total:
                        </ThemedText>
                        <ThemedText> {formatAmount(total_amount)}</ThemedText>
                    </View>
                    <ThemedText className="capitalize flex-1 text-right">
                        {status}
                    </ThemedText>
                </View>
            </View>
            {driver && (
                <ProviderDetails
                    user_id={driver || "67c9f7352c82e475cbb8cf65"}
                />
            )}
            {!self_driver && (
                <View className="space-y-2 pb-2">
                    <ThemedText className="font-semibold">Driver:</ThemedText>
                    <ThemedText className="capitalize font-semibold">
                        {self_driver?.full_name || "Stephen john"}
                    </ThemedText>
                    <ThemedText className="">
                        {self_driver?.phone || "+234802921210"}
                    </ThemedText>
                    <ThemedText className="">
                        {self_driver?.email || "ekelestephen@mail.com"}
                    </ThemedText>
                </View>
            )}
            <View className="flex-row items-center justify-between">
                <ThemedText className="font-semibold capitalize">
                    from
                </ThemedText>
                <ThemedText className="text-right font-semibold capitalize">
                    to
                </ThemedText>
            </View>
            <View className="flex-row items-center justify-between">
                <ThemedText>{formatDateTime(startDate).dateTime}</ThemedText>
                <ThemedText className="text-right">
                    {formatDateTime(endDate).dateTime}
                </ThemedText>
            </View>
        </ThemedView>
    );
};
