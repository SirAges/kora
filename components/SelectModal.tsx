import React, { useState } from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    GestureResponderEvent,
    ScrollView,
    FlatList,
    Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProviderDetails from "@/components/ProviderDetails";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { Image } from "expo-image";

const SelectModal = ({ data, selected, field, children }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const color = useThemeColor({}, "text");
    return (
        <>
            <TouchableOpacity
                style={{ backgroundColor }}
                onPress={() => setShowModal(true)}
                className="flex-row items-center border-b border-gray-100 space-x-2 justify-between"
            >
                {children}
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={iconColor}
                />
            </TouchableOpacity>

            <Modal
                // transparent
                statusBarTranslucent={true}
                presentationStyle={"formSheet"}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <SafeAreaView>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <RenderItem item={item} field={field} />
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default SelectModal;
const RenderItem = ({ item, field }) => {
    console.log("item", item);
    const { name, description, image } = item;
    switch (field) {
        case "promo_code":
            return (
                <View
                    className="flex-row items-center px-2 py-2 rounded-md border
                border-gray-100 flex-1 mb-2 mx-2"
                >
                    <Image
                        className="w-7 h-7 rounded-full"
                        source={image}
                        contentFit="contain"
                    />
                    <View className="flex-1 pl-2">
                        <ThemedText className="font-semibold capitalize">
                            {name}
                        </ThemedText>
                        <ThemedText className="text-justify">
                            {description}
                        </ThemedText>
                    </View>
                </View>
            );
        case "payment_method":
            return <Text>{field}</Text>;
        case "driver":
            return <ProviderDetails user_id={item} />;
        default:
            return null;
    }
};
