import { Image, Alert } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { useEffect } from "react";
import { router } from "expo-router";
export default function Index() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace("intro");
        }, 4000);
    }, []);
    return (
        <ThemedView
            lightColor="#1BA7FF"
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20
            }}
        >
            <Image
                style={{ width: 72, height: 72, resizeMode: "contain" }}
                source={require("@/assets/images/icon.png")}
                alt="icon"
            />
            <ThemedText style={{ letterSpace: 20 }} type="semibold">
                kora
            </ThemedText>
        </ThemedView>
    );
}
