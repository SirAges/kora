import { ReactNode } from "react";
import { View, Button, Text, ScrollView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";

import ThemedButton from "@/components/ThemedButton";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Select from "@/components/Select";
import FilePicker from "@/components/FilePicker";
import TextArea from "@/components/TextArea";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton"
}
interface FormField {
    id: string;
    input: "text" | "select" | "file" | "textarea" | "checkbox";
    name: string;
    label: string;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
    options?: { label: string; value: string }[];
}

interface FormProps {
    formSchema: any;
    FormSchemaType: any;
    onSubmit: (data: any) => void;
    defaultValues: any;
    formFields: FormField[];
    children: ReactNode;
}

export default function Form({ control, name, label }: FormProps) {
   
    const textColor = useThemeColor({}, "primary");
    const renderField = (field: FormField) => {
        switch (field.fieldType) {
            case FormFieldType.INPUT:
                return <Input key={field.id} control={control} {...field} />;

            case "select":
                return (
                    <Select
                        key={field.id}
                        control={control}
                        name={field.name}
                        label={field.label}
                        options={field.options || []}
                    />
                );

            case "file":
                return (
                    <FilePicker
                        key={field.id}
                        control={control}
                        name={field.name}
                        label={field.label}
                    />
                );

            case "textarea":
                return (
                    <TextArea
                        key={field.id}
                        control={control}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        numberOfLines={field.numberOfLines || 4}
                    />
                );

            case "checkbox":
                return (
                    <Checkbox key={field.id} control={control} {...field}>
                        <View className="flex-row items-center flex-1 px-2 space-x-1">
                            <ThemedText className="capitalize">
                                {field.label}
                            </ThemedText>
                            {field.id === "terms" && (
                                <Link href="terms">
                                    <ThemedText style={{ color: textColor }}>
                                        Terms and Conditions
                                    </ThemedText>
                                </Link>
                            )}
                        </View>
                    </Checkbox>
                );

            default:
                return null;
        }
    };

    return (
        <View className="flex-1 justify-center py-3">
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                }) => <RenderInput field={field} props={props} />}
            />
        </View>
    );
}
