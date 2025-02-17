import ThemedCard from "@/components/ThemedCard";
import React from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { profiles } from "@/lib/data";
import GoBack from "@/components/GoBack";
import { Image } from "expo-image";
import { Link, router } from "expo-router";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    const onPressProfile = link => {
        console.log("link", link);
        router.navigate(link);
    };
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <GoBack />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center w-full my-4">
                    <ThemedText
                        className="text-center text-2xl font-bold"
                        type="title"
                    >
                        Choose Your Profile
                    </ThemedText>
                    <ThemedText
                        className="text-center text-sm text-gray-500 mt-1"
                        type="subtitle"
                    >
                        Select the role that fits you best to get started.
                    </ThemedText>
                </View>
                <View>
                    {profiles.map(({ id, title, image, description, link }) => (
                        <ThemedCard key={id} className="p-0 mb-1 mx-1">
                            <TouchableWithoutFeedback
                                onPress={() => onPressProfile(link)}
                            >
                                <View className="items-center flex-1 relative">
                                    <Image
                                        className="flex-1 h-60 w-full rounded-lg"
                                        source={{ uri: image }}
                                        cachePolicy="disk-memory"
                                        alt={title}
                                    />
                                    <View
                                        className="absolute z-50 flex-1 right-0
                                    bottom-0 top-0 left-0 rounded-lg items-center justify-center
                                    bg-black/60 space-y-2 px-2 py-2"
                                    >
                                        <ThemedText
                                            type="title"
                                            className="text-white text-center uppercase"
                                        >
                                            {title}
                                        </ThemedText>
                                        <ThemedText
                                            type="subtitle"
                                            className="text-white text-center"
                                        >
                                            {description}
                                        </ThemedText>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </ThemedCard>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
