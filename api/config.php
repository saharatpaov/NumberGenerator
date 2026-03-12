<?php
/**
 * Database Configuration
 * MySQL connection settings for number reservation system
 */

// Database connection settings
define('DB_HOST', 'sql12.freemysqlhosting.net');
define('DB_NAME', 'sql12819700');
define('DB_USER', 'sql12819700');
define('DB_PASS', 'v1n8JbB6yt');
define('DB_PORT', 3306);

// CORS headers for frontend access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

/**
 * Get database connection
 * @return PDO Database connection
 */
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Database connection failed: ' . $e->getMessage()
        ]);
        exit();
    }
}

/**
 * Send JSON response
 * @param array $data Response data
 * @param int $statusCode HTTP status code
 */
function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

/**
 * Validate Thai ID format
 * @param string $thaiId Thai ID to validate
 * @return bool True if valid
 */
function validateThaiId($thaiId) {
    // Remove any spaces or dashes
    $thaiId = preg_replace('/[\s-]/', '', $thaiId);
    
    // Check if it's exactly 13 digits
    if (!preg_match('/^\d{13}$/', $thaiId)) {
        return false;
    }
    
    // Validate checksum using Thai ID algorithm
    $sum = 0;
    for ($i = 0; $i < 12; $i++) {
        $sum += intval($thaiId[$i]) * (13 - $i);
    }
    
    $checkDigit = (11 - ($sum % 11)) % 10;
    return $checkDigit == intval($thaiId[12]);
}

/**
 * Sanitize account number format
 * @param string $accountNumber Account number to sanitize
 * @return string Sanitized account number
 */
function sanitizeAccountNumber($accountNumber) {
    // Remove any spaces and keep only digits and dashes
    return preg_replace('/[^\d-]/', '', trim($accountNumber));
}
?>