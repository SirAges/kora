import SearchCard from "@/components/SearchCard";
import { z } from "zod";
import CarAttr from "@/components/CarAttr";
import RateCard from "@/components/RateCard";
import ProviderInfo from "@/components/ProviderInfo";
import LocationDetails from "@/components/LocationDetails";
import ProviderDetails from "@/components/ProviderDetails";
import FilterCard from "@/components/FilterCard";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Switch
} from "react-native";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import ThemedModal from "@/components/ThemedModal";
import SelectModal from "@/components/SelectModal";
import Accordion from "@/components/Accordion";
import GoBack from "@/components/GoBack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
    truncate,
    formatDateTime,
    formatAmount,
    applyPromoCode
} from "@/lib/utils";
import { Image } from "expo-image";
import { cars, paymentMethods, promoCodes } from "@/lib/data";
import { useLocalSearchParams } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
const RentACar = () => {
    const dispatch = useDispatch();
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const color = useThemeColor({}, "text");
    const {
        car,
        days,
        tax,
        insurance,
        i_am_driver,
        driver,
        promo_code,
        payment_method,
        self_driver
    } = useSelector(selectCurrentBooking);
    const booking = useSelector(selectCurrentBooking);
    console.log("booking", JSON.stringify(booking, null, 2));

    useEffect(() => {
        return () => {};
    }, []);
    return (
        <SafeAreaView className="flex-1 px-2" style={{ backgroundColor }}>
            <View className="flex-row items-center justify-between">
                <GoBack />

                <ThemedText type="title">Rent a Car</ThemedText>

                <Ionicons
                    name="ellipsis-vertical"
                    color={iconColor}
                    size={24}
                />
            </View>
            <ScrollView>
                <View
                    className="border border-gray-200 rounded-md
                my-2"
                >
                    <AvailableCard item={car} days={parseInt(days)} />
                </View>
                <View
                    className="border border-gray-200 rounded-md px-2 py-2
                my-2"
                >
                    <LocationDetails />
                </View>
                <View
                    className="border border-gray-200 rounded-md px-2 py-2
                my-2"
                >
                    <View className="flex-row items-center py-2">
                        <MaterialCommunityIcons
                            name="security"
                            size={20}
                            color={iconColor}
                        />
                        <ThemedText type="title">Insurance</ThemedText>
                    </View>
                    <View
                        className="flex-row items-center justify-between
                    "
                    >
                        <MaterialCommunityIcons
                            name="radiobox-marked"
                            size={14}
                            color={iconColor}
                        />
                        <ThemedText type="semibold" className="flex-1 px-2">
                            {insurance?.name}
                        </ThemedText>
                        <ThemedText>
                            {formatAmount(
                                insurance?.price_per_day * parseInt(days)
                            )}
                        </ThemedText>
                    </View>
                    <View className=" flex-row">
                        <ThemedText type="" className="flex-1 pr-2">
                            {insurance?.description}
                        </ThemedText>
                        <ThemedText type="px-2">{days}</ThemedText>
                    </View>
                </View>
                <View className="border border-gray-200 px-2 py-2 rounded-md">
                    <View className="flex-row items-center">
                        <ThemedText className="font-semibold text-lg flex-1">
                            I am the driver
                        </ThemedText>
                        <Switch
                            trackColor={{
                                false: color + 60,
                                true: iconColor + 60
                            }}
                            thumbColor={i_am_driver ? iconColor : color}
                            ios_backgroundColor={backgroundColor}
                            onValueChange={val =>
                                dispatch(addToBooking({ i_am_driver: val }))
                            }
                            value={i_am_driver}
                        />
                    </View>
                    {i_am_driver ? (
                        <View>
                            <DriverForm self_driver={self_driver} />
                        </View>
                    ) : (
                        <SelectModal
                            field="driver"
                            selected={driver}
                            data={car?.drivers}
                        >
                            <MaterialCommunityIcons
                                name="steering"
                                size={20}
                                color={iconColor}
                            />
                            <ThemedText
                                className="flex-1 px2  py-2
                            font-semibold text-md"
                            >
                                Select driver
                            </ThemedText>
                        </SelectModal>
                    )}
                </View>
                <View
                    className="rounded-md border border-gray-200 px-2 py-2
                my-2"
                >
                    <SelectModal
                        field="payment_method"
                        selected={payment_method}
                        data={paymentMethods}
                    >
                        <MaterialIcons
                            name="payment"
                            size={20}
                            color={iconColor}
                        />
                        <ThemedText
                            className="flex-1 px2  py-2
                            font-semibold text-md"
                        >
                            Payment method
                        </ThemedText>
                    </SelectModal>
                </View>
                <View className="rounded-md border border-gray-200 px-2 py-2">
                    <SelectModal
                        field="promo_code"
                        selected={promo_code}
                        data={promoCodes}
                    >
                        <MaterialCommunityIcons
                            name="gift-outline"
                            size={20}
                            color={iconColor}
                        />
                        <ThemedText
                            className="flex-1 px2  py-2
                            font-semibold text-md"
                        >
                            Voucher/Discount
                        </ThemedText>
                    </SelectModal>
                </View>
                <View
                    className="rounded-md border border-gray-200 px-2 py-2
                my-2"
                >
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="font-semibold">
                            Amount
                        </ThemedText>
                        <ThemedText>{`${formatAmount(
                            car.price_per_day * parseInt(days)
                        )} (${parseInt(days)} days)`}</ThemedText>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="font-semibold capitalize">
                            Insurance {insurance?.name}
                        </ThemedText>
                        <ThemedText>
                            {formatAmount(
                                insurance?.price_per_day * parseInt(days)
                            )}
                        </ThemedText>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="font-semibold capitalize">
                            Tax
                        </ThemedText>
                        <ThemedText>{formatAmount(tax)}</ThemedText>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="font-semibold capitalize">
                            Tax
                        </ThemedText>
                        <ThemedText>{formatAmount(tax)}</ThemedText>
                    </View>
                </View>
            </ScrollView>
            <ThemedButton title="Book car" />
        </SafeAreaView>
    );
};

export default RentACar;
const AvailableCard = ({ item }) => {
    const backgroundColor = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const onPressAvailableCar = () => {
        router.navigate(`/(cars)/${item._id}`);
    };

    return (
        <TouchableOpacity onPress={onPressAvailableCar}>
            <View className="px-2 pb-2">
                <View className="w-full rounded-md px-2 py-2">
                    <View className="flex-row justify-between items-center">
                        <ThemedText
                            type="semibold"
                            className="py-2"
                        >{`${item.make} ${item.model}`}</ThemedText>
                        <ThemedText type="semibold" className="py-2">
                            {item.year}
                        </ThemedText>
                    </View>
                    <View className="w-full flex-row space-x-2">
                        <Image
                            className="h-full w-1/2 rounded-md"
                            source={item.featured_image.secure_url}
                        />

                        <View
                            className="w-1/2 flex-row items-center
                    flex-wrap px-2 py-2"
                        >
                            <CarAttr icon="car" data={item.car_type} />
                            <CarAttr icon="fuel" data={item.fuel_type} />
                            <CarAttr
                                icon="car-shift-pattern"
                                data={item.transmission}
                            />
                            <CarAttr icon="gas-station" data={item.mileage} />
                            <CarAttr icon="car-seat" data={item.seats} />
                            <CarAttr icon="car-door" data={item.doors} />
                            <CarAttr
                                icon="format-color-fill"
                                data={item.color}
                            />
                        </View>
                    </View>

                    <View className="flex-row items-center w-full">
                        <ProviderInfo user_id={item.user_id} bg={false} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const DriverForm = ({ self_driver }) => {
    const dispatch = useDispatch();

    const driverSchema = z.object({
        full_name: z.string({ message: "full name is required" }),
        email: z.string({ message: "email is required" }).email(),
        phone: z.string({ message: "phone number is required" }),
        license_number: z.string({ message: "license number is required" })
    });
    type dDriverSchemaType = z.infer<typeof driverSchema>;
    const method = useForm<dDriverSchemaType>({
        resolver: zodResolver(driverSchema),
        defaultValues: {
            email: "",
            license_number: "",
            full_name: "",
            phone: ""
        }
    });
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { isLoading }
    } = method;
    const onSubmit = (data: AuthSchemaType) => {};
    return (
        <View>
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                value={self_driver?.full_name}
                onChange={value => {
                    setValue("full_name", value);
                    dispatch(
                        addToBooking({
                            self_driver: { ...self_driver, full_name: value }
                        })
                    );
                }}
                name="full_name"
                label="full name"
                placeholder="jonathan mike"
                leftIconName="person"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                onChange={value => {
                    setValue("email", value);
                    dispatch(
                        addToBooking({
                            self_driver: { ...self_driver, email: value }
                        })
                    );
                }}
                name="email"
                label="email"
                placeholder="john@example.com"
                leftIconName="mail"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={control}
                onChange={value => {
                    dispatch(
                        addToBooking({
                            self_driver: { ...self_driver, phone: value }
                        })
                    );
                }}
                inputMode="numeric"
                name="phone"
                label="phone"
                placeholder="468 687 8866"
            />
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={control}
                value={self_driver?.license_number}
                onChange={value => {
                    setValue("license_number", value);
                    dispatch(
                        addToBooking({
                            self_driver: {
                                ...self_driver,
                                license_number: value
                            }
                        })
                    );
                }}
                inputMode={"numeric"}
                name="license_number"
                label="license number"
                placeholder="675435677"
                leftIconName="medal"
            />
        </View>
    );
};
