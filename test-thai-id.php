<?php
function validateThaiId($thaiId) {
    // Remove any spaces or dashes
    $thaiId = preg_replace('/[\s-]/', '', $thaiId);
    
    // Check if it's exactly 13 digits
    if (!preg_match('/^\d{13}$/', $thaiId)) {
        return false;
    }
    
    // Validate checksum using Thai ID algorithm
    $sum = 0;
    for ($i = 0; $i < 12; $i++) {
        $sum += intval($thaiId[$i]) * (13 - $i);
    }
    
    $checkDigit = (11 - ($sum % 11)) % 10;
    return $checkDigit == intval($thaiId[12]);
}

// Test some Thai IDs
$testIds = [
    '1234567890123',
    '1111111111111',
    '1234567890128', // Valid checksum
    '1101700123456'  // Another test
];

foreach ($testIds as $id) {
    $valid = validateThaiId($id) ? 'VALID' : 'INVALID';
    echo "$id -> $valid\n";
}

// Generate a valid Thai ID for testing
function generateValidThaiId($prefix = '123456789012') {
    $sum = 0;
    for ($i = 0; $i < 12; $i++) {
        $sum += intval($prefix[$i]) * (13 - $i);
    }
    $checkDigit = (11 - ($sum % 11)) % 10;
    return $prefix . $checkDigit;
}

$validId = generateValidThaiId('123456789012');
echo "\nGenerated valid Thai ID: $validId\n";
echo "Validation: " . (validateThaiId($validId) ? 'VALID' : 'INVALID') . "\n";
?>