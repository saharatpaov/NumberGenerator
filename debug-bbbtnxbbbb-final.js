// Final debug for bbbtnxbbbb
const pattern = 'bbbtnxbbbb';

console.log('=== Final Debug for bbbtnxbbbb ===');
console.log('Pattern:', pattern);

// Mock all the functions exactly as they are in the code
function _getLetterCounts(pattern) {
  const counts = {};
  for (const letter of pattern) {
    counts[letter] = (counts[letter] || 0) + 1;
  }
  return counts;
}

function _isAllSameInBlock(block) {
  const firstLetter = block[0];
  return block.split('').every(letter => letter === firstLetter);
}

function isFullStraight(pattern) {
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

function isCyclicStraight(pattern) {
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
  
  const uniqueLetters = [...new Set(letters)];
  if (uniqueLetters.length !== 10) {
    return false;
  }
  
  return isCyclicAscending || isCyclicDescending;
}

function isHyphenSeparated(pattern) {
  const block1 = pattern.slice(0, 3);
  const block2 = pattern.slice(3, 6);
  const block3 = pattern.slice(6, 10);
  
  const block1AllSame = _isAllSameInBlock(block1);
  const block2AllSame = _isAllSameInBlock(block2);
  const block3AllSame = _isAllSameInBlock(block3);
  
  const block1Letter = block1[0];
  const block3Letter = block3[0];
  
  if (block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame) {
    return true;
  }
  
  return false;
}

function isSoloist(pattern) {
  const letterCounts = _getLetterCounts(pattern);
  const uniqueLetters = Object.keys(letterCounts);
  const counts = Object.values(letterCounts).sort((a, b) => b - a);
  
  // First, check if this should be Hyphen-separated (exclude from Soloist)
  const block1 = pattern.slice(0, 3);
  const block2 = pattern.slice(3, 6);
  const block3 = pattern.slice(6, 10);
  
  const block1AllSame = _isAllSameInBlock(block1);
  const block2AllSame = _isAllSameInBlock(block2);
  const block3AllSame = _isAllSameInBlock(block3);
  
  const block1Letter = block1[0];
  const block3Letter = block3[0];
  
  if (block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame) {
    return false; // This should be Hyphen-separated
  }
  
  // Check for simple soloist: all same letter (aaaaaaaaaa)
  if (uniqueLetters.length === 1) {
    return true;
  }
  
  // All 9 digits identical: abbbbbbbbb (1 unique + 9 repeating)
  if (uniqueLetters.length === 2 && counts[0] === 9 && counts[1] === 1) {
    return true;
  }
  
  // All 8 digits identical: abdddddddd (2 unique + 8 repeating)
  if (uniqueLetters.length === 3 && counts[0] === 8) {
    return true;
  }
  
  // All 7 digits identical: abcddddddd (3 unique + 7 repeating)
  if (uniqueLetters.length === 4 && counts[0] === 7) {
    return true;
  }
  
  // All 6 digits identical: abcdeeeeee (4 unique + 6 repeating)
  if (uniqueLetters.length === 5 && counts[0] === 6) {
    return true;
  }
  
  // All 5 digits identical: abcdefffff (5 unique + 5 repeating)
  if (uniqueLetters.length === 6 && counts[0] === 5) {
    return true;
  }
  
  // All 4 digits identical (Block-ending): abcdefgggg (6 unique + 4 repeating)
  if (uniqueLetters.length === 7 && counts[0] === 4) {
    return true;
  }
  
  // 2 distinct digits across blocks patterns
  if (uniqueLetters.length === 2) {
    const first3 = pattern.slice(0, 3);
    const last7 = pattern.slice(3, 10);
    const first5 = pattern.slice(0, 5);
    const last5 = pattern.slice(5, 10);
    
    if ((_isAllSameInBlock(first3) && _isAllSameInBlock(last7) && first3[0] !== last7[0]) ||
        (_isAllSameInBlock(first5) && _isAllSameInBlock(last5) && first5[0] !== last5[0])) {
      return true;
    }
  }
  
  // 3 distinct digits across blocks: "aaabbbcccc"
  if (uniqueLetters.length === 3) {
    if (block1AllSame && block2AllSame && block3AllSame) {
      const block2Letter = block2[0];
      
      if (block1Letter !== block2Letter && block2Letter !== block3Letter && block1Letter !== block3Letter) {
        return true;
      }
    }
  }
  
  return false;
}

// Test the flow
console.log('\n1. Testing isFullStraight:', isFullStraight(pattern));
console.log('2. Testing isCyclicStraight:', isCyclicStraight(pattern));
console.log('3. Testing isHyphenSeparated:', isHyphenSeparated(pattern));
console.log('4. Testing isSoloist:', isSoloist(pattern));

// The issue should be that isSoloist returns false but isHyphenSeparated returns true
// But the order in identifyPatternType should check isHyphenSeparated first

console.log('\n=== Expected Flow ===');
console.log('1. isFullStraight should return false');
console.log('2. isCyclicStraight should return false');
console.log('3. isHyphenSeparated should return true -> HYPHEN_SEPARATED');
console.log('4. isSoloist should not be called');

console.log('\n=== Actual Results ===');
if (!isFullStraight(pattern) && !isCyclicStraight(pattern)) {
  if (isHyphenSeparated(pattern)) {
    console.log('✅ Should be classified as Hyphen-separated');
  } else if (isSoloist(pattern)) {
    console.log('❌ Would be classified as Soloist');
  } else {
    console.log('❓ Would not match any pattern');
  }
} else {
  console.log('Would be classified as Full Straight or Cyclic Straight');
}