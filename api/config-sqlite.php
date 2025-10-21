<?php
// SQLite Database Configuration
define('DB_PATH', __DIR__ . '/../database/icct_store.db');

function getDBConnection() {
    try {
        $db = new PDO('sqlite:' . DB_PATH);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $db;
    } catch(PDOException $e) {
        die(json_encode([
            'success' => false,
            'error' => 'Database connection failed: ' . $e->getMessage()
        ]));
    }
}

function closeDBConnection($conn) {
    $conn = null;
}
?>
