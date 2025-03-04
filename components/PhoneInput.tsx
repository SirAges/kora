import React, { useState, forwardRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
    TextInputProps
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import countries from "@/lib/countries";

interface PhoneInputProps extends TextInputProps {
    value?: string; // Allow undefined initially
    onChange: (value: string) => void;
}

const PhoneInput = forwardRef<TextInput, PhoneInputProps>(
    ({ value = "", onChange, style, ...otherProps }, ref) => {
        const defaultCountry = countries[0].phone;

        // Extract country code and phone number from value
        const getInitialState = () => {
            if (!value) {
                return { selectedCode: defaultCountry, phoneNumber: "" };
            }
            const foundCountry = countries.find(({ phone }) =>
                value.startsWith(phone)
            );
            const selectedCode = foundCountry
                ? foundCountry.phone
                : defaultCountry;
            const phoneNumber = value.replace(selectedCode, ""); // Remove code from input display
            return { selectedCode, phoneNumber };
        };

        const [selectedCode, setSelectedCode] = useState<string>(
            getInitialState().selectedCode
        );
        const [phoneNumber, setPhoneNumber] = useState<string>(
            getInitialState().phoneNumber
        );
        const [modalVisible, setModalVisible] = useState<boolean>(false);

        useEffect(() => {
            // Update state when value prop changes
            const { selectedCode, phoneNumber } = getInitialState();
            setSelectedCode(selectedCode);
            setPhoneNumber(phoneNumber);
        }, [value]);

        const textColor = useThemeColor({}, "text");
        const placeholderColor = useThemeColor({}, "placeholder");
        const iconColor = useThemeColor({}, "icon");

        const countryOptions = countries.map(({ phone, flag, name }) => ({
            label: `${flag} ${phone} ${name}`,
            displayName: `${flag} ${phone}`,
            value: phone
        }));

        const getLabel = (code: string) => {
            const found = countryOptions.find(o => o.value === code);
            return found ? found.displayName : countryOptions[0].displayName;
        };

        const handleTextChange = (text: string) => {
            setPhoneNumber(text);
            onChange(selectedCode + text); // Pass full number to onChange
        };

        const handleSelectCode = (code: string) => {
            setSelectedCode(code);
            onChange(code + phoneNumber); // Update value with new code
            setModalVisible(false);
        };

        return (
            <>
                <View className="flex-1 flex-row items-center">
                    {/* Country Code Selector */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View className="flex-row items-center px-2">
                            <Text
                                className="whitespace-nowrap"
                                style={{
                                    color: selectedCode
                                        ? textColor
                                        : placeholderColor
                                }}
                            >
                                {getLabel(selectedCode)}
                            </Text>
                            <Ionicons
                                name="chevron-down"
                                size={20}
                                color={iconColor}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Phone Number Input */}
                    <TextInput
                        ref={ref}
                        className="px-1 flex-1"
                        style={[{ color: textColor }, style]}
                        inputMode="numeric"
                        placeholderTextColor={placeholderColor}
                        onChangeText={handleTextChange}
                        value={phoneNumber} // Show only phone number
                        {...otherProps}
                    />
                </View>

                {/* Country Selection Modal */}
                <ThemedModal
                    visible={modalVisible}
                    position="bottom"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <FlatList
                        data={countryOptions}
                        keyExtractor={item => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="h-14 justify-center my-1 py-2 px-2 bg-gray-200/70 rounded-lg"
                                onPress={() => handleSelectCode(item.value)}
                            >
                                <ThemedText style={{ color: textColor }}>
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
