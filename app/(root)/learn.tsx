import { View, ScrollView, TouchableOpacity } from "react-native";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useThemeColor } from "@/hooks/useThemeColor";

const Learn = () => {
    const backgroundColor = useThemeColor({}, "background");
    const card = useThemeColor({}, "card");
    const borderColor = useThemeColor({}, "border");
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
                <ThemedText type="title" className="text-2xl font-bold">
                    🚦 Safety & Smart Driving
                </ThemedText>
                <ThemedText className="text-lg  mt-2">
                    Stay alert, stay cautious, and ensure every journey is a
                    safe one. Follow these essential driving tips to protect
                    yourself and others.
                </ThemedText>
                {/* Safety Tips */}
                <View className="mt-5 space-y-6">
                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🔍 Inspect the Car Before Driving
                        </ThemedText>
                        <ThemedText className="">
                            Before starting your trip, conduct a thorough
                            vehicle check. Inspect the brakes, tire pressure,
                            fuel level, and lights to ensure they are
                            functioning properly. Look for any leaks, unusual
                            noises, or warning lights on the dashboard. Regular
                            inspections can prevent unexpected breakdowns.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🪪 Verify Driver Credentials
                        </ThemedText>
                        <ThemedText className="">
                            If you're hiring a driver, ensure they have a valid
                            driver’s license, proper insurance, and a good
                            driving history. A qualified and responsible driver
                            ensures a safe and smooth trip.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🛑 Wear Your Seatbelt
                        </ThemedText>
                        <ThemedText className="">
                            A seatbelt can be the difference between life and
                            death in an accident. Always buckle up before
                            starting the engine. Ensure all passengers,
                            including those in the back seat, are wearing
                            seatbelts.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            ☎️ Know Emergency Contacts
                        </ThemedText>
                        <ThemedText className="">
                            Have emergency numbers saved in your phone,
                            including roadside assistance, police, and your car
                            rental company. Being prepared ensures you can
                            quickly get help if needed.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🌙 Avoid Late-Night Driving
                        </ThemedText>
                        <ThemedText className="">
                            Driving late at night increases risks due to reduced
                            visibility, fatigue, and potential road hazards.
                            Stick to well-lit roads, avoid isolated areas, and
                            always lock your doors when stopping.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            😴 Don’t Drive While Tired
                        </ThemedText>
                        <ThemedText className="">
                            Fatigue slows reaction time and impairs judgment. If
                            you feel drowsy, pull over and take a break. On long
                            trips, rest every 2 hours, and if possible, switch
                            drivers.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🔐 Keep Valuables Secure
                        </ThemedText>
                        <ThemedText className="">
                            Always keep wallets, phones, and bags hidden when
                            leaving your vehicle. Park in secure locations, and
                            never leave important items in plain sight.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            📍 Share Your Trip Details
                        </ThemedText>
                        <ThemedText className="">
                            Let a friend or family member know your planned
                            route, especially when traveling alone. This ensures
                            someone can track your safety if needed.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            ⛽ Check Fuel & Plan Routes
                        </ThemedText>
                        <ThemedText className="">
                            Running out of fuel in an unfamiliar place can be
                            dangerous. Always keep your tank at least half full,
                            and use navigation apps to plan your route and
                            locate gas stations.
                        </ThemedText>
                    </View>

                    <View
                        style={{ borderColor }}
                        className="border  rounded-md px-3 py-3"
                    >
                        <ThemedText className="text-lg font-bold">
                            🚔 Report Unsafe Situations
                        </ThemedText>
                        <ThemedText className="">
                            If you notice suspicious behavior, reckless driving,
                            or any safety concerns, report them immediately.
                            Whether it’s to law enforcement or a car rental
                            service, speaking up can prevent accidents.
                        </ThemedText>
                    </View>
                </View>
                {/* Emergency Button */}
                <ThemedButton title="🚨 Call Emergency" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Learn;
