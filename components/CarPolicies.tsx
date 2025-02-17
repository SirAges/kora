import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Accordion from "@/components/Accordion";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatAmount } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
const CarPolicies = ({ data, type }) => {
    const primary = useThemeColor({}, "primary");
    const color = useThemeColor({}, "text");
    const iconColor = useThemeColor({}, "icon");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            addToBooking({ [type]: Array.isArray(data) ? data[0] : data })
        );
        return () => {};
    }, []);

    const selectedPolicy = useSelector(selectCurrentBooking)[type]?._id;
    const show_keys = [
        "security_deposit",
        "daily_limit",
        "extra_mile_charge",
        "penalty_fee",
        "fuel_price_per_liter",
        "refund_percentage",
        "prepaid_cost",
        "minimum_return_charge",
        "charging_fee",
        "service_fee",
        "no_refund",
        "included_in_price"
    ];
    const hide_values = ["_id", "type"];
    const hide_select = ["cancellation_policy"];

    const RenderPolicy = ({ item }) => {
        if (!item) return null;
        const isSelected = selectedPolicy === item._id;
        switch (type) {
            case "cancellation_policy":
                return (
                    <View className="py-2 px-2">
                        {[
                            {
                                key: item.description,
                                value: item.refund_percentage
                            }
                        ].map(({ key, value }) => (
                            <View
                                key={key}
                                className="flex-row items-center
                               justify-between"
                            >
                                {key && (
                                    <ThemedText className="pr-2">
                                        {key}
                                    </ThemedText>
                                )}
                                <ThemedText
                                    style={{ color: iconColor }}
                                    className="text-start"
                                >
                                    {value + "%"}
                                </ThemedText>
                            </View>
                        ))}
                    </View>
                );
            case "mileage_policy":
                return (
                    <View className="py-2">
                        {[
                            {
                                key: item.type && item.type,
                                value: null
                            },
                            {
                                key: item.daily_limit && "daily limit",
                                value:
                                    item.daily_limit && item.daily_limit + "mi"
                            },
                            {
                                key:
                                    item.extra_mile_charge &&
                                    "extra mile charge",
                                value:
                                    formatAmount(item.extra_mile_charge) || null
                            },
                            {
                                key: item.description || null,
                                value: null
                            }
                        ].map(
                            ({ key, value }) =>
                                (value || key) && (
                                    <View
                                        key={key}
                                        className="flex-row items-center pb-2
                               justify-between"
                                    >
                                        {key && (
                                            <ThemedText className="pr-2">
                                                {key}
                                            </ThemedText>
                                        )}
                                        {value && (
                                            <ThemedText
                                                style={{ color: iconColor }}
                                                className="text-start"
                                            >
                                                {value}
                                            </ThemedText>
                                        )}
                                    </View>
                                )
                        )}
                    </View>
                );
            case "confirmation_policy":
                return (
                    <TouchableOpacity
                        onPress={() => dispatch(addToBooking(item))}
                        className="flex-row flex-1 px-2"
                    >
                        <MaterialCommunityIcons
                            name={
                                selectedPolicy === item._id
                                    ? "radiobox-marked"
                                    : "radiobox-blank"
                            }
                            size={16}
                            color={iconColor}
                        />
                        <View>
                            {[
                                {
                                    key: item.name,
                                    value: null
                                },
                                {
                                    key: item.requirements,
                                    value: null
                                },
                                {
                                    key: "security deposit",
                                    value: formatAmount(item.security_deposit)
                                },
                                { key: item.description }
                            ].map(({ key, value }) => (
                                <View
                                    key={key}
                                    className="flex-row items-center
                          flex-1  pb-2   justify-between"
                                >
                                    {key && (
                                        <ThemedText className="pr-2">
                                            {key}
                                        </ThemedText>
                                    )}
                                    {value && (
                                        <ThemedText
                                            style={{ color: iconColor }}
                                            className="text-start"
                                        >
                                            {value}
                                        </ThemedText>
                                    )}
                                </View>
                            ))}
                        </View>
                    </TouchableOpacity>
                );
            case "fuel_policy":
                return (
                    <TouchableOpacity
                        onPress={() => dispatch(addToBooking(item))}
                    >
                        <View className="flex-row py-2  px-2">
                            <MaterialCommunityIcons
                                name={
                                    selectedPolicy === item._id
                                        ? "radiobox-marked"
                                        : "radiobox-blank"
                                }
                                size={16}
                                color={iconColor}
                            />
                            <View className="">
                                {[
                                    {
                                        key: item.name,
                                        value: null
                                    },
                                    {
                                        key: item.description,
                                        value: null
                                    },
                                    {
                                        key: item.penalty_fee
                                            ? "penalty fee"
                                            : null,
                                        value: formatAmount(item.penalty_fee)
                                    },
                                    {
                                        key: item.fuel_price_per_liter
                                            ? "fuel price per liter"
                                            : null,
                                        value: formatAmount(
                                            item.fuel_price_per_liter
                                        )
                                    },
                                    {
                                        key: item.no_refund
                                            ? "no refund"
                                            : null,
                                        value: item.no_refund ? "yes" : null
                                    },
                                    {
                                        key: item.prepaid_cost
                                            ? "prepaid cost"
                                            : null,
                                        value: formatAmount(item.prepaid_cost)
                                    },
                                    {
                                        key: item.service_fee
                                            ? "service fee"
                                            : null,
                                        value: formatAmount(item.service_fee)
                                    },
                                    {
                                        key: item.charging_fee
                                            ? "charging fee"
                                            : null,
                                        value: formatAmount(item.charging_fee)
                                    },
                                    {
                                        key: item.minimum_return_charge
                                            ? "minimum return charge"
                                            : null,
                                        value: item.minimum_return_charge
                                            ? item.minimum_return_charge + "%"
                                            : null
                                    },
                                    {
                                        key: item.included_in_price
                                            ? "included in price"
                                            : null,
                                        value: item.included_in_price
                                            ? "yes"
                                            : null
                                    }
                                ].map(
                                    ({ key, value }) =>
                                        (key || value) && (
                                            <View
                                                key={key}
                                                className="flex-row pb-2 items-center
                         justify-between"
                                            >
                                                {key && (
                                                    <ThemedText className="pr-2">
                                                        {key}
                                                    </ThemedText>
                                                )}
                                                {value && (
                                                    <ThemedText
                                                        style={{
                                                            color: iconColor
                                                        }}
                                                        className="text-start"
                                                    >
                                                        {value}
                                                    </ThemedText>
                                                )}
                                            </View>
                                        )
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            default:
                return null;
        }
    };

    return (
        data && (
            <Accordion title={type.replace(/_/g, " ")}>
                {Array.isArray(data) ? (
                    data.map(item => (
                        <View key={item._id}>
                            <RenderPolicy item={item} />
                        </View>
                    ))
                ) : (
                    <RenderPolicy item={data} />
                )}
            </Accordion>
        )
    );
};

export default CarPolicies;
