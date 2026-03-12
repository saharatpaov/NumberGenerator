<?php
/**
 * Reservations API Endpoint
 * Handles all reservation-related operations
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

try {
    $pdo = getDBConnection();
    
    switch ($method) {
        case 'GET':
            handleGetReservations($pdo);
            break;
            
        case 'POST':
            handleCreateReservation($pdo, $input);
            break;
            
        case 'DELETE':
            handleCancelReservation($pdo, $input);
            break;
            
        default:
            sendResponse(['success' => false, 'error' => 'Method not allowed'], 405);
    }
    
} catch (Exception $e) {
    sendResponse([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ], 500);
}

/**
 * Get reservation status for account numbers
 * GET /api/reservations.php?numbers=123-456-7890,098-765-4321
 */
function handleGetReservations($pdo) {
    $numbers = $_GET['numbers'] ?? '';
    
    if (empty($numbers)) {
        sendResponse(['success' => false, 'error' => 'No account numbers provided'], 400);
    }
    
    $accountNumbers = array_map('sanitizeAccountNumber', explode(',', $numbers));
    $accountNumbers = array_filter($accountNumbers); // Remove empty values
    
    if (empty($accountNumbers)) {
        sendResponse(['success' => false, 'error' => 'No valid account numbers provided'], 400);
    }
    
    // Create placeholders for prepared statement
    $placeholders = str_repeat('?,', count($accountNumbers) - 1) . '?';
    
    $stmt = $pdo->prepare("
        SELECT account_number, thai_id, pattern_type, pattern, reserved_at, status
        FROM reservations 
        WHERE account_number IN ($placeholders) AND status = 'active'
    ");
    
    $stmt->execute($accountNumbers);
    $reservations = $stmt->fetchAll();
    
    // Create a map of account_number => reservation_data
    $reservationMap = [];
    foreach ($reservations as $reservation) {
        $reservationMap[$reservation['account_number']] = [
            'reserved' => true,
            'thai_id' => $reservation['thai_id'],
            'pattern_type' => $reservation['pattern_type'],
            'pattern' => $reservation['pattern'],
            'reserved_at' => $reservation['reserved_at']
        ];
    }
    
    // Add unreserved numbers
    foreach ($accountNumbers as $number) {
        if (!isset($reservationMap[$number])) {
            $reservationMap[$number] = ['reserved' => false];
        }
    }
    
    sendResponse([
        'success' => true,
        'reservations' => $reservationMap,
        'total_checked' => count($accountNumbers),
        'total_reserved' => count($reservations)
    ]);
}

/**
 * Create a new reservation
 * POST /api/reservations.php
 */
function handleCreateReservation($pdo, $input) {
    // Validate input
    if (!isset($input['account_number']) || !isset($input['thai_id']) || 
        !isset($input['pattern_type']) || !isset($input['pattern'])) {
        sendResponse(['success' => false, 'error' => 'Missing required fields'], 400);
    }
    
    $accountNumber = sanitizeAccountNumber($input['account_number']);
    $thaiId = preg_replace('/[\s-]/', '', $input['thai_id']);
    $patternType = trim($input['pattern_type']);
    $pattern = trim($input['pattern']);
    
    // Validate Thai ID
    if (!validateThaiId($thaiId)) {
        sendResponse(['success' => false, 'error' => 'Invalid Thai ID format'], 400);
    }
    
    // Validate account number format (XXX-XXX-XXXX)
    if (!preg_match('/^\d{3}-\d{3}-\d{4}$/', $accountNumber)) {
        sendResponse(['success' => false, 'error' => 'Invalid account number format'], 400);
    }
    
    $pdo->beginTransaction();
    
    try {
        // Check if account number is already reserved
        $checkStmt = $pdo->prepare("
            SELECT thai_id, reserved_at 
            FROM reservations 
            WHERE account_number = ? AND status = 'active'
        ");
        $checkStmt->execute([$accountNumber]);
        $existing = $checkStmt->fetch();
        
        if ($existing) {
            $pdo->rollback();
            sendResponse([
                'success' => false,
                'error' => 'Account number already reserved',
                'reserved_by' => $existing['thai_id'],
                'reserved_at' => $existing['reserved_at']
            ], 409);
        }
        
        // Check if this Thai ID has too many reservations (limit: 5)
        $countStmt = $pdo->prepare("
            SELECT COUNT(*) as count 
            FROM reservations 
            WHERE thai_id = ? AND status = 'active'
        ");
        $countStmt->execute([$thaiId]);
        $count = $countStmt->fetch()['count'];
        
        if ($count >= 5) {
            $pdo->rollback();
            sendResponse([
                'success' => false,
                'error' => 'Maximum 5 reservations per Thai ID exceeded'
            ], 400);
        }
        
        // Create reservation
        $insertStmt = $pdo->prepare("
            INSERT INTO reservations (account_number, thai_id, pattern_type, pattern, reserved_by_ip)
            VALUES (?, ?, ?, ?, ?)
        ");
        
        $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $insertStmt->execute([$accountNumber, $thaiId, $patternType, $pattern, $clientIP]);
        
        // Log the reservation
        $logStmt = $pdo->prepare("
            INSERT INTO reservation_log (account_number, thai_id, action, ip_address, user_agent)
            VALUES (?, ?, 'reserve', ?, ?)
        ");
        
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        $logStmt->execute([$accountNumber, $thaiId, $clientIP, $userAgent]);
        
        $pdo->commit();
        
        sendResponse([
            'success' => true,
            'message' => 'Reservation created successfully',
            'reservation' => [
                'account_number' => $accountNumber,
                'thai_id' => $thaiId,
                'pattern_type' => $patternType,
                'pattern' => $pattern,
                'reserved_at' => date('Y-m-d H:i:s')
            ]
        ]);
        
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}

/**
 * Cancel a reservation
 * DELETE /api/reservations.php
 */
function handleCancelReservation($pdo, $input) {
    if (!isset($input['account_number']) || !isset($input['thai_id'])) {
        sendResponse(['success' => false, 'error' => 'Missing required fields'], 400);
    }
    
    $accountNumber = sanitizeAccountNumber($input['account_number']);
    $thaiId = preg_replace('/[\s-]/', '', $input['thai_id']);
    
    // Validate Thai ID
    if (!validateThaiId($thaiId)) {
        sendResponse(['success' => false, 'error' => 'Invalid Thai ID format'], 400);
    }
    
    $pdo->beginTransaction();
    
    try {
        // Check if reservation exists and belongs to this Thai ID
        $checkStmt = $pdo->prepare("
            SELECT id FROM reservations 
            WHERE account_number = ? AND thai_id = ? AND status = 'active'
        ");
        $checkStmt->execute([$accountNumber, $thaiId]);
        $reservation = $checkStmt->fetch();
        
        if (!$reservation) {
            $pdo->rollback();
            sendResponse([
                'success' => false,
                'error' => 'Reservation not found or not owned by this Thai ID'
            ], 404);
        }
        
        // Cancel reservation
        $updateStmt = $pdo->prepare("
            UPDATE reservations 
            SET status = 'cancelled' 
            WHERE id = ?
        ");
        $updateStmt->execute([$reservation['id']]);
        
        // Log the cancellation
        $logStmt = $pdo->prepare("
            INSERT INTO reservation_log (account_number, thai_id, action, ip_address, user_agent)
            VALUES (?, ?, 'cancel', ?, ?)
        ");
        
        $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        $logStmt->execute([$accountNumber, $thaiId, $clientIP, $userAgent]);
        
        $pdo->commit();
        
        sendResponse([
            'success' => true,
            'message' => 'Reservation cancelled successfully'
        ]);
        
    } catch (Exception $e) {
        $pdo->rollback();
        throw $e;
    }
}
?>