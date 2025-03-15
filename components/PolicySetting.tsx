import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

const formSchema = z.object({
    subPolicy: z.string().min(1, "Sub-policy is required"),
    key: z.string().min(1, "Key is required"),
    value: z.any()
});

const PolicySetting = ({
    selectedPolicy,
    setValue,
    availableKeys,
    policy,
    subPolicy
}) => {
    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue: formSetValue,
        getValues
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { subPolicy: "", key: "", value: "" }
    });

    const [policyData, setPolicyData] = useState(selectedPolicy || {});

    useEffect(() => {
        setValue(policy, policyData);
    }, [policyData, policy, setValue]);

    const selectedSubPolicy = watch("subPolicy");
    const selectedKey = watch("key");

    const formatKeyForDisplay = key => key.replace(/_/g, " ");
    const formatKeyForStorage = key => key.replace(/\s+/g, "_");

    const booleanKeys = ["included_in_price"]; // Define boolean fields

    const handleAdd = formData => {
        const subPolicyType = formData.subPolicy;
        const key = formatKeyForStorage(formData.key);
        let value = formData.value;

        if (booleanKeys.includes(key)) {
            value = value === "true"; // Convert string to boolean
        }

        setPolicyData(prevData => ({
            ...prevData,
            [subPolicyType]: {
                ...(prevData[subPolicyType] || {}),
                [key]: value
            }
        }));

        setValue(policy, policyData);
        reset({ key: "", value: "" });
    };

    const handleRemove = (subPolicyType, key) => {
        setPolicyData(prevData => {
            const updatedData = { ...prevData };

            if (updatedData[subPolicyType]) {
                delete updatedData[subPolicyType][key];

                if (Object.keys(updatedData[subPolicyType]).length === 0) {
                    delete updatedData[subPolicyType];
                }
            }

            return updatedData;
        });

        setValue(policy, policyData);
    };

    return (
        <View className="p-4">
            <Text className="text-lg font-bold">
                {formatKeyForDisplay(policy)} Settings
            </Text>

            {/* Select Sub-Policy */}
            <CustomFormField
                control={control}
                name="subPolicy"
              
                fieldType={FormFieldType.SELECT}
                options={subPolicy.map(p => ({
                    label: formatKeyForDisplay(p),
                    value: p
                }))}
                placeholder="Select Sub-Policy"
            />

            {/* Select Key */}
            {selectedSubPolicy && (
                <CustomFormField
                    control={control}
                    name="key"
                    fieldType={FormFieldType.SELECT}
                    options={availableKeys.map(k => ({
                        label: formatKeyForDisplay(k),
                        value: k
                    }))}
                    placeholder="Select Key"
                />
            )}

            {/* Boolean Toggle or Input */}
            {selectedKey &&
            booleanKeys.includes(formatKeyForStorage(selectedKey)) ? (
                <CustomFormField
                    control={control}
                    name="value"
                    fieldType={FormFieldType.SELECT}
                    options={[
                        { label: "Yes", value: "true" },
                        { label: "No", value: "false" }
                    ]}
                    placeholder="Select Yes or No"
                />
            ) : (
                <CustomFormField
                    control={control}
                    name="value"
                    fieldType={FormFieldType.INPUT}
                    placeholder="Enter Value"
                />
            )}

            {/* Add Button */}
            <TouchableOpacity
                className="bg-green-500 mt-2 p-2 rounded"
                onPress={handleSubmit(handleAdd)}
            >
                <Text className="text-white text-center">+ Add</Text>
            </TouchableOpacity>

            {/* Display Policy Data */}
            <FlatList
                data={Object.entries(policyData)}
                keyExtractor={([subPolicyType]) => subPolicyType}
                renderItem={({ item }) => {
                    const [subPolicyType, keys] = item;

                    return (
                        <View className="p-2 border-b">
                            <Text className="font-bold">
                                {formatKeyForDisplay(subPolicyType)}
                            </Text>
                            {Object.entries(keys).map(([key, value]) => (
                                <View
                                    key={key}
                                    className="flex-row justify-between"
                                >
                                    <Text>
                                        {formatKeyForDisplay(key)}:{" "}
                                        {typeof value === "boolean"
                                            ? value
                                                ? "Yes"
                                                : "No"
                                            : value.toString()}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleRemove(subPolicyType, key)
                                        }
                                    >
                                        <Text className="text-red-500">
                                            Remove
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default PolicySetting;
