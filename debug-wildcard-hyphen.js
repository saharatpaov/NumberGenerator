// Debug wildcard hyphen-separated pattern
const pattern = 'bbb???bbbb';

console.log('Debugging pattern:', pattern);

// Mock the _isAllSameInBlock function
function _isAllSameInBlock(block) {
  const nonWildcardChars = block.split('').filter(char => char !== '?');
  if (nonWildcardChars.length === 0) return true; // All wildcards
  
  const firstLetter = nonWildcardChars[0];
  return nonWildcardChars.every(letter => letter === firstLetter);
}

const block1 = pattern.slice(0, 3);
const block2 = pattern.slice(3, 6);
const block3 = pattern.slice(6, 10);

console.log('Block 1:', block1);
console.log('Block 2:', block2);
console.log('Block 3:', block3);

const block1AllSame = _isAllSameInBlock(block1);
const block2AllSame = _isAllSameInBlock(block2);
const block3AllSame = _isAllSameInBlock(block3);

console.log('Block 1 all same:', block1AllSame);
console.log('Block 2 all same:', block2AllSame);
console.log('Block 3 all same:', block3AllSame);

const block1NonWildcard = block1.replace(/\?/g, '');
const block3NonWildcard = block3.replace(/\?/g, '');

console.log('Block 1 non-wildcard:', block1NonWildcard);
console.log('Block 3 non-wildcard:', block3NonWildcard);

if (block1NonWildcard.length > 0 && block3NonWildcard.length > 0) {
  const block1Letter = block1NonWildcard[0];
  const block3Letter = block3NonWildcard[0];
  
  console.log('Block 1 letter:', block1Letter);
  console.log('Block 3 letter:', block3Letter);
  console.log('Letters equal:', block1Letter === block3Letter);
  
  const block2IsAllWildcards = block2 === '???';
  console.log('Block 2 is all wildcards:', block2IsAllWildcards);
  
  const isHyphenSeparated = block1Letter === block3Letter && block1AllSame && block3AllSame && 
                           (block2IsAllWildcards || !block2AllSame);
  console.log('Should be Hyphen-separated:', isHyphenSeparated);
} else {
  console.log('Cannot compare - insufficient non-wildcard characters');
}