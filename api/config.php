<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'icct_store');
define('DB_SOCKET', '/var/run/mysqld/mysqld.sock');

// Create connection using PDO
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4;unix_socket=" . DB_SOCKET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        $conn = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $conn;
    } catch(PDOException $e) {
        die(json_encode([
            'success' => false,
            'error' => 'Database connection failed: ' . $e->getMessage()
        ]));
    }
}

// Close connection
function closeDBConnection($conn) {
    $conn = null;
}
?>
