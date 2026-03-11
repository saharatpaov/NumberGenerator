/**
 * Simple test runner for pattern analysis and generation
 */

// Test cases from the design document
const testCases = [
  { pattern: 'aaaaaaaaaa', expectedType: 'The Soloist', expectedCount: 10, description: 'Simple Soloist (all same)' },
  { pattern: 'abbbbbbbbb', expectedType: 'The Soloist', expectedCount: 900, description: 'Complex Soloist (first different)' },
  { pattern: 'andddddddd', expectedType: 'The Soloist', expectedCount: 4050, description: 'Complex Soloist (multiple unique)' },
  { pattern: 'aaabbbcccc', expectedType: 'Hyphen-separated', expectedCount: 720, description: 'Hyphen-separated (3 blocks)' },
  { pattern: 'bbbtnxbbbb', expectedType: 'Hyphen-separated', expectedCount: 90, description: 'Hyphen-separated (specific pattern)' },
  { pattern: 'abcdefghij', expectedType: 'The Full Straight', expectedCount: 2, description: 'Full Straight (ascending)' },
  { pattern: 'jihgfedcba', expectedType: 'The Full Straight', expectedCount: 2, description: 'Full Straight (descending)' },
  { pattern: 'jabcdefghi', expectedType: 'Cyclic Straight', expectedCount: 20, description: 'Cyclic Straight (j->a wraparound)' },
  { pattern: 'ihgfedcbaj', expectedType: 'Cyclic Straight', expectedCount: 20, description: 'Cyclic Straight (reverse)' },
  { pattern: 'abcaxxabcd', expectedType: 'The Rhythmic Bridge', expectedCount: 9900, description: 'Rhythmic Bridge (repeating pattern)' }
];

function runTests() {
  console.log('🧪 Running Pattern Analysis and Generation Tests\n');
  
  let passed = 0;
  let failed = 0;
  
  const validator = new PatternValidator();
  const analyzer = new PatternAnalyzer();
  const generator = new PatternGenerator();
  
  testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.description}`);
    console.log(`Pattern: "${testCase.pattern}"`);
    
    try {
      // Test 1: Validation
      const validation = validator.validate(testCase.pattern);
      if (!validation.isValid) {
        console.log(`❌ FAIL - Validation failed: ${validation.errorMessage}`);
        failed++;
        return;
      }
      
      // Test 2: Pattern Type Identification
      const identifiedType = analyzer.identifyPatternType(testCase.pattern);
      if (identifiedType !== testCase.expectedType) {
        console.log(`❌ FAIL - Type identification: expected "${testCase.expectedType}", got "${identifiedType}"`);
        failed++;
        return;
      }
      
      // Test 3: Number Generation
      const generatedNumbers = generator.generate(testCase.pattern, identifiedType);
      if (generatedNumbers.length !== testCase.expectedCount) {
        console.log(`❌ FAIL - Count mismatch: expected ${testCase.expectedCount}, got ${generatedNumbers.length}`);
        failed++;
        return;
      }
      
      // Test 4: Format validation
      const formatValid = generatedNumbers.every(num => /^\d{3}-\d{3}-\d{4}$/.test(num));
      if (!formatValid) {
        console.log(`❌ FAIL - Format validation failed`);
        failed++;
        return;
      }
      
      // Test 5: No duplicates
      const uniqueNumbers = new Set(generatedNumbers);
      if (uniqueNumbers.size !== generatedNumbers.length) {
        console.log(`❌ FAIL - Duplicate numbers found`);
        failed++;
        return;
      }
      
      console.log(`✅ PASS - Type: ${identifiedType}, Count: ${generatedNumbers.length}`);
      console.log(`   Sample numbers: ${generatedNumbers.slice(0, 3).join(', ')}${generatedNumbers.length > 3 ? '...' : ''}`);
      passed++;
      
    } catch (error) {
      console.log(`❌ FAIL - Exception: ${error.message}`);
      failed++;
    }
    
    console.log('');
  });
  
  console.log(`📊 Test Summary:`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${testCases.length}`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Pattern analysis and generation are working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please review the implementation.');
  }
  
  return { passed, failed, total: testCases.length };
}

/**
 * Test CSVExporter functionality
 */
function testCSVExporter() {
  console.log('🧪 Testing CSVExporter Class\n');
  
  let passed = 0;
  let failed = 0;
  
  const csvExporter = new CSVExporter();
  
  // Test data
  const testData = [
    {
      pattern: 'aaaaaaaaaa',
      patternType: 'The Soloist',
      numbers: ['000-000-0000', '111-111-1111', '222-222-2222']
    },
    {
      pattern: 'abcdefghij',
      patternType: 'The Full Straight',
      numbers: ['012-345-6789', '987-654-3210']
    }
  ];
  
  try {
    // Test 1: CSV Generation
    console.log('Test 1: CSV Generation');
    const csvContent = csvExporter.generateCSV(testData);
    
    // Check header
    const lines = csvContent.split('\n');
    if (lines[0] !== 'pattern,pattern_type,phone_number') {
      console.log('❌ FAIL - Incorrect CSV header');
      failed++;
    } else {
      console.log('✅ PASS - CSV header correct');
      passed++;
    }
    
    // Test 2: Row count (header + 5 data rows)
    console.log('Test 2: Row Count');
    const expectedRows = 1 + 3 + 2; // header + 3 numbers + 2 numbers
    if (lines.length !== expectedRows) {
      console.log(`❌ FAIL - Expected ${expectedRows} rows, got ${lines.length}`);
      failed++;
    } else {
      console.log('✅ PASS - Correct number of rows');
      passed++;
    }
    
    // Test 3: Data row format
    console.log('Test 3: Data Row Format');
    const firstDataRow = lines[1];
    if (firstDataRow !== 'aaaaaaaaaa,The Soloist,000-000-0000') {
      console.log(`❌ FAIL - Incorrect first data row: ${firstDataRow}`);
      failed++;
    } else {
      console.log('✅ PASS - Data row format correct');
      passed++;
    }
    
    // Test 4: CSV Value Escaping
    console.log('Test 4: CSV Value Escaping');
    const testDataWithComma = [{
      pattern: 'test,pattern',
      patternType: 'Test "Type"',
      numbers: ['123-456-7890']
    }];
    
    const escapedCSV = csvExporter.generateCSV(testDataWithComma);
    const escapedLines = escapedCSV.split('\n');
    const escapedRow = escapedLines[1];
    
    if (escapedRow !== '"test,pattern","Test ""Type""",123-456-7890') {
      console.log(`❌ FAIL - CSV escaping failed: ${escapedRow}`);
      failed++;
    } else {
      console.log('✅ PASS - CSV escaping works correctly');
      passed++;
    }
    
    // Test 5: Empty data handling
    console.log('Test 5: Empty Data Handling');
    try {
      csvExporter.export([]);
      console.log('❌ FAIL - Should throw error for empty data');
      failed++;
    } catch (error) {
      if (error.message.includes('No data to export')) {
        console.log('✅ PASS - Correctly handles empty data');
        passed++;
      } else {
        console.log(`❌ FAIL - Wrong error message: ${error.message}`);
        failed++;
      }
    }
    
  } catch (error) {
    console.log(`❌ FAIL - Exception in CSV tests: ${error.message}`);
    failed++;
  }
  
  console.log(`\n📊 CSV Test Summary:`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: 5`);
  
  if (failed === 0) {
    console.log('🎉 All CSV tests passed!');
  } else {
    console.log('⚠️ Some CSV tests failed.');
  }
  
  return { passed, failed, total: 5 };
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, testCases, testCSVExporter };
}