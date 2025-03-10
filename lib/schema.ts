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

export const fileSchema = z.object({
    mimeType: z.string(),
    name: z.string(),
    size: z.coerce.number().int().nonnegative(),
    uri: z.string().url().or(z.string()) // Accepts both URLs and file paths
});

// ** Base Schema (Fields required for all users) **
const baseUserSchema = z.object({
    profile_image: fileSchema,
    last_name: z.string().min(1, "Full name is required").trim(),
    first_name: z.string().min(1, "Full name is required").trim(),
    phone: z.string().min(10, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    address: z.string().min(1, "Address is required"),

    account_name: z.string().min(1, "Account name is required"),
    account_number: z.string().min(1, "Account number is required"),
    account_bank: z.string().min(1, "Bank name is required")
});

// ** Company Renter Schema (Extra fields) **
const companyRenterSchema = baseUserSchema.extend({
    user_type: z.literal("company"),
    company_name: z.string().min(1, "Company name is required"),
    company_logo: fileSchema.optional(),
    company_license: fileSchema,
    company_registration_number: fileSchema,
    company_address: z.string().min(1, "Business address is required")
});

// ** Driver Schema (Extra fields) **
const driverSchema = baseUserSchema.extend({
    user_type: z.literal("driver"),
    license: fileSchema,
    experience: z.string().min(1, "Experience years is required"),
    hourly_rate: z.string().min(0, "Hourly rate is required"),
    km_rate: z.string().min(0, "Km rate is required"),
    car_types: z.array(z.string()).min(1, "At least one car type is required"),

    emergency_name: z.string().min(1, "Emergency contact name is required"),
    emergency_phone: z.string().min(10, "Emergency contact phone is required"),
    emergency_relationship: z.string().min(1, "Relationship is required")
});

// ** Personal Renter Schema (Car Owner)**
const personalRenterSchema = baseUserSchema.extend({
    user_type: z.literal("car_owner")
});

// ** Dynamic Schema Based on User Type **
export const onboardingSchema = z.discriminatedUnion("user_type", [
    personalRenterSchema,
    companyRenterSchema,
    driverSchema
]);

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;

export const locationSchema = z.object({
    pickup_location: z.object({
        display_name: z.string({ message: "display name is required" }),
        lat: z.number({ message: "latitude is required" }),
        lng: z.number({ message: "longitude is required" })
    }),
    dropoff_location: z.object({
        display_name: z.string({ message: "display name is required" }),
        lat: z.number({ message: "latitude is required" }),
        lng: z.number({ message: "longitude is required" })
    }),
    startDate: z.string({ message: "start date is required" }),
    endDate: z.string({ message: "end date is required" })
});
export type LocationSchemaType = z.infer<typeof locationSchema>;

// ** File Schema **
const FileSchema = z.object({
    secure_url: z.string().url({ message: "Document URL is required" }),
    format: z.literal("application/pdf"),
    size: z.coerce.number().min(0, { message: "File size cannot be negative" }),
    public_id: z.string().min(1, { message: "Document public ID is required" })
});

// ** Insurance Schema **
const InsuranceSchema = z.object({
    type: z.enum(INSURANCE_TYPES),
    price_per_day: z.coerce
        .number()
        .min(0, { message: "Price per day cannot be negative" })
});

// ** Extra Services Schema **
const ExtraSchema = z.object({
    name: z.string().min(1, { message: "Extra name is required" }),
    extra: z.coerce
        .number()
        .min(0, { message: "Extra cost cannot be negative" }),
    description: z.string().min(1, { message: "Description is required" })
});

// ** Mileage Policy Schema **
const MileagePolicySchema = z.object({
    type: z.enum(MILEAGE_TYPES),
    daily_limit: z.coerce.number().min(0).optional(),
    extra_mile_charge: z.coerce.number().min(0).optional(),
    description: z.string().optional()
});

// ** Fuel Policy Schema **
const FuelPolicySchema = z.object({
    type: z.enum(FUEL_POLICIES),
    prepaid_cost: z.coerce.number().min(0).optional(),
    no_refund: z.boolean().optional(),
    service_fee: z.coerce.number().min(0).optional(),
    fuel_price_per_liter: z.coerce.number().min(0).optional(),
    included_in_price: z.boolean().optional(),
    minimum_return_charge: z.coerce.number().min(0).optional(),
    charging_fee: z.coerce.number().min(0).optional(),
    penalty_fee: z.coerce.number().min(0).optional()
});

// ** Confirmation Policy Schema **
const ConfirmationPolicySchema = z.object({
    type: z.enum(CONFIRMATION_POLICIES),
    security_deposit: z.coerce.number().min(0).optional()
});

// ** Cancellation Policy Schema **
const CancellationPolicySchema = z.object({
    type: z.enum(CANCELLATION_POLICIES),
    refund_percentage: z.coerce.number().min(0).optional()
});

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

    insurance: z.array(InsuranceSchema).optional(),
    mileage_policy: MileagePolicySchema.optional(),
    fuel_policy: z.array(FuelPolicySchema).optional(),
    confirmation_policy: z.array(ConfirmationPolicySchema).optional(),
    cancellation_policy: z.array(CancellationPolicySchema).optional(),
    registration_document: FileSchema,
    insurance_document: FileSchema,
    inspection_document: FileSchema,
    extra_services: z.array(ExtraSchema).optional(),
    drivers: z.array(z.string()).optional(),
    pending_drivers: z.array(z.string()).optional()
});

export type CarSchemaType = z.infer<typeof carSchema>;
