import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
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

import { truncate } from "@/lib/utils";
import { cars } from "@/lib/data";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
const Car = () => {
    const { car: carId } = useLocalSearchParams();
    const dispatch = useDispatch();
    const book = useSelector(selectCurrentBooking);
    console.log("book", book);
    const [car, setCar] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    useEffect(() => {
        const found = cars.find(car => car._id === carId);
        setCar(found);
        setSelectedImage(found?.featured_image);
        const {
            insurance,
            mileage_policy,
            fuel_policy,
            confirmation_policy,
            cancellation_policy,
            dropoff_options,
            pickup_options,
            images,
            maintenance_records,
            documents,
            pending_drivers,
            ...others
        } = found;
        dispatch(addToBooking({car:others}));
        return () => {};
    }, [carId]);

    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const onPressRotate = () => {
        const imageLength = car?.images.length;
        setImageIndex(prev => (prev < imageLength ? prev + 1 : 0));

        if (imageIndex === imageLength) {
            setSelectedImage(car?.featured_image);
        } else {
            setSelectedImage(car?.images[imageIndex]);
        }
    };
    return (
        car &&
        selectedImage && (
            <View className="relative flex-1 " style={{ backgroundColor }}>
                <SafeAreaView className="z-50 absolute w-full flex-row items-center justify-between px-2">
                    <GoBack />
                    <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color={iconColor}
                    />
                </SafeAreaView>

                <View className="relative items-center w-full ">
                    <Image
                        contentFit="cover"
                        className="h-96 w-full rounded-b-lg"
                        source={selectedImage?.secure_url}
                    />
                    <View
                        style={{ backgroundColor }}
                        className="absolute -bottom-6 z-50 shadow-lg
                        shadow-black/50 rounded-full h-12 w-12 items-center
                        justify-center"
                    >
                        <MaterialCommunityIcons
                            onPress={onPressRotate}
                            name="rotate-360"
                            size={28}
                            color={iconColor}
                        />
                    </View>
                </View>
                <ScrollView>
                    <ThemedText
                        type="title"
                        className="px-2 py-2 capitalize top-6"
                    >{`${car.make} ${car.model}`}</ThemedText>
                    <View
                        className=" w-full flex-row cars-center
                    flex-wrap border-b border-gray-100/80  px-2 py-4"
                    >
                        <CarAttr icon="car" data={car.car_type} />
                        <CarAttr icon="fuel" data={car.fuel_type} />

                        <CarAttr
                            icon="car-shift-pattern"
                            data={car.transmission}
                        />
                        <CarAttr icon="gas-station" data={car.mileage} />
                        <CarAttr icon="car-seat" data={car.seats} />
                        <CarAttr icon="car-door" data={car.doors} />
                        <CarAttr icon="format-color-fill" data={car.color} />
                    </View>

                    <ProviderDetails user_id={car.user_id} />
                    <LocationDetails
                        pickup_options={car.pickup_options}
                        dropoff_options={car.dropoff_options}
                    />
                    <InsuranceOptions insurance={car.insurance} />
                    <View className="px-2 py-2 rounded-lg border border-gray-100">
                        <ThemedText type="title">Packages</ThemedText>
                        <CarPolicies
                            data={car.confirmation_policy}
                            type="confirmation_policy"
                        />
                        <CarPolicies
                            data={car.mileage_policy}
                            type="mileage_policy"
                        />
                        <CarPolicies
                            data={car.fuel_policy}
                            type="fuel_policy"
                        />
                        <CarPolicies
                            data={car.cancellation_policy}
                            type="cancellation_policy"
                        />
                    </View>
                    <View className=" px-2">
                        <ThemedButton
                            title="continue"
                            onPress={() => router.navigate("rent_a_car")}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    );
};

export default Car;
