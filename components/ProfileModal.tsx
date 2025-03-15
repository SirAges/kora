import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    GestureResponderEvent,
    ScrollView,
    FlatList,
    Switch,
    Text,
    Button,
    TextInput
} from "react-native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as LocalAuthentication from "expo-local-authentication";
import { useSelector, useDispatch } from "react-redux";
import * as FilePickerExpo from "expo-document-picker";
import FileViewer from "./FileViewer";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { selectCurrentBooking, addToBooking } from "@/redux/globalSlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import ProviderDetails from "@/components/ProviderDetails";
import GAuthModal from "@/components/GAuthModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import Input from "@/components/Input";
import ThemedModal from "@/components/ThemedModal";
import Alert from "@/components/Alert";
import ScreenLoader from "@/components/ScreenLoader";
import { Image } from "expo-image";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
    useUpdateUserMutation,
    useGenerate2FaMutation,
    useRemoveConnectedDeviceMutation
} from "@/redux/user/userApiSlice";
import { setEmail } from "@/redux/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { persistor } from "@/app/api/store"; // Adjust if necessary
import { FontAwesome } from "@expo/vector-icons"; // For icons
import countries from "@/lib/countries";
import { toastMessage } from "@/lib/utils";
import { paymentMethods, reportIssues, faqs } from "@/lib/data";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/app/_layout";
const ProfileModal = ({ showModal, setShowModal, option, user }) => {
    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");
    const card = useThemeColor({}, "card");
    const color = useThemeColor({}, "text");
    let content;
    switch (option) {
        case "profile":
            content = <RenderProfile user={user} />;
            break;
        case "preference":
            content = <RenderPreference user={user} />;
            break;
        case "notification":
            content = <RenderNotification user={user} />;
            break;
        case "security":
            content = <RenderSecurity user={user} />;
            break;
        case "payment":
            content = <RenderPayment user={user} />;
            break;
        case "appearance":
            content = <RenderAppearance user={user} />;
            break;
        case "help":
            content = <RenderHelp />;
            break;
        case "rate":
            content = <RenderRate />;
            break;
        default:
    }
    return (
        <>
            <Modal
                // transparent
                statusBarTranslucent={true}
                presentationStyle={"formSheet"}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View className="z-50 absolute top-0 w-full">
                    <Toast
                        config={toastConfig}
                        position="top"
                        // topOffset={40}
                    />
                </View>
                <SafeAreaView
                    style={{ backgroundColor }}
                    className="flex-1 px-2 py-2"
                >
                    <View className="flex-row items-center justify-between">
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={iconColor}
                        />
                        <ThemedText
                            className="text-lg font-semibold px-4 capitalize
                         flex-1"
                        >
                            {option}
                        </ThemedText>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {content}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default ProfileModal;

const RenderProfile = ({ user, onUpdate }) => {
    const iconColor = useThemeColor({}, "icon");
    const [pickedFiles, setPickedFiles] = useState<any[]>([]);
    const [showImage, setShowImage] = useState<any[]>(false);

    const card = useThemeColor({}, "card");
    const borderColor = useThemeColor({}, "border");
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    // Fields that cannot be edited
    const uneditable = [
        "wallet_balance",
        "user_type",
        "subscription.name",
        "driver_status",
        "roles",
        "subscription.start_date",
        "isVerified",
        "verification_status",
        "email",
        "country"
    ];

    const groupedData = [
        {
            title: "Personal Information",
            data: [
                {
                    key: "first_name",
                    label: "First Name",
                    value: user.first_name
                },
                { key: "last_name", label: "Last Name", value: user.last_name },
                { key: "email", label: "Email", value: user.email },
                { key: "phone", label: "Phone Number", value: user.phone }
            ]
        },
        {
            title: "Location",
            data: [
                { key: "address", label: "Address", value: user.address },
                { key: "state", label: "State", value: user.state },
                { key: "country", label: "Country", value: user.country }
            ]
        },
        {
            title: "Account Details",
            data: [
                {
                    key: "user_type",
                    label: "Account Type",
                    value: user.user_type
                },
                { key: "roles", label: "Roles", value: user.roles.join(", ") },
                {
                    key: "driver_status",
                    label: "Driver Status",
                    value: user.driver_status
                },
                {
                    key: "wallet_balance",
                    label: "Wallet Balance",
                    value: `₦${user.wallet_balance}`
                }
            ]
        },
        {
            title: "Subscription",
            data: [
                {
                    key: "subscription.name",
                    label: "Plan",
                    value: user.subscription?.name
                },
                {
                    key: "subscription.start_date",
                    label: "Start Date",
                    value: new Date(
                        user.subscription?.start_date
                    ).toLocaleDateString()
                }
            ]
        },
        {
            title: "Verification",
            data: [
                {
                    key: "isVerified",
                    label: "Email Verified",
                    value: user.isVerified ? "Yes" : "No"
                },
                {
                    key: "verification_status",
                    label: "Status",
                    value: user.verification_status
                }
            ]
        }
    ];

    const onPressPictureEdit = async () => {
        const { assets, canceled } = await FilePickerExpo.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: true
        });
        if (canceled || !assets || !assets.length) {
            console.log("canceled file picking");
            return;
        }
        const { uri, mimeType, size } = assets[0];
        if (size / 1000000 > 1) {
            toastMessage("file too large", "info");
            return;
        }
        const base = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64
        });

        const base64 = `data:${mimeType || "image/jpeg"};base64,${base}`;
        const { data, error } = await updateUser({
            user_id: user._id,
            value: { profile_image: base64 }
        });

        setPickedFiles(assets);
    };
    const handleEdit = (key, value) => {
        setEditing(key);
        setEditValue(value);
    };

    const handleSave = async key => {
        if (editValue.trim() !== "") {
            const { data, error } = await updateUser({
                user_id: user._id,
                value: { [key]: editValue }
            });
        }
        setEditing(null);
    };

    return (
        <View className="items-center">
            {/* Profile Image */}
            <View
                style={{ borderColor }}
                className="items-center rounded-full p-1 border relative"
            >
                <TouchableOpacity onPress={() => setShowImage(true)}>
                    <Image
                        className="w-24 h-24 rounded-full"
                        source={{ uri: user.profile_image?.secure_url }}
                        alt="Profile Image"
                    />
                </TouchableOpacity>
                <View
                    style={{ backgroundColor: card, borderColor }}
                    className="absolute z-50 bottom-4 right-4 rounded-full
                border p-1
                "
                >
                    <MaterialCommunityIcons
                        onPress={onPressPictureEdit}
                        name="pen"
                        size={16}
                        color={iconColor}
                    />
                </View>
            </View>

            {/* Render grouped data */}
            {groupedData.map(({ title, data }, index) => (
                <View
                    style={{ borderColor }}
                    key={index}
                    className="mt-4 w-full px-4 border rounded-md px-2 py-2"
                >
                    <ThemedText className="font-bold text-lg mb-2">
                        {title}
                    </ThemedText>
                    {data.map(
                        ({ key, label, value }) =>
                            value !== undefined && (
                                <View
                                    key={key}
                                    className="flex-row justify-between
                                    items-center py-2"
                                >
                                    <ThemedText className="font-semibold">
                                        {label}
                                    </ThemedText>

                                    {editing === key ? (
                                        <View
                                            style={{ borderColor }}
                                            className="flex-row items-center border rounded-md  px-2 h-10 w-36"
                                        >
                                            <Input
                                                className="rounded flex-1"
                                                value={editValue}
                                                onChangeText={setEditValue}
                                                autoFocus
                                            />
                                            <TouchableOpacity
                                                onPress={() => handleSave(key)}
                                                className="ml-2"
                                            >
                                                <FontAwesome
                                                    name="save"
                                                    size={16}
                                                    color={iconColor}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View className="flex-row items-center">
                                            <ThemedText>{value}</ThemedText>

                                            {/* Show edit icon only if the field is not in the uneditable list */}
                                            {!uneditable.includes(key) && (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleEdit(key, value)
                                                    }
                                                    className="ml-2"
                                                >
                                                    <MaterialCommunityIcons
                                                        name="pen"
                                                        size={16}
                                                        color={iconColor}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )
                    )}
                </View>
            ))}

            <ThemedModal
                visible={showImage}
                onRequestClose={() => setShowImage(false)}
            >
                <View className=" w-full h-full relative">
                    <View
                        style={{ backgroundColor: card + 60 }}
                        className="absolute rounded-full p-4 flex-row
                        items-center justify-center
                    z-50 top-4 right-4"
                    >
                        <MaterialCommunityIcons
                            onPress={() => setShowImage(false)}
                            color={iconColor}
                            name="close"
                            size={24}
                        />
                    </View>

                    <Image
                        className="w-full flex-1 rounded-lg"
                        source={{ uri: user?.profile_image?.secure_url }}
                        contentFit="cover"
                    />
                </View>
            </ThemedModal>
            {(data?.success || data?.error) && (
                <Alert
                    title={data?.success ? "Successfull" : "An error occured"}
                    message={data?.message}
                />
            )}

            {isLoading && (
                <ScreenLoader
                    title="making update"
                    messages="please
            wait..."
                />
            )}
        </View>
    );
};
const RenderPreference = ({ user }) => {
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    const [cache, setCache] = useState("0.00");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const iconColor = useThemeColor({}, "icon");
    const borderColor = useThemeColor({}, "border");
    // Predefined lists with descriptive names and slug values
    const units = [
        { label: "Metric (Meters, Kilograms, Celsius)", value: "metric" },
        { label: "Imperial (Feet, Pounds, Fahrenheit)", value: "imperial" }
    ];

    const currencies = [
        { label: "US Dollar ($)", value: "usd" },
        { label: "Euro (€)", value: "eur" },
        { label: "British Pound (£)", value: "gbp" },
        { label: "Nigerian Naira (₦)", value: "ngn" },
        { label: "Japanese Yen (¥)", value: "jpy" },
        { label: "Canadian Dollar (C$)", value: "cad" }
    ];

    const temperatures = [
        { label: "Celsius (°C)", value: "celsius" },
        { label: "Fahrenheit (°F)", value: "fahrenheit" },
        { label: "Kelvin (K)", value: "kelvin" },
        { label: "Rankine (°R)", value: "rankine" },
        { label: "Delisle (°De)", value: "delisle" }
    ];

    const firstDayOfWeekOptions = [
        { label: "Sunday (Standard in the US)", value: "sunday" },
        { label: "Monday (ISO 8601 Standard)", value: "monday" },
        { label: "Saturday (Some Middle Eastern Countries)", value: "saturday" }
    ];

    const dateFormats = [
        { label: "DD/MM/YYYY (Day/Month/Year)", value: "dd-mm-yyyy" },
        { label: "MM/DD/YYYY (Month/Day/Year)", value: "mm-dd-yyyy" },
        { label: "YYYY-MM-DD (ISO Format)", value: "yyyy-mm-dd" }
    ];

    const onItemPress = (clicked, field, options) => {
        setSelectedItem({ title: clicked, field, options });
        setModalVisible(true);
    };

    const handleOptionSelect = async item => {
        const value =
            selectedItem?.field === "country"
                ? { [selectedItem?.field]: item.value }
                : { setting: { [selectedItem?.field]: item.value } };
        const { data, error } = await updateUser({
            user_id: user._id,
            value
        });
        setModalVisible(false);
    };

    useEffect(() => {
        const getTotalCacheSize = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const items = await AsyncStorage.multiGet(keys);
                let reduxSize = items.reduce(
                    (acc, [, value]) =>
                        acc + (value ? new Blob([value]).size : 0),
                    0
                );

                const cacheDir = FileSystem.cacheDirectory;
                const files = await FileSystem.readDirectoryAsync(cacheDir);
                let fileSize = 0;

                for (const file of files) {
                    const fileInfo = await FileSystem.getInfoAsync(
                        `${cacheDir}/${file}`
                    );
                    fileSize += fileInfo.exists ? fileInfo.size || 0 : 0;
                }

                setCache(
                    ((reduxSize + fileSize) / (1024 * 1024)).toFixed(2) + "MB"
                );
            } catch (error) {
                console.error("Error getting cache size:", error);
            }
        };

        getTotalCacheSize();
    }, []);
    const clearAllCache = async () => {
        try {
            // Clear Redux Persist
            await persistor.purge();
            await AsyncStorage.clear();

            // Clear File System Cache
            const cacheDir = FileSystem.cacheDirectory;
            const files = await FileSystem.readDirectoryAsync(cacheDir);
            await Promise.all(
                files.map(file =>
                    FileSystem.deleteAsync(cacheDir + file, {
                        idempotent: true
                    })
                )
            );
            setCache("0.00MB");
            console.log("Cache cleared successfully!");
        } catch (error) {
            console.error("Error clearing cache:", error);
        }
    };

    const RenderItem = ({ title, field, onPress }) => (
        <TouchableOpacity onPress={onPress}>
            <View className="flex-row items-center justify-between px-2 py-2 my-2">
                <ThemedText className="font-semibold text-lg capitalize">
                    {title}
                </ThemedText>
                <ThemedText className="text-[8px] font-semibold text-right flex-1 uppercase">
                    {field}
                </ThemedText>
                <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    color={iconColor}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <View
                style={{ borderColor }}
                className="px-2 py-2 rounded-md border  my-3"
            >
                <RenderItem
                    title="Country or Region"
                    field={user?.country}
                    onPress={() =>
                        onItemPress(
                            "Country or Region",
                            "country",
                            countries.map(({ name }) => ({
                                value: name,
                                label: name
                            }))
                        )
                    }
                />
                <RenderItem
                    title="Currency"
                    field={user?.setting?.currency}
                    onPress={() =>
                        onItemPress("Currency", "currency", currencies)
                    }
                />
                <RenderItem
                    title="Units"
                    field={user?.setting?.unit}
                    onPress={() => onItemPress("Units", "unit", units)}
                />
                <RenderItem
                    title="Temperature Scale"
                    field={user?.setting?.temperature}
                    onPress={() =>
                        onItemPress(
                            "Temperature Scale",
                            "temperature",
                            temperatures
                        )
                    }
                />
                <RenderItem
                    title="First Day of Week"
                    field={user?.setting?.fdow}
                    onPress={() =>
                        onItemPress(
                            "First Day of Week",
                            "fdow",
                            firstDayOfWeekOptions
                        )
                    }
                />
                <RenderItem
                    title="Date Format"
                    field={user?.setting?.date_format}
                    onPress={() =>
                        onItemPress("Date Format", "date_format", dateFormats)
                    }
                />
                <RenderItem
                    onPress={clearAllCache}
                    title="Clear Cache"
                    field={cache}
                />
            </View>
            {(data?.success || data?.error) && (
                <Alert
                    title={data?.success ? "Successfull" : "An error occured"}
                    message={data?.message}
                />
            )}

            {isLoading && (
                <ScreenLoader
                    title="onboarding you"
                    messages="please
            wait..."
                />
            )}
            {/* Modal */}
            <ThemedModal
                visible={modalVisible}
                position="bottom"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className=" max-h-full">
                    <ThemedText className="text-lg font-bold">
                        {selectedItem?.title}
                    </ThemedText>

                    <FlatList
                        data={selectedItem?.options}
                        keyExtractor={(item, index) => item.value + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="py-3 px-2 flex-row items-center justify-between"
                                onPress={() => handleOptionSelect(item)}
                            >
                                <ThemedText className="flex-1">
                                    {item.label}
                                </ThemedText>
                                <MaterialCommunityIcons
                                    name={
                                        item.value ===
                                        user?.setting?.[selectedItem?.field]
                                            ? "radiobox-marked"
                                            : "radiobox-blank"
                                    }
                                    size={20}
                                    color={iconColor}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ThemedModal>
        </View>
    );
};

const RenderNotification = ({ user }) => {
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    const iconColor = useThemeColor({}, "icon");
    const color = useThemeColor({}, "text");
    const card = useThemeColor({}, "card");
    const borderColor = useThemeColor({}, "border");
    const backgroundColor = useThemeColor({}, "background");

    const notificationSettings = [
        { label: "SMS", value: "sms" },
        { label: "Email", value: "email" },
        { label: "Push Notification", value: "push" },
        { label: "General Updates", value: "general_notifications" },
        { label: "Security Alerts", value: "security_alerts" },
        { label: "Account & Profile", value: "account_and_profile" },
        { label: "Rental Reminders", value: "rental_reminders" },
        { label: "Booking Updates", value: "booking_updates" },
        { label: "Insurance & Protection", value: "insurance_and_protection" },
        { label: "Payment Alerts", value: "payment_notifications" },
        { label: "Driver Messages", value: "driver_communication" },
        { label: "Reviews & Feedback", value: "user_reviews_feedback" },
        { label: "Promos & Offers", value: "promotions_offers" },
        { label: "Surveys & Requests", value: "survey_feedback_requests" },
        { label: "Announcements", value: "important_announcements" },
        { label: "Tips & Tutorials", value: "app_tips_tutorials" }
    ];

    const onSwitchChange = async (value, key) => {
        await updateUser({
            user_id: user._id,
            value: { notification_preferences: { [key]: value } }
        });
    };
    return (
        <View
            style={{ borderColor }}
            className="rounded-md border  px-2 py-2 my-3"
        >
            <FlatList
                data={notificationSettings}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View className="flex-row items-center justify-between">
                        <ThemedText className="capitalize font-semibold">
                            {item.label}
                        </ThemedText>
                        <Switch
                            trackColor={{
                                false: color + 70,
                                true: iconColor + 70
                            }}
                            thumbColor={
                                (user?.notification_preferences || {})[
                                    item?.value
                                ]
                                    ? iconColor
                                    : color
                            }
                            ios_backgroundColor={card}
                            onValueChange={value =>
                                onSwitchChange(value, item?.value)
                            }
                            value={
                                (user?.notification_preferences || {})[
                                    item?.value
                                ]
                            }
                        />
                    </View>
                )}
            />

            {(data?.success || data?.error) && (
                <Alert
                    title={data?.success ? "Successfull" : "An error occured"}
                    message={data?.message}
                />
            )}

            {isLoading && (
                <ScreenLoader
                    title="making update"
                    messages="please
            wait..."
                />
            )}
        </View>
    );
};
const RenderSecurity = ({ user }) => {
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    const dispatch = useDispatch();
    const [
        removeConnectedDevice,
        { data: deviceData, isLoading: deviceIsLoading }
    ] = useRemoveConnectedDeviceMutation();
    const [generate2Fa, { data: gData, isLoading: gIsLoading }] =
        useGenerate2FaMutation();
    const [gAuth, setGAuth] = useState(null);
    const iconColor = useThemeColor({}, "icon");
    const color = useThemeColor({}, "text");
    const card = useThemeColor({}, "card");
    const danger = useThemeColor({}, "danger");
    const borderColor = useThemeColor({}, "border");
    const backgroundColor = useThemeColor({}, "background");
    const securitySettings = [
        {
            label: "Fingerprint",
            value: "fingerprint",
            description:
                "Use biometric authentication to quickly and securely access your account with a registered fingerprint. This method ensures that only authorized users can log in without needing a password."
        },
        {
            label: "Google Authenticator",
            value: "google_authenticator",
            description:
                "Enhance account security with Google Authenticator, which generates time-sensitive, one-time passcodes. This method requires linking your account to the Google Authenticator app for added protection against unauthorized access."
        }
    ];

    const accountActions = [
        { label: "Change Password", value: "change_password" },
        {
            label: "Device Management",
            value: "device_management",
            description:
                "View and manage the devices that have access to your account."
        },
        {
            label: "Deactivate or Reactivate Account",
            value: "deactivate_account",
            description:
                "Temporarily disable your account and reactivate it when needed."
        },
        {
            label: "Delete Account",
            value: "delete_account",
            description:
                "Permanently remove your account and all associated data."
        }
    ];

    const onSwitchChange = async (value, key) => {
        if (key === "google_authenticator") {
            if (!user.security_preferences[key]) {
                const { data, error } = await generate2Fa(user._id);
                if (data?.success) {
                    setGAuth(data?.data);
                }
            } else {
                await updateUser({
                    user_id: user._id,
                    value: { security_preferences: { [key]: null } }
                });
            }
            return;
        }

        if (key === "fingerprint" && !user.security_preferences[key]) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Enable fingerprint Authentication"
            });
            if (result.success) {
                const { data, error } = await updateUser({
                    user_id: user._id,
                    value: { security_preferences: { [key]: value } }
                });
                console.log("datadatadata", data);
                if (data?.success) {
                    dispatch(setEmail(user?.email));
                }
            }
            return;
        }

        await updateUser({
            user_id: user._id,
            value: { security_preferences: { [key]: value } }
        });
    };

    const onActionsPress = async (key, value) => {
        await updateUser({
            user_id: user._id,
            value: { [key]: value }
        });
    };
    return (
        <View
            style={{ borderColor }}
            className="rounded-md border  px-2 py-2 my-3"
        >
            <ThemedText type="title" className="font-semibold capitalize">
                Enable extra security features
            </ThemedText>

            <FlatList
                data={securitySettings}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View className=" my-2">
                        <View
                            className="flex-1 flex-row items-center
                        justify-between"
                        >
                            <ThemedText
                                onPress={() =>
                                    onSwitchChange(true, item?.value)
                                }
                                className="capitalize font-semibold"
                            >
                                {item.label}
                            </ThemedText>
                            <Switch
                                trackColor={{
                                    false: color + 70,
                                    true: iconColor + 70
                                }}
                                thumbColor={
                                    user?.security_preferences[item?.value]
                                        ? iconColor
                                        : color
                                }
                                ios_backgroundColor={card}
                                onValueChange={value =>
                                    onSwitchChange(value, item?.value)
                                }
                                value={user?.security_preferences[item?.value]}
                            />
                        </View>
                        <ThemedText type="subtitle" className=" text-sm">
                            {item.description ||
                                "Enhance your account security by enabling this option."}
                        </ThemedText>
                    </View>
                )}
            />

            <TouchableOpacity
                onPress={() =>
                    onActionsPress(
                        "deactivate_account",
                        !user?.deactivate_account
                    )
                }
                style={{
                    backgroundColor: user?.deactivate_account
                        ? "#cd0000" + 30
                        : iconColor + 30
                }}
                className="rounded-md px-2 py-4 my-2"
            >
                <ThemedText className="font-semibold">
                    {user?.deactivate_account
                        ? "Reactivate Account"
                        : "Deactivate Account"}
                </ThemedText>
                <ThemedText type="subtitle" className=" text-sm">
                    Temporarily disable your account. You can reactivate it
                    later.
                </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    onActionsPress("delete_account", !user?.delete_account)
                }
                style={{
                    backgroundColor: user?.delete_account
                        ? "#cd0000" + 30
                        : iconColor + 30
                }}
                className="rounded-md px-2 py-4"
            >
                <ThemedText className="font-semibold">
                    {user?.delete_account
                        ? "Delete Account"
                        : "Cancel Account Deletion"}
                </ThemedText>
                <ThemedText type="subtitle" className="text-sm">
                    {user?.delete_account
                        ? "your account will be permanently deleted after 14 days.This action cannot be undone."
                        : "Permanently delete your account and all associated data."}
                </ThemedText>
            </TouchableOpacity>

            {(data?.success || data?.error || gData?.success, gData?.error) && (
                <Alert
                    title={data?.success ? "Successful" : "An error occurred"}
                    message={data?.message}
                />
            )}
            {gAuth && <GAuthModal data={gAuth} setGAuth={setGAuth} />}
            {(isLoading || gIsLoading) && (
                <ScreenLoader title="Making update" messages="Please wait..." />
            )}
        </View>
    );
};

const RenderPayment = ({ user }) => {
    const iconColor = useThemeColor({}, "icon");
    const borderColor = useThemeColor({}, "border");
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    const onMethodPress = async slug => {
        const { data, error } = await updateUser({
            user_id: user._id,
            value: {
                setting: { payment_method: slug }
            }
        });

        toastMessage(
            data?.success ? "Successful" : "An error occurred",
            error ? error?.data?.message || error.error : data?.message
        );
    };
    return (
        <View>
            {paymentMethods.map(({ name, slug, image, description }) => (
                <TouchableOpacity
                    style={{ borderColor }}
                    onPress={() => onMethodPress(slug)}
                    className="flex-row items-center rounded-md  border px-2
                        py-2 my-1"
                >
                    <Image
                        className="h-8 w-8 rounded-full"
                        contentFit="contain"
                        source={image}
                    />
                    <View className="flex-1 pl-2">
                        <View className="flex-row items-center justify-between py-1">
                            <ThemedText className="text-sm font-semibold">
                                {name}
                            </ThemedText>
                            <MaterialCommunityIcons
                                name={
                                    user?.setting?.payment_method === slug
                                        ? "radiobox-marked"
                                        : "radiobox-blank"
                                }
                                size={20}
                                color={iconColor}
                            />
                        </View>

                        <View
                            className="flex-row items-center
                                justify-between py-1"
                        >
                            <ThemedText className="text-xs">
                                {description}
                            </ThemedText>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            {isLoading && (
                <ScreenLoader title="Making update" messages="Please wait..." />
            )}
        </View>
    );
};

const RenderAppearance = ({ user }) => {
    const iconColor = useThemeColor({}, "icon");
    const color = useThemeColor({}, "text");
    const card = useThemeColor({}, "card");
    const borderColor = useThemeColor({}, "border");
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();
    const onSwitchChange = async (value, key) => {
        await updateUser({
            user_id: user._id,
            value: { setting: { darkmode: value } }
        });
    };
    return (
        <View className="py-2">
            <View
                style={{ borderColor }}
                className="flex-row items-center justify-between border
             py-2 px-2 rounded-md"
            >
                <ThemedText className="font-semibold text-md capitalize">
                    Dark mode
                </ThemedText>
                <Switch
                    trackColor={{
                        false: color + 70,
                        true: iconColor + 70
                    }}
                    thumbColor={
                        (user?.setting || {})["darkmode"] ? iconColor : color
                    }
                    ios_backgroundColor={card}
                    onValueChange={value => onSwitchChange(value)}
                    value={(user?.setting || {})["darkmode"]}
                />
            </View>
            {isLoading && (
                <ScreenLoader title="Making update" messages="Please wait..." />
            )}
        </View>
    );
};

const RenderHelp = () => {
    const [options, setOptions] = useState({ faqs: true, report: false });
    const iconColor = useThemeColor({}, "icon");
    const borderColor = useThemeColor({}, "border");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const schema = z.object({
        name: z.string().min(2),
        description: z.string().min(2),
        complaint_type: z.string().min(2)
    });
    const method = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            complain: ""
        }
    });
    const { control, handleSubmit, reset } = method;
    // Function to handle form submission
    const onSubmit = () => {
        console.log("Submitted Issue:", selectedIssue, formData);
        alert("Issue reported successfully!");
        setSelectedIssue(null);
        reset();
    };
    const handleToggle = key => {
        setOptions(prev =>
            Object.keys(prev).reduce((acc, curr) => {
                acc[curr] = curr === key ? !prev[key] : false;
                return acc;
            }, {})
        );
    };

    const Features = ({ item }) => {
        const { id, question, answer } = item;
        return (
            <View
                style={{ borderColor }}
                key={id}
                className="px-2 py-2 rounded-md 
            border my-1 space-y-2"
            >
                <ThemedText className="font-semibold capitalize">
                    {question}
                </ThemedText>
                <ThemedText>{answer}</ThemedText>
            </View>
        );
    };

    return (
        <View>
            <TouchableOpacity
                onPress={() => handleToggle("faqs")}
                className="flex-row items-center justify-between my-4"
            >
                <ThemedText className="font-semibold uppercase text-lg">
                    FAQS
                </ThemedText>
                <MaterialCommunityIcons
                    name={options.faqs ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={iconColor}
                />
            </TouchableOpacity>

            {options.faqs && faqs.map(item => <Features item={item} />)}
            <TouchableOpacity
                onPress={() => handleToggle("report")}
                className="flex-row items-center justify-between my-2"
            >
                <ThemedText className="font-semibold uppercase text-lg">
                    Report an Issue
                </ThemedText>
                <MaterialCommunityIcons
                    name={options.report ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={iconColor}
                />
            </TouchableOpacity>
            {options.report &&
                reportIssues.map(item => (
                    <TouchableOpacity
                        style={{ borderColor }}
                        key={item.id}
                        className="px-2 py-2 rounded-md  border my-1 space-y-2"
                        onPress={() => setSelectedIssue(item)}
                    >
                        <ThemedText className="text-lg font-semibold">
                            {item.category}
                        </ThemedText>
                        <ThemedText className="text-gray-600">
                            {item.description}
                        </ThemedText>
                    </TouchableOpacity>
                ))}

            <Modal
                statusBarTranslucent={true}
                presentationStyle={"formSheet"}
                visible={selectedIssue !== null}
                animationType="fade"
                onRequestClose={() => setSelectedIssue(null)}
            >
                <View className="flex-1 px-2 py-2">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {selectedIssue && (
                            <View className="h-full p-4 mt-4 rounded-lg shadow">
                                <ThemedText className="text-lg font-bold text-center py-2">
                                    {selectedIssue.category}
                                </ThemedText>

                                {selectedIssue.steps && (
                                    <View>
                                        <ThemedText className="text-lg font-bold py-2">
                                            Steps to Follow
                                        </ThemedText>
                                        {selectedIssue.steps.map(
                                            (step, index) => (
                                                <ThemedText
                                                    key={index}
                                                    className=""
                                                >
                                                    • {step}
                                                </ThemedText>
                                            )
                                        )}
                                    </View>
                                )}

                                {selectedIssue.emergency_contacts && (
                                    <View>
                                        <ThemedText className="text-lg font-bold py-2">
                                            Emergency Contacts
                                        </ThemedText>
                                        {selectedIssue.emergency_contacts.map(
                                            (contact, index) => (
                                                <ThemedText
                                                    key={index}
                                                    className="py-1"
                                                >
                                                    {contact.name}:{" "}
                                                    {contact.phone}
                                                </ThemedText>
                                            )
                                        )}
                                    </View>
                                )}

                                {selectedIssue.resolution_process && (
                                    <View>
                                        <ThemedText className="text-lg font-bold py-2">
                                            Resolution Process
                                        </ThemedText>
                                        {selectedIssue.resolution_process.map(
                                            (process, index) => (
                                                <ThemedText
                                                    key={index}
                                                    className=""
                                                >
                                                    • {process}
                                                </ThemedText>
                                            )
                                        )}
                                    </View>
                                )}

                                <View className="flex-1 space-y-3">
                                    <CustomFormField
                                        fieldType={FormFieldType.INPUT}
                                        control={control}
                                        placeholder="John Doe"
                                        name="full_name"
                                        leftIconName={"person"}
                                    />
                                    {(selectedIssue.id === 1 ||
                                        selectedIssue.id == 2 ||
                                        selectedIssue.id === 4) && (
                                        <CustomFormField
                                            fieldType={
                                                FormFieldType.PHONE_INPUT
                                            }
                                            control={control}
                                            placeholder="+233 987 567 6544"
                                            name="phone"
                                            leftIconName={"call"}
                                        />
                                    )}
                                    {selectedIssue.id === 1 && (
                                        <CustomFormField
                                            fieldType={FormFieldType.INPUT}
                                            control={control}
                                            placeholder="location"
                                            name="description"
                                            leftIconName={"location"}
                                        />
                                    )}
                                    <CustomFormField
                                        fieldType={FormFieldType.TEXTAREA}
                                        control={control}
                                        placeholder="description"
                                        name="description"
                                    />
                                    <CustomFormField
                                        fieldType={FormFieldType.FILE}
                                        control={control}
                                        instruction="pick a file to help us quickly respond to
                        your request"
                                        placeholder="image"
                                        name="image"
                                    />

                                    {selectedIssue?.complaint_type && (
                                        <>
                                            <CustomFormField
                                                fieldType={FormFieldType.INPUT}
                                                control={control}
                                                placeholder="driver or customer name"
                                                name="driver_customer_name"
                                                leftIconName={"person"}
                                            />{" "}
                                            <CustomFormField
                                                fieldType={FormFieldType.SELECT}
                                                control={control}
                                                placeholder=""
                                                name="complaint_type"
                                                options={selectedIssue.complaint_type.map(
                                                    c => ({
                                                        label: c,
                                                        value: c
                                                    })
                                                )}
                                            />
                                        </>
                                    )}
                                </View>
                            </View>
                        )}
                    </ScrollView>
                    <ThemedButton title="Submit issue" />
                </View>
            </Modal>
        </View>
    );
};
const RenderRate = () => {
    const schema = z.object({
        rating: z.number(),
        comment: z.string().min(2)
    });

    const method = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            rating: 0, // Changed from "" to 0
            comment: ""
        }
    });

    const { control, handleSubmit, reset, setValue } = method;

    const onSubmit = handleSubmit(data => {
        alert("Issue reported successfully!");
        reset();
    });

    const [rating, setRating] = useState(0);

    return (
        <View className="flex-1 py-2 px-2">
            <View className=" items-center justify-center flex-1">
                <ThemedText className="text-2xl font-extrabold mb-2">
                    Rate Your Experience
                </ThemedText>
                <ThemedText className="text-center text-gray-600 mb-5">
                    Your feedback helps us improve. Let us know what you think
                    about our service!
                </ThemedText>

                {/* Review Input */}
                <ThemedText className="text-lg font-bold mb-3">
                    Write your review
                </ThemedText>
                <View className="w-full  ">
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={control}
                        placeholder="Comment here"
                        name="comment"
                    />
                </View>

                <ThemedText className="text-lg font-bold mt-5 mb-3">
                    Rate us
                </ThemedText>
                <View className="flex-row py-2">
                    {[1, 2, 3, 4, 5].map(num => (
                        <TouchableOpacity
                            key={num}
                            onPress={() => {
                                setRating(num);
                                setValue("rating", num);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="star"
                                size={40}
                                className="mx-1"
                                color={num <= rating ? "gold" : "gray"}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View className="justify-end pb-5">
                <ThemedButton title="Submit Review" onPress={onSubmit} />
            </View>
        </View>
    );
};
