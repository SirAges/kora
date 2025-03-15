import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import ScreenLoader from "@/components/ScreenLoader";
import RenderPolicies from "@/components/RenderPolicies";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ReviewInfo from "@/components/ReviewInfo";
import ThemedButton from "@/components/ThemedButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import GoBack from "@/components/GoBack";
import CarAttr from "@/components/CarAttr";
import LocationDetails from "@/components/LocationDetails";
import ProviderDetails from "@/components/ProviderDetails";
import ProviderInfo from "@/components/ProviderInfo";
import CarPolicies from "@/components/CarPolicies";
import InsuranceOptions from "@/components/InsuranceOptions";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
import { useGetDriverQuery } from "@/redux/user/userApiSlice";
import { truncate, formatAmount } from "@/lib/utils";
import { cars } from "@/lib/data";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
const Driver = () => {
    const { driver: driverId } = useLocalSearchParams();
    const { data, error, isFetching } = useGetDriverQuery(driverId);
    const [driver, setDriver] = useState(null);
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");

    useEffect(() => {
        if (data && data !== undefined) {
            setDriver(data.data);
        }
        return () => {};
    }, [data]);

    if (!driver || isFetching) {
        return (
            <ScreenLoader
                title="Loading driver details"
                messages="please
            wait..."
            />
        );
    }
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1 px-4">
            <View className="flex-1 py-2 space-y-2">
                <ScrollView>
                    <View className="w-full flex-row items-center justify-between px-2">
                        <GoBack />
                        <ThemedText type="title">{`${driver.last_name} ${driver.first_name}`}</ThemedText>
                        <Ionicons
                            name="chatbox-outline"
                            size={24}
                            color={iconColor}
                        />
                    </View>
                    <View className="py-4">
                        <Image
                            className="rounded-md w-full h-96"
                            source={{ uri: driver.profile_image.secure_url }}
                        />
                    </View>
                    <View
                        className="flex-row items-center justify-between 
            space-x-2"
                    >
                        <ThemedText
                            className="bg-gray-200 rounded font-semibold flex-1
                text-center text-md py-2 px-2"
                        >
                            EX: {driver?.experience || 12}YRS
                        </ThemedText>
                        <ThemedText
                            className="bg-gray-200 rounded font-semibold flex-1
                text-center text-md py-2 px-2"
                        >
                            {formatAmount(driver?.km_rate || 45)}/KM
                        </ThemedText>
                        <ThemedText
                            className="bg-gray-200 rounded font-semibold flex-1
                text-center text-md py-2 px-2"
                        >
                            {formatAmount(driver?.hourly_rate || 23)}/HR
                        </ThemedText>
                    </View>
                    <ReviewInfo
                    
                        revieweeId={driver._id}
                        revieweeType="User"
                    />

                    <ThemedText className="text-justify text-gray-600 leading-5">
                        Experienced driver with 12 years on the road, safely
                        transporting passengers and goods for four reputable
                        companies. Skilled in navigation, vehicle maintenance,
                        and ensuring timely, secure deliveries.
                    </ThemedText>
                </ScrollView>
            </View>
            <ThemedButton title="Hire me" />
        </SafeAreaView>
    );
};
export default Driver;
