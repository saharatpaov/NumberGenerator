<?php
/**
 * Simple Database Connection Test
 * Quick test to verify database connectivity
 */

echo "<h1>🔍 Quick Database Connection Test</h1>";
echo "<hr>";

// Database settings
$host = 'sql12.freemysqlhosting.net';
$dbname = 'sql12819700';
$username = 'sql12819700';
$password = 'v1n8JbB6yt';
$port = 3306;

echo "<p><strong>Testing connection to:</strong></p>";
echo "<ul>";
echo "<li><strong>Host:</strong> $host</li>";
echo "<li><strong>Port:</strong> $port</li>";
echo "<li><strong>Database:</strong> $dbname</li>";
echo "<li><strong>Username:</strong> $username</li>";
echo "</ul>";

try {
    echo "<p>⏳ Attempting to connect...</p>";
    
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 10
    ]);
    
    echo "<p>✅ <strong style='color: green;'>CONNECTION SUCCESSFUL!</strong></p>";
    
    // Get server info
    $stmt = $pdo->query("SELECT VERSION() as version, DATABASE() as db, USER() as user, NOW() as time");
    $info = $stmt->fetch();
    
    echo "<h2>📊 Server Information</h2>";
    echo "<table border='1' cellpadding='5' cellspacing='0'>";
    echo "<tr><td><strong>MySQL Version</strong></td><td>{$info['version']}</td></tr>";
    echo "<tr><td><strong>Current Database</strong></td><td>{$info['db']}</td></tr>";
    echo "<tr><td><strong>Current User</strong></td><td>{$info['user']}</td></tr>";
    echo "<tr><td><strong>Server Time</strong></td><td>{$info['time']}</td></tr>";
    echo "</table>";
    
    // Check existing tables
    echo "<h2>📋 Existing Tables</h2>";
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);
    
    if (empty($tables)) {
        echo "<p>⚠️ <strong>No tables found!</strong></p>";
        echo "<p>👉 <a href='create-database-tables.php'>Click here to create tables</a></p>";
    } else {
        echo "<ul>";
        foreach ($tables as $table) {
            $countStmt = $pdo->query("SELECT COUNT(*) as count FROM `$table`");
            $count = $countStmt->fetch()['count'];
            echo "<li><strong>$table</strong> ($count records)</li>";
        }
        echo "</ul>";
        
        // If reservations table exists, show sample data
        if (in_array('reservations', $tables)) {
            echo "<h2>📄 Sample Reservations</h2>";
            $sampleStmt = $pdo->query("SELECT * FROM reservations LIMIT 3");
            $samples = $sampleStmt->fetchAll();
            
            if ($samples) {
                echo "<table border='1' cellpadding='5' cellspacing='0'>";
                echo "<tr><th>Account Number</th><th>Thai ID</th><th>Pattern Type</th><th>Status</th></tr>";
                foreach ($samples as $sample) {
                    echo "<tr>";
                    echo "<td>{$sample['account_number']}</td>";
                    echo "<td>{$sample['thai_id']}</td>";
                    echo "<td>{$sample['pattern_type']}</td>";
                    echo "<td>{$sample['status']}</td>";
                    echo "</tr>";
                }
                echo "</table>";
            }
        }
    }
    
    echo "<h2>🎯 Next Steps</h2>";
    if (empty($tables)) {
        echo "<p>1. <a href='create-database-tables.php'><strong>Create Database Tables</strong></a></p>";
        echo "<p>2. Test the reservation system</p>";
    } else {
        echo "<p>1. ✅ Database tables exist</p>";
        echo "<p>2. <a href='test-complete-reservation-system.html'><strong>Test Reservation System</strong></a></p>";
        echo "<p>3. <a href='index.html'><strong>Use Main Application</strong></a></p>";
    }
    
} catch (PDOException $e) {
    echo "<p>❌ <strong style='color: red;'>CONNECTION FAILED!</strong></p>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Error Code:</strong> " . $e->getCode() . "</p>";
    
    // Common error solutions
    echo "<h2>🔧 Troubleshooting</h2>";
    switch ($e->getCode()) {
        case 1045:
            echo "<p><strong>Access Denied:</strong> Check username and password</p>";
            break;
        case 2002:
            echo "<p><strong>Connection Refused:</strong> Check host and port</p>";
            break;
        case 1049:
            echo "<p><strong>Unknown Database:</strong> Check database name</p>";
            break;
        case 2006:
            echo "<p><strong>Server Gone Away:</strong> Server timeout or connection lost</p>";
            break;
        default:
            echo "<p><strong>General Error:</strong> Check all connection parameters</p>";
    }
    
    echo "<h3>📋 Connection Parameters Used:</h3>";
    echo "<ul>";
    echo "<li>Host: $host</li>";
    echo "<li>Port: $port</li>";
    echo "<li>Database: $dbname</li>";
    echo "<li>Username: $username</li>";
    echo "<li>Password: " . str_repeat('*', strlen($password)) . "</li>";
    echo "</ul>";
}
?>