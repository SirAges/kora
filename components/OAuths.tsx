import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GoogleSvg from "@/assets/svgs/google.svg";
import FacebookSvg from "@/assets/svgs/facebook.svg";
import AppleSvg from "@/assets/svgs/apple.svg";
import XSvg from "@/assets/svgs/X.svg";

const OAuthS = () => {
    return (
        <View className="flex-row items-center space-x-6 py-4">
            <GoogleSvg />
            <FacebookSvg />
            <AppleSvg />
            <XSvg />
        </View>
    );
};

export default OAuthS;
