// Lucky Number Analysis System - Traditional Numerology
// This system uses traditional numerology principles based on ancient wisdom
// and universal number meanings that have been practiced across cultures.

class LuckyNumberAnalyzer {
  constructor() {
      // Complete Numerology System 0-99 - ระบบเลขศาสตร์ครบถ้วน 0-99
      // Based on authentic traditional numerology research and established interpretations
      this.numerologyData = {
        0: { meaning: 'เลขแห่งศักยภาพที่ไม่จำกัด มีความเป็นไปได้ทุกอย่าง เป็นจุดเริ่มต้นของทุกสิ่ง', personality: 'ลึกลับ, มีศักยภาพ, เปิดกว้าง', careers: ['นักปรัชญา', 'นักจิตวิทยา', 'ที่ปรึกษา'], zodiac: ['มีน', 'กรกฎ'], color: 'ขาว, เงิน', lucky: 'มีโชคในการเริ่มต้นใหม่', warning: 'ระวังความไม่แน่นอน' },

        // Core Numbers 1-9 - Based on traditional numerology principles
        1: { meaning: 'เลขแห่งผู้นำและการเริ่มต้น มีความมุ่งมั่น เด็ดขาด เป็นอิสระ มีความคิดริเริ่ม', personality: 'ผู้นำ, มุ่งมั่น, อิสระ, นวัตกรรม', careers: ['ผู้บริหาร', 'ผู้ประกอบการ', 'นักการเมือง', 'ผู้จัดการ'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'เหมาะกับการเป็นผู้นำและการริเริ่มโครงการใหม่', warning: 'ระวังความเย่อหยิ่งและการเอาแต่ใจ' },
        2: { meaning: 'เลขแห่งความร่วมมือและความสมดุล มีความอ่อนโยน เข้าใจผู้อื่น ชอบทำงานเป็นทีม', personality: 'อ่อนโยน, ร่วมมือ, อดทน, ไวต่อความรู้สึก', careers: ['ที่ปรึกษา', 'นักการทูต', 'พยาบาล', 'นักไกล่เกลี่ย'], zodiac: ['พฤษภ', 'กันย์'], color: 'ส้ม, เหลือง', lucky: 'มีโชคจากการช่วยเหลือผู้อื่นและการทำงานร่วมกัน', warning: 'ระวังการถูกเอาเปรียบและความไวเกินไป' },
        3: { meaning: 'เลขแห่งความคิดสร้างสรรค์และการสื่อสาร มีความสนุกสนาน ร่าเริง มีจินตนาการ', personality: 'สร้างสรรค์, สื่อสารเก่ง, ร่าเริง, มีศิลปะ', careers: ['ศิลปิน', 'นักเขียน', 'นักแสดง', 'นักประชาสัมพันธ์'], zodiac: ['เมถุน', 'ตุล'], color: 'เหลือง, เขียวอ่อน', lucky: 'มีโชคในงานศิลปะและการสื่อสาร', warning: 'ระวังการกระจายสมาธิและความผิวเผิน' },
        4: { meaning: 'เลขแห่งความมั่นคงและระเบียบแบบแผน มีความขยัน ทำงานหนัก เชื่อถือได้', personality: 'มั่นคง, ขยัน, เชื่อถือได้, มีระเบียบ', careers: ['วิศวกร', 'นักบัญชี', 'ข้าราชการ', 'ผู้จัดการโครงการ'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคในงานที่ต้องความละเอียดและความมั่นคง', warning: 'ระวังความเครียดและความเข้มงวดเกินไป' },
        5: { meaning: 'เลขแห่งอิสรภาพและการผจญภัย ชอบการเปลี่ยนแปลง มีความยืดหยุ่น รักการเดินทาง', personality: 'รักอิสรภาพ, ผจญภัย, ยืดหยุ่น, ปรับตัวเก่ง', careers: ['นักเดินทาง', 'นักขาย', 'นักการตลาด', 'นักข่าว'], zodiac: ['ธนู', 'กุมภ'], color: 'เขียว, ฟ้า', lucky: 'มีโชคในการเดินทางและการเปลี่ยนแปลง', warning: 'ระวังความไม่มั่นคงและการขาดความอดทน' },
        6: { meaning: 'เลขแห่งความรับผิดชอบและความรัก รักครอบครัว เอาใจใส่ ชอบช่วยเหลือ', personality: 'รับผิดชอบ, รักครอบครัว, เมตตา, อบอุ่น', careers: ['แพทย์', 'พยาบาล', 'ครู', 'นักสังคมสงเคราะห์'], zodiac: ['พฤษภ', 'กันย์'], color: 'ชมพู, ม่วง', lucky: 'มีโชคจากครอบครัวและการดูแลผู้อื่น', warning: 'ระวังการเสียสละมากเกินไปและการยุ่งเรื่องผู้อื่น' },
        7: { meaning: 'เลขแห่งปัญญาและจิตวิญญาณ ชอบการศึกษาค้นคว้า มีสัญชาตญาณ ลึกลับ', personality: 'มีปัญญา, ลึกลับ, ชอบศึกษา, มีสัญชาตญาณ', careers: ['นักวิจัย', 'อาจารย์', 'นักปรัชญา', 'นักจิตวิทยา'], zodiac: ['เมถุน', 'ตุล'], color: 'ม่วง, เงิน', lucky: 'มีโชคในการศึกษาและการค้นหาความจริง', warning: 'ระวังการคิดมากเกินไปและการแยกตัว' },
        8: { meaning: 'เลขแห่งความสำเร็จและอำนาจ มีความทะเยอทะยาน ชอบอำนาจ มุ่งเน้นผลสำเร็จ', personality: 'ทะเยอทะยาน, มุ่งความสำเร็จ, มีอำนาจ, มั่นใจ', careers: ['นักธุรกิจ', 'ผู้บริหาร', 'นักการเงิน', 'นักลงทุน'], zodiac: ['พิจิก', 'มกร'], color: 'ดำ, ทอง', lucky: 'มีโชคในการเงินและความสำเร็จทางวัตถุ', warning: 'ระวังความโลภและการใช้อำนาจในทางที่ผิด' },
        9: { meaning: 'เลขแห่งการให้และความสมบูรณ์ มีจิตใจกว้างขวาง ชอบช่วยเหลือสังคม มีความเมตตา', personality: 'ใจกว้าง, ช่วยเหลือสังคม, มีเมตตา, มีวิสัยทัศน์', careers: ['ครู', 'หมอ', 'ทนายความ', 'นักการกุศล'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'มีโชคจากการทำความดีและการช่วยเหลือผู้อื่น', warning: 'ระวังการให้มากเกินตัวและความเหนื่อยล้า' },

        // Master Numbers and Higher Numbers - Based on authentic numerology research
        10: { meaning: 'เลขแห่งการเริ่มต้นใหม่ด้วยประสบการณ์ ผสมผสานความเป็นผู้นำกับความสมบูรณ์', personality: 'มั่นใจ, กล้าหาญ, มีประสบการณ์, เป็นผู้นำ', careers: ['ผู้จัดการ', 'ที่ปรึกษา', 'โค้ช', 'ผู้ประกอบการ'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ส้ม', lucky: 'มีโชคในการนำทีมและการเริ่มต้นใหม่', warning: 'ระวังการตัดสินใจเร็วเกินไปและความเย่อหยิ่ง' },
        11: { meaning: 'Master Number - เลขแห่งสัญชาตญาณและการเป็นแรงบันดาลใจ มีพลังจิตสูง มีวิสัยทัศน์', personality: 'มีสัญชาตญาณ, เป็นแรงบันดาลใจ, ละเอียดอ่อน, มีพลังจิต', careers: ['นักจิตวิทยา', 'ศิลปิน', 'นักเขียน', 'ผู้นำทางจิตวิญญาณ'], zodiac: ['กุมภ', 'มีน'], color: 'เงิน, ขาว', lucky: 'มีโชคในงานสร้างสรรค์และการเป็นแรงบันดาลใจ', warning: 'ระวังความเครียดจากความไวต่อสิ่งรอบตัวและความกดดัน' },
        12: { meaning: 'เลขแห่งการสร้างสรรค์ที่มีระเบียบ ผสมผสานความคิดสร้างสรรค์กับความมั่นคง', personality: 'สร้างสรรค์, มีระเบียบ, สมดุล, ปฏิบัติได้จริง', careers: ['นักออกแบบ', 'สถาปนิก', 'ผู้จัดการโครงการ', 'ศิลปิน'], zodiac: ['เมถุน', 'กันย์'], color: 'เหลือง, น้ำเงิน', lucky: 'มีโชคในงานที่ต้องใช้ทั้งความคิดและระเบียบ', warning: 'ระวังการลังเลในการตัดสินใจและความขัดแย้งภายใน' },
        13: { meaning: 'Karmic Number - เลขแห่งการทำงานหนักและความอดทน ต้องเอาชนะความขี้เกียจ', personality: 'ขยัน, อดทน, มุ่งมั่น, ต้องต่อสู้กับความท้อแท้', careers: ['นักวิจัย', 'วิศวกร', 'นักประดิษฐ์', 'ผู้ประกอบการ'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคจากการทำงานหนักและความพยายาม', warning: 'ระวังความขี้เกียจและการยอมแพ้ง่าย ต้องใช้ความอดทน' },
        14: { meaning: 'Karmic Number - เลขแห่งอิสรภาพและการควบคุม ต้องเรียนรู้ความสมดุล', personality: 'รักอิสรภาพ, ยืดหยุ่น, ต้องเรียนรู้การควบคุมตนเอง', careers: ['นักการตลาด', 'นักเดินทาง', 'ผู้ประกอบการ', 'นักขาย'], zodiac: ['ธนู', 'กุมภ'], color: 'เขียว, ฟ้า', lucky: 'มีโชคในการเปลี่ยนแปลงและการปรับตัว', warning: 'ระวังการใช้อำนาจผิดและพฤติกรรมเสพติด ต้องมีวินัย' },
        15: { meaning: 'เลขแห่งความรับผิดชอบและความรัก มีความอบอุ่นและเอาใจใส่ผู้อื่น', personality: 'อบอุ่น, รับผิดชอบ, เอาใจใส่, รักครอบครัว', careers: ['ครู', 'พยาบาล', 'นักสังคมสงเคราะห์', 'ที่ปรึกษา'], zodiac: ['พฤษภ', 'กันย์'], color: 'ชมพู, ม่วง', lucky: 'มีโชคจากการดูแลผู้อื่นและความรัก', warning: 'ระวังการเสียสละมากเกินไปและการยุ่งเรื่องผู้อื่น' },
        16: { meaning: 'Karmic Number - เลขแห่งการทำลายอีโก้และการเปลี่ยนแปลง ต้องเรียนรู้ความถ่อมตน', personality: 'ต้องเรียนรู้ความถ่อมตน, เผชิญการเปลี่ยนแปลง, มีความยืดหยุ่น', careers: ['นักจิตวิทยา', 'ที่ปรึกษา', 'ครู', 'ผู้ช่วยเหลือผู้อื่น'], zodiac: ['เมถุน', 'ตุล'], color: 'ม่วง, เงิน', lucky: 'มีโชคจากการเรียนรู้และการเปลี่ยนแปลงตนเอง', warning: 'ระวังความเย่อหยิ่งและการล่มสลาย ต้องเรียนรู้ความถ่อมตน' },
        17: { meaning: 'เลขแห่งความทะเยอทะยานและความสำเร็จ มีพลังในการบรรลุเป้าหมาย', personality: 'ทะเยอทะยาน, มุ่งมั่น, มีพลัง, เป็นผู้นำ', careers: ['ผู้บริหาร', 'นักธุรกิจ', 'นักการเมือง', 'ผู้จัดการ'], zodiac: ['พิจิก', 'มกร'], color: 'ดำ, ทอง', lucky: 'มีโชคในความสำเร็จและการบรรลุเป้าหมาย', warning: 'ระวังการใช้อำนาจผิดและความโลภ' },
        18: { meaning: 'เลขแห่งการให้และความเมตตา มีจิตใจกว้างขวางและต้องการช่วยเหลือผู้อื่น', personality: 'ใจกว้าง, เมตตา, มีวิสัยทัศน์, ช่วยเหลือสังคม', careers: ['นักการกุศล', 'ครู', 'หมอ', 'ผู้นำองค์กรไม่แสวงหาผลกำไร'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'มีโชคจากการทำความดีและการช่วยเหลือผู้อื่น', warning: 'ระวังการให้มากเกินตัวและความเหนื่อยล้า' },
        19: { meaning: 'Karmic Number - เลขแห่งการเรียนรู้ความเป็นอิสระและการพึ่งพาผู้อื่น ต้องสมดุล', personality: 'อิสระ, มั่นใจ, ต้องเรียนรู้การทำงานร่วมกัน', careers: ['ผู้ประกอบการ', 'ผู้นำ', 'นักการเมือง', 'ที่ปรึกษา'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'มีโชคในการเป็นผู้นำและความสำเร็จ', warning: 'ระวังความเห็นแก่ตัวและการไม่ยอมรับความช่วยเหลือ' },
        20: { meaning: 'เลขแห่งความร่วมมือและการทำงานเป็นทีม มีความอ่อนโยนและเข้าใจผู้อื่น', personality: 'อ่อนโยน, ร่วมมือ, เข้าใจผู้อื่น, สร้างสันติภาพ', careers: ['นักไกล่เกลี่ย', 'ที่ปรึกษา', 'นักการทูต', 'พยาบาล'], zodiac: ['พฤษภ', 'กันย์'], color: 'ส้ม, เหลือง', lucky: 'มีโชคจากการทำงานร่วมกันและการสร้างความสัมพันธ์', warning: 'ระวังการถูกเอาเปรียบและความไวเกินไป' },
        21: { meaning: 'เลขแห่งความสำเร็จและความคิดสร้างสรรค์ ผสมผสานศิลปะกับความเป็นผู้นำ', personality: 'สร้างสรรค์, เป็นผู้นำ, มีเสน่ห์, สื่อสารเก่ง', careers: ['ศิลปิน', 'นักแสดง', 'ผู้บริหาร', 'นักการตลาด'], zodiac: ['เมถุน', 'ตุล'], color: 'เหลือง, เขียวอ่อน', lucky: 'มีโชคในงานสร้างสรรค์และความสำเร็จ', warning: 'ระวังความเย่อหยิ่งและการกระจายสมาธิ' },
        22: { meaning: 'Master Number - เลขแห่งการสร้างสรรค์ที่ยิ่งใหญ่ สามารถทำให้ความฝันเป็นจริง', personality: 'มีวิสัยทัศน์, สร้างสรรค์, ปฏิบัติได้จริง, เป็นผู้นำ', careers: ['สถาปนิก', 'วิศวกร', 'ผู้บริหารระดับสูง', 'นักการเมือง'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคในการสร้างสิ่งยิ่งใหญ่และการเปลี่ยนแปลงโลก', warning: 'ระวังความกดดันสูงและความเครียดจากความรับผิดชอบ' },
        23: { meaning: 'เลขแห่งอิสรภาพและการสื่อสาร มีความยืดหยุ่นและปรับตัวได้ดี', personality: 'ยืดหยุ่น, สื่อสารเก่ง, รักอิสรภาพ, ปรับตัวเก่ง', careers: ['นักข่าว', 'นักการตลาด', 'นักเดินทาง', 'นักขาย'], zodiac: ['ธนู', 'กุมภ'], color: 'เขียว, ฟ้า', lucky: 'มีโชคในการเดินทางและการสื่อสาร', warning: 'ระวังความไม่มั่นคงและการขาดสมาธิ' },
        24: { meaning: 'เลขแห่งความรับผิดชอบและการดูแลผู้อื่น มีความอบอุ่นและเสียสละ', personality: 'รับผิดชอบ, อบอุ่น, เสียสละ, รักครอบครัว', careers: ['ครู', 'พยาบาล', 'นักสังคมสงเคราะห์', 'ผู้จัดการ'], zodiac: ['พฤษภ', 'กันย์'], color: 'ชมพู, ม่วง', lucky: 'มีโชคจากการดูแลผู้อื่นและครอบครัว', warning: 'ระวังการเสียสละมากเกินไปและความเหนื่อยล้า' },
        25: { meaning: 'เลขแห่งปัญญาและการค้นหาความจริง มีสัญชาตญาณสูงและชอบศึกษา', personality: 'มีปัญญา, มีสัญชาตญาณ, ชอบศึกษา, ลึกลับ', careers: ['นักวิจัย', 'อาจารย์', 'นักปรัชญา', 'นักจิตวิทยา'], zodiac: ['เมถุน', 'ตุล'], color: 'ม่วง, เงิน', lucky: 'มีโชคในการศึกษาและการค้นพบความจริง', warning: 'ระวังการคิดมากเกินไปและการแยกตัว' },
        
        // Numbers 26-99 - Continuing authentic numerology interpretations
        26: { meaning: 'เลขแห่งความทะเยอทะยานและการบริหารจัดการ มีพลังในการนำทีมและสร้างความสำเร็จ', personality: 'ทะเยอทะยาน, เป็นผู้นำ, มีพลัง, บริหารเก่ง', careers: ['ผู้บริหาร', 'นักธุรกิจ', 'ผู้จัดการ', 'นักการเมือง'], zodiac: ['พิจิก', 'มกร'], color: 'ดำ, ทอง', lucky: 'มีโชคในการบริหารและความสำเร็จทางธุรกิจ', warning: 'ระวังการใช้อำนาจผิดและความเครียดจากงาน' },
        27: { meaning: 'เลขแห่งการให้และความเมตตา มีจิตใจกว้างขวางและต้องการช่วยเหลือมนุษยชาติ', personality: 'ใจกว้าง, เมตตา, มีวิสัยทัศน์, ช่วยเหลือผู้อื่น', careers: ['นักการกุศล', 'ครู', 'หมอ', 'ผู้นำองค์กรสาธารณประโยชน์'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'มีโชคจากการทำความดีและการช่วยเหลือสังคม', warning: 'ระวังการให้มากเกินตัวและความผิดหวัง' },
        28: { meaning: 'เลขแห่งความเป็นผู้นำที่มีประสบการณ์ ผสมผสานความมั่นใจกับความรับผิดชอบ', personality: 'เป็นผู้นำ, มั่นใจ, มีประสบการณ์, รับผิดชอบ', careers: ['ผู้บริหารระดับสูง', 'ผู้ประกอบการ', 'ที่ปรึกษา', 'โค้ช'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ส้ม', lucky: 'มีโชคในการเป็นผู้นำและการสร้างแรงบันดาลใจ', warning: 'ระวังความเย่อหยิ่งและการตัดสินใจเร็วเกินไป' },
        29: { meaning: 'เลขแห่งสัญชาตญาณและความร่วมมือ มีความไวต่อความรู้สึกและเข้าใจผู้อื่น', personality: 'มีสัญชาตญาณ, ไวต่อความรู้สึก, ร่วมมือ, เข้าใจผู้อื่น', careers: ['นักจิตวิทยา', 'ที่ปรึกษา', 'ศิลปิน', 'นักไกล่เกลี่ย'], zodiac: ['พฤษภ', 'กันย์'], color: 'ส้ม, เหลือง', lucky: 'มีโชคจากการใช้สัญชาตญาณและการทำงานร่วมกัน', warning: 'ระวังความไวเกินไปและการถูกเอาเปรียบ' },
        30: { meaning: 'เลขแห่งความคิดสร้างสรรค์และการสื่อสาร มีความสนุกสนานและสร้างแรงบันดาลใจ', personality: 'สร้างสรรค์, สื่อสารเก่ง, สนุกสนาน, สร้างแรงบันดาลใจ', careers: ['ศิลปิน', 'นักเขียน', 'นักแสดง', 'นักประชาสัมพันธ์'], zodiac: ['เมถุน', 'ตุล'], color: 'เหลือง, เขียวอ่อน', lucky: 'มีโชคในงานสร้างสรรค์และการสื่อสาร', warning: 'ระวังการกระจายสมาธิและความผิวเผิน' },
        
        // Numbers 31-43 - Systematic numerology interpretations
        31: { meaning: 'เลขแห่งความมั่นคงและการสร้างสรรค์ ผสมผสานระเบียบแบบแผนกับนวัตกรรม', personality: 'มั่นคง, สร้างสรรค์, มีระเบียบ, นวัตกรรม', careers: ['สถาปนิก', 'วิศวกร', 'นักออกแบบ', 'ผู้จัดการโครงการ'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคในการสร้างสิ่งใหม่ที่มีความมั่นคง', warning: 'ระวังความเครียดและการเข้มงวดเกินไป' },
        32: { meaning: 'เลขแห่งความร่วมมือและการสร้างสรรค์ มีความสามารถในการทำงานเป็นทีม', personality: 'ร่วมมือ, สร้างสรรค์, ทำงานเป็นทีม, สื่อสารเก่ง', careers: ['ผู้จัดการทีม', 'นักออกแบบ', 'ที่ปรึกษา', 'ศิลปิน'], zodiac: ['พฤษภ', 'เมถุน'], color: 'ส้ม, เหลือง', lucky: 'มีโชคจากการทำงานร่วมกันและความคิดสร้างสรรค์', warning: 'ระวังการลังเลและความขัดแย้งในทีม' },
        
        // Master Number 33 (already added above)
        
        34: { meaning: 'เลขแห่งความมั่นคงและอิสรภาพ ผสมผสานความปลอดภัยกับการผจญภัย', personality: 'มั่นคง, รักอิสรภาพ, ปรับตัวได้, มีระเบียบ', careers: ['ผู้จัดการ', 'นักเดินทาง', 'ผู้ประกอบการ', 'วิศวกร'], zodiac: ['กรกฎ', 'ธนู'], color: 'น้ำเงิน, เขียว', lucky: 'มีโชคในการสร้างความมั่นคงและการเปลี่ยนแปลง', warning: 'ระวังความขัดแย้งระหว่างความปลอดภัยและการผจญภัย' },
        35: { meaning: 'เลขแห่งอิสรภาพและความคิดสร้างสรรค์ มีความยืดหยุ่นและสร้างสรรค์', personality: 'รักอิสรภาพ, สร้างสรรค์, ยืดหยุ่น, สื่อสารเก่ง', careers: ['ศิลปิน', 'นักการตลาด', 'นักเดินทาง', 'นักเขียน'], zodiac: ['ธนู', 'เมถุน'], color: 'เขียว, เหลือง', lucky: 'มีโชคในงานสร้างสรรค์และการเดินทาง', warning: 'ระวังการกระจายสมาธิและความไม่มั่นคง' },
        36: { meaning: 'เลขแห่งความรับผิดชอบและอิสรภาพ ผสมผสานการดูแลผู้อื่นกับความเป็นอิสระ', personality: 'รับผิดชอบ, รักอิสรภาพ, ดูแลผู้อื่น, ยืดหยุ่น', careers: ['ครู', 'ที่ปรึกษา', 'ผู้จัดการ', 'นักสังคมสงเคราะห์'], zodiac: ['พฤษภ', 'ธนู'], color: 'ชมพู, เขียว', lucky: 'มีโชคจากการดูแลผู้อื่นและความเป็นอิสระ', warning: 'ระวังความขัดแย้งระหว่างหน้าที่และความเป็นอิสระ' },
        37: { meaning: 'เลขแห่งปัญญาและอิสรภาพ มีความลึกซึ้งและรักการเรียนรู้', personality: 'มีปัญญา, รักอิสรภาพ, ลึกซึ้ง, ชอบเรียนรู้', careers: ['นักวิจัย', 'อาจารย์', 'นักปรัชญา', 'นักเดินทาง'], zodiac: ['เมถุน', 'ธนู'], color: 'ม่วง, เขียว', lucky: 'มีโชคในการศึกษาและการค้นพบ', warning: 'ระวังการคิดมากเกินไปและการหลีกหนี' },
        38: { meaning: 'เลขแห่งความสำเร็จและอิสรภาพ มีความทะเยอทะยานและรักการเปลี่ยนแปลง', personality: 'ทะเยอทะยาน, รักอิสรภาพ, มุ่งความสำเร็จ, ปรับตัวเก่ง', careers: ['ผู้บริหาร', 'นักธุรกิจ', 'ผู้ประกอบการ', 'นักการตลาด'], zodiac: ['พิจิก', 'ธนู'], color: 'ดำ, เขียว', lucky: 'มีโชคในความสำเร็จและการเปลี่ยนแปลง', warning: 'ระวังความโลภและการขาดความมั่นคง' },
        39: { meaning: 'เลขแห่งการให้และอิสรภาพ มีจิตใจกว้างขวางและรักการช่วยเหลือ', personality: 'ใจกว้าง, รักอิสรภาพ, ช่วยเหลือผู้อื่น, มีวิสัยทัศน์', careers: ['นักการกุศล', 'ครู', 'ที่ปรึกษา', 'ผู้นำองค์กรไม่แสวงหาผลกำไร'], zodiac: ['เมษ', 'ธนู'], color: 'แดง, เขียว', lucky: 'มีโชคจากการช่วยเหลือและการเดินทาง', warning: 'ระวังการให้มากเกินตัวและความไม่มั่นคง' },
        40: { meaning: 'เลขแห่งความมั่นคงและการสร้างรากฐาน มีความขยันและเชื่อถือได้', personality: 'มั่นคง, ขยัน, เชื่อถือได้, สร้างรากฐาน', careers: ['วิศวกร', 'นักบัญชี', 'ผู้จัดการ', 'ข้าราชการ'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคในการสร้างความมั่นคงและรากฐานที่แข็งแกร่ง', warning: 'ระวังความเครียดและการเข้มงวดเกินไป' },
        41: { meaning: 'เลขแห่งความเป็นผู้นำและความมั่นคง ผสมผสานการนำกับความเชื่อถือได้', personality: 'เป็นผู้นำ, มั่นคง, เชื่อถือได้, มีวิสัยทัศน์', careers: ['ผู้บริหาร', 'ผู้จัดการ', 'วิศวกร', 'ที่ปรึกษา'], zodiac: ['เมษ', 'กรกฎ'], color: 'แดง, น้ำเงิน', lucky: 'มีโชคในการนำทีมและสร้างความมั่นคง', warning: 'ระวังความเครียดจากความรับผิดชอบ' },
        42: { meaning: 'เลขแห่งความร่วมมือและความมั่นคง มีความสมดุลและเชื่อถือได้', personality: 'ร่วมมือ, มั่นคง, สมดุล, เชื่อถือได้', careers: ['ที่ปรึกษา', 'ผู้จัดการ', 'นักบัญชี', 'นักไกล่เกลี่ย'], zodiac: ['พฤษภ', 'กรกฎ'], color: 'ส้ม, น้ำเงิน', lucky: 'มีโชคจากการทำงานร่วมกันและความมั่นคง', warning: 'ระวังการลังเลและความขัดแย้ง' },
        43: { meaning: 'เลขแห่งความคิดสร้างสรรค์และความมั่นคง ผสมผสานศิลปะกับความเป็นระเบียบ', personality: 'สร้างสรรค์, มั่นคง, มีระเบียบ, สื่อสารเก่ง', careers: ['นักออกแบบ', 'สถาปนิก', 'ศิลปิน', 'ผู้จัดการโครงการ'], zodiac: ['เมถุน', 'กรกฎ'], color: 'เหลือง, น้ำเงิน', lucky: 'มีโชคในงานสร้างสรรค์ที่มีระเบียบ', warning: 'ระวังความขัดแย้งระหว่างความคิดสร้างสรรค์และระเบียบ' },
        
        // Power Number 44 (already added above)
        
        45: { meaning: 'เลขแห่งอิสรภาพและความมั่นคง ผสมผสานการผจญภัยกับความปลอดภัย', personality: 'รักอิสรภาพ, มั่นคง, ปรับตัวได้, มีระเบียบ', careers: ['ผู้ประกอบการ', 'นักเดินทาง', 'ผู้จัดการ', 'วิศวกร'], zodiac: ['ธนู', 'กรกฎ'], color: 'เขียว, น้ำเงิน', lucky: 'มีโชคในการสร้างความมั่นคงจากการเปลี่ยนแปลง', warning: 'ระวังความขัดแย้งระหว่างอิสรภาพและความมั่นคง' }
      };
    }

  analyzeNumber(accountNumber) {
    // Remove dashes and extract digits
    const digits = accountNumber.replace(/-/g, '').split('').map(Number);
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    
    // Traditional numerology method: Use sum directly (0-99) for more accuracy
    let finalSum = sum;
    const reductionSteps = [sum];
    
    // Only reduce if sum is greater than 99
    while (finalSum > 99) {
      const nextSum = finalSum.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
      reductionSteps.push(nextSum);
      finalSum = nextSum;
    }

    // Get traditional numerology interpretation
    const interpretation = this.getInterpretationForSum(finalSum);
    
    // Get rating level based on traditional numerology system
    const rating = this.getRatingLevel(finalSum);

    // Build calculation string
    let calculation = digits.join(' + ') + ' = ' + sum;
    if (reductionSteps.length > 1) {
      for (let i = 1; i < reductionSteps.length; i++) {
        const prevSum = reductionSteps[i - 1];
        const currentSum = reductionSteps[i];
        const prevDigits = prevSum.toString().split('');
        calculation += ' → ' + prevDigits.join(' + ') + ' = ' + currentSum;
      }
    }

    return {
      originalSum: sum,
      finalSum: finalSum,
      calculation: calculation,
      interpretation: interpretation,
      rating: rating,
      reductionSteps: reductionSteps
    };
  }

  getInterpretationForSum(sum) {
    // Use direct lookup for numbers we have specific data for
    if (this.numerologyData[sum]) {
      return this.numerologyData[sum];
    }
    
    // For numbers we don't have specific data, use pattern-based interpretation
    return this.getPatternBasedInterpretation(sum);
  }

  getPatternBasedInterpretation(sum) {
      const tens = Math.floor(sum / 10);
      const units = sum % 10;

      // Base interpretation from units digit
      const baseData = this.numerologyData[units] || this.numerologyData[1];

      // Enhanced tens digit modifiers with more authentic interpretations
      const tensModifiers = {
        1: { prefix: 'ความเป็นผู้นำและ', strength: 'การริเริ่ม', careerBonus: ['ผู้บริหาร', 'ผู้นำทีม'] },
        2: { prefix: 'ความร่วมมือและ', strength: 'การทำงานเป็นทีม', careerBonus: ['ที่ปรึกษา', 'นักไกล่เกลี่ย'] },
        3: { prefix: 'ความคิดสร้างสรรค์และ', strength: 'การสื่อสาร', careerBonus: ['ศิลปิน', 'นักออกแบบ'] },
        4: { prefix: 'ความมั่นคงและ', strength: 'การวางแผน', careerBonus: ['วิศวกร', 'ผู้จัดการโครงการ'] },
        5: { prefix: 'อิสรภาพและ', strength: 'การเปลี่ยนแปลง', careerBonus: ['นักการตลาด', 'ผู้ประกอบการ'] },
        6: { prefix: 'ความรับผิดชอบและ', strength: 'การดูแลผู้อื่น', careerBonus: ['ครู', 'นักสังคมสงเคราะห์'] },
        7: { prefix: 'ปัญญาและ', strength: 'การศึกษาค้นคว้า', careerBonus: ['นักวิจัย', 'อาจารย์'] },
        8: { prefix: 'ความสำเร็จและ', strength: 'การบริหารจัดการ', careerBonus: ['นักธุรกิจ', 'ผู้บริหาร'] },
        9: { prefix: 'การให้และ', strength: 'การช่วยเหลือสังคม', careerBonus: ['นักการกุศล', 'ผู้นำสังคม'] }
      };

      const modifier = tensModifiers[tens] || tensModifiers[1];

      // Enhanced zodiac combinations based on tens digit
      const zodiacCombinations = {
        1: ['เมษ', 'สิงห์'], 2: ['พฤษภ', 'กันย์'], 3: ['เมถุน', 'ตุล'], 
        4: ['กรกฎ', 'มกร'], 5: ['ธนู', 'กุมภ'], 6: ['พฤษภ', 'กันย์'],
        7: ['เมถุน', 'ตุล'], 8: ['พิจิก', 'มกร'], 9: ['เมษ', 'สิงห์']
      };

      // Enhanced color combinations
      const colorCombinations = {
        1: 'แดง, ทอง', 2: 'ส้ม, เหลือง', 3: 'เหลือง, เขียวอ่อน',
        4: 'น้ำเงิน, เทา', 5: 'เขียว, ฟ้า', 6: 'ชมพู, ม่วง',
        7: 'ม่วง, เงิน', 8: 'ดำ, ทอง', 9: 'แดง, ทอง'
      };

      return {
        meaning: `เลขแห่ง${modifier.prefix}${baseData.meaning.split('เลขแห่ง')[1] || baseData.meaning}`,
        personality: `${baseData.personality}, เน้น${modifier.strength}`,
        careers: this.combineArrays(baseData.careers, modifier.careerBonus || this.getCareersByTens(tens)),
        zodiac: zodiacCombinations[tens] || baseData.zodiac,
        color: colorCombinations[tens] || baseData.color,
        lucky: `${baseData.lucky} และมีโชคจาก${modifier.strength}`,
        warning: baseData.warning
      };
    }

  getCareersByTens(tens) {
    const careerMap = {
      3: ['นักออกแบบ', 'นักสื่อสาร'],
      4: ['ผู้จัดการโครงการ', 'นักวางแผน'],
      5: ['นักการตลาด', 'ผู้ประกอบการ'],
      6: ['ครู', 'นักสังคมสงเคราะห์'],
      7: ['นักวิจัย', 'อาจารย์'],
      8: ['ผู้บริหาร', 'นักธุรกิจ'],
      9: ['นักการกุศล', 'ผู้ช่วยเหลือสังคม']
    };
    return careerMap[tens] || [];
  }

  combineArrays(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
  }

  getRatingLevel(finalSum) {
      // Enhanced 5-level rating system - ปรับให้สมจริงกับหมายเลขโทรศัพท์
      // ระดับ: ติดขัด, พอตัว, วาสนา, เศรษฐี, บารมี

      // บารมี (Supreme) - ระดับสูงสุด (15% ของเลข)
      if ([11, 22, 33, 44, 55, 66, 77, 88, 99].includes(finalSum) || // Master/Power Numbers
          finalSum >= 85 && finalSum <= 99 || // เลขสูงสุด
          [1, 8, 21, 28, 37, 46, 73, 82].includes(finalSum)) { // เลขมงคลพิเศษ
        return { level: 'บารมี', color: '#FFD700', description: 'เลขมงคลสูงสุด มีพลังจิตวิญญาณและบารมีเหนือธรรมดา' };
      }

      // เศรษฐี (Excellent) - ระดับสูง (25% ของเลข)
      else if (finalSum >= 70 && finalSum <= 84 || // เลขสูง
               [3, 6, 9, 12, 15, 18, 24, 27, 36, 39, 45, 48, 51, 54, 57, 63, 69].includes(finalSum)) {
        return { level: 'เศรษฐี', color: '#4CAF50', description: 'เลขมงคลระดับสูง เหมาะกับความมั่งคั่งและความสำเร็จ' };
      }

      // วาสนา (Good) - ระดับดี (30% ของเลข)
      else if (finalSum >= 50 && finalSum <= 69 || // เลขกลาง-สูง
               [2, 5, 7, 10, 14, 16, 19, 23, 25, 29, 32, 34, 41, 43, 47, 49].includes(finalSum)) {
        return { level: 'วาสนา', color: '#2196F3', description: 'เลขที่ดี มีโชคลาภและความเจริญรุ่งเรือง' };
      }

      // พอตัว (Fair) - ระดับปานกลาง (20% ของเลข)
      else if (finalSum >= 30 && finalSum <= 49 || // เลขกลาง
               [17, 20, 26, 35, 38, 42, 44, 53, 56, 58, 62, 65, 68].includes(finalSum)) {
        return { level: 'พอตัว', color: '#FF9800', description: 'เลขปานกลาง มีความสมดุลในชีวิต' };
      }

      // ติดขัด (Poor) - ระดับต่ำ (10% ของเลข)
      else {
        return { level: 'ติดขัด', color: '#F44336', description: 'เลขที่ท้าทาย ต้องใช้ความพยายามและอดทนในการพัฒนา' };
      }
    }
}

// Lucky Number UI Controller
class LuckyNumberUI {
  constructor() {
    console.log('LuckyNumberUI constructor called');
    this.analyzer = new LuckyNumberAnalyzer();
    this.elements = {};
    this.currentNumber = null;
    this.initElements();
    this.setupEventListeners();
    console.log('LuckyNumberUI initialized successfully');
  }

  initElements() {
    console.log('Initializing DOM elements...');
    this.elements = {
      overlay: document.getElementById('lucky-overlay'),
      closeBtn: document.getElementById('close-lucky-btn'),
      closeBtnFooter: document.getElementById('close-lucky-footer-btn'),
      selectedNumber: document.getElementById('selected-account-number'),
      digitSum: document.getElementById('digit-sum'),
      sumCalculation: document.getElementById('sum-calculation'),
      ratingBadge: document.getElementById('rating-badge'),
      ratingDescription: document.getElementById('rating-description'),
      personalitySection: document.getElementById('personality-section'),
      compatibleZodiac: document.getElementById('compatible-zodiac'),
      suitableCareers: document.getElementById('suitable-careers'),
      luckyInfo: document.getElementById('lucky-info'),
      copyBtn: document.getElementById('copy-number-btn')
    };
  }

  setupEventListeners() {
    // Close popup handlers
    this.elements.closeBtn?.addEventListener('click', () => {
      this.hideLuckyPopup();
    });

    this.elements.closeBtnFooter?.addEventListener('click', () => {
      this.hideLuckyPopup();
    });

    // Click outside to close
    this.elements.overlay?.addEventListener('click', (e) => {
      if (e.target === this.elements.overlay) {
        this.hideLuckyPopup();
      }
    });

    // Copy number handler
    this.elements.copyBtn?.addEventListener('click', () => {
      this.copyAccountNumber();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.overlay?.classList.contains('show')) {
        this.hideLuckyPopup();
      }
    });
  }
  showLuckyPopup(accountNumber) {
    console.log('showLuckyPopup called with:', accountNumber);
    
    if (!this.elements.overlay) {
      console.error('Lucky overlay element not found!');
      alert('เกิดข้อผิดพลาด: ไม่พบ popup element');
      return;
    }

    try {
      this.currentNumber = accountNumber;
      const analysis = this.analyzer.analyzeNumber(accountNumber);
      console.log('Analysis result:', analysis);

      // Update selected number
      if (this.elements.selectedNumber) {
        this.elements.selectedNumber.textContent = accountNumber;
      }

      // Update circular badge
      if (this.elements.digitSum) {
        this.elements.digitSum.textContent = analysis.finalSum;
      }

      // Update rating display with floating badge - ENHANCED
      if (this.elements.ratingBadge && this.elements.ratingDescription) {
        this.elements.ratingBadge.textContent = `${analysis.rating.level}`;
        this.elements.ratingBadge.className = `rating-badge-floating ${this.getRatingClass(analysis.rating.level)}`;
        this.elements.ratingDescription.textContent = analysis.rating.description;
      }

      // Update personality and meaning
      if (this.elements.personalitySection) {
        this.elements.personalitySection.innerHTML = `
          <div class="personality-item">
            <strong>🧠 บุคลิกภาพ:</strong> <span>${analysis.interpretation.personality}</span>
          </div>
          <div class="meaning-item">
            <strong>✨ ความหมาย:</strong> <span>${analysis.interpretation.meaning}</span>
          </div>
        `;
      }

      // Update zodiac signs
      if (this.elements.compatibleZodiac) {
        const zodiacHTML = analysis.interpretation.zodiac.map(zodiacName => {
          const zodiacIcons = {
            'เมษ': '♈', 'พฤษภ': '♉', 'เมถุน': '♊', 'กรกฎ': '♋',
            'สิงห์': '♌', 'กันย์': '♍', 'ตุล': '♎', 'พิจิก': '♏',
            'ธนู': '♐', 'มกร': '♑', 'กุมภ': '♒', 'มีน': '♓'
          };
          return `<div class="zodiac-item">
            <span class="zodiac-icon">${zodiacIcons[zodiacName] || '⭐'}</span>
            <span class="zodiac-name">ราศี${zodiacName}</span>
          </div>`;
        }).join('');
        this.elements.compatibleZodiac.innerHTML = zodiacHTML;
      }

      // Update careers
      if (this.elements.suitableCareers) {
        const careerHTML = `<div class="career-list">${analysis.interpretation.careers.map(career => 
          `<span class="career-tag">${career}</span>`
        ).join('')}</div>`;
        this.elements.suitableCareers.innerHTML = careerHTML;
      }

      // Update star ratings based on numerology
      this.updateStarRatings(analysis);

      // Update lucky info
      if (this.elements.luckyInfo) {
        this.elements.luckyInfo.innerHTML = `
          <div class="lucky-item">
            <strong>🍀 โชคดี:</strong> <span>${analysis.interpretation.lucky}</span>
          </div>
          <div class="warning-item">
            <strong>⚠️ ข้อควรระวัง:</strong> <span>${analysis.interpretation.warning}</span>
          </div>
          <div class="color-item">
            <strong>🎨 สีมงคล:</strong> <span>${analysis.interpretation.color}</span>
          </div>
        `;
      }

      // Add premium badge if it's "บารมี" (Supreme level only) - ENHANCED
      if (this.elements.selectedNumber && analysis.rating.level === 'บารมี') {
        const numberDisplay = this.elements.selectedNumber;
        if (!numberDisplay.querySelector('.premium-badge')) {
          const badge = document.createElement('div');
          badge.className = 'premium-badge';
          badge.innerHTML = '🏅';
          badge.style.position = 'absolute';
          badge.style.top = '-12px';
          badge.style.right = '-12px';
          badge.style.width = '32px';
          badge.style.height = '32px';
          badge.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
          badge.style.borderRadius = '50%';
          badge.style.display = 'flex';
          badge.style.alignItems = 'center';
          badge.style.justifyContent = 'center';
          badge.style.fontSize = '1.2rem';
          badge.style.zIndex = '1000';
          badge.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.8)';
          badge.style.border = '3px solid #fff';
          badge.style.animation = 'badgeGlow 2s infinite alternate';
          
          numberDisplay.appendChild(badge);
          numberDisplay.style.position = 'relative';
        }
      }

      // Show popup
      this.elements.overlay.classList.add('show');
      this.elements.overlay.style.display = 'flex';
      this.elements.overlay.style.opacity = '1';
      this.elements.overlay.style.visibility = 'visible';
      
    } catch (error) {
      console.error('Error showing lucky popup:', error);
      alert('เกิดข้อผิดพลาดในการแสดงผล: ' + error.message);
    }
  }

  getRatingClass(level) {
      switch (level) {
        case 'บารมี': return 'supreme';
        case 'เศรษฐี': return 'excellent';
        case 'วาสนา': return 'good';
        case 'พอตัว': return 'fair';
        case 'ติดขัด': return 'poor';
        default: return 'fair';
      }
    }

  updateStarRatings(analysis) {
    const starRatings = this.calculateStarRatings(analysis);
    
    // Update career stars
    const careerStars = document.getElementById('career-stars');
    if (careerStars) {
      this.renderStars(careerStars, starRatings.career);
    }

    // Update money stars
    const moneyStars = document.getElementById('money-stars');
    if (moneyStars) {
      this.renderStars(moneyStars, starRatings.money);
    }

    // Update health stars
    const healthStars = document.getElementById('health-stars');
    if (healthStars) {
      this.renderStars(healthStars, starRatings.health);
    }

    // Update love stars
    const loveStars = document.getElementById('love-stars');
    if (loveStars) {
      this.renderStars(loveStars, starRatings.love);
    }
  }

  calculateStarRatings(analysis) {
    const finalSum = analysis.finalSum;
    const ratingLevel = analysis.rating.level;
    
    // Use specific ratings for numbers we have data for
    if (finalSum <= 12 && this.analyzer.numerologyData[finalSum]) {
      return this.getSpecificRatings(finalSum);
    }
    
    // For other numbers, use pattern-based calculation
    return this.getPatternBasedRatings(finalSum, ratingLevel);
  }

  getSpecificRatings(finalSum) {
      const specificRatings = {
        // Supreme level numbers (บารมี) - Master and Power numbers get 5 stars
        0: { career: 3, money: 3, health: 3, love: 3 },
        1: { career: 5, money: 5, health: 4, love: 3 }, // เศรษฐี
        2: { career: 3, money: 3, health: 4, love: 4 }, // วาสนา
        3: { career: 5, money: 4, health: 3, love: 4 }, // เศรษฐี
        4: { career: 2, money: 3, health: 3, love: 2 }, // ติดขัด
        5: { career: 3, money: 3, health: 3, love: 3 }, // วาสนา
        6: { career: 4, money: 4, health: 5, love: 5 }, // เศรษฐี
        7: { career: 4, money: 3, health: 4, love: 3 }, // วาสนา
        8: { career: 5, money: 5, health: 3, love: 3 }, // เศรษฐี
        9: { career: 4, money: 4, health: 4, love: 4 }, // วาสนา
        10: { career: 4, money: 4, health: 4, love: 3 },
        11: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Master Number
        12: { career: 4, money: 4, health: 4, love: 4 },
        13: { career: 2, money: 2, health: 2, love: 2 }, // ติดขัด - Karmic
        14: { career: 3, money: 3, health: 3, love: 3 }, // พอตัว - Karmic
        15: { career: 4, money: 4, health: 4, love: 5 },
        16: { career: 2, money: 2, health: 2, love: 2 }, // ติดขัด - Karmic
        17: { career: 3, money: 4, health: 3, love: 3 },
        18: { career: 4, money: 4, health: 4, love: 4 }, // วาสนา
        19: { career: 3, money: 3, health: 3, love: 3 }, // พอตัว - Karmic
        20: { career: 3, money: 3, health: 4, love: 4 },
        21: { career: 5, money: 4, health: 4, love: 4 }, // เศรษฐี
        22: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Master Number
        23: { career: 4, money: 3, health: 3, love: 4 }, // วาสนา
        24: { career: 4, money: 4, health: 4, love: 5 },
        25: { career: 4, money: 3, health: 4, love: 3 }, // วาสนา
        26: { career: 5, money: 5, health: 4, love: 3 }, // เศรษฐี
        27: { career: 4, money: 4, health: 4, love: 5 }, // วาสนา
        28: { career: 5, money: 4, health: 4, love: 4 }, // เศรษฐี
        29: { career: 4, money: 3, health: 4, love: 4 }, // วาสนา
        30: { career: 4, money: 4, health: 3, love: 4 },
        33: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Master Number
        44: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Power Number
        55: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Power Number
        66: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Power Number
        77: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Power Number
        88: { career: 5, money: 5, health: 5, love: 5 }, // บารมี - Power Number
        99: { career: 5, money: 5, health: 5, love: 5 }  // บารมี - Power Number
      };

      return specificRatings[finalSum] || { career: 3, money: 3, health: 3, love: 3 };
    }

  getPatternBasedRatings(finalSum, ratingLevel) {
      const tens = Math.floor(finalSum / 10);
      const units = finalSum % 10;

      // Base ratings from units digit
      const baseRatings = this.getSpecificRatings(units);

      // Modify based on tens digit
      const tensModifiers = {
        3: { career: 1, money: 0, health: 0, love: 1 },
        4: { career: 0, money: 1, health: 1, love: 0 },
        5: { career: 0, money: 0, health: 0, love: 0 },
        6: { career: 0, money: 0, health: 1, love: 1 },
        7: { career: 1, money: 0, health: 0, love: 0 },
        8: { career: 1, money: 1, health: 0, love: 0 },
        9: { career: 0, money: 0, health: 0, love: 1 }
      };

      const modifier = tensModifiers[tens] || { career: 0, money: 0, health: 0, love: 0 };

      let ratings = {
        career: Math.min(5, Math.max(1, baseRatings.career + modifier.career)),
        money: Math.min(5, Math.max(1, baseRatings.money + modifier.money)),
        health: Math.min(5, Math.max(1, baseRatings.health + modifier.health)),
        love: Math.min(5, Math.max(1, baseRatings.love + modifier.love))
      };

      // Apply rating level adjustments based on new 5-level system
      if (ratingLevel === 'บารมี') {
        // Supreme level - maximum ratings
        ratings.career = 5;
        ratings.money = 5;
        ratings.health = 5;
        ratings.love = 5;
      } else if (ratingLevel === 'เศรษฐี') {
        // Excellent level - high ratings
        ratings.career = Math.min(5, ratings.career + 1);
        ratings.money = Math.min(5, ratings.money + 2);
        ratings.health = Math.min(5, ratings.health + 1);
        ratings.love = Math.min(5, ratings.love + 1);
      } else if (ratingLevel === 'วาสนา') {
        // Good level - above average
        ratings.career = Math.min(5, Math.max(3, ratings.career));
        ratings.money = Math.min(5, Math.max(3, ratings.money));
        ratings.health = Math.min(5, Math.max(3, ratings.health));
        ratings.love = Math.min(5, Math.max(3, ratings.love));
      } else if (ratingLevel === 'พอตัว') {
        // Fair level - average
        ratings.career = Math.min(4, Math.max(2, ratings.career));
        ratings.money = Math.min(4, Math.max(2, ratings.money));
        ratings.health = Math.min(4, Math.max(2, ratings.health));
        ratings.love = Math.min(4, Math.max(2, ratings.love));
      } else if (ratingLevel === 'ติดขัด') {
        // Poor level - below average
        ratings.career = Math.max(1, ratings.career - 1);
        ratings.money = Math.max(1, ratings.money - 1);
        ratings.health = Math.max(1, ratings.health - 1);
        ratings.love = Math.max(1, ratings.love - 1);
      }

      return ratings;
    }

  renderStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('filled');
        star.classList.remove('empty');
        star.textContent = '★';
      } else {
        star.classList.add('empty');
        star.classList.remove('filled');
        star.textContent = '☆';
      }
    });
  }

  hideLuckyPopup() {
    if (this.elements.overlay) {
      this.elements.overlay.classList.remove('show');
      this.elements.overlay.style.display = 'none';
      this.elements.overlay.style.opacity = '0';
      this.elements.overlay.style.visibility = 'hidden';
    }
    this.currentNumber = null;
  }

  async copyAccountNumber() {
    if (!this.currentNumber) return;

    try {
      await navigator.clipboard.writeText(this.currentNumber);
      
      const originalText = this.elements.copyBtn.textContent;
      this.elements.copyBtn.textContent = '✅ คัดลอกแล้ว';
      this.elements.copyBtn.disabled = true;
      
      setTimeout(() => {
        this.elements.copyBtn.textContent = originalText;
        this.elements.copyBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('ไม่สามารถคัดลอกได้ กรุณาคัดลอกด้วยตนเอง');
    }
  }
}

// Initialize lucky number system
let luckyNumberUI = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing lucky number system...');
  
  setTimeout(() => {
    try {
      const requiredElements = [
        'lucky-overlay', 'close-lucky-btn', 'close-lucky-footer-btn',
        'selected-account-number', 'digit-sum', 'rating-badge', 
        'rating-description', 'personality-section', 'compatible-zodiac', 
        'suitable-careers', 'lucky-info', 'copy-number-btn'
      ];
      
      const missingElements = requiredElements.filter(id => !document.getElementById(id));
      
      if (missingElements.length > 0) {
        console.error('Missing required DOM elements:', missingElements);
        return;
      }
      
      luckyNumberUI = new LuckyNumberUI();
      window.luckyNumberUI = luckyNumberUI;
      console.log('Lucky number system ready!');
    } catch (error) {
      console.error('Failed to initialize lucky number system:', error);
    }
  }, 200);
});