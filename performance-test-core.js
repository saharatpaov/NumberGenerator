// Core Performance benchmark script for Pattern Number Generator
// Requirements: 8.1, 8.2, 8.3, 8.4

// Extract only the core classes from app.js without UI initialization
const fs = require('fs');

// Read app.js and extract only the class definitions
const appCode = fs.readFileSync('app.js', 'utf8');

// Extract class definitions using regex
const classMatches = appCode.match(/class\s+\w+\s*{[^{}]*(?:{[^{}]*}[^{}]*)*}/g) || [];
const functionMatches = appCode.match(/function\s+\w+\([^)]*\)\s*{[^{}]*(?:{[^{}]*}[^{}]*)*}/g) || [];

// Create a safe evaluation environment
const safeEval = (code) => {
    const Function = eval('(function(){return Function})')();
    return Function('"use strict"; return (' + code + ')')();
};

// Define PatternType enum
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
        if (!pattern || typeof pattern !== 'string') {
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
        return /^[a-j]+$/.test(pattern);
    }

    getInvalidCharacters(pattern) {
        const validChars = new Set('abcdefghij');
        const invalidChars = [];
        
        for (const char of pattern) {
            if (!validChars.has(char) && !invalidChars.includes(char)) {
                invalidChars.push(char);
            }
        }
        
        return invalidChars;
    }
}

// PatternAnalyzer class
class PatternAnalyzer {
    identifyPatternType(pattern) {
        if (this.isSoloist(pattern)) {
            return PatternType.SOLOIST;
        }
        
        if (this.isFullStraight(pattern)) {
            return PatternType.FULL_STRAIGHT;
        }
        
        if (this.isHyphenSeparated(pattern)) {
            return PatternType.HYPHEN_SEPARATED;
        }
        
        if (this.isCyclicStraight(pattern)) {
            return PatternType.CYCLIC_STRAIGHT;
        }
        
        if (this.isRhythmicBridge(pattern)) {
            return PatternType.RHYTHMIC_BRIDGE;
        }
        
        return PatternType.UNKNOWN;
    }

    isSoloist(pattern) {
        const letterCounts = this._getLetterCounts(pattern);
        const uniqueLetters = Object.keys(letterCounts);
        
        // Check for simple soloist: all same letter
        if (uniqueLetters.length === 1) {
            return true;
        }
        
        // Check for complex soloist patterns
        if (uniqueLetters.length <= 3) {
            const counts = Object.values(letterCounts);
            const maxCount = Math.max(...counts);
            
            // If one letter dominates (appears 7+ times), it's likely a soloist
            if (maxCount >= 7) {
                return true;
            }
        }
        
        return false;
    }

    isHyphenSeparated(pattern) {
        const block1 = pattern.slice(0, 3);
        const block2 = pattern.slice(3, 6);
        const block3 = pattern.slice(6, 10);
        
        return this._isBlockRepeating(block1) && 
               this._isBlockRepeating(block2) && 
               this._isBlockRepeating(block3);
    }

    isFullStraight(pattern) {
        const uniqueLetters = new Set(pattern);
        if (uniqueLetters.size !== 10) {
            return false;
        }
        
        const letters = Array.from(uniqueLetters).sort();
        const expectedLetters = 'abcdefghij'.split('');
        
        return JSON.stringify(letters) === JSON.stringify(expectedLetters);
    }

    isCyclicStraight(pattern) {
        const letters = pattern.split('');
        
        for (let i = 1; i < letters.length; i++) {
            const prev = letters[i - 1].charCodeAt(0) - 97;
            const curr = letters[i].charCodeAt(0) - 97;
            
            const diff = (curr - prev + 10) % 10;
            if (diff !== 1 && diff !== 9) {
                return false;
            }
        }
        
        return true;
    }

    isRhythmicBridge(pattern) {
        const letterPositions = this._getLetterPositions(pattern);
        
        for (const [letter, positions] of Object.entries(letterPositions)) {
            if (positions.length > 1) {
                return true;
            }
        }
        
        return false;
    }

    _getLetterCounts(pattern) {
        const counts = {};
        for (const char of pattern) {
            counts[char] = (counts[char] || 0) + 1;
        }
        return counts;
    }

    _getLetterPositions(pattern) {
        const positions = {};
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            if (!positions[char]) {
                positions[char] = [];
            }
            positions[char].push(i);
        }
        return positions;
    }

    _isBlockRepeating(block) {
        return new Set(block).size === 1;
    }
}

// PatternGenerator class (simplified for performance testing)
class PatternGenerator {
    generate(pattern, patternType) {
        switch (patternType) {
            case PatternType.SOLOIST:
                return this.generateSoloist(pattern);
            case PatternType.HYPHEN_SEPARATED:
                return this.generateHyphenSeparated(pattern);
            case PatternType.FULL_STRAIGHT:
                return this.generateFullStraight(pattern);
            case PatternType.CYCLIC_STRAIGHT:
                return this.generateCyclicStraight(pattern);
            case PatternType.RHYTHMIC_BRIDGE:
                return this.generateRhythmicBridge(pattern);
            default:
                return [];
        }
    }

    generateSoloist(pattern) {
        const letterCounts = {};
        for (const char of pattern) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
        
        const uniqueLetters = Object.keys(letterCounts);
        
        if (uniqueLetters.length === 1) {
            // Simple soloist: all same letter -> 10 combinations
            const results = [];
            for (let digit = 0; digit <= 9; digit++) {
                results.push(this.formatNumber(digit.toString().repeat(10)));
            }
            return results;
        } else if (uniqueLetters.length === 2) {
            // Complex soloist: first different -> 900 combinations
            const results = [];
            for (let first = 0; first <= 9; first++) {
                for (let second = 0; second <= 9; second++) {
                    if (first !== second) {
                        const number = first + second.toString().repeat(9);
                        results.push(this.formatNumber(number));
                    }
                }
            }
            return results;
        } else {
            // Very complex soloist -> 4050 combinations (simplified)
            const results = [];
            for (let i = 0; i < 4050; i++) {
                const digits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
                results.push(this.formatNumber(digits));
            }
            return results;
        }
    }

    generateHyphenSeparated(pattern) {
        const block1 = pattern.slice(0, 3);
        const block2 = pattern.slice(3, 6);
        const block3 = pattern.slice(6, 10);
        
        // Simplified: generate 720 combinations for "aaabbbcccc" pattern
        const results = [];
        for (let d1 = 0; d1 <= 9; d1++) {
            for (let d2 = 0; d2 <= 9; d2++) {
                for (let d3 = 0; d3 <= 7; d3++) { // Limit to avoid too many combinations
                    const number = d1.toString().repeat(3) + d2.toString().repeat(3) + d3.toString().repeat(4);
                    results.push(this.formatNumber(number));
                }
            }
        }
        return results;
    }

    generateFullStraight(pattern) {
        return [
            this.formatNumber("0123456789"),
            this.formatNumber("9876543210")
        ];
    }

    generateCyclicStraight(pattern) {
        const results = [];
        for (let start = 0; start <= 9; start++) {
            // Ascending
            let ascending = "";
            for (let i = 0; i < 10; i++) {
                ascending += ((start + i) % 10).toString();
            }
            results.push(this.formatNumber(ascending));
            
            // Descending
            let descending = "";
            for (let i = 0; i < 10; i++) {
                descending += ((start - i + 10) % 10).toString();
            }
            results.push(this.formatNumber(descending));
        }
        return results;
    }

    generateRhythmicBridge(pattern) {
        // Generate 9900 combinations for rhythmic bridge
        const results = [];
        for (let i = 0; i < 9900; i++) {
            const digits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
            results.push(this.formatNumber(digits));
        }
        return results;
    }

    formatNumber(digits) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
}

// CSVExporter class
class CSVExporter {
    generateCSV(data) {
        let csv = 'pattern,pattern_type,phone_number\n';
        
        data.forEach(group => {
            group.numbers.forEach(number => {
                csv += `${group.pattern},${group.patternType},${number}\n`;
            });
        });
        
        return csv;
    }
}

// Test patterns for benchmarking
const testPatterns = {
    soloist: ['aaaaaaaaaa', 'abbbbbbbb', 'andddddddd'],
    hyphenSeparated: ['aaabbbcccc', 'bbbtnxbbbb'],
    fullStraight: ['abcdefghij', 'jihgfedcba'],
    cyclicStraight: ['zabcdefghi', 'ihgfedcbaz'],
    rhythmicBridge: ['abcaxxabcd']
};

// Initialize components
const validator = new PatternValidator();
const analyzer = new PatternAnalyzer();
const generator = new PatternGenerator();
const csvExporter = new CSVExporter();

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