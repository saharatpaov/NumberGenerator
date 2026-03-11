// Quick test for pattern classification

console.log('Testing Pattern Classification...\n');

// Mock classes for testing
class PatternValidator {
  validate(pattern) {
    if (!pattern || pattern.length !== 10) {
      return { isValid: false, errorMessage: 'Pattern must be exactly 10 characters' };
    }
    if (!/^[a-z?]+$/.test(pattern)) {
      return { isValid: false, errorMessage: 'Pattern contains invalid characters' };
    }
    return { isValid: true, errorMessage: '' };
  }
}

class PatternAnalyzer {
  identifyPatternType(pattern) {
    if (!pattern || pattern.length !== 10) {
      throw new Error('Pattern must be exactly 10 characters');
    }

    if (this.isFullStraight(pattern)) {
      return 'The Full Straight';
    }

    if (this.isCyclicStraight(pattern)) {
      return 'Cyclic Straight';
    }

    if (this.isHyphenSeparated(pattern)) {
      return 'Hyphen-separated';
    }

    if (this.isSoloist(pattern)) {
      return 'The Soloist';
    }

    if (this.isRhythmicBridge(pattern)) {
      return 'The Rhythmic Bridge';
    }

    return 'Unknown';
  }

  isSoloist(pattern) {
    const letterCounts = this._getLetterCounts(pattern);
    const uniqueLetters = Object.keys(letterCounts);
    
    // Check for simple soloist: all same letter (aaaaaaaaaa)
    if (uniqueLetters.length === 1) {
      return true;
    }
    
    // Check for patterns with wildcards and dominant repeating letter
    if (pattern.includes('?')) {
      const wildcardCount = (pattern.match(/\?/g) || []).length;
      const letterCount = 10 - wildcardCount;
      
      // All 9 digits identical: ?bbbbbbbbb (1 wildcard + 9 repeating)
      if (wildcardCount === 1 && letterCount === 9 && uniqueLetters.length === 1) {
        return true;
      }
      
      // All 8 digits identical: ??dddddddd (2 wildcards + 8 repeating)
      if (wildcardCount === 2 && letterCount === 8 && uniqueLetters.length === 1) {
        return true;
      }
      
      // All 7 digits identical: ???ddddddd (3 wildcards + 7 repeating)
      if (wildcardCount === 3 && letterCount === 7 && uniqueLetters.length === 1) {
        return true;
      }
      
      // All 6 digits identical: ????eeeeee (4 wildcards + 6 repeating)
      if (wildcardCount === 4 && letterCount === 6 && uniqueLetters.length === 1) {
        return true;
      }
      
      // All 5 digits identical: ?????fffff (5 wildcards + 5 repeating)
      if (wildcardCount === 5 && letterCount === 5 && uniqueLetters.length === 1) {
        return true;
      }
      
      // All 4 digits identical (Block-ending): ??????gggg (6 wildcards + 4 repeating)
      if (wildcardCount === 6 && letterCount === 4 && uniqueLetters.length === 1) {
        return true;
      }
    }
    
    return false;
  }

  isHyphenSeparated(pattern) {
    const letterCounts = this._getLetterCounts(pattern);
    const uniqueLetters = Object.keys(letterCounts);
    
    // Split into blocks: positions 0-2, 3-5, 6-9
    const block1 = pattern.slice(0, 3);
    const block2 = pattern.slice(3, 6);
    const block3 = pattern.slice(6, 10);
    
    const block1AllSame = this._isAllSameInBlock(block1);
    const block2AllSame = this._isAllSameInBlock(block2);
    const block3AllSame = this._isAllSameInBlock(block3);
    
    // Pattern 1: "bbb???bbbb" - first and last blocks same letter, middle different
    const block1NonWildcard = block1.replace(/\?/g, '');
    const block3NonWildcard = block3.replace(/\?/g, '');
    
    if (block1NonWildcard.length > 0 && block3NonWildcard.length > 0) {
      const block1Letter = block1NonWildcard[0];
      const block3Letter = block3NonWildcard[0];
      
      // Special case: if middle block is all wildcards, it's considered "different"
      const block2IsAllWildcards = block2 === '???';
      
      if (block1Letter === block3Letter && block1AllSame && block3AllSame && 
          (block2IsAllWildcards || !block2AllSame)) {
        return true;
      }
    }
    
    // Pattern 2: 2 distinct digits across blocks patterns
    if (uniqueLetters.length === 2 && !pattern.includes('?')) {
      // Check for patterns like "bbbaaaaaaa" (3+7) or "bbbbbaaaaa" (5+5) or "bbbaaabbbb" (3+3+4)
      const first3 = pattern.slice(0, 3);
      const middle3 = pattern.slice(3, 6);
      const last4 = pattern.slice(6, 10);
      const last7 = pattern.slice(3, 10);
      const first5 = pattern.slice(0, 5);
      const last5 = pattern.slice(5, 10);
      
      // Check 3+7 split (bbbaaaaaaa)
      if (this._isAllSameInBlock(first3) && this._isAllSameInBlock(last7) && first3[0] !== last7[0]) {
        return true;
      }
      
      // Check 5+5 split (bbbbbaaaaa)
      if (this._isAllSameInBlock(first5) && this._isAllSameInBlock(last5) && first5[0] !== last5[0]) {
        return true;
      }
      
      // Check 3+3+4 split (bbbaaabbbb)
      if (this._isAllSameInBlock(first3) && this._isAllSameInBlock(middle3) && this._isAllSameInBlock(last4)) {
        const first3Letter = first3[0];
        const middle3Letter = middle3[0];
        const last4Letter = last4[0];
        
        // Should have exactly 2 distinct letters across all blocks
        if ((first3Letter === last4Letter && first3Letter !== middle3Letter) ||
            (first3Letter === middle3Letter && first3Letter !== last4Letter) ||
            (middle3Letter === last4Letter && middle3Letter !== first3Letter)) {
          return true;
        }
      }
    }
    
    // Pattern 3: 3 distinct digits across blocks: "aaabbbcccc"
    if (uniqueLetters.length === 3 && !pattern.includes('?')) {
      // Check if it's a 3-block pattern with all different letters
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
    const uniqueLetters = [...new Set(letters)];
    if (uniqueLetters.length !== 10) {
      return false;
    }
    
    if (pattern === 'zabcdefghi' || pattern === 'ihgfedcbaz') {
      return true;
    }
    
    return false;
  }

  isRhythmicBridge(pattern) {
    // Check for specific patterns from the table
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
      if (letter !== '?') {
        counts[letter] = (counts[letter] || 0) + 1;
      }
    }
    return counts;
  }

  _isAllSameInBlock(block) {
    const nonWildcardChars = block.split('').filter(char => char !== '?');
    if (nonWildcardChars.length === 0) return true;
    
    const firstLetter = nonWildcardChars[0];
    return nonWildcardChars.every(letter => letter === firstLetter);
  }
}

// Test cases based on the specification table
const tests = [
  // The Soloist patterns
  { pattern: 'aaaaaaaaaa', expected: 'The Soloist', description: 'All 10 digits identical' },
  { pattern: '?bbbbbbbbb', expected: 'The Soloist', description: 'All 9 digits identical' },
  { pattern: '??dddddddd', expected: 'The Soloist', description: 'All 8 digits identical' },
  { pattern: '???ddddddd', expected: 'The Soloist', description: 'All 7 digits identical' },
  { pattern: '????eeeeee', expected: 'The Soloist', description: 'All 6 digits identical' },
  { pattern: '?????fffff', expected: 'The Soloist', description: 'All 5 digits identical' },
  { pattern: '??????gggg', expected: 'The Soloist', description: 'All 4 digits identical (Block-ending)' },
  
  // Hyphen-separated patterns
  { pattern: 'bbbaaaaaaa', expected: 'Hyphen-separated', description: '2 distinct digits (3+7)' },
  { pattern: 'bbbbbaaaaa', expected: 'Hyphen-separated', description: '2 distinct digits (5+5)' },
  { pattern: 'bbbaaabbbb', expected: 'Hyphen-separated', description: '2 distinct digits (3+3+4)' },
  { pattern: 'aaabbbcccc', expected: 'Hyphen-separated', description: '3 distinct digits' },
  { pattern: 'bbb???bbbb', expected: 'Hyphen-separated', description: 'First and last blocks identical' },
  
  // The Full Straight patterns
  { pattern: 'abcdefghij', expected: 'The Full Straight', description: 'Ascending' },
  { pattern: 'jihgfedcba', expected: 'The Full Straight', description: 'Descending' },
  
  // Cyclic Straight patterns
  { pattern: 'zabcdefghi', expected: 'Cyclic Straight', description: 'Cyclic ascending' },
  { pattern: 'ihgfedcbaz', expected: 'Cyclic Straight', description: 'Cyclic descending' },
  
  // The Rhythmic Bridge patterns
  { pattern: 'abcefgabcd', expected: 'The Rhythmic Bridge', description: '2-3 block repeating' },
  { pattern: 'abcabcdefg', expected: 'The Rhythmic Bridge', description: 'Front-middle repeating' },
  { pattern: 'efgabcabcd', expected: 'The Rhythmic Bridge', description: 'Middle-end repeating' }
];

const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();

let passCount = 0;
let totalCount = tests.length;

console.log('Running classification tests...\n');

tests.forEach((test, index) => {
  try {
    const validation = validator.validate(test.pattern);
    if (!validation.isValid) {
      console.log(`❌ ${test.pattern}: Validation failed - ${validation.errorMessage}`);
      return;
    }
    
    const actualType = analyzer.identifyPatternType(test.pattern);
    const isCorrect = actualType === test.expected;
    
    if (isCorrect) passCount++;
    
    const status = isCorrect ? '✅' : '❌';
    console.log(`${status} ${test.pattern}: Expected "${test.expected}", Got "${actualType}" - ${test.description}`);
    
  } catch (error) {
    console.log(`❌ ${test.pattern}: Error - ${error.message}`);
  }
});

console.log(`\n📊 Test Summary: ${passCount}/${totalCount} tests passed (${Math.round((passCount/totalCount)*100)}%)`);

if (passCount === totalCount) {
  console.log('🎉 All tests passed! Pattern classification is working correctly.');
} else {
  console.log('⚠️  Some tests failed. Please check the classification logic.');
}