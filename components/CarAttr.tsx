import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "@/components/ThemedText";
import { View, Text, TouchableOpacity } from "react-native";
const CarAttr = ({ icon, name, data }) => {
    const iconColor = useThemeColor({}, "icon");
    return (
        <View className="flex-row items-center px-2 py-1">
            <MaterialCommunityIcons name={icon} size={16} color={iconColor} />
            <ThemedText className="capitalize">{data}</ThemedText>
        </View>
    );
};

export default CarAttr;
