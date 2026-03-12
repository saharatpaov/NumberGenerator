<?php
/**
 * Direct Database Connection Test
 * Using exact connection parameters provided by user
 */

// Exact connection parameters from user
$host = 'sql12.freemysqlhosting.net';
$dbname = 'sql12819700';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$port = 3306;

echo "<h1>🔍 Direct Database Connection Test</h1>";
echo "<p><strong>Using exact parameters provided:</strong></p>";
echo "<ul>";
echo "<li><strong>Server:</strong> $host</li>";
echo "<li><strong>Name:</strong> $dbname</li>";
echo "<li><strong>Username:</strong> $username</li>";
echo "<li><strong>Password:</strong> " . substr($password, 0, 3) . str_repeat('*', strlen($password) - 3) . "</li>";
echo "<li><strong>Port:</strong> $port</li>";
echo "</ul>";
echo "<hr>";

// Test 1: Basic PHP Extensions
echo "<h2>Step 1: PHP Extensions Check</h2>";
if (extension_loaded('pdo')) {
    echo "<p>✅ PDO extension is loaded</p>";
} else {
    echo "<p>❌ PDO extension is NOT loaded</p>";
    exit();
}

if (extension_loaded('pdo_mysql')) {
    echo "<p>✅ PDO MySQL extension is loaded</p>";
} else {
    echo "<p>❌ PDO MySQL extension is NOT loaded</p>";
    exit();
}

// Test 2: DNS Resolution
echo "<h2>Step 2: DNS Resolution Test</h2>";
$ip = gethostbyname($host);
if ($ip !== $host) {
    echo "<p>✅ DNS resolved: $host → $ip</p>";
} else {
    echo "<p>⚠️ DNS resolution may have issues</p>";
}

// Test 3: Port Connection Test
echo "<h2>Step 3: Port Connection Test</h2>";
$connection = @fsockopen($host, $port, $errno, $errstr, 10);
if ($connection) {
    echo "<p>✅ Port $port is accessible on $host</p>";
    fclose($connection);
} else {
    echo "<p>❌ Cannot connect to port $port on $host</p>";
    echo "<p><strong>Error:</strong> $errstr (Code: $errno)</p>";
    echo "<p><strong>Possible issues:</strong></p>";
    echo "<ul>";
    echo "<li>Firewall blocking the connection</li>";
    echo "<li>Server is down</li>";
    echo "<li>Port is incorrect</li>";
    echo "<li>Network connectivity issues</li>";
    echo "</ul>";
}

// Test 4: MySQL Connection Attempt
echo "<h2>Step 4: MySQL Connection Attempt</h2>";

// Try different DSN formats
$dsnFormats = [
    "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
    "mysql:host=$host;port=$port;dbname=$dbname",
    "mysql:host=$host:$port;dbname=$dbname;charset=utf8mb4",
    "mysql:host=$host;dbname=$dbname;charset=utf8mb4"
];

$connected = false;
$workingDsn = null;
$pdo = null;

foreach ($dsnFormats as $index => $dsn) {
    echo "<p><strong>Attempt " . ($index + 1) . ":</strong> $dsn</p>";
    
    try {
        $pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 30,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
        ]);
        
        echo "<p>✅ <strong style='color: green;'>CONNECTION SUCCESSFUL!</strong></p>";
        $connected = true;
        $workingDsn = $dsn;
        break;
        
    } catch (PDOException $e) {
        echo "<p>❌ Failed: " . $e->getMessage() . "</p>";
        
        // Specific error handling
        switch ($e->getCode()) {
            case 1045:
                echo "<p>🔑 <strong>Access Denied:</strong> Username or password is incorrect</p>";
                break;
            case 2002:
                echo "<p>🌐 <strong>Connection Refused:</strong> Cannot reach the server</p>";
                break;
            case 1049:
                echo "<p>🗄️ <strong>Unknown Database:</strong> Database name is incorrect</p>";
                break;
            case 2006:
                echo "<p>⏱️ <strong>Server Gone Away:</strong> Connection timeout</p>";
                break;
        }
    }
}

if (!$connected) {
    echo "<h2>❌ All Connection Attempts Failed</h2>";
    echo "<p><strong>Troubleshooting Steps:</strong></p>";
    echo "<ol>";
    echo "<li>Verify the database credentials are correct</li>";
    echo "<li>Check if the database server is online</li>";
    echo "<li>Ensure your hosting provider allows external connections</li>";
    echo "<li>Check if there are any firewall restrictions</li>";
    echo "<li>Contact your database provider for support</li>";
    echo "</ol>";
    
    echo "<h3>🔧 Alternative Connection Methods</h3>";
    echo "<p>Try using mysqli instead of PDO:</p>";
    
    // Try mysqli connection
    if (function_exists('mysqli_connect')) {
        echo "<p><strong>Testing mysqli connection...</strong></p>";
        $mysqli = @mysqli_connect($host, $username, $password, $dbname, $port);
        
        if ($mysqli) {
            echo "<p>✅ <strong>mysqli connection successful!</strong></p>";
            echo "<p>Server info: " . mysqli_get_server_info($mysqli) . "</p>";
            mysqli_close($mysqli);
        } else {
            echo "<p>❌ mysqli connection also failed: " . mysqli_connect_error() . "</p>";
        }
    }
    
    exit();
}

// Test 5: Database Operations
echo "<h2>Step 5: Database Operations Test</h2>";

try {
    // Get server information
    $stmt = $pdo->query("SELECT VERSION() as version");
    $version = $stmt->fetch()['version'];
    
    $stmt = $pdo->query("SELECT DATABASE() as current_db");
    $database = $stmt->fetch()['current_db'];
    
    $stmt = $pdo->query("SELECT USER() as current_user");
    $user = $stmt->fetch()['current_user'];
    
    $stmt = $pdo->query("SELECT NOW() as server_time");
    $time = $stmt->fetch()['server_time'];
    
    $info = [
        'version' => $version,
        'current_db' => $database,
        'current_user' => $user,
        'server_time' => $time
    ];
    
    echo "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>";
    echo "<tr><td><strong>MySQL Version</strong></td><td>{$info['version']}</td></tr>";
    echo "<tr><td><strong>Current Database</strong></td><td>{$info['current_db']}</td></tr>";
    echo "<tr><td><strong>Current User</strong></td><td>{$info['current_user']}</td></tr>";
    echo "<tr><td><strong>Server Time</strong></td><td>{$info['server_time']}</td></tr>";
    echo "</table>";
    
    // Test table creation permissions
    echo "<h3>Testing Table Creation...</h3>";
    
    // Try to create a test table
    $createTestTable = "
        CREATE TABLE IF NOT EXISTS test_connection (
            id INT AUTO_INCREMENT PRIMARY KEY,
            test_data VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    
    $pdo->exec($createTestTable);
    echo "<p>✅ Test table created successfully</p>";
    
    // Insert test data
    $pdo->exec("INSERT INTO test_connection (test_data) VALUES ('Connection test successful')");
    echo "<p>✅ Test data inserted successfully</p>";
    
    // Read test data
    $stmt = $pdo->query("SELECT * FROM test_connection ORDER BY id DESC LIMIT 1");
    $testData = $stmt->fetch();
    echo "<p>✅ Test data retrieved: {$testData['test_data']}</p>";
    
    // Clean up test table
    $pdo->exec("DROP TABLE IF EXISTS test_connection");
    echo "<p>✅ Test table cleaned up</p>";
    
    echo "<h2>🎉 Database Connection Fully Working!</h2>";
    echo "<p><strong>Working DSN:</strong> $workingDsn</p>";
    
    // Now create the actual reservation tables
    echo "<h2>Step 6: Creating Reservation Tables</h2>";
    
    // Create reservations table
    $createReservationsSQL = "
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
    
    $pdo->exec($createReservationsSQL);
    echo "<p>✅ <strong>reservations</strong> table created</p>";
    
    // Create reservation_log table
    $createLogSQL = "
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
    
    $pdo->exec($createLogSQL);
    echo "<p>✅ <strong>reservation_log</strong> table created</p>";
    
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
    
    echo "<p>✅ Sample data inserted</p>";
    
    // Show created tables
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>📋 Created Tables:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
        $count = $countStmt->fetch()['count'];
        echo "<li><strong>$table</strong> ($count records)</li>";
    }
    echo "</ul>";
    
    // Show sample reservations
    if (in_array('reservations', $tables)) {
        echo "<h3>📄 Sample Reservations:</h3>";
        $sampleStmt = $pdo->query("SELECT * FROM reservations LIMIT 5");
        $samples = $sampleStmt->fetchAll();
        
        echo "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>";
        echo "<tr><th>Account Number</th><th>Thai ID</th><th>Pattern Type</th><th>Status</th><th>Reserved At</th></tr>";
        foreach ($samples as $sample) {
            echo "<tr>";
            echo "<td><strong>{$sample['account_number']}</strong></td>";
            echo "<td>{$sample['thai_id']}</td>";
            echo "<td>{$sample['pattern_type']}</td>";
            echo "<td><span style='color: green;'>{$sample['status']}</span></td>";
            echo "<td>{$sample['reserved_at']}</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    
    echo "<h2>🎯 Next Steps</h2>";
    echo "<p>✅ Database connection is working perfectly!</p>";
    echo "<p>✅ All tables have been created successfully!</p>";
    echo "<p>✅ Sample data has been inserted!</p>";
    echo "<br>";
    echo "<p><strong>You can now:</strong></p>";
    echo "<ul>";
    echo "<li><a href='api/reservations.php?numbers=123-456-7890,098-765-4321' target='_blank'>Test Reservation API</a></li>";
    echo "<li><a href='test-complete-reservation-system.html' target='_blank'>Run Complete System Test</a></li>";
    echo "<li><a href='index.html' target='_blank'>Use the Main Application</a></li>";
    echo "</ul>";
    
} catch (Exception $e) {
    echo "<p>❌ <strong>Database operation failed:</strong> " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><em>Test completed at: " . date('Y-m-d H:i:s T') . "</em></p>";
?>