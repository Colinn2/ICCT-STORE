<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

// Get all categories
function getCategories() {
    $conn = getDBConnection();
    
    $sql = "SELECT id, name, slug, description FROM categories ORDER BY id";
    $stmt = $conn->query($sql);
    $categories = $stmt->fetchAll();
    
    closeDBConnection($conn);
    return $categories;
}

// Get products by category
function getProductsByCategory($categorySlug) {
    $conn = getDBConnection();
    
    $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE c.slug = :slug AND p.is_active = 1 
            ORDER BY p.name";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute(['slug' => $categorySlug]);
    $products = $stmt->fetchAll();
    
    closeDBConnection($conn);
    return $products;
}

// Get all products
function getAllProducts() {
    $conn = getDBConnection();
    
    $sql = "SELECT p.*, c.name as category_name, c.slug as category_slug 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE p.is_active = 1 
            ORDER BY c.id, p.name";
    
    $stmt = $conn->query($sql);
    $products = $stmt->fetchAll();
    
    closeDBConnection($conn);
    return $products;
}

// Handle API requests
$action = isset($_GET['action']) ? $_GET['action'] : '';
$category = isset($_GET['category']) ? $_GET['category'] : '';

switch ($action) {
    case 'categories':
        echo json_encode([
            'success' => true,
            'data' => getCategories()
        ]);
        break;
        
    case 'products':
        if ($category && $category !== 'all-products') {
            $products = getProductsByCategory($category);
        } else {
            $products = getAllProducts();
        }
        echo json_encode([
            'success' => true,
            'data' => $products
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'error' => 'Invalid action'
        ]);
        break;
}
?>
