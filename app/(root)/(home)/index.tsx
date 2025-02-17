import React from "react";
import { View, Text, ScrollView } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import Header from "@/components/Header";
import SearchCard from "@/components/SearchCard";
import CarList from "@/components/CarList";
import DriverList from "@/components/DriverList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";

const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <ScrollView>
                <Header />
                <View className="px-2">
                    <SearchCard />
                </View>
               
                    <CarList
                        title="popular cars"
                        params={{ name: "popular" }}
                    />
                    <DriverList
                        title="fastest drivers"
                        params={{ name: "fastest" }}
                    />
                    <CarList title="luxury cars" params={{ name: "luxury" }} />
                    <CarList
                        title="new arrivals cars"
                        params={{ name: "arrivals" }}
                    />
                    <DriverList
                        title="experienced drivers"
                        params={{ name: "experience" }}
                    />
            
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
