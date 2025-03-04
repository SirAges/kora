import { useState, useEffect } from "react";
import { View } from "react-native";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";

const Alert = ({ title = "Loading", message = "please wait..." }) => {
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const [showModal, setShowModal] = useState(true);
    // Shared values for rotation and scaling
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    // Animate rotation continuously
    useEffect(() => {
        scale.value = withRepeat(
            withSequence(
                withTiming(1.3, { duration: 700 }),
                withTiming(1, { duration: 700 })
            ),
            -1
        );
    }, []);

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <ThemedModal
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View
                className="w-full py-10 px-3 items-center justify-center
            relative"
            >
                <View
                    style={{ backgroundColor: card }}
                    className="absolute top-4
                right-4 z-50 py-2 px-2 rounded-full"
                >
                    <MaterialCommunityIcons
                        onPress={() => setShowModal(false)}
                        name="close"
                        size={24}
                        color={iconColor}
                    />
                </View>
                <Animated.View style={animatedStyle}>
                    <MaterialCommunityIcons
                        name="bell-alert-outline"
                        size={60}
                        color={iconColor}
                    />
                </Animated.View>
                <View className="space-y-2 py-4 items-center">
                    {title && (
                        <ThemedText
                            className="font-semibold text-xl capitalize
                            text-center
                        w-full"
                        >
                            {title}
                        </ThemedText>
                    )}
                    {message && (
                        <ThemedText className="text-center">
                            {message}
                        </ThemedText>
                    )}
                </View>
            </View>
        </ThemedModal>
    );
};

export default Alert;
