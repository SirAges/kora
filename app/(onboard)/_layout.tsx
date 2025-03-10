import { Redirect, Stack } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function RootLayout() {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) return <Redirect href="sign-in" />;
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboard" />
        </Stack>
    );
}
