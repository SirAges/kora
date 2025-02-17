import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import { users } from "@/lib/data";
import { useThemeColor } from "@/hooks/useThemeColor";

const ProviderInfo = ({ user_id }) => {
    const [provider, setProvider] = useState(null);
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");

    useEffect(() => {
        const found = users.find(user => user._id === user_id);
        setProvider(found);
        return () => {};
    }, [user_id]);

    return (
        <View className="w-1/2 pr-1 pt-1">
            <View
                style={{ backgroundColor }}
                className=" rounded py-2 px-2 flex-row items-center space-x-2"
            >
                <Image
                    className="rounded-full h-8 w-8"
                    source={{
                        uri:
                            provider?.profile_image?.secure_url ||
                            provider?.company_logo?.secure_url
                    }}
                />
                <View>
                    <ThemedText className="capitalize font-semibold">
                        {provider?.company_name || provider?.full_name}
                    </ThemedText>
                    {provider?.verified && (
                        <ThemedText style={{ color }} className="lowercase">
                            &#10004; verified
                        </ThemedText>
                    )}
                </View>
            </View>
        </View>
    );
};

export default ProviderInfo;
