import React, { useState } from "react";
import { View, Alert, ScrollView, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "expo-router";

import OAuths from "@/components/OAuths";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import ScreenLoader from "@/components/ScreenLoader";
import ThemedButton from "@/components/ThemedButton";
import GoBack from "@/components/GoBack";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { toastMessage } from "@/lib/utils";

// Schema & Hooks
import { authSchema, AuthSchemaType } from "@/lib/schema";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSigninMutation } from "@/redux/auth/authApiSlice";
const SignIn: React.FC = () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const [signin, { isLoading }] = useSigninMutation();
  const { height } = Dimensions.get("window");
  const color = useThemeColor({}, "primary");
  const backgroundColor = useThemeColor({}, "background");
  const method = useForm<AuthSchemaType>({
    resolver: zodResolver(
      authSchema.pick({ email: true, password: true, otp: true })
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control, handleSubmit, reset } = method;
  process.env.EXPO_PUBLIC_API_BASE_URL;
  const onSubmit = async (value: AuthSchemaType) => {
    const { data, error } = await signin(value);
    console.log("value", process.env.EXPO_PUBLIC_API_BASE_URL, error);
    if (error) {
      toastMessage(error?.error || error?.data?.message, "error");
    }
    // router.replace("")
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor }}
        className="h-full px-2 py-2"
      >
        <GoBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="items-center w-full my-4">
            <ThemedText
              className="text-center text-2xl font-bold"
              type="title"
            >
              Welcome back 👋
            </ThemedText>
            <ThemedText
              className="text-center text-sm text-gray-500 mt-1"
              type="subtitle"
            >
              Log into your account
            </ThemedText>
          </View>

          <View className="flex-1">
            {/* Name Field */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={control}
              name="email"
              label="email"
              placeholder="john@example.com"
              iconSize={16}
              leftIconName="key"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              secureTextEntry={togglePassword}
              control={control}
              name="password"
              label="password"
              placeholder="********"
              leftIconName="key"
              rightIconName={togglePassword ? "eye-off" : "eye"}
              onPressRightIcon={() => setTogglePassword((prev) => !prev)}
            />
            <View className="flex-row items-center space-x-2">
              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={control}
                name="remember"
                label={
                  <View
                    className="flex-row items-center
                                justify-between"
                  >
                    <ThemedText>Remember me</ThemedText>
                    <Link
                      href="forgot"
                      className="text-right"
                      style={{ color }}
                    >
                      Forgot password?
                    </Link>
                  </View>
                }
              />
            </View>

            <View className="items-center space-y-4">
              <View className="flex-row items-center space-x-1">
                <ThemedText>Don't have an account?</ThemedText>
                <Link
                  style={{ color }}
                  href="sign-up"
                  navigate
                >
                  Sign Up
                </Link>
              </View>

              <View className="flex-row items-center w-full">
                <View className="h-[1px] bg-gray-300 flex-1" />
                <ThemedText>Or Continue With</ThemedText>
                <View className="h-[1px] bg-gray-300 flex-1" />
              </View>
              <OAuths />
            </View>
          </View>
        </ScrollView>
        {/* Submit Button */}
        <ThemedButton
          title="Sign In"
          textStyle={{ color: "white" }}
          onPress={handleSubmit(onSubmit)}
          // type="ghost"
        />
      </SafeAreaView>
      {isLoading && (
        <ScreenLoader
          title="signing you in"
          messages="please
            wait..."
        />
      )}
    </>
  );
};

export default SignIn;
