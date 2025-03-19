import { useState, useEffect } from "react";
import { View, Modal, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import ScreenLoader from "@/components/ScreenLoader";
import { toastConfig } from "@/app/_layout";
import ThemedText from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProviderDetails from "@/components/ProviderDetails";
import {
    useGetReviewsQuery,
    useCreateReviewMutation
} from "@/redux/review/reviewApiSlice";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const schema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(2).max(200)
});

const ReviewInfo = ({ reviewerId, revieweeId, revieweeType }) => {
    const { userId } = useAuth();
    const { data, isFetching, error } = useGetReviewsQuery({
        params: { revieweeType, revieweeId, reviewerId }
    });

    const [createReview, { isLoading }] = useCreateReviewMutation();
    const [review, setReview] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating] = useState(0);

    const backgroundColor = useThemeColor({}, "background");
    const iconColor = useThemeColor({}, "icon");

    const method = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            rating: 0,
            comment: ""
        }
    });

    const { control, handleSubmit, reset, setValue } = method;

    const onSubmit = handleSubmit(async value => {
        const { data, error } = await createReview({
            reviewerId: userId,
            revieweeType,
            revieweeId,
            ...value
        });
    });

    useEffect(() => {
        if (data) {
            setReview(data.data);
        }
    }, [data]);

    return (
        <>
            <View className="flex-row items-center justify-between py-2">
                <ThemedText
                    onPress={() => setShowModal(true)}
                    className="underline"
                >
                    Write review
                </ThemedText>
                <View className="flex-row items-center space-x-1">
                    <MaterialCommunityIcons
                        name="star"
                        size={14}
                        color={iconColor}
                    />
                    <ThemedText className="font-semibold">
                        {`${review.averageRating || 0}/5.0`}
                    </ThemedText>
                </View>
                <ThemedText>{`${review.totalReviews || 0} reviews`}</ThemedText>
            </View>

            <Modal
                statusBarTranslucent
                presentationStyle="formSheet"
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View className="z-50 absolute top-0 w-full">
                    <Toast config={toastConfig} position="top" />
                </View>

                <SafeAreaView
                    style={{ backgroundColor }}
                    className="flex-1 px-2"
                >
                    <FlatList
                        className="flex-1"
                        data={review.reviews || []}
                        renderItem={({ item }) => (
                            <View className="px-2 mb-2 py-2 rounded-md border border-gray-200">
                                <View className="flex-row items-center justify-between">
                                    <ProviderDetails
                                        user_id={item.reviewerId}
                                    />
                                    <View className="flex-row items-center space-x-1">
                                        <MaterialCommunityIcons
                                            name="star"
                                            size={14}
                                            color={iconColor}
                                        />
                                        <ThemedText className="font-semibold">{`${item.rating}/5.0`}</ThemedText>
                                    </View>
                                </View>
                                <ThemedText className="text-justify">
                                    {item.comment}
                                </ThemedText>
                            </View>
                        )}
                        keyExtractor={(item, index) =>
                            `review-${item._id}-${index}`
                        }
                    />
                    <View className="space-y-12">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            placeholder="Comment here"
                            name="comment"
                        />
                        <View
                            className="flex-row items-center w-full
                        justify-center gap-2"
                        >
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
                                        color={
                                            num <= rating ? iconColor : "gray"
                                        }
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <ThemedButton title="Submit Review" onPress={onSubmit} />

                    {isLoading && (
                        <ScreenLoader
                            title="Sending review"
                            messages="Please wait..."
                        />
                    )}
                </SafeAreaView>
            </Modal>
        </>
    );
};

export default ReviewInfo;
