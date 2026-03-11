// Simple Node.js test for CSV duplicate removal
// This tests the CSVExporter.generateCSV method directly

// Mock the CSVExporter class (extract just what we need)
class CSVExporter {
  generateCSV(data) {
    // Performance optimization: Pre-calculate total rows for array sizing
    let totalRows = 1; // Header row
    data.forEach(group => totalRows += group.numbers.length);
    
    // Use array with pre-allocated size for better performance
    const rows = new Array(totalRows);
    let rowIndex = 0;
    
    // Add header row
    rows[rowIndex++] = 'pattern,pattern_type,phone_number';
    
    // Track seen phone numbers to remove duplicates (first occurrence wins)
    const seenNumbers = new Set();
    
    // Performance optimization: Batch process data to avoid memory pressure
    const batchSize = 1000;
    
    data.forEach(patternGroup => {
      const { pattern, patternType, numbers } = patternGroup;
      
      // Pre-escape pattern and type once (performance optimization)
      const escapedPattern = this.escapeCSVValue(pattern);
      const escapedPatternType = this.escapeCSVValue(patternType);
      
      // Process numbers in batches for large datasets
      for (let i = 0; i < numbers.length; i += batchSize) {
        const batch = numbers.slice(i, i + batchSize);
        
        batch.forEach(phoneNumber => {
          // Skip if we've already seen this phone number
          if (seenNumbers.has(phoneNumber)) {
            return;
          }
          
          // Mark this number as seen
          seenNumbers.add(phoneNumber);
          
          // Direct string concatenation is faster than array join for small strings
          rows[rowIndex++] = escapedPattern + ',' + escapedPatternType + ',' + this.escapeCSVValue(phoneNumber);
        });
        
        // Yield control for very large datasets (prevent UI blocking)
        if (numbers.length > 5000 && i % (batchSize * 5) === 0) {
          // Allow other operations to run
          setTimeout(() => {}, 0);
        }
      }
    });
    
    // Trim the array to actual size (remove unused pre-allocated slots)
    const actualRows = rows.slice(0, rowIndex);
    
    // Join all rows with newlines (single operation for performance)
    return actualRows.join('\n');
  }

  escapeCSVValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    
    // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
    if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
      // Escape internal quotes by doubling them
      const escapedValue = value.replace(/"/g, '""');
      return `"${escapedValue}"`;
    }
    
    return value;
  }
}

// Test data with overlapping phone numbers
const testData = [
  {
    pattern: 'aaa',
    patternType: 'The Soloist',
    numbers: ['0800000000', '0811111111', '0822222222', '0833333333']
  },
  {
    pattern: 'abc',
    patternType: 'The Full Straight',
    numbers: ['0800000000', '0844444444', '0855555555', '0811111111'] // Duplicates: 0800000000, 0811111111
  },
  {
    pattern: 'abcd',
    patternType: 'The Full Straight',
    numbers: ['0866666666', '0822222222', '0877777777', '0888888888'] // Duplicate: 0822222222
  }
];

console.log('🧪 Testing CSV Duplicate Removal');
console.log('================================');

console.log('\n📋 Test Data:');
testData.forEach((group, index) => {
  console.log(`Pattern ${index + 1}: ${group.pattern} (${group.patternType})`);
  console.log(`Numbers: ${group.numbers.join(', ')}`);
});

console.log('\n🔍 Expected Duplicates to Remove:');
console.log('• 0800000000 (appears in pattern 1 and 2 - should keep from pattern 1)');
console.log('• 0811111111 (appears in pattern 1 and 2 - should keep from pattern 1)');
console.log('• 0822222222 (appears in pattern 1 and 3 - should keep from pattern 1)');

// Generate CSV
const csvExporter = new CSVExporter();
const csvContent = csvExporter.generateCSV(testData);

console.log('\n📄 Generated CSV Content:');
console.log(csvContent);

// Parse and analyze results
const lines = csvContent.split('\n');
const dataLines = lines.slice(1).filter(line => line.trim() !== '');

console.log('\n📊 Analysis:');
console.log(`Total rows (including header): ${lines.length}`);
console.log(`Data rows: ${dataLines.length}`);

// Count occurrences of each phone number
const numberCounts = {};
const numberFirstPattern = {};

dataLines.forEach(line => {
  const parts = line.split(',');
  if (parts.length >= 3) {
    const pattern = parts[0];
    const phoneNumber = parts[2];
    
    if (!numberCounts[phoneNumber]) {
      numberCounts[phoneNumber] = 0;
      numberFirstPattern[phoneNumber] = pattern;
    }
    numberCounts[phoneNumber]++;
  }
});

console.log('\n📞 Phone Number Occurrences:');
Object.entries(numberCounts).forEach(([number, count]) => {
  const status = count === 1 ? '✅' : '❌';
  const firstPattern = numberFirstPattern[number];
  console.log(`${status} ${number}: ${count} occurrence(s) (first in pattern: ${firstPattern})`);
});

// Check for duplicates
const duplicates = Object.entries(numberCounts).filter(([number, count]) => count > 1);

if (duplicates.length === 0) {
  console.log('\n🎉 SUCCESS: No duplicate phone numbers found in CSV!');
} else {
  console.log('\n💥 FAILURE: Found duplicate phone numbers:');
  duplicates.forEach(([number, count]) => {
    console.log(`❌ ${number}: ${count} occurrences`);
  });
}

// Verify expected unique numbers are present
const expectedUniqueNumbers = [
  '0800000000', '0811111111', '0822222222', '0833333333', // From pattern 1
  '0844444444', '0855555555', // From pattern 2 (unique)
  '0866666666', '0877777777', '0888888888' // From pattern 3 (unique)
];

console.log('\n🔢 Expected Unique Numbers Check:');
const actualNumbers = Object.keys(numberCounts);
const missingNumbers = expectedUniqueNumbers.filter(num => !actualNumbers.includes(num));
const extraNumbers = actualNumbers.filter(num => !expectedUniqueNumbers.includes(num));

if (missingNumbers.length === 0 && extraNumbers.length === 0) {
  console.log('✅ All expected unique numbers are present, no extra numbers found');
} else {
  if (missingNumbers.length > 0) {
    console.log(`❌ Missing numbers: ${missingNumbers.join(', ')}`);
  }
  if (extraNumbers.length > 0) {
    console.log(`❌ Extra numbers: ${extraNumbers.join(', ')}`);
  }
}

console.log('\n🏁 Test Complete');