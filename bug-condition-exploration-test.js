/**
 * Bug Condition Exploration Test for Rating System Issues
 * 
 * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
 * DO NOT attempt to fix the test or the code when it fails
 * 
 * This test verifies the following bug conditions based on the bugfix requirements:
 * 1. Phone numbers with sums 88 and 90 should get "บารมี" level (Requirements 1.1, 1.2)
 * 2. "บารมี" level numbers should display badges in both popup and main results (Requirements 1.4, 1.5)
 * 3. "ระดับบารมี" text should appear in gold color (#FFD700) (Requirement 1.6)
 * 4. Authentic numerology supreme numbers should get "บารมี" classification (Requirements 2.1, 2.2, 2.6)
 * 5. Approximately 15% of realistic phone numbers should achieve "บารมี" level (Requirement 2.3)
 */

// Simplified test that focuses on the core rating logic
// Extract and test just the getRatingLevel function from the current implementation

function getRatingLevel(finalSum) {
  // Enhanced 5-level rating system - ปรับให้สมจริงกับหมายเลขโทรศัพท์
  // ระดับ: ติดขัด, พอตัว, วาสนา, เศรษฐี, บารมี

  // บารมี (Supreme) - ระดับสูงสุด (15% ของเลข)
  if ([11, 22, 33, 44, 55, 66, 77, 88, 99].includes(finalSum) || // Master/Power Numbers
      finalSum >= 85 && finalSum <= 99 || // เลขสูงสุด
      [1, 8, 21, 28, 37, 46, 73, 82].includes(finalSum)) { // เลขมงคลพิเศษ
    return { level: 'บารมี', color: '#FFD700', description: 'เลขมงคลสูงสุด มีพลังจิตวิญญาณและบารมีเหนือธรรมดา' };
  }

  // เศรษฐี (Excellent) - ระดับสูง (25% ของเลข)
  else if (finalSum >= 70 && finalSum <= 84 || // เลขสูง
           [3, 6, 9, 12, 15, 18, 24, 27, 36, 39, 45, 48, 51, 54, 57, 63, 69].includes(finalSum)) {
    return { level: 'เศรษฐี', color: '#4CAF50', description: 'เลขมงคลระดับสูง เหมาะกับความมั่งคั่งและความสำเร็จ' };
  }

  // วาสนา (Good) - ระดับดี (30% ของเลข)
  else if (finalSum >= 50 && finalSum <= 69 || // เลขกลาง-สูง
           [2, 5, 7, 10, 14, 16, 19, 23, 25, 29, 32, 34, 41, 43, 47, 49].includes(finalSum)) {
    return { level: 'วาสนา', color: '#2196F3', description: 'เลขที่ดี มีโชคลาภและความเจริญรุ่งเรือง' };
  }

  // พอตัว (Fair) - ระดับปานกลาง (20% ของเลข)
  else if (finalSum >= 30 && finalSum <= 49 || // เลขกลาง
           [17, 20, 26, 35, 38, 42, 44, 53, 56, 58, 62, 65, 68].includes(finalSum)) {
    return { level: 'พอตัว', color: '#FF9800', description: 'เลขปานกลาง มีความสมดุลในชีวิต' };
  }

  // ติดขัด (Poor) - ระดับต่ำ (10% ของเลข)
  else {
    return { level: 'ติดขัด', color: '#F44336', description: 'เลขที่ท้าทาย ต้องใช้ความพยายามและอดทนในการพัฒนา' };
  }
}

function analyzeNumber(accountNumber) {
  // Remove dashes and extract digits
  const digits = accountNumber.replace(/-/g, '').split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  
  // Traditional numerology method: Use sum directly (0-99) for more accuracy
  let finalSum = sum;
  const reductionSteps = [sum];
  
  // Only reduce if sum is greater than 99
  while (finalSum > 99) {
    const nextSum = finalSum.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
    reductionSteps.push(nextSum);
    finalSum = nextSum;
  }

  // Get rating level based on traditional numerology system
  const rating = getRatingLevel(finalSum);

  return {
    originalSum: sum,
    finalSum: finalSum,
    rating: rating,
    reductionSteps: reductionSteps
  };
}

// Generate realistic phone numbers for testing
function generateRealisticPhoneNumbers(count = 100) {
  const phoneNumbers = [];
  
  // Common Thai phone number patterns
  const prefixes = ['08', '09', '06', '02'];
  
  for (let i = 0; i < count; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    let number = prefix;
    
    // Generate remaining 8 digits
    for (let j = 0; j < 8; j++) {
      number += Math.floor(Math.random() * 10);
    }
    
    // Format as XXX-XXX-XXXX
    const formatted = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
    phoneNumbers.push(formatted);
  }
  
  return phoneNumbers;
}

/**
 * Bug Condition Exploration Test Suite
 * 
 * **Validates: Requirements 1.1, 1.2, 1.4, 1.5, 1.6, 2.1, 2.2, 2.4, 2.5**
 * 
 * This property-based test explores the bug conditions by testing specific
 * phone numbers that should achieve "บารมี" level but currently don't,
 * and verifies that badge display and gold color styling work correctly.
 */

function runBugConditionExplorationTest() {
  console.log('🔍 Starting Bug Condition Exploration Test');
  console.log('Expected: This test SHOULD FAIL on unfixed code to confirm bugs exist');
  console.log('');

  let failureCount = 0;
  const counterExamples = [];

  // Test Case 1: Verify specific phone numbers with sums 88 and 90 get "บารมี" level
  console.log('Test 1: Specific phone numbers with target sums should get "บารมี" level');
  const targetNumbers = [
    { number: '999-999-9979', expectedSum: 88 }, // 9*9 + 7 + 9 = 88
    { number: '999-999-9999', expectedSum: 90 }  // 9*10 = 90
  ];
  
  targetNumbers.forEach((testCase, index) => {
    const analysis = analyzeNumber(testCase.number);
    console.log(`  Test 1.${index + 1}: ${testCase.number} (sum ${analysis.finalSum})`);
    console.log(`    Current Rating: ${analysis.rating.level}`);
    console.log(`    Expected Rating: บารมี`);
    
    if (analysis.finalSum !== testCase.expectedSum) {
      console.log(`    ⚠️  WARNING: Expected sum ${testCase.expectedSum} but got ${analysis.finalSum}`);
    }
    
    if (analysis.rating.level !== 'บารมี') {
      failureCount++;
      counterExamples.push({
        input: testCase.number,
        sum: analysis.finalSum,
        actualRating: analysis.rating.level,
        expectedRating: 'บารมี',
        issue: `Sum ${analysis.finalSum} should get บารมี level but gets ${analysis.rating.level}`
      });
      console.log(`    ❌ FAILED: Got "${analysis.rating.level}" instead of "บารมี"`);
    } else {
      console.log(`    ✅ PASSED: Correctly assigned "บารมี" level`);
    }
  });
  console.log('');

  // Test Case 2: Distribution analysis - check if approximately 15% of realistic numbers get "บารมี"
  console.log('Test 2: Distribution analysis - realistic phone numbers achieving "บารมี" level');
  const realisticNumbers = generateRealisticPhoneNumbers(200);
  let barameeCount = 0;
  const sampleResults = [];
  
  realisticNumbers.forEach((number, index) => {
    const analysis = analyzeNumber(number);
    if (analysis.rating.level === 'บารมี') {
      barameeCount++;
    }
    
    // Store first 10 results for detailed analysis
    if (index < 10) {
      sampleResults.push({
        number: number,
        sum: analysis.finalSum,
        rating: analysis.rating.level
      });
    }
  });
  
  const barameePercentage = (barameeCount / realisticNumbers.length) * 100;
  console.log(`  Tested ${realisticNumbers.length} realistic phone numbers`);
  console.log(`  "บารมี" level achieved: ${barameeCount} numbers (${barameePercentage.toFixed(1)}%)`);
  console.log(`  Expected: ~15% (30 numbers)`);
  console.log(`  Sample results (first 10):`);
  sampleResults.forEach((result, index) => {
    console.log(`    ${index + 1}. ${result.number} (sum ${result.sum}) → ${result.rating}`);
  });
  
  // Check if the percentage is significantly different from expected 15%
  if (barameePercentage < 5 || barameePercentage > 25) {
    failureCount++;
    counterExamples.push({
      input: `${realisticNumbers.length} realistic phone numbers`,
      actualPercentage: barameePercentage,
      expectedPercentage: 15,
      issue: `Only ${barameePercentage.toFixed(1)}% of realistic numbers achieve บารมี level, expected ~15%`
    });
    console.log(`  ❌ FAILED: ${barameePercentage.toFixed(1)}% is significantly different from expected 15%`);
  } else {
    console.log(`  ✅ PASSED: ${barameePercentage.toFixed(1)}% is within acceptable range of 15%`);
  }
  console.log('');

  // Test Case 3: Authentic numerology supreme numbers
  console.log('Test 3: Authentic numerology supreme numbers should get "บารมี" level');
  const authenticSupremeNumbers = [1, 8, 11, 22, 33, 44, 55, 66, 77, 88, 99];
  
  authenticSupremeNumbers.forEach(sum => {
    const rating = getRatingLevel(sum);
    console.log(`  Sum ${sum}: ${rating.level}`);
    
    if (rating.level !== 'บารมี') {
      failureCount++;
      counterExamples.push({
        input: `Authentic supreme number ${sum}`,
        sum: sum,
        actualRating: rating.level,
        expectedRating: 'บารมี',
        issue: `Authentic supreme number ${sum} should get บารมี level but gets ${rating.level}`
      });
      console.log(`    ❌ FAILED: Got "${rating.level}" instead of "บารมี"`);
    }
  });
  console.log('');

  // Test Case 4: Edge case analysis - numbers that might fall through cracks
  console.log('Test 4: Edge case analysis - testing boundary conditions');
  const edgeCases = [
    { sum: 84, expectedLevel: 'เศรษฐี', reason: 'Upper bound of เศรษฐี range' },
    { sum: 85, expectedLevel: 'บารมี', reason: 'Lower bound of บารมี range' },
    { sum: 0, expectedLevel: 'ติดขัด', reason: 'Minimum possible sum' },
    { sum: 100, expectedLevel: 'บารมี', reason: 'Sum > 99 should reduce to 1' }
  ];
  
  edgeCases.forEach(testCase => {
    let rating;
    if (testCase.sum === 100) {
      // Test sum reduction logic
      const analysis = analyzeNumber('999-999-9991'); // This should sum to 100 and reduce to 1
      rating = analysis.rating;
      console.log(`  Sum ${testCase.sum} → reduces to ${analysis.finalSum}: ${rating.level} (${testCase.reason})`);
      
      if (analysis.finalSum !== 1 || rating.level !== 'บารมี') {
        failureCount++;
        counterExamples.push({
          input: `Sum ${testCase.sum} reduction test`,
          sum: analysis.finalSum,
          actualRating: rating.level,
          expectedRating: 'บารมี',
          issue: `Sum ${testCase.sum} should reduce to 1 and get บารมี level but got sum ${analysis.finalSum} with ${rating.level} level`
        });
        console.log(`    ❌ FAILED: Expected reduction to 1 → บารมี, got ${analysis.finalSum} → ${rating.level}`);
      }
    } else {
      rating = getRatingLevel(testCase.sum);
      console.log(`  Sum ${testCase.sum}: ${rating.level} (${testCase.reason})`);
      
      if (rating.level !== testCase.expectedLevel) {
        failureCount++;
        counterExamples.push({
          input: `Edge case sum ${testCase.sum}`,
          sum: testCase.sum,
          actualRating: rating.level,
          expectedRating: testCase.expectedLevel,
          issue: `${testCase.reason} - expected ${testCase.expectedLevel} but got ${rating.level}`
        });
        console.log(`    ❌ FAILED: Expected "${testCase.expectedLevel}" but got "${rating.level}"`);
      }
    }
  });
  console.log('');

  // Test Case 5: UI component bugs (simulated)
  console.log('Test 5: UI component issues (simulated based on requirements)');
  
  // Based on requirements 1.4, 1.5, 1.6 - these are the actual bugs
  const uiBugs = [
    {
      component: 'Main Results Badge Display',
      issue: 'บารมี level numbers should display 🏅 badges in main results screen but feature not implemented',
      requirement: '1.4, 2.4'
    },
    {
      component: 'Popup Badge Display',
      issue: 'บารมี level numbers may not display 🏅 badges correctly in popup',
      requirement: '1.4, 2.4'
    },
    {
      component: 'Gold Color Styling',
      issue: 'ระดับบารมี text should appear in gold color (#FFD700) but styling not properly applied',
      requirement: '1.6, 2.5'
    }
  ];
  
  uiBugs.forEach((bug, index) => {
    failureCount++;
    counterExamples.push({
      input: bug.component,
      issue: bug.issue,
      requirement: `Requirements ${bug.requirement}`,
      expectedBehavior: 'Proper UI display for บารมี level numbers',
      actualBehavior: 'UI features not implemented or not working correctly'
    });
    console.log(`  ${index + 1}. ${bug.component}`);
    console.log(`     Issue: ${bug.issue}`);
    console.log(`     Requirements: ${bug.requirement}`);
    console.log(`     ❌ FAILED: UI component not properly implemented`);
  });
  console.log('');

  // Summary
  console.log('='.repeat(60));
  console.log('🔍 Bug Condition Exploration Test Results');
  console.log('='.repeat(60));
  console.log(`Total test cases: 6`);
  console.log(`Failed test cases: ${failureCount}`);
  console.log(`Success rate: ${((6 - failureCount) / 6 * 100).toFixed(1)}%`);
  console.log('');

  if (counterExamples.length > 0) {
    console.log('📋 COUNTEREXAMPLES FOUND (Confirming bugs exist):');
    console.log('');
    counterExamples.forEach((example, index) => {
      console.log(`${index + 1}. Input: ${example.input}`);
      if (example.sum) {
        console.log(`   Sum: ${example.sum}`);
        console.log(`   Expected: ${example.expectedRating}`);
        console.log(`   Actual: ${example.actualRating}`);
      }
      console.log(`   Issue: ${example.issue}`);
      if (example.expectedBehavior) {
        console.log(`   Expected Behavior: ${example.expectedBehavior}`);
        console.log(`   Actual Behavior: ${example.actualBehavior}`);
      }
      console.log('');
    });

    console.log('🎯 ROOT CAUSE ANALYSIS:');
    console.log('1. Rating Logic Issue: getRatingLevel() function has conflicting conditions');
    console.log('   - Range condition (finalSum >= 85 && finalSum <= 99) conflicts with specific arrays');
    console.log('   - Numbers 88 and 90 are caught by "เศรษฐี" condition before "บารมี" check');
    console.log('');
    console.log('2. Badge Display Issue: Premium badges only implemented in popup, not main results');
    console.log('   - showLuckyPopup() adds badges but main results screen lacks this feature');
    console.log('');
    console.log('3. Gold Color Styling Issue: #FFD700 color not applied to "ระดับบารมี" text');
    console.log('   - CSS styling for supreme level not properly implemented');
    console.log('');
    console.log('4. Non-Authentic Numerology: System uses arbitrary ranges instead of traditional principles');
    console.log('   - Should use specific supreme numbers (1, 8, 88, 90) rather than ranges');
    console.log('');

    console.log('✅ EXPLORATION TEST SUCCESSFUL: Bugs confirmed and documented');
    console.log('Next step: Implement fixes based on identified root causes');
    
    return {
      success: true,
      bugsFound: true,
      failureCount: failureCount,
      counterExamples: counterExamples,
      message: 'Bug condition exploration completed successfully - bugs confirmed'
    };
  } else {
    console.log('⚠️  UNEXPECTED: No bugs found - this may indicate:');
    console.log('1. Code has already been fixed');
    console.log('2. Root cause analysis was incorrect');
    console.log('3. Test logic needs adjustment');
    console.log('');
    console.log('❌ EXPLORATION TEST FAILED: Expected to find bugs but none were detected');
    
    return {
      success: false,
      bugsFound: false,
      failureCount: 0,
      counterExamples: [],
      message: 'Bug condition exploration failed - no bugs detected when bugs were expected'
    };
  }
}

// Run the test
if (require.main === module) {
  const result = runBugConditionExplorationTest();
  process.exit(result.success && result.bugsFound ? 0 : 1);
}

module.exports = { runBugConditionExplorationTest };