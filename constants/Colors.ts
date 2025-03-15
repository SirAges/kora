/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#11181C",
        default: "#1BA7FF",
        primary: "#1BA7FF",
        danger: "#1BA7FF",
        button: "#f1faff",
        ghost: "#aedaf8",
        filled: "#1BA7FF",
        field: "#f8f8f8",
        background: "#f3f4f6",
        placeholder: "#023d62a1",
        border: "#1BA7FF",
        card: "#ffffff",
        icon: "#1BA7FF",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight
    },
    dark: {
        text: "#ECEDEE",
        default: "#5a5a5a",
        primary: "#1BA7FF",
        danger: "#1BA7FF",
        button: "#c4c4c4",
        filled: "#333333",
        field: "#5a5a5a",
        ghost: "#313131",
        background: "#151718",
        placeholder: "#b7b7b7",
        border: "#6a6a6a",
        card: "#3a3a3a",
        tint: tintColorDark,
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark
    }
};
