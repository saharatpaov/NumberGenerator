/**
 * Simple test to check pattern analysis and generation
 */

// Extract classes from app.js manually
const fs = require('fs');
const appCode = fs.readFileSync('app.js', 'utf8');

// Extract PatternType enum
const patternTypeMatch = appCode.match(/const PatternType = \{[\s\S]*?\};/);
if (patternTypeMatch) {
  eval(patternTypeMatch[0]);
}

// Extract PatternValidator class
const validatorMatch = appCode.match(/class PatternValidator \{[\s\S]*?\n\}/);
if (validatorMatch) {
  eval(validatorMatch[0]);
}

// Extract PatternAnalyzer class
const analyzerMatch = appCode.match(/class PatternAnalyzer \{[\s\S]*?\n\}/);
if (analyzerMatch) {
  eval(analyzerMatch[0]);
}

// Extract PatternGenerator class
const generatorMatch = appCode.match(/class PatternGenerator \{[\s\S]*?\n\}/);
if (generatorMatch) {
  eval(generatorMatch[0]);
}

console.log('🧪 Testing Pattern Analysis and Generation\n');

// Test basic functionality
try {
  const validator = new PatternValidator();
  const analyzer = new PatternAnalyzer();
  const generator = new PatternGenerator();
  
  console.log('✅ Classes instantiated successfully');
  
  // Test a simple case
  const pattern = 'aaaaaaaaaa';
  console.log(`\nTesting pattern: "${pattern}"`);
  
  const validation = validator.validate(pattern);
  console.log(`Validation: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
  
  if (validation.isValid) {
    const patternType = analyzer.identifyPatternType(pattern);
    console.log(`Pattern Type: ${patternType}`);
    
    const numbers = generator.generate(pattern, patternType);
    console.log(`Generated ${numbers.length} numbers`);
    console.log(`Sample: ${numbers.slice(0, 3).join(', ')}`);
  }
  
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
  console.log(error.stack);
}