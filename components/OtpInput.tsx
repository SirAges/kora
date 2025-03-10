import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet, TextInputKeyPressEventData, NativeSyntheticEvent } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface OTPInputProps {
    length?: number; // Default length is 6
    value: string;
    onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, value, onChange }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);

    const backgroundColor = useThemeColor({}, "card");
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");

    const updateOtp = (newOtp: string[]) => {
        setOtp(newOtp);
        onChange(newOtp.join(""));
    };

    const handleChange = (text: string, index: number) => {
        if (/^\d*$/.test(text)) {
            const newOtp = [...otp];

            if (text.length > 1) {
                // Handle paste event where text contains multiple characters
                const pastedOtp = text.slice(0, length).split("");
                for (let i = 0; i < pastedOtp.length; i++) {
                    newOtp[index + i] = pastedOtp[i];
                }
                updateOtp(newOtp);
                inputs.current[Math.min(index + pastedOtp.length, length - 1)]?.focus();
            } else {
                newOtp[index] = text;
                updateOtp(newOtp);

                // Move to next input if character is entered
                if (text && index < length - 1) {
                    inputs.current[index + 1]?.focus();
                }
            }
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View className="flex-row items-center justify-between w-full space-x-1">
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={ref => (inputs.current[index] = ref)}
                    className="rounded-md h-12 flex-1 text-center border"
                    style={[styles.input, { backgroundColor, color: textColor, borderColor }]}
                    keyboardType="number-pad"
                    maxLength={length} // Allows pasting of OTP
                    value={digit}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    placeholder="•"
                    placeholderTextColor={placeholderColor}
                    textContentType="oneTimeCode" // Enables auto-fill from SMS on iOS
                    autoComplete="sms-otp"
                    importantForAutofill="yes"
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50,
        textAlign: "center",
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default OTPInput;