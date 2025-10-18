# ICCT Store - MySQL Database Integration

## Setup Instructions

### 1. Install Required Software

The setup script will automatically install:
- MySQL Server
- PHP with MySQL extension

### 2. Run Database Setup

Execute the setup script:

```bash
cd /workspaces/ICCT-STORE
./setup-database.sh
```

This will:
- Install MySQL and PHP (if not already installed)
- Create the `icct_store` database
- Create `categories` and `products` tables
- Insert all 55 products across 4 categories

### 3. Start the Servers

You need to run TWO servers:

#### Server 1: PHP Backend (Port 8080)
```bash
php -S localhost:8080 -t /workspaces/ICCT-STORE
```

#### Server 2: Frontend (Port 8000)
```bash
python3 -m http.server 8000 --bind 0.0.0.0
```

### 4. Access the Website

Open your browser to: `http://localhost:8000`

## Database Structure

### Categories Table
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly name (uniforms, documents, supplies, fees)
- `description` - Category description

### Products Table
- `id` - Primary key
- `category_id` - Foreign key to categories
- `name` - Product name
- `description` - Product description
- `price` - Product price (decimal)
- `stock_quantity` - Available stock
- `image_url` - Product image path
- `is_active` - Product visibility

## Products Included

### School Apparel & Accessories (21 items)
- School Uniforms (Male/Female)
- PE Uniforms
- ICCT Jackets & Hoodies
- ID Laces, Patches, Pins, Nameplates
- School Bags & Tote Bags
- Caps & Beanies
- T-Shirts (Department/Event)
- Keychains, Lanyards, Stickers
- Mugs & Tumblers
- Phone Accessories

### Document Requests (7 items)
- Good Moral Certificate
- Certificate of Enrollment
- Transcript of Records (TOR)
- Honorable Dismissal
- Form 137/138
- ID Replacement

### Supplies (5 items)
- Reusable Water Bottle
- Face Masks
- Hand Sanitizer
- First-Aid Kit
- Band-Aids

### Fees (13 items)
- Tuition (Full/Partial)
- Enrollment Fee
- Miscellaneous Fees
- Laboratory Fee
- Library Fee
- Computer Lab Fee
- Graduation Fee
- Organization Fee
- Printing/Scanning
- Locker Rental
- Lost & Found Fee

## API Endpoints

### Get All Categories
```
GET http://localhost:8080/api/products.php?action=categories
```

### Get Products by Category
```
GET http://localhost:8080/api/products.php?action=products&category=uniforms
GET http://localhost:8080/api/products.php?action=products&category=documents
GET http://localhost:8080/api/products.php?action=products&category=supplies
GET http://localhost:8080/api/products.php?action=products&category=fees
```

### Get All Products
```
GET http://localhost:8080/api/products.php?action=products&category=all-products
```

## Features

✅ Dynamic product loading from MySQL database  
✅ Category-based filtering  
✅ Real-time stock status  
✅ Formatted pricing (Philippine Peso)  
✅ Product descriptions  
✅ Out-of-stock detection  
✅ Responsive design  
✅ Add to cart functionality  

## Database Configuration

Edit `/workspaces/ICCT-STORE/api/config.php` to change database settings:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'icct_store');
```

## Troubleshooting

### MySQL Connection Error
1. Make sure MySQL service is running:
   ```bash
   sudo service mysql start
   ```

2. Check if database exists:
   ```bash
   mysql -u root -e "SHOW DATABASES;"
   ```

### Products Not Loading
1. Check if PHP server is running on port 8080
2. Check browser console for errors
3. Verify API endpoint is accessible: `http://localhost:8080/api/products.php?action=categories`

### CORS Errors
The API includes CORS headers. If you still get errors, make sure both servers are running.

## Adding New Products

### Via MySQL
```sql
USE icct_store;

INSERT INTO products (category_id, name, description, price, stock_quantity) 
VALUES (1, 'New Product', 'Description here', 299.00, 50);
```

### Via phpMyAdmin
Access phpMyAdmin and navigate to the `icct_store` database.

## Next Steps

- [ ] Add product images
- [ ] Implement shopping cart with database
- [ ] Add user authentication
- [ ] Create admin panel for product management
- [ ] Implement order tracking
- [ ] Add payment gateway integration
