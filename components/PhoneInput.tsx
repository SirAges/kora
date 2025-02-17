import React, { useState, forwardRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import Iconicons from "@expo/vector-icons/Ionicons";
import countries from "@/lib/countries";

interface PhoneInputProps {
    name: string;

    value: string;
    onChange: (value: string) => void;
}

const PhoneInput = forwardRef<PhoneInputProps>(
    ({ value, onChange, onBlur, position, style, ...otherProps }, ref) => {
        const [code, setCode] = useState("");
        const [phone, setPhone] = useState("");
        const options = countries.map(({ phone, flag }) => ({
            label: `${flag}${phone}`,
            value: phone
        }));
        const [modalVisible, setModalVisible] = useState(false);
        const backgroundColor = useThemeColor({}, "card");
        const textColor = useThemeColor({}, "text");
        const borderColor = useThemeColor({}, "border");
        const placeholderColor = useThemeColor({}, "placeholder");
        const iconColor = useThemeColor({}, "icon");

        const onTextChange = text => {
            setPhone(text);
            onChange(code + phone);
        };
        console.log("code", code);
        return (
            <>
                <View ref={ref} className="flex-1 flex-row items-center">
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View className="flex-row items-center px-2">
                            <Text
                                className=" whitespace-nowrap"
                                style={{
                                    color: value ? textColor : placeholderColor
                                }}
                            >
                                {
                                    options.find(
                                        o =>
                                            o.value === code || o.value === "+1"
                                    )?.label
                                }
                            </Text>
                            <Iconicons
                                name="chevron-down"
                                size={20}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        ref={ref}
                        className="px-1 flex-1"
                        style={[
                            {
                                color: textColor
                            },
                            style
                        ]}
                        placeholderTextColor={placeholderColor}
                        onBlur={onBlur}
                        onChangeText={onTextChange}
                        value={phone}
                        {...otherProps}
                    />
                </View>
                <ThemedModal
                    visible={modalVisible}
                    position="bottom"
                    onRequestClose={() => setModalVisible(false)}
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
                                    setCode(item.value);
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
            </>
        );
    }
);

export default PhoneInput;
