import { Slot, Stack, Redirect } from "expo-router";
import useAuth from "@/hooks/useAuth";

export default function RootLayout() {
    const { isSignedIn, isOnboarded } = useAuth();
    if (!isOnboarded&&isSignedIn) return <Redirect href="(onboard)" />;
    if (isSignedIn) return <Redirect href="(root)" />;

    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="forgot" />
            <Stack.Screen name="policy" />
            <Stack.Screen name="reset-password" />
        </Stack>
    );
}
