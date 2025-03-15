import { View, ScrollView, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText"; // Adjust the path if needed
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedButton from "@/components/ThemedButton";
const RoadTrip = () => {
    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "border");
    const card = useThemeColor({}, "card");
    return (
        <SafeAreaView style={{ backgroundColor }} className="p-5 flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center py-2">
                    <View
                        style={{ backgroundColor: card }}
                        className="w-52 h-52 items-center rounded-full p-2"
                    >
                        {/* Header Image */}
                        <Image
                            source={require("@/assets/images/roadtrip.jpg")}
                            className="w-full h-full rounded-full mb-6"
                        />
                    </View>
                </View>

                {/* Title */}
                <ThemedText type="title" className="text-2xl font-bold ">
                    🚗 Road Trip Planning Guide
                </ThemedText>

                <ThemedText className="text-lg  mt-2">
                    Make your road trip smooth, stress-free, and unforgettable!
                    Follow these essential tips for the perfect adventure.
                </ThemedText>

                {/* Road Trip Tips */}
                <View className="mt-5 space-y-6">
                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🗺️ Plan Your Route in Advance
                        </ThemedText>
                        <ThemedText className="">
                            Research your destinations, road conditions, and
                            alternative routes before hitting the road. Use apps
                            like Google Maps or Waze to check for real-time
                            traffic updates and road closures.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            ⛽ Check Fuel Stations Along the Way
                        </ThemedText>
                        <ThemedText className="">
                            Avoid getting stranded by mapping out fuel stops,
                            especially in remote areas. Keep your tank at least
                            half full to prevent unexpected delays.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🏕️ Book Accommodations in Advance
                        </ThemedText>
                        <ThemedText className="">
                            Whether you're staying in hotels, motels, or camping
                            outdoors, make reservations ahead of time to avoid
                            last-minute hassles. Use apps like Airbnb and
                            Booking.com.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🍎 Pack Snacks & Drinks
                        </ThemedText>
                        <ThemedText className="">
                            Keep a stash of non-perishable snacks, bottled
                            water, and energy drinks. This keeps you refreshed
                            and saves money on unnecessary roadside food stops.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🔧 Perform a Vehicle Check
                        </ThemedText>
                        <ThemedText className="">
                            Inspect tires, brakes, engine oil, coolant levels,
                            wiper blades, and lights before starting your trip.
                            A well-maintained car prevents breakdowns and
                            accidents.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🏞️ Plan Fun Stops Along the Route
                        </ThemedText>
                        <ThemedText className="">
                            Don’t just drive straight to your destination—enjoy
                            scenic spots, landmarks, and attractions along the
                            way for a more memorable experience.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🛑 Take Breaks Every 2 Hours
                        </ThemedText>
                        <ThemedText className="">
                            Long hours of driving can lead to fatigue. Stop at
                            rest areas, stretch, and refresh yourself to stay
                            alert and energized throughout the trip.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            📶 Keep Your Devices Charged
                        </ThemedText>
                        <ThemedText className="">
                            Carry a car charger, power bank, and extra cables to
                            keep your phone, GPS, and other devices powered up.
                            Staying connected is essential in case of
                            emergencies.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🏥 Carry a First Aid Kit
                        </ThemedText>
                        <ThemedText className="">
                            Be prepared for minor injuries by packing a first
                            aid kit with bandages, antiseptics, pain relievers,
                            and any necessary medications.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🎶 Create a Road Trip Playlist
                        </ThemedText>
                        <ThemedText className="">
                            Keep the mood lively by preparing a playlist of your
                            favorite songs, audiobooks, or podcasts to enjoy
                            while driving.
                        </ThemedText>
                    </View>
                </View>

                {/* Emergency Button */}

                <ThemedButton
                    title=" 🚨 Call Roadside Assistance
                       "
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoadTrip;
