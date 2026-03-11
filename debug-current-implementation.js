// Debug current implementation to see what's wrong

console.log('Debugging current implementation...\n');

// Copy the current implementation
class PatternGenerator {
  _generateWithWildcards(pattern) {
    const results = [];
    
    // Find all wildcard positions
    const wildcardPositions = [];
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === '?') {
        wildcardPositions.push(i);
      }
    }
    
    // Create letter-to-positions mapping for non-wildcard characters
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
    
    console.log(`Pattern: ${pattern}`);
    console.log(`Wildcard positions: ${wildcardPositions}`);
    console.log(`Unique letters: ${uniqueLetters}`);
    console.log(`Letter positions:`, letterToPositions);
    
    // Generate all combinations
    this._generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, 0, {}, [], results);
    
    return results;
  }

  _generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, letterIndex, letterToDigit, wildcardDigits, results) {
    console.log(`\n_generateWildcardCombinations called:`);
    console.log(`  letterIndex: ${letterIndex}, uniqueLetters.length: ${uniqueLetters.length}`);
    console.log(`  letterToDigit:`, letterToDigit);
    
    // If we've assigned digits to all letters, now handle wildcards
    if (letterIndex === uniqueLetters.length) {
      console.log(`  All letters assigned, calling _generateWildcardDigits`);
      this._generateWildcardDigits(pattern, letterToDigit, wildcardPositions, 0, wildcardDigits, results);
      return;
    }
    
    const currentLetter = uniqueLetters[letterIndex];
    console.log(`  Processing letter: ${currentLetter}`);
    
    // Try each digit 0-9 for this letter
    for (let digit = 0; digit <= 9; digit++) {
      // Check if this digit is already used by another letter (NOT wildcards)
      let digitUsed = false;
      for (const [letter, assignedDigit] of Object.entries(letterToDigit)) {
        if (assignedDigit === digit) {
          digitUsed = true;
          break;
        }
      }
      
      if (!digitUsed) {
        console.log(`    Trying digit ${digit} for letter ${currentLetter}`);
        letterToDigit[currentLetter] = digit;
        this._generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, letterIndex + 1, letterToDigit, wildcardDigits, results);
        delete letterToDigit[currentLetter];
      }
    }
  }

  _generateWildcardDigits(pattern, letterToDigit, wildcardPositions, wildcardIndex, wildcardDigits, results) {
    console.log(`\n_generateWildcardDigits called:`);
    console.log(`  wildcardIndex: ${wildcardIndex}, wildcardPositions.length: ${wildcardPositions.length}`);
    console.log(`  letterToDigit:`, letterToDigit);
    console.log(`  wildcardDigits so far:`, wildcardDigits);
    
    if (wildcardIndex === wildcardPositions.length) {
      // Generate the final number
      let number = '';
      for (let pos = 0; pos < 10; pos++) {
        const char = pattern[pos];
        if (char === '?') {
          const wildcardIdx = wildcardPositions.indexOf(pos);
          number += wildcardDigits[wildcardIdx].toString();
        } else {
          number += letterToDigit[char].toString();
        }
      }
      const formatted = this.formatNumber(number);
      console.log(`    Generated number: ${formatted}`);
      results.push(formatted);
      return;
    }
    
    console.log(`  Processing wildcard at position ${wildcardPositions[wildcardIndex]}`);
    
    // Try each digit 0-9 for this wildcard position
    // IMPORTANT: Wildcards can duplicate any digit (including letters and other wildcards)
    for (let digit = 0; digit <= 9; digit++) {
      console.log(`    Trying digit ${digit} for wildcard`);
      wildcardDigits[wildcardIndex] = digit;
      this._generateWildcardDigits(pattern, letterToDigit, wildcardPositions, wildcardIndex + 1, wildcardDigits, results);
    }
  }

  formatNumber(digits) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

// Test with pattern a?aaaaaaaa
const generator = new PatternGenerator();
const results = generator._generateWithWildcards('a?aaaaaaaa');

console.log(`\n\nFinal results: ${results.length} numbers`);
console.log('First 10 numbers:');
results.slice(0, 10).forEach(number => console.log(`  ${number}`));

// Check for duplicates between 'a' and '?'
let duplicateCount = 0;
for (const number of results) {
  const digits = number.replace(/-/g, '');
  const aDigit = digits[0]; // 'a' digit
  const wildcardDigit = digits[1]; // '?' digit
  
  if (aDigit === wildcardDigit) {
    duplicateCount++;
    if (duplicateCount <= 3) {
      console.log(`  Duplicate found: ${number} (a=${aDigit}, ?=${wildcardDigit})`);
    }
  }
}

console.log(`\nTotal duplicates found: ${duplicateCount}`);