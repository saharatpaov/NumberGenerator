<?php
// Simple database test
$host = 'sql12.freemysqlhosting.net';
$dbname = 'sql12819700';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$port = 3306;

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "✅ Database connection successful!\n";
    
    // Test simple query
    $stmt = $pdo->query("SELECT 1 as test");
    $result = $stmt->fetch();
    echo "✅ Simple query works: " . $result['test'] . "\n";
    
    // Create tables
    echo "Creating tables...\n";
    
    $createReservations = "
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL UNIQUE,
            thai_id VARCHAR(13) NOT NULL,
            pattern_type VARCHAR(50) NOT NULL,
            pattern VARCHAR(20) NOT NULL,
            reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reserved_by_ip VARCHAR(45) DEFAULT NULL,
            status ENUM('active', 'cancelled') DEFAULT 'active',
            notes TEXT DEFAULT NULL,
            
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_pattern (pattern),
            INDEX idx_reserved_at (reserved_at),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createReservations);
    echo "✅ reservations table created\n";
    
    $createLog = "
        CREATE TABLE IF NOT EXISTS reservation_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_number VARCHAR(15) NOT NULL,
            thai_id VARCHAR(13) NOT NULL,
            action ENUM('reserve', 'cancel') NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ip_address VARCHAR(45) DEFAULT NULL,
            user_agent TEXT DEFAULT NULL,
            
            INDEX idx_account_number (account_number),
            INDEX idx_thai_id (thai_id),
            INDEX idx_timestamp (timestamp)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createLog);
    echo "✅ reservation_log table created\n";
    
    // Insert sample data
    $sampleData = [
        ['123-456-7890', '1234567890123', 'Test Pattern', 'test'],
        ['098-765-4321', '9876543210987', 'Thai Mobile No.', '06????????'],
        ['555-123-4567', '5555555555555', 'The Soloist', 'aaaaaaaaaa']
    ];
    
    $insertStmt = $pdo->prepare("
        INSERT IGNORE INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip) 
        VALUES (?, ?, ?, ?, ?)
    ");
    
    foreach ($sampleData as $data) {
        $insertStmt->execute([$data[0], $data[1], $data[2], $data[3], '127.0.0.1']);
    }
    
    echo "✅ Sample data inserted\n";
    
    // Check tables
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "📋 Tables in database:\n";
    foreach ($tables as $table) {
        $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
        $count = $countStmt->fetch()['count'];
        echo "  - $table ($count records)\n";
    }
    
    // Show sample reservations
    $sampleStmt = $pdo->query("SELECT * FROM reservations LIMIT 3");
    $samples = $sampleStmt->fetchAll();
    
    echo "\n📄 Sample reservations:\n";
    foreach ($samples as $sample) {
        echo "  - {$sample['account_number']} -> {$sample['thai_id']} ({$sample['pattern_type']})\n";
    }
    
    echo "\n🎉 Database setup complete!\n";
    echo "✅ Connection working\n";
    echo "✅ Tables created\n";
    echo "✅ Sample data inserted\n";
    echo "✅ Ready for reservation system\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>