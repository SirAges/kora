import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import Accordion from "@/components/Accordion";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { insurance_list } from "@/lib/data";
import { formatAmount } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const InsuranceOptions = ({ insurance }) => {
    const selectedInsurance = useSelector(selectCurrentBooking)?.insurance?._id;
    console.log("insurance", insurance);
    const dispatch = useDispatch();

    const iconColor = useThemeColor({}, "icon");
    useEffect(() => {
        dispatch(
            addToBooking({
                insurance:{ ...insurance[0],
                name: insurance_list[0].name,
                description: insurance_list[0].description
           } })
        );
        return () => {};
    }, []);
    const RenderInsurance = ({ price_per_day, _id }) => {
        const item = insurance_list.find(f => f?._id === _id);

        return (
            item && (
                <>
                    <TouchableOpacity
                        onPress={() =>
                            dispatch(
                                addToBooking({
                                    insurance: {
                                        _id,
                                        price_per_day,
                                        name: item.name,
                                        description: item.description
                                    }
                                })
                            )
                        }
                    >
                        <View className="flex-row items-center space-x-2 py-2 px-2">
                            <MaterialCommunityIcons
                                name={
                                    selectedInsurance === _id
                                        ? "radiobox-marked"
                                        : "radiobox-blank"
                                }
                                size={24}
                                color={iconColor}
                            />
                            <View className="flex-1">
                                <ThemedText className="font-semibold">
                                    {item.name}
                                </ThemedText>
                                <ThemedText>{item.description}</ThemedText>
                            </View>

                            <ThemedText
                                style={{ color: iconColor }}
                                className="font-semibold"
                            >
                                {formatAmount(price_per_day)}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                    <View className="space-y-2">
                        {Object.entries(item.coverage).map(([key, value]) => (
                            <View
                                key={key}
                                className="flex-row items-center
                            justify-between px-10"
                            >
                                <ThemedText className="">
                                    {key.replace(/_/g, " ")}
                                </ThemedText>
                                <MaterialCommunityIcons
                                    name={
                                        value
                                            ? "checkbox-marked"
                                            : "checkbox-outline"
                                    }
                                    size={16}
                                    color={iconColor}
                                />
                            </View>
                        ))}
                    </View>
                </>
            )
        );
    };

    return (
        <Accordion title="Insurance">
            <View className="flex-1 space-y-2 border-b border-gray-100/80">
                {insurance.map(({ _id, price_per_day }) => (
                    <View key={_id}>
                        <RenderInsurance
                            price_per_day={price_per_day}
                            _id={_id}
                        />
                    </View>
                ))}
            </View>
        </Accordion>
    );
};

export default InsuranceOptions;
