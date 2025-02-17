import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ScrollView
} from "react-native";
import ThemedModal from "@/components/ThemedModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import Iconicons from "@expo/vector-icons/Ionicons";
import { Marquee } from "@animatereactnative/marquee";
import { truncate } from "@/lib/utils";
interface SugestionProps {
    name: string;
    value: string;
    onChange: (value: string) => void;
}

const Sugestion: React.FC<SugestionProps> = ({ value, onChange }) => {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundColor = useThemeColor({}, "field");
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");
    const iconColor = useThemeColor({}, "icon");
    // Fetch suggestions from API
    const fetchSuggestions = async (searchTerm: string) => {
        if (!searchTerm) return;

        try {
            const response = await fetch(
                `https://geocode.maps.co/search?q=${searchTerm}&api_key=67a9a2a49de37011545021jndd27124`
            );
            const data = await response.json();
            setSuggestions(data || []);
        } catch (error) {
            console.log("Error fetching suggestions:", error);
        }
    };

    // Handle input change
    const handleInputChange = (text: string) => {
        setQuery(text);
        if (!modalVisible) setModalVisible(true); // Open modal when typing
        fetchSuggestions(text);
    };

    // Select a suggestion
    const handleSelect = (place: any) => {
        setQuery(place.display_name);
        onChange({lat:place.lat,lng:place.lon,display_name:place.display_name});

        setModalVisible(false);
    };

    return (
        <>
            <View className="flex-1 py-2">
                <View className="flex-row w-full">
                    <ScrollView
                        className="flex-1"
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View className="">
                            <Text
                                onPress={() => setModalVisible(true)}
                                className=" whitespace-nowrap"
                                style={{
                                    color: value ? textColor : placeholderColor
                                }}
                            >
                                {value?.display_name || "Select..."}
                            </Text>
                        </View>
                    </ScrollView>
                    <Iconicons
                        onPress={() => setModalVisible(true)}
                        name="chevron-down"
                        size={20}
                        color={iconColor}
                    />
                </View>
            </View>
            <ThemedModal
                position="bottom"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TextInput
                    style={{ backgroundColor, borderColor }}
                    className="w-full max-h-14 py-4 px-2 rounded-md border"
                    value={query}
                    onChangeText={handleInputChange}
                    placeholder="Type to search..."
                />

                <FlatList
                    data={suggestions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => handleSelect(item)}
                        >
                            <Text>{item.display_name}</Text>
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </ThemedModal>
        </>
    );
};

export default Sugestion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 8
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#FF4D4D",
        borderRadius: 5,
        alignItems: "center"
    },
    closeText: {
        color: "white",
        fontWeight: "bold"
    }
});
