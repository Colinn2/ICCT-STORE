#!/bin/bash

echo "======================================"
echo "ICCT Store - SQLite Database Setup"
echo "======================================"

DB_PATH="/workspaces/ICCT-STORE/database/icct_store.db"

# Create database directory if it doesn't exist
mkdir -p /workspaces/ICCT-STORE/database

# Remove old database if it exists
if [ -f "$DB_PATH" ]; then
    echo "Removing old database..."
    rm "$DB_PATH"
fi

echo "Creating new SQLite database..."

# Create database and tables
sqlite3 "$DB_PATH" << 'EOF'
-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL DEFAULT 0.00,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('School Apparel & Accessories', 'uniforms', 'Uniforms, jackets, and school-branded merchandise'),
('Document Requests', 'documents', 'Digital service for official document requests'),
('Supplies', 'supplies', 'Light items and everyday essentials for students'),
('Fees', 'fees', 'Tuition, enrollment, and miscellaneous fees');

-- Insert Products for Uniforms
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(1, 'School Uniform (Male Set)', 'Complete male school uniform set', 1200.00, 50, 'images/uniform-male.jpg'),
(1, 'School Uniform (Female Set)', 'Complete female school uniform set', 1200.00, 50, 'images/uniform-female.jpg'),
(1, 'PE Uniform (Shirt and Jogging Pants)', 'Official PE uniform with ICCT branding', 850.00, 100, 'images/pe-uniform.jpg'),
(1, 'ICCT Jacket', 'School-branded jacket', 1500.00, 30, 'images/jacket.jpg'),
(1, 'ICCT Hoodie', 'School-branded hoodie', 1100.00, 40, 'images/hoodie.jpg'),
(1, 'ID Lace & Holder', 'ICCT branded ID lace with holder', 50.00, 200, 'images/id-lace.jpg'),
(1, 'ICCT Patches', 'Official school patches', 30.00, 150, 'images/patches.jpg'),
(1, 'ICCT Pins', 'School logo pins', 25.00, 180, 'images/pins.jpg'),
(1, 'Nameplates', 'Customizable student nameplates', 80.00, 100, 'images/nameplate.jpg'),
(1, 'School Bag (ICCT Logo)', 'Durable school bag with ICCT logo', 800.00, 60, 'images/school-bag.jpg'),
(1, 'Tote Bag (ICCT Logo)', 'Eco-friendly tote bag with ICCT branding', 250.00, 80, 'images/tote-bag.jpg'),
(1, 'ICCT Cap', 'School branded cap', 200.00, 70, 'images/cap.jpg'),
(1, 'ICCT Beanie', 'Winter beanie with ICCT logo', 180.00, 50, 'images/beanie.jpg'),
(1, 'ICCT Department T-Shirt', 'Department-specific event shirts', 350.00, 120, 'images/dept-shirt.jpg'),
(1, 'ICCT Event Shirt', 'Special event commemorative shirts', 350.00, 100, 'images/event-shirt.jpg'),
(1, 'ICCT Keychain', 'School logo keychain', 40.00, 200, 'images/keychain.jpg'),
(1, 'ICCT Lanyard', 'Official school lanyard', 60.00, 150, 'images/lanyard.jpg'),
(1, 'ICCT Stickers', 'School logo sticker pack', 20.00, 300, 'images/stickers.jpg'),
(1, 'ICCT Mug', 'Coffee mug with ICCT logo', 180.00, 80, 'images/mug.jpg'),
(1, 'ICCT Tumbler', 'Insulated tumbler with ICCT branding', 350.00, 60, 'images/tumbler.jpg'),
(1, 'Customized Phone Case', 'ICCT branded phone accessories', 250.00, 50, 'images/phone-case.jpg');

-- Insert Products for Documents
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(2, 'Good Moral Certificate', 'Official good moral certificate', 100.00, 999, 'images/good-moral.jpg'),
(2, 'Certificate of Enrollment', 'Official enrollment certificate', 80.00, 999, 'images/cert-enrollment.jpg'),
(2, 'Transcript of Records (TOR)', 'Official transcript of records', 200.00, 999, 'images/tor.jpg'),
(2, 'Honorable Dismissal', 'Transfer credentials and honorable dismissal', 150.00, 999, 'images/honorable-dismissal.jpg'),
(2, 'Form 137 Request', 'Official Form 137 document', 120.00, 999, 'images/form-137.jpg'),
(2, 'Form 138 Request', 'Official Form 138 document', 120.00, 999, 'images/form-138.jpg'),
(2, 'ID Replacement', 'Student ID card replacement', 150.00, 999, 'images/id-replacement.jpg');

-- Insert Products for Supplies
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(3, 'Reusable Water Bottle', 'BPA-free reusable water bottle', 150.00, 100, 'images/water-bottle.jpg'),
(3, 'Face Masks (Pack of 10)', 'Disposable face masks', 50.00, 200, 'images/face-mask.jpg'),
(3, 'Hand Sanitizer (60ml)', 'Alcohol-based hand sanitizer', 40.00, 150, 'images/sanitizer.jpg'),
(3, 'First-Aid Kit', 'Compact first-aid kit with essentials', 180.00, 80, 'images/first-aid.jpg'),
(3, 'Band-Aids (Pack of 20)', 'Assorted adhesive bandages', 30.00, 120, 'images/bandaid.jpg');

-- Insert Products for Fees
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(4, 'Tuition Payment (Full Semester)', 'Full semester tuition payment', 50000.00, 999, 'images/tuition.jpg'),
(4, 'Tuition Payment (Partial)', 'Partial tuition payment', 25000.00, 999, 'images/tuition-partial.jpg'),
(4, 'Down Payment / Enrollment Fee', 'Initial enrollment down payment', 10000.00, 999, 'images/enrollment-fee.jpg'),
(4, 'Miscellaneous Fees', 'Miscellaneous school fees', 3000.00, 999, 'images/misc-fee.jpg'),
(4, 'Laboratory Fee', 'Laboratory usage and materials fee', 2500.00, 999, 'images/lab-fee.jpg'),
(4, 'Library Fee', 'Library access and resources fee', 1500.00, 999, 'images/library-fee.jpg'),
(4, 'Internet / Computer Lab Fee', 'Computer lab and internet access fee', 2000.00, 999, 'images/computer-fee.jpg'),
(4, 'Graduation Fee', 'Graduation ceremony and materials fee', 5000.00, 999, 'images/graduation-fee.jpg'),
(4, 'Student Organization Fee', 'Student organization membership fee', 500.00, 999, 'images/org-fee.jpg'),
(4, 'Printing Fee (per page)', 'Document printing service', 5.00, 999, 'images/printing.jpg'),
(4, 'Scanning / Photocopy Fee', 'Scanning and photocopying service', 10.00, 999, 'images/photocopy.jpg'),
(4, 'Locker Rental Fee', 'Semester locker rental', 800.00, 999, 'images/locker-fee.jpg'),
(4, 'Lost & Found Claim Fee', 'Processing fee for lost and found items', 50.00, 999, 'images/lost-found.jpg');
EOF

echo ""
echo "✅ SQLite database created successfully!"
echo "Database location: $DB_PATH"
echo ""
echo "To test: sqlite3 $DB_PATH 'SELECT COUNT(*) FROM products;'"
