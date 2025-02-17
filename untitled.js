import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import Svg, { Path } from "react-native-svg";

const Intro = () => {
    const [idx, setIdx] = useState<number>(0);

    return (
        <ThemedView style={{ flex: 1 }}>
            {Array.from({ length: 3 }, (_, i) =>
                idx === i ? (
                    <ThemedView
                        key={i}
                        style={{
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        {/* Top Image Section */}
                        <View style={{ position: "relative" }}>
                            <Image
                                source={{
                                    uri: "https://via.placeholder.com/400x300"
                                }}
                                style={{ width: "100%", height: 300 }}
                                resizeMode="cover"
                            />
                            {/* Inward Curve */}
                            <Svg
                                height="100%"
                                width="100%"
                                viewBox="0 0 400 80"
                                style={{ position: "absolute", bottom: -1 }}
                            >
                                <Path
                                    d="M0,0 C150,100 250,100 400,0 L400,80 L0,80 Z"
                                    fill="#FFFFFF"
                                />
                            </Svg>
                        </View>

                        {/* Bottom Content */}
                        <View style={{ padding: 20, alignItems: "center" }}>
                            <ThemedText
                                style={{ fontSize: 24, fontWeight: "bold" }}
                            >
                                Hello {i + 1}
                            </ThemedText>
                            <ThemedText>
                                This is page {i + 1} of your introduction
                                screens.
                            </ThemedText>
                        </View>

                        {/* Dot Indicators */}
                        <View
                            style={{
                                position: "absolute",
                                bottom: 20,
                                flexDirection: "row",
                                zIndex: 50
                            }}
                        >
                            {Array.from({ length: 3 }, (_, j) => (
                                <TouchableOpacity
                                    key={j}
                                    onPress={() => setIdx(j)}
                                >
                                    <View
                                        style={{
                                            width: idx === j ? 16 : 8,
                                            height: 8,
                                            margin: 5,
                                            backgroundColor:
                                                idx === j
                                                    ? "#1BA7FF"
                                                    : "#bababa",
                                            borderRadius: 50
                                        }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ThemedView>
                ) : null
            )}
        </ThemedView>
    );
};

export default Intro;
