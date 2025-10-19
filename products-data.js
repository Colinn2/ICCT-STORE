/**
 * Static Product Data - Fallback for GitHub Pages
 * 
 * This file contains all 46 products as a fallback when the API server is not available.
 * 
 * Usage:
 * - In Codespaces/Localhost: MySQL database is used (dynamic)
 * - On GitHub Pages: This static data is used (fallback)
 * 
 * To update: Sync with database changes manually or run export script
 */

const STATIC_PRODUCTS = {
    uniforms: [
        {
            id: 1,
            name: "School Uniform (Male Set)",
            description: "Complete male school uniform set",
            price: 1200.00,
            stock_quantity: 50,
            image_url: "boy unif.png",
            category_slug: "uniforms"
        },
        {
            id: 2,
            name: "School Uniform (Female Set)",
            description: "Complete female school uniform set",
            price: 1200.00,
            stock_quantity: 50,
            image_url: "girl unif.png",
            category_slug: "uniforms"
        },
        {
            id: 3,
            name: "PE Uniform (Shirt and Jogging Pants)",
            description: "Official PE uniform with ICCT branding",
            price: 850.00,
            stock_quantity: 100,
            image_url: "pe icct.png",
            category_slug: "uniforms"
        },
        {
            id: 6,
            name: "ID Lace & Holder",
            description: "ICCT branded ID lace with holder",
            price: 50.00,
            stock_quantity: 200,
            image_url: "id lace.png",
            category_slug: "uniforms"
        },
        {
            id: 7,
            name: "ICCT Patches",
            description: "Official school patches",
            price: 30.00,
            stock_quantity: 150,
            image_url: "patches and pin icct.png",
            category_slug: "uniforms"
        },
        {
            id: 8,
            name: "ICCT Pins",
            description: "School logo pins",
            price: 25.00,
            stock_quantity: 180,
            image_url: "patches and pin icct.png",
            category_slug: "uniforms"
        },
        {
            id: 9,
            name: "Nameplates",
            description: "Customizable student nameplates",
            price: 80.00,
            stock_quantity: 100,
            image_url: "icct nameplate.png",
            category_slug: "uniforms"
        }
    ],
    
    documents: [
        {
            id: 22,
            name: "Good Moral Certificate",
            description: "Official good moral certificate",
            price: 100.00,
            stock_quantity: 999,
            image_url: "good-moral.jpg",
            category_slug: "documents"
        },
        {
            id: 23,
            name: "Certificate of Enrollment",
            description: "Official enrollment certificate",
            price: 80.00,
            stock_quantity: 999,
            image_url: "cert-enrollment.jpg",
            category_slug: "documents"
        },
        {
            id: 24,
            name: "Transcript of Records (TOR)",
            description: "Official transcript of records",
            price: 200.00,
            stock_quantity: 999,
            image_url: "tor.jpg",
            category_slug: "documents"
        },
        {
            id: 25,
            name: "Honorable Dismissal",
            description: "Transfer credentials and honorable dismissal",
            price: 150.00,
            stock_quantity: 999,
            image_url: "honorable-dismissal.jpg",
            category_slug: "documents"
        },
        {
            id: 26,
            name: "Form 137 Request",
            description: "Official Form 137 document",
            price: 120.00,
            stock_quantity: 999,
            image_url: "form-137.jpg",
            category_slug: "documents"
        },
        {
            id: 27,
            name: "Form 138 Request",
            description: "Official Form 138 document",
            price: 120.00,
            stock_quantity: 999,
            image_url: "form-138.jpg",
            category_slug: "documents"
        },
        {
            id: 28,
            name: "ID Replacement",
            description: "Student ID card replacement",
            price: 150.00,
            stock_quantity: 999,
            image_url: "id-replacement.jpg",
            category_slug: "documents"
        }
    ],
    
    supplies: [
        {
            id: 4,
            name: "ICCT Jacket",
            description: "School-branded jacket",
            price: 1500.00,
            stock_quantity: 30,
            image_url: "jacket.jpg",
            category_slug: "supplies"
        },
        {
            id: 5,
            name: "ICCT Hoodie",
            description: "School-branded hoodie",
            price: 1100.00,
            stock_quantity: 40,
            image_url: "hoodie.jpg",
            category_slug: "supplies"
        },
        {
            id: 10,
            name: "School Bag (ICCT Logo)",
            description: "Durable school bag with ICCT logo",
            price: 800.00,
            stock_quantity: 60,
            image_url: "school-bag.jpg",
            category_slug: "supplies"
        },
        {
            id: 11,
            name: "Tote Bag (ICCT Logo)",
            description: "Eco-friendly tote bag with ICCT branding",
            price: 250.00,
            stock_quantity: 80,
            image_url: "tote-bag.jpg",
            category_slug: "supplies"
        },
        {
            id: 12,
            name: "ICCT Cap",
            description: "School branded cap",
            price: 200.00,
            stock_quantity: 70,
            image_url: "cap.jpg",
            category_slug: "supplies"
        },
        {
            id: 13,
            name: "ICCT Beanie",
            description: "Winter beanie with ICCT logo",
            price: 180.00,
            stock_quantity: 50,
            image_url: "beanie.jpg",
            category_slug: "supplies"
        },
        {
            id: 14,
            name: "ICCT Department T-Shirt",
            description: "Department-specific event shirts",
            price: 350.00,
            stock_quantity: 120,
            image_url: "dept-shirt.jpg",
            category_slug: "supplies"
        },
        {
            id: 15,
            name: "ICCT Event Shirt",
            description: "Special event commemorative shirts",
            price: 350.00,
            stock_quantity: 100,
            image_url: "event-shirt.jpg",
            category_slug: "supplies"
        },
        {
            id: 16,
            name: "ICCT Keychain",
            description: "School logo keychain",
            price: 40.00,
            stock_quantity: 200,
            image_url: "keychain.jpg",
            category_slug: "supplies"
        },
        {
            id: 17,
            name: "ICCT Lanyard",
            description: "Official school lanyard",
            price: 60.00,
            stock_quantity: 150,
            image_url: "lanyard.jpg",
            category_slug: "supplies"
        },
        {
            id: 18,
            name: "ICCT Stickers",
            description: "School logo sticker pack",
            price: 20.00,
            stock_quantity: 300,
            image_url: "stickers.jpg",
            category_slug: "supplies"
        },
        {
            id: 19,
            name: "ICCT Mug",
            description: "Coffee mug with ICCT logo",
            price: 180.00,
            stock_quantity: 80,
            image_url: "mug.jpg",
            category_slug: "supplies"
        },
        {
            id: 20,
            name: "ICCT Tumbler",
            description: "Insulated tumbler with ICCT branding",
            price: 350.00,
            stock_quantity: 60,
            image_url: "tumbler.jpg",
            category_slug: "supplies"
        },
        {
            id: 21,
            name: "Customized Phone Case",
            description: "ICCT branded phone accessories",
            price: 250.00,
            stock_quantity: 50,
            image_url: "phone-case.jpg",
            category_slug: "supplies"
        },
        {
            id: 29,
            name: "Reusable Water Bottle",
            description: "BPA-free reusable water bottle",
            price: 150.00,
            stock_quantity: 100,
            image_url: "water-bottle.jpg",
            category_slug: "supplies"
        },
        {
            id: 30,
            name: "Face Masks (Pack of 10)",
            description: "Disposable face masks",
            price: 50.00,
            stock_quantity: 200,
            image_url: "face-mask.jpg",
            category_slug: "supplies"
        },
        {
            id: 31,
            name: "Hand Sanitizer (60ml)",
            description: "Alcohol-based hand sanitizer",
            price: 40.00,
            stock_quantity: 150,
            image_url: "sanitizer.jpg",
            category_slug: "supplies"
        },
        {
            id: 32,
            name: "First-Aid Kit",
            description: "Compact first-aid kit with essentials",
            price: 180.00,
            stock_quantity: 80,
            image_url: "first-aid.jpg",
            category_slug: "supplies"
        },
        {
            id: 33,
            name: "Band-Aids (Pack of 20)",
            description: "Assorted adhesive bandages",
            price: 30.00,
            stock_quantity: 120,
            image_url: "bandaid.jpg",
            category_slug: "supplies"
        }
    ],
    
    fees: [
        {
            id: 34,
            name: "Tuition Payment (Full Semester)",
            description: "Full semester tuition payment",
            price: 50000.00,
            stock_quantity: 999,
            image_url: "tuition.jpg",
            category_slug: "fees"
        },
        {
            id: 35,
            name: "Tuition Payment (Partial)",
            description: "Partial tuition payment",
            price: 25000.00,
            stock_quantity: 999,
            image_url: "tuition-partial.jpg",
            category_slug: "fees"
        },
        {
            id: 36,
            name: "Down Payment / Enrollment Fee",
            description: "Initial enrollment down payment",
            price: 10000.00,
            stock_quantity: 999,
            image_url: "enrollment-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 37,
            name: "Miscellaneous Fees",
            description: "Miscellaneous school fees",
            price: 3000.00,
            stock_quantity: 999,
            image_url: "misc-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 38,
            name: "Laboratory Fee",
            description: "Laboratory usage and materials fee",
            price: 2500.00,
            stock_quantity: 999,
            image_url: "lab-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 39,
            name: "Library Fee",
            description: "Library access and resources fee",
            price: 1500.00,
            stock_quantity: 999,
            image_url: "library-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 40,
            name: "Internet / Computer Lab Fee",
            description: "Computer lab and internet access fee",
            price: 2000.00,
            stock_quantity: 999,
            image_url: "computer-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 41,
            name: "Graduation Fee",
            description: "Graduation ceremony and materials fee",
            price: 5000.00,
            stock_quantity: 999,
            image_url: "graduation-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 42,
            name: "Student Organization Fee",
            description: "Student organization membership fee",
            price: 500.00,
            stock_quantity: 999,
            image_url: "org-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 43,
            name: "Printing Fee (per page)",
            description: "Document printing service",
            price: 5.00,
            stock_quantity: 999,
            image_url: "printing.jpg",
            category_slug: "fees"
        },
        {
            id: 44,
            name: "Scanning / Photocopy Fee",
            description: "Scanning and photocopying service",
            price: 10.00,
            stock_quantity: 999,
            image_url: "photocopy.jpg",
            category_slug: "fees"
        },
        {
            id: 45,
            name: "Locker Rental Fee",
            description: "Semester locker rental",
            price: 800.00,
            stock_quantity: 999,
            image_url: "locker-fee.jpg",
            category_slug: "fees"
        },
        {
            id: 46,
            name: "Lost & Found Claim Fee",
            description: "Processing fee for lost and found items",
            price: 50.00,
            stock_quantity: 999,
            image_url: "lost-found.jpg",
            category_slug: "fees"
        }
    ],
    
    // Special category for "all products"
    'all-products': [] // Will be populated dynamically
};

// Populate 'all-products' with all products from all categories
STATIC_PRODUCTS['all-products'] = [
    ...STATIC_PRODUCTS.uniforms,
    ...STATIC_PRODUCTS.documents,
    ...STATIC_PRODUCTS.supplies,
    ...STATIC_PRODUCTS.fees
];

console.log('📦 Static product data loaded:', {
    uniforms: STATIC_PRODUCTS.uniforms.length,
    documents: STATIC_PRODUCTS.documents.length,
    supplies: STATIC_PRODUCTS.supplies.length,
    fees: STATIC_PRODUCTS.fees.length,
    total: STATIC_PRODUCTS['all-products'].length
});
