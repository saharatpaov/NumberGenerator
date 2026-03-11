# Requirements Document

## Introduction

เอกสารนี้กำหนดความต้องการสำหรับ Pattern-Based Number Generator ซึ่งเป็น web application ที่ช่วยให้ผู้ใช้งานสามารถสร้างเลขหมายโทรศัพท์ตามรูปแบบ (pattern) ที่กำหนดเอง โดยผู้ใช้งานสามารถป้อน pattern ที่ประกอบด้วยตัวอักษร a-j (10 ตัวอักษร) และระบบจะวิเคราะห์ประเภทของ pattern แล้วสร้างเลขหมายโทรศัพท์**ทุกชุดค่าที่เป็นไปได้**ตามกฎของ pattern type นั้น จากนั้นสามารถ export ผลลัพธ์ทั้งหมดออกมาเป็นไฟล์ CSV ได้

ระบบรองรับ Pattern Types 5 ประเภท ตามที่แสดงในรูปตัวอย่าง:

1. **The Soloist** - ตัวเลขทุกตัวมีรูปแบบซ้ำ ส่วนที่เหลือเหมือนกัน
   - "aaa-aaa-aaaa" → "888-888-8888" (10 combinations)
   - "abb-bbb-bbbb" → "788-888-8888" (900 combinations)  
   - "and-ddd-dddd" → "728-888-8888" (4,050 combinations)

2. **Hyphen-separated** - แต่ละบลอกมีตัวเลขซ้ำกันภายในบลอก
   - "aaa-bbb-cccc" → "111-222-3333" (720 combinations)
   - "bbb-tnx-bbbb" → "111-638-1111" (90 combinations)

3. **The Full Straight** - ตัวเลขทั้ง 10 ตัวเรียงกันเป็นเส้นตรงขึ้นหรือลง
   - "abc-def-ghij" → "987-654-3210" (2 combinations)
   - "jih-gfe-dcba" → "123-456-7890"

4. **Cyclic Straight** - แต่ละตัวเลขเพิ่ม/ลดทีละ 1 และวนกลับระหว่าง 9 และ 0
   - "zab-cde-fghi" → "098-765-4321" (20 combinations)
   - "ihg-fed-cbaz" → "098-765-4321"

5. **The Rhythmic Bridge** - รูปแบบซ้ำข้าม 2-3 บลอก
   - "abc-axx-abcd" → "123-123-1234" (9,900 combinations)

## Glossary

- **Pattern_Generator**: ระบบหลักที่รับผิดชอบในการวิเคราะห์ pattern type และสร้างเลขหมายโทรศัพท์ทุกชุดค่าที่เป็นไปได้ตามกฎของ pattern type นั้น
- **Pattern**: ข้อความที่ผู้ใช้งานป้อนเข้ามา ประกอบด้วยตัวอักษร a-z และ wildcard "?" ที่แทนตำแหน่งของตัวเลขในเลขหมายโทรศัพท์
- **Wildcard**: ตัวอักษร "?" ที่หมายถึงตัวเลขใดก็ได้ (0-9) และสามารถซ้ำกันได้ในหลักอื่น ๆ ที่เป็น "?" เหมือนกัน
- **Pattern_Type**: ประเภทของ pattern ที่กำหนดกฎการสร้างเลขหมายโทรศัพท์ มี 5 ประเภท: The Soloist, Hyphen-separated, The Full Straight, Cyclic Straight, The Rhythmic Bridge
- **Pattern_Analyzer**: ส่วนประกอบที่วิเคราะห์และระบุประเภทของ pattern ที่ผู้ใช้งานป้อนเข้ามา
- **Number_Generator**: ส่วนประกอบที่สร้างเลขหมายโทรศัพท์ทุกชุดค่าที่เป็นไปได้ตามกฎของ pattern type
- **CSV_Exporter**: ส่วนประกอบที่รับผิดชอบในการสร้างไฟล์ CSV จากผลลัพธ์ทั้งหมด
- **Web_Interface**: ส่วนติดต่อผู้ใช้งานแบบ web-based
- **Phone_Number**: เลขหมายโทรศัพท์ในรูปแบบ 000-000-0000 (10 หลัก แบ่งเป็น 3-3-4)
- **Letter_Assignment**: การกำหนดตัวเลข 0-9 ให้กับตัวอักษร a-j ในแต่ละ pattern ตามกฎของ pattern type

## Requirements

### Requirement 1: รับ Pattern จากผู้ใช้งาน

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการป้อน pattern ลงในระบบ เพื่อที่จะได้รับตัวเลขที่ถูกสร้างตาม pattern type นั้น

#### Acceptance Criteria

1. THE Web_Interface SHALL provide an input field for pattern entry
2. WHEN a user enters a pattern, THE Pattern_Generator SHALL accept patterns containing lowercase letters a-z and wildcard "?" characters
3. WHEN a user enters a pattern, THE Pattern_Generator SHALL accept patterns with exactly 10 characters
4. IF a pattern length is not exactly 10 characters, THEN THE Web_Interface SHALL display an error message indicating the required length
5. IF a pattern contains characters outside a-z and "?" range, THEN THE Web_Interface SHALL display an error message describing the invalid characters

### Requirement 1.1: รองรับ Wildcard Characters

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการใช้ "?" เป็น wildcard ที่หมายถึงตัวเลขใดก็ได้ (0-9) และสามารถซ้ำกันได้ในหลักอื่น ๆ ที่เป็น "?" เหมือนกัน

#### Acceptance Criteria

1. WHEN a pattern contains "?" characters, THE Pattern_Generator SHALL treat each "?" as an independent wildcard that can be any digit 0-9
2. WHEN multiple "?" characters exist in a pattern, THE Pattern_Generator SHALL allow them to have the same digit value (duplicates allowed)
3. WHEN generating numbers with wildcards, THE Pattern_Generator SHALL generate all possible combinations where each "?" can independently be 0-9
4. THE Pattern_Generator SHALL ensure that letter positions (a-z) still follow the constraint that same letters must use same digits
5. THE Pattern_Generator SHALL ensure that different letters must use different digits from each other, but wildcards can duplicate any digit

### Requirement 2: วิเคราะห์และระบุประเภทของ Pattern

#### Acceptance Criteria

### Requirement 2: วิเคราะห์และระบุประเภทของ Pattern

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบวิเคราะห์และระบุประเภทของ pattern ที่ป้อนเข้าไป เพื่อให้ระบบสร้างเลขหมายโทรศัพท์ตามกฎที่ถูกต้อง

#### Acceptance Criteria

1. WHEN a valid pattern is submitted, THE Pattern_Analyzer SHALL identify the Pattern_Type from the 5 supported types
2. THE Pattern_Analyzer SHALL support identification of The Soloist pattern type
3. THE Pattern_Analyzer SHALL support identification of Hyphen-separated pattern type  
4. THE Pattern_Analyzer SHALL support identification of The Full Straight pattern type
5. THE Pattern_Analyzer SHALL support identification of Cyclic Straight pattern type
6. THE Pattern_Analyzer SHALL support identification of The Rhythmic Bridge pattern type
7. THE Web_Interface SHALL display the identified Pattern_Type to the user

### Requirement 2.1: กฎสำหรับ The Soloist Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์แบบ Soloist ที่มีรูปแบบซ้ำ เพื่อให้ได้เลขหมายโทรศัพท์ตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN a pattern matches The Soloist type, THE Pattern_Analyzer SHALL identify patterns where some digits repeat while others are identical
2. WHEN The Soloist pattern "aaa-aaa-aaaa" is identified, THE Number_Generator SHALL generate exactly 10 Phone_Numbers where all digits are identical
3. WHEN The Soloist pattern "abb-bbb-bbbb" is identified, THE Number_Generator SHALL generate exactly 900 Phone_Numbers where the first digit differs from the repeated digit
4. WHEN The Soloist pattern "and-ddd-dddd" is identified, THE Number_Generator SHALL generate exactly 4050 Phone_Numbers following the pattern structure
5. THE Number_Generator SHALL ensure generated Phone_Numbers follow the repeating pattern structure of The Soloist type

### Requirement 2.2: กฎสำหรับ Hyphen-separated Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์แบบ Hyphen-separated ที่แต่ละบลอกมีตัวเลขซ้ำกันภายในบลอก เพื่อให้ได้เลขหมายโทรศัพท์ตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN a pattern matches Hyphen-separated type, THE Pattern_Analyzer SHALL identify patterns where each hyphen-separated block contains a single repeated digit
2. WHEN Hyphen-separated pattern "aaa-bbb-cccc" is identified, THE Number_Generator SHALL generate exactly 720 Phone_Numbers
3. WHEN Hyphen-separated pattern "bbb-tnx-bbbb" is identified, THE Number_Generator SHALL generate exactly 90 Phone_Numbers
4. THE Number_Generator SHALL ensure the first block uses 3 identical digits
5. THE Number_Generator SHALL ensure the second block uses 3 identical digits  
6. THE Number_Generator SHALL ensure the third block uses 4 identical digits
7. THE Number_Generator SHALL ensure each block can use different digits from other blocks

### Requirement 2.3: กฎสำหรับ The Full Straight Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์แบบ Full Straight ที่มีตัวเลขเรียงกันทั้ง 10 ตัว เพื่อให้ได้เลขหมายโทรศัพท์ตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN a pattern matches The Full Straight type, THE Pattern_Analyzer SHALL identify patterns where all 10 digits move in ascending or descending sequence
2. WHEN The Full Straight pattern "abc-def-ghij" is identified, THE Number_Generator SHALL generate exactly 2 Phone_Numbers
3. THE Number_Generator SHALL generate one Phone_Number with digits in descending order like "987-654-3210"
4. THE Number_Generator SHALL generate one Phone_Number with digits in ascending order like "123-456-7890"
5. THE Number_Generator SHALL ensure all 10 digits appear exactly once in each generated Phone_Number

### Requirement 2.4: กฎสำหรับ Cyclic Straight Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์แบบ Cyclic Straight ที่ตัวเลขเพิ่มหรือลดทีละ 1 และวนกลับ เพื่อให้ได้เลขหมายโทรศัพท์ตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN a pattern matches Cyclic Straight type, THE Pattern_Analyzer SHALL identify patterns where each digit increases or decreases by 1 with wraparound between 9 and 0
2. WHEN Cyclic Straight pattern "zab-cde-fghi" is identified, THE Number_Generator SHALL generate exactly 20 Phone_Numbers
3. THE Number_Generator SHALL generate Phone_Numbers where each digit increases or decreases by 1 with wraparound from 9 to 0 or 0 to 9
4. THE Number_Generator SHALL support both ascending and descending cyclic sequences
5. THE Number_Generator SHALL generate all possible starting digits for the Cyclic Straight pattern

### Requirement 2.5: กฎสำหรับ The Rhythmic Bridge Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์แบบ Rhythmic Bridge ที่มีรูปแบบซ้ำข้าม 2-3 บลอก เพื่อให้ได้เลขหมายโทรศัพท์ตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN a pattern matches The Rhythmic Bridge type, THE Pattern_Analyzer SHALL identify patterns with repeating sub-patterns across 2-3 blocks
2. WHEN The Rhythmic Bridge pattern "abc-axx-abcd" is identified, THE Number_Generator SHALL generate exactly 9900 Phone_Numbers
3. THE Pattern_Analyzer SHALL detect the repeating sub-pattern structure across multiple blocks
4. THE Number_Generator SHALL ensure the same digits appear in corresponding positions of the repeating sub-pattern
5. THE Number_Generator SHALL allow non-repeating positions to use any available digits

### Requirement 3: สร้างเลขหมายโทรศัพท์ตาม Pattern Type

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบสร้างเลขหมายโทรศัพท์ทุกชุดค่าที่เป็นไปได้ตามกฎของ pattern type เพื่อให้ได้ผลลัพธ์ครบถ้วนและถูกต้องตามตัวอย่างในรูป

#### Acceptance Criteria

1. WHEN The Soloist pattern is identified, THE Number_Generator SHALL generate all possible Phone_Numbers according to the specific Soloist pattern structure
2. WHEN Hyphen-separated pattern is identified, THE Number_Generator SHALL generate all possible Phone_Numbers where each block contains repeated digits
3. WHEN The Full Straight pattern is identified, THE Number_Generator SHALL generate exactly 2 Phone_Numbers representing ascending and descending sequences
4. WHEN Cyclic Straight pattern is identified, THE Number_Generator SHALL generate exactly 20 Phone_Numbers with cyclic digit progression
5. WHEN The Rhythmic Bridge pattern is identified, THE Number_Generator SHALL generate all possible Phone_Numbers following the repeating sub-pattern structure
6. THE Number_Generator SHALL format each output Phone_Number as 000-000-0000 with dashes separating the digits at positions 3 and 6
7. THE Number_Generator SHALL ensure all generated Phone_Numbers use only digits 0-9
8. THE Number_Generator SHALL generate the exact number of combinations as specified in the pattern type examples

### Requirement 4: แสดงผลลัพธ์ทั้งหมด

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการเห็นผลลัพธ์ทั้งหมดของการสร้างเลขหมายโทรศัพท์ เพื่อที่จะตรวจสอบความถูกต้อง

#### Acceptance Criteria

1. WHEN number generation is complete, THE Web_Interface SHALL display all generated Phone_Numbers in 000-000-0000 format
2. THE Web_Interface SHALL display the original pattern alongside all its generated Phone_Numbers
3. THE Web_Interface SHALL display the identified Pattern_Type for each pattern
4. THE Web_Interface SHALL indicate the count of generated Phone_Numbers for each pattern
5. WHEN multiple patterns are processed, THE Web_Interface SHALL display all pattern-numbers groups in a list format

### Requirement 5: จัดการหลาย Pattern

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการป้อนและสร้างเลขหมายโทรศัพท์จากหลาย pattern พร้อมกัน เพื่อประหยัดเวลาในการทำงาน

#### Acceptance Criteria

1. THE Web_Interface SHALL allow users to add multiple patterns before generating Phone_Numbers
2. WHEN a user adds a new pattern, THE Pattern_Generator SHALL preserve previously entered patterns
3. THE Web_Interface SHALL provide a mechanism to remove individual patterns from the list
4. WHEN generating numbers, THE Pattern_Generator SHALL process all patterns in the list

### Requirement 6: Export ผลลัพธ์ทั้งหมดเป็นไฟล์ CSV

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการ export ผลลัพธ์ทั้งหมดออกมาเป็นไฟล์ CSV เพื่อนำไปใช้งานต่อในโปรแกรมอื่น

#### Acceptance Criteria

1. WHEN results are available, THE Web_Interface SHALL provide an export button
2. WHEN a user clicks the export button, THE CSV_Exporter SHALL generate a CSV file containing all generated Phone_Numbers from all patterns
3. THE CSV_Exporter SHALL format the CSV file with three columns: pattern, pattern_type, and phone_number
4. THE CSV_Exporter SHALL include one row for each generated Phone_Number with its source pattern and Pattern_Type
5. THE CSV_Exporter SHALL format each Phone_Number in 000-000-0000 format in the phone_number column
6. THE CSV_Exporter SHALL include a header row with column names
7. WHEN the CSV file is generated, THE CSV_Exporter SHALL trigger a file download in the user's browser
8. THE CSV_Exporter SHALL encode the CSV file using UTF-8 encoding

### Requirement 7: จัดการข้อผิดพลาด

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการได้รับข้อความแจ้งเตือนที่ชัดเจนเมื่อเกิดข้อผิดพลาด เพื่อที่จะสามารถแก้ไขได้อย่างถูกต้อง

#### Acceptance Criteria

1. IF a pattern is empty, THEN THE Web_Interface SHALL display an error message indicating that pattern cannot be empty
2. IF a pattern length is not exactly 10 characters, THEN THE Web_Interface SHALL display an error message indicating that pattern must be exactly 10 characters
3. IF a pattern does not match any known Pattern_Type, THEN THE Web_Interface SHALL display an error message indicating that the pattern format is not recognized
4. IF CSV export fails, THEN THE Web_Interface SHALL display an error message describing the failure reason
5. WHEN an error occurs, THE Web_Interface SHALL maintain all user-entered data to allow correction without data loss

### Requirement 8: ประสิทธิภาพการทำงาน

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการให้ระบบตอบสนองอย่างรวดเร็ว เพื่อประสบการณ์การใช้งานที่ดี

#### Acceptance Criteria

1. WHEN a pattern is submitted, THE Pattern_Analyzer SHALL identify the Pattern_Type within 50 milliseconds
2. WHEN generating Phone_Numbers, THE Number_Generator SHALL complete generation within 500 milliseconds for patterns generating up to 1000 Phone_Numbers
3. WHEN processing multiple patterns, THE Pattern_Generator SHALL complete conversion of up to 10 patterns within 2 seconds
4. WHEN exporting to CSV, THE CSV_Exporter SHALL generate the file within 1 second for up to 10000 generated Phone_Numbers

### Requirement 9: การออกแบบ UI/UX

**User Story:** ในฐานะผู้ใช้งาน ผมต้องการ interface ที่มีธีมสี Ruby สวยงาม อ่านง่าย และมีข้อความแจ้งเตือนที่จำเป็น เพื่อประสบการณ์การใช้งานที่ดี

#### Acceptance Criteria

1. THE Web_Interface SHALL use a Ruby color scheme with red and pink tones as the primary color palette
2. THE Web_Interface SHALL ensure text has sufficient contrast ratio against background colors for readability
3. THE Web_Interface SHALL use clear and legible typography with appropriate font sizes
4. THE Web_Interface SHALL organize UI elements with adequate spacing for easy comprehension
5. THE Web_Interface SHALL display a disclaimer message to users
6. THE Web_Interface SHALL position the disclaimer in a visible location within the interface
7. WHEN the application loads, THE Web_Interface SHALL present the disclaimer before or alongside the main functionality
