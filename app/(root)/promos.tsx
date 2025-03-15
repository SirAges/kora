import { filterPromoCodes } from "@/lib/utils";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import GoBack from "@/components/GoBack";
import ThemedButton from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useNavigation } from "@react-navigation/native";

const Promos = () => {
    const navigation = useNavigation();
    const primary = useThemeColor({}, "primary");
    const card = useThemeColor({}, "card");
    const backgroundColor = useThemeColor({}, "background");
    const border = useThemeColor({}, "border");
    const dispatch = useDispatch();
    const { promo_code } = useSelector(selectCurrentBooking);
    const [promos, setPromos] = useState([]);
    useEffect(() => {
        setPromos(filterPromoCodes({}));
        return () => {};
    }, []);

    const applyOffer = (slug: string, percentage: number) => {
        dispatch(addToBooking({ promo_code: { slug, percentage } }));
    };

    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1 py-2">
            {/* Header with Back Button */}
            <View className="flex-row items-center mb-4 px-4">
                <GoBack />
                <ThemedText className="text-xl font-bold ml-2">
                    Available Offers 🎁
                </ThemedText>
            </View>

            {/* Intro Text */}
            <View className="px-4 mb-4">
                <ThemedText className="">
                    Save more on your rides! Browse through the latest offers
                    and apply discounts to your bookings.
                </ThemedText>
            </View>

            {/* Promo List */}
            <FlatList
                data={promos}
                keyExtractor={item => item.slug}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        style={{ backgroundColor: card }}
                        className="p-4 rounded-lg shadow-md mb-4 mx-4"
                    >
                        {/* Offer Image */}
                        <Image
                            source={item.image}
                            className="w-full h-48 rounded-md"
                        />

                        {/* Offer Details */}
                        <ThemedText className="text-xl font-bold mt-3">
                            {item.name}
                        </ThemedText>
                        <ThemedText className="">{item.description}</ThemedText>

                        {/* Apply Button */}
                        <ThemedButton
                            onPress={() =>
                                applyOffer(item.slug, item.percentage)
                            }
                            title="Apply Offer"
                        />
                    </View>
                )}
            />

            {/* Display Applied Offer */}
            {promo_code && (
                <View
                    style={{ borderColor: border, backgroundColor: card }}
                    className="mt-4 p-3 border rounded-md mx-4"
                >
                    <ThemedText className="font-bold">
                        ✅ Offer Applied:
                    </ThemedText>
                    <ThemedText className="">
                        🔖 {promo_code.slug.replace(/-/g, " ")}
                    </ThemedText>
                    <ThemedText className="">
                        💰 Discount: {promo_code.percentage}%
                    </ThemedText>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Promos;
