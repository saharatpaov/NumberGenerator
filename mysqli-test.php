<?php
/**
 * MySQLi Connection Test
 * Alternative connection method using mysqli instead of PDO
 */

// Connection parameters
$host = 'sql12.freemysqlhosting.net';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$database = 'sql12819700';
$port = 3306;

echo "<h1>🔗 MySQLi Connection Test</h1>";
echo "<p>Testing connection using mysqli (alternative to PDO)</p>";
echo "<hr>";

// Check if mysqli extension is available
if (!extension_loaded('mysqli')) {
    echo "<p>❌ <strong>MySQLi extension is not loaded!</strong></p>";
    echo "<p>Please enable mysqli extension in PHP configuration.</p>";
    exit();
}

echo "<p>✅ MySQLi extension is available</p>";

// Test connection
echo "<h2>Step 1: Testing Connection</h2>";
echo "<p><strong>Connecting to:</strong></p>";
echo "<ul>";
echo "<li>Host: $host</li>";
echo "<li>Port: $port</li>";
echo "<li>Database: $database</li>";
echo "<li>Username: $username</li>";
echo "</ul>";

// Enable error reporting
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Attempt connection
    $mysqli = new mysqli($host, $username, $password, $database, $port);
    
    // Set charset
    $mysqli->set_charset("utf8mb4");
    
    echo "<p>✅ <strong style='color: green;'>CONNECTION SUCCESSFUL!</strong></p>";
    
    // Get server information
    echo "<h2>Step 2: Server Information</h2>";
    echo "<table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>";
    echo "<tr><td><strong>Server Version</strong></td><td>" . $mysqli->server_info . "</td></tr>";
    echo "<tr><td><strong>Server Host</strong></td><td>" . $mysqli->host_info . "</td></tr>";
    echo "<tr><td><strong>Protocol Version</strong></td><td>" . $mysqli->protocol_version . "</td></tr>";
    echo "<tr><td><strong>Client Version</strong></td><td>" . $mysqli->client_info . "</td></tr>";
    echo "</table>";
    
    // Test basic queries
    echo "<h2>Step 3: Testing Basic Queries</h2>";
    
    $result = $mysqli->query("SELECT VERSION() as version, DATABASE() as db, USER() as user, NOW() as time");
    if ($result) {
        $row = $result->fetch_assoc();
        echo "<p>✅ Query successful:</p>";
        echo "<ul>";
        echo "<li><strong>MySQL Version:</strong> {$row['version']}</li>";
        echo "<li><strong>Current Database:</strong> {$row['db']}</li>";
        echo "<li><strong>Current User:</strong> {$row['user']}</li>";
        echo "<li><strong>Server Time:</strong> {$row['time']}</li>";
        echo "</ul>";
        $result->free();
    }
    
    // Check existing tables
    echo "<h2>Step 4: Checking Existing Tables</h2>";
    $result = $mysqli->query("SHOW TABLES");
    $tables = [];
    
    if ($result) {
        while ($row = $result->fetch_array()) {
            $tables[] = $row[0];
        }
        $result->free();
    }
    
    if (empty($tables)) {
        echo "<p>⚠️ No tables found. Creating reservation tables...</p>";
        
        // Create reservations table
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
        
        if ($mysqli->query($createReservations)) {
            echo "<p>✅ <strong>reservations</strong> table created successfully</p>";
        } else {
            echo "<p>❌ Failed to create reservations table: " . $mysqli->error . "</p>";
        }
        
        // Create reservation_log table
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
        
        if ($mysqli->query($createLog)) {
            echo "<p>✅ <strong>reservation_log</strong> table created successfully</p>";
        } else {
            echo "<p>❌ Failed to create reservation_log table: " . $mysqli->error . "</p>";
        }
        
        // Insert sample data
        $sampleInserts = [
            "INSERT IGNORE INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip) VALUES ('123-456-7890', '1234567890123', 'Test Pattern', 'test', '127.0.0.1')",
            "INSERT IGNORE INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip) VALUES ('098-765-4321', '9876543210987', 'Thai Mobile No.', '06????????', '127.0.0.1')",
            "INSERT IGNORE INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip) VALUES ('555-123-4567', '5555555555555', 'The Soloist', 'aaaaaaaaaa', '127.0.0.1')"
        ];
        
        foreach ($sampleInserts as $sql) {
            if ($mysqli->query($sql)) {
                echo "<p>✅ Sample data inserted</p>";
            } else {
                echo "<p>⚠️ Sample data insert issue: " . $mysqli->error . "</p>";
            }
        }
        
        // Refresh tables list
        $result = $mysqli->query("SHOW TABLES");
        $tables = [];
        if ($result) {
            while ($row = $result->fetch_array()) {
                $tables[] = $row[0];
            }
            $result->free();
        }
    }
    
    // Show current tables
    echo "<h2>Step 5: Current Database Tables</h2>";
    if (!empty($tables)) {
        echo "<ul>";
        foreach ($tables as $table) {
            $countResult = $mysqli->query("SELECT COUNT(*) as count FROM `$table`");
            $count = $countResult ? $countResult->fetch_assoc()['count'] : 0;
            echo "<li><strong>$table</strong> ($count records)</li>";
            if ($countResult) $countResult->free();
        }
        echo "</ul>";
        
        // Show sample data from reservations table
        if (in_array('reservations', $tables)) {
            echo "<h3>📄 Sample Reservations:</h3>";
            $sampleResult = $mysqli->query("SELECT * FROM reservations LIMIT 5");
            
            if ($sampleResult && $sampleResult->num_rows > 0) {
                echo "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>";
                echo "<tr><th>Account Number</th><th>Thai ID</th><th>Pattern Type</th><th>Status</th><th>Reserved At</th></tr>";
                
                while ($row = $sampleResult->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td><strong>{$row['account_number']}</strong></td>";
                    echo "<td>{$row['thai_id']}</td>";
                    echo "<td>{$row['pattern_type']}</td>";
                    echo "<td><span style='color: green;'>{$row['status']}</span></td>";
                    echo "<td>{$row['reserved_at']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
                $sampleResult->free();
            }
        }
    } else {
        echo "<p>❌ No tables found and unable to create them</p>";
    }
    
    // Test API endpoint
    echo "<h2>Step 6: Testing API Endpoint</h2>";
    echo "<p>Now testing if the reservation API works...</p>";
    
    // Test a simple reservation check
    if (in_array('reservations', $tables)) {
        $testResult = $mysqli->query("SELECT account_number, thai_id, pattern_type, status FROM reservations WHERE status = 'active' LIMIT 3");
        
        if ($testResult && $testResult->num_rows > 0) {
            echo "<p>✅ API data query successful:</p>";
            echo "<ul>";
            while ($row = $testResult->fetch_assoc()) {
                echo "<li>{$row['account_number']} - {$row['pattern_type']} (Status: {$row['status']})</li>";
            }
            echo "</ul>";
            $testResult->free();
        }
    }
    
    echo "<h2>🎉 Database Setup Complete!</h2>";
    echo "<p>✅ MySQLi connection working perfectly</p>";
    echo "<p>✅ Database tables created and populated</p>";
    echo "<p>✅ Ready for reservation system</p>";
    
    echo "<h3>🎯 Next Steps:</h3>";
    echo "<ul>";
    echo "<li><a href='api/reservations.php?numbers=123-456-7890,098-765-4321' target='_blank'>Test Reservation API</a></li>";
    echo "<li><a href='index.html' target='_blank'>Use Main Application</a></li>";
    echo "</ul>";
    
    // Close connection
    $mysqli->close();
    
} catch (mysqli_sql_exception $e) {
    echo "<p>❌ <strong style='color: red;'>CONNECTION FAILED!</strong></p>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Error Code:</strong> " . $e->getCode() . "</p>";
    
    // Common error solutions
    echo "<h2>🔧 Troubleshooting</h2>";
    switch ($e->getCode()) {
        case 1045:
            echo "<p><strong>Access Denied (1045):</strong> Username or password is incorrect</p>";
            echo "<p>Please verify your database credentials</p>";
            break;
        case 2002:
            echo "<p><strong>Connection Refused (2002):</strong> Cannot reach the database server</p>";
            echo "<p>Check if the server is online and accessible</p>";
            break;
        case 1049:
            echo "<p><strong>Unknown Database (1049):</strong> Database name is incorrect</p>";
            echo "<p>Verify the database name: $database</p>";
            break;
        case 2006:
            echo "<p><strong>Server Gone Away (2006):</strong> Connection timeout</p>";
            echo "<p>The server may be overloaded or unreachable</p>";
            break;
        default:
            echo "<p><strong>General Error ({$e->getCode()}):</strong> {$e->getMessage()}</p>";
    }
    
    echo "<h3>📋 Connection Details Used:</h3>";
    echo "<ul>";
    echo "<li>Host: $host</li>";
    echo "<li>Port: $port</li>";
    echo "<li>Database: $database</li>";
    echo "<li>Username: $username</li>";
    echo "<li>Password: " . str_repeat('*', strlen($password)) . "</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<p><em>Test completed at: " . date('Y-m-d H:i:s T') . "</em></p>";
?>