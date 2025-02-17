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

interface SelectProps {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    position: string;
    onChange: (value: string) => void;
}

const Select = forwardRef<View, SelectProps>(
    ({ options, value, onChange, position }, ref) => {
        const [modalVisible, setModalVisible] = useState(false);
        const backgroundColor = useThemeColor({}, "card");
        const textColor = useThemeColor({}, "text");
        const borderColor = useThemeColor({}, "border");
        const placeholderColor = useThemeColor({}, "placeholder");
        const iconColor = useThemeColor({}, "icon");

        return (
            <View className="flex-1 py-2" >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View
                        className="flex-row  items-center
                    flex-row"
                    >
                        <Text
                            className="flex-1"
                            style={{
                                color: value ? textColor : placeholderColor
                            }}
                        >
                            {options.find(o => o.value === value)?.label ||
                                "Select..."}
                        </Text>
                        <Iconicons
                            name="chevron-down"
                            size={20}
                            color={iconColor}
                        />
                    </View>
                </TouchableOpacity>

                <ThemedModal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    position={position}
                >
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => `${item.value}${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="h-14 justify-center my-1 py-2 px-2
                                bg-gray-200/70 
                             rounded-lg"
                                onPress={() => {
                                    onChange(item.value);
                                    setModalVisible(false);
                                }}
                            >
                                <ThemedText
                                    style={{
                                        color: textColor
                                    }}
                                >
                                    {item.label}
                                </ThemedText>
                            </TouchableOpacity>
                        )}
                    />
                </ThemedModal>
            </View>
        );
    }
);

export default Select;
