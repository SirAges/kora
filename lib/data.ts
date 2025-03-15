export const home_sections = [];
export const reportIssues = [
    {
        id: 1,
        category: "Accidents & Breakdowns",
        description: "Report a vehicle breakdown or accident.",
        steps: [
            "Contact emergency support via the in-app button.",
            "Call the vehicle owner or rental company.",
            "Provide details (location, issue, any damage)."
        ],
        emergency_contacts: [
            { name: "Roadside Assistance", phone: "+1234567890" },
            { name: "Insurance Provider", phone: "+0987654321" }
        ],
        resolution_process: [
            "Support will assess the situation.",
            "Assistance will be provided based on the severity."
        ],
        showForm: true
    },
    {
        id: 2,
        category: "Lost Items",
        description: "Report a lost item after a trip.",
        steps: [
            "Select 'Report Lost Item'.",
            "Enter booking details (date, time, vehicle/driver info).",
            "Describe the lost item."
        ],
        resolution_process: [
            "If found, support will contact the user.",
            "Pickup or delivery options will be provided."
        ],

        showForm: true
    },
    {
        id: 3,
        category: "Payment Issues",
        description: "Report failed transactions or refund requests.",
        issues: [
            {
                type: "Failed Transaction",
                resolution_process: [
                    "Provide proof of payment.",
                    "Check wallet balance (if applicable)."
                ]
            },
            {
                type: "Refund Request",
                resolution_process: [
                    "Check cancellation refund eligibility.",
                    "Processing time for refunds."
                ]
            }
        ],
        resolution_process: [
            "Support will verify the transaction details.",
            "Refunds, if applicable, will be processed within the stated period."
        ],

        showForm: true
    },
    {
        id: 4,
        category: "Driver/Customer Complaints",
        description: "Report issues related to drivers or customers.",
        complaint_type: [
            "Rude behavior",
            "Reckless driving",
            "Harassment",
            "Unprofessional behavior"
        ],
        resolution_process: [
            "Investigation by the support team.",
            "Possible action against the driver/customer."
        ],

        showForm: true
    },
    {
        id: 5,
        category: "App & Booking Issues",
        description: "Report technical issues or booking problems.",
        issues: [
            {
                type: "App Errors & Crashes",
                steps: [
                    "Upload screenshots.",
                    "Provide details (device type, OS version)."
                ]
            },
            {
                type: "Booking Issues",
                steps: [
                    "Report double bookings, incorrect charges, or trip cancellations."
                ]
            }
        ],
        resolution_process: [
            "Technical team will review the issue.",
            "Fixes or clarifications will be provided."
        ],

        showForm: true
    }
];
export const faqs = [
    {
        id: 1,
        question: "How do I contact customer support?",
        answer: "You can reach customer support through live chat, email, or phone from the 'Help & Support' section."
    },
    {
        id: 2,
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards, mobile wallets, and bank transfers."
    },
    {
        id: 3,
        question: "How do I book a car?",
        answer: "To book a car, select your preferred vehicle, choose the rental period, and complete the payment process."
    },
    {
        id: 4,
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel your booking from the 'My Bookings' section. Cancellation fees may apply based on the timing."
    },
    {
        id: 5,
        question: "What happens if the car breaks down?",
        answer: "Contact support immediately through the app. We will assist with a replacement or necessary repairs."
    },
    {
        id: 6,
        question: "How do I register as a driver?",
        answer: "To register as a driver, go to the 'Driver Signup' section, fill in your details, upload required documents, and wait for approval."
    },
    {
        id: 7,
        question: "What documents do I need to register as a driver?",
        answer: "You need a valid driver's license, a national ID, proof of residence, and a recent passport photo."
    },
    {
        id: 8,
        question: "How do I receive payments as a driver?",
        answer: "Drivers receive payments directly into their registered bank accounts or mobile wallets on a weekly basis."
    },
    {
        id: 9,
        question: "How do I list my car for rental?",
        answer: "Go to 'List Your Car', provide the car details, upload photos, set the rental price, and submit for approval."
    },
    {
        id: 10,
        question: "What are the requirements for listing a car?",
        answer: "Your car must be in good condition, have valid insurance, and pass a safety inspection."
    },
    {
        id: 11,
        question: "How do I receive rental payments?",
        answer: "Payments for rentals will be transferred to your registered bank account after each successful booking."
    },
    {
        id: 12,
        question: "How can my company partner with the platform?",
        answer: "You can apply as a company through the 'Company Signup' section and submit the necessary business documents."
    },
    {
        id: 13,
        question: "Can my company list multiple vehicles?",
        answer: "Yes, companies can list multiple vehicles under one account and manage bookings efficiently."
    },
    {
        id: 14,
        question: "How does revenue sharing work for companies?",
        answer: "Revenue is split based on rental agreements, and payments are settled weekly or monthly."
    },
    {
        id: 15,
        question: "How does the wallet system work?",
        answer: "Renters and car owners have a wallet in the app to track their earnings from completed bookings."
    },
    {
        id: 16,
        question: "How often are earnings paid out?",
        answer: "Earnings are paid out weekly or monthly, based on your selected payout preference."
    },
    {
        id: 17,
        question: "Where can I see my earnings?",
        answer: "You can view your earnings in the 'Wallet' section of the app, showing completed transactions and upcoming payouts."
    }
];
export const promoCodes = [
    {
        name: "First Ride Free",
        slug: "first-ride-free",
        description:
            "Enjoy your first ride with us for free! Applicable to new users only.",
        image: require("@/assets/images/car3.jpg"),
        percentage: 0
    },
    {
        name: "Weekend Getaway",
        slug: "weekend-getaway",
        description:
            "Get 20% off on car rentals for weekend trips from Friday to Sunday.",
        image: require("@/assets/images/car5.jpg"),
        percentage: 20
    },
    {
        name: "Long Trip Discount",
        slug: "long-trip-discount",
        description:
            "Book for 3 days or more and get 15% off on your total fare.",
        image: require("@/assets/images/car6.jpg"),
        percentage: 15
    },
    {
        name: "Refer & Earn",
        slug: "refer-and-earn",
        description:
            "Refer a friend and both of you get 5% off your next ride.",
        image: require("@/assets/images/car5.jpg"),
        percentage: 5
    },
    {
        name: "Loyalty Reward",
        slug: "loyalty-reward",
        description:
            "Ride with us 5 times and get a free ride on your 6th booking.",
        image: require("@/assets/images/car8.jpg"),
        percentage: 0
    },
    {
        name: "Airport Transfer Deal",
        slug: "airport-transfer-deal",
        description: "Flat 10% off on airport pick-ups and drop-offs.",
        image: require("@/assets/images/car3.jpg"),
        percentage: 10
    },
    {
        name: "Driver Hire Discount",
        slug: "driver-hire-discount",
        description: "Get 5% off when you book a driver for 6 hours or more.",
        image: require("@/assets/images/car8.jpg"),
        percentage: 5
    },
    {
        name: "Holiday Special",
        slug: "holiday-special",
        description:
            "Enjoy a 25% discount on car rentals during festive seasons.",
        image: require("@/assets/images/car7.jpg"),
        percentage: 25
    },
    {
        name: "Corporate Booking Offer",
        slug: "corporate-booking-offer",
        description:
            "Special rates for businesses booking 3 or more cars at once.",
        image: require("@/assets/images/car4.jpg"),
        percentage: 10
    },
    {
        name: "Night Ride Savings",
        slug: "night-ride-savings",
        description:
            "Book a ride between 10 PM and 5 AM and get 12% off your fare.",
        image: require("@/assets/images/car3.jpg"),
        percentage: 12
    }
];

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
