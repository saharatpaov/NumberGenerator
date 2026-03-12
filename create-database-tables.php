<?php
/**
 * Direct Database Table Creation Script
 * This script will create all necessary tables on the MySQL database
 * Server: sql12.freemysqlhosting.net:3306
 * Database: sql12819700
 */

// Database connection settings
$host = 'sql12.freemysqlhosting.net';
$dbname = 'sql12819700';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$port = 3306;

echo "<h1>🗄️ Creating Database Tables</h1>";
echo "<p><strong>Server:</strong> $host:$port</p>";
echo "<p><strong>Database:</strong> $dbname</p>";
echo "<hr>";

try {
    // Connect to database
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    
    echo "<p>✅ <strong>Connected to database successfully!</strong></p>";
    
    // Drop existing tables if they exist (for clean setup)
    echo "<h2>🧹 Cleaning up existing tables...</h2>";
    
    $dropTables = [
        'DROP TABLE IF EXISTS reservation_log',
        'DROP TABLE IF EXISTS reservation_stats', 
        'DROP TABLE IF EXISTS reservations'
    ];
    
    foreach ($dropTables as $sql) {
        try {
            $pdo->exec($sql);
            echo "<p>✅ Dropped existing table</p>";
        } catch (Exception $e) {
            echo "<p>ℹ️ Table didn't exist or couldn't be dropped</p>";
        }
    }
    
    // Create reservations table
    echo "<h2>📋 Creating 'reservations' table...</h2>";
    $createReservationsSQL = "
        CREATE TABLE reservations (
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
    echo "<p>✅ <strong>Table 'reservations' created successfully!</strong></p>";
    
    // Create reservation_log table
    echo "<h2>📝 Creating 'reservation_log' table...</h2>";
    $createLogSQL = "
        CREATE TABLE reservation_log (
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
    
    $pdo->exec($createLogSQL);
    echo "<p>✅ <strong>Table 'reservation_log' created successfully!</strong></p>";
    
    // Create reservation_stats table
    echo "<h2>📊 Creating 'reservation_stats' table...</h2>";
    $createStatsSQL = "
        CREATE TABLE reservation_stats (
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
    
    $pdo->exec($createStatsSQL);
    echo "<p>✅ <strong>Table 'reservation_stats' created successfully!</strong></p>";
    
    // Insert sample data
    echo "<h2>🎯 Inserting sample data...</h2>";
    $sampleDataSQL = "
        INSERT INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip, notes) VALUES
        ('123-456-7890', '1234567890123', 'Test Pattern', 'test', '127.0.0.1', 'Sample reservation for testing'),
        ('098-765-4321', '9876543210987', 'Thai Mobile No.', '06????????', '127.0.0.1', 'Thai mobile number reservation'),
        ('555-123-4567', '5555555555555', 'The Soloist', 'aaaaaaaaaa', '127.0.0.1', 'Soloist pattern reservation'),
        ('060-000-0000', '1100800000018', 'Thai Mobile No.', '06????????', '192.168.1.1', 'First Thai mobile number'),
        ('080-111-1111', '2200900000027', 'Thai Mobile No.', '08????????', '192.168.1.2', 'Second Thai mobile number')
    ";
    
    $pdo->exec($sampleDataSQL);
    echo "<p>✅ <strong>Sample reservations inserted!</strong></p>";
    
    // Insert corresponding log entries
    $logDataSQL = "
        INSERT INTO reservation_log (account_number, thai_id, action, ip_address, user_agent) VALUES
        ('123-456-7890', '1234567890123', 'reserve', '127.0.0.1', 'Database Setup Script'),
        ('098-765-4321', '9876543210987', 'reserve', '127.0.0.1', 'Database Setup Script'),
        ('555-123-4567', '5555555555555', 'reserve', '127.0.0.1', 'Database Setup Script'),
        ('060-000-0000', '1100800000018', 'reserve', '192.168.1.1', 'Database Setup Script'),
        ('080-111-1111', '2200900000027', 'reserve', '192.168.1.2', 'Database Setup Script')
    ";
    
    $pdo->exec($logDataSQL);
    echo "<p>✅ <strong>Sample log entries inserted!</strong></p>";
    
    // Show created tables
    echo "<h2>📋 Database Tables Summary</h2>";
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<ul>";
    foreach ($tables as $table) {
        // Get table info
        $infoStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
        $count = $infoStmt->fetch()['count'];
        echo "<li><strong>$table</strong> - $count records</li>";
    }
    echo "</ul>";
    
    // Show sample data
    echo "<h2>📄 Sample Active Reservations</h2>";
    $activeStmt = $pdo->query("
        SELECT account_number, thai_id, pattern_type, pattern, reserved_at, status 
        FROM reservations 
        WHERE status = 'active' 
        ORDER BY reserved_at DESC 
        LIMIT 10
    ");
    $activeReservations = $activeStmt->fetchAll();
    
    if ($activeReservations) {
        echo "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
        echo "<tr style='background-color: #f0f0f0;'>";
        echo "<th>Account Number</th><th>Thai ID</th><th>Pattern Type</th><th>Pattern</th><th>Reserved At</th><th>Status</th>";
        echo "</tr>";
        
        foreach ($activeReservations as $reservation) {
            echo "<tr>";
            echo "<td><strong>{$reservation['account_number']}</strong></td>";
            echo "<td>{$reservation['thai_id']}</td>";
            echo "<td>{$reservation['pattern_type']}</td>";
            echo "<td><code>{$reservation['pattern']}</code></td>";
            echo "<td>{$reservation['reserved_at']}</td>";
            echo "<td><span style='color: green;'>{$reservation['status']}</span></td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    
    // Test API connection
    echo "<h2>🔗 Testing API Connection</h2>";
    echo "<p>You can now test the reservation system:</p>";
    echo "<ul>";
    echo "<li><a href='api/test-connection.php' target='_blank'>Test Database Connection</a></li>";
    echo "<li><a href='api/reservations.php?numbers=123-456-7890,098-765-4321' target='_blank'>Test Reservation API</a></li>";
    echo "<li><a href='test-complete-reservation-system.html' target='_blank'>Complete System Test</a></li>";
    echo "<li><a href='index.html' target='_blank'>Main Application</a></li>";
    echo "</ul>";
    
    echo "<h2>🎉 Database Setup Complete!</h2>";
    echo "<p><strong>✅ All tables created successfully!</strong></p>";
    echo "<p><strong>✅ Sample data inserted!</strong></p>";
    echo "<p><strong>✅ Ready for reservation system!</strong></p>";
    
} catch (Exception $e) {
    echo "<h2>❌ Database Error</h2>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Code:</strong> " . $e->getCode() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " (Line: " . $e->getLine() . ")</p>";
    
    if ($e->getCode() == 1045) {
        echo "<p><strong>Solution:</strong> Check database credentials (username/password)</p>";
    } elseif ($e->getCode() == 2002) {
        echo "<p><strong>Solution:</strong> Check database host and port</p>";
    } elseif ($e->getCode() == 1049) {
        echo "<p><strong>Solution:</strong> Check database name</p>";
    }
}
?>