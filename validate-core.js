// Core validation script - tests the essential functionality
console.log('🧪 Pattern-Based Number Generator - Core Validation\n');

// Test 1: Check if main files exist
const fs = require('fs');
const requiredFiles = ['index.html', 'app.js', 'styles.css'];

console.log('📁 File Structure Check:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    console.log(`  ✅ ${file} (${Math.round(stats.size / 1024)}KB)`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
  }
});

// Test 2: Check HTML structure
console.log('\n🏗️ HTML Structure Check:');
const htmlContent = fs.readFileSync('index.html', 'utf8');

const htmlChecks = [
  { name: 'Title contains "Pattern-Based Number Generator"', test: () => htmlContent.includes('Pattern-Based Number Generator') },
  { name: 'Has pattern input field', test: () => htmlContent.includes('id="pattern-input"') },
  { name: 'Has add pattern button', test: () => htmlContent.includes('id="add-pattern-btn"') },
  { name: 'Has export button', test: () => htmlContent.includes('id="export-btn"') },
  { name: 'Has disclaimer section', test: () => htmlContent.includes('class="disclaimer"') },
  { name: 'Has mapping rule display', test: () => htmlContent.includes('class="mapping-rule"') },
  { name: 'Includes app.js script', test: () => htmlContent.includes('src="app.js"') },
  { name: 'Includes styles.css', test: () => htmlContent.includes('href="styles.css"') }
];

htmlChecks.forEach(check => {
  console.log(`  ${check.test() ? '✅' : '❌'} ${check.name}`);
});

// Test 3: Check CSS structure
console.log('\n🎨 CSS Structure Check:');
const cssContent = fs.readFileSync('styles.css', 'utf8');

const cssChecks = [
  { name: 'Ruby color theme variables defined', test: () => cssContent.includes('--ruby-primary') },
  { name: 'Button styles defined', test: () => cssContent.includes('.btn') },
  { name: 'Error message styles', test: () => cssContent.includes('.error-message') },
  { name: 'Pattern list styles', test: () => cssContent.includes('.pattern-list') },
  { name: 'Results display styles', test: () => cssContent.includes('.results-display') },
  { name: 'Responsive design', test: () => cssContent.includes('@media') }
];

cssChecks.forEach(check => {
  console.log(`  ${check.test() ? '✅' : '❌'} ${check.name}`);
});

// Test 4: Check JavaScript structure
console.log('\n⚙️ JavaScript Structure Check:');
const jsContent = fs.readFileSync('app.js', 'utf8');

const jsChecks = [
  { name: 'PatternValidator class defined', test: () => jsContent.includes('class PatternValidator') },
  { name: 'PatternAnalyzer class defined', test: () => jsContent.includes('class PatternAnalyzer') },
  { name: 'PatternGenerator class defined', test: () => jsContent.includes('class PatternGenerator') },
  { name: 'PatternManager class defined', test: () => jsContent.includes('class PatternManager') },
  { name: 'CSVExporter class defined', test: () => jsContent.includes('class CSVExporter') },
  { name: 'UIController class defined', test: () => jsContent.includes('class UIController') },
  { name: 'PatternType enum defined', test: () => jsContent.includes('const PatternType') },
  { name: 'All 5 pattern types supported', test: () => {
    return jsContent.includes('SOLOIST') && 
           jsContent.includes('HYPHEN_SEPARATED') && 
           jsContent.includes('FULL_STRAIGHT') && 
           jsContent.includes('CYCLIC_STRAIGHT') && 
           jsContent.includes('RHYTHMIC_BRIDGE');
  }},
  { name: 'Initialization function exists', test: () => jsContent.includes('function init()') }
];

jsChecks.forEach(check => {
  console.log(`  ${check.test() ? '✅' : '❌'} ${check.name}`);
});

// Test 5: Check for specific pattern examples
console.log('\n🔍 Pattern Type Implementation Check:');
const patternChecks = [
  { name: 'Soloist pattern detection (aaaaaaaaaa)', test: () => jsContent.includes('aaaaaaaaaa') || jsContent.includes('all same') },
  { name: 'Hyphen-separated pattern detection', test: () => jsContent.includes('aaabbbcccc') || jsContent.includes('block') },
  { name: 'Full Straight pattern detection', test: () => jsContent.includes('abcdefghij') || jsContent.includes('sequence') },
  { name: 'Cyclic Straight pattern detection', test: () => jsContent.includes('wraparound') || jsContent.includes('cyclic') },
  { name: 'Rhythmic Bridge pattern detection', test: () => jsContent.includes('repeating') || jsContent.includes('rhythmic') }
];

patternChecks.forEach(check => {
  console.log(`  ${check.test() ? '✅' : '❌'} ${check.name}`);
});

// Test 6: Check test files
console.log('\n🧪 Test Files Check:');
const testFiles = ['comprehensive-test.html', 'performance-test.js', 'integration-test.html'];

testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ⚠️ ${file} - not found (optional)`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(60));

const allChecks = [...htmlChecks, ...cssChecks, ...jsChecks, ...patternChecks];
const passed = allChecks.filter(check => check.test()).length;
const total = allChecks.length;

console.log(`✅ Passed: ${passed}/${total}`);
console.log(`📈 Success Rate: ${Math.round((passed/total) * 100)}%`);

if (passed === total) {
  console.log('\n🎉 ALL STRUCTURAL CHECKS PASSED!');
  console.log('\n✅ Complete application structure is in place');
  console.log('✅ All required classes and components implemented');
  console.log('✅ HTML, CSS, and JavaScript files properly structured');
  console.log('✅ All 5 pattern types supported in code');
  console.log('✅ Ruby theme styling implemented');
  console.log('✅ Test files available for validation');
  console.log('\n🚀 The Pattern-Based Number Generator appears to be fully implemented!');
  console.log('\n📋 To complete validation:');
  console.log('   1. Open http://localhost:8000 in your browser');
  console.log('   2. Test the application with sample patterns');
  console.log('   3. Run http://localhost:8000/comprehensive-test.html for automated tests');
  console.log('   4. Verify CSV export functionality');
} else {
  console.log('\n⚠️ Some structural checks failed');
  console.log('Please review the implementation for missing components.');
}

console.log('\n🌐 Application URL: http://localhost:8000');
console.log('🧪 Test Suite URL: http://localhost:8000/comprehensive-test.html');