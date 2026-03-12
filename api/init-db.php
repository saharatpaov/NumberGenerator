<?php
/**
 * Database Initialization Script
 * Creates the reservations table if it doesn't exist
 */

require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    // Create reservations table
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL UNIQUE,
            thai_id VARCHAR(13) NOT NULL,
            pattern_type VARCHAR(50) NOT NULL,
            pattern VARCHAR(20) NOT NULL,
            reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reserved_by_ip VARCHAR(45),
            status ENUM('active', 'cancelled') DEFAULT 'active',
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_pattern (pattern),
            INDEX idx_reserved_at (reserved_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createTableSQL);
    
    // Create reservation_log table for audit trail
    $createLogTableSQL = "
        CREATE TABLE IF NOT EXISTS reservation_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL,
            thai_id VARCHAR(13) NOT NULL,
            action ENUM('reserve', 'cancel') NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ip_address VARCHAR(45),
            user_agent TEXT,
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_timestamp (timestamp)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createLogTableSQL);
    
    sendResponse([
        'success' => true,
        'message' => 'Database tables created successfully',
        'tables' => ['reservations', 'reservation_log']
    ]);
    
} catch (Exception $e) {
    sendResponse([
        'success' => false,
        'error' => 'Failed to create tables: ' . $e->getMessage()
    ], 500);
}
?>