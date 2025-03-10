import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from "@react-navigation/native";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./api/store";
import { View, Text, useColorScheme } from "react-native";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

import { GestureHandlerRootView } from "react-native-gesture-handler";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const toastConfig = {
    toast: ({ text1, props, text2 }: ToastConfigParams<any>) => (
        <View className="items-center justify-center w-full px-2 h-screen">
            <View
                className="w-full min-h-[200px] items-center justify-center
            rounded-lg relative bg-white shadow-md shadow-black space-y-4"
            >
                <ThemedView
                    
                    className="absolute top-4
                right-4 z-50 py-2 px-2 rounded-full"
                >
                    <MaterialCommunityIcons
                        onPress={() => Toast.hide()}
                        name="close"
                        size={24}
                        color={"#00a8e1"}
                    />
                </ThemedView>
                <View>
                    <MaterialCommunityIcons
                        name="bell-alert-outline"
                        size={60}
                        color={"#1BA7FF"}
                    />
                </View>
                <View className=" items-center space-y-4">
                    {text1 && (
                        <ThemedText
                            className="font-semibold text-xl capitalize
                            text-center
                        w-full"
                        >
                            {text1}
                        </ThemedText>
                    )}
                    {text2 && (
                        <ThemedText className="text-center">{text2}</ThemedText>
                    )}
                </View>
            </View>
        </View>
    )
};
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <GestureHandlerRootView>
                        <View className="z-50 absolute  w-full">
                            <Toast
                                config={toastConfig}
                                position="top"
                                topOffset={40}
                            />
                        </View>
                        <Slot />
                        <StatusBar style="auto" />
                    </GestureHandlerRootView>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}
