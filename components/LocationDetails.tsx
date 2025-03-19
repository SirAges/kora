import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToBooking, selectCurrentBooking } from "@/redux/globalSlice";
import { formatDateTime, calculateDateDifference } from "@/lib/utils";
import DatePicker from "@/components/DatePicker";
import DateDifferenceSvg from "@/assets/svgs/difference";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import Iconicons from "@expo/vector-icons/Ionicons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema, LocationSchemaType } from "@/lib/schema";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";
import { getDistance } from "geolib";
const LocationDetails = ({ pickup_options, dropoff_options }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [options, setOptions] = useState(null);
    const [dateDifference, setDateDifference] = useState("");
    const { startDate, endDate, days, dropoff_location, pickup_location } =
        useSelector(selectCurrentBooking);

    // const distance = getDistance(
    //     { latitude: pickup_location.lat, longitude: pickup_location.lng },
    //     { latitude: dropoff_location.lat, longitude: dropoff_location.lng }
    // );

    const textColor = useThemeColor({}, "text");
    const primary = useThemeColor({}, "primary");
    const backgroundColor = useThemeColor({}, "card");
    useEffect(() => {
        setDateDifference(calculateDateDifference(startDate, endDate));
        dispatch(
            addToBooking({ days: calculateDateDifference(startDate, endDate) })
        );
    }, [startDate, endDate]);
    
    const method = useForm<LocationSchemaType>({
        resolver:
        zodResolver(locationSchema.pick({pickup_location:true,dropoff_location:true})),
        defaultValues:{}
    });
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isLoading }
    } = method;
    const onSubmit = (data: LocationSchemaType) => {
        dispatch(addToBooking(data ));
    }
    const RenderDate = ({ date }) => {
        if (!date) return null;

        return (
            <View>
                <ThemedText className="text-md font-semibold capitalize">
                    {formatDateTime(date).dateOnly}
                </ThemedText>
                <ThemedText className="text-xs">
                    {formatDateTime(date).timeOnly}
                </ThemedText>
            </View>
        );
    };
    const RenderLocation = ({ place, type }) => {
        if (!place) return null;

        return (
            <View
                style={{ backgroundColor }}
                className="flex-row px-2 items-center my-1 py-2 rounded-md"
            >
                <ThemedText className="text-md font-semibold capitalize pr-2">
                    {type.replace("_location", "")}
                </ThemedText>
                <ScrollView
                    className="flex-1"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="">
                        <TouchableOpacity
                            onPress={() => {
                                if (!pickup_options && !dropoff_options) {
                                    return;
                                }
                                setModalVisible(true);
                                setOptions(type);
                            }}
                        >
                            <ThemedText className=" whitespace-nowrap">
                                {place?.display_name || "Select..."}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    };
    return (
        <View className="">
            <View className="flex-row items-center justify-between px-2 py-2">
                <DatePicker title="Pickup date" isStart={true} />

                {startDate && endDate && (
                    <View className="items-center">
                        <ThemedText type="primary">{days}</ThemedText>
                        <DateDifferenceSvg />
                    </View>
                )}

                <DatePicker title="Dropoff date" isStart={false} />
            </View>
 <CustomFormField
                fieldType={FormFieldType.SUGGESTION}
                control={control}
                leftIconName="location"
                position="bottom"
                label="pickup location"
                name="pickup_location"
            />
            <CustomFormField
                fieldType={FormFieldType.SUGGESTION}
                control={control}
                leftIconName="location"
                position="bottom"
                label="dropoff location"
                name="dropoff_location"
            />
          
            <MapView
                className="w-full rounded-md h-56"
                initialRegion={{
                    latitude: dropoff_location.lat,
                    longitude: dropoff_location.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0922 * 0.5
                }}
            >
                {/* Route Line */}
                <Polyline
                    coordinates={[
                        {
                            latitude: pickup_location.lat,
                            longitude: pickup_location.lng
                        },
                        {
                            latitude: dropoff_location.lat,
                            longitude: dropoff_location.lng
                        }
                    ]}
                    strokeColor={primary}
                    strokeWidth={3}
                />

                {/* Pickup & Dropoff Markers with Popups */}
                {[pickup_location, dropoff_location].map((mark, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: mark.lat,
                            longitude: mark.lng
                        }}
                    >
                        <Callout>
                            <View className="p-5">
                                <Text style={{ fontWeight: "bold" }}>
                                    {mark.title}
                                </Text>
                                <Text>{mark.display_name}</Text>
                                {index === 0 && (
                                    <Text>
                                        Distance to Dropoff:{" "}
                                        {/*distance.toFixed(2)*/} km
                                    </Text>
                                )}
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <ThemedModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                position={"top"}
            >
                {pickup_options &&
                    dropoff_options &&
                    (options === "pickup_location"
                        ? pickup_options
                        : dropoff_options
                    ).map((item, index) => (
                        <TouchableOpacity
                            key={`${item.display_name}${index}`}
                            className="h-14 justify-center my-1 py-2 px-2
                                bg-gray-200/70 
                             rounded-lg"
                            onPress={() => {
                                dispatch(addToBooking({ [options]: item }));
                                setModalVisible(false);
                            }}
                        >
                            <ThemedText
                                style={{
                                    color: textColor
                                }}
                            >
                                {item.display_name}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
            </ThemedModal>
        </View>
    );
};

export default LocationDetails;