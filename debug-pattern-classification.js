// Test pattern classification methods directly
const PatternType = {
  SOLOIST: 'The Soloist',
  HYPHEN_SEPARATED: 'Hyphen-separated', 
  FULL_STRAIGHT: 'The Full Straight',
  CYCLIC_STRAIGHT: 'Cyclic Straight',
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge'
};

class PatternAnalyzer {
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

    // Rest of soloist logic...
    if (uniqueLetters.length === 1) {
      return true;
    }
    
    if (uniqueLetters.length === 2 && counts[0] === 9 && counts[1] === 1) {
      return true;
    }
    
    return false; // Simplified for testing
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

const analyzer = new PatternAnalyzer();
const pattern = 'bbbtnxbbbb';

console.log('Testing pattern:', pattern);
console.log('isFullStraight:', analyzer.isFullStraight(pattern));
console.log('isCyclicStraight:', analyzer.isCyclicStraight(pattern));
console.log('isHyphenSeparated:', analyzer.isHyphenSeparated(pattern));
console.log('isSoloist:', analyzer.isSoloist(pattern));