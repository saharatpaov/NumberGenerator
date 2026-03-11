// Test updated patterns with Node.js
console.log('🧪 Testing Final Updated Patterns');
console.log('=================================');

// Mock PatternType constants
const PatternType = {
  SOLOIST: 'The Soloist',
  HYPHEN_SEPARATED: 'Hyphen-separated', 
  FULL_STRAIGHT: 'The Full Straight',
  CYCLIC_STRAIGHT: 'Cyclic Straight',
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge'
};

// Test patterns based on the new specification
const testPatterns = [
  // Soloist patterns
  { pattern: 'aaaaaaaaaa', expectedType: 'The Soloist', expectedCount: 10, description: 'All 10 digits identical' },
  { pattern: 'abbbbbbbbb', expectedType: 'The Soloist', expectedCount: 90, description: 'All 9 digits identical' },
  { pattern: 'abdddddddd', expectedType: 'The Soloist', expectedCount: 720, description: 'All 8 digits identical' },
  { pattern: 'abcddddddd', expectedType: 'The Soloist', expectedCount: 5040, description: 'All 7 digits identical' },
  { pattern: 'abcdeeeeee', expectedType: 'The Soloist', expectedCount: 30240, description: 'All 6 digits identical' },
  { pattern: 'abcdefffff', expectedType: 'The Soloist', expectedCount: 151200, description: 'All 5 digits identical' },
  { pattern: 'abcdefgggg', expectedType: 'The Soloist', expectedCount: 604800, description: 'All 4 digits identical (Block-ending)' },
  { pattern: 'bbbaaaaaaa', expectedType: 'The Soloist', expectedCount: 90, description: '2 distinct digits across blocks (3+7)' },
  { pattern: 'bbbbbaaaaa', expectedType: 'The Soloist', expectedCount: 90, description: '2 distinct digits across blocks (5+5)' },
  { pattern: 'aaabbbcccc', expectedType: 'The Soloist', expectedCount: 720, description: '3 distinct digits across blocks' },
  
  // Hyphen-separated patterns (only bbbtnxbbbb should remain)
  { pattern: 'bbbtnxbbbb', expectedType: 'Hyphen-separated', expectedCount: 90, description: 'First and last blocks identical' },
  
  // Full Straight patterns
  { pattern: 'abcdefghij', expectedType: 'The Full Straight', expectedCount: 2, description: 'Ascending' },
  { pattern: 'jihgfedcba', expectedType: 'The Full Straight', expectedCount: 2, description: 'Descending' },
  
  // Cyclic Straight patterns
  { pattern: 'zabcdefghi', expectedType: 'Cyclic Straight', expectedCount: 20, description: 'Cyclic progression' },
  { pattern: 'ihgfedcbaz', expectedType: 'Cyclic Straight', expectedCount: 20, description: 'Cyclic progression' },
  
  // Rhythmic Bridge patterns
  { pattern: 'abcefgabcd', expectedType: 'The Rhythmic Bridge', expectedCount: null, description: 'Repeating pattern 2-3 block' },
  { pattern: 'abcabcdefg', expectedType: 'The Rhythmic Bridge', expectedCount: null, description: 'Repeating pattern front-middle' },
  { pattern: 'efgabcabcd', expectedType: 'The Rhythmic Bridge', expectedCount: null, description: 'Repeating pattern middle-end' }
];

// Mock classes (simplified for testing)
class PatternValidator {
  validate(pattern) {
    if (!pattern || typeof pattern !== 'string') {
      return { isValid: false, errorMessage: 'Pattern must be a non-empty string' };
    }
    
    if (pattern.length !== 10) {
      return { isValid: false, errorMessage: 'Pattern must be exactly 10 characters long' };
    }
    
    if (!/^[a-z]+$/.test(pattern)) {
      return { isValid: false, errorMessage: 'Pattern contains invalid characters. Only lowercase letters a-z are allowed.' };
    }
    
    return { isValid: true };
  }
}

class PatternAnalyzer {
  identifyPatternType(pattern) {
    if (this.isFullStraight(pattern)) {
      return PatternType.FULL_STRAIGHT;
    }
    
    if (this.isCyclicStraight(pattern)) {
      return PatternType.CYCLIC_STRAIGHT;
    }
    
    if (this.isSoloist(pattern)) {
      return PatternType.SOLOIST;
    }
    
    if (this.isHyphenSeparated(pattern)) {
      return PatternType.HYPHEN_SEPARATED;
    }
    
    if (this.isRhythmicBridge(pattern)) {
      return PatternType.RHYTHMIC_BRIDGE;
    }

    throw new Error('Pattern format not recognized');
  }
  
  isFullStraight(pattern) {
    const letters = pattern.split('');
    const uniqueLetters = [...new Set(letters)];
    
    if (uniqueLetters.length !== 10) {
      return false;
    }
    
    const expectedLetters = 'abcdefghij'.split('');
    const hasAllLetters = expectedLetters.every(letter => uniqueLetters.includes(letter));
    
    if (!hasAllLetters) {
      return false;
    }
    
    const letterValues = letters.map(letter => letter.charCodeAt(0) - 'a'.charCodeAt(0));
    
    let isAscending = true;
    for (let i = 1; i < letterValues.length; i++) {
      if (letterValues[i] !== letterValues[i-1] + 1) {
        isAscending = false;
        break;
      }
    }
    
    let isDescending = true;
    for (let i = 1; i < letterValues.length; i++) {
      if (letterValues[i] !== letterValues[i-1] - 1) {
        isDescending = false;
        break;
      }
    }
    
    return isAscending || isDescending;
  }
  
  isCyclicStraight(pattern) {
    const letters = pattern.split('');
    const letterValues = letters.map(letter => letter.charCodeAt(0) - 'a'.charCodeAt(0));
    
    let isCyclicAscending = true;
    let isCyclicDescending = true;
    
    for (let i = 1; i < letterValues.length; i++) {
      const prev = letterValues[i-1];
      const curr = letterValues[i];
      
      const expectedAsc = (prev + 1) % 10;
      if (curr !== expectedAsc) {
        isCyclicAscending = false;
      }
      
      const expectedDesc = (prev - 1 + 10) % 10;
      if (curr !== expectedDesc) {
        isCyclicDescending = false;
      }
    }
    
    return isCyclicAscending || isCyclicDescending;
  }
  
  isSoloist(pattern) {
    const letterCounts = this._getLetterCounts(pattern);
    const uniqueLetters = Object.keys(letterCounts);
    const counts = Object.values(letterCounts).sort((a, b) => b - a);
    
    // All same letter
    if (uniqueLetters.length === 1) {
      return true;
    }
    
    // 9 identical
    if (uniqueLetters.length === 2 && counts[0] === 9 && counts[1] === 1) {
      return true;
    }
    
    // 8 identical
    if (uniqueLetters.length === 3 && counts[0] === 8) {
      return true;
    }
    
    // 7 identical
    if (uniqueLetters.length === 4 && counts[0] === 7) {
      return true;
    }
    
    // 6 identical
    if (uniqueLetters.length === 5 && counts[0] === 6) {
      return true;
    }
    
    // 5 identical
    if (uniqueLetters.length === 6 && counts[0] === 5) {
      return true;
    }
    
    // 4 identical (Block-ending)
    if (uniqueLetters.length === 7 && counts[0] === 4) {
      return true;
    }
    
    // 2 distinct digits patterns
    if (uniqueLetters.length === 2) {
      const first3 = pattern.slice(0, 3);
      const last7 = pattern.slice(3, 10);
      const first5 = pattern.slice(0, 5);
      const last5 = pattern.slice(5, 10);
      
      if ((this._isAllSameInBlock(first3) && this._isAllSameInBlock(last7) && first3[0] !== last7[0]) ||
          (this._isAllSameInBlock(first5) && this._isAllSameInBlock(last5) && first5[0] !== last5[0])) {
        return true;
      }
    }
    
    // 3 distinct digits pattern
    if (uniqueLetters.length === 3) {
      const block1 = pattern.slice(0, 3);
      const block2 = pattern.slice(3, 6);
      const block3 = pattern.slice(6, 10);
      
      const block1AllSame = this._isAllSameInBlock(block1);
      const block2AllSame = this._isAllSameInBlock(block2);
      const block3AllSame = this._isAllSameInBlock(block3);
      
      if (block1AllSame && block2AllSame && block3AllSame) {
        const block1Letter = block1[0];
        const block2Letter = block2[0];
        const block3Letter = block3[0];
        
        if (block1Letter !== block2Letter && block2Letter !== block3Letter && block1Letter !== block3Letter) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  isHyphenSeparated(pattern) {
    // Only bbbtnxbbbb should be Hyphen-separated now
    const block1 = pattern.slice(0, 3);
    const block2 = pattern.slice(3, 6);
    const block3 = pattern.slice(6, 10);
    
    const block1AllSame = this._isAllSameInBlock(block1);
    const block2AllSame = this._isAllSameInBlock(block2);
    const block3AllSame = this._isAllSameInBlock(block3);
    
    const block1Letter = block1[0];
    const block3Letter = block3[0];
    
    // First and last blocks same, middle different
    if (block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame) {
      return true;
    }
    
    return false;
  }
  
  isRhythmicBridge(pattern) {
    // Check for specific repeating patterns
    if (pattern.slice(0, 3) === pattern.slice(6, 9)) {
      return true;
    }
    
    if (pattern.slice(0, 3) === pattern.slice(3, 6)) {
      return true;
    }
    
    if (pattern.slice(3, 6) === pattern.slice(6, 9)) {
      return true;
    }
    
    return false;
  }
  
  _getLetterCounts(pattern) {
    const counts = {};
    for (const letter of pattern) {
      counts[letter] = (counts[letter] || 0) + 1;
    }
    return counts;
  }
  
  _isAllSameInBlock(block) {
    const firstLetter = block[0];
    return block.split('').every(letter => letter === firstLetter);
  }
}

// Run tests
console.log('\n📋 Testing Pattern Classification:');
console.log('==================================');

const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();

let totalTests = 0;
let passedTests = 0;
let failedTests = [];

testPatterns.forEach((test, index) => {
  totalTests++;
  
  try {
    console.log(`\n${index + 1}. Testing: ${test.pattern}`);
    console.log(`   Description: ${test.description}`);
    console.log(`   Expected Type: ${test.expectedType}`);
    
    // Validate
    const validation = validator.validate(test.pattern);
    if (!validation.isValid) {
      console.log(`   ❌ FAIL: Validation failed - ${validation.errorMessage}`);
      failedTests.push({ ...test, error: validation.errorMessage });
      return;
    }
    
    // Identify type
    const actualType = analyzer.identifyPatternType(test.pattern);
    console.log(`   Actual Type: ${actualType}`);
    
    if (actualType === test.expectedType) {
      console.log(`   ✅ PASS: Type matches`);
      passedTests++;
    } else {
      console.log(`   ❌ FAIL: Type mismatch`);
      failedTests.push({ ...test, actualType, error: 'Type mismatch' });
    }
    
  } catch (error) {
    console.log(`   ❌ FAIL: Error - ${error.message}`);
    failedTests.push({ ...test, error: error.message });
  }
});

console.log('\n📊 Summary:');
console.log('===========');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests.length > 0) {
  console.log('\n❌ Failed Tests:');
  failedTests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.pattern} - ${test.error}`);
    if (test.actualType) {
      console.log(`   Expected: ${test.expectedType}, Got: ${test.actualType}`);
    }
  });
} else {
  console.log('\n🎉 All tests passed!');
}

console.log('\n✅ Test Complete');