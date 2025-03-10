// Car Types

export const CAR_TYPES = [
    "Sedan",
    "Coupe",
    "Hatchback",
    "Convertible",
    "SUV",
    "Crossover",
    "Pickup Truck",
    "Wagon",
    "Van",
    "Minivan",
    "Roadster",
    "Supercar",
    "Hypercar",
    "Luxury Car",
    "Muscle Car",
    "Off-Road Vehicle",
    "Electric Vehicle",
    "Hybrid",
    "Sports Car",
    "Limousine",
    "Microcar",
    "Kei Car",
    "Cabriolet",
    "Targa",
    "Shooting Brake",
    "Fastback",
    "Ute",
    "City Car",
    "Phaeton",
    "Landaulet",
    "Crossover Coupe",
    "Panel Van",
    "Chauffeur Car",
    "Dune Buggy",
    "Touring Car",
    "Coachbuilt Car",
    "Luton Van",
    "Tank Car"
];
export const CAR_BRANDS = [
    "Acura",
    "Audi",
    "Bentley",
    "BMW",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Fiat",
    "Ford",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Lexus",
    "Lincoln",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Porsche",
    "Rolls-Royce",
    "Scion",
    "Smart",
    "Subaru",
    "Toyota",
    "Volkswagen",
    "Volvo"
];

// Fuel Types
export const FUEL_TYPES = ["petrol", "diesel", "electric", "hybrid"];

// Transmissions
export const TRANSMISSIONS = ["automatic", "manual"];
//Insurance Types
export const INSURANCE_TYPES = [
    "no_insurance",
    "standard_coverage",
    "full_protection",
    "personal_accident_insurance",
    "collision_damage_waiver",
    "loss_damage_waiver",
    "supplemental_liability_insurance",
    "roadside_assistance_protection"
];
// Mileage Types
export const MILEAGE_TYPES = ["limited", "unlimited"];

// Fuel Policies
export const FUEL_POLICIES = [
    "full_to_full",
    "same_to_same",
    "prepaid_fuel",
    "free_fuel",
    "electric_charge_policy"
];

// Confirmation Policies
export const CONFIRMATION_POLICIES = [
    "instant",
    "manual",
    "pre_approval",
    "pending",
    "guaranteed",
    "non_guaranteed",
    "waitlist"
];

// Cancellation Policies
export const CANCELLATION_POLICIES = [
    "free_cancellation",
    "partial_refund",
    "last_minute_cancellation",
    "no_show"
];

// Pickup & Dropoff Types
export const PICKUP_TYPES = [
    "home_delivery",
    "location_pickup",
    "airport_pickup",
    "pickup_station"
];

// Subscription Types
export const SUBSCRIPTION_TYPES = ["free", "basic", "premium"];

// Verification Statuses
export const VERIFICATION_STATUSES = ["pending", "verified", "rejected"];

// Driver Statuses
export const DRIVER_STATUSES = ["active", "inactive", "suspended"];

// User Role
export const USER_ROLE = ["user", "admin"];

export default {
    USER_ROLE,
    DRIVER_STATUSES,
    VERIFICATION_STATUSES,
    SUBSCRIPTION_TYPES,
    PICKUP_TYPES,
    CAR_TYPES,
    CANCELLATION_POLICIES,
    CONFIRMATION_POLICIES,
    TRANSMISSIONS,
    MILEAGE_TYPES,
    FUEL_TYPES,
    FUEL_POLICIES,
    INSURANCE_TYPES
};
