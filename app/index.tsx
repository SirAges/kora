import { Alert, View } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";
import { router } from "expo-router";
import useAuth from "@/hooks/useAuth";
import { useThemeColor } from "@/hooks/useThemeColor";
export default function Index() {
    const backgroundColor = useThemeColor({}, "background");
    const card = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");
    const { isSignedIn, fingerprint } = useAuth();
    const fingerprintAuth = async () => {
        if (fingerprint && isSignedIn) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with fingerprint",
                fallbackLabel: "Use PIN or password"
            });
            if (result.success) {
                router.replace("intro");
            }
        } else {
            setTimeout(() => {
                router.replace("intro");
            }, 2000);
        }
    };

    useEffect(() => {
        fingerprintAuth();
        return () => {};
    }, []);

    return (
        <View
            className="flex-1 items-center justify-center"
            style={{
                backgroundColor
            }}
        >
            <Image
                source={require("@/assets/images/icon.png")}
                alt="icon"
                className="w-44 h-44"
            />
            <ThemedText
                type="semibold"
                className="text-2xl tracking-widest
            uppercase w-full text-center"
            >
                kora
            </ThemedText>
        </View>
    );
}
