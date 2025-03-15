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
import { useGetCarQuery } from "@/redux/car/carApiSlice";
import { truncate } from "@/lib/utils";
import { cars } from "@/lib/data";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
const Car = () => {
    const { car: carId } = useLocalSearchParams();
    const { data, error, isFetching } = useGetCarQuery(carId);
    const dispatch = useDispatch();
    const book = useSelector(selectCurrentBooking);
    const [car, setCar] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    useEffect(() => {
        if (data && data !== undefined) {
            setCar(data.data);
            setSelectedImage(data.data?.featured_image);
            const {
                images,
                availability_status,
                insurance_policy,
                mileage_policy,
                fuel_policy,
                confirmation_policy,
                cancellation_policy,
                registration_document,
                insurance_document,
                inspection_document,
                extra_services,
                pending_drivers,
                createdAt,
                updatedAt,
                __v,
                average_rating,
                id,

                ...others
            } = data.data || {};
            dispatch(addToBooking({ car: others }));
        }

        return () => {};
    }, [carId, data]);

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
    if (!car || isFetching) {
        return (
            <ScreenLoader
                title="Loading car details"
                messages="please
            wait..."
            />
        );
    }
    const onPressContinue = () => {
        if (
            book?.insurance_policy &&
            book?.cancellation_policy &&
            book?.confirmation_policy &&
            book?.mileage_policy &&
            book?.fuel_policy
        ) {
            router.navigate("cars/rent_a_car");
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
                <View className="px-2 flex-1">
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
                            <CarAttr
                                icon="format-color-fill"
                                data={car.color}
                            />
                        </View>

                       
                  
                        <ProviderInfo user_id={car.user_id} bg={false} />
              
                        <ReviewInfo revieweeId={car._id} revieweeType="Car" />
                        <ScrollView
                            className="flex-1"
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <View className="">
                                <TouchableOpacity>
                                    <ThemedText className=" whitespace-nowrap">
                                        {car?.location?.display_name ||
                                            "Car location"}
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        <View>
                            <RenderPolicies
                                policyName={"insurance policy"}
                                policyData={car.insurance_policy}
                            />
                            <RenderPolicies
                                policyName={"fuel policy"}
                                policyData={car.fuel_policy}
                            />
                            <RenderPolicies
                                policyName={"mileage policy"}
                                policyData={car.mileage_policy}
                            />
                            <RenderPolicies
                                policyName={"confirmation policy"}
                                policyData={car.confirmation_policy}
                            />
                            <RenderPolicies
                                policyName={"cancellation policy"}
                                policyData={car.cancellation_policy}
                            />
                        </View>
                    </ScrollView>
                     <ThemedButton title="continue" onPress={onPressContinue} />
                </View>
               
            </View>
        )
    );
};

export default Car;
