export const paymentMethods = [
    {
        name: "Visa",
        slug: "visa",
        image: require("@/assets/images/visa.png"),
        description:
            "A popular method using credit cards issued by banks to make payments online or in-store."
    },
    {
        name: "Master card",
        slug: "master_card",
        image: require("@/assets/images/mastercard.jpg"),
        description:
            "A popular method using credit cards issued by banks to make payments online or in-store."
    },
    {
        name: "PayPal",
        slug: "paypal",
        image: require("@/assets/images/paypal.png"),
        description:
            "An online payment system that allows users to make payments securely using their email address and password."
    },
    {
        name: "Apple Pay",
        slug: "apple_pay",
        image: require("@/assets/images/apple.jpg"),
        description:
            "A mobile payment service allowing users to make payments using their Apple devices."
    },
    {
        name: "Google Pay",
        slug: "google_pay",
        image: require("@/assets/images/google.png"),
        description:
            "A digital wallet platform by Google for fast, easy, and secure payments on Android devices."
    },
    {
        name: "American Express",
        slug: "american_express",
        image: require("@/assets/images/american.png"),
        description:
            "A digital wallet platform by Google for fast, easy, and secure payments on Android devices."
    },
    {
        name: "Bank Transfer",
        slug: "bank_transfer",
        image: require("@/assets/images/bank.jpg"),
        description:
            "Direct transfer of funds from one bank account to another for payments."
    },
    {
        name: "Bitcoin",
        slug: "bitcoin",
        image: require("@/assets/images/bitcoin.png"),
        description:
            "A decentralized digital currency allowing peer-to-peer transactions without a central authority."
    },
    {
        name: "Stripe",
        slug: "stripe",
        image: require("@/assets/images/stripe.png"),
        description:
            "A comprehensive payment platform that allows businesses to accept online payments with various methods."
    },
    {
        name: "Amazon Pay",
        slug: "amazon_pay",
        image: require("@/assets/images/amazon.jpg"),
        description:
            "A payment service that lets users make payments using their Amazon accounts."
    }
];
export const insurance_list = [
    {
        _id: "insuranceid1",
        name: "No Insurance",
        description:
            "Basic insurance coverage that meets legal requirements but includes high deductibles.",

        coverage: {
            third_party_liability: false,
            collision_damage: false,
            theft_protection: false,
            personal_accident: false,
            deductible: "High"
        }
    },
    {
        _id: "insuranceid2",
        name: "Standard Coverage",
        description:
            "Basic insurance coverage that meets legal requirements but includes high deductibles.",

        coverage: {
            third_party_liability: true,
            collision_damage: false,
            theft_protection: false,
            personal_accident: false,
            deductible: "High"
        }
    },
    {
        _id: "insuranceid3",
        name: "Full Protection",
        description:
            "Comprehensive coverage that minimizes out-of-pocket expenses for damage or theft.",

        coverage: {
            third_party_liability: true,
            collision_damage: true,
            theft_protection: true,
            personal_accident: true,
            deductible: "Low or None"
        }
    },
    {
        _id: "insuranceid4",
        name: "Personal Accident Insurance (PAI)",
        description:
            "Covers medical expenses for the driver and passengers in case of an accident.",

        coverage: {
            third_party_liability: false,
            collision_damage: false,
            theft_protection: false,
            personal_accident: true,
            deductible: "Not Applicable"
        }
    },
    {
        _id: "insuranceid5",
        name: "Collision Damage Waiver (CDW)",
        description:
            "Reduces financial responsibility for damage to the rental car, excluding theft.",

        coverage: {
            third_party_liability: false,
            collision_damage: true,
            theft_protection: false,
            personal_accident: false,
            deductible: "Reduced"
        }
    },
    {
        _id: "insuranceid6",
        name: "Loss Damage Waiver (LDW)",
        description:
            "Covers damage and theft of the rental car, usually with a reduced deductible.",

        coverage: {
            third_party_liability: false,
            collision_damage: true,
            theft_protection: true,
            personal_accident: false,
            deductible: "Low or None"
        }
    },
    {
        _id: "insuranceid7",
        name: "Supplemental Liability Insurance (SLI)",
        description:
            "Provides higher liability limits for damages caused to third parties.",

        coverage: {
            third_party_liability: true,
            collision_damage: false,
            theft_protection: false,
            personal_accident: false,
            deductible: "Not Applicable"
        }
    },
    {
        _id: "insuranceid8",
        name: "Roadside Assistance Protection",
        description:
            "Covers emergency services such as towing, flat tires, jump-starts, and lockouts.",

        coverage: {
            third_party_liability: false,
            collision_damage: false,
            theft_protection: false,
            personal_accident: false,
            roadside_assistance: true,
            deductible: "Not Applicable"
        }
    }
];
export const top_providers = [
    {
        id: "all",
        name: "all providers"
    },
    {
        id: "alamo",
        name: "alamo",
        image: require("@/assets/images/alamo.gif")
    },
    {
        id: "bidvest",
        name: "bidvest",
        image: require("@/assets/images/bidvest.gif")
    },
    {
        id: "carhire",
        name: "carhire",
        image: require("@/assets/images/carhire.gif")
    },
    {
        id: "dollar",
        name: "dollar",
        image: require("@/assets/images/dollar.gif")
    },
    {
        id: "eurocar",
        name: "eurocar",
        image: require("@/assets/images/europcar.gif")
    },
    {
        id: "sixt",
        name: "sixt",
        image: require("@/assets/images/sixt.gif")
    },
    {
        id: "thrifty",
        name: "thrifty",
        image: require("@/assets/images/thrifty.gif")
    }
];
export const onboardingMetaData = {
    car_owner: {
        title: "Rent Out Your Car, Earn Effortlessly",
        description:
            "Turn your personal car into a source of income. List your vehicle, connect with renters, and enjoy hassle-free earnings!"
    },
    driver: {
        title: "Drive & Earn on Your Terms",
        description:
            "Get behind the wheel and start making money. Enjoy flexible schedules and reliable trips—your journey to financial freedom begins here!"
    },
    company: {
        title: "Expand Your Fleet, Maximize Profits",
        description:
            "Grow your car rental business by listing multiple vehicles, reaching more renters, and increas your revenue with ease."
    }
};
export const profiles = [
    {
        id: "1",
        title: "Renter",
        link: "(root)",
        image: "https://images.pexels.com/photos/11139416/pexels-photo-11139416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description:
            "Looking to rent a car or hire a professional driver? Choose this option to find the perfect ride or driver for your needs."
    },
    {
        id: "2",
        title: "Driver",
        link: "onboard?role=driver",
        image: "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description:
            "Ready to offer your driving services? Join as a driver and connect with clients seeking reliable transportation."
    },
    {
        id: "3",
        title: "Car Owner",
        link: "onboard?role=car_owner",
        image: "https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description:
            "Own a car you'd like to rent out? List your vehicle and start earning effortlessly."
    },
    {
        id: "4",
        title: "Company",
        link: "onboard?role=company",
        image: "https://images.pexels.com/photos/11139416/pexels-photo-11139416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description:
            "Manage a fleet of cars or drivers? Register your company to streamline rentals and driver management."
    }
];
export const intro = [
    {
        id: "1",
        image: "https://images.pexels.com/photos/11139416/pexels-photo-11139416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Discover the Perfect Car for Every Journey",
        description:
            "Browse a wide range of vehicles tailored to fit your travel needs, from quick city drives to long road trips."
    },
    {
        id: "2",
        image: "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Book Your Rental Car in Minutes ",
        description:
            "Seamlessly search, select, and reserve your car with just a few taps—no long waits, no hassle."
    },
    {
        id: "3",
        image: "https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Drive Anywhere with Comfort and Confidence",
        description:
            "Experience stress-free rentals with reliable vehicles, flexible options, and 24/7 customer support wherever you go."
    }
];

export const users = [
    // User 1 (Personal Renter)
    {
        _id: "user1id",
        full_name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        salt: "salt123",
        phone_number: "+2347032345678",
        profile_image: {
            secure_url: "https://picsum.photos/200?random=1",
            format: "jpg",
            size: 120234,
            public_id: "john_doe"
        },
        nin: "NIN1234567890",
        bvn: "BVN1234567890",
        location: { address: "123 Main St, Lagos", lat: 6.5244, lng: 3.3792 },
        wallet_balance: 5000,
        subscription: "free",
        subscription_expires_at: null,
        verified: true,
        verification_status: "approved",
        verification_notes: "",
        referral_code: "REF12345",
        referred_by: null,
        notification_preferences: {
            email: true,
            sms: false,
            push_notifications: true
        },
        device_tokens: ["user_device_token_1"],
        user_type: "personal_renter"
    },

    // User 2 (Personal Renter)
    {
        _id: "owner2id",
        full_name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password234",
        salt: "salt234",
        phone_number: "+2347012345678",
        profile_image: {
            secure_url: "https://picsum.photos/200?random=2",
            format: "jpg",
            size: 130345,
            public_id: "jane_smith"
        },
        rating: 4.0,
        review_count: 8977,
        nin: "NIN2233445566",
        bvn: "BVN2233445566",
        location: {
            address: "456 Park Avenue, Abuja",
            lat: 9.0575,
            lng: 7.4953
        },
        wallet_balance: 7000,
        subscription: "premium",
        subscription_expires_at: new Date("2025-06-01"),
        verified: true,
        verification_status: "approved",
        verification_notes: "",
        referral_code: "REF67890",
        referred_by: null,
        notification_preferences: {
            email: true,
            sms: true,
            push_notifications: true
        },
        device_tokens: ["user_device_token_2"],
        user_type: "personal_renter"
    },

    // User 5 (Personal Renter)
    {
        _id: "owner1id",
        full_name: "David Taylor",
        email: "david.taylor@example.com",
        password: "password567",
        salt: "salt567",
        phone_number: "+2347098765432",
        profile_image: {
            secure_url: "https://picsum.photos/200?random=9",
            format: "jpg",
            size: 128234,
            public_id: "david_taylor"
        },
        rating: 4.7,
        review_count: 4207,
        nin: "NIN5566778899",
        bvn: "BVN5566778899",
        location: {
            address: "789 Sunset Boulevard, Lagos",
            lat: 6.5248,
            lng: 3.379
        },
        wallet_balance: 6000,
        subscription: "premium",
        subscription_expires_at: new Date("2025-05-01"),
        verified: false,
        verification_status: "pending",
        verification_notes: "Pending verification",
        referral_code: "REF11234",
        referred_by: "user1id",
        notification_preferences: {
            email: false,
            sms: true,
            push_notifications: true
        },
        device_tokens: ["user_device_token_5"],
        user_type: "personal_renter"
    },
    {
        _id: "driver1id",
        last_name: "Walker",
        first_name: "Carlos",
        gender: "male",
        email: "carlos.walker@driver.com",
        phone_number: "+2347011112345",
        country: "Nigeria",
        state: "Lagos",
        address: "123 Old Road, Lagos",
        user_type: "driver",
        account_name: "Carlos Walker",
        account_number: "1234567890",
        bank_name: "First Bank",
        license: "DL123456",
        experience: 5,
        hourly_rate: 3000,
        km_rate: 50,
        car_types: ["sedan", "SUV"],
        profile_image: {
            secure_url: "https://picsum.photos/200?random=10",
            format: "jpg",
            size: 122345,
            public_id: "carlos_walker"
        },
        location: { lat: 6.5242, lng: 3.3795 },
        verified: true,
        driver_status: "active",
        rating: 4.7,
        review_count: 4207,
        notification_preferences: {
            email: false,
            sms: true,
            push_notifications: true
        },
        device_tokens: ["driver_device_token_1"]
    },
    {
        _id: "driver2id",
        last_name: "Turner",
        first_name: "Sophia",
        gender: "female",
        email: "sophia.turner@driver.com",
        phone_number: "+2347011122334",
        country: "Nigeria",
        state: "Abuja",
        address: "456 River Road, Abuja",
        user_type: "driver",
        account_name: "Sophia Turner",
        account_number: "2345678901",
        bank_name: "GTBank",
        license: "DL234567",
        experience: 3,
        hourly_rate: 2800,
        km_rate: 45,
        car_types: ["hatchback", "coupe"],
        profile_image: {
            secure_url: "https://picsum.photos/200?random=11",
            format: "jpg",
            size: 130456,
            public_id: "sophia_turner"
        },
        location: { lat: 9.0577, lng: 7.4957 },
        verified: true,
        driver_status: "active",
        rating: 4.9,
        review_count: 7807,
        notification_preferences: {
            email: true,
            sms: false,
            push_notifications: true
        },
        device_tokens: ["driver_device_token_2"]
    },
    {
        _id: "driver3id",
        last_name: "Green",
        first_name: "Aaron",
        gender: "male",
        email: "aaron.green@premiumdriver.com",
        phone_number: "+2347022334455",
        country: "Nigeria",
        state: "Lagos",
        address: "789 Central Ave, Lagos",
        user_type: "driver",
        account_name: "Aaron Green",
        account_number: "3456789012",
        bank_name: "Zenith Bank",
        license: "DL345678",
        experience: 7,
        hourly_rate: 3500,
        km_rate: 55,
        car_types: ["SUV", "convertible"],
        profile_image: {
            secure_url: "https://picsum.photos/200?random=12",
            format: "jpg",
            size: 124567,
            public_id: "aaron_green"
        },
        location: { lat: 6.5247, lng: 3.3798 },
        verified: true,
        driver_status: "active",
        rating: 3.8,
        review_count: 1007,
        notification_preferences: {
            email: true,
            sms: true,
            push_notifications: true
        },
        device_tokens: ["driver_device_token_3"]
    },
    {
        _id: "driver4id",
        last_name: "Brown",
        first_name: "Liam",
        gender: "male",
        email: "liam.brown@driver.com",
        phone_number: "+2347012233445",
        country: "Nigeria",
        state: "Abuja",
        address: "1015 Highway 9, Abuja",
        user_type: "driver",
        account_name: "Liam Brown",
        account_number: "4567890123",
        bank_name: "Access Bank",
        license: "DL456789",
        experience: 2,
        hourly_rate: 2500,
        km_rate: 40,
        car_types: ["pickup", "van"],
        profile_image: {
            secure_url: "https://picsum.photos/200?random=13",
            format: "jpg",
            size: 121345,
            public_id: "liam_brown"
        },
        location: { lat: 9.0565, lng: 7.4932 },
        verified: false,
        driver_status: "inactive",
        rating: 4.3,
        review_count: 507,
        notification_preferences: {
            email: false,
            sms: true,
            push_notifications: true
        },
        device_tokens: ["driver_device_token_4"]
    },
    {
        _id: "driver5id",
        last_name: "King",
        first_name: "Olivia",
        gender: "female",
        email: "olivia.king@premiumdriver.com",
        phone_number: "+2347056789012",
        country: "Nigeria",
        state: "Lagos",
        address: "2024 Oak Street, Lagos",
        user_type: "driver",
        account_name: "Olivia King",
        account_number: "5678901234",
        bank_name: "UBA",
        license: "DL567890",
        experience: 6,
        hourly_rate: 3200,
        km_rate: 52,
        car_types: ["wagon", "coupe"],
        profile_image: {
            secure_url: "https://picsum.photos/200?random=14",
            format: "jpg",
            size: 120567,
            public_id: "olivia_king"
        },
        location: { lat: 6.5234, lng: 3.3801 },
        verified: true,
        driver_status: "active",
        rating: 4.6,
        review_count: 90007,
        notification_preferences: {
            email: true,
            sms: true,
            push_notifications: false
        },
        device_tokens: ["driver_device_token_5"]
    },
    // Company 1
    {
        _id: "company1id",
        company_name: "Speedy Logistics",
        email: "contact@speedylogistics.com",
        phone_number: "+2347023456789",
        location: {
            address: "12 Logistics Park, Lagos",
            lat: 6.5244,
            lng: 3.3792
        },
        rating: 4.5,
        review_count: 8707,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=15",
            format: "jpg",
            size: 130123,
            public_id: "speedy_logistics_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=16",
            format: "jpg",
            size: 124567,
            public_id: "speedy_logistics_license"
        },
        company_registration_number: "SL123456",
        business_address: "12 Logistics Park, Lagos",
        bank_details: {
            account_name: "Speedy Logistics Ltd",
            account_number: "9876543210",
            bank_name: "Zenith Bank"
        },
        verified: true
    },

    // Company 2
    {
        _id: "company2id",
        company_name: "Quick Delivery",
        email: "contact@quickdelivery.com",
        phone_number: "+2347034567890",
        location: {
            address: "22 Delivery Lane, Abuja",
            lat: 9.0582,
            lng: 7.4958
        },
        rating: 3.8,
        review_count: 9407,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=11",
            format: "jpg",
            size: 121234,
            public_id: "quick_delivery_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=18",
            format: "jpg",
            size: 119345,
            public_id: "quick_delivery_license"
        },
        company_registration_number: "QD123456",
        business_address: "22 Delivery Lane, Abuja",
        bank_details: {
            account_name: "Quick Delivery Ltd",
            account_number: "1234567890",
            bank_name: "First Bank"
        },
        verified: false
    },

    // Company 3
    {
        _id: "company3id",
        company_name: "Elite Movers",
        email: "support@elitemovers.com",
        phone_number: "+2347023456789",
        location: {
            address: "5 Industrial Estate, Enugu",
            lat: 6.4444,
            lng: 7.5105
        },
        rating: 3.9,
        review_count: 707,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=19",
            format: "jpg",
            size: 121234,
            public_id: "elite_movers_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=20",
            format: "jpg",
            size: 123445,
            public_id: "elite_movers_license"
        },
        company_registration_number: "EM123456",
        business_address: "5 Industrial Estate, Enugu",
        bank_details: {
            account_name: "Elite Movers Ltd",
            account_number: "1112223334",
            bank_name: "GTBank"
        },
        verified: true
    },

    // Company 4
    {
        _id: "company4id",
        company_name: "Fast Freight",
        email: "contact@fastfreight.com",
        phone_number: "+2347034561234",
        location: {
            address: "9 Freight Plaza, Ibadan",
            lat: 7.3751,
            lng: 3.9472
        },
        rating: 4.3,
        review_count: 5607,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=21",
            format: "jpg",
            size: 132456,
            public_id: "fast_freight_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=22",
            format: "jpg",
            size: 128567,
            public_id: "fast_freight_license"
        },
        company_registration_number: "FF123456",
        business_address: "9 Freight Plaza, Ibadan",
        bank_details: {
            account_name: "Fast Freight Ltd",
            account_number: "8765432109",
            bank_name: "UBA"
        },
        verified: true
    },

    // Company 5
    {
        _id: "company5id",
        company_name: "Safe Transit",
        email: "info@safetransit.com",
        phone_number: "+2347039876543",
        location: { address: "24 Safe Road, Kano", lat: 12.0021, lng: 8.5987 },
        rating: 4.4,
        review_count: 1607,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=23",
            format: "jpg",
            size: 140123,
            public_id: "safe_transit_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=24",
            format: "jpg",
            size: 135678,
            public_id: "safe_transit_license"
        },
        company_registration_number: "ST123456",
        business_address: "24 Safe Road, Kano",
        bank_details: {
            account_name: "Safe Transit Ltd",
            account_number: "2345678901",
            bank_name: "Access Bank"
        },
        verified: false
    },

    // Company 6
    {
        _id: "company6id",
        company_name: "Royal Logistics",
        email: "contact@royallogistics.com",
        phone_number: "+2347012345678",
        location: {
            address: "15 Logistics Avenue, Port Harcourt",
            lat: 4.7521,
            lng: 7.0623
        },
        rating: 3.7,
        review_count: 607,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=25",
            format: "jpg",
            size: 122123,
            public_id: "royal_logistics_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=26",
            format: "jpg",
            size: 124678,
            public_id: "royal_logistics_license"
        },
        company_registration_number: "RL123456",
        business_address: "15 Logistics Avenue, Port Harcourt",
        bank_details: {
            account_name: "Royal Logistics Ltd",
            account_number: "5556667778",
            bank_name: "Stanbic IBTC"
        },
        verified: true
    },

    // Company 7
    {
        _id: "company7id",
        company_name: "Next Gen Transport",
        email: "support@nextgentransport.com",
        phone_number: "+2347087654321",
        location: { address: "33 Gen Road, Benin", lat: 6.3511, lng: 5.6217 },
        rating: 3.7,
        review_count: 8804,
        company_logo: {
            secure_url: "https://picsum.photos/200?random=27",
            format: "jpg",
            size: 120112,
            public_id: "nextgen_transport_logo"
        },
        business_license: {
            secure_url: "https://picsum.photos/200?random=28",
            format: "jpg",
            size: 118467,
            public_id: "nextgen_transport_license"
        },
        company_registration_number: "NG123456",
        business_address: "33 Gen Road, Benin",
        bank_details: {
            account_name: "Next Gen Transport Ltd",
            account_number: "9876543210",
            bank_name: "Fidelity Bank"
        },
        verified: false
    }
];

export const cars = [
    {
        _id: "car1id",
        user_id: "company1id",
        make: "Tesla",
        model: "Model S",
        year: 2022,
        car_type: "sedan",
        fuel_type: "electric",
        transmission: "automatic",
        mileage: 12000,
        seats: 5,
        doors: 4,
        color: "black",
        price_per_day: 150,
        availability_status: true,
        next_available_date: null,
        insurance: [
            { _id: "insuranceid1", price_per_day: 0 },
            { _id: "insuranceid2", price_per_day: 29.99 },
            { _id: "insuranceid3", price_per_day: 7.99 },
            { _id: "insuranceid4", price_per_day: 19.99 },
            { _id: "insuranceid5", price_per_day: 24.99 },
            { _id: "insuranceid6", price_per_day: 12.99 },
            { _id: "insuranceid7", price_per_day: 5.99 }
        ],
        mileage_policy: {
            _id: "mileage_policy1",
            type: "limited",
            daily_limit: 250,
            extra_mile_charge: 0.3,
            description:
                "Includes 250 miles per day. Additional miles are charged at $0.30 per mile."
        },
        fuel_policy: [
            {
                _id: "fuel_policy1",
                type: "full_to_full",
                name: "Full-to-Full Policy",
                description:
                    "The car is provided with a full tank, and the renter must return it full. If not returned full, a refueling fee and the cost of missing fuel will be charged.",
                penalty_fee: 20,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy2",
                type: "prepaid_fuel",
                name: "Prepaid Fuel Policy",
                description:
                    "The renter pays for a full tank upfront and does not need to refill before returning the car. No refunds for unused fuel.",
                prepaid_cost: 60,
                no_refund: true
            },
            {
                _id: "fuel_policy3",
                type: "same_to_same",
                name: "Same-to-Same Policy",
                description:
                    "The car is provided with a specific fuel level at pickup. The renter must return it at the same level, or they will be charged for the missing fuel plus a service fee.",
                service_fee: 10,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy4",
                type: "free_fuel",
                name: "Unlimited Fuel Policy",
                description:
                    "Fuel is included in the rental price. The renter does not need to refuel before returning the car.",
                included_in_price: true
            },
            {
                _id: "fuel_policy5",
                type: "electric_charge_policy",
                name: "EV Charging Policy",
                description:
                    "The electric vehicle must be returned with at least 80% battery charge. If not, a charging fee applies.",
                minimum_return_charge: 80,
                charging_fee: 25
            }
        ],
        confirmation_policy: [
            {
                _id: "confirmation_policy3",
                type: "pre_approval",
                name: "Pre-Approval Confirmation",
                requirements:
                    "Customer must upload additional documents such as insurance proof or passport before confirmation.",
                security_deposit: 300,
                description:
                    "Approval is required from the rental company before the booking is confirmed."
            }
        ],
        cancellation_policy: [
            {
                _id: "free_cancellation",
                description: "Free cancellation up to 48 hours before pickup.",
                refund_percentage: 100
            },
            {
                _id: "partial_refund",
                description: "Cancellation between 24-48 hours before pickup.",
                refund_percentage: 50
            },
            {
                _id: "last_minute_cancellation",
                description: "Cancellation less than 24 hours before pickup.",
                refund_percentage: 0
            },
            {
                _id: "no_show",
                description:
                    "No refund if the vehicle is not picked up within 3 hours of the scheduled time.",
                refund_percentage: 0
            }
        ],
        pickup_options: [
            {
                _id: "pickup_option1",
                type: "location_pickup",
                display_name: "Downtown Los Angeles Rental Center",
                lat: 34.0522,
                lng: -118.2437,
                extra: 0,
                description:
                    "Pick up the vehicle from our downtown rental center during business hours."
            },
            {
                _id: "pickup_option2",
                type: "home_delivery",
                display_name: "Customer Address",
                extra: 30,
                description:
                    "We deliver the vehicle to your specified location within a 10-mile radius."
            },
            {
                _id: "pickup_option3",
                type: "airport_pickup",
                display_name: "LAX Airport Terminal 4",
                lat: 33.9416,
                lng: -118.4085,
                extra: 25,
                description: "Pick up the vehicle at LAX Terminal 4 Parking."
            }
        ],
        dropoff_options: [
            {
                _id: "dropoff_location1",
                display_name: "Downtown Los Angeles Rental Center",
                lat: 34.0522,
                lng: -118.2437,
                extra: 0
            },
            {
                _id: "dropoff_location2",
                display_name: "Hollywood Boulevard Drop-off",
                lat: 34.1015,
                lng: -118.3269,
                extra: 15
            },
            {
                _id: "dropoff_location3",
                display_name: "Santa Monica Beach Drop-off",
                lat: 34.0195,
                lng: -118.4912,
                extra: 25
            }
        ],
        featured_image: {
            secure_url: require("@/assets/images/car1.jpg"),
            format: "image/jpeg",
            size: 350000,
            public_id: "tesla_model_s_1_featured"
        },
        images: [
            {
                secure_url: require("@/assets/images/car5.jpg"),
                format: "image/jpeg",
                size: 320000,
                public_id: "tesla_model_s_1_image1"
            },
            {
                secure_url: require("@/assets/images/car2.jpg"),
                format: "image/jpeg",
                size: 340000,
                public_id: "tesla_model_s_1_image2"
            },
            {
                secure_url: require("@/assets/images/car7.jpg"),
                format: "image/jpeg",
                size: 360000,
                public_id: "tesla_model_s_1_image3"
            },
            {
                secure_url: require("@/assets/images/car1.jpg"),
                format: "image/jpeg",
                size: 330000,
                public_id: "tesla_model_s_1_image4"
            },
            {
                secure_url: require("@/assets/images/car6.jpg"),
                format: "image/jpeg",
                size: 355000,
                public_id: "tesla_model_s_1_image5"
            },
            {
                secure_url: require("@/assets/images/car3.jpg"),
                format: "image/jpeg",
                size: 345000,
                public_id: "tesla_model_s_1_image6"
            },
            {
                secure_url: require("@/assets/images/car8.jpg"),
                format: "image/jpeg",
                size: 350000,
                public_id: "tesla_model_s_1_image7"
            }
        ],
        maintenance_records: [
            {
                _id: "maintenance1",
                type: "battery_check",
                name: "Battery Check",
                date: "2023-10-01",
                description: "Checked battery health and charged.",
                cost: 100
            }
        ],
        documents: {
            registration: {
                secure_url: require("@/assets/documents/pdf1.pdf"),
                format: "application/pdf",
                size: 200000,
                public_id: "tesla_model_s_registration"
            },
            insurance: {
                secure_url: require("@/assets/documents/pdf3.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "tesla_model_s_insurance"
            },
            inspection: {
                secure_url: require("@/assets/documents/pdf2.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "tesla_model_s_inspection"
            }
        },
        extra_services: [
            {
                _id: "extra1",
                name: "Premium Interior",
                extra: 50,
                description:
                    "Upgraded interior with luxury seating and custom lighting."
            },
            {
                _id: "extra2",
                name: "GPS Navigation",
                extra: 20,
                description:
                    "Built-in navigation system with live traffic updates."
            }
        ],
        drivers: ["driver2id", "driver1id", "driver3id"],
        pending_drivers: ["driver1id"]
    },
    {
        _id: "car2id",
        user_id: "company2id",
        make: "BMW",
        model: "X5",
        year: 2021,
        car_type: "SUV",
        fuel_type: "gasoline",
        transmission: "automatic",
        mileage: 30000,
        seats: 5,
        doors: 4,
        color: "white",
        price_per_day: 180,
        availability_status: false,
        next_available_date: "2024-03-15",
        insurance: [
            { _id: "insuranceid1", price_per_day: 0 },
            { _id: "insuranceid2", price_per_day: 19.99 }
        ],
        mileage_policy: {
            _id: "mileage_policy2",
            type: "unlimited",
            description: "Unlimited mileage included."
        },
        fuel_policy: [
            {
                _id: "fuel_policy1",
                type: "full_to_full",
                name: "Full-to-Full Policy",
                description:
                    "The car is provided with a full tank, and the renter must return it full. If not returned full, a refueling fee and the cost of missing fuel will be charged.",
                penalty_fee: 20,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy2",
                type: "prepaid_fuel",
                name: "Prepaid Fuel Policy",
                description:
                    "The renter pays for a full tank upfront and does not need to refill before returning the car. No refunds for unused fuel.",
                prepaid_cost: 60,
                no_refund: true
            },
            {
                _id: "fuel_policy3",
                type: "same_to_same",
                name: "Same-to-Same Policy",
                description:
                    "The car is provided with a specific fuel level at pickup. The renter must return it at the same level, or they will be charged for the missing fuel plus a service fee.",
                service_fee: 10,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy4",
                type: "free_fuel",
                name: "Unlimited Fuel Policy",
                description:
                    "Fuel is included in the rental price. The renter does not need to refuel before returning the car.",
                included_in_price: true
            },
            {
                _id: "fuel_policy5",
                type: "electric_charge_policy",
                name: "EV Charging Policy",
                description:
                    "The electric vehicle must be returned with at least 80% battery charge. If not, a charging fee applies.",
                minimum_return_charge: 80,
                charging_fee: 25
            }
        ],
        confirmation_policy: [
            {
                _id: "confirmation_policy2",
                type: "instant",
                name: "Instant Confirmation",
                security_deposit: 500,
                description: "No approval needed, book instantly."
            }
        ],
        cancellation_policy: [
            {
                _id: "free_cancellation",
                description: "Free cancellation up to 24 hours before pickup.",
                refund_percentage: 100
            }
        ],
        pickup_options: [
            {
                _id: "pickup_option1",
                type: "airport_pickup",
                display_name: "JFK Airport Terminal 1",
                lat: 40.6413,
                lng: -73.7781,
                extra: 30,
                description: "Pickup at JFK Terminal 1."
            }
        ],
        dropoff_options: [
            {
                _id: "dropoff_location1",
                display_name: "Manhattan Drop-off",
                lat: 40.7831,
                lng: -73.9712,
                extra: 25
            }
        ],
        featured_image: {
            secure_url: require("@/assets/images/car2.jpg"),
            format: "image/jpeg",
            size: 350000,
            public_id: "bmw_x5_2_featured"
        },
        images: [
            {
                secure_url: require("@/assets/images/car1.jpg"),
                format: "image/jpeg",
                size: 340000,
                public_id: "bmw_x5_2_image1"
            },
            {
                secure_url: require("@/assets/images/car3.jpg"),
                format: "image/jpeg",
                size: 360000,
                public_id: "bmw_x5_2_image2"
            }
        ],
        maintenance_records: [],
        documents: {
            registration: {
                secure_url: require("@/assets/documents/pdf1.pdf"),
                format: "application/pdf",
                size: 200000,
                public_id: "bmw_x5_registration"
            },
            insurance: {
                secure_url: require("@/assets/documents/pdf3.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "bmw_x5_insurance"
            },
            inspection: {
                secure_url: require("@/assets/documents/pdf2.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "bmw_x5_inspection"
            }
        },
        extra_services: [
            {
                _id: "extra1",
                name: "Child Seat",
                extra: 15,
                description: "Baby seat for children up to 3 years old."
            }
        ],
        drivers: ["driver3id"],
        pending_drivers: []
    },
    {
        _id: "car3id",
        user_id: "owner1id",
        make: "Toyota",
        model: "Camry",
        year: 2020,
        car_type: "sedan",
        fuel_type: "hybrid",
        transmission: "automatic",
        mileage: 25000,
        seats: 5,
        doors: 4,
        color: "silver",
        price_per_day: 90,
        availability_status: true,
        next_available_date: null,
        insurance: [{ _id: "insuranceid3", price_per_day: 8.99 }],
        mileage_policy: {
            _id: "mileage_policy3",
            type: "limited",
            daily_limit: 200,
            extra_mile_charge: 0.25,
            description: "200 miles per day, extra miles at $0.25 each."
        },
        fuel_policy: [
            {
                _id: "fuel_policy1",
                type: "full_to_full",
                name: "Full-to-Full Policy",
                description:
                    "The car is provided with a full tank, and the renter must return it full. If not returned full, a refueling fee and the cost of missing fuel will be charged.",
                penalty_fee: 20,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy2",
                type: "prepaid_fuel",
                name: "Prepaid Fuel Policy",
                description:
                    "The renter pays for a full tank upfront and does not need to refill before returning the car. No refunds for unused fuel.",
                prepaid_cost: 60,
                no_refund: true
            },
            {
                _id: "fuel_policy3",
                type: "same_to_same",
                name: "Same-to-Same Policy",
                description:
                    "The car is provided with a specific fuel level at pickup. The renter must return it at the same level, or they will be charged for the missing fuel plus a service fee.",
                service_fee: 10,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy4",
                type: "free_fuel",
                name: "Unlimited Fuel Policy",
                description:
                    "Fuel is included in the rental price. The renter does not need to refuel before returning the car.",
                included_in_price: true
            },
            {
                _id: "fuel_policy5",
                type: "electric_charge_policy",
                name: "EV Charging Policy",
                description:
                    "The electric vehicle must be returned with at least 80% battery charge. If not, a charging fee applies.",
                minimum_return_charge: 80,
                charging_fee: 25
            }
        ],
        confirmation_policy: [
            {
                _id: "confirmation_policy4",
                type: "pending",
                name: "Pending Confirmation",
                requirements:
                    "The booking remains pending until full payment is verified.",
                security_deposit: 150,
                description:
                    "If payment is not completed within 12 hours, the reservation may be canceled."
            }
        ],
        cancellation_policy: [
            {
                _id: "free_cancellation",
                description: "Free cancellation up to 24 hours before pickup.",
                refund_percentage: 100
            }
        ],
        pickup_options: [
            {
                _id: "pickup_option1",
                type: "home_delivery",
                display_name: "Customer Address",
                extra: 20,
                description: "Delivery available within a 15-mile radius."
            }
        ],
        dropoff_options: [],
        featured_image: {
            secure_url: require("@/assets/images/car3.jpg"),
            format: "image/jpeg",
            size: 350000,
            public_id: "toyota_camry_3_featured"
        },
        images: [
            {
                secure_url: require("@/assets/images/car5.jpg"),
                format: "image/jpeg",
                size: 320000,
                public_id: "toyota_camry_3_image1"
            },
            {
                secure_url: require("@/assets/images/car8.jpg"),
                format: "image/jpeg",
                size: 355000,
                public_id: "toyota_camry_3_image2"
            }
        ],
        documents: {
            registration: {
                secure_url: require("@/assets/documents/pdf1.pdf"),
                format: "application/pdf",
                size: 200000,
                public_id: "toyota_camry_registration"
            },
            insurance: {
                secure_url: require("@/assets/documents/pdf3.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "toyota_camry_insurance"
            },
            inspection: {
                secure_url: require("@/assets/documents/pdf2.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "toyota_camry_inspection"
            }
        },
        extra_services: [
            {
                _id: "extra1",
                name: "WiFi Hotspot",
                extra: 10,
                description: "In-car WiFi available for unlimited usage."
            }
        ],
        drivers: [],
        pending_drivers: ["driverid5"]
    },
    {
        _id: "car4id",
        user_id: "company3id",
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2022,
        car_type: "sedan",
        fuel_type: "gasoline",
        transmission: "automatic",
        mileage: 22000,
        seats: 5,
        doors: 4,
        color: "black",
        price_per_day: 140,
        availability_status: true,
        next_available_date: null,
        insurance: [{ _id: "insuranceid4", price_per_day: 14.99 }],
        mileage_policy: {
            _id: "mileage_policy4",
            type: "limited",
            daily_limit: 250,
            extra_mile_charge: 0.3,
            description: "250 miles per day, $0.30 per extra mile."
        },
        fuel_policy: [
            {
                _id: "fuel_policy1",
                type: "full_to_full",
                name: "Full-to-Full Policy",
                description:
                    "The car is provided with a full tank, and the renter must return it full. If not returned full, a refueling fee and the cost of missing fuel will be charged.",
                penalty_fee: 20,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy2",
                type: "prepaid_fuel",
                name: "Prepaid Fuel Policy",
                description:
                    "The renter pays for a full tank upfront and does not need to refill before returning the car. No refunds for unused fuel.",
                prepaid_cost: 60,
                no_refund: true
            },
            {
                _id: "fuel_policy3",
                type: "same_to_same",
                name: "Same-to-Same Policy",
                description:
                    "The car is provided with a specific fuel level at pickup. The renter must return it at the same level, or they will be charged for the missing fuel plus a service fee.",
                service_fee: 10,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy4",
                type: "free_fuel",
                name: "Unlimited Fuel Policy",
                description:
                    "Fuel is included in the rental price. The renter does not need to refuel before returning the car.",
                included_in_price: true
            },
            {
                _id: "fuel_policy5",
                type: "electric_charge_policy",
                name: "EV Charging Policy",
                description:
                    "The electric vehicle must be returned with at least 80% battery charge. If not, a charging fee applies.",
                minimum_return_charge: 80,
                charging_fee: 25
            }
        ],
        confirmation_policy: [
            {
                _id: "confirmation_policy4",
                type: "pending",
                name: "Pending Confirmation",
                requirements:
                    "The booking remains pending until full payment is verified.",
                security_deposit: 150,
                description:
                    "If payment is not completed within 12 hours, the reservation may be canceled."
            }
        ],
        pickup_options: [
            {
                _id: "pickup_option2",
                type: "rental_center",
                display_name: "Downtown Rental Hub",
                lat: 34.0522,
                lng: -118.2437,
                extra: 0,
                description: "Pickup available at downtown rental center."
            }
        ],
        dropoff_options: [
            {
                _id: "dropoff_location2",
                display_name: "Los Angeles International Airport (LAX)",
                lat: 33.9416,
                lng: -118.4085,
                extra: 35
            }
        ],
        featured_image: {
            secure_url: require("@/assets/images/car4.jpg"),
            format: "image/jpeg",
            size: 365000,
            public_id: "mercedes_cclass_4_featured"
        },
        images: [
            {
                secure_url: require("@/assets/images/car6.jpg"),
                format: "image/jpeg",
                size: 355000,
                public_id: "mercedes_cclass_4_image1"
            },
            {
                secure_url: require("@/assets/images/car2.jpg"),
                format: "image/jpeg",
                size: 370000,
                public_id: "mercedes_cclass_4_image2"
            }
        ],
        documents: {
            registration: {
                secure_url: require("@/assets/documents/pdf1.pdf"),
                format: "application/pdf",
                size: 200000,
                public_id: "mercedes_cclass_registration"
            },
            insurance: {
                secure_url: require("@/assets/documents/pdf3.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "mercedes_cclass_insurance"
            },
            inspection: {
                secure_url: require("@/assets/documents/pdf2.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "mercedes_cclass_inspection"
            }
        },
        extra_services: [
            {
                _id: "extra2",
                name: "GPS Navigation",
                extra: 12,
                description: "Premium GPS navigation system."
            }
        ],
        drivers: ["driverid6"],
        pending_drivers: []
    },
    {
        _id: "car5id",
        user_id: "owner2id",
        make: "Tesla",
        model: "Model Y",
        year: 2023,
        car_type: "SUV",
        fuel_type: "electric",
        transmission: "automatic",
        mileage: 12000,
        seats: 5,
        doors: 4,
        color: "blue",
        price_per_day: 200,
        availability_status: false,
        next_available_date: "2024-04-01",
        insurance: [{ _id: "insuranceid5", price_per_day: 20.99 }],
        mileage_policy: {
            _id: "mileage_policy5",
            type: "unlimited",
            description: "Unlimited mileage included for electric vehicles."
        },
        fuel_policy: [
            {
                _id: "fuel_policy1",
                type: "full_to_full",
                name: "Full-to-Full Policy",
                description:
                    "The car is provided with a full tank, and the renter must return it full. If not returned full, a refueling fee and the cost of missing fuel will be charged.",
                penalty_fee: 20,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy2",
                type: "prepaid_fuel",
                name: "Prepaid Fuel Policy",
                description:
                    "The renter pays for a full tank upfront and does not need to refill before returning the car. No refunds for unused fuel.",
                prepaid_cost: 60,
                no_refund: true
            },
            {
                _id: "fuel_policy3",
                type: "same_to_same",
                name: "Same-to-Same Policy",
                description:
                    "The car is provided with a specific fuel level at pickup. The renter must return it at the same level, or they will be charged for the missing fuel plus a service fee.",
                service_fee: 10,
                fuel_price_per_liter: 1.5
            },
            {
                _id: "fuel_policy4",
                type: "free_fuel",
                name: "Unlimited Fuel Policy",
                description:
                    "Fuel is included in the rental price. The renter does not need to refuel before returning the car.",
                included_in_price: true
            },
            {
                _id: "fuel_policy5",
                type: "electric_charge_policy",
                name: "EV Charging Policy",
                description:
                    "The electric vehicle must be returned with at least 80% battery charge. If not, a charging fee applies.",
                minimum_return_charge: 80,
                charging_fee: 25
            }
        ],
        confirmation_policy: [
            {
                _id: "confirmation_policy1",
                type: "instant",
                name: "Instant Confirmation",
                requirements:
                    "Valid driver’s license and credit card required at pickup.",
                security_deposit: 200,
                description:
                    "Booking is confirmed immediately after payment. A $200 refundable deposit is required at pickup."
            }
        ],
        pickup_options: [
            {
                _id: "pickup_option3",
                type: "supercharger_station",
                display_name: "Tesla Supercharger - SF",
                lat: 37.7749,
                lng: -122.4194,
                extra: 10,
                description: "Pickup at Tesla Supercharger in San Francisco."
            }
        ],
        dropoff_options: [
            {
                _id: "dropoff_location3",
                display_name: "San Francisco International Airport (SFO)",
                lat: 37.6213,
                lng: -122.379,
                extra: 30
            }
        ],
        featured_image: {
            secure_url: require("@/assets/images/car5.jpg"),
            format: "image/jpeg",
            size: 380000,
            public_id: "tesla_modely_5_featured"
        },
        images: [
            {
                secure_url: require("@/assets/images/car7.jpg"),
                format: "image/jpeg",
                size: 390000,
                public_id: "tesla_modely_5_image1"
            },
            {
                secure_url: require("@/assets/images/car8.jpg"),
                format: "image/jpeg",
                size: 400000,
                public_id: "tesla_modely_5_image2"
            }
        ],
        documents: {
            registration: {
                secure_url: require("@/assets/documents/pdf1.pdf"),
                format: "application/pdf",
                size: 200000,
                public_id: "tesla_modely_registration"
            },
            insurance: {
                secure_url: require("@/assets/documents/pdf3.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "tesla_modely_insurance"
            },
            inspection: {
                secure_url: require("@/assets/documents/pdf2.pdf"),
                format: "application/pdf",
                size: 300000,
                public_id: "tesla_modely_inspection"
            }
        },
        extra_services: [
            {
                _id: "extra3",
                name: "Autopilot Access",
                extra: 50,
                description: "Full self-driving capabilities enabled."
            }
        ],
        drivers: ["driverid8"],
        pending_drivers: ["driverid9"]
    }
];

export const comfirmation_policy = [
    {
        _id: "confirmation_policy1",
        type: "instant",
        name: "Instant Confirmation",
        requirements:
            "Valid driver’s license and credit card required at pickup.",
        security_deposit: 200,
        description:
            "Booking is confirmed immediately after payment. A $200 refundable deposit is required at pickup."
    },
    {
        _id: "confirmation_policy2",
        type: "manual",
        name: "Manual Confirmation (On Request)",
        requirements:
            "Booking request is reviewed before approval. Confirmation is sent via email within 24 hours.",
        security_deposit: 0,
        description:
            "Payment is charged only after approval. The rental company will review and approve the request."
    },
    {
        _id: "confirmation_policy3",
        type: "pre_approval",
        name: "Pre-Approval Confirmation",
        requirements:
            "Customer must upload additional documents such as insurance proof or passport before confirmation.",
        security_deposit: 300,
        description:
            "Approval is required from the rental company before the booking is confirmed."
    },
    {
        _id: "confirmation_policy4",
        type: "pending",
        name: "Pending Confirmation",
        requirements:
            "The booking remains pending until full payment is verified.",
        security_deposit: 150,
        description:
            "If payment is not completed within 12 hours, the reservation may be canceled."
    },
    {
        _id: "confirmation_policy5",
        type: "guaranteed",
        name: "Guaranteed Reservation",
        requirements:
            "The vehicle is guaranteed as long as the renter arrives within 3 hours of the scheduled pickup.",
        security_deposit: 250,
        description:
            "Late arrivals must notify the rental company in advance to keep the booking valid."
    },
    {
        _id: "confirmation_policy6",
        type: "non_guaranteed",
        name: "Non-Guaranteed Reservation",
        requirements:
            "The vehicle is held for a limited period (e.g., 1 hour before pickup).",
        security_deposit: 0,
        description:
            "If demand is high, the booking may be canceled without charge."
    },
    {
        _id: "confirmation_policy7",
        type: "waitlist",
        name: "Waitlist Confirmation",
        requirements:
            "If no vehicles are available, the renter is placed on a waitlist.",
        security_deposit: 0,
        description: "Confirmation is given when a car becomes available."
    }
];
