#!/bin/bash

echo "======================================"
echo "ICCT Store Database Setup"
echo "======================================"
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Installing MySQL..."
    sudo apt-get update
    sudo apt-get install -y mysql-server
else
    echo "✅ MySQL is already installed"
fi

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Installing PHP..."
    sudo apt-get update
    sudo apt-get install -y php php-mysql php-cli
else
    echo "✅ PHP is already installed"
fi

echo ""
echo "======================================"
echo "Setting up database..."
echo "======================================"

# Start MySQL service
sudo service mysql start

# Import the schema
mysql -u root < /workspaces/ICCT-STORE/database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database and tables created successfully!"
    echo "✅ Sample data inserted successfully!"
else
    echo "❌ Error creating database"
    exit 1
fi

echo ""
echo "======================================"
echo "Database Setup Complete!"
echo "======================================"
echo ""
echo "Database Name: icct_store"
echo "Tables created:"
echo "  - categories (4 categories)"
echo "  - products (55 products)"
echo ""
echo "To start the PHP server, run:"
echo "  php -S localhost:8080 -t /workspaces/ICCT-STORE"
echo ""
echo "API Endpoints:"
echo "  - http://localhost:8080/api/products.php?action=categories"
echo "  - http://localhost:8080/api/products.php?action=products&category=uniforms"
echo "  - http://localhost:8080/api/products.php?action=products&category=all-products"
echo ""
