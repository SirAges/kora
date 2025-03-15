import { z } from "zod";
import {
    CAR_TYPES,
    FUEL_TYPES,
    TRANSMISSIONS,
    MILEAGE_TYPES,
    FUEL_POLICIES,
    CONFIRMATION_POLICIES,
    CANCELLATION_POLICIES,
    INSURANCE_TYPES
} from "../constants/enums";
// Regular Expressions

const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
// Password must be at least 8 characters, include uppercase, lowercase, number, and special character

export const authSchema = z.object({
    email: z.string().email("Invalid email address"),
    // Ensures proper domain format
    password: z
        .string()
        .regex(
            passwordRegex,
            "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        ),
    confirm_password: z.string().optional(),
    user_type: z.string(),
    id_card: z.string(),
    card_number: z.string(),
    terms: z.literal(true, {
        errorMap: () => ({
            message: "You must accept the terms and conditions"
        })
    }),
    remember: z.boolean().optional(),
    otp: z.string("Invalid OTP Code").optional()
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const FileSchema = z.object({
    mimeType: z.string(),
    name: z.string(),
    size: z.coerce.number().int().nonnegative(),
    uri: z.string().url().or(z.string()) // Accepts both URLs and file paths
});

// ** Base Schema (Fields required for all users) **
const baseUserSchema = z.object({
    phone: z.string().min(10, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required")
});

// ** Company Renter Schema (Extra fields) **
const companyRenterSchema = baseUserSchema.extend({
    user_type: z.literal("company"),
    company_name: z.string().min(1, "Company name is required"),
    company_logo: FileSchema.optional(),
    company_license: FileSchema,
    company_registration_number: z
        .string()
        .min(1, "Business address is required"),
    company_address: z.string().min(1, "Business address is required")
});

// ** Driver Schema (Extra fields) **
const driverSchema = baseUserSchema.extend({
    user_type: z.literal("driver"),
    profile_image: FileSchema,
    last_name: z.string().min(1, "Full name is required").trim(),
    first_name: z.string().min(1, "Full name is required").trim(),
    license: FileSchema,
    experience: z.coerce.number().min(1, "Experience years is required"),
    hourly_rate: z.coerce.number().min(0, "Hourly rate is required"),
    km_rate: z.coerce.number().min(0, "Km rate is required"),
    description: z.string().min(5, "let us know you briefly").max(200),
    car_types: z.array(z.string()).min(1, "At least one car type is required"),
 address: z.string().min(1, "Address is required"),
    emergency_name: z.string().min(1, "Emergency contact name is required"),
    emergency_phone: z.string().min(10, "Emergency contact phone is required"),
    emergency_relationship: z.string().min(1, "Relationship is required")
});

// ** Personal Renter Schema (Car Owner)**
const personalRenterSchema = baseUserSchema.extend({
    user_type: z.literal("car_owner"),
    profile_image: FileSchema,
    last_name: z.string().min(1, "Full name is required").trim(),
    first_name: z.string().min(1, "Full name is required").trim(), address: z.string().min(1, "Address is required")
});

const renterSchema = baseUserSchema.extend({
    user_type: z.literal("renter"),
    profile_image: FileSchema,
    last_name: z.string().min(1, "Full name is required").trim(),
    first_name: z.string().min(1, "Full name is required").trim(), address: z.string().min(1, "Address is required")
});

// ** Dynamic Schema Based on User Type **
export const onboardingSchema = z.discriminatedUnion("user_type", [
    personalRenterSchema,
    companyRenterSchema,
    driverSchema,
    renterSchema
]);

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;

export const locationSchema = z.object({
    pickup_location: z.object({
        display_name: z.string({ message: "display name is required" }),
        lat: z.coerce.number({ message: "latitude is required" }),
        lng: z.coerce.number({ message: "longitude is required" })
    }),
    dropoff_location: z.object({
        display_name: z.string({ message: "display name is required" }),
        lat: z.coerce.number({ message: "latitude is required" }),
        lng: z.coerce.number({ message: "longitude is required" })
    }),
    startDate: z.string({ message: "start date is required" }),
    endDate: z.string({ message: "end date is required" })
});
export type LocationSchemaType = z.infer<typeof locationSchema>;

const booleanKeys = ["include_in_price"]; // Define boolean fields

// Define a reusable policy schema
const PolicySchema = z.record(
    z.string(),
    z.record(z.string(), z.union([z.boolean(), z.coerce.number(), z.string()]))
);

// ** Car Schema **
export const carSchema = z.object({
    make: z.string().min(1, { message: "Car make is required" }),
    model: z.string().min(1, { message: "Car model is required" }),
    year: z.coerce
        .number()
        .min(1886, { message: "Year must be greater than 1886" })
        .max(new Date().getFullYear(), {
            message: "Year cannot be in the future"
        }),
    car_type: z.enum(CAR_TYPES),
    fuel_type: z.enum(FUEL_TYPES),

    location: z.object({
        display_name: z.string({ message: "display name is required" }),
        lat: z.coerce.number({ message: "latitude is required" }),
        lng: z.coerce.number({ message: "longitude is required" })
    }),
    transmission: z.enum(TRANSMISSIONS),
    mileage: z.coerce
        .number()
        .min(0, { message: "Mileage cannot be negative" }),
    seats: z.coerce.number().min(1, { message: "Seats cannot be less than 1" }),
    doors: z.coerce.number().min(1, { message: "Doors cannot be less than 1" }),
    color: z.string().min(1, { message: "Color is required" }),
    featured_image: FileSchema.optional(),
    images: z.array(FileSchema).optional(),
    price_per_day: z.coerce
        .number()
        .min(0, { message: "Price per day cannot be negative" }),

    insurance_policy: PolicySchema.optional(),
    mileage_policy: PolicySchema.optional(),
    fuel_policy: PolicySchema.optional(),
    confirmation_policy: PolicySchema.optional(),
    cancellation_policy: PolicySchema.optional(),
    registration_document: FileSchema,
    insurance_document: FileSchema,
    inspection_document: FileSchema,
    extra_services: z.string().optional()
});

export type CarSchemaType = z.infer<typeof carSchema>;
