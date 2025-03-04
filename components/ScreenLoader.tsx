import React from "react";
import { View } from "react-native";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import Fontisto from "@expo/vector-icons/Fontisto";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";

const ScreenLoader = ({ title = "Loading", message = "please wait..." }) => {
    const iconColor = useThemeColor({}, "icon");

    // Shared values for rotation and scaling
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    // Animate rotation continuously
    React.useEffect(() => {
        rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);

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
        transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }]
    }));

    return (
        <ThemedModal visible={true} onRequestClose={() => undefined}>
            <View className="w-full py-10 px-3 items-center justify-center">
                <Animated.View style={animatedStyle}>
                    <Fontisto name="spinner" size={50} color={iconColor} />
                </Animated.View>
                <View className="space-y-2 py-4 items-center">
                    {title && (
                        <ThemedText className="font-semibold capitalize">
                            {title}
                        </ThemedText>
                    )}
                    {message && <ThemedText>{message}</ThemedText>}
                </View>
            </View>
        </ThemedModal>
    );
};

export default ScreenLoader;
