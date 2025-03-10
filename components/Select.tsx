import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import ThemedModal from "@/components/ThemedModal";
import ThemedText from "@/components/ThemedText";
import Iconicons from "@expo/vector-icons/Ionicons";

interface SelectProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  position: string;
  label: string;
  multiple: string;
  onChange: (value: string) => void;
}

const Select = forwardRef<View, SelectProps>(
  ({ options, label, value, multiple, onChange, position }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const backgroundColor = useThemeColor({}, "card");
    const textColor = useThemeColor({}, "text");
    const borderColor = useThemeColor({}, "border");
    const placeholderColor = useThemeColor({}, "placeholder");
    const iconColor = useThemeColor({}, "icon");
    let selects = [];

    const onSelected = (item) => {
      if (multiple) {
        const exist = value?.find((f) => f === item);
        const filtered = value?.filter((f) => f !== item) || [];
        const newList = exist ? filtered : [...filtered, item];

        onChange(newList);
      } else {
        onChange(item);
      }
      setModalVisible(false);
    };
    return (
      <View className="flex-1 py-2">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View className="flex-row items-center">
            <Text
              className="flex-1"
              style={{
                color: value ? textColor : placeholderColor,
              }}
            >
              {multiple
                ? (value && `${value.length} items selected`) || "Select Item"
                : (options && options.find((o) => o.value === value)?.label) ||
                  label}
            </Text>
            <Iconicons
              name="chevron-down"
              size={20}
              color={iconColor}
            />
          </View>
        </TouchableOpacity>

        <ThemedModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          position={position}
        >
          <FlatList
            data={options}
            keyExtractor={(item, index) => `${item.value}${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: value?.includes(item?.value)
                    ? iconColor
                    : backgroundColor,
                }}
                className={`h-14 justify-center my-1 py-2 px-2 rounded-lg flex-row items-center`}
                onPress={() => onSelected(item.value)}
              >
                <ThemedText
                  className="flex-1 capitalize font-semibold "
                  style={{
                    color: value?.includes(item?.value) ? "#ffffff" : textColor,
                  }}
                >
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </ThemedModal>
      </View>
    );
  }
);

export default Select;
