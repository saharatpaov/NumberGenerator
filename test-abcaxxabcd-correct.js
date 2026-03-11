// Test pattern abcaxxabcd with correct position analysis
console.log('🧪 Testing Pattern: abcaxxabcd (Correct Analysis)');
console.log('==================================================');

const pattern = 'abcaxxabcd';

// Analyze the pattern manually
console.log(`\n📋 Manual Pattern Analysis:`);
console.log(`Pattern: ${pattern.split('').join(' ')}`);
console.log(`Position: ${Array.from({length: 10}, (_, i) => i).join(' ')}`);

// Find positions for each letter
const letterPositions = {};
for (let i = 0; i < pattern.length; i++) {
  const letter = pattern[i];
  if (!letterPositions[letter]) {
    letterPositions[letter] = [];
  }
  letterPositions[letter].push(i);
}

console.log(`\n🔍 Letter Position Analysis:`);
for (const [letter, positions] of Object.entries(letterPositions)) {
  console.log(`• ${letter}: positions ${positions.join(', ')} ${positions.length > 1 ? '(must use same digit)' : '(independent digit)'}`);
}

// Create position groups
const positionGroups = [];
const processedPositions = new Set();

for (let pos = 0; pos < pattern.length; pos++) {
  if (processedPositions.has(pos)) continue;
  
  const letter = pattern[pos];
  const allPositionsForLetter = letterPositions[letter];
  
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

console.log(`\n🔢 Position Groups:`);
positionGroups.forEach((group, index) => {
  const letter = pattern[group[0]];
  console.log(`Group ${index + 1}: positions ${group.join(', ')} (letter '${letter}')`);
});

const expectedCombinations = Math.pow(10, positionGroups.length);
console.log(`\n📊 Expected Combinations: 10^${positionGroups.length} = ${expectedCombinations.toLocaleString()}`);

// Generate a few sample numbers manually to verify
console.log(`\n🔢 Manual Sample Generation:`);

function generateSample(combination) {
  const digits = new Array(10);
  let temp = combination;
  
  // Assign digits to each position group (reverse order for proper digit assignment)
  for (let groupIndex = positionGroups.length - 1; groupIndex >= 0; groupIndex--) {
    const digit = temp % 10;
    temp = Math.floor(temp / 10);
    
    const positions = positionGroups[groupIndex];
    positions.forEach(pos => {
      digits[pos] = digit;
    });
  }
  
  return digits.join('').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Generate first 10 samples
for (let i = 0; i < 10; i++) {
  const number = generateSample(i);
  console.log(`Sample ${i + 1}: ${number}`);
}

// Verify the structure of generated numbers
console.log(`\n🔍 Structure Verification:`);

function verifyNumber(number) {
  const digits = number.replace(/-/g, '');
  const issues = [];
  
  // Check 'a' positions (0, 3, 6)
  const aDigits = [digits[0], digits[3], digits[6]];
  if (!(aDigits[0] === aDigits[1] && aDigits[1] === aDigits[2])) {
    issues.push(`'a' positions differ: ${aDigits.join(',')}`);
  }
  
  // Check 'b' positions (1, 7)
  const bDigits = [digits[1], digits[7]];
  if (bDigits[0] !== bDigits[1]) {
    issues.push(`'b' positions differ: ${bDigits.join(',')}`);
  }
  
  // Check 'c' positions (2, 8)
  const cDigits = [digits[2], digits[8]];
  if (cDigits[0] !== cDigits[1]) {
    issues.push(`'c' positions differ: ${cDigits.join(',')}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues: issues,
    structure: {
      a: aDigits[0],
      b: bDigits[0], 
      c: cDigits[0],
      x1: digits[4],
      x2: digits[5],
      d: digits[9]
    }
  };
}

// Verify first 10 samples
for (let i = 0; i < 10; i++) {
  const number = generateSample(i);
  const verification = verifyNumber(number);
  
  if (verification.isValid) {
    const s = verification.structure;
    console.log(`✅ ${number}: Valid (a=${s.a}, b=${s.b}, c=${s.c}, x=${s.x1}${s.x2}, d=${s.d})`);
  } else {
    console.log(`❌ ${number}: Invalid - ${verification.issues.join('; ')}`);
  }
}

console.log(`\n✅ Analysis Complete`);
console.log(`Expected pattern: abcaxxabcd should generate ${expectedCombinations.toLocaleString()} unique phone numbers`);
console.log(`Each number should follow the constraint that same letters use same digits`);