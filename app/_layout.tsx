import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from "@react-navigation/native";
import Toast, { ToastConfigParams } from "react-native-toast-message";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./api/store";
import { useColorScheme, View, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
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
    const toastConfig = {
        toast: ({ text1, props, text2 }: ToastConfigParams<any>) => (
            <View className="w-full px-2 py-2">
                <View
                   
                    className="bg-white shadow-md min-h-[70px] shadow-black rounded-md
                 flex-row items-center"
                >
                    <View
                        style={{
                            backgroundColor:
                                props?.name === "success"
                                    ? "#22bb33"
                                    : props?.name === "warn"
                                    ? "#f0ad4e"
                                    : props?.name === "error"
                                    ? "#bb2124"
                                    : props?.name === "info"
                                    ? "#5bc0de"
                                    : "#aaaaaa"
                        }}
                        className="h-full w-2 rounded-l-md"
                    />
                    <View className="flex-1 px-2 py-2 h-full">
                        <Text className="font-semibold text-xs opacity-80">
                            {text1}
                        </Text>
                        <Text className="opacity-70">{text2}</Text>
                    </View>
                </View>
            </View>
        )
    };
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <GestureHandlerRootView>
                        <View className="z-50 absolute top-0 w-full">
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
