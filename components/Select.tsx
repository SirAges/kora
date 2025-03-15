import React, { useState, forwardRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import Iconicons from "@expo/vector-icons/Ionicons";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    name: string;
    options: Option[];
    value: string | string[];
    position: string;
    label: string;
    multiple?: boolean;
    onChange: (value: string | string[]) => void;
}

const Select = forwardRef<View, SelectProps>(
    (
        { options, label, value, multiple = false, onChange, position, name },
        ref
    ) => {
        const [modalVisible, setModalVisible] = useState(false);

        // Theme colors
        const backgroundColor = useThemeColor({}, "card");
        const textColor = useThemeColor({}, "text");
        const borderColor = useThemeColor({}, "border");
        const placeholderColor = useThemeColor({}, "placeholder");
        const iconColor = useThemeColor({}, "icon");

        const onSelected = (itemValue: string) => {
            if (multiple) {
                const selectedValues = Array.isArray(value) ? value : [];
                const isSelected = selectedValues.includes(itemValue);
                const newValues = isSelected
                    ? selectedValues.filter(v => v !== itemValue)
                    : [...selectedValues, itemValue];

                onChange(newValues);
            } else {
                onChange(itemValue);
            }
            setModalVisible(false);
        };

        const displayText = multiple
            ? Array.isArray(value) && value.length > 0
                ? `${value.length} items selected`
                : "Select Item"
            : options.find(o => o.value === value)?.label || "Select Item";

        return (
            <View className="flex-1 py-2">
                {/* Select Box */}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className=" items-center justify-between flex-1 flex-row "
                >
                    {name === "color" && typeof value === "string" && (
                        <View
                            style={{ backgroundColor: value }}
                            className="h-5 w-5 mr-2  rounded"
                        />
                    )}
                    <ThemedText
                        className="flex-1 text-start"
                        style={{
                            color: value ? textColor : placeholderColor
                        }}
                    >
                        {displayText}
                    </ThemedText>
                    <Iconicons
                        name="chevron-down"
                        size={20}
                        color={iconColor}
                    />
                </TouchableOpacity>

                {/* Modal for Selection */}
                <ThemedModal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    position={position}
                >
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => `${item.value}-${index}`}
                        renderItem={({ item }) => {
                            const isSelected = multiple
                                ? Array.isArray(value) &&
                                  value.includes(item.value)
                                : value === item.value;

                            return (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: isSelected
                                            ? iconColor
                                            : backgroundColor
                                    }}
                                    className="h-14 justify-center my-1 py-2 px-2 rounded-lg flex-row items-center"
                                    onPress={() => onSelected(item.value)}
                                >
                                    {name === "color" && (
                                        <View
                                            style={{
                                                backgroundColor: item.value
                                            }}
                                            className="h-5 w-5 mr-2 rounded"
                                        />
                                    )}
                                    <ThemedText
                                        className="flex-1 capitalize font-semibold"
                                        style={{
                                            color: isSelected
                                                ? "#ffffff"
                                                : textColor
                                        }}
                                    >
                                        {item.label}
                                    </ThemedText>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </ThemedModal>
            </View>
        );
    }
);

export default Select;
