// Debug wildcard issue with pattern a?aaaaaaaa

console.log('Debugging wildcard issue...\n');

// Test pattern: a?aaaaaaaa
// Expected: 'a' can be any digit 0-9, '?' can be any digit 0-9 (including same as 'a')
// So we should see numbers like: 000-000-0000, 010-000-0000, 111-111-1111, etc.

const pattern = 'a?aaaaaaaa';
console.log(`Pattern: ${pattern}`);

// Find wildcard positions
const wildcardPositions = [];
for (let i = 0; i < pattern.length; i++) {
  if (pattern[i] === '?') {
    wildcardPositions.push(i);
  }
}
console.log(`Wildcard positions: ${wildcardPositions}`);

// Find letter positions
const letterToPositions = {};
const uniqueLetters = [...new Set(pattern.split('').filter(char => char !== '?'))];

uniqueLetters.forEach(letter => {
  letterToPositions[letter] = [];
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === letter) {
      letterToPositions[letter].push(i);
    }
  }
});

console.log(`Unique letters: ${uniqueLetters}`);
console.log(`Letter positions:`, letterToPositions);

// Manual generation to understand the issue
console.log('\nManual generation:');
const results = [];

// For pattern a?aaaaaaaa:
// - 'a' appears at positions: [0, 2, 3, 4, 5, 6, 7, 8, 9]
// - '?' appears at positions: [1]
// - 'a' can be any digit 0-9
// - '?' can be any digit 0-9 (including same as 'a')

for (let aDigit = 0; aDigit <= 9; aDigit++) {
  for (let wildcardDigit = 0; wildcardDigit <= 9; wildcardDigit++) {
    let number = '';
    for (let pos = 0; pos < 10; pos++) {
      if (pattern[pos] === 'a') {
        number += aDigit.toString();
      } else if (pattern[pos] === '?') {
        number += wildcardDigit.toString();
      }
    }
    const formatted = `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
    results.push(formatted);
  }
}

console.log(`Generated ${results.length} numbers manually`);
console.log('First 10 numbers:');
results.slice(0, 10).forEach(number => console.log(`  ${number}`));

// Check for cases where wildcard equals 'a' digit
const duplicateCases = [];
for (let i = 0; i < results.length; i++) {
  const number = results[i];
  const digits = number.replace(/-/g, '');
  const aDigit = digits[0]; // 'a' digit
  const wildcardDigit = digits[1]; // '?' digit
  
  if (aDigit === wildcardDigit) {
    duplicateCases.push(`${number} (a=${aDigit}, ?=${wildcardDigit})`);
    if (duplicateCases.length >= 5) break;
  }
}

console.log(`\nFound ${duplicateCases.length} cases where wildcard equals 'a':`);
duplicateCases.forEach(example => console.log(`  ${example}`));

console.log('\nThis proves that wildcards SHOULD be able to duplicate letter digits!');