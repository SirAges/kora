import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import ReviewInfo from "@/components/ReviewInfo";
import { Image } from "expo-image";
import { users } from "@/lib/data";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useGetUserQuery } from "@/redux/user/userApiSlice";
const ProviderDetails = ({ user_id, onPress }) => {
    const [provider, setProvider] = useState(null);
    const { data, isFetching, error } = useGetUserQuery(user_id);
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");
    console.log("backgroundColor", backgroundColor);
        useEffect(() => {
        if (data && data !== undefined) {
            setProvider(data.data);
        }

        return () => {};
    }, [user_id]);


    return (
        provider && (
            <TouchableOpacity
                onPress={onPress}
                className="flex-row items-center justify-between px-2 border-b
            border-gray-100/80 flex-1"
            >
                <View className=" rounded py-2  flex-row items-center space-x-2">
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
                        {provider?.verified && (
                            <ThemedText style={{ color }} className="lowercase">
                                &#10004; verified
                            </ThemedText>
                        )}
                    </View>
                </View>
               
            </TouchableOpacity>
        )
    );
};

export default ProviderDetails;
