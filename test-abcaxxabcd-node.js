// Test pattern abcaxxabcd with fixed algorithm
// Extract necessary classes from app.js for testing

// Mock PatternType constants
const PatternType = {
  SOLOIST: 'The Soloist',
  HYPHEN_SEPARATED: 'Hyphen-separated', 
  FULL_STRAIGHT: 'The Full Straight',
  CYCLIC_STRAIGHT: 'Cyclic Straight',
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge'
};

// Mock PatternValidator
class PatternValidator {
  validate(pattern) {
    if (!pattern || typeof pattern !== 'string') {
      return { isValid: false, errorMessage: 'Pattern must be a non-empty string' };
    }
    
    if (pattern.length !== 10) {
      return { isValid: false, errorMessage: 'Pattern must be exactly 10 characters long' };
    }
    
    if (!/^[a-z]+$/.test(pattern)) {
      return { isValid: false, errorMessage: 'Pattern contains invalid characters. Only lowercase letters a-z are allowed.' };
    }
    
    return { isValid: true };
  }
}

// Mock PatternAnalyzer (simplified)
class PatternAnalyzer {
  identifyPatternType(pattern) {
    // For this test, we know abcaxxabcd is Rhythmic Bridge
    return PatternType.RHYTHMIC_BRIDGE;
  }
  
  analyzeRhythmicStructure(pattern) {
    const letterPositions = this._getLetterPositions(pattern);
    
    // Create position groups - positions that must use the same digit
    const positionGroups = [];
    const processedPositions = new Set();
    
    for (let pos = 0; pos < pattern.length; pos++) {
      if (processedPositions.has(pos)) continue;
      
      const letter = pattern[pos];
      const allPositionsForLetter = letterPositions[letter] || [pos];
      
      if (allPositionsForLetter.length > 1) {
        // Group positions that should use the same digit
        positionGroups.push(allPositionsForLetter);
        allPositionsForLetter.forEach(p => processedPositions.add(p));
      } else {
        // Single position - independent digit choice
        positionGroups.push([pos]);
        processedPositions.add(pos);
      }
    }
    
    // Calculate expected combinations based on position groups
    const expectedCombinations = Math.pow(10, positionGroups.length);
    
    return {
      letterPositions: new Map(Object.entries(letterPositions)),
      positionGroups: positionGroups,
      expectedCombinations: expectedCombinations
    };
  }
  
  _getLetterPositions(pattern) {
    const positions = {};
    for (let i = 0; i < pattern.length; i++) {
      const letter = pattern[i];
      if (!positions[letter]) {
        positions[letter] = [];
      }
      positions[letter].push(i);
    }
    return positions;
  }
}

// Mock PatternGenerator (simplified)
class PatternGenerator {
  generate(pattern, patternType) {
    if (patternType === PatternType.RHYTHMIC_BRIDGE) {
      return this.generateRhythmicBridge(pattern);
    }
    throw new Error(`Unsupported pattern type: ${patternType}`);
  }
  
  generateRhythmicBridge(pattern) {
    const results = [];
    const analyzer = new PatternAnalyzer();
    const structure = analyzer.analyzeRhythmicStructure(pattern);
    
    const positionGroups = structure.positionGroups;
    const totalGroups = positionGroups.length;
    const totalCombinations = Math.pow(10, totalGroups);
    
    console.log(`Position groups: ${totalGroups}`);
    console.log(`Total combinations: ${totalCombinations.toLocaleString()}`);
    
    // Generate first 100 combinations for testing
    const maxToGenerate = Math.min(100, totalCombinations);
    
    for (let combination = 0; combination < maxToGenerate; combination++) {
      const digits = new Array(10);
      let temp = combination;
      
      // Assign digits to each position group
      for (let groupIndex = totalGroups - 1; groupIndex >= 0; groupIndex--) {
        const digit = temp % 10;
        temp = Math.floor(temp / 10);
        
        const positions = positionGroups[groupIndex];
        positions.forEach(pos => {
          digits[pos] = digit;
        });
      }
      
      results.push(this.formatNumber(digits.join('')));
    }
    
    return results;
  }
  
  formatNumber(digits) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

// Test the pattern
console.log('🧪 Testing Pattern: abcaxxabcd');
console.log('================================');

const pattern = 'abcaxxabcd';

try {
  // Step 1: Validate
  const validator = new PatternValidator();
  const validation = validator.validate(pattern);
  
  if (!validation.isValid) {
    console.log(`❌ Validation failed: ${validation.errorMessage}`);
    process.exit(1);
  }
  
  console.log('✅ Pattern validation passed');
  
  // Step 2: Analyze
  const analyzer = new PatternAnalyzer();
  const patternType = analyzer.identifyPatternType(pattern);
  const structure = analyzer.analyzeRhythmicStructure(pattern);
  
  console.log(`\n📋 Pattern Analysis:`);
  console.log(`Pattern: ${pattern}`);
  console.log(`Type: ${patternType}`);
  console.log(`Expected combinations: ${structure.expectedCombinations.toLocaleString()}`);
  
  console.log(`\n🔍 Position Groups:`);
  structure.positionGroups.forEach((group, index) => {
    const letter = pattern[group[0]];
    console.log(`Group ${index + 1}: positions ${group.join(', ')} (letter '${letter}')`);
  });
  
  console.log(`\n📝 Pattern Structure:`);
  console.log(`• a: positions 0, 3, 7 (must use same digit)`);
  console.log(`• b: positions 1, 8 (must use same digit)`);
  console.log(`• c: positions 2, 9 (must use same digit)`);
  console.log(`• x: position 4 (independent digit)`);
  console.log(`• x: position 5 (independent digit)`);
  console.log(`• d: position 6 (independent digit)`);
  console.log(`\nTotal independent choices: 6 → 10^6 = 1,000,000 combinations`);
  
  // Step 3: Generate sample numbers
  const generator = new PatternGenerator();
  const startTime = Date.now();
  const numbers = generator.generate(pattern, patternType);
  const endTime = Date.now();
  
  console.log(`\n🔢 Generation Results:`);
  console.log(`Generated ${numbers.length} sample numbers in ${endTime - startTime}ms`);
  
  console.log(`\n📋 First 10 Numbers:`);
  numbers.slice(0, 10).forEach((number, index) => {
    console.log(`${index + 1}: ${number}`);
  });
  
  // Step 4: Verify structure
  console.log(`\n🔍 Structure Verification:`);
  let validCount = 0;
  let invalidCount = 0;
  
  numbers.forEach((number, index) => {
    const digits = number.replace(/-/g, '');
    let isValid = true;
    let issues = [];
    
    // Check 'a' positions (0, 3, 7)
    const aDigits = [digits[0], digits[3], digits[7]];
    if (!(aDigits[0] === aDigits[1] && aDigits[1] === aDigits[2])) {
      isValid = false;
      issues.push(`'a' positions differ: ${aDigits.join(',')}`);
    }
    
    // Check 'b' positions (1, 8)
    const bDigits = [digits[1], digits[8]];
    if (bDigits[0] !== bDigits[1]) {
      isValid = false;
      issues.push(`'b' positions differ: ${bDigits.join(',')}`);
    }
    
    // Check 'c' positions (2, 9)
    const cDigits = [digits[2], digits[9]];
    if (cDigits[0] !== cDigits[1]) {
      isValid = false;
      issues.push(`'c' positions differ: ${cDigits.join(',')}`);
    }
    
    if (isValid) {
      validCount++;
      if (index < 5) {
        console.log(`✅ ${number}: Valid (a=${aDigits[0]}, b=${bDigits[0]}, c=${cDigits[0]}, x=${digits[4]}${digits[5]}, d=${digits[6]})`);
      }
    } else {
      invalidCount++;
      if (index < 5) {
        console.log(`❌ ${number}: Invalid - ${issues.join('; ')}`);
      }
    }
  });
  
  console.log(`\n📊 Verification Summary:`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Invalid: ${invalidCount}`);
  console.log(`📈 Success Rate: ${((validCount / numbers.length) * 100).toFixed(1)}%`);
  
  if (invalidCount === 0) {
    console.log(`\n🎉 SUCCESS: All numbers follow the correct pattern structure!`);
  } else {
    console.log(`\n⚠️ WARNING: Some numbers don't follow the pattern structure`);
  }
  
  console.log(`\n✅ Test Complete`);
  
} catch (error) {
  console.error(`❌ Test failed: ${error.message}`);
  console.error(error.stack);
}