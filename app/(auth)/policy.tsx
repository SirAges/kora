import React from "react";
import { ScrollView ,View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const Policy = () => {
    const backgroundColor = useThemeColor({}, "background");

    return (
        <SafeAreaView style={{ backgroundColor }} className="flex-1 py-2 px-4">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ThemedText className="text-xl font-bold mb-4">
                        Terms and Conditions
                    </ThemedText>
                    <ThemedText className="mb-2">
                        Welcome to Kora. By using this app, you agree to these
                        terms. If you do not agree, please do not use Kora.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        1. User Responsibilities
                    </ThemedText>
                    <ThemedText className="mb-2">
                        - You must be at least 18 years old.
                        {"\n"}- Renters must return vehicles in the agreed
                        condition.
                        {"\n"}- Car owners must ensure their vehicles are
                        legally registered.
                        {"\n"}- Drivers must have a valid license and follow
                        traffic laws.
                        {"\n"}
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        2. Payments and Cancellations
                    </ThemedText>
                    <ThemedText className="mb-2">
                        Payments must be made through Kora’s secure system.
                        Refunds and cancellations are subject to platform
                        policies.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        3. Liability and Disputes
                    </ThemedText>
                    <ThemedText className="mb-2">
                        Kora is a facilitator and is not responsible for
                        disputes between users. Users are responsible for
                        damages, accidents, and contract breaches.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        4. Termination
                    </ThemedText>
                    <ThemedText className="mb-2">
                        Kora reserves the right to suspend or terminate accounts
                        for policy violations.
                    </ThemedText>

                    <ThemedText className="text-xl font-bold mt-6 mb-4">
                        Privacy Policy
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        1. Information We Collect
                    </ThemedText>
                    <ThemedText className="mb-2">
                        - Personal Data (Name, Email, Phone, Address)
                        {"\n"}- Vehicle and Driver Information
                        {"\n"}- Payment Details (processed securely)
                        {"\n"}- Location Data for tracking rentals
                           {"\n"}
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        2. How We Use Your Information
                    </ThemedText>
                    <ThemedText className="mb-2">
                        - To provide and improve services.
                        {"\n"}- To verify user identity and prevent fraud.
                        {"\n"}- To process payments securely.
                           {"\n"}
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        3. Data Sharing
                    </ThemedText>
                    <ThemedText className="mb-2">
                        We do not sell your personal data. We only share it with
                        payment processors, law enforcement (if required), and
                        relevant users for rental transactions.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        4. Security Measures
                    </ThemedText>
                    <ThemedText className="mb-2">
                        We use encryption and secure storage to protect user
                        data.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        5. Your Rights
                    </ThemedText>
                    <ThemedText className="mb-2">
                        Users can update or delete their account, request a copy
                        of their data, or opt out of marketing communications.
                    </ThemedText>

                    <ThemedText className="font-semibold mt-4">
                        6. Changes to this Policy
                    </ThemedText>
                    <ThemedText className="mb-4">
                        Kora may update these terms, and users will be notified
                        of significant changes.
                    </ThemedText>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Policy;
