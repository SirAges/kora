import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    Alert
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedText from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Accordion from "@/components/Accordion";
import ThemedModal from "@/components/ThemedModal";
import ThemedButton from "@/components/ThemedButton";
import RangeSlider from "@ptomasroos/react-native-multi-slider";
import { debounce } from "lodash";
import { formatAmount } from "@/lib/utils";
import * as Location from "expo-location";
import { top_providers } from "@/lib/data";
const FilterCard = ({ setParams, filter, setFilter }) => {
    const { width } = Dimensions.get("window");

    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);
    const sort = [
        { id: "rmd", name: "Recommended" },
        { id: "plh", name: "Price (low to high)" },
        { id: "phl", name: "Price (high to low)" },
        { id: "pfm", name: "Passenger capacity (few to many)" },
        { id: "pmf", name: "Passenger capacity (many to few)" },
        { id: "dnf", name: "Distance (nigh to far)" },
        { id: "rhl", name: "Rating (high to low)" },
        { id: "rvw", name: "Review (many to few)" }
    ];
    const backgroundColor = useThemeColor({}, "background");
    const primary = useThemeColor({}, "primary");
    const card = useThemeColor({}, "card");
    const iconColor = useThemeColor({}, "icon");
    const color = useThemeColor({}, "text");
    const [sorted, setSorted] = useState("rmd");
    const initialValues = {
        price_range: [],
        seat: "",
        rental_providers: [],
        energy_source: "",
        provider_policy: "",
        distance: "",
        rating: "",
        sort: "",
        type: ""
    };
    useEffect(() => {
        setFilter(initialValues);
        return () => {};
    }, []);

    const [showModal, setShowModal] = useState({ filter: false, sort: false });
    const RenderFilter = ({ icon, name }) => {
        const onPressIcon = () => {
            setShowModal(prev => ({ ...prev, [name]: true }));
        };

        return (
            <TouchableOpacity onPress={onPressIcon}>
                <View className="flex-row items-center px-2 space-x-1">
                    <MaterialCommunityIcons
                        name={icon}
                        size={20}
                        color={iconColor}
                    />
                    <ThemedText style={{ color }}>{name}</ThemedText>
                </View>
            </TouchableOpacity>
        );
    };
    const RenderSlider = () => {
        const onValuesChange = value => {
            setFilter(prev => ({ ...prev, price_range: value }));
        };
        return (
            <>
                <View className="flex-row items-center w-full justify-between">
                    <ThemedText className="font-semibold  text-lg">
                        Price Range
                    </ThemedText>
                    <ThemedText
                        style={{ color: primary }}
                        className="font-semibold text-md"
                    >{`${formatAmount(filter.price_range[0])} - ${formatAmount(
                        filter.price_range[1]
                    )}`}</ThemedText>
                </View>
                <RangeSlider
                    className="flex-1"
                    values={filter.price_range}
                    sliderLength={width - 20}
                    trackStyle={{ height: 4, borderRadius: 10 }}
                    markerStyle={{
                        backgroundColor,
                        borderColor: primary,
                        borderWidth: 3,
                        height: 16,
                        width: 16
                    }}
                    selectedStyle={{ backgroundColor: primary }}
                    unselectedStyle={{ backgroundColor: primary + 30 }}
                    onValuesChange={debounce(onValuesChange, 400)}
                    min={100}
                    max={5000}
                    step={50}
                />
            </>
        );
    };
    const onPressRentalProvider = name => {
        if (name === "all") {
            const allIds = top_providers.map(({ id }) => id);
            setFilter(prev => ({
                ...prev,
                rental_providers: allIds
            }));
            return;
        }
        const exist = filter?.rental_providers?.includes(name);
        const filtered = filter.rental_providers?.filter(
            p => ![name, "all"].includes(p)
        );
        if (exist) {
            setFilter(prev => ({ ...prev, rental_providers: filtered }));
        } else {
            setFilter(prev => ({
                ...prev,
                rental_providers: [...filtered, name]
            }));
        }
    };
    const onPressApply = () => {
        setParams({
            location: [location?.coords?.latitude, location?.coords?.longitude],
            ...filter
        });
        setShowModal({ sort: false, filter: false });
    };
    return (
        filter && (
            <>
                <View
                    className="absolute bottom-4 items-center right-0 left-0 h-14 z-50
            py-2 px-2"
                >
                    <View
                        className="z-50 rounded-full px-2  h-full flex-row items-center"
                        style={{ backgroundColor: backgroundColor + 90 }}
                    >
                        <RenderFilter icon="compare-vertical" name="sort" />
                        <RenderFilter icon="tune" name="filter" />
                    </View>
                </View>
                <ThemedModal
                    lightColor="white"
                    darkColor={backgroundColor}
                    visible={showModal.sort}
                    onRequestClose={() =>
                        setShowModal(prev => ({ ...prev, sort: false }))
                    }
                    position="top"
                    title="Sort by"
                >
                    <View className="space-y-3">
                        {sort.map(({ id, name }) => (
                            <TouchableOpacity
                                style={{ backgroundColor: card }}
                                className=" px-2 h-12 items-center flex-row rounded-md"
                                onPress={() =>
                                    setFilter(prev => ({ ...prev, sort: id }))
                                }
                            >
                                <ThemedText className="font-semibold flex-1">
                                    {name}
                                </ThemedText>
                                {filter.sort === id && (
                                    <Ionicons
                                        name="checkmark-circle"
                                        color={iconColor}
                                        size={20}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="flex-row items-center py-2">
                        <ThemedButton
                            className="mr-1"
                            title="reset"
                            onPress={() =>
                                setFilter(prev => ({ ...prev, sort: "rmd" }))
                            }
                        />
                        <ThemedButton
                            title="apply"
                            className="ml-1"
                            onPress={onPressApply}
                        />
                    </View>
                </ThemedModal>
                <ThemedModal
                    visible={showModal.filter}
                    onRequestClose={() =>
                        setShowModal(prev => ({ ...prev, filter: false }))
                    }
                    position="top"
                    title="Filter by"
                >
                    <ScrollView className="max-h-96">
                        <View>
                            <RenderSlider />
                            <Accordion title="Seat capacity">
                                <View className="flex-row items-center flex-wrap">
                                    {["2", "2-4", "5-6", "6+"].map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            className="w-1/3"
                                            onPress={() =>
                                                setFilter(prev => ({
                                                    ...prev,
                                                    seat: s
                                                }))
                                            }
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        filter.seat === s
                                                            ? primary
                                                            : card
                                                }}
                                                className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-center mx-1 my-1 space-x-1"
                                            >
                                                <MaterialCommunityIcons
                                                    name="car-seat"
                                                    size={14}
                                                    color={
                                                        filter.seat === s
                                                            ? "white"
                                                            : iconColor
                                                    }
                                                />
                                                <ThemedText>{s}</ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Accordion>
                            <Accordion title="Rental providers ">
                                <View className="w-full">
                                    {top_providers.map(
                                        ({ id, name, image }) => (
                                            <TouchableOpacity
                                                className="w-full"
                                                onPress={() =>
                                                    onPressRentalProvider(id)
                                                }
                                            >
                                                <View
                                                    className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-between mx-1 my-0.5 space-x-1"
                                                >
                                                    <View className="flex-row items-center space-x-2">
                                                        {image && (
                                                            <Image
                                                                resizeMode="contain"
                                                                className="h-10 w-10"
                                                                source={image}
                                                            />
                                                        )}
                                                        <ThemedText>
                                                            {name}
                                                        </ThemedText>
                                                    </View>
                                                    <MaterialCommunityIcons
                                                        name={
                                                            filter.rental_providers.includes(
                                                                id
                                                            )
                                                                ? "checkbox-marked"
                                                                : "checkbox-outline"
                                                        }
                                                        size={14}
                                                        color={iconColor}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    )}
                                </View>
                            </Accordion>
                            <Accordion title="Energy source">
                                <View className="flex-row items-center flex-wrap">
                                    {[
                                        "petrol",
                                        "diesel",
                                        "electric",
                                        "hybrid"
                                    ].map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            className="w-1/3"
                                            onPress={() =>
                                                setFilter(prev => ({
                                                    ...prev,
                                                    energy_source: s
                                                }))
                                            }
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        filter.energy_source ===
                                                        s
                                                            ? primary
                                                            : card
                                                }}
                                                className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-center mx-1 my-1 space-x-1"
                                            >
                                                <MaterialCommunityIcons
                                                    name="gas-station"
                                                    size={14}
                                                    color={
                                                        filter.energy_source ===
                                                        s
                                                            ? "white"
                                                            : iconColor
                                                    }
                                                />
                                                <ThemedText>{s}</ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Accordion>
                            <Accordion title="Provider policy source">
                                <View className="flex-row items-center flex-wrap">
                                    {[
                                        "immediate comfirmation",
                                        "free cancellation",
                                        "refundable"
                                    ].map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            className=""
                                            onPress={() =>
                                                setFilter(prev => ({
                                                    ...prev,
                                                    provider_policy: s
                                                }))
                                            }
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        filter.provider_policy ===
                                                        s
                                                            ? primary
                                                            : card
                                                }}
                                                className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-center mx-1 my-1 space-x-1"
                                            >
                                                <MaterialCommunityIcons
                                                    name="registered-trademark"
                                                    size={14}
                                                    color={
                                                        filter.provider_policy ===
                                                        s
                                                            ? "white"
                                                            : iconColor
                                                    }
                                                />
                                                <ThemedText>{s}</ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Accordion>
                            <Accordion title="Distance">
                                <View className="flex-row items-center flex-wrap">
                                    {["1", "2.5", "5", "10"].map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            className=""
                                            onPress={() =>
                                                setFilter(prev => ({
                                                    ...prev,
                                                    distance: s
                                                }))
                                            }
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        filter.distance === s
                                                            ? primary
                                                            : card
                                                }}
                                                className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-center mx-1 my-1 space-x-1"
                                            >
                                                <MaterialCommunityIcons
                                                    name="map-marker-distance"
                                                    size={14}
                                                    color={
                                                        filter.distance === s
                                                            ? "white"
                                                            : iconColor
                                                    }
                                                />
                                                <ThemedText>
                                                    within {s}km
                                                </ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Accordion>
                            <Accordion title="Rating">
                                <View className="flex-row items-center flex-wrap">
                                    {["4.0", " 4.5", "3.5", "3.0"].map(s => (
                                        <TouchableOpacity
                                            key={s}
                                            className=""
                                            onPress={() =>
                                                setFilter(prev => ({
                                                    ...prev,
                                                    rating: s
                                                }))
                                            }
                                        >
                                            <View
                                                style={{
                                                    backgroundColor:
                                                        filter.rating === s
                                                            ? primary
                                                            : card
                                                }}
                                                className="py-2 px-2
                                    rounded-full flex-row items-center
                            justify-center mx-1 my-1 space-x-1"
                                            >
                                                <MaterialCommunityIcons
                                                    name="star"
                                                    size={14}
                                                    color={
                                                        filter.rating === s
                                                            ? "white"
                                                            : iconColor
                                                    }
                                                />
                                                <ThemedText>
                                                    {s} or higher
                                                </ThemedText>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Accordion>
                        </View>
                        <View className="flex-row items-center py-2">
                            <ThemedButton
                                className="mr-1"
                                title="reset"
                                onPress={() =>
                                    setFilter({ ...initialValues, sort: "rmd" })
                                }
                            />
                            <ThemedButton
                                title="apply"
                                className="ml-1"
                                onPress={onPressApply}
                            />
                        </View>
                    </ScrollView>
                </ThemedModal>
            </>
        )
    );
};

export default FilterCard;
