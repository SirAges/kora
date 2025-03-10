import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import { selectCurrentDarkmode } from "@/redux/user/userSlice";
import { useSelector } from "react-redux";

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeProps = {},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const isDarkModeEnabled = useSelector(selectCurrentDarkmode);
  const systemTheme = useColorScheme() ?? "light";
  const theme: "light" | "dark" = isDarkModeEnabled ? "dark" : systemTheme;

  return props[theme] ?? Colors[theme][colorName];
}