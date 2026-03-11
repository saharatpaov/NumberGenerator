const pattern = 'bbbtnxbbbb';
console.log('Pattern:', pattern);

const block1 = pattern.slice(0, 3);
const block2 = pattern.slice(3, 6);
const block3 = pattern.slice(6, 10);

console.log('Block 1:', block1);
console.log('Block 2:', block2);
console.log('Block 3:', block3);

function _isAllSameInBlock(block) {
  const firstLetter = block[0];
  return block.split('').every(letter => letter === firstLetter);
}

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
console.log('Block 1 === Block 3:', block1Letter === block3Letter);

const isHyphenSeparated = block1Letter === block3Letter && block1AllSame && block3AllSame && !block2AllSame;
console.log('Should be Hyphen-separated:', isHyphenSeparated);