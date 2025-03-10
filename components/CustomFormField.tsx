import { View } from "react-native";
import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import Skeleton from "@/components/Skeleton";
import Suggestion from "@/components/Suggestion";
import OtpInput from "@/components/OtpInput";
import Checkbox from "@/components/Checkbox";
import PhoneInput from "@/components/PhoneInput";
import ThemedText from "@/components/ThemedText";
import PasswordValidator from "@/components/PasswordValidator";
import FilePicker from "@/components/FilePicker";
import { Controller } from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Icon from "@expo/vector-icons";

// Enum for form field types
export enum FormFieldType {
  INPUT = "input",
  OTP_INPUT = "otp_input",
  PHONE_INPUT = "phone_input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  SKELETON = "skeleton",
  SELECT = "select",
  SUGGESTION = "suggestion",
  FILE = "file",
}

interface CustomFormFieldProps {
  control: any;
  name: string;
  label?: string;
  inputMode?: string;
  multiple?: boolean;
  placeholder?: string;
  fieldType: FormFieldType;
  instruction?: string;
  options?: { label: string; value: string }[];
  LeftIcon?: keyof typeof Icon;
  RightIcon?: keyof typeof Icon;
  leftIconName?: string;
  rightIconName?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  iconSize?: number;
}

// RenderField component
const RenderField = ({
  fieldType,
  fieldProps,
}: {
  fieldType: FormFieldType;
  fieldProps: any;
}) => {
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <Input
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.OTP_INPUT:
      return (
        <OtpInput
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.SELECT:
      return (
        <Select
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.SUGGESTION:
      return (
        <Suggestion
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.SKELETON:
      return (
        <Skeleton
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.TEXTAREA:
      return (
        <TextArea
          {...fieldProps}
          className="flex-1"
        />
      );
    case FormFieldType.CHECKBOX:
      return <Checkbox {...fieldProps} />;
    case FormFieldType.FILE:
      return (
        <FilePicker
          {...fieldProps}
          className="flex-1"
        />
      );
    default:
      return null;
  }
};

// CustomFormField Component
const CustomFormField = ({
  control,
  name,
  label,
  LeftIcon,
  RightIcon,
  leftIconName,
  rightIconName,
  onPressLeftIcon,
  onPressRightIcon,
  iconSize = 20,
  fieldType,
  ...otherProps
}: CustomFormFieldProps) => {
  const backgroundColor = useThemeColor({}, "field");
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "border");

  // Only render icons if they are provided and exist in @expo/vector-icons
  const LIcon = LeftIcon && Icon[LeftIcon] ? Icon[LeftIcon] : Icon["Ionicons"];
  const RIcon =
    RightIcon && Icon[RightIcon] ? Icon[RightIcon] : Icon["Ionicons"];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <View className="py-2">
          {/* Label */}
          {label && fieldType !== FormFieldType.CHECKBOX && (
            <ThemedText
              className="capitalize"
              type="semibold"
            >
              {label}
            </ThemedText>
          )}

          {/* Input Field Container */}

          <View
            style={{
              backgroundColor: [FormFieldType.CHECKBOX].includes(fieldType)
                ? ""
                : backgroundColor,
            }}
            className={`flex-row items-center px-3 rounded-lg 
                        ${
                          fieldType === FormFieldType.TEXTAREA
                            ? "h-44"
                            : fieldType === FormFieldType.FILE
                            ? ""
                            : "h-14"
                        }`}
          >
            {/* Left Icon */}
            {LIcon && leftIconName && (
              <LIcon
                name={leftIconName}
                size={iconSize}
                color={iconColor}
                onPress={onPressLeftIcon}
                className="mr-2"
              />
            )}

            <RenderField
              fieldType={fieldType}
              fieldProps={{
                ...field,
                ...otherProps,
                label,
              }}
            />

            {/* Right Icon */}
            {RIcon && rightIconName && (
              <RIcon
                name={rightIconName}
                size={iconSize}
                color={iconColor}
                onPress={onPressRightIcon}
                className="ml-2"
              />
            )}
          </View>

          {/* Password Validator */}
          {name === "password" && <PasswordValidator password={field.value} />}

          {/* Error Message */}
          {error && (
            <ThemedText
              className="text-red-500"
              type="error"
            >
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
};

export default CustomFormField;
