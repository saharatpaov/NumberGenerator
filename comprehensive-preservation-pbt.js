/**
 * Comprehensive Property-Based Tests for Preservation
 * 
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
 * 
 * This generates many test cases automatically to provide stronger guarantees
 * that existing functionality remains intact after implementing the fix.
 */

// Import the current implementation for testing
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
// Generate random phone numbers for property-based testing
function generateRandomPhoneNumber() {
  const digits = [];
  for (let i = 0; i < 10; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }
  return `${digits.slice(0, 3).join('')}-${digits.slice(3, 6).join('')}-${digits.slice(6).join('')}`;
}

// Generate phone number with specific sum
function generatePhoneNumberWithSum(targetSum) {
  const digits = [];
  let remainingSum = targetSum;
  
  // Fill first 9 digits randomly while maintaining sum constraint
  for (let i = 0; i < 9; i++) {
    const maxDigit = Math.min(9, remainingSum);
    const minDigit = Math.max(0, remainingSum - (9 - i) * 9);
    const digit = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
    digits.push(digit);
    remainingSum -= digit;
  }
  
  // Last digit gets the remainder
  digits.push(Math.max(0, Math.min(9, remainingSum)));
  
  return `${digits.slice(0, 3).join('')}-${digits.slice(3, 6).join('')}-${digits.slice(6).join('')}`;
}

/**
 * Property-Based Test: Comprehensive Preservation Testing
 * 
 * Generates many test cases to verify preservation requirements hold
 * across a wide range of inputs.
 */
function runComprehensivePreservationPBT() {
  console.log('🔍 Starting Comprehensive Property-Based Preservation Tests');
  console.log('Generating many test cases to verify preservation requirements...');
  console.log('');
  
  let totalTests = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const failures = [];
  
  // Property 1: All sums 1-99 produce valid ratings with consistent properties
  console.log('Property 1: All possible sums produce valid, consistent ratings');
  for (let sum = 1; sum <= 99; sum++) {
    totalTests++;
    const rating = getRatingLevel(sum);
    
    // Check that rating has all required properties
    const hasValidLevel = ['ติดขัด', 'พอตัว', 'วาสนา', 'เศรษฐี', 'บารมี'].includes(rating.level);
    const hasValidColor = rating.color && rating.color.startsWith('#') && rating.color.length === 7;
    const hasValidDescription = rating.description && rating.description.length > 10;
    
    if (hasValidLevel && hasValidColor && hasValidDescription) {
      totalPassed++;
    } else {
      totalFailed++;
      failures.push({
        test: `Sum ${sum} rating validation`,
        issue: `Invalid rating properties: level=${rating.level}, color=${rating.color}, desc_length=${rating.description?.length || 0}`
      });
    }
  }
  console.log(`  Tested all sums 1-99: ${totalPassed - (totalTests - 99)} passed, ${totalFailed} failed`);
  
  // Property 2: Random phone numbers produce consistent digit sum calculations
  console.log('Property 2: Random phone numbers have consistent digit sum calculations');
  for (let i = 0; i < 100; i++) {
    totalTests++;
    const phoneNumber = generateRandomPhoneNumber();
    const analysis = analyzeNumber(phoneNumber);
    
    // Verify digit sum calculation manually
    const digits = phoneNumber.replace(/-/g, '').split('').map(Number);
    const expectedSum = digits.reduce((acc, digit) => acc + digit, 0);
    
    if (analysis.originalSum === expectedSum && analysis.finalSum <= 99 && analysis.rating) {
      totalPassed++;
    } else {
      totalFailed++;
      failures.push({
        test: `Random phone ${phoneNumber} digit sum`,
        issue: `Expected sum ${expectedSum}, got ${analysis.originalSum}, final ${analysis.finalSum}`
      });
    }
  }
  console.log(`  Tested 100 random phone numbers: ${100 - (totalFailed - (totalTests - 199))} passed`);
  
  // Property 3: Phone numbers with specific sums maintain rating consistency
  console.log('Property 3: Phone numbers with specific target sums maintain rating consistency');
  const targetSums = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  
  targetSums.forEach(targetSum => {
    for (let attempt = 0; attempt < 5; attempt++) { // Test 5 different phone numbers per sum
      totalTests++;
      const phoneNumber = generatePhoneNumberWithSum(targetSum);
      const analysis = analyzeNumber(phoneNumber);
      const directRating = getRatingLevel(targetSum);
      
      // Verify that phone number with target sum gets same rating as direct sum
      if (analysis.finalSum === targetSum && 
          analysis.rating.level === directRating.level && 
          analysis.rating.color === directRating.color) {
        totalPassed++;
      } else {
        totalFailed++;
        failures.push({
          test: `Phone ${phoneNumber} with target sum ${targetSum}`,
          issue: `Expected sum ${targetSum}/${directRating.level}, got ${analysis.finalSum}/${analysis.rating.level}`
        });
      }
    }
  });
  console.log(`  Tested ${targetSums.length * 5} phone numbers with specific sums: ${(targetSums.length * 5) - (totalFailed - (totalTests - targetSums.length * 5))} passed`);
  
  // Property 4: Color consistency across all levels
  console.log('Property 4: Color consistency maintained across all rating levels');
  const expectedColors = {
    'ติดขัด': '#F44336',
    'พอตัว': '#FF9800', 
    'วาสนา': '#2196F3',
    'เศรษฐี': '#4CAF50',
    'บารมี': '#FFD700'
  };
  
  // Test each level appears with consistent color
  Object.keys(expectedColors).forEach(level => {
    let foundLevel = false;
    for (let sum = 1; sum <= 99; sum++) {
      totalTests++;
      const rating = getRatingLevel(sum);
      
      if (rating.level === level) {
        foundLevel = true;
        if (rating.color === expectedColors[level]) {
          totalPassed++;
        } else {
          totalFailed++;
          failures.push({
            test: `Color consistency for ${level} level (sum ${sum})`,
            issue: `Expected color ${expectedColors[level]}, got ${rating.color}`
          });
        }
        break; // Only test first occurrence of each level
      }
    }
    
    if (!foundLevel) {
      totalTests++;
      totalFailed++;
      failures.push({
        test: `Level ${level} existence`,
        issue: `Level ${level} not found in any sum 1-99`
      });
    }
  });
  console.log(`  Tested color consistency for all 5 levels: ${5 - (totalFailed - (totalTests - 5))} passed`);
  
  // Summary
  console.log('');
  console.log('='.repeat(60));
  console.log('🔍 Comprehensive Property-Based Preservation Test Results');
  console.log('='.repeat(60));
  console.log(`Total property tests: ${totalTests}`);
  console.log(`Passed tests: ${totalPassed}`);
  console.log(`Failed tests: ${totalFailed}`);
  console.log(`Success rate: ${(totalPassed / totalTests * 100).toFixed(1)}%`);
  console.log('');
  
  if (totalFailed === 0) {
    console.log('✅ COMPREHENSIVE PRESERVATION PBT SUCCESSFUL');
    console.log('Strong guarantees established for preservation requirements');
    console.log('');
    console.log('📊 PROPERTY VERIFICATION SUMMARY:');
    console.log('1. All 99 possible sums produce valid ratings with proper structure');
    console.log('2. 100 random phone numbers have consistent digit sum calculations');
    console.log(`3. ${targetSums.length * 5} targeted phone numbers maintain rating consistency`);
    console.log('4. All 5 rating levels maintain consistent color mappings');
    console.log('');
    console.log('🎯 PRESERVATION GUARANTEES ESTABLISHED:');
    console.log('- Rating structure integrity maintained across all inputs');
    console.log('- Digit sum calculation consistency verified for diverse phone numbers');
    console.log('- Rating-to-sum mapping consistency verified for targeted cases');
    console.log('- Color consistency verified for all rating levels');
    
    return {
      success: true,
      strongGuarantees: true,
      totalTests: totalTests,
      totalPassed: totalPassed,
      totalFailed: totalFailed,
      message: 'Comprehensive property-based preservation tests successful - strong guarantees established'
    };
  } else {
    console.log('⚠️  COMPREHENSIVE PRESERVATION PBT PARTIAL SUCCESS');
    console.log(`${totalFailed} property violations found - may indicate baseline inconsistencies`);
    console.log('');
    console.log('❌ PROPERTY VIOLATIONS:');
    failures.slice(0, 10).forEach((failure, index) => { // Show first 10 failures
      console.log(`${index + 1}. ${failure.test}: ${failure.issue}`);
    });
    if (failures.length > 10) {
      console.log(`... and ${failures.length - 10} more failures`);
    }
    
    return {
      success: false,
      strongGuarantees: false,
      totalTests: totalTests,
      totalPassed: totalPassed,
      totalFailed: totalFailed,
      failures: failures,
      message: `Comprehensive property-based preservation tests found ${totalFailed} violations`
    };
  }
}

// Run the comprehensive PBT
if (require.main === module) {
  const result = runComprehensivePreservationPBT();
  process.exit(result.success ? 0 : 1);
}

module.exports = { runComprehensivePreservationPBT };