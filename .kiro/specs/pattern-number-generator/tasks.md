# Implementation Plan: Pattern-Based Number Generator

## Overview

This plan implements a client-side web application that analyzes 10-character patterns (a-j only) to identify their pattern type from 5 distinct types, then generates ALL possible phone numbers according to the specific rules of that pattern type. The implementation uses vanilla JavaScript (ES6+), HTML5, and CSS3 with a Ruby color theme.

The system supports 5 distinct pattern types based on the user's image examples:

1. **The Soloist** - Various repeating patterns (10/900/4,050 combinations)
2. **Hyphen-separated** - Each block has repeated digits (720/90 combinations)  
3. **The Full Straight** - All 10 digits in sequence (2 combinations)
4. **Cyclic Straight** - Digits cycle with wraparound (20 combinations)
5. **The Rhythmic Bridge** - Repeating across blocks (9,900 combinations)

Key architectural changes:
- PatternAnalyzer component identifies pattern type from structure
- PatternGenerator uses type-specific generation algorithms
- Generate exact combination counts matching user's image examples
- CSV includes pattern_type column
- UI displays pattern type identification

## Tasks

- [x] 1. Set up project structure and core files
  - Create index.html with semantic HTML5 structure
  - Create styles.css with Ruby theme color palette (red/pink tones)
  - Create app.js as main entry point
  - Set up basic page layout with input area, results area, and disclaimer section
  - _Requirements: 9.1, 9.4, 9.5, 9.6, 9.7_

- [ ] 2. Implement PatternValidator class
  - [x] 2.1 Create PatternValidator class with validation methods
    - Implement validate() method returning ValidationResult object
    - Implement isValidLength() checking for exactly 10 characters
    - Implement hasValidCharacters() checking for lowercase a-j only
    - Implement getInvalidCharacters() returning array of invalid chars
    - _Requirements: 1.2, 1.3, 1.4, 1.5_
  
  - [ ]* 2.2 Write property test for valid pattern acceptance
    - **Property 1: Valid patterns are accepted**
    - **Validates: Requirements 1.2, 1.3**
    - Generate random 10-character a-j strings, verify all are accepted
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 2.3 Write property test for invalid length rejection
    - **Property 2: Invalid length patterns are rejected with appropriate error**
    - **Validates: Requirements 1.4, 7.2**
    - Generate random strings with length ≠ 10, verify rejection with error message
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 2.4 Write property test for invalid character rejection
    - **Property 3: Invalid character patterns are rejected with appropriate error**
    - **Validates: Requirements 1.5**
    - Generate random strings with non a-j characters, verify rejection with error listing invalid chars
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 2.5 Write unit tests for PatternValidator edge cases
    - Test empty string rejection (Requirement 7.1)
    - Test uppercase letters rejection
    - Test characters outside a-j range (k-z, numbers, special chars)
    - Test whitespace handling
    - _Requirements: 7.1, 1.5_

- [ ] 3. Implement PatternAnalyzer class
  - [x] 3.1 Create PatternAnalyzer class for pattern type identification
    - Implement identifyPatternType() returning one of 5 pattern types
    - Implement isSoloist() detecting various repeating patterns (10/900/4050 combos)
    - Implement isHyphenSeparated() detecting block-based patterns (720/90 combos)
    - Implement isFullStraight() detecting all 10 digits in sequence (2 combos)
    - Implement isCyclicStraight() detecting cyclic progression (20 combos)
    - Implement isRhythmicBridge() detecting repeating across blocks (9900 combos)
    - Implement analyzeSoloistStructure() for Soloist pattern analysis
    - Implement analyzeRhythmicStructure() for Rhythmic Bridge pattern analysis
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [ ]* 3.2 Write property test for pattern type identification
    - **Property 5: Pattern type is always identified**
    - **Validates: Requirements 2.1**
    - Generate random valid patterns, verify all are identified as one of 5 types
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 3.3 Write unit tests for specific pattern type examples
    - Test "aaaaaaaaaa" identified as The Soloist (10 combos)
    - Test "abbbbbbbb" identified as The Soloist (900 combos)
    - Test "andddddddd" identified as The Soloist (4050 combos)
    - Test "aaabbbcccc" identified as Hyphen-separated (720 combos)
    - Test "bbbtnxbbbb" identified as Hyphen-separated (90 combos)
    - Test "abcdefghij" identified as The Full Straight (2 combos)
    - Test "zabcdefghi" identified as Cyclic Straight (20 combos)
    - Test "abcaxxabcd" identified as The Rhythmic Bridge (9900 combos)
    - _Requirements: 2.1.1, 2.1.2, 2.1.3, 2.2.1, 2.2.2, 2.3.1, 2.4.1, 2.5.1_

- [ ] 4. Implement PatternGenerator class
  - [x] 4.1 Create PatternGenerator class with type-specific generation algorithms
    - Implement generate() method using pattern type to call appropriate generator
    - Implement generateSoloist() for various repeating patterns (10/900/4050 combos)
    - Implement generateHyphenSeparated() for block-based patterns (720/90 combos)
    - Implement generateFullStraight() for sequential patterns (2 combos)
    - Implement generateCyclicStraight() for cyclic patterns (20 combos)
    - Implement generateRhythmicBridge() for repeating patterns (9900 combos)
    - Implement formatNumber() adding dashes at positions 3 and 6
    - Implement calculateCombinationCount() for expected counts
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_
  
  - [ ]* 4.2 Write property test for output format correctness
    - **Property 4: All generated numbers have correct format**
    - **Validates: Requirements 3.6, 3.7**
    - Generate random valid patterns, verify all outputs match XXX-XXX-XXXX format with digits 0-9
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.3 Write property test for Soloist pattern generation
    - **Property 6: Soloist patterns generate correct combinations**
    - **Validates: Requirements 2.1.1, 2.1.2, 2.1.3, 2.1.4, 3.1**
    - Generate Soloist patterns, verify exact combination counts (10/900/4050)
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.4 Write property test for Hyphen-separated pattern generation
    - **Property 7: Hyphen-separated patterns generate correct combinations**
    - **Validates: Requirements 2.2.1, 2.2.2, 2.2.3, 2.2.4, 2.2.5, 2.2.6, 3.2**
    - Generate Hyphen-separated patterns, verify exact combination counts (720/90)
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.5 Write property test for Full Straight pattern generation
    - **Property 8: Full Straight patterns generate correct combinations**
    - **Validates: Requirements 2.3.1, 2.3.2, 2.3.3, 2.3.4, 2.3.5, 3.3**
    - Generate Full Straight patterns, verify exactly 2 combinations (ascending/descending)
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.6 Write property test for Cyclic Straight pattern generation
    - **Property 9: Cyclic Straight patterns generate correct combinations**
    - **Validates: Requirements 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.5, 3.4**
    - Generate Cyclic Straight patterns, verify exactly 20 combinations with wraparound
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.7 Write property test for Rhythmic Bridge pattern generation
    - **Property 10: Rhythmic Bridge patterns generate correct combinations**
    - **Validates: Requirements 2.5.1, 2.5.2, 2.5.3, 2.5.4, 2.5.5, 3.5**
    - Generate Rhythmic Bridge patterns, verify exact combination counts (9900)
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.8 Write property test for no duplicate numbers
    - **Property 11: No duplicate numbers are generated**
    - **Validates: Requirements 3.8**
    - Generate random patterns, verify no duplicates in generated number sets
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.9 Write property test for combination count matching
    - **Property 12: Combination count matches expected examples**
    - **Validates: Requirements 3.8**
    - Generate random patterns, verify count matches exact examples from user's image
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 4.10 Write unit tests for specific pattern examples
    - Test "aaaaaaaaaa" → exactly 10 numbers (000-000-0000, 111-111-1111, ..., 999-999-9999)
    - Test "abbbbbbbb" → exactly 900 numbers (first digit differs from repeated)
    - Test "andddddddd" → exactly 4050 numbers (complex Soloist pattern)
    - Test "aaabbbcccc" → exactly 720 numbers (Hyphen-separated blocks)
    - Test "bbbtnxbbbb" → exactly 90 numbers (specific Hyphen-separated pattern)
    - Test "abcdefghij" → exactly 2 numbers (012-345-6789, 987-654-3210)
    - Test "zabcdefghi" → exactly 20 numbers (cyclic progression)
    - Test "abcaxxabcd" → exactly 9900 numbers (repeating pattern)
    - _Requirements: 2.1.1, 2.1.2, 2.1.3, 2.2.1, 2.2.2, 2.3.1, 2.4.1, 2.5.1_

- [x] 5. Checkpoint - Ensure pattern analysis and generation work
  - Ensure all tests pass, ask the user if questions arise.
- [x] 6. Implement PatternManager class
  - [x] 6.1 Create PatternManager class for pattern collection management
    - Implement addPattern() adding pattern to collection with type identification
    - Implement removePattern() removing pattern by index
    - Implement getAllPatternGroups() returning patterns with types and generated numbers
    - Implement clearAll() clearing entire collection
    - Implement getCount() returning number of patterns
    - Implement getTotalNumberCount() returning total count of all generated numbers
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [ ]* 6.2 Write property test for pattern addition preservation
    - **Property 13: Pattern addition preserves existing patterns**
    - **Validates: Requirements 4.2**
    - Add patterns sequentially, verify earlier patterns persist unchanged
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 6.3 Write property test for batch processing completeness
    - **Property 14: All patterns in collection are processed**
    - **Validates: Requirements 4.4**
    - Generate random collections of valid patterns, verify all have type and numbers
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 6.4 Write property test for error data preservation
    - **Property 16: Errors preserve user data**
    - **Validates: Requirements 7.5**
    - Trigger validation errors, verify existing patterns remain unchanged
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 6.5 Write unit tests for PatternManager edge cases
    - Test adding duplicate patterns
    - Test removing from empty collection
    - Test removing invalid index
    - Test clearAll() on empty collection
    - Test getTotalNumberCount() with various pattern types
    - _Requirements: 4.1, 4.3_

- [x] 7. Implement CSVExporter class
  - [x] 7.1 Create CSVExporter class for CSV generation and download
    - Implement export() triggering CSV download
    - Implement generateCSV() creating CSV string with headers: pattern, pattern_type, phone_number
    - Implement downloadFile() using Blob API and URL.createObjectURL
    - Use UTF-8 encoding for CSV file
    - Flatten pattern groups so each generated number gets its own row
    - Include pattern type in second column for each row
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_
  
  - [ ]* 7.2 Write property test for CSV completeness with pattern types
    - **Property 15: CSV contains all generated numbers with correct structure**
    - **Validates: Requirements 6.2, 6.4, 6.5**
    - Generate random pattern collections, verify CSV contains all numbers with pattern types
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 7.3 Write unit tests for CSV structure and encoding
    - Test header row contains "pattern,pattern_type,phone_number"
    - Test UTF-8 encoding is used
    - Test CSV escaping for special characters
    - Test empty data handling
    - Test browser compatibility fallback
    - Test one row per generated number (not per pattern)
    - Test pattern type column contains correct type names
    - Test "aaaaaaaaaa" generates 10 CSV rows with "The Soloist" type
    - _Requirements: 6.3, 6.6, 6.8, 7.3_

- [x] 8. Checkpoint - Ensure data management and export work
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Implement UIController class
  - [x] 9.1 Create UIController class with DOM manipulation methods
    - Implement init() setting up event listeners
    - Implement showError() displaying validation errors
    - Implement clearError() removing error messages
    - Implement updatePatternList() rendering pattern groups with pattern types and all generated numbers
    - Implement toggleExportButton() showing/hiding export button
    - Implement displayPatternType() showing identified pattern type for each pattern
    - Implement displayNumberCount() showing count of generated numbers per pattern
    - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4, 6.1, 7.1, 7.2, 7.3, 7.5_
  
  - [ ]* 9.2 Write unit tests for UI integration
    - Test input field exists on page load
    - Test export button appears when data exists
    - Test export button hidden when no data
    - Test disclaimer is visible on load
    - Test pattern type is displayed for each pattern
    - Test error messages appear in correct location
    - Test error auto-dismiss on correction
    - Test number count displayed matches expected examples
    - _Requirements: 1.1, 6.1, 9.5, 9.6, 9.7_
  
  - [ ]* 9.3 Write property test for pattern type display
    - **Property: Pattern type is displayed for each pattern**
    - **Validates: Requirements 2.7**
    - Generate random patterns, verify pattern type appears in UI alongside pattern
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 9.4 Write property test for pattern and numbers display together
    - **Property: Pattern and all numbers displayed together**
    - **Validates: Requirements 4.1**
    - Generate random patterns, verify pattern and all its numbers appear in rendered output
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 9.5 Write property test for multiple pattern groups display
    - **Property: Multiple pattern groups are all displayed**
    - **Validates: Requirements 4.2**
    - Generate random pattern collections, verify all groups visible in rendered list
    - Use fast-check with minimum 100 iterations

- [ ] 10. Create Ruby-themed UI with disclaimer
  - [x] 10.1 Implement Ruby color scheme in CSS
    - Define CSS custom properties for Ruby theme (red/pink tones)
    - Apply color scheme to all UI elements
    - Ensure sufficient spacing between elements
    - Use clear, legible typography with appropriate font sizes
    - _Requirements: 9.1, 9.3, 9.4_
  
  - [x] 10.2 Implement disclaimer section in HTML
    - Add disclaimer text in visible location
    - Style disclaimer appropriately within Ruby theme
    - Ensure disclaimer is visible on page load
    - _Requirements: 9.5, 9.6, 9.7_
  
  - [ ]* 10.3 Write property test for contrast ratio accessibility
    - **Property 17: Contrast ratio meets accessibility standards**
    - **Validates: Requirements 9.2**
    - Test all text/background color combinations, verify WCAG AA compliance (4.5:1 normal, 3:1 large)
    - Use fast-check with minimum 100 iterations
  
  - [ ]* 10.4 Write unit tests for UI styling
    - Test Ruby color palette is applied
    - Test font sizes are appropriate
    - Test spacing is adequate
    - Test responsive layout on different screen sizes
    - _Requirements: 9.1, 9.3, 9.4_

- [ ] 11. Wire all components together in main application
  - [x] 11.1 Create main application initialization
    - Instantiate all classes (PatternValidator, PatternAnalyzer, PatternGenerator, PatternManager, CSVExporter, UIController)
    - Wire event handlers for input submission, pattern removal, and CSV export
    - Connect validation errors to UI error display
    - Connect pattern additions to UI updates (showing pattern type and all generated numbers)
    - Connect export button to CSVExporter (exporting all numbers with pattern types)
    - Initialize disclaimer display on page load
    - _Requirements: 1.1, 1.4, 1.5, 2.7, 4.1, 4.2, 4.3, 4.4, 6.1, 7.1, 7.2, 7.3, 7.5_
  
  - [ ]* 11.2 Write integration tests for end-to-end flows
    - Test complete flow: input pattern → validate → identify type → generate all numbers → display all
    - Test complete flow: add multiple patterns → display all groups with types → export CSV with all numbers and types
    - Test error flow: invalid pattern → show error → correct → success
    - Test removal flow: add patterns → remove one → verify others remain
    - Test pattern "aaaaaaaaaa" generates, displays, and exports 10 numbers as "The Soloist"
    - Test pattern "abcdefghij" generates, displays, and exports 2 numbers as "The Full Straight"
    - Test pattern "aaabbbcccc" generates, displays, and exports 720 numbers as "Hyphen-separated"
    - _Requirements: 1.1, 1.4, 2.1, 2.7, 3.1, 4.2, 4.3, 6.2, 7.5_

- [ ] 12. Performance validation and optimization
  - [ ]* 12.1 Write performance benchmarks
    - Test pattern type identification completes within 50ms
    - Test single pattern number generation completes within 500ms for up to 1000 numbers
    - Test 10 patterns processing completes within 2 seconds
    - Test CSV export of 10000 numbers completes within 1 second
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  
  - [x] 12.2 Optimize performance if benchmarks fail
    - Profile slow operations (especially pattern analysis and generation algorithms)
    - Optimize DOM manipulation (batch updates, virtual scrolling for large result sets)
    - Optimize CSV generation (efficient string building)
    - Consider limiting display of very large result sets (e.g., show first 1000, export all)
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 13. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 14. Fix Wildcard Logic for Independent Digit Assignment
  - [ ] 14.1 Update wildcard generation logic in PatternGenerator
    - Fix _generateWildcardDigits() to allow duplicate digits across wildcard positions
    - Ensure wildcards ("?") can independently be any digit 0-9 without uniqueness constraint
    - Maintain constraint that same letters (a-z) must use same digits
    - Maintain constraint that different letters must use different digits from each other
    - Allow wildcards to duplicate any digit (including digits used by letters)
    - _Requirements: 1.1.1, 1.1.2, 1.1.3, 1.1.4, 1.1.5_
  
  - [ ] 14.2 Test wildcard independence
    - Test pattern "??" generates 100 combinations (10×10, allowing duplicates like 00, 11, 22, etc.)
    - Test pattern "a?" generates 90 combinations (10 choices for 'a' × 10 choices for '?', '?' can duplicate 'a')
    - Test pattern "a?b" generates 720 combinations (10×10×8, 'a'≠'b', '?' can be anything)
    - Test pattern "??a" generates 900 combinations (10×10×9, both '?' independent, 'a' different from one '?')
    - _Requirements: 1.1.1, 1.1.2, 1.1.3_
  
  - [ ] 14.3 Update UI to show correct wildcard behavior
    - Update pattern descriptions to clarify wildcard independence
    - Test dropdown patterns with wildcards show correct generation counts
    - Verify CSV export includes all wildcard combinations correctly
    - _Requirements: 1.1.4, 1.1.5_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations
- Unit tests use Jest or similar testing framework
- All code uses vanilla JavaScript ES6+ (no frameworks)
- Application is entirely client-side (no backend required)
- Ruby theme uses red/pink color palette throughout
- Checkpoints ensure incremental validation at key milestones
- MAJOR ARCHITECTURAL CHANGES: 
  - PatternAnalyzer identifies 5 distinct pattern types from structure
  - PatternGenerator uses type-specific algorithms for exact combination counts
  - No generic permutation logic - each type has specific generation rules
  - CSV includes pattern_type column
  - UI displays pattern type identification
  - Generate exact combination counts matching user's image examples (10/900/4050/720/90/2/20/9900)
