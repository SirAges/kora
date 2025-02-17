import React, { useRef, useState } from "react";
import { TextInput, Alert, View, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

interface OTPInputProps {
    length?: number; // Default is 6
    name: string;
    onChange: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    onChange,
    value,
    onRequestClose,
    ...otherProps
}) => {
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
            if (index === length - 1) {
                onRequestClose();
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
        <View style={styles.container}>
            {otp.map((value, index) => (
                <TextInput
                    key={index}
                    ref={ref => (inputs.current[index] = ref)}
                    style={[
                        styles.input,
                        { backgroundColor, color: textColor, borderColor }
                    ]}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={value}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    {...otherProps}
                    placeholderTextColor={placeholderColor}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    
    },
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
