
const cars = [
    {
        user_id: "67d830fa0fc1f5e34fb05544",
        make: "Honda",
        model: "Civic",
        year: 2021,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 18000,
        seats: 5,
        doors: 4,
        color: "black",
        location: {
            display_name: "Abuja, Nigeria",
            lat: 9.0579,
            lng: 7.4951
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/16586238/pexels-photo-16586238/free-photo-of-tuned-honda-civic-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 215000,
            public_id: "honda_civic_2021"
        },
        images: [
            {
                secure_url:
                    "https://images.pexels.com/photos/2779447/pexels-photo-2779447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                format: "jpg",
                size: 102400,
                public_id: "honda_civic_interior"
            },
            {
                secure_url:
                    "https://images.pexels.com/photos/9661390/pexels-photo-9661390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                format: "jpg",
                size: 96000,
                public_id: "honda_civic_rear"
            }
        ],
        price_per_day: 14000,

        insurance_policy: {
            no_insurance: { price_per_day: "0" },
            standard_coverage: { price_per_day: "1200" },
            full_protection: { price_per_day: "2500" },
            personal_accident_insurance: { price_per_day: "900" },
            collision_damage_waiver: { price_per_day: "2300" },
            loss_damage_waiver: { price_per_day: "2500" },
            supplemental_liability_insurance: { price_per_day: "1700" },
            roadside_assistance_protection: { price_per_day: "1100" }
        },
        mileage_policy: {
            limited: {
                daily_limit: "180",
                extra_mile_charge: "45",
                description: "Extra charge applies after 180 miles."
            },
            unlimited: {
                daily_limit: "unlimited",
                extra_mile_charge: "0",
                description: "Drive as much as you want with no extra charge."
            }
        },
        fuel_policy: {
            full_to_full: {
                fuel_price_per_liter: "680",
                penalty_fee: "4700"
            },
            same_to_same: {
                fuel_price_per_liter: "700",
                minimum_return_charge: "4800"
            },
            prepaid_fuel: {
                prepaid_cost: "14000",
                no_refund: "true",
                service_fee: "1800"
            },
            free_fuel: { included_in_price: "true" },
            electric_charge_policy: { charging_fee: "2400" }
        },
        confirmation_policy: {
            instant: { security_deposit: "9000" },
            manual: { security_deposit: "14000" },
            pre_approval: { security_deposit: "19000" },
            pending: { security_deposit: "4000" },
            guaranteed: { security_deposit: "22000" },
            non_guaranteed: { security_deposit: "10000" },
            waitlist: { security_deposit: "7000" }
        },
        cancellation_policy: {
            free_cancellation: { refund_percentage: "100" },
            partial_refund: { refund_percentage: "50" },
            last_minute_cancellation: { refund_percentage: "20" },
            no_show: { refund_percentage: "0" }
        },
        registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "GPS, Sunroof, Heated Seats",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fd0fc1f5e34fb05586"],
        pending_drivers: ["67d830fe0fc1f5e34fb0559b"]
    },
    {
        user_id: "67d830fa0fc1f5e34fb05548",
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 15000,
        seats: 5,
        doors: 4,
        color: "white",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/19581626/pexels-photo-19581626/free-photo-of-raindrops-on-black-toyota-corolla.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 210000,
            public_id: "toyota_corolla_2022"
        },
        images: [
            {
                secure_url:
                    "https://images.pexels.com/photos/10147883/pexels-photo-10147883.jpeg",
                format: "jpg",
                size: 105000,
                public_id: "toyota_corolla_interior"
            },
            {
                secure_url:
                    "https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg",
                format: "jpg",
                size: 98000,
                public_id: "toyota_corolla_rear"
            }
        ],
        price_per_day: 16000,

        insurance_policy: {
            no_insurance: { price_per_day: "0" },
            standard_coverage: { price_per_day: "1300" },
            full_protection: { price_per_day: "2700" },
            personal_accident_insurance: { price_per_day: "1000" },
            collision_damage_waiver: { price_per_day: "2400" },
            loss_damage_waiver: { price_per_day: "2600" },
            supplemental_liability_insurance: { price_per_day: "1800" },
            roadside_assistance_protection: { price_per_day: "1200" }
        },
        mileage_policy: {
            limited: {
                daily_limit: "200",
                extra_mile_charge: "50",
                description: "Extra charge applies after 200 miles."
            },
            unlimited: {
                daily_limit: "unlimited",
                extra_mile_charge: "0",
                description: "Drive as much as you want with no extra charge."
            }
        },
        fuel_policy: {
            full_to_full: {
                fuel_price_per_liter: "700",
                penalty_fee: "5000"
            },
            same_to_same: {
                fuel_price_per_liter: "720",
                minimum_return_charge: "4900"
            },
            prepaid_fuel: {
                prepaid_cost: "15000",
                no_refund: "true",
                service_fee: "2000"
            },
            free_fuel: { included_in_price: "true" },
            electric_charge_policy: { charging_fee: "2500" }
        },
        confirmation_policy: {
            instant: { security_deposit: "9500" },
            manual: { security_deposit: "15000" },
            pre_approval: { security_deposit: "20000" },
            pending: { security_deposit: "5000" },
            guaranteed: { security_deposit: "23000" },
            non_guaranteed: { security_deposit: "11000" },
            waitlist: { security_deposit: "8000" }
        },
        cancellation_policy: {
            free_cancellation: { refund_percentage: "100" },
            partial_refund: { refund_percentage: "50" },
            last_minute_cancellation: { refund_percentage: "20" },
            no_show: { refund_percentage: "0" }
        },
        registration_document: {
            secure_url: "https://example.com/docs/registration_toyota.pdf",
            format: "pdf",
            size: 520000,
            public_id: "reg_doc_2022"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance_toyota.pdf",
            format: "pdf",
            size: 460000,
            public_id: "ins_doc_2022"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection_toyota.pdf",
            format: "pdf",
            size: 420000,
            public_id: "insp_doc_2022"
        },
        extra_services: "GPS, Bluetooth, Backup Camera",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05596",
        make: "Ford",
        model: "Focus",
        year: 2020,
        car_type: "hatchback",
        fuel_type: "diesel",
        transmission: "manual",
        mileage: 22000,
        seats: 5,
        doors: 4,
        color: "blue",
        location: {
            display_name: "Port Harcourt, Nigeria",
            lat: 4.8156,
            lng: 7.0498
        },
      
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/14607288/pexels-photo-14607288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 200000,
            public_id: "ford_focus_2020"
        },
        images: [
            {
                secure_url:
                    "https://images.pexels.com/photos/27561642/pexels-photo-27561642/free-photo-of-ford-focus-wallpaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                format: "jpg",
                size: 95000,
                public_id: "ford_focus_front"
            },
            
            {
                secure_url:
                    "https://images.pexels.com/photos/27138926/pexels-photo-27138926/free-photo-of-a-silver-ford-focus-parked-on-the-side-of-a-street.jpeg?auto=compress&cs=tinysrgb&w=400",
                format: "jpg",
                size: 88000,
                public_id: "ford_focus_side"
            }
        ],
        price_per_day: 13000,
        insurance_policy: {
            no_insurance: { price_per_day: "0" },
            standard_coverage: { price_per_day: "1100" },
            full_protection: { price_per_day: "2400" },
            personal_accident_insurance: { price_per_day: "850" },
            collision_damage_waiver: { price_per_day: "2100" },
            loss_damage_waiver: { price_per_day: "2400" },
            supplemental_liability_insurance: { price_per_day: "1600" },
            roadside_assistance_protection: { price_per_day: "1000" }
        },
        mileage_policy: {
            limited: {
                daily_limit: "170",
                extra_mile_charge: "40",
                description: "Extra charge applies after 170 miles."
            },
            unlimited: {
                daily_limit: "unlimited",
                extra_mile_charge: "0",
                description: "Drive as much as you want with no extra charge."
            }
        },
        fuel_policy: {
            full_to_full: {
                fuel_price_per_liter: "690",
                penalty_fee: "4600"
            },
            same_to_same: {
                fuel_price_per_liter: "710",
                minimum_return_charge: "4700"
            },
            prepaid_fuel: {
                prepaid_cost: "13500",
                no_refund: "true",
                service_fee: "1700"
            },
            free_fuel: { included_in_price: "true" },
            electric_charge_policy: { charging_fee: "2300" }
        },
        confirmation_policy: {
            instant: { security_deposit: "8500" },
            manual: { security_deposit: "13000" },
            pre_approval: { security_deposit: "18000" },
            pending: { security_deposit: "4500" },
            guaranteed: { security_deposit: "21000" },
            non_guaranteed: { security_deposit: "9000" },
            waitlist: { security_deposit: "6500" }
        },
        cancellation_policy: {
            free_cancellation: { refund_percentage: "100" },
            partial_refund: { refund_percentage: "50" },
            last_minute_cancellation: { refund_percentage: "25" },
            no_show: { refund_percentage: "0" }
        },
        registration_document: {
            secure_url: "https://example.com/docs/registration_ford.pdf",
            format: "pdf",
            size: 510000,
            public_id: "reg_doc_2020"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance_ford.pdf",
            format: "pdf",
            size: 440000,
            public_id: "ins_doc_2020"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection_ford.pdf",
            format: "pdf",
            size: 410000,
            public_id: "insp_doc_2020"
        },
        extra_services: "Bluetooth, Cruise Control, Parking Sensors",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fb0fc1f5e34fb05560",
        make: "Toyota",
        model: "Corolla",
        year: 2019,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 25000,
        seats: 5,
        doors: 4,
        color: "white",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/13781/pexels-photo-13781.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 210000,
            public_id: "toyota_corolla_2019"
        },
        images: [
            {
                secure_url:
                    "https://images.pexels.com/photos/1073031/pexels-photo-1073031.jpeg?auto=compress&cs=tinysrgb&w=400",
                format: "jpg",
                size: 98000,
                public_id: "toyota_corolla_front"
            },
            {
                secure_url:
                    "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=400",
                format: "jpg",
                size: 91000,
                public_id: "toyota_corolla_side"
            }
        ],
        price_per_day: 12500,

        insurance_policy: {
            no_insurance: { price_per_day: "0" },
            standard_coverage: { price_per_day: "1000" },
            full_protection: { price_per_day: "2300" },
            personal_accident_insurance: { price_per_day: "800" },
            collision_damage_waiver: { price_per_day: "2000" },
            loss_damage_waiver: { price_per_day: "2300" },
            supplemental_liability_insurance: { price_per_day: "1500" },
            roadside_assistance_protection: { price_per_day: "900" }
        },
        mileage_policy: {
            limited: {
                daily_limit: "160",
                extra_mile_charge: "50",
                description: "Extra charge applies after 160 miles."
            },
            unlimited: {
                daily_limit: "unlimited",
                extra_mile_charge: "0",
                description: "Drive as much as you want with no extra charge."
            }
        },
        fuel_policy: {
            full_to_full: {
                fuel_price_per_liter: "670",
                penalty_fee: "4500"
            },
            same_to_same: {
                fuel_price_per_liter: "690",
                minimum_return_charge: "4600"
            },
            prepaid_fuel: {
                prepaid_cost: "13000",
                no_refund: "true",
                service_fee: "1600"
            },
            free_fuel: { included_in_price: "true" },
            electric_charge_policy: { charging_fee: "2200" }
        },
        confirmation_policy: {
            instant: { security_deposit: "8000" },
            manual: { security_deposit: "12500" },
            pre_approval: { security_deposit: "17500" },
            pending: { security_deposit: "4200" },
            guaranteed: { security_deposit: "20000" },
            non_guaranteed: { security_deposit: "8500" },
            waitlist: { security_deposit: "6000" }
        },
        cancellation_policy: {
            free_cancellation: { refund_percentage: "100" },
            partial_refund: { refund_percentage: "55" },
            last_minute_cancellation: { refund_percentage: "25" },
            no_show: { refund_percentage: "0" }
        },
        registration_document: {
            secure_url: "https://example.com/docs/registration_toyota.pdf",
            format: "pdf",
            size: 520000,
            public_id: "reg_doc_2019"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance_toyota.pdf",
            format: "pdf",
            size: 430000,
            public_id: "ins_doc_2019"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection_toyota.pdf",
            format: "pdf",
            size: 420000,
            public_id: "insp_doc_2019"
        },
        extra_services: "Reverse Camera, Cruise Control, Leather Seats",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fe0fc1f5e34fb055a0",
        make: "Toyota",
        model: "Camry",
        year: 2020,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 22000,
        seats: 5,
        doors: 4,
        color: "silver",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/27639777/pexels-photo-27639777/free-photo-of-white-toyota-sports-car-parked-in-an-underground-parking-lot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 210000,
            public_id: "toyota_camry_2020"
        },
        price_per_day: 15000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Sunroof, GPS, Heated Seats",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fc0fc1f5e34fb05578",
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2021,
        car_type: "sedan",
        fuel_type: "diesel",
        transmission: "automatic",
        mileage: 18000,
        seats: 5,
        doors: 4,
        color: "black",
        location: {
            display_name: "Abuja, Nigeria",
            lat: 9.0579,
            lng: 7.4951
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/326259/pexels-photo-326259.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 220000,
            public_id: "mercedes_cclass_2021"
        },
        price_per_day: 20000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Leather Seats, Reverse Camera, Cruise Control",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fa0fc1f5e34fb05560",
        make: "Honda",
        model: "Accord",
        year: 2018,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "manual",
        mileage: 28000,
        seats: 5,
        doors: 4,
        color: "blue",
        location: {
            display_name: "Port Harcourt, Nigeria",
            lat: 4.8156,
            lng: 7.0498
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 205000,
            public_id: "honda_accord_2018"
        },
        price_per_day: 12000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Bluetooth, Parking Sensors, Alloy Wheels",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fd0fc1f5e34fb05586"],
        pending_drivers: ["67d830fe0fc1f5e34fb0559b"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05591",
        make: "Ford",
        model: "Mustang",
        year: 2019,
        car_type: "coupe",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 25000,
        seats: 4,
        doors: 2,
        color: "red",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            format: "jpg",
            size: 230000,
            public_id: "ford_mustang_2019"
        },
        price_per_day: 18000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Leather Seats, Bluetooth, Premium Sound System",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05591",
        make: "BMW",
        model: "X5",
        year: 2022,
        car_type: "suv",
        fuel_type: "diesel",
        transmission: "automatic",
        mileage: 15000,
        seats: 5,
        doors: 4,
        color: "white",
        location: {
            display_name: "Abuja, Nigeria",
            lat: 9.0579,
            lng: 7.4951
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/18231632/pexels-photo-18231632/free-photo-of-range-rover-evoque.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
            format: "jpg",
            size: 250000,
            public_id: "bmw_x5_2022"
        },
        price_per_day: 22000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Sunroof, Heated Seats, Adaptive Cruise Control",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05596",
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        car_type: "sedan",
        fuel_type: "electric",
        transmission: "automatic",
        mileage: 8000,
        seats: 5,
        doors: 4,
        color: "blue",
        location: {
            display_name: "Port Harcourt, Nigeria",
            lat: 4.8156,
            lng: 7.0498
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/14649127/pexels-photo-14649127.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
            format: "jpg",
            size: 210000,
            public_id: "tesla_model3_2023"
        },
        price_per_day: 25000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Autopilot, Wireless Charging, Smart Summon",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fd0fc1f5e34fb05586"],
        pending_drivers: ["67d830fe0fc1f5e34fb0559b"]
    },
    {
        user_id: "67d830fe0fc1f5e34fb055a0",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 22000,
        seats: 5,
        doors: 4,
        color: "silver",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/225841/pexels-photo-225841.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
            format: "jpg",
            size: 200000,
            public_id: "toyota_corolla_2020"
        },
        price_per_day: 15000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Bluetooth, Rear Camera, Parking Sensors",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fa0fc1f5e34fb05544",
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2021,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 18000,
        seats: 5,
        doors: 4,
        color: "black",
        location: {
            display_name: "Abuja, Nigeria",
            lat: 9.0579,
            lng: 7.4951
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/9846122/pexels-photo-9846122.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
            format: "jpg",
            size: 230000,
            public_id: "mercedes_cclass_2021"
        },
        price_per_day: 28000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Heated Seats, Sunroof, Adaptive Cruise Control",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fa0fc1f5e34fb05548",
        make: "Lexus",
        model: "RX 350",
        year: 2022,
        car_type: "suv",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 14000,
        seats: 5,
        doors: 4,
        color: "white",
        location: {
            display_name: "Port Harcourt, Nigeria",
            lat: 4.8156,
            lng: 7.0498
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 260000,
            public_id: "lexus_rx350_2022"
        },
        price_per_day: 32000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Leather Seats, Bluetooth, Smart Key",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fd0fc1f5e34fb05586"],
        pending_drivers: ["67d830fe0fc1f5e34fb0559b"]
    },
    {
        user_id: "67d830fb0fc1f5e34fb05556",
        make: "Nissan",
        model: "Altima",
        year: 2018,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "manual",
        mileage: 30000,
        seats: 5,
        doors: 4,
        color: "blue",
        location: {
            display_name: "Kano, Nigeria",
            lat: 12.0022,
            lng: 8.5919
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 180000,
            public_id: "nissan_altima_2018"
        },
        price_per_day: 13000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Rear Camera, Cruise Control, Bluetooth",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fb0fc1f5e34fb05560",
        make: "Hyundai",
        model: "Tucson",
        year: 2023,
        car_type: "suv",
        fuel_type: "hybrid",
        transmission: "automatic",
        mileage: 12000,
        seats: 5,
        doors: 4,
        color: "gray",
        location: {
            display_name: "Ibadan, Nigeria",
            lat: 7.3776,
            lng: 3.947
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 240000,
            public_id: "hyundai_tucson_2023"
        },
        price_per_day: 29000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Wireless Charging, Lane Assist, Panoramic Roof",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fc0fc1f5e34fb0556a",
        make: "Honda",
        model: "Accord",
        year: 2019,
        car_type: "sedan",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 25000,
        seats: 5,
        doors: 4,
        color: "red",
        location: {
            display_name: "Lagos, Nigeria",
            lat: 6.5244,
            lng: 3.3792
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 190000,
            public_id: "honda_accord_2019"
        },
        price_per_day: 16000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Sunroof, Bluetooth, Cruise Control",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fc0fc1f5e34fb0556f",
        make: "BMW",
        model: "X5",
        year: 2022,
        car_type: "suv",
        fuel_type: "diesel",
        transmission: "automatic",
        mileage: 12000,
        seats: 5,
        doors: 4,
        color: "black",
        location: {
            display_name: "Abuja, Nigeria",
            lat: 9.0579,
            lng: 7.4951
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/38637/car-audi-auto-automotive-38637.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 270000,
            public_id: "bmw_x5_2022"
        },
        price_per_day: 40000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Heated Seats, Panoramic Roof, Adaptive Cruise Control",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fb0fc1f5e34fb0555b"],
        pending_drivers: ["67d830fe0fc1f5e34fb0559b"]
    },
    {
        user_id: "67d830fc0fc1f5e34fb05578",
        make: "Toyota",
        model: "Camry",
        year: 2020,
        car_type: "sedan",
        fuel_type: "hybrid",
        transmission: "automatic",
        mileage: 20000,
        seats: 5,
        doors: 4,
        color: "blue",
        location: {
            display_name: "Port Harcourt, Nigeria",
            lat: 4.8156,
            lng: 7.0498
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 210000,
            public_id: "toyota_camry_2020"
        },
        price_per_day: 18000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Smart Key, Bluetooth, Rear Camera",
        drivers: ["67d830fe0fc1f5e34fb0559b", "67d830fd0fc1f5e34fb05586"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05583",
        make: "Ford",
        model: "Explorer",
        year: 2021,
        car_type: "suv",
        fuel_type: "petrol",
        transmission: "automatic",
        mileage: 15000,
        seats: 7,
        doors: 4,
        color: "white",
        location: {
            display_name: "Kano, Nigeria",
            lat: 12.0022,
            lng: 8.5919
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 250000,
            public_id: "ford_explorer_2021"
        },
        price_per_day: 35000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Third Row Seating, Bluetooth, Rear Camera",
        drivers: ["67d830fb0fc1f5e34fb0555b", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fd0fc1f5e34fb05586"]
    },
    {
        user_id: "67d830fd0fc1f5e34fb05591",
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        car_type: "sedan",
        fuel_type: "electric",
        transmission: "automatic",
        mileage: 5000,
        seats: 5,
        doors: 4,
        color: "gray",
        location: {
            display_name: "Ibadan, Nigeria",
            lat: 7.3776,
            lng: 3.947
        },
        featured_image: {
            secure_url:
                "https://images.pexels.com/photos/253096/pexels-photo-253096.jpeg?auto=compress&cs=tinysrgb&w=400",
            format: "jpg",
            size: 280000,
            public_id: "tesla_model3_2023"
        },
        price_per_day: 50000,
registration_document: {
            secure_url: "https://example.com/docs/registration.pdf",
            format: "pdf",
            size: 500000,
            public_id: "reg_doc_2021"
        },
        insurance_document: {
            secure_url: "https://example.com/docs/insurance.pdf",
            format: "pdf",
            size: 450000,
            public_id: "ins_doc_2021"
        },
        inspection_document: {
            secure_url: "https://example.com/docs/inspection.pdf",
            format: "pdf",
            size: 400000,
            public_id: "insp_doc_2021"
        },
        extra_services: "Autopilot, Wireless Charging, Smart Key",
        drivers: ["67d830fd0fc1f5e34fb05586", "67d830fe0fc1f5e34fb0559b"],
        pending_drivers: ["67d830fb0fc1f5e34fb0555b"]
    }
];

export default cars;
