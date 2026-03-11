# Design Document: Pattern-Based Number Generator

## Overview

The Pattern-Based Number Generator is a client-side web application that analyzes 10-character patterns (using letters a-j) to identify their pattern type, then generates ALL possible phone numbers according to the specific rules of that pattern type. The application provides a simple, intuitive interface with a Ruby color theme (red/pink tones) that allows users to:

1. Input one or more 10-character patterns (a-j only)
2. Automatically identify the pattern type from 5 supported types using PatternAnalyzer
3. Generate ALL possible phone numbers based on pattern type-specific rules
4. View all results in 000-000-0000 format with pattern type identification
5. Export all results to CSV format including pattern type

The application supports 5 distinct pattern types based on the user's image examples:

## Pattern Type System

### 1. The Soloist
All digits have a repeating pattern, rest are identical:
- "aaa-aaa-aaaa" → "888-888-8888" (10 combinations - all same digit)
- "abb-bbb-bbbb" → "788-888-8888" (900 combinations - first digit differs from repeated)
- "and-ddd-dddd" → "728-888-8888" (4,050 combinations - complex pattern)

### 2. Hyphen-separated  
Each block contains a single repeated digit:
- "aaa-bbb-cccc" → "111-222-3333" (720 combinations)
- "bbb-tnx-bbbb" → "111-638-1111" (90 combinations)

### 3. The Full Straight
All 10 digits move in ascending/descending line:
- "abc-def-ghij" → "987-654-3210" (2 combinations)
- "jih-gfe-dcba" → "123-456-7890"

### 4. Cyclic Straight
Each digit increases/decreases by 1, wraps around 9 and 0:
- "zab-cde-fghi" → "098-765-4321" (20 combinations)
- "ihg-fed-cbaz" → "098-765-4321"

### 5. The Rhythmic Bridge
Repeating pattern across 2-3 blocks:
- "abc-axx-abcd" → "123-123-1234" (9,900 combinations)

## Key Design Decisions

- **Client-side only**: No server required, all processing in browser for speed and privacy
- **Pattern type analysis**: PatternAnalyzer component automatically identifies pattern type from structure
- **Type-specific generation**: Each pattern type has unique generation algorithms in PatternGenerator
- **Exact combination matching**: Generate the exact number of combinations shown in examples
- **Batch processing**: Support multiple patterns simultaneously with independent type analysis
- **Responsive design**: Works on desktop and mobile devices
- **Ruby theme**: Red/pink color palette for visual appeal with WCAG AA contrast compliance
## Architecture

### System Architecture

The application follows a simple Model-View-Controller (MVC) pattern implemented entirely in the browser:

```
┌─────────────────────────────────────────────────────────┐
│                     Browser (Client)                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │              User Interface (View)                  │ │
│  │  - Pattern input field                             │ │
│  │  - Pattern list display                            │ │
│  │  - Pattern type display                            │ │
│  │  - All results display (multiple numbers)          │ │
│  │  - Export button                                   │ │
│  │  - Disclaimer display                              │ │
│  └────────────────┬───────────────────────────────────┘ │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────────┐ │
│  │           Controller (Event Handlers)              │ │
│  │  - Input validation (a-j only, 10 chars)           │ │
│  │  - Pattern management (add/remove)                 │ │
│  │  - Generation coordination                         │ │
│  │  - Export coordination                             │ │
│  └────────────────┬───────────────────────────────────┘ │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────────┐ │
│  │              Model (Business Logic)                │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  PatternValidator                            │ │ │
│  │  │  - Length validation (exactly 10)            │ │ │
│  │  │  - Character validation (a-j only)           │ │ │
│  │  │  - Error message generation                  │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  PatternAnalyzer                             │ │ │
│  │  │  - Identify pattern type from structure      │ │ │
│  │  │  - Detect The Soloist (various patterns)     │ │ │
│  │  │  - Detect Hyphen-separated (blocks)          │ │ │
│  │  │  - Detect The Full Straight (10 unique)      │ │ │
│  │  │  - Detect Cyclic Straight (wraparound)       │ │ │
│  │  │  - Detect The Rhythmic Bridge (repeating)    │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  PatternGenerator                            │ │ │
│  │  │  - Generate numbers by pattern type          │ │ │
│  │  │  - Type-specific generation algorithms:      │ │ │
│  │  │    * Soloist: 10/900/4050 combinations       │ │ │
│  │  │    * Hyphen-separated: 720/90 combinations   │ │ │
│  │  │    * Full Straight: 2 combinations           │ │ │
│  │  │    * Cyclic Straight: 20 combinations        │ │ │
│  │  │    * Rhythmic Bridge: 9900 combinations      │ │ │
│  │  │  - Number formatting (000-000-0000)          │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────┐ │ │
│  │  │  CSVExporter                                 │ │ │
│  │  │  - CSV generation (pattern, type, number)    │ │ │
│  │  │  - UTF-8 encoding                            │ │ │
│  │  │  - File download                             │ │ │
│  │  └──────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with Ruby color theme, flexbox/grid for layout
- **Vanilla JavaScript (ES6+)**: No framework dependencies for simplicity
- **Web APIs**: Blob API for CSV generation, URL.createObjectURL for downloads
## Components and Interfaces

### 1. PatternValidator

Validates user input patterns according to requirements (a-j only, 10 characters).

```javascript
class PatternValidator {
  /**
   * Validates a pattern string
   * @param {string} pattern - The pattern to validate
   * @returns {ValidationResult} Object with isValid flag and error message
   */
  validate(pattern)
  
  /**
   * Checks if pattern length is exactly 10 characters
   * @param {string} pattern
   * @returns {boolean}
   */
  isValidLength(pattern)
  
  /**
   * Checks if pattern contains only lowercase a-j
   * @param {string} pattern
   * @returns {boolean}
   */
  hasValidCharacters(pattern)
  
  /**
   * Returns list of invalid characters in pattern
   * @param {string} pattern
   * @returns {string[]}
   */
  getInvalidCharacters(pattern)
}
```

### 2. PatternAnalyzer

Analyzes pattern structure to identify which of the 5 pattern types it matches based on the examples from the user's image.

```javascript
class PatternAnalyzer {
  /**
   * Identifies the pattern type from pattern structure
   * @param {string} pattern - Valid 10-character pattern (a-j)
   * @returns {PatternType} One of: SOLOIST, HYPHEN_SEPARATED, FULL_STRAIGHT, CYCLIC_STRAIGHT, RHYTHMIC_BRIDGE
   * @throws {Error} If pattern doesn't match any known type
   */
  identifyPatternType(pattern)
  
  /**
   * Checks if pattern is The Soloist (various repeating patterns)
   * Examples: "aaaaaaaaaa" (10 combos), "abbbbbbbb" (900 combos), "andddddddd" (4050 combos)
   * @param {string} pattern
   * @returns {boolean}
   */
  isSoloist(pattern)
  
  /**
   * Checks if pattern is Hyphen-separated (each block has repeated digits)
   * Examples: "aaabbbcccc" (720 combos), "bbbtnxbbbb" (90 combos)
   * @param {string} pattern
   * @returns {boolean}
   */
  isHyphenSeparated(pattern)
  
  /**
   * Checks if pattern is The Full Straight (all 10 digits in sequence)
   * Examples: "abcdefghij" → ascending/descending (2 combos)
   * @param {string} pattern
   * @returns {boolean}
   */
  isFullStraight(pattern)
  
  /**
   * Checks if pattern is Cyclic Straight (digits cycle with wraparound)
   * Examples: "zabcdefghi" → cyclic progression (20 combos)
   * @param {string} pattern
   * @returns {boolean}
   */
  isCyclicStraight(pattern)
  
  /**
   * Checks if pattern is The Rhythmic Bridge (repeating across blocks)
   * Examples: "abcaxxabcd" → repeating pattern (9900 combos)
   * @param {string} pattern
   * @returns {boolean}
   */
  isRhythmicBridge(pattern)
  
  /**
   * Analyzes Soloist pattern structure to determine combination count
   * @param {string} pattern
   * @returns {SoloistStructure} Structure describing the pattern
   */
  analyzeSoloistStructure(pattern)
  
  /**
   * Analyzes Rhythmic Bridge pattern structure
   * @param {string} pattern
   * @returns {RhythmicStructure} Structure describing the repeating pattern
   */
  analyzeRhythmicStructure(pattern)
}
```
### 3. PatternGenerator

Generates phone numbers based on the identified pattern type using type-specific algorithms that match the exact combination counts from the user's image.

```javascript
class PatternGenerator {
  /**
   * Generates all phone numbers for a pattern based on its type
   * @param {string} pattern - Valid 10-character pattern
   * @param {PatternType} patternType - Identified pattern type
   * @returns {string[]} Array of formatted numbers in 000-000-0000 format
   */
  generate(pattern, patternType)
  
  /**
   * Generates numbers for The Soloist pattern
   * Examples:
   * - "aaaaaaaaaa" → 10 numbers (all same digit)
   * - "abbbbbbbb" → 900 numbers (first digit differs)
   * - "andddddddd" → 4,050 numbers (complex pattern)
   * @param {string} pattern
   * @param {SoloistStructure} structure
   * @returns {string[]} Variable number based on pattern structure
   */
  generateSoloist(pattern, structure)
  
  /**
   * Generates numbers for Hyphen-separated pattern
   * Examples:
   * - "aaabbbcccc" → 720 numbers (3 different blocks)
   * - "bbbtnxbbbb" → 90 numbers (specific pattern)
   * @param {string} pattern
   * @returns {string[]} Variable number based on pattern structure
   */
  generateHyphenSeparated(pattern)
  
  /**
   * Generates numbers for The Full Straight pattern
   * Rule: All 10 digits in sequence, ascending or descending
   * @param {string} pattern - e.g., "abcdefghij"
   * @returns {string[]} 2 numbers: ascending and descending sequences
   */
  generateFullStraight(pattern)
  
  /**
   * Generates numbers for Cyclic Straight pattern
   * Rule: Each digit increases/decreases by 1 with wraparound 9→0 or 0→9
   * @param {string} pattern - e.g., "zabcdefghi"
   * @returns {string[]} 20 numbers with cyclic progression
   */
  generateCyclicStraight(pattern)
  
  /**
   * Generates numbers for The Rhythmic Bridge pattern
   * Example: "abcaxxabcd" → 9,900 numbers with repeating pattern
   * @param {string} pattern
   * @param {RhythmicStructure} structure - Repeating pattern structure
   * @returns {string[]} Variable number based on structure
   */
  generateRhythmicBridge(pattern, structure)
  
  /**
   * Formats a 10-digit string with dashes
   * @param {string} digits - 10-digit string
   * @returns {string} Formatted as 000-000-0000
   */
  formatNumber(digits)
  
  /**
   * Calculates expected number of combinations for a pattern type
   * @param {string} pattern
   * @param {PatternType} patternType
   * @returns {number} Expected combination count
   */
  calculateCombinationCount(pattern, patternType)
}
```

### 4. CSVExporter

Generates and downloads CSV files containing all generated numbers with pattern type information.

```javascript
class CSVExporter {
  /**
   * Exports all pattern-number combinations to CSV file
   * Format: pattern, pattern_type, phone_number (one row per number)
   * @param {Array<{pattern: string, patternType: string, numbers: string[]}>} data
   * @returns {void} Triggers browser download
   */
  export(data)
  
  /**
   * Generates CSV content from data (one row per number)
   * @param {Array<{pattern: string, patternType: string, numbers: string[]}>} data
   * @returns {string} CSV formatted string with UTF-8 encoding
   */
  generateCSV(data)
  
  /**
   * Creates and triggers file download
   * @param {string} content - CSV content
   * @param {string} filename - Name for downloaded file
   */
  downloadFile(content, filename)
  
  /**
   * Escapes special characters for CSV format
   * @param {string} value - Value to escape
   * @returns {string} Escaped value
   */
  escapeCSVValue(value)
}
```
### 5. PatternManager

Manages the collection of patterns, their types, and generated numbers.

```javascript
class PatternManager {
  /**
   * Adds a pattern to the collection
   * @param {string} pattern - Valid pattern to add
   * @returns {boolean} Success status
   */
  addPattern(pattern)
  
  /**
   * Removes a pattern from the collection
   * @param {number} index - Index of pattern to remove
   */
  removePattern(index)
  
  /**
   * Gets all patterns with their types and generated numbers
   * @returns {Array<{pattern: string, patternType: string, numbers: string[]}>}
   */
  getAllPatternGroups()
  
  /**
   * Clears all patterns
   */
  clearAll()
  
  /**
   * Gets count of patterns
   * @returns {number}
   */
  getCount()
  
  /**
   * Gets total count of all generated numbers
   * @returns {number}
   */
  getTotalNumberCount()
}
```

### 6. UIController

Manages user interface interactions and updates.

```javascript
class UIController {
  /**
   * Initializes the UI and event listeners
   */
  init()
  
  /**
   * Displays validation error message
   * @param {string} message - Error message to display
   */
  showError(message)
  
  /**
   * Clears error message
   */
  clearError()
  
  /**
   * Updates the pattern list display with types and all generated numbers
   * @param {Array<{pattern: string, patternType: string, numbers: string[]}>} patternGroups
   */
  updatePatternList(patternGroups)
  
  /**
   * Shows/hides export button based on data availability
   * @param {boolean} hasData
   */
  toggleExportButton(hasData)
  
  /**
   * Displays the identified pattern type for a pattern
   * @param {string} pattern
   * @param {string} patternType
   */
  displayPatternType(pattern, patternType)
  
  /**
   * Displays count of generated numbers for each pattern
   * @param {string} pattern
   * @param {number} count
   */
  displayNumberCount(pattern, count)
}
```
## Data Models

### Pattern

Represents a user-entered pattern string.

```javascript
{
  value: string,        // The 10-character pattern (lowercase a-j)
  isValid: boolean,     // Validation status
  errorMessage: string  // Error message if invalid
}
```

### PatternType

Enumeration of supported pattern types with specific identification rules.

```javascript
const PatternType = {
  SOLOIST: 'The Soloist',              // Various repeating patterns (10/900/4050 combos)
  HYPHEN_SEPARATED: 'Hyphen-separated', // Each block has repeated digits (720/90 combos)
  FULL_STRAIGHT: 'The Full Straight',   // All 10 digits in sequence (2 combos)
  CYCLIC_STRAIGHT: 'Cyclic Straight',   // Digits cycle with wraparound (20 combos)
  RHYTHMIC_BRIDGE: 'The Rhythmic Bridge', // Repeating across blocks (9900 combos)
  UNKNOWN: 'Unknown'                    // Doesn't match any known type
}
```

### PatternNumberGroup

Represents a pattern, its identified type, and all its generated numbers.

```javascript
{
  pattern: string,        // Original pattern (10 characters, a-j)
  patternType: string,    // One of PatternType values (identified by PatternAnalyzer)
  numbers: string[],      // All generated formatted numbers (000-000-0000)
  count: number,          // Number of generated combinations
  timestamp: number       // Creation timestamp (for ordering)
}
```

### ValidationResult

Result of pattern validation.

```javascript
{
  isValid: boolean,           // Whether pattern is valid
  errorMessage: string,       // Error message if invalid
  invalidCharacters: string[] // List of invalid characters found
}
```

### SoloistStructure

Structure describing a Soloist pattern's specific type and expected combinations.

```javascript
{
  type: string,              // "all_same", "first_different", "complex"
  expectedCombinations: number, // 10, 900, or 4050
  repeatingLetter: string,   // The letter that repeats most
  uniquePositions: number[], // Positions with different letters
  patternStructure: string   // Description of the pattern
}
```

### RhythmicStructure

Structure describing a Rhythmic Bridge pattern's repeating sub-pattern.

```javascript
{
  letterPositions: Map<string, number[]>, // Map of letter to positions where it appears
  uniqueLetters: string[],                // Unique letters in the pattern
  repeatGroups: number[][],               // Groups of positions that must use same digit
  independentPositions: number[],         // Positions that can use any digit
  expectedCombinations: number            // Expected number of combinations
}
```

### CSVData

Structure for CSV export (flattened to one row per number).

```javascript
{
  headers: ['pattern', 'pattern_type', 'phone_number'],
  rows: [
    ['aaaaaaaaaa', 'The Soloist', '000-000-0000'],
    ['aaaaaaaaaa', 'The Soloist', '111-111-1111'],
    // ... 8 more rows for simple Soloist
    ['abbbbbbbb', 'The Soloist', '000-111-1111'],
    ['abbbbbbbb', 'The Soloist', '011-111-1111'],
    // ... 898 more rows for complex Soloist
    ['abcdefghij', 'The Full Straight', '012-345-6789'],
    ['abcdefghij', 'The Full Straight', '987-654-3210'],
    ['aaabbbcccc', 'Hyphen-separated', '000-111-2222'],
    // ... 719 more rows for Hyphen-separated
  ]
}
```
### PatternTypeRules

Documentation of rules for each pattern type based on the user's image examples.

```javascript
const PatternTypeRules = {
  SOLOIST: {
    description: 'All digits have a repeating pattern, rest are identical',
    examples: [
      { pattern: 'aaaaaaaaaa', result: '888-888-8888', combinations: 10 },
      { pattern: 'abbbbbbbb', result: '788-888-8888', combinations: 900 },
      { pattern: 'andddddddd', result: '728-888-8888', combinations: 4050 }
    ],
    rule: 'Various repeating patterns with different combination counts'
  },
  HYPHEN_SEPARATED: {
    description: 'Each block contains a single repeated digit',
    examples: [
      { pattern: 'aaabbbcccc', result: '111-222-3333', combinations: 720 },
      { pattern: 'bbbtnxbbbb', result: '111-638-1111', combinations: 90 }
    ],
    rule: 'Each hyphen-separated block has identical digits, blocks can differ'
  },
  FULL_STRAIGHT: {
    description: 'All 10 digits move in ascending/descending line',
    examples: [
      { pattern: 'abcdefghij', result: '987-654-3210', combinations: 2 },
      { pattern: 'jihgfedcba', result: '123-456-7890', combinations: 2 }
    ],
    rule: 'All 10 digits in sequence, ascending or descending'
  },
  CYCLIC_STRAIGHT: {
    description: 'Each digit increases/decreases by 1, wraps around 9 and 0',
    examples: [
      { pattern: 'zabcdefghi', result: '098-765-4321', combinations: 20 },
      { pattern: 'ihgfedcbaz', result: '098-765-4321', combinations: 20 }
    ],
    rule: '10 starting digits × 2 directions with wraparound'
  },
  RHYTHMIC_BRIDGE: {
    description: 'Repeating pattern across 2-3 blocks',
    examples: [
      { pattern: 'abcaxxabcd', result: '123-123-1234', combinations: 9900 }
    ],
    rule: 'Same digits in corresponding positions of repeating pattern'
  }
}
```

## Pattern Type Detection Logic

### Detection Priority Order

When a pattern could potentially match multiple types, the system uses this priority order:

1. **The Soloist** - Highest priority (most specific patterns)
2. **The Full Straight** - Second priority (all 10 unique letters in sequence)
3. **Hyphen-separated** - Third priority (block-based patterns)
4. **Cyclic Straight** - Fourth priority (cyclic progression)
5. **The Rhythmic Bridge** - Lowest priority (catch-all for repeating patterns)

### Specific Detection Rules

#### The Soloist Detection
- Pattern "aaaaaaaaaa": All same letter → 10 combinations
- Pattern "abbbbbbbb": First letter different, rest same → 900 combinations  
- Pattern "andddddddd": Complex pattern with multiple unique letters → 4,050 combinations
- Detection: Analyze letter frequency and position patterns

#### Hyphen-separated Detection
- Pattern "aaabbbcccc": Each block (positions 0-2, 3-5, 6-9) has one repeated letter
- Pattern "bbbtnxbbbb": Specific structure with repeated blocks
- Detection: Check if positions 0-2 same, 3-5 same, 6-9 same (with variations)

#### The Full Straight Detection
- Pattern "abcdefghij": All 10 unique letters a-j in alphabetical order
- Pattern "jihgfedcba": All 10 unique letters j-a in reverse alphabetical order
- Detection: Check if all 10 letters present and in consecutive order

#### Cyclic Straight Detection
- Pattern "zabcdefghi": Letters cycle with wraparound (z→a→b→c...)
- Detection: Check if each consecutive letter increases/decreases by 1 with j→a wraparound

#### The Rhythmic Bridge Detection
- Pattern "abcaxxabcd": Repeating sub-pattern "abc" appears multiple times
- Detection: Find repeating letter groups across different positions
## Generation Algorithms

### The Soloist Generation

Based on pattern structure analysis:

```javascript
// Simple Soloist: "aaaaaaaaaa" → 10 combinations
function generateSimpleSoloist() {
  const results = [];
  for (let digit = 0; digit <= 9; digit++) {
    const number = digit.toString().repeat(10);
    results.push(formatNumber(number));
  }
  return results; // ["000-000-0000", "111-111-1111", ..., "999-999-9999"]
}

// Complex Soloist: "abbbbbbbb" → 900 combinations  
function generateComplexSoloist(pattern) {
  const results = [];
  const structure = analyzeSoloistStructure(pattern);
  
  // Generate based on specific pattern structure
  // Implementation varies based on pattern complexity
  return results;
}
```

### Hyphen-separated Generation

```javascript
function generateHyphenSeparated(pattern) {
  const results = [];
  const blocks = [pattern.slice(0,3), pattern.slice(3,6), pattern.slice(6,10)];
  
  // For "aaabbbcccc" → 720 combinations (10×9×8)
  // For "bbbtnxbbbb" → 90 combinations (specific structure)
  
  // Generate all valid combinations based on block structure
  return results;
}
```

### The Full Straight Generation

```javascript
function generateFullStraight(pattern) {
  const results = [];
  
  // Always generates exactly 2 numbers
  const ascending = "0123456789";
  const descending = "9876543210";
  
  results.push(formatNumber(ascending));  // "012-345-6789"
  results.push(formatNumber(descending)); // "987-654-3210"
  
  return results;
}
```

### Cyclic Straight Generation

```javascript
function generateCyclicStraight(pattern) {
  const results = [];
  
  // 20 combinations: 10 starting digits × 2 directions
  for (let start = 0; start <= 9; start++) {
    // Ascending with wraparound
    let ascending = "";
    for (let i = 0; i < 10; i++) {
      ascending += ((start + i) % 10).toString();
    }
    results.push(formatNumber(ascending));
    
    // Descending with wraparound  
    let descending = "";
    for (let i = 0; i < 10; i++) {
      descending += ((start - i + 10) % 10).toString();
    }
    results.push(formatNumber(descending));
  }
  
  return results;
}
```

### The Rhythmic Bridge Generation

```javascript
function generateRhythmicBridge(pattern, structure) {
  const results = [];
  
  // For "abcaxxabcd" → 9,900 combinations
  // Generate all combinations where same letters use same digits
  
  const uniqueLetters = structure.uniqueLetters;
  const letterPositions = structure.letterPositions;
  
  // Generate all possible digit assignments
  // Implementation based on specific repeating pattern structure
  
  return results;
}
```

## Error Handling

### Validation Errors

The application handles validation errors gracefully without losing user data:

1. **Empty Pattern**: When user submits empty input
   - Display: "Pattern cannot be empty"
   - Action: Keep input field focused, preserve other patterns

2. **Invalid Length**: When pattern length ≠ 10
   - Display: "Pattern must be exactly 10 characters (current: X characters)"
   - Action: Highlight input field, preserve other patterns

3. **Invalid Characters**: When pattern contains non a-j characters
   - Display: "Pattern contains invalid characters: [list of invalid chars]. Only lowercase letters a-j are allowed."
   - Action: Highlight invalid characters, preserve other patterns

4. **Unknown Pattern Type**: When pattern doesn't match any of the 5 types
   - Display: "Pattern format not recognized. Please check the pattern matches one of the 5 supported types."
   - Action: Show examples of valid patterns

### Export Errors

CSV export errors are handled with user-friendly messages:

1. **Browser Compatibility**: If Blob API unavailable
   - Display: "CSV export is not supported in your browser. Please use a modern browser."
   - Action: Disable export button

2. **Data Generation Error**: If CSV generation fails
   - Display: "Failed to generate CSV file. Please try again."
   - Action: Keep export button enabled for retry

3. **Empty Data**: If no patterns to export
   - Display: Export button remains hidden
   - Action: Show message "Add patterns to enable export"

### Error Display Strategy

- Errors appear in a dedicated error message area with Ruby theme styling (red background, white text)
- Errors auto-dismiss when user corrects the issue
- Multiple errors can be shown simultaneously if needed
- Errors are announced to screen readers for accessibility
## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Valid patterns are accepted

*For any* string containing exactly 10 lowercase letters (a-j), the validator should accept it as valid.

**Validates: Requirements 1.2, 1.3**

### Property 2: Invalid length patterns are rejected with appropriate error

*For any* string with length not equal to 10, the validator should reject it and provide an error message indicating the required length is 10 characters.

**Validates: Requirements 1.4, 7.2**

### Property 3: Invalid character patterns are rejected with appropriate error

*For any* string containing characters outside the range a-j, the validator should reject it and provide an error message listing the invalid characters.

**Validates: Requirements 1.5**

### Property 4: All generated numbers have correct format

*For any* valid pattern and its identified pattern type, all generated phone numbers should match the format XXX-XXX-XXXX where X is a digit 0-9, with dashes at positions 3 and 6, and all characters except dashes are digits 0-9.

**Validates: Requirements 3.6, 3.7**

### Property 5: Pattern type is always identified

*For any* valid 10-character pattern (a-j), the PatternAnalyzer should identify it as one of the 5 supported pattern types (Soloist, Hyphen-separated, Full Straight, Cyclic Straight, or Rhythmic Bridge).

**Validates: Requirements 2.1**

### Property 6: Soloist patterns generate correct combinations

*For any* pattern identified as The Soloist, the generator should produce the exact number of combinations as specified in the pattern type examples (10 for "aaaaaaaaaa", 900 for "abbbbbbbb", 4050 for "andddddddd").

**Validates: Requirements 2.1.1, 2.1.2, 2.1.3, 2.1.4, 3.1**

### Property 7: Hyphen-separated patterns generate correct combinations

*For any* pattern identified as Hyphen-separated, the generator should produce the exact number of combinations as specified in the examples (720 for "aaabbbcccc", 90 for "bbbtnxbbbb") where each block contains repeated digits.

**Validates: Requirements 2.2.1, 2.2.2, 2.2.3, 2.2.4, 2.2.5, 2.2.6, 3.2**

### Property 8: Full Straight patterns generate correct combinations

*For any* pattern identified as The Full Straight, the generator should produce exactly 2 phone numbers representing ascending and descending sequences of all 10 digits.

**Validates: Requirements 2.3.1, 2.3.2, 2.3.3, 2.3.4, 2.3.5, 3.3**

### Property 9: Cyclic Straight patterns generate correct combinations

*For any* pattern identified as Cyclic Straight, the generator should produce exactly 20 phone numbers where each digit increases or decreases by 1 with wraparound from 9 to 0 or 0 to 9.

**Validates: Requirements 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.5, 3.4**

### Property 10: Rhythmic Bridge patterns generate correct combinations

*For any* pattern identified as The Rhythmic Bridge, the generator should produce the exact number of combinations as specified in the examples (9900 for "abcaxxabcd") where same letters use same digits in corresponding positions.

**Validates: Requirements 2.5.1, 2.5.2, 2.5.3, 2.5.4, 2.5.5, 3.5**

### Property 11: No duplicate numbers are generated

*For any* valid pattern, the set of generated phone numbers should contain no duplicates.

**Validates: Requirements 3.8**

### Property 12: Combination count matches expected examples

*For any* valid pattern and its identified pattern type, the number of generated phone numbers should match the exact count specified in the pattern type examples from the user's image.

**Validates: Requirements 3.8**

### Property 13: Multiple patterns are preserved when adding new pattern

*For any* collection of patterns, when a new valid pattern is added, all previously added patterns and their generated numbers should remain in the collection unchanged.

**Validates: Requirements 5.2**

### Property 14: All patterns are processed in batch

*For any* collection of valid patterns, when batch generation is performed, each pattern should have its pattern type identified and its complete set of phone numbers generated.

**Validates: Requirements 5.4**

### Property 15: CSV contains all generated numbers with correct structure

*For any* collection of pattern groups, the generated CSV should contain exactly one row for each generated phone number (plus one header row), with the pattern in the first column, pattern type in the second column, and formatted phone number (000-000-0000 format with dashes) in the third column.

**Validates: Requirements 6.2, 6.4, 6.5**

### Property 16: Errors preserve user data

*For any* collection of patterns, when a validation error occurs on a new pattern submission, all existing patterns in the collection should remain unchanged.

**Validates: Requirements 7.5**

### Property 17: Contrast ratio meets accessibility standards

*For any* text element and its background color in the interface, the contrast ratio should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 9.2**
## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and UI integration
- **Property tests**: Verify universal properties across randomized inputs

### Unit Testing

Unit tests focus on:

1. **Specific Examples from User's Image**
   - Pattern "aaaaaaaaaa" (Soloist) → 10 numbers (000-000-0000, 111-111-1111, ..., 999-999-9999)
   - Pattern "abbbbbbbb" (Soloist) → 900 numbers with first digit different from repeated digit
   - Pattern "andddddddd" (Soloist) → 4,050 numbers with complex pattern structure
   - Pattern "aaabbbcccc" (Hyphen-separated) → 720 numbers with block structure
   - Pattern "bbbtnxbbbb" (Hyphen-separated) → 90 numbers with specific pattern
   - Pattern "abcdefghij" (Full Straight) → 2 numbers (012-345-6789, 987-654-3210)
   - Pattern "zabcdefghi" (Cyclic Straight) → 20 numbers with cyclic progression
   - Pattern "abcaxxabcd" (Rhythmic Bridge) → 9,900 numbers with repeating pattern

2. **Edge Cases**
   - Empty pattern rejection
   - Pattern with characters outside a-j rejection
   - Pattern with uppercase letters rejection
   - Pattern with numbers rejection
   - Extremely long patterns (>10 chars)
   - Single character patterns (<10 chars)
   - Patterns that could match multiple types (verify priority selection)

3. **UI Integration**
   - Input field exists on page load
   - Export button appears when data exists
   - Export button hidden when no data
   - Disclaimer is visible on load
   - Pattern type is displayed for each pattern
   - Error messages appear in correct location
   - Number count displayed for each pattern matches expected examples

4. **CSV Structure**
   - Header row contains "pattern,pattern_type,phone_number"
   - UTF-8 encoding is used
   - Proper CSV escaping for special characters
   - One row per generated number (not per pattern)
   - Pattern type column contains correct type names

### Property-Based Testing

Property tests will use a JavaScript property-based testing library (fast-check recommended) with minimum 100 iterations per test.

Each property test must include a comment tag referencing the design property:

```javascript
// Feature: pattern-number-generator, Property 1: Valid patterns are accepted
```

Property tests focus on:

1. **Validation Properties** (Properties 1-3)
   - Generate random 10-character a-j strings → should be valid
   - Generate random strings with invalid lengths → should be rejected with appropriate error
   - Generate random strings with characters outside a-j → should be rejected with appropriate error

2. **Format Properties** (Property 4)
   - Generate random valid patterns → all output formats should match XXX-XXX-XXXX with only digits 0-9

3. **Pattern Type Identification Properties** (Property 5)
   - Generate random valid patterns → all should be identified as one of 5 types

4. **Generation Properties** (Properties 6-12)
   - Generate Soloist patterns → should produce exact combination counts from examples
   - Generate Hyphen-separated patterns → should produce exact combination counts from examples
   - Generate Full Straight patterns → should produce exactly 2 numbers (ascending and descending)
   - Generate Cyclic Straight patterns → should produce exactly 20 numbers with cyclic progression
   - Generate Rhythmic Bridge patterns → should produce exact combination counts from examples
   - Generate random patterns → should produce no duplicate numbers
   - Generate random patterns → combination count should match expected examples

5. **Collection Management Properties** (Properties 13-14)
   - Add patterns sequentially → earlier patterns should persist unchanged
   - Process multiple patterns → all should have type identified and numbers generated

6. **CSV Properties** (Property 15)
   - Generate random pattern collections → CSV should contain all numbers with correct structure

7. **Error Handling Properties** (Property 16)
   - Generate validation errors → existing data should persist unchanged

8. **Accessibility Properties** (Property 17)
   - Test all color combinations → contrast ratios should meet WCAG AA standards

### Test Configuration

- **Property test iterations**: 100 minimum per test
- **Test framework**: Jest for unit tests, fast-check for property tests
- **Coverage target**: 90% code coverage minimum
- **Performance validation**: Separate performance benchmarks for requirements 8.1-8.4

### Testing Pattern Type Examples

Each pattern type must be tested against the exact examples from the user's image:

1. **The Soloist Examples**
   - "aaaaaaaaaa" → 10 combinations (all same digit)
   - "abbbbbbbb" → 900 combinations (first different, rest same)
   - "andddddddd" → 4,050 combinations (complex pattern)

2. **Hyphen-separated Examples**
   - "aaabbbcccc" → 720 combinations (3 different blocks)
   - "bbbtnxbbbb" → 90 combinations (specific structure)

3. **The Full Straight Examples**
   - "abcdefghij" → 2 combinations (ascending/descending)
   - "jihgfedcba" → 2 combinations (reverse order)

4. **Cyclic Straight Examples**
   - "zabcdefghi" → 20 combinations (cyclic with wraparound)
   - "ihgfedcbaz" → 20 combinations (reverse cyclic)

5. **The Rhythmic Bridge Examples**
   - "abcaxxabcd" → 9,900 combinations (repeating pattern)

### Performance Testing

Verify performance requirements:
- Pattern analysis: < 50ms
- Number generation: < 500ms for up to 1000 numbers
- Batch processing: < 2s for up to 10 patterns
- CSV export: < 1s for up to 10,000 numbers