import { Slot, Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="[car]" />
            <Stack.Screen name="rent_a_car" />
            <Stack.Screen name="list-car" />
            <Stack.Screen name="promo" />
      
        </Stack>
    );
}
