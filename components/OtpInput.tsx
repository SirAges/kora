import React, { useRef, useState } from "react";
import { TextInput, Alert, View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface OTPInputProps {
    length?: number; // Default is 6
    name: string;
    onChange: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onChange, value }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);
    const backgroundColor = useThemeColor({}, "card");
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");

    const handleChange = (text: string, index: number) => {
        if (/^\d$/.test(text) || text === "") {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            onChange(newOtp.join(""));

            // Move to next input
            if (text && index < length - 1) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (
            e.nativeEvent.key === "Backspace" &&
            otp[index] === "" &&
            index > 0
        ) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-row items-center justify-between  w-full space-x-1">
            {otp.map((value, index) => (
                <TextInput
                    className="rounded-md h-12 flex-1 text-center border"
                    key={index}
                    ref={ref => (inputs.current[index] = ref)}
                    style={[{ backgroundColor, color: textColor, borderColor }]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={value}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    placeholderTextColor={placeholderColor}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        width: 50,
        height: 50,
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 20
    }
});

export default OTPInput;
