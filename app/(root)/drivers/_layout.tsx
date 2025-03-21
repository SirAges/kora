import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen index name="index" />
            <Stack.Screen name="[driver]" />
        </Stack>
    );
}
