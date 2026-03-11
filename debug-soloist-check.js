// Debug isSoloist function for bbbtnxbbbb
const pattern = 'bbbtnxbbbb';

console.log('=== Debugging isSoloist for bbbtnxbbbb ===');
console.log('Pattern:', pattern);

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

const letterCounts = _getLetterCounts(pattern);
const uniqueLetters = Object.keys(letterCounts);
const counts = Object.values(letterCounts).sort((a, b) => b - a);

console.log('Letter counts:', letterCounts);
console.log('Unique letters:', uniqueLetters);
console.log('Counts (sorted):', counts);

// First check: Hyphen-separated exclusion
const block1 = pattern.slice(0, 3);
const block2 = pattern.slice(3, 6);
const block3 = pattern.slice(6, 10);

const block1AllSame = _isAllSameInBlock(block1);
const block2AllSame = _isAllSameInBlock(block2);
const block3AllSame = _isAllSameInBlock(block3);

const block1Letter = block1[0];
const block3Letter = block3[0];

const hyphenSeparatedCondition = block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame;
console.log('\nHyphen-separated exclusion check:', hyphenSeparatedCondition);

if (hyphenSeparatedCondition) {
  console.log('❌ Should return false (exclude from Soloist)');
} else {
  console.log('✅ Can continue with Soloist checks');
}

// Continue with other checks
console.log('\nOther Soloist checks:');
console.log('uniqueLetters.length === 1:', uniqueLetters.length === 1);
console.log('uniqueLetters.length === 2 && counts[0] === 9:', uniqueLetters.length === 2 && counts[0] === 9);
console.log('uniqueLetters.length === 3 && counts[0] === 8:', uniqueLetters.length === 3 && counts[0] === 8);
console.log('uniqueLetters.length === 4 && counts[0] === 7:', uniqueLetters.length === 4 && counts[0] === 7);

console.log('\n🔍 The issue:');
console.log('The Hyphen-separated exclusion check should return false, preventing further Soloist checks');
console.log('But it seems like the logic is not working as expected in the actual code');