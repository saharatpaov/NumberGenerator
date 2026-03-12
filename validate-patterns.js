/**
 * Pattern validation script to test all patterns from the updated table
 */

// Test cases based on the corrected table - no expected counts
const testCases = [
  // The Soloist patterns
  { pattern: 'aaaaaaaaaa', expectedType: 'The Soloist', description: 'Simple Soloist (all same)' },
  { pattern: 'abbbbbbbbb', expectedType: 'The Soloist', description: 'Soloist (9 same, 1 different)' },
  { pattern: 'andddddddd', expectedType: 'The Soloist', description: 'Soloist (8 same, 2 different)' },
  { pattern: 'abeccccccc', expectedType: 'The Soloist', description: 'Soloist (7 same, 3 different)' },
  { pattern: 'abefcccccc', expectedType: 'The Soloist', description: 'Soloist (6 same, 4 different)' },
  { pattern: 'abefuccccc', expectedType: 'The Soloist', description: 'Soloist (5 same, 5 different)' },
  { pattern: 'axytrubbbb', expectedType: 'The Soloist', description: 'Soloist (4 same, 6 different)' },
  
  // Hyphen-separated patterns
  { pattern: 'bbbaaaaaaa', expectedType: 'Hyphen-separated', description: 'Hyphen-separated (3+7 blocks)' },
  { pattern: 'bbbbbaaaaa', expectedType: 'Hyphen-separated', description: 'Hyphen-separated (5+5 blocks)' },
  { pattern: 'aaabbbcccc', expectedType: 'Hyphen-separated', description: 'Hyphen-separated (3+3+4 blocks)' },
  { pattern: 'bbbtnxbbbb', expectedType: 'Hyphen-separated', description: 'Hyphen-separated (first=last blocks)' },
  
  // The Full Straight patterns
  { pattern: 'abcdefghij', expectedType: 'The Full Straight', description: 'Full Straight (ascending)' },
  { pattern: 'jihgfedcba', expectedType: 'The Full Straight', description: 'Full Straight (descending)' },
  
  // Cyclic Straight patterns
  { pattern: 'zabcdefghi', expectedType: 'Cyclic Straight', description: 'Cyclic Straight (z->a wraparound)' },
  { pattern: 'ihgfedcbaz', expectedType: 'Cyclic Straight', description: 'Cyclic Straight (reverse)' },
  
  // The Rhythmic Bridge patterns
  { pattern: 'abcaxxabcd', expectedType: 'The Rhythmic Bridge', description: 'Rhythmic Bridge (repeating pattern)' },
  
  // Thai Mobile No. patterns
  { pattern: '06?-???-????', expectedType: 'Thai Mobile No.', description: 'Thai Mobile (started with 06)' },
  { pattern: '08?-???-????', expectedType: 'Thai Mobile No.', description: 'Thai Mobile (started with 08)' },
  { pattern: '09?-???-????', expectedType: 'Thai Mobile No.', description: 'Thai Mobile (started with 09)' }
];

function runValidationTests() {
  console.log('🧪 Starting Pattern Validation Tests...');
  
  let passed = 0;
  let failed = 0;
  const results = [];
  
  // Load the classes from app.js (assuming they're available globally)
  const validator = new PatternValidator();
  const analyzer = new PatternAnalyzer();
  const generator = new PatternGenerator();
  
  testCases.forEach((testCase, index) => {
    console.log(`\n📋 Test ${index + 1}: ${testCase.description}`);
    console.log(`Pattern: "${testCase.pattern}" (${testCase.pattern.length} chars)`);
    
    try {
      // Test 1: Validation
      const validation = validator.validate(testCase.pattern);
      if (!validation.isValid) {
        console.log(`❌ VALIDATION FAILED: ${validation.errorMessage}`);
        failed++;
        results.push({ ...testCase, status: 'VALIDATION_FAILED', error: validation.errorMessage });
        return;
      }
      
      // Test 2: Pattern Type Identification
      const identifiedType = analyzer.identifyPatternType(testCase.pattern);
      if (identifiedType !== testCase.expectedType) {
        console.log(`❌ TYPE MISMATCH: Expected "${testCase.expectedType}", got "${identifiedType}"`);
        failed++;
        results.push({ ...testCase, status: 'TYPE_MISMATCH', actualType: identifiedType });
        return;
      }
      
      // Test 3: Number Generation (just check that it generates some numbers)
      const generatedNumbers = generator.generate(testCase.pattern, identifiedType);
      if (generatedNumbers.length === 0) {
        console.log(`❌ NO NUMBERS GENERATED`);
        failed++;
        results.push({ ...testCase, status: 'NO_NUMBERS_GENERATED' });
        return;
      }
      
      // Test 4: Format validation
      const formatValid = generatedNumbers.every(num => /^\d{3}-\d{3}-\d{4}$/.test(num));
      if (!formatValid) {
        console.log(`❌ FORMAT INVALID: Some numbers don't match XXX-XXX-XXXX format`);
        failed++;
        results.push({ ...testCase, status: 'FORMAT_INVALID' });
        return;
      }
      
      // Test 5: No duplicates
      const uniqueNumbers = new Set(generatedNumbers);
      if (uniqueNumbers.size !== generatedNumbers.length) {
        console.log(`❌ DUPLICATES FOUND: ${generatedNumbers.length - uniqueNumbers.size} duplicates`);
        failed++;
        results.push({ ...testCase, status: 'DUPLICATES_FOUND' });
        return;
      }
      
      console.log(`✅ PASS: Type="${identifiedType}", Count=${generatedNumbers.length}`);
      console.log(`Sample: ${generatedNumbers.slice(0, 3).join(', ')}${generatedNumbers.length > 3 ? '...' : ''}`);
      passed++;
      results.push({ ...testCase, status: 'PASSED', actualCount: generatedNumbers.length });
      
    } catch (error) {
      console.log(`❌ EXCEPTION: ${error.message}`);
      failed++;
      results.push({ ...testCase, status: 'EXCEPTION', error: error.message });
    }
  });
  
  // Summary
  console.log(`\n📊 FINAL RESULTS:`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📊 Total: ${testCases.length}`);
  
  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED! All patterns are working correctly.');
  } else {
    console.log('⚠️ Some tests failed. Please review the implementation.');
    
    // Show failed tests
    const failedTests = results.filter(r => r.status !== 'PASSED');
    console.log('\n❌ Failed Tests:');
    failedTests.forEach(test => {
      console.log(`- ${test.pattern}: ${test.status} ${test.error || test.actualType || test.actualCount || ''}`);
    });
  }
  
  return results;
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.runValidationTests = runValidationTests;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runValidationTests, testCases };
}