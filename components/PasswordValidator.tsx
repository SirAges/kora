import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import TickSvg from "@/assets/svgs/tick.svg";
import CancelSvg from "@/assets/svgs/cancel.svg";
const PasswordValidator = ({ password }) => {
    const criteria = {
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasDigit: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&.]/.test(password), // Includes `.`
        hasMinLength: password?.length >= 8
    };

    const getStatus = isValid => ({
        color: isValid ? "green" : "red",
        Icon: isValid ? TickSvg : CancelSvg
    });

    return (
        password && (
            <View className="px-2 py-2">
                <View className="">
                    {Object.entries(criteria).map(([key, isValid]) => {
                        const { color, Icon } = getStatus(isValid);
                        return (
                            <View className="flex-row items-center flex-1">
                                <Icon />
                                <Text
                                    key={key}
                                    className="text-xs "
                                    style={[{ color }]}
                                >
                                    {criteriaText[key]}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        )
    );
};

const criteriaText = {
    hasUppercase: "At least one uppercase letter (A-Z)",
    hasLowercase: "At least one lowercase letter (a-z)",
    hasDigit: "At least one number (0-9)",
    hasSpecialChar: "At least one special character (@$!%*?&.)",
    hasMinLength: "Minimum 8 characters"
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    criteriaContainer: {
        marginTop: 10
    },
    criteria: {
        fontSize: 14,
        marginVertical: 3
    }
});

export default PasswordValidator;
