import { Image, Alert } from "react-native";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect } from "react";
import { router } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function Index() {
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
          setTimeout(()=>{router.replace("intro");},2000)
            
        }
    };

    useEffect(() => {
        fingerprintAuth();
        return () => {};
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
