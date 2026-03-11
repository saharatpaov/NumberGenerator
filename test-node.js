/**
 * Node.js compatible test runner for pattern analysis and generation
 */

// Mock DOM elements for Node.js environment
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => ({ textContent: '', classList: { add: () => {}, remove: () => {} } })
};

// Read and execute the main app code (excluding DOM initialization)
const fs = require('fs');
let appCode = fs.readFileSync('app.js', 'utf8');

// Remove DOM initialization code and other DOM-dependent code
appCode = appCode.replace(/if \(document\.readyState === 'loading'\)[\s\S]*$/, '');
appCode = appCode.replace(/elements\..*?;/g, '');
appCode = appCode.replace(/function init\(\)[\s\S]*?^}/m, '');
appCode = appCode.replace(/function setupEventListeners\(\)[\s\S]*?^}/m, '');
appCode = appCode.replace(/function handleAddPattern\(\)[\s\S]*?^}/m, '');
appCode = appCode.replace(/function showError[\s\S]*?^}/m, '');
appCode = appCode.replace(/function clearError[\s\S]*?^}/m, '');
appCode = appCode.replace(/function updateUI[\s\S]*?^}/m, '');
appCode = appCode.replace(/function updatePatternList[\s\S]*?^}/m, '');
appCode = appCode.replace(/function updateResultsDisplay[\s\S]*?^}/m, '');
appCode = appCode.replace(/function updateExportButton[\s\S]*?^}/m, '');
appCode = appCode.replace(/function handleExport[\s\S]*?^}/m, '');

// Execute the app code
eval(appCode);

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
      console.log(`   Stack: ${error.stack}`);
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

// Run the tests
runTests();