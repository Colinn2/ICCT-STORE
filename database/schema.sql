-- ICCT Store Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS icct_store;
USE icct_store;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
('School Apparel & Accessories', 'uniforms', 'Uniforms, jackets, and school-branded merchandise'),
('Document Requests', 'documents', 'Digital service for official document requests'),
('Supplies', 'supplies', 'Light items and everyday essentials for students'),
('Fees', 'fees', 'Tuition, enrollment, and miscellaneous fees');

-- Insert Products for School Apparel & Accessories
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(1, 'School Uniform (Male Set)', 'Complete male school uniform set', 1200.00, 50, 'uniform-male.jpg'),
(1, 'School Uniform (Female Set)', 'Complete female school uniform set', 1200.00, 50, 'uniform-female.jpg'),
(1, 'PE Uniform (Shirt and Jogging Pants)', 'Official PE uniform with ICCT branding', 850.00, 100, 'pe-uniform.jpg'),
(1, 'ICCT Jacket', 'School-branded jacket', 1500.00, 30, 'jacket.jpg'),
(1, 'ICCT Hoodie', 'School-branded hoodie', 1100.00, 40, 'hoodie.jpg'),
(1, 'ID Lace & Holder', 'ICCT branded ID lace with holder', 50.00, 200, 'id-lace.jpg'),
(1, 'ICCT Patches', 'Official school patches', 30.00, 150, 'patches.jpg'),
(1, 'ICCT Pins', 'School logo pins', 25.00, 180, 'pins.jpg'),
(1, 'Nameplates', 'Customizable student nameplates', 80.00, 100, 'nameplate.jpg'),
(1, 'School Bag (ICCT Logo)', 'Durable school bag with ICCT logo', 800.00, 60, 'school-bag.jpg'),
(1, 'Tote Bag (ICCT Logo)', 'Eco-friendly tote bag with ICCT branding', 250.00, 80, 'tote-bag.jpg'),
(1, 'ICCT Cap', 'School branded cap', 200.00, 70, 'cap.jpg'),
(1, 'ICCT Beanie', 'Winter beanie with ICCT logo', 180.00, 50, 'beanie.jpg'),
(1, 'ICCT Department T-Shirt', 'Department-specific event shirts', 350.00, 120, 'dept-shirt.jpg'),
(1, 'ICCT Event Shirt', 'Special event commemorative shirts', 350.00, 100, 'event-shirt.jpg'),
(1, 'ICCT Keychain', 'School logo keychain', 40.00, 200, 'keychain.jpg'),
(1, 'ICCT Lanyard', 'Official school lanyard', 60.00, 150, 'lanyard.jpg'),
(1, 'ICCT Stickers', 'School logo sticker pack', 20.00, 300, 'stickers.jpg'),
(1, 'ICCT Mug', 'Coffee mug with ICCT logo', 180.00, 80, 'mug.jpg'),
(1, 'ICCT Tumbler', 'Insulated tumbler with ICCT branding', 350.00, 60, 'tumbler.jpg'),
(1, 'Customized Phone Case', 'ICCT branded phone accessories', 250.00, 50, 'phone-case.jpg');

-- Insert Products for Document Requests
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(2, 'Good Moral Certificate', 'Official good moral certificate', 100.00, 999, 'good-moral.jpg'),
(2, 'Certificate of Enrollment', 'Official enrollment certificate', 80.00, 999, 'cert-enrollment.jpg'),
(2, 'Transcript of Records (TOR)', 'Official transcript of records', 200.00, 999, 'tor.jpg'),
(2, 'Honorable Dismissal', 'Transfer credentials and honorable dismissal', 150.00, 999, 'honorable-dismissal.jpg'),
(2, 'Form 137 Request', 'Official Form 137 document', 120.00, 999, 'form-137.jpg'),
(2, 'Form 138 Request', 'Official Form 138 document', 120.00, 999, 'form-138.jpg'),
(2, 'ID Replacement', 'Student ID card replacement', 150.00, 999, 'id-replacement.jpg');

-- Insert Products for Supplies
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(3, 'Reusable Water Bottle', 'BPA-free reusable water bottle', 150.00, 100, 'water-bottle.jpg'),
(3, 'Face Masks (Pack of 10)', 'Disposable face masks', 50.00, 200, 'face-mask.jpg'),
(3, 'Hand Sanitizer (60ml)', 'Alcohol-based hand sanitizer', 40.00, 150, 'sanitizer.jpg'),
(3, 'First-Aid Kit', 'Compact first-aid kit with essentials', 180.00, 80, 'first-aid.jpg'),
(3, 'Band-Aids (Pack of 20)', 'Assorted adhesive bandages', 30.00, 120, 'bandaid.jpg');

-- Insert Products for Fees
INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES
(4, 'Tuition Payment (Full Semester)', 'Full semester tuition payment', 50000.00, 999, 'tuition.jpg'),
(4, 'Tuition Payment (Partial)', 'Partial tuition payment', 25000.00, 999, 'tuition-partial.jpg'),
(4, 'Down Payment / Enrollment Fee', 'Initial enrollment down payment', 10000.00, 999, 'enrollment-fee.jpg'),
(4, 'Miscellaneous Fees', 'Miscellaneous school fees', 3000.00, 999, 'misc-fee.jpg'),
(4, 'Laboratory Fee', 'Laboratory usage and materials fee', 2500.00, 999, 'lab-fee.jpg'),
(4, 'Library Fee', 'Library access and resources fee', 1500.00, 999, 'library-fee.jpg'),
(4, 'Internet / Computer Lab Fee', 'Computer lab and internet access fee', 2000.00, 999, 'computer-fee.jpg'),
(4, 'Graduation Fee', 'Graduation ceremony and materials fee', 5000.00, 999, 'graduation-fee.jpg'),
(4, 'Student Organization Fee', 'Student organization membership fee', 500.00, 999, 'org-fee.jpg'),
(4, 'Printing Fee (per page)', 'Document printing service', 5.00, 999, 'printing.jpg'),
(4, 'Scanning / Photocopy Fee', 'Scanning and photocopying service', 10.00, 999, 'photocopy.jpg'),
(4, 'Locker Rental Fee', 'Semester locker rental', 800.00, 999, 'locker-fee.jpg'),
(4, 'Lost & Found Claim Fee', 'Processing fee for lost and found items', 50.00, 999, 'lost-found.jpg');
