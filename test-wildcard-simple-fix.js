// Simple test for wildcard independence
// Test if wildcards can have duplicate digits

console.log('Testing Wildcard Independence...\n');

// Mock the classes for testing
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
    return 'The Soloist'; // Simplified for testing
  }
}

class PatternGenerator {
  generate(pattern, patternType) {
    return this._generateWithWildcards(pattern);
  }

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
    
    // Generate all combinations
    this._generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, 0, {}, [], results);
    
    return results;
  }

  _generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, letterIndex, letterToDigit, wildcardDigits, results) {
    // If we've assigned digits to all letters, now handle wildcards
    if (letterIndex === uniqueLetters.length) {
      this._generateWildcardDigits(pattern, letterToDigit, wildcardPositions, 0, wildcardDigits, results);
      return;
    }
    
    const currentLetter = uniqueLetters[letterIndex];
    
    // Try each digit 0-9 for this letter
    for (let digit = 0; digit <= 9; digit++) {
      // Check if this digit is already used by another letter
      let digitUsed = false;
      for (const [letter, assignedDigit] of Object.entries(letterToDigit)) {
        if (assignedDigit === digit) {
          digitUsed = true;
          break;
        }
      }
      
      if (!digitUsed) {
        letterToDigit[currentLetter] = digit;
        this._generateWildcardCombinations(pattern, uniqueLetters, letterToPositions, wildcardPositions, letterIndex + 1, letterToDigit, wildcardDigits, results);
        delete letterToDigit[currentLetter];
      }
    }
  }

  // FIXED: Allow wildcards to have duplicate digits
  _generateWildcardDigits(pattern, letterToDigit, wildcardPositions, wildcardIndex, wildcardDigits, results) {
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
      results.push(this.formatNumber(number));
      return;
    }
    
    // Try each digit 0-9 for this wildcard position
    // IMPORTANT: Wildcards can duplicate any digit (including letters and other wildcards)
    for (let digit = 0; digit <= 9; digit++) {
      wildcardDigits[wildcardIndex] = digit;
      this._generateWildcardDigits(pattern, letterToDigit, wildcardPositions, wildcardIndex + 1, wildcardDigits, results);
    }
  }

  formatNumber(digits) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

// Test cases
const tests = [
  {
    name: 'Test 1: Pattern "??" should allow duplicates',
    pattern: '??aaaaaaaa',
    expectedDuplicates: true,
    description: 'Two wildcards can have same digit (00, 11, 22, etc.)'
  },
  {
    name: 'Test 2: Pattern "a?" should allow ? to duplicate a',
    pattern: 'a?aaaaaaaa',
    expectedDuplicates: true,
    description: 'Wildcard can have same digit as letter a'
  }
];

const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();
const generator = new PatternGenerator();

tests.forEach((test, index) => {
  console.log(`\n${test.name}`);
  console.log(`Pattern: ${test.pattern}`);
  console.log(`Description: ${test.description}`);
  
  try {
    // Validate pattern
    const validation = validator.validate(test.pattern);
    if (!validation.isValid) {
      console.log(`❌ Validation failed: ${validation.errorMessage}`);
      return;
    }
    
    // Generate numbers
    const patternType = analyzer.identifyPatternType(test.pattern);
    const numbers = generator.generate(test.pattern, patternType);
    
    console.log(`Generated: ${numbers.length} numbers`);
    
    // Check for wildcard duplicates
    const wildcardPositions = [];
    for (let i = 0; i < test.pattern.length; i++) {
      if (test.pattern[i] === '?') {
        wildcardPositions.push(i);
      }
    }
    
    let foundDuplicates = false;
    const duplicateExamples = [];
    
    for (const number of numbers.slice(0, 50)) {
      const digits = number.replace(/-/g, '');
      const wildcardDigits = wildcardPositions.map(pos => digits[pos]);
      
      // Check if any wildcard digits are the same
      const uniqueWildcardDigits = [...new Set(wildcardDigits)];
      if (uniqueWildcardDigits.length < wildcardDigits.length) {
        foundDuplicates = true;
        duplicateExamples.push(`${number} (wildcards: ${wildcardDigits.join(', ')})`);
        if (duplicateExamples.length >= 3) break;
      }
    }
    
    console.log(`Wildcard duplicates found: ${foundDuplicates ? 'Yes ✅' : 'No ❌'}`);
    if (duplicateExamples.length > 0) {
      console.log('Examples with duplicate wildcards:');
      duplicateExamples.forEach(example => console.log(`  ${example}`));
    }
    
    console.log('Sample numbers:');
    numbers.slice(0, 5).forEach(number => console.log(`  ${number}`));
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
});

console.log('\nTest completed!');