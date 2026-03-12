<?php
/**
 * Database Connection Test Script
 * Tests connection to MySQL database and displays server information
 */

// Database connection settings
$host = 'sql12.freemysqlhosting.net';
$dbname = 'sql12819700';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$port = 3306;

echo "<h1>MySQL Database Connection Test</h1>";
echo "<hr>";

// Test 1: Basic Connection Test
echo "<h2>Test 1: Basic Connection</h2>";
try {
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    
    echo "<p>✅ <strong>SUCCESS:</strong> Connected to MySQL database!</p>";
    echo "<p><strong>Server:</strong> $host:$port</p>";
    echo "<p><strong>Database:</strong> $dbname</p>";
    echo "<p><strong>Username:</strong> $username</p>";
    
} catch (PDOException $e) {
    echo "<p>❌ <strong>FAILED:</strong> " . $e->getMessage() . "</p>";
    exit();
}

// Test 2: Server Information
echo "<h2>Test 2: Server Information</h2>";
try {
    $stmt = $pdo->query("SELECT VERSION() as version");
    $version = $stmt->fetch()['version'];
    echo "<p><strong>MySQL Version:</strong> $version</p>";
    
    $stmt = $pdo->query("SELECT DATABASE() as current_db");
    $currentDb = $stmt->fetch()['current_db'];
    echo "<p><strong>Current Database:</strong> $currentDb</p>";
    
    $stmt = $pdo->query("SELECT USER() as current_user");
    $currentUser = $stmt->fetch()['current_user'];
    echo "<p><strong>Current User:</strong> $currentUser</p>";
    
    $stmt = $pdo->query("SELECT NOW() as server_time");
    $serverTime = $stmt->fetch()['server_time'];
    echo "<p><strong>Server Time:</strong> $serverTime</p>";
    
} catch (PDOException $e) {
    echo "<p>❌ <strong>ERROR:</strong> " . $e->getMessage() . "</p>";
}

// Test 3: Database Permissions
echo "<h2>Test 3: Database Permissions</h2>";
try {
    // Test SELECT permission
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo "<p>✅ <strong>SELECT Permission:</strong> OK</p>";
    echo "<p><strong>Existing Tables:</strong> " . (count($tables) > 0 ? implode(', ', $tables) : 'None') . "</p>";
    
    // Test CREATE permission
    $testTableSQL = "CREATE TABLE IF NOT EXISTS test_permissions (id INT PRIMARY KEY, test_data VARCHAR(50))";
    $pdo->exec($testTableSQL);
    echo "<p>✅ <strong>CREATE Permission:</strong> OK</p>";
    
    // Test INSERT permission
    $pdo->exec("INSERT IGNORE INTO test_permissions (id, test_data) VALUES (1, 'test')");
    echo "<p>✅ <strong>INSERT Permission:</strong> OK</p>";
    
    // Test UPDATE permission
    $pdo->exec("UPDATE test_permissions SET test_data = 'updated' WHERE id = 1");
    echo "<p>✅ <strong>UPDATE Permission:</strong> OK</p>";
    
    // Test DELETE permission
    $pdo->exec("DELETE FROM test_permissions WHERE id = 1");
    echo "<p>✅ <strong>DELETE Permission:</strong> OK</p>";
    
    // Clean up test table
    $pdo->exec("DROP TABLE IF EXISTS test_permissions");
    echo "<p>✅ <strong>DROP Permission:</strong> OK</p>";
    
} catch (PDOException $e) {
    echo "<p>❌ <strong>PERMISSION ERROR:</strong> " . $e->getMessage() . "</p>";
}

// Test 4: Character Set and Collation
echo "<h2>Test 4: Character Set Support</h2>";
try {
    $stmt = $pdo->query("SHOW VARIABLES LIKE 'character_set_database'");
    $charset = $stmt->fetch();
    echo "<p><strong>Database Charset:</strong> " . $charset['Value'] . "</p>";
    
    $stmt = $pdo->query("SHOW VARIABLES LIKE 'collation_database'");
    $collation = $stmt->fetch();
    echo "<p><strong>Database Collation:</strong> " . $collation['Value'] . "</p>";
    
    // Test Thai text support
    $pdo->exec("CREATE TEMPORARY TABLE test_thai (id INT, thai_text TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci)");
    $pdo->exec("INSERT INTO test_thai (id, thai_text) VALUES (1, 'ทดสอบภาษาไทย 🎉')");
    
    $stmt = $pdo->query("SELECT thai_text FROM test_thai WHERE id = 1");
    $thaiText = $stmt->fetch()['thai_text'];
    
    if ($thaiText === 'ทดสอบภาษาไทย 🎉') {
        echo "<p>✅ <strong>Thai Text Support:</strong> OK - $thaiText</p>";
    } else {
        echo "<p>⚠️ <strong>Thai Text Support:</strong> Issues detected - $thaiText</p>";
    }
    
} catch (PDOException $e) {
    echo "<p>❌ <strong>CHARSET ERROR:</strong> " . $e->getMessage() . "</p>";
}

// Test 5: JSON Support (for reservation_log)
echo "<h2>Test 5: JSON Support</h2>";
try {
    $pdo->exec("CREATE TEMPORARY TABLE test_json (id INT, json_data JSON)");
    $pdo->exec("INSERT INTO test_json (id, json_data) VALUES (1, '{\"test\": \"value\", \"number\": 123}')");
    
    $stmt = $pdo->query("SELECT json_data FROM test_json WHERE id = 1");
    $jsonData = $stmt->fetch()['json_data'];
    
    $decoded = json_decode($jsonData, true);
    if ($decoded && $decoded['test'] === 'value') {
        echo "<p>✅ <strong>JSON Support:</strong> OK</p>";
    } else {
        echo "<p>⚠️ <strong>JSON Support:</strong> Limited or not available</p>";
    }
    
} catch (PDOException $e) {
    echo "<p>❌ <strong>JSON ERROR:</strong> " . $e->getMessage() . "</p>";
}

// Summary
echo "<h2>Connection Test Summary</h2>";
echo "<p>✅ Database connection is ready for the reservation system!</p>";
echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>Run <a href='init-db.php'>init-db.php</a> to create the reservation tables</li>";
echo "<li>Test the reservation API with <a href='../test-database-init.html'>test-database-init.html</a></li>";
echo "<li>Use the reservation system in the main application</li>";
echo "</ol>";

echo "<hr>";
echo "<p><em>Test completed at: " . date('Y-m-d H:i:s') . "</em></p>";
?>