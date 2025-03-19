import React, { useState } from "react";
import { View, Pressable } from "react-native";
import ThemedText from "@/components/ThemedText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { addToBooking } from "@/redux/globalSlice";

const MONEY_KEYS = [
    "prepaid_cost",
    "service_fee",
    "charging_fee",
    "penalty_fee",
    "security_deposit",
    "price_per_day",
    "extra_mile_charge"
];

const RenderPolicies = ({ policyName, policyData }) => {
    const dispatch = useDispatch();
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [selectedDetails, setSelectedDetails] = useState(null);

    const handleSelect = (subPolicy, details) => {
        const policyKey = policyName.trim().replace(/\s+/g, "_");

        // Calculate total amount from only money-related keys
        const totalAmount = Object.entries(details)
            .filter(([key]) => MONEY_KEYS.includes(key)) // Only keep valid money keys
            .reduce(
                (sum, [, value]) =>
                    sum + (typeof Number(value) === "number" ? Number(value) : 0),
                0
            );

        const selectedData = {
            name: subPolicy, // Sub-policy name
            amount: totalAmount // Calculated total
        };

        dispatch(addToBooking({ [policyKey]: selectedData }));
        setSelectedPolicy(subPolicy);
        setSelectedDetails(details);
    };

    return (
        policyData && (
            <View className="bg-gray-100 px-4 py-2">
                <View className="mb-2 p-4 bg-white rounded-lg shadow">
                    {/* Main Policy Title */}
                    <ThemedText className="text-lg font-bold text-gray-800 capitalize">
                        {policyName.replace(/_/g, " ")}
                    </ThemedText>

                    {/* Loop through sub-policies */}
                    {Object.entries(policyData).map(([subPolicy, details]) => (
                        <Pressable
                            key={subPolicy}
                            onPress={() => handleSelect(subPolicy, details)}
                            className={`mt-3 p-3 rounded-md flex-row items-center ${
                                selectedPolicy === subPolicy
                                    ? "bg-blue-100"
                                    : "bg-gray-50"
                            }`}
                        >
                            {/* Radio Button */}
                            <MaterialIcons
                                name={
                                    selectedPolicy === subPolicy
                                        ? "radio-button-checked"
                                        : "radio-button-unchecked"
                                }
                                size={20}
                                color={
                                    selectedPolicy === subPolicy
                                        ? "#3B82F6"
                                        : "#9CA3AF"
                                }
                                style={{ marginRight: 8 }}
                            />

                            {/* Sub-policy Title */}
                            <ThemedText className="text-sm font-semibold text-gray-700 capitalize">
                                {subPolicy.replace(/_/g, " ")}
                            </ThemedText>
                        </Pressable>
                    ))}
                </View>

                {/* Show Selected Policy Details */}
                {selectedDetails && (
                    <View className="mt-2 p-4 bg-white rounded-lg shadow">
                        <ThemedText className="text-sm font-bold capitalize text-gray-700">
                            {selectedPolicy.replace(/_/g, " ")} Details:
                        </ThemedText>

                        {Object.entries(selectedDetails).map(([key, value]) => (
                            <ThemedText
                                key={key}
                                className="text-xs text-gray-500 pl-2"
                            >
                                {key.replace(/_/g, " ")}:{" "}
                                {typeof value === "boolean"
                                    ? value
                                        ? "Yes"
                                        : "No"
                                    : value}
                            </ThemedText>
                        ))}
                    </View>
                )}
            </View>
        )
    );
};

export default RenderPolicies;
