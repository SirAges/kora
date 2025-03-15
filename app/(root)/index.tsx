import React from "react";
import { View, Text, ScrollView } from "react-native";
import ThemedView from "@/components/ThemedView";
import HomeCard from "@/components/HomeCard";
import ThemedText from "@/components/ThemedText";
import Header from "@/components/Header";
import SearchCard from "@/components/SearchCard";
import CarList from "@/components/CarList";
import DriverList from "@/components/DriverList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { home_sections } from "@/lib/data";

const Index = () => {
    const backgroundColor = useThemeColor({}, "background");
    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1">
            <ScrollView>
                <Header />
                <View className="px-2">
                    <SearchCard />
                </View>
                <View className="px-2 py-2 space-y-2">
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Explore Our Car Collection",
                                description:
                                    "Browse top-quality cars for every occasion.",
                                image: require("@/assets/images/fleet.jpg"),
                                cta: "Browse Cars",
                                route: "cars",
                                rowStyle: "flex-row"
                            }}
                        />
                        <HomeCard
                            item={{
                                title: "Hire a Pro Driver",
                                description:
                                    "Book a professional driver for your trip.",
                                image: require("@/assets/images/driver.jpg"),
                                cta: "Hire Now",
                                route: "drivers",
                                rowStyle: "flex-row-reverse"
                            }}
                        />
                    </ThemedView>
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Manage Your Bookings",
                                description:
                                    "View and modify your bookings anytime.",
                                image: require("@/assets/images/luxury2.jpg"),

                                cta: "View Bookings",
                                route: "bookings",
                                rowStyle: ""
                            }}
                        />
                    </ThemedView>

                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Drive Safe, Stay Smart",
                                description:
                                    "Expert driving tips for a smooth ride.",

                                image: require("@/assets/images/safety.jpg"),
                                cta: "Learn More",
                                route: "learn",
                                rowStyle: "flex-row"
                            }}
                        />
                        <HomeCard
                            item={{
                                title: "Exclusive Deals & Offers",
                                description:
                                    "Unlock special discounts on rentals.",

                                image: require("@/assets/images/car4.jpg"),
                                cta: "View Offers",
                                route: "promos",
                                rowStyle: "flex-row-reverse"
                            }}
                        />
                    </ThemedView>
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Luxury on Wheels",
                                description:
                                    "Experience high-end cars for VIP rides.",
                                image: require("@/assets/images/luxury.jpg"),
                                cta: "Explore",
                                route: "cars?car_type=luxury",
                                rowStyle: ""
                            }}
                        />
                    </ThemedView>
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "What Our Customers Say",
                                description:
                                    "Read real experiences from our users.",

                                image: require("@/assets/images/car5.jpg"),
                                cta: "Read Reviews",
                                route: "testimonials",
                                rowStyle: "flex-row-reverse"
                            }}
                        />
                        <HomeCard
                            item={{
                                title: "Elite Business Travel",
                                description:
                                    "Premium cars for executives & business trips.",

                                image: require("@/assets/images/elite.jpg"),
                                cta: "Book Now",
                                route: "cars?car_type=elite",
                                rowStyle: "flex-row"
                            }}
                        />
                    </ThemedView>
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Plan Your Road Trip",
                                description:
                                    "Rent the best cars for unforgettable trips.",
                                image: require("@/assets/images/roadtrip.jpg"),
                                cta: "Start Planning",
                                route: "/plan",
                                rowStyle: ""
                            }}
                        />
                    </ThemedView>
                    <ThemedView className="rounded-md">
                        <HomeCard
                            item={{
                                title: "Go Green, Drive Clean",
                                description:
                                    "Discover eco-friendly electric & hybrid cars.",
                                image: require("@/assets/images/hybrid.jpg"),
                                cta: "Explore Now",
                                 route: "cars?car_type=hybrid",
                                rowStyle: "flex-row"
                            }}
                        />
                    </ThemedView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Index;
