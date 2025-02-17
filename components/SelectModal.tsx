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
            <ProviderDetails user_id={"driver1id"}  />
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </Modal>
        </>
    );
};

export default SelectModal;

const renderItem = ({ item }) => {
    return <Text>driver</Text>;
};
