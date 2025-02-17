import { z } from "zod";

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
    terms: z.literal(true, {
        errorMap: () => ({
            message: "You must accept the terms and conditions"
        })
    }),
    remember: z.boolean().optional(),
    otp: z.string("Invalid OTP Code").optional()
});

export type AuthSchemaType = z.infer<typeof authSchema>;

// ** Base Schema (Fields required for all users) **
const baseUserSchema = z.object({
    last_name: z.string().min(1, "Full name is required").trim(),
    first_name: z.string().min(1, "Full name is required").trim(),
    phone_number: z.string().min(10, "Phone number is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    address: z.string().min(1, "Address is required"),
    user_type: z.enum(["car_owner", "company", "driver"]),
    account_name: z.string().min(1, "Account name is required"),
    account_number: z.string().min(1, "Account number is required"),
    bank_name: z.string().min(1, "Bank name is required")
});

// ** Company Renter Schema (Extra fields) **
const companyRenterSchema = baseUserSchema.extend({
    user_type: z.literal("company"),
    company_name: z.string().min(1, "Company name is required"),
    company_logo: z.string().optional(),
    company_license: z.string().min(1, "Company license is required"),
    company_registration_number: z
        .string()
        .min(1, "Company registration is required"),
    company_address: z.string().min(1, "Business address is required")
});

// ** Driver Schema (Extra fields) **
const driverSchema = baseUserSchema.extend({
    user_type: z.literal("driver"),
    license: z.string().min(1, "License is required"),
    experience: z.number().min(1, "Experience years is required"),
    hourly_rate: z.number().min(0, "Hourly rate is required"),
    km_rate: z.number().min(0, "Km rate is required"),
    car_types: z.array(z.string()).min(1, "At least one car type is required"),
    emergency_contact: z.object({
        name: z.string().min(1, "Emergency contact name is required"),
        phone: z.string().min(10, "Emergency contact phone is required"),
        relationship: z.string().min(1, "Relationship is required")
    })
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
