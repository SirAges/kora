import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { intro } from "@/lib/data";
const Intro = () => {
    const backgroundColor = useThemeColor({}, "background");
    const card = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");
    const [idx, setIdx] = useState<number>(0);
    const onPressContinue = () => {
        if (idx === intro.length - 1) {
            router.replace("(root)");
        }
        setIdx(prev => (prev < intro.length - 1 ? prev + 1 : prev));
    };
    const onPressSkip = () => {
        router.replace("(root)");
    };
    return (
        <View style={{ backgroundColor }} className="flex-1">
            {intro.map(
                ({ id, image, title, description }, i) =>
                    idx === i && (
                        <View className="flex-1" key={id}>
                            <View
                                className="h-3/5 w-full items-center
                            rounded-b-3xl"
                            >
                                <Image
                                    className="w-full h-full rounded-b-3xl"
                                    source={{ uri: image }}
                                    cachePolicy="disk-memory"
                                    alt={title}
                                />
                            </View>
                            <View
                                className="px-2 py-4 h-2/5 
"
                            >
                                <View className="flex-1 py-2 px-2">
                                    <ThemedText
                                        className="text-center"
                                        type="title"
                                    >
                                        {title}
                                    </ThemedText>
                                    <ThemedText
                                        className="text-center"
                                        type="subtitle"
                                    >
                                        {description}
                                    </ThemedText>
                                </View>
                                <View className="flex-row gap-2 w-full py-4">
                                    {idx < intro.length - 1 && (
                                        <ThemedButton
                                            textStyle={{ color: "white" }}
                                            title="skip"
                                            onPress={onPressSkip}
                                        />
                                    )}
                                    <ThemedButton
                                        textStyle={{ color: "white" }}
                                        title={
                                            idx === intro.length - 1
                                                ? "let's get started"
                                                : "continue"
                                        }
                                        onPress={onPressContinue}
                                    />
                                </View>
                                <View
                                    className=" flex-row justify-center
                                space-x-2"
                                >
                                    {Array.from(
                                        { length: intro.length },
                                        (_, index) => (
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        idx === index
                                                            ? iconColor
                                                            : card,
                                                    width:
                                                        idx === index ? 20 : 8
                                                }}
                                                key={index}
                                                className="h-2
                                                rounded-full"
                                            />
                                        )
                                    )}
                                </View>
                            </View>
                        </View>
                    )
            )}
        </View>
    );
};

export default Intro;
