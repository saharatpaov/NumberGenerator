// Quick test for Cyclic Straight patterns

console.log('Testing Cyclic Straight Patterns...\n');

// Mock PatternGenerator class
class PatternGenerator {
  generateCyclicStraight(pattern) {
    const results = [];
    
    // Determine direction based on pattern
    if (pattern === 'zabcdefghi') {
      // Ascending cyclic: z(9)→a(0)→b(1)→...→i(8)
      // Generate 10 starting positions for ascending cyclic
      for (let start = 0; start <= 9; start++) {
        let ascending = "";
        for (let i = 0; i < 10; i++) {
          ascending += ((start + i) % 10).toString();
        }
        
        // Skip if this is the Full Straight ascending pattern
        if (ascending !== "1234567890") {
          results.push(this.formatNumber(ascending));
        }
      }
    } else if (pattern === 'ihgfedcbaz') {
      // Descending cyclic: i(8)→h(7)→...→a(0)→z(9)
      // Generate 10 starting positions for descending cyclic
      for (let start = 0; start <= 9; start++) {
        let descending = "";
        for (let i = 0; i < 10; i++) {
          descending += ((start - i + 10) % 10).toString();
        }
        
        // Skip if this is the Full Straight descending pattern
        if (descending !== "9876543210") {
          results.push(this.formatNumber(descending));
        }
      }
    }
    
    return results;
  }

  formatNumber(digits) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
}

const generator = new PatternGenerator();

// Test zabcdefghi (ascending)
console.log('Pattern: zabcdefghi (Ascending Cyclic)');
const ascendingResults = generator.generateCyclicStraight('zabcdefghi');
console.log(`Generated: ${ascendingResults.length} numbers`);
console.log('First 5 numbers:');
ascendingResults.slice(0, 5).forEach(num => console.log(`  ${num}`));
console.log('Last 5 numbers:');
ascendingResults.slice(-5).forEach(num => console.log(`  ${num}`));

console.log('\n' + '='.repeat(50) + '\n');

// Test ihgfedcbaz (descending)
console.log('Pattern: ihgfedcbaz (Descending Cyclic)');
const descendingResults = generator.generateCyclicStraight('ihgfedcbaz');
console.log(`Generated: ${descendingResults.length} numbers`);
console.log('First 5 numbers:');
descendingResults.slice(0, 5).forEach(num => console.log(`  ${num}`));
console.log('Last 5 numbers:');
descendingResults.slice(-5).forEach(num => console.log(`  ${num}`));

console.log('\n' + '='.repeat(50) + '\n');

// Compare results
const ascendingSet = new Set(ascendingResults);
const descendingSet = new Set(descendingResults);
const commonNumbers = ascendingResults.filter(num => descendingSet.has(num));

console.log('Comparison:');
console.log(`Ascending count: ${ascendingResults.length}`);
console.log(`Descending count: ${descendingResults.length}`);
console.log(`Common numbers: ${commonNumbers.length}`);
console.log(`Are different: ${commonNumbers.length < Math.min(ascendingResults.length, descendingResults.length) ? 'YES ✅' : 'NO ❌'}`);

if (commonNumbers.length > 0) {
  console.log('\nCommon numbers (first 5):');
  commonNumbers.slice(0, 5).forEach(num => console.log(`  ${num}`));
}

console.log('\nTest completed!');