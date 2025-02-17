import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedCard from "@/components/ThemedCard";
import ThemedText from "@/components/ThemedText";
import DatePicker from "@/components/DatePicker";
import DateDifferenceSvg from "@/assets/svgs/difference";
import ThemedButton from "@/components/ThemedButton";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema, LocationSchemaType } from "@/lib/schema";
import { calculateDateDifference } from "@/lib/utils";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
const SearchCard = ({ action }) => {
    const dispatch = useDispatch();
    const defaultValues = useSelector(selectCurrentBooking);
    const [dateDifference, setDateDifference] = useState("");

    const method = useForm<LocationSchemaType>({
        resolver: zodResolver(locationSchema),
        defaultValues
    });
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isLoading }
    } = method;
    const startDate = defaultValues?.startDate;
    const endDate = defaultValues?.endDate;
    const withDriver = defaultValues?.withDriver;
    useEffect(() => {
        setValue("startDate", startDate);
        setValue("endDate", endDate);
        setDateDifference(calculateDateDifference(startDate, endDate));
    }, [startDate, endDate]);
    const onSubmit = (data: LocationSchemaType) => {
        dispatch(
            addToBooking({
                ...data,

                days: dateDifference,
                withDriver
            })
        );

        router.navigate("/cars-available");
        if (action !== undefined) action();
    };
    return (
        <ThemedCard
            color="background"
            className="px-2  
py-3"
        >
            <View
                className="flex-row items-center
            space-x-2 px-2"
            >
                <ThemedButton
                    type={withDriver ? "filled" : "outline"}
                    title="with driver"
                    onPress={() => dispatch(addToBooking({ withDriver: true }))}
                />
                <ThemedButton
                    type={!withDriver ? "filled" : "outline"}
                    title="without driver"
                    onPress={() =>
                        dispatch(addToBooking({ withDriver: false }))
                    }
                />
            </View>

            <CustomFormField
                fieldType={FormFieldType.SUGGESTION}
                control={control}
                leftIconName="location"
                position="bottom"
                label="pickup location"
                name="pickup_location"
            />
            <CustomFormField
                fieldType={FormFieldType.SUGGESTION}
                control={control}
                leftIconName="location"
                position="bottom"
                label="dropoff location"
                name="dropoff_location"
            />
            <View>
                <View className="flex-row items-center justify-between px-2 py-2">
                    <DatePicker title="Pickup date" isStart={true} />

                    {startDate && endDate && (
                        <View className="items-center">
                            <ThemedText type="primary">
                                {dateDifference}
                            </ThemedText>
                            <DateDifferenceSvg />
                        </View>
                    )}

                    <DatePicker title="Dropoff date" isStart={false} />
                </View>
                {errors && (
                    <ThemedText className="text-red-500">
                        {errors["startDate"]
                            ? errors["startDate"].message
                            : errors["endDate"]
                            ? errors["endDate"].message
                            : null}
                    </ThemedText>
                )}
            </View>
            <View className="px-2">
                <ThemedButton
                    title="Find a car"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </ThemedCard>
    );
};

export default SearchCard;
