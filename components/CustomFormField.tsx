import { View, Text, StyleSheet } from "react-native";
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

export enum FormFieldType {
    INPUT = "input",
    OTP_INPUT = "otp_input",
    PHONE_INPUT = "phone_input",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    SKELETON = "skeleton",
    SELECT = "select",
    SUGGESTION = "suggestion",
    FILE = "file"
}

interface CustomFormFieldProps {
    control: any;
    name: string;
    label: string;
    placeholder?: string;
    fieldType: FormFieldType;
    options?: { label: string; value: string }[];
}

// RenderField component to manage the field rendering
const RenderField = ({
    fieldType,
    fieldProps
}: {
    fieldType: FormFieldType;
    fieldProps: any;
}) => {
    switch (fieldType) {
        case FormFieldType.INPUT:
            return <Input {...fieldProps} />;
        case FormFieldType.PHONE_INPUT:
            return <PhoneInput {...fieldProps} />;
        case FormFieldType.OTP_INPUT:
            return <OtpInput {...fieldProps} />;
        case FormFieldType.SELECT:
            return <Select {...fieldProps} />;
        case FormFieldType.SUGGESTION:
            return <Suggestion {...fieldProps} />;
        case FormFieldType.SKELETON:
            return <Skeleton {...fieldProps} />;
        case FormFieldType.TEXTAREA:
            return <TextArea {...fieldProps} />;
        case FormFieldType.CHECKBOX:
            return <Checkbox {...fieldProps} />;
        case FormFieldType.FILE:
            return <FilePicker {...fieldProps} />;
        default:
            return null;
    }
};

const CustomFormField = ({
    control,
    name,
    label,
    LeftIcon,
    RightIcon,
    rightIconName,
    leftIconName,
    onPressLeftIcon,
    onPressRightIcon,
    iconSize,
    fieldType,
    style,
    ...otherProps
}: CustomFormFieldProps) => {
    const backgroundColor = useThemeColor({}, "field");
    const iconColor = useThemeColor({}, "icon");
    const borderColor = useThemeColor({}, "border");
    const RIcon = RightIcon ? Icon[RightIcon] : Icon["Ionicons"];
    const LIcon = LeftIcon ? Icon[LeftIcon] : Icon["Ionicons"];

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <View className="flex-1 px-2">
                    {label && typeof label === "string" && (
                        <ThemedText className="capitalize" type="semibold">
                            {label}
                        </ThemedText>
                    )}

                    <View style={{ minHeight: 70 }}>
                        <View
                            style={[
                                !["checkbox", "skeleton", "file"].includes(
                                    fieldType
                                ) && {
                                    backgroundColor,
                                    maxHeight: 60 // Ensure field does not exceed max height
                                }
                            ]}
                            className="flex-row items-center py-2 px-2
                            rounded-md"
                        >
                            {LIcon && leftIconName && (
                                <LIcon
                                    name={leftIconName}
                                    size={iconSize || 20}
                                    color={iconColor}
                                    onPress={onPressLeftIcon}
                                />
                            )}
                            <RenderField
                                fieldType={fieldType}
                                fieldProps={{
                                    ...field,
                                    ...otherProps,
                                    label:
                                        typeof label === "string"
                                            ? undefined
                                            : label
                                }}
                            />
                            {RIcon && rightIconName && (
                                <RIcon
                                    name={rightIconName}
                                    size={iconSize || 20}
                                    color={iconColor}
                                    onPress={onPressRightIcon}
                                />
                            )}
                            {label && typeof label !== "string" && (
                                <View className="flex-1 ml-2">{label}</View>
                            )}
                        </View>
                    </View>

                    {name === "password" && (
                        <PasswordValidator password={field.value} />
                    )}

                    {error && (
                        <ThemedText className="" type="error">
                            {error.message}
                        </ThemedText>
                    )}
                </View>
            )}
        />
    );
};

export default CustomFormField;
