import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export default ThemedView = ({
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedViewProps) => {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "card"
    );

    return (
        <View
            className=""
            style={[{ backgroundColor }, style]}
            {...otherProps}
        />
    );
};
