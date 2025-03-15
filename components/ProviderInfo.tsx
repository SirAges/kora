import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import { users } from "@/lib/data";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGetUserQuery } from "@/redux/user/userApiSlice";

const ProviderInfo = ({ user_id }) => {
    const [provider, setProvider] = useState(null);
    const { data, isFetching, error } = useGetUserQuery(user_id);
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");

    useEffect(() => {
        if (data && data !== undefined) {
            setProvider(data.data);
        }

        return () => {};
    }, [user_id]);
    return (
        provider && (
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
                            {provider?.company_name ||
                                provider?.last_name + " " + provider.first_name}
                        </ThemedText>
                        {provider?.isVerified && (
                            <ThemedText style={{ color }} className="lowercase">
                                &#10004; {provider.verification_status}
                            </ThemedText>
                        )}
                    </View>
                </View>
            </View>
        )
    );
};

export default ProviderInfo;
