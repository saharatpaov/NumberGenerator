-- Account Number Reservation System Database Schema
-- MySQL Database: sql12819700
-- Server: sql12.freemysqlhosting.net:3306

-- Use the database
USE sql12819700;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS reservation_log;
DROP TABLE IF EXISTS reservations;

-- Create reservations table
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
    
    -- Indexes for performance
    INDEX idx_account_number (account_number),
    INDEX idx_thai_id (thai_id),
    INDEX idx_pattern (pattern),
    INDEX idx_pattern_type (pattern_type),
    INDEX idx_reserved_at (reserved_at),
    INDEX idx_status (status),
    
    -- Composite indexes
    INDEX idx_thai_id_status (thai_id, status),
    INDEX idx_pattern_status (pattern, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Account number reservations';

-- Create reservation_log table for audit trail
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
    
    -- Indexes for performance
    INDEX idx_account_number (account_number),
    INDEX idx_thai_id (thai_id),
    INDEX idx_action (action),
    INDEX idx_timestamp (timestamp),
    
    -- Composite indexes
    INDEX idx_account_action (account_number, action),
    INDEX idx_thai_action (thai_id, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Reservation audit log';

-- Create statistics table for analytics
CREATE TABLE reservation_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_recorded DATE NOT NULL COMMENT 'Statistics date',
    pattern_type VARCHAR(50) NOT NULL COMMENT 'Pattern type',
    total_reservations INT DEFAULT 0 COMMENT 'Total reservations for this pattern type',
    active_reservations INT DEFAULT 0 COMMENT 'Active reservations',
    cancelled_reservations INT DEFAULT 0 COMMENT 'Cancelled reservations',
    unique_users INT DEFAULT 0 COMMENT 'Unique users who made reservations',
    
    -- Indexes
    INDEX idx_date_pattern (date_recorded, pattern_type),
    UNIQUE KEY unique_date_pattern (date_recorded, pattern_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Daily reservation statistics';

-- Insert some sample data for testing
INSERT INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip, notes) VALUES
('123-456-7890', '1234567890123', 'Test Pattern', 'test', '127.0.0.1', 'Sample reservation for testing'),
('098-765-4321', '9876543210987', 'Thai Mobile No.', '06????????', '127.0.0.1', 'Thai mobile number reservation'),
('555-123-4567', '5555555555555', 'The Soloist', 'aaaaaaaaaa', '127.0.0.1', 'Soloist pattern reservation');

-- Insert corresponding log entries
INSERT INTO reservation_log (account_number, thai_id, action, ip_address, user_agent) VALUES
('123-456-7890', '1234567890123', 'reserve', '127.0.0.1', 'Test User Agent'),
('098-765-4321', '9876543210987', 'reserve', '127.0.0.1', 'Test User Agent'),
('555-123-4567', '5555555555555', 'reserve', '127.0.0.1', 'Test User Agent');

-- Create a view for easy reservation lookup
CREATE VIEW active_reservations AS
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
ORDER BY r.reserved_at DESC;

-- Create a view for reservation statistics
CREATE VIEW reservation_summary AS
SELECT 
    pattern_type,
    COUNT(*) as total_reservations,
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_reservations,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_reservations,
    COUNT(DISTINCT thai_id) as unique_users,
    MIN(reserved_at) as first_reservation,
    MAX(reserved_at) as latest_reservation
FROM reservations
GROUP BY pattern_type
ORDER BY total_reservations DESC;

-- Show table information
SHOW TABLES;

-- Show table structures
DESCRIBE reservations;
DESCRIBE reservation_log;
DESCRIBE reservation_stats;

-- Show sample data
SELECT 'Active Reservations:' as info;
SELECT * FROM active_reservations LIMIT 10;

SELECT 'Reservation Summary:' as info;
SELECT * FROM reservation_summary;

SELECT 'Recent Log Entries:' as info;
SELECT * FROM reservation_log ORDER BY timestamp DESC LIMIT 10;