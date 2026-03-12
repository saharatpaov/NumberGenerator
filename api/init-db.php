<?php
/**
 * Database Initialization Script
 * Creates the reservations table if it doesn't exist
 * Connects to: sql12.freemysqlhosting.net:3306
 * Database: sql12819700
 */

require_once 'config.php';

try {
    $pdo = getDBConnection();
    
    echo "<h2>Database Connection Test</h2>";
    echo "<p>✅ Successfully connected to MySQL database!</p>";
    echo "<p><strong>Server:</strong> " . DB_HOST . ":" . DB_PORT . "</p>";
    echo "<p><strong>Database:</strong> " . DB_NAME . "</p>";
    echo "<p><strong>User:</strong> " . DB_USER . "</p>";
    
    // Create reservations table
    $createReservationsSQL = "
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL UNIQUE COMMENT 'Account number in XXX-XXX-XXXX format',
            thai_id VARCHAR(13) NOT NULL COMMENT 'Thai national ID (13 digits)',
            pattern_type VARCHAR(50) NOT NULL COMMENT 'Pattern type (e.g., Thai Mobile No., The Soloist)',
            pattern VARCHAR(20) NOT NULL COMMENT 'Original pattern (e.g., 06????????)',
            reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Reservation timestamp',
            reserved_by_ip VARCHAR(45) DEFAULT NULL COMMENT 'IP address of the user who made reservation',
            status ENUM('active', 'cancelled') DEFAULT 'active' COMMENT 'Reservation status',
            notes TEXT DEFAULT NULL COMMENT 'Additional notes',
            
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_pattern (pattern),
            INDEX idx_pattern_type (pattern_type),
            INDEX idx_reserved_at (reserved_at),
            INDEX idx_status (status),
            INDEX idx_thai_id_status (thai_id, status),
            INDEX idx_pattern_status (pattern, status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Account number reservations'
    ";
    
    $pdo->exec($createReservationsSQL);
    echo "<p>✅ Table 'reservations' created successfully!</p>";
    
    // Create reservation_log table for audit trail
    $createLogTableSQL = "
        CREATE TABLE IF NOT EXISTS reservation_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL COMMENT 'Account number',
            thai_id VARCHAR(13) NOT NULL COMMENT 'Thai national ID',
            action ENUM('reserve', 'cancel', 'update') NOT NULL COMMENT 'Action performed',
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Action timestamp',
            ip_address VARCHAR(45) DEFAULT NULL COMMENT 'User IP address',
            user_agent TEXT DEFAULT NULL COMMENT 'User agent string',
            old_values JSON DEFAULT NULL COMMENT 'Previous values (for updates)',
            new_values JSON DEFAULT NULL COMMENT 'New values (for updates)',
            
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_action (action),
            INDEX idx_timestamp (timestamp),
            INDEX idx_account_action (account_number, action),
            INDEX idx_thai_action (thai_id, action)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Reservation audit log'
    ";
    
    $pdo->exec($createLogTableSQL);
    echo "<p>✅ Table 'reservation_log' created successfully!</p>";
    
    // Create statistics table
    $createStatsTableSQL = "
        CREATE TABLE IF NOT EXISTS reservation_stats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            date_recorded DATE NOT NULL COMMENT 'Statistics date',
            pattern_type VARCHAR(50) NOT NULL COMMENT 'Pattern type',
            total_reservations INT DEFAULT 0 COMMENT 'Total reservations for this pattern type',
            active_reservations INT DEFAULT 0 COMMENT 'Active reservations',
            cancelled_reservations INT DEFAULT 0 COMMENT 'Cancelled reservations',
            unique_users INT DEFAULT 0 COMMENT 'Unique users who made reservations',
            
            INDEX idx_date_pattern (date_recorded, pattern_type),
            UNIQUE KEY unique_date_pattern (date_recorded, pattern_type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daily reservation statistics'
    ";
    
    $pdo->exec($createStatsTableSQL);
    echo "<p>✅ Table 'reservation_stats' created successfully!</p>";
    
    // Create views
    $createActiveReservationsView = "
        CREATE OR REPLACE VIEW active_reservations AS
        SELECT 
            r.account_number,
            r.thai_id,
            r.pattern_type,
            r.pattern,
            r.reserved_at,
            r.reserved_by_ip,
            DATEDIFF(NOW(), r.reserved_at) as days_reserved
        FROM reservations r
        WHERE r.status = 'active'
        ORDER BY r.reserved_at DESC
    ";
    
    $pdo->exec($createActiveReservationsView);
    echo "<p>✅ View 'active_reservations' created successfully!</p>";
    
    // Insert sample data for testing (only if tables are empty)
    $countStmt = $pdo->query("SELECT COUNT(*) as count FROM reservations");
    $count = $countStmt->fetch()['count'];
    
    if ($count == 0) {
        $sampleDataSQL = "
            INSERT INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip, notes) VALUES
            ('123-456-7890', '1234567890123', 'Test Pattern', 'test', '127.0.0.1', 'Sample reservation for testing'),
            ('098-765-4321', '9876543210987', 'Thai Mobile No.', '06????????', '127.0.0.1', 'Thai mobile number reservation'),
            ('555-123-4567', '5555555555555', 'The Soloist', 'aaaaaaaaaa', '127.0.0.1', 'Soloist pattern reservation')
        ";
        
        $pdo->exec($sampleDataSQL);
        
        $logDataSQL = "
            INSERT INTO reservation_log (account_number, thai_id, action, ip_address, user_agent) VALUES
            ('123-456-7890', '1234567890123', 'reserve', '127.0.0.1', 'Database Init Script'),
            ('098-765-4321', '9876543210987', 'reserve', '127.0.0.1', 'Database Init Script'),
            ('555-123-4567', '5555555555555', 'reserve', '127.0.0.1', 'Database Init Script')
        ";
        
        $pdo->exec($logDataSQL);
        echo "<p>✅ Sample data inserted successfully!</p>";
    } else {
        echo "<p>ℹ️ Sample data already exists ($count records found)</p>";
    }
    
    // Show table information
    echo "<h3>Database Tables Created:</h3>";
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<ul>";
    foreach ($tables as $table) {
        echo "<li><strong>$table</strong></li>";
    }
    echo "</ul>";
    
    // Show sample data
    echo "<h3>Sample Active Reservations:</h3>";
    $activeStmt = $pdo->query("SELECT * FROM active_reservations LIMIT 5");
    $activeReservations = $activeStmt->fetchAll();
    
    if ($activeReservations) {
        echo "<table border='1' cellpadding='5' cellspacing='0'>";
        echo "<tr><th>Account Number</th><th>Thai ID</th><th>Pattern Type</th><th>Pattern</th><th>Reserved At</th><th>Days Reserved</th></tr>";
        foreach ($activeReservations as $reservation) {
            echo "<tr>";
            echo "<td>{$reservation['account_number']}</td>";
            echo "<td>{$reservation['thai_id']}</td>";
            echo "<td>{$reservation['pattern_type']}</td>";
            echo "<td>{$reservation['pattern']}</td>";
            echo "<td>{$reservation['reserved_at']}</td>";
            echo "<td>{$reservation['days_reserved']}</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p>No active reservations found.</p>";
    }
    
    // Return JSON response for API calls
    if (isset($_GET['format']) && $_GET['format'] === 'json') {
        sendResponse([
            'success' => true,
            'message' => 'Database tables created successfully',
            'tables' => $tables,
            'sample_data_count' => $count,
            'active_reservations' => count($activeReservations)
        ]);
    }
    
} catch (Exception $e) {
    echo "<h2>❌ Database Error</h2>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Code:</strong> " . $e->getCode() . "</p>";
    
    if (isset($_GET['format']) && $_GET['format'] === 'json') {
        sendResponse([
            'success' => false,
            'error' => 'Failed to create tables: ' . $e->getMessage(),
            'error_code' => $e->getCode()
        ], 500);
    }
}
?>