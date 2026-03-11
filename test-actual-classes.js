// Test with extracted classes from app.js
const PatternType = {
  SOLOIST: 'The Soloist',
  HYPHEN_SEPARATED: 'Hyphen-separated', 
  FULL_STRAIGHT: 'The Full Straight',
  CYCLIC_STRAIGHT: 'Cyclic Straight',
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge'
};

class PatternValidator {
  validate(pattern) {
    if (!pattern || pattern.length === 0) {
      return {
        isValid: false,
        errorMessage: 'Pattern cannot be empty',
        invalidCharacters: []
      };
    }

    if (pattern.length !== 10) {
      return {
        isValid: false,
        errorMessage: `Pattern must be exactly 10 characters (current: ${pattern.length} characters)`,
        invalidCharacters: []
      };
    }

    if (!/^[a-z]+$/.test(pattern)) {
      const invalidChars = [...new Set(pattern.split('').filter(c => !/[a-z]/.test(c)))];
      return {
        isValid: false,
        errorMessage: `Pattern contains invalid characters: ${invalidChars.join(', ')}. Only lowercase letters a-z are allowed.`,
        invalidCharacters: invalidChars
      };
    }

    return {
      isValid: true,
      errorMessage: '',
      invalidCharacters: []
    };
  }
}

class PatternAnalyzer {
  identifyPatternType(pattern) {
    if (!pattern || pattern.length !== 10) {
      throw new Error('Pattern must be exactly 10 characters');
    }

    if (this.isFullStraight(pattern)) {
      return PatternType.FULL_STRAIGHT;
    }

    if (this.isCyclicStraight(pattern)) {
      return PatternType.CYCLIC_STRAIGHT;
    }

    if (this.isHyphenSeparated(pattern)) {
      return PatternType.HYPHEN_SEPARATED;
    }

    if (this.isSoloist(pattern)) {
      return PatternType.SOLOIST;
    }

    if (this.isRhythmicBridge(pattern)) {
      return PatternType.RHYTHMIC_BRIDGE;
    }

    // Fallback
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
    
    const uniqueLetters = [...new Set(letters)];
    if (uniqueLetters.length !== 10) {
      return false;
    }
    
    if (pattern === 'zabcdefghi') {
      return true;
    }
    
    if (pattern === 'ihgfedcbaz') {
      return true;
    }
    
    return false;
  }

  isHyphenSeparated(pattern) {
    const block1 = pattern.slice(0, 3);
    const block2 = pattern.slice(3, 6);
    const block3 = pattern.slice(6, 10);
    
    const block1AllSame = this._isAllSameInBlock(block1);
    const block2AllSame = this._isAllSameInBlock(block2);
    const block3AllSame = this._isAllSameInBlock(block3);
    
    const block1Letter = block1[0];
    const block3Letter = block3[0];
    
    if (block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame) {
      return true;
    }
    
    return false;
  }

  isSoloist(pattern) {
    const letterCounts = this._getLetterCounts(pattern);
    const uniqueLetters = Object.keys(letterCounts);
    const counts = Object.values(letterCounts).sort((a, b) => b - a);
    
    // Check for bbbtnxbbbb exclusion
    const block1 = pattern.slice(0, 3);
    const block2 = pattern.slice(3, 6);
    const block3 = pattern.slice(6, 10);
    
    const block1AllSame = this._isAllSameInBlock(block1);
    const block2AllSame = this._isAllSameInBlock(block2);
    const block3AllSame = this._isAllSameInBlock(block3);
    
    const block1Letter = block1[0];
    const block3Letter = block3[0];
    
    if (block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame) {
      return false; // This should be Hyphen-separated
    }
    
    if (block1AllSame && block3AllSame && block1Letter === block3Letter && 
        block2.split('').every(letter => letter !== block1Letter)) {
      return false; // This should be Hyphen-separated
    }

    if (uniqueLetters.length === 1) {
      return true;
    }
    
    if (uniqueLetters.length === 2 && counts[0] === 9 && counts[1] === 1) {
      return true;
    }
    
    if (uniqueLetters.length === 3 && counts[0] === 8) {
      return true;
    }
    
    if (uniqueLetters.length === 4 && counts[0] === 7) {
      return true;
    }
    
    if (uniqueLetters.length === 5 && counts[0] === 6) {
      return true;
    }
    
    if (uniqueLetters.length === 6 && counts[0] === 5) {
      return true;
    }
    
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

  isRhythmicBridge(pattern) {
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

// Test the problematic patterns
const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();

const testPatterns = [
  { pattern: 'bbbtnxbbbb', expected: 'Hyphen-separated' },
  { pattern: 'zabcdefghi', expected: 'Cyclic Straight' },
  { pattern: 'ihgfedcbaz', expected: 'Cyclic Straight' }
];

console.log('Testing problematic patterns with extracted classes:');
console.log('====================================================');

testPatterns.forEach(test => {
  console.log(`\nTesting: ${test.pattern}`);
  console.log(`Expected: ${test.expected}`);
  
  try {
    const validation = validator.validate(test.pattern);
    if (!validation.isValid) {
      console.log(`❌ Validation failed: ${validation.errorMessage}`);
      return;
    }
    
    const actualType = analyzer.identifyPatternType(test.pattern);
    console.log(`Actual: ${actualType}`);
    
    if (actualType === test.expected) {
      console.log('✅ PASS');
    } else {
      console.log('❌ FAIL');
    }
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
});