import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  type TouchableOpacityProps,
  type TextProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TouchableOpacityProps &
  TextProps & {
    children?: React.ReactNode;
    onPress: () => void;
    darkColor?: string;
    leftIcon?: React.ReactNode;
    lightColor?: string;
    title: string;
    rightIcon?: React.ReactNode;
    type?: "default" | "filled" | "outline";
    style?: object; // Allow custom styles
  };

const ThemedButton = ({
  title,
  onPress,
  style,
  textStyle,
  lightColor,
  darkColor,
  children,
  leftIcon,
  rightIcon,
  type = "default",
  ...otherProps
}: ThemedButtonProps) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type ? type : ""
  );
  const buttonColor = useThemeColor({}, "button");
  const borderColor = useThemeColor({}, "border");
  const iconColor = useThemeColor({}, "icon");
  const textColor = useThemeColor({}, "text");

  return (
    <TouchableOpacity
      className="rounded-md "
      onPress={onPress}
      style={[
        styles.button,
        styles[type](backgroundColor, borderColor),
        style, // Allow external styles
      ]}
      {...otherProps}
    >
      {leftIcon && (
        <View style={styles.icon}>
          {React.cloneElement(leftIcon as React.ReactElement, {
            color: iconColor,
          })}
        </View>
      )}

      <Text
        style={[
          styles.text,
          {
            color: ["outline", "ghost"].includes(type)
              ? textColor
              : buttonColor,
          },
          textStyle,
        ]}
      >
        {title || children}
      </Text>

      {rightIcon && (
        <View style={styles.icon}>
          {React.cloneElement(rightIcon as React.ReactElement, {
            color: iconColor,
          })}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    // borderRadius: 10,
    maxHeight: 50,
    minHeight: 50,
    marginVertical: 4,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
    paddingHorizontal: 8,
  },
  icon: {
    marginHorizontal: 4,
  },

  // Button Variants
  default: (backgroundColor: string) => ({
    backgroundColor,
  }),
  filled: (backgroundColor: string) => ({
    backgroundColor,
  }),
  outline: (_: string, borderColor: string) => ({
    borderWidth: 1,
    borderColor,
    backgroundColor: "transparent",
  }),
  ghost: (backgroundColor: string) => ({
    backgroundColor,
  }),
  none: () => {},
});

export default ThemedButton;
