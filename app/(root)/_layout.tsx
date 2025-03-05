import { usePathname, Redirect } from "expo-router";

import { Tabs } from "expo-router";
import { View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import * as Device from "expo-device";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useUpdateUserMutation } from "@/redux/user/userApiSlice";
export default function Layout() {
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    const pathname = usePathname();
    const primary = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "background");
    const card = useThemeColor({}, "card");
    const [deviceInfo, setDeviceInfo] = useState(null);
    const { isSignedIn, userId, isOnboarded } = useAuth();
    if (!isOnboarded && isSignedIn) return <Redirect href="(onboard)" />;
    if (!isSignedIn) return <Redirect href="(auth)" />;
    useEffect(() => {
        const getDeviceDetails = async () => {
            await updateUser({
                user_id: userId,
                value: {
                    connected_devices: [
                        {
                            device_id: Device.osName,
                            brand: Device.brand,
                            device_name: Device.deviceName,
                            model_name: Device.modelName,
                            os_version: Device.osVersion,
                            device_type: Device.DeviceType[Device.deviceType]
                        }
                    ]
                }
            });
        };

        getDeviceDetails();
    }, []);
    return (
        <Tabs
            detachInactiveScreens
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: pathname.endsWith("/player") ? "none" : "flex",
                    borderTopRightRadius: 5,
                    borderTopLeftRadius: 5,
                    paddingTop: 10,
                    borderTopWidth: 0,
                    backgroundColor
                },
                headerShown: false,
                tabBarActiveTintColor: primary
            }}
        >
            <Tabs.Screen redirect name="index" />
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name={"home-outline"}
                            size={24}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="(cars)"
                options={{
                    title: "Cars",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name="car-sports"
                            size={24}
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="(drivers)"
                options={{
                    title: "Drivers",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name="steering"
                            size={24}
                            color={color}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="(bookings)"
                options={{
                    title: "Bookings",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="payment" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons
                            name="account-outline"
                            size={24}
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    );
}
