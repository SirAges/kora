import React from "react";
import { View, Text, ScrollView } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { home_sections } from "@/lib/data";
import { Image } from "expo-image";
import { router } from "expo-router";

const HomeCard = ({ item }) => {
    const backgroundColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "primary");
    const { title, image, cta, route, description, rowStyle } = item;
    return (
        <View className="px-2 py-2">
            <View className={`rounded-md ${rowStyle}`}>
                <Image
                    contentFit="cover"
                    className="rounded-md items-center flex-1 h-36"
                    source={image}
                />
                <View className="flex-1 items-center justify-center">
                    <ThemedText className="font-semibold capitalize">
                        {title}
                    </ThemedText>

                    <ThemedText className="text-center py-1 px-2">
                        {description}
                    </ThemedText>

                    <ThemedText
                        onPress={() => router.navigate(route)}
                        style={{ color }}
                        className="font-semibold capitalize py-2 text-lg
                        underline"
                    >
                        {cta}
                    </ThemedText>
                </View>
            </View>
        </View>
    );
};

export default HomeCard;
