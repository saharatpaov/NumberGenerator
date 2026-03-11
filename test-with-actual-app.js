// Test with actual app.js
const fs = require('fs');

// Read and execute app.js
const appCode = fs.readFileSync('app.js', 'utf8');

// Extract just the classes we need
eval(appCode);

console.log('Testing with actual app.js classes');

const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();

const testPatterns = [
  'bbbtnxbbbb',
  'zabcdefghi', 
  'ihgfedcbaz'
];

testPatterns.forEach(pattern => {
  console.log(`\nTesting: ${pattern}`);
  
  try {
    const validation = validator.validate(pattern);
    if (!validation.isValid) {
      console.log(`❌ Validation failed: ${validation.errorMessage}`);
      return;
    }
    
    const patternType = analyzer.identifyPatternType(pattern);
    console.log(`✅ Pattern type: ${patternType}`);
    
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
});