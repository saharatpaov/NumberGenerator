// Debug isHyphenSeparated function
const pattern = 'bbbtnxbbbb';

console.log('=== Debugging isHyphenSeparated ===');
console.log('Pattern:', pattern);

function _isAllSameInBlock(block) {
  const firstLetter = block[0];
  return block.split('').every(letter => letter === firstLetter);
}

// Standard 3-3-4 block analysis
const block1 = pattern.slice(0, 3);   // positions 0-2
const block2 = pattern.slice(3, 6);   // positions 3-5
const block3 = pattern.slice(6, 10);  // positions 6-9

console.log('Block 1 (0-2):', block1);
console.log('Block 2 (3-5):', block2);
console.log('Block 3 (6-9):', block3);

const block1AllSame = _isAllSameInBlock(block1);
const block2AllSame = _isAllSameInBlock(block2);
const block3AllSame = _isAllSameInBlock(block3);

console.log('Block 1 all same:', block1AllSame);
console.log('Block 2 all same:', block2AllSame);
console.log('Block 3 all same:', block3AllSame);

const block1Letter = block1[0];
const block3Letter = block3[0];

console.log('Block 1 letter:', block1Letter);
console.log('Block 3 letter:', block3Letter);

// Check the main condition for bbbtnxbbbb pattern
const condition = block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame;
console.log('\nMain condition (first and last blocks same, middle different):', condition);

console.log('\nBreaking down the condition:');
console.log('block1Letter === block3Letter:', block1Letter === block3Letter);
console.log('block1AllSame:', block1AllSame);
console.log('block3AllSame:', block3AllSame);
console.log('!block2AllSame:', !block2AllSame);

console.log('\nResult: Should be Hyphen-separated =', condition);