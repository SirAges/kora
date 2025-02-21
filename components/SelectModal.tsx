import React, { Dispatch, SetStateAction, useState } from "react";
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
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const color = useThemeColor({}, "text");

    const modal_tilte = field.replace("_", " ");
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
            <RenderSelected selected={selected} data={data} field={field} />
            <Modal
                // transparent
                statusBarTranslucent={true}
                presentationStyle={"formSheet"}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <SafeAreaView>
                    <View className="px-2 py-2 flex-row items-center justify-between">
                        <MaterialCommunityIcons
                            name="chevron-left"
                            size={32}
                            color={iconColor}
                            onPress={() => setShowModal(false)}
                        />
                        <ThemedText className="font-semibold capitalize text-lg flex-1 text-center">
                            {modal_tilte}
                        </ThemedText>
                    </View>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <RenderItem
                                item={item}
                                field={field}
                                setShowModal={setShowModal}
                            />
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default SelectModal;
const RenderSelected = ({
    selected,
    data,
    field
}: {
    item: any;
    field: string;
}) => {
    const item = data.find(({ slug }) => slug === selected);
    if (field === "driver") {
        return <ProviderDetails user_id={selected} onPress={undefined} />;
    }

    return (
        item && (
            <View className="flex-row items-center  py-2  flex-1">
                <Image
                    className="w-7 h-7 rounded-full"
                    source={item?.image}
                    contentFit="contain"
                />
                <View className="flex-1 pl-2">
                    <ThemedText className="font-bold text-md capitalize">
                        {item?.name}
                    </ThemedText>
                    <ThemedText className="text-justify">
                        {item?.description}
                    </ThemedText>
                </View>
            </View>
        )
    );
};
const RenderItem = ({
    item,
    field,
    setShowModal
}: {
    item: any;
    field: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    // console.log("item", item);
    const dispatch = useDispatch();
    const { slug, name, description, image } = item;
    const onPress = () => {
        dispatch(addToBooking({ [field]: slug || item }));
        setShowModal(false);
    };

    switch (field) {
        case "promo_code":
            return (
                <TouchableOpacity
                    onPress={onPress}
                    className="flex-row items-center px-2 py-2 rounded-md border
                border-gray-100 flex-1 mb-2 mx-2"
                >
                    <Image
                        className="w-10 h-10 rounded"
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
                </TouchableOpacity>
            );
        case "payment_method":
            return (
                <TouchableOpacity
                    onPress={onPress}
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
                </TouchableOpacity>
            );
        case "driver":
            return <ProviderDetails user_id={item} onPress={onPress} />;
        default:
            return null;
    }
};
function setShowModal(arg0: boolean) {
    throw new Error("Function not implemented.");
}
