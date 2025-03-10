import { useEffect, useState } from "react";
import { Modal, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import OtpInput from "@/components/OtpInput";

import { useThemeColor } from "@/hooks/useThemeColor";
import useAuth from "@/hooks/useAuth";
import * as Clipboard from "expo-clipboard";
import {
    useUpdateUserMutation,
    useVerify2FaMutation
} from "@/redux/user/userApiSlice";
const GAuthModal = ({ data, setGAuth }) => {
    const { userId } = useAuth();
    const [updateUser, { data: user, isLoading }] = useUpdateUserMutation();
    const [verify2Fa, { data: verify, isLoading: isVerifyLoading }] =
        useVerify2FaMutation();
    const [imageUri, setImageUri] = useState(null);
    const [value, setValue] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const card = useThemeColor({}, "card");

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(data.secret);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    useEffect(() => {
        const convertToUri = async () => {
            if (!data?.qrCodeUrl) return;
            try {
                const fileUri = `${FileSystem.cacheDirectory}image.png`;
                const base64Data = data.qrCodeUrl.replace(
                    /^data:image\/\w+;base64,/,
                    ""
                );

                await FileSystem.writeAsStringAsync(fileUri, base64Data, {
                    encoding: FileSystem.EncodingType.Base64
                });

                setImageUri(fileUri);
            } catch (error) {
                console.error("Error converting base64 to URI:", error);
            }
        };
        convertToUri();
    }, [data.qrCodeUrl]);
    console.log("value", value);
    const onVerifyPress = async () => {
        const { data: vd, error: ve } = await verify2Fa({
            user_id: userId,
            value: { token: value }
        });
        console.log("vd", vd, ve);
        if (vd) {
            setGAuth(false);
        }
    };
    return (
        <Modal
            statusBarTranslucent={true}
            presentationStyle={"formSheet"}
            visible={true}
            animationType="fade"
            onRequestClose={async () => {
                await updateUser({
                    user_id: userId,
                    value: {
                        security_preferences: {
                            ["google_authenticator"]: null
                        }
                    }
                });
                setGAuth(false);
            }}
        >
            <SafeAreaView
                style={{ backgroundColor: card }}
                className="flex-1 px-2 py-4"
            >
                <ScrollView>
                    <ThemedText
                        className="text-2xl font-semibold capitalize
                text-center text-md"
                    >
                        Set Up Two-Factor Authentication
                    </ThemedText>
                    <ThemedText className="text-justify text-md leading-5">
                        Enhance your account security by setting up Google
                        Authenticator. Scan the QR code below using the Google
                        Authenticator app or enter the secret key manually. Once
                        set up, the app will generate a one-time code for login
                        verification. Keep this key safe, as you’ll need it to
                        access your account.
                    </ThemedText>
                    <View
                        className="w-full py-10 px-3 items-center justify-center
                flex-1"
                    >
                        <View className=" items-center space-y-2 w-full">
                            {imageUri ? (
                                <Image
                                    className="w-full h-72 rounded-md"
                                    contentFit="contain"
                                    source={{ uri: imageUri }}
                                />
                            ) : (
                                <ThemedText>No image to scan</ThemedText>
                            )}
                            <View className="items-center justify-center px-2 py-2 border border-gray-200 rounded-md">
                                <ThemedText
                                    onPress={copyToClipboard}
                                    className="font-semibold uppercase px-2 py-2
                        text-md"
                                >
                                    {data.secret}
                                </ThemedText>
                                {isCopied && <ThemedText>copied</ThemedText>}
                            </View>
                        </View>
                    </View>
                    <View>
                        <ThemedText className="text-center py-2">
                            Enter OTP from google authenticator to enable google
                            2FA authentication. This screen will automatically close
                            after verification
                        </ThemedText>
                        <OtpInput
                            value={value}
                            onChange={data => setValue(data)}
                        />
                    </View>
                    <ThemedButton onPress={onVerifyPress} title="Verify" />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default GAuthModal;
