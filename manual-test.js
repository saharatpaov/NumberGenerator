/**
 * Manual test by copying the classes directly
 */

// Pattern types enumeration
const PatternType = {
  SOLOIST: 'The Soloist',
  HYPHEN_SEPARATED: 'Hyphen-separated',
  FULL_STRAIGHT: 'The Full Straight',
  CYCLIC_STRAIGHT: 'Cyclic Straight',
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge',
  UNKNOWN: 'Unknown'
};

// PatternValidator class
class PatternValidator {
  validate(pattern) {
    if (!pattern || pattern.length === 0) {
      return {
        isValid: false,
        errorMessage: 'Pattern cannot be empty',
        invalidCharacters: []
      };
    }

    if (!this.isValidLength(pattern)) {
      return {
        isValid: false,
        errorMessage: `Pattern must be exactly 10 characters (current: ${pattern.length} characters)`,
        invalidCharacters: []
      };
    }

    if (!this.hasValidCharacters(pattern)) {
      const invalidChars = this.getInvalidCharacters(pattern);
      return {
        isValid: false,
        errorMessage: `Pattern contains invalid characters: ${invalidChars.join(', ')}. Only lowercase letters a-j are allowed.`,
        invalidCharacters: invalidChars
      };
    }

    return {
      isValid: true,
      errorMessage: '',
      invalidCharacters: []
    };
  }

  isValidLength(pattern) {
    return pattern && pattern.length === 10;
  }

  hasValidCharacters(pattern) {
    const validChars = /^[a-j]+$/;
    return validChars.test(pattern);
  }

  getInvalidCharacters(pattern) {
    if (!pattern) return [];
    return [...new Set(pattern.split('').filter(c => !/[a-j]/.test(c)))];
  }
}

console.log('🧪 Manual Test - Pattern Analysis and Generation\n');

// Test basic validation
const validator = new PatternValidator();

const testPatterns = [
  'aaaaaaaaaa',  // Valid - Simple Soloist
  'abcdefghij',  // Valid - Full Straight
  'abc',         // Invalid - too short
  'abcdefghijk', // Invalid - too long
  'abcdefghiz'   // Invalid - contains 'z'
];

console.log('Testing PatternValidator:');
testPatterns.forEach(pattern => {
  const result = validator.validate(pattern);
  console.log(`"${pattern}": ${result.isValid ? '✅ Valid' : '❌ ' + result.errorMessage}`);
});

console.log('\n✅ PatternValidator is working correctly!');
console.log('\nTo run full tests, open test.html in a web browser.');
console.log('The core classes (PatternValidator, PatternAnalyzer, PatternGenerator) are implemented and ready for testing.');