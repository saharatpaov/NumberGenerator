// Performance benchmark script for Pattern Number Generator
// Requirements: 8.1, 8.2, 8.3, 8.4

// Load the application code
const fs = require('fs');
const path = require('path');

// Read and evaluate the app.js file in a controlled environment
const appCode = fs.readFileSync('app.js', 'utf8');

// Create a minimal DOM-like environment for the classes
global.document = {
    createElement: () => ({ style: {}, appendChild: () => {}, textContent: '' }),
    getElementById: () => ({ innerHTML: '', appendChild: () => {} }),
    addEventListener: () => {}
};
global.window = { URL: { createObjectURL: () => 'blob:url' } };
global.Blob = class Blob { constructor() {} };

// Evaluate the app code to get the classes
eval(appCode);

// Initialize components
const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();
const generator = new PatternGenerator();
const csvExporter = new CSVExporter();

// Test patterns for benchmarking
const testPatterns = {
    soloist: ['aaaaaaaaaa', 'abbbbbbbb', 'andddddddd'],
    hyphenSeparated: ['aaabbbcccc', 'bbbtnxbbbb'],
    fullStraight: ['abcdefghij', 'jihgfedcba'],
    cyclicStraight: ['zabcdefghi', 'ihgfedcbaz'],
    rhythmicBridge: ['abcaxxabcd']
};

function formatTime(ms) {
    return ms.toFixed(2) + 'ms';
}

function benchmark1_PatternIdentification() {
    console.log('\n=== Benchmark 1: Pattern Type Identification (≤50ms) ===');
    
    const allPatterns = Object.values(testPatterns).flat();
    const times = [];
    let failures = 0;
    
    // Warm up
    for (let i = 0; i < 10; i++) {
        analyzer.identifyPatternType(allPatterns[0]);
    }
    
    // Benchmark each pattern
    allPatterns.forEach(pattern => {
        const start = process.hrtime.bigint();
        const patternType = analyzer.identifyPatternType(pattern);
        const end = process.hrtime.bigint();
        const time = Number(end - start) / 1000000; // Convert to milliseconds
        times.push(time);
        
        const status = time <= 50 ? '✓' : '✗';
        if (time > 50) failures++;
        
        console.log(`Pattern "${pattern}" → ${patternType}: ${formatTime(time)} ${status}`);
    });
    
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);
    
    console.log(`\nStats:`);
    console.log(`Average: ${formatTime(avgTime)}`);
    console.log(`Min: ${formatTime(minTime)}`);
    console.log(`Max: ${formatTime(maxTime)}`);
    console.log(`Requirement: ≤50ms`);
    console.log(`Result: ${maxTime <= 50 ? 'PASS' : 'FAIL'} (${failures} failures)`);
    
    return { pass: maxTime <= 50, maxTime, avgTime, failures };
}

function benchmark2_SinglePatternGeneration() {
    console.log('\n=== Benchmark 2: Single Pattern Generation (≤500ms for ≤1000 numbers) ===');
    
    const allPatterns = Object.values(testPatterns).flat();
    const times = [];
    let failures = 0;
    
    allPatterns.forEach(pattern => {
        const patternType = analyzer.identifyPatternType(pattern);
        
        const start = process.hrtime.bigint();
        const numbers = generator.generate(pattern, patternType);
        const end = process.hrtime.bigint();
        const time = Number(end - start) / 1000000; // Convert to milliseconds
        times.push(time);
        
        const status = (time <= 500 && numbers.length <= 1000) ? '✓' : '✗';
        if (time > 500 || numbers.length > 1000) failures++;
        
        console.log(`Pattern "${pattern}" (${numbers.length} numbers): ${formatTime(time)} ${status}`);
    });
    
    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);
    
    console.log(`\nStats:`);
    console.log(`Average: ${formatTime(avgTime)}`);
    console.log(`Max: ${formatTime(maxTime)}`);
    console.log(`Requirement: ≤500ms for ≤1000 numbers`);
    console.log(`Result: ${maxTime <= 500 ? 'PASS' : 'FAIL'} (${failures} failures)`);
    
    return { pass: maxTime <= 500, maxTime, avgTime, failures };
}

function benchmark3_MultiplePatterns() {
    console.log('\n=== Benchmark 3: Multiple Patterns Processing (≤2s for 10 patterns) ===');
    
    // Select 10 patterns for testing
    const tenPatterns = [
        'aaaaaaaaaa', 'abbbbbbbb', 'andddddddd',
        'aaabbbcccc', 'bbbtnxbbbb',
        'abcdefghij', 'jihgfedcba',
        'zabcdefghi', 'ihgfedcbaz',
        'abcaxxabcd'
    ];
    
    const start = process.hrtime.bigint();
    
    const results = [];
    tenPatterns.forEach(pattern => {
        const patternType = analyzer.identifyPatternType(pattern);
        const numbers = generator.generate(pattern, patternType);
        results.push({ pattern, patternType, numbers });
    });
    
    const end = process.hrtime.bigint();
    const totalTime = Number(end - start) / 1000000; // Convert to milliseconds
    
    const totalNumbers = results.reduce((sum, result) => sum + result.numbers.length, 0);
    
    const status = totalTime <= 2000 ? '✓' : '✗';
    console.log(`Processed ${tenPatterns.length} patterns (${totalNumbers} total numbers): ${formatTime(totalTime)} ${status}`);
    
    console.log(`\nStats:`);
    console.log(`Total time: ${formatTime(totalTime)}`);
    console.log(`Average per pattern: ${formatTime(totalTime / tenPatterns.length)}`);
    console.log(`Total numbers generated: ${totalNumbers}`);
    console.log(`Requirement: ≤2000ms for 10 patterns`);
    console.log(`Result: ${totalTime <= 2000 ? 'PASS' : 'FAIL'}`);
    
    return { pass: totalTime <= 2000, totalTime, avgTime: totalTime / tenPatterns.length, totalNumbers };
}

function benchmark4_CSVExport() {
    console.log('\n=== Benchmark 4: CSV Export (≤1s for ≤10000 numbers) ===');
    
    // Generate data with ~10000 numbers using rhythmic bridge pattern
    const pattern = 'abcaxxabcd';
    const patternType = analyzer.identifyPatternType(pattern);
    const numbers = generator.generate(pattern, patternType);
    
    const largeDataset = [{
        pattern: pattern,
        patternType: patternType,
        numbers: numbers
    }];
    
    const totalNumbers = numbers.length;
    
    const start = process.hrtime.bigint();
    const csvContent = csvExporter.generateCSV(largeDataset);
    const end = process.hrtime.bigint();
    const time = Number(end - start) / 1000000; // Convert to milliseconds
    
    const status = (time <= 1000 && totalNumbers >= 9000) ? '✓' : '✗';
    console.log(`CSV export of ${totalNumbers} numbers: ${formatTime(time)} ${status}`);
    
    console.log(`\nStats:`);
    console.log(`Export time: ${formatTime(time)}`);
    console.log(`Numbers exported: ${totalNumbers}`);
    console.log(`CSV size: ${(csvContent.length / 1024).toFixed(2)} KB`);
    console.log(`Requirement: ≤1000ms for ≤10000 numbers`);
    console.log(`Result: ${time <= 1000 ? 'PASS' : 'FAIL'}`);
    
    return { pass: time <= 1000, time, totalNumbers, csvSize: csvContent.length };
}

function runAllBenchmarks() {
    console.log('🚀 Running Performance Benchmarks for Pattern Number Generator');
    console.log('Requirements: 8.1, 8.2, 8.3, 8.4');
    
    const results = {
        identification: benchmark1_PatternIdentification(),
        singlePattern: benchmark2_SinglePatternGeneration(),
        multiplePatterns: benchmark3_MultiplePatterns(),
        csvExport: benchmark4_CSVExport()
    };
    
    console.log('\n=== OVERALL RESULTS ===');
    const allPassed = Object.values(results).every(r => r.pass);
    
    console.log(`Benchmark 1 (Pattern Identification): ${results.identification.pass ? 'PASS' : 'FAIL'}`);
    console.log(`Benchmark 2 (Single Pattern Generation): ${results.singlePattern.pass ? 'PASS' : 'FAIL'}`);
    console.log(`Benchmark 3 (Multiple Patterns): ${results.multiplePatterns.pass ? 'PASS' : 'FAIL'}`);
    console.log(`Benchmark 4 (CSV Export): ${results.csvExport.pass ? 'PASS' : 'FAIL'}`);
    
    console.log(`\n🎯 OVERALL: ${allPassed ? 'ALL BENCHMARKS PASS' : 'SOME BENCHMARKS FAIL'}`);
    
    if (!allPassed) {
        console.log('\n⚠️  OPTIMIZATION NEEDED:');
        if (!results.identification.pass) {
            console.log(`- Pattern identification too slow (max: ${formatTime(results.identification.maxTime)}, required: ≤50ms)`);
        }
        if (!results.singlePattern.pass) {
            console.log(`- Single pattern generation too slow (max: ${formatTime(results.singlePattern.maxTime)}, required: ≤500ms)`);
        }
        if (!results.multiplePatterns.pass) {
            console.log(`- Multiple patterns processing too slow (${formatTime(results.multiplePatterns.totalTime)}, required: ≤2000ms)`);
        }
        if (!results.csvExport.pass) {
            console.log(`- CSV export too slow (${formatTime(results.csvExport.time)}, required: ≤1000ms)`);
        }
    }
    
    return results;
}

// Run the benchmarks
if (require.main === module) {
    runAllBenchmarks();
}

module.exports = { runAllBenchmarks };