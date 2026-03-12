/**
 * Lucky Number Analysis System - Based on Man Karin's Numerology
 * แมน การิน (Man Karin) - Famous Thai Numerologist
 */

class LuckyNumberAnalyzer {
  constructor() {
    // Man Karin's Numerology System - ระบบเลขศาสตร์แมน การิน
    this.manKarinNumbers = {
      1: {
        meaning: 'เลขแห่งผู้นำ มีความมุ่งมั่น เด็ดขาด ชอบความท้าทาย มีความคิดสร้างสรรค์ เป็นคนที่มีความเป็นผู้นำสูง',
        personality: 'ผู้นำ, มุ่งมั่น, เด็ดขาด',
        careers: ['ผู้บริหาร', 'นักการเมือง', 'ผู้ประกอบการ', 'หัวหน้างาน', 'ผู้อำนวยการ'],
        zodiac: ['เมษ', 'สิงห์', 'ธนู'],
        color: 'แดง, ทอง',
        lucky: 'เหมาะกับการเป็นผู้นำ มีโชคในการลงทุน ธุรกิจ',
        warning: 'ระวังความเย่อหยิ่ง อย่าเอาแต่ใจตัวเอง'
      },
      2: {
        meaning: 'เลขแห่งความร่วมมือ มีความอ่อนโยน เข้าใจผู้อื่น ชอบทำงานเป็นทีม มีความเมตตากรุณา เป็นคนใจดี',
        personality: 'อ่อนโยน, เข้าใจผู้อื่น, ทำงานเป็นทีม',
        careers: ['ที่ปรึกษา', 'นักจิตวิทยา', 'พยาบาล', 'ครู', 'งานบริการ', 'นักสังคมสงเคราะห์'],
        zodiac: ['พฤษภ', 'กันย์', 'มกร'],
        color: 'ส้ม, เหลือง',
        lucky: 'เหมาะกับงานที่ต้องใช้ความอดทน มีโชคจากการช่วยเหลือผู้อื่น',
        warning: 'ระวังการถูกเอาเปรียบ อย่าเสียสละมากเกินไป'
      },
      3: {
        meaning: 'เลขแห่งความคิดสร้างสรรค์ มีความสนุกสนาน ชอบการสื่อสาร มีจินตนาการ เป็นคนร่าเริง มีเสน่ห์',
        personality: 'สร้างสรรค์, สนุกสนาน, สื่อสารเก่ง',
        careers: ['ศิลปิน', 'นักเขียน', 'นักแสดง', 'นักออกแบบ', 'นักสื่อสาร', 'ครีเอทีฟ'],
        zodiac: ['เมถุน', 'ตุล', 'กุมภ'],
        color: 'เหลือง, เขียว',
        lucky: 'มีโชคในงานศิลปะ การแสดง การสื่อสาร',
        warning: 'ระวังการกระจายสมาธิ อย่าทำหลายอย่างพร้อมกัน'
      },
      4: {
        meaning: 'เลขแห่งความมั่นคง มีระเบียบแบบแผน ทำงานหนัก เชื่อถือได้ มีความอดทน เป็นคนจริงจัง',
        personality: 'มั่นคง, มีระเบียบ, ทำงานหนัก',
        careers: ['วิศวกร', 'นักบัญชี', 'ข้าราชการ', 'นักวิทยาศาสตร์', 'ผู้จัดการ', 'ธนาคาร'],
        zodiac: ['กรกฎ', 'พิจิก', 'มีน'],
        color: 'น้ำเงิน, เทา',
        lucky: 'มีโชคในงานที่ต้องใช้ความละเอียด มีเสถียรภาพทางการเงิน',
        warning: 'ระวังความเครียด อย่าเครียดกับงานมากเกินไป'
      },
      5: {
        meaning: 'เลขแห่งอิสรภาพ ชอบการผจญภัย เปลี่ยนแปลง มีความยืดหยุ่น รักการเดินทาง เป็นคนกล้าหาญ',
        personality: 'รักอิสรภาพ, ผจญภัย, ยืดหยุ่น',
        careers: ['นักเดินทาง', 'ไกด์', 'นักขาย', 'นักการตลาด', 'นักข่าว', 'ผู้ประกอบการ'],
        zodiac: ['เมษ', 'สิงห์', 'ธนู'],
        color: 'เขียว, ฟ้า',
        lucky: 'มีโชคในการเดินทาง การค้าขาย การลงทุนใหม่ๆ',
        warning: 'ระวังความไม่มั่นคง อย่าเปลี่ยนแปลงบ่อยเกินไป'
      },
      6: {
        meaning: 'เลขแห่งความรับผิดชอบ รักครอบครัว เอาใจใส่ ชอบช่วยเหลือ มีความเมตตา เป็นคนอบอุ่น',
        personality: 'รับผิดชอบ, รักครอบครัว, ช่วยเหลือผู้อื่น',
        careers: ['แพทย์', 'พยาบาล', 'ครู', 'นักสังคมสงเคราะห์', 'ผู้ดูแลเด็ก', 'งานบริการ'],
        zodiac: ['พฤษภ', 'กันย์', 'มกร'],
        color: 'ชมพู, ม่วง',
        lucky: 'มีโชคจากครอบครัว การช่วยเหลือผู้อื่น งานด้านสุขภาพ',
        warning: 'ระวังการเสียสละมากเกินไป อย่าลืมดูแลตัวเอง'
      },
      7: {
        meaning: 'เลขแห่งปัญญา ชอบการศึกษาค้นคว้า มีสัญชาตญาณ ลึกลับ เป็นคนที่มีความรู้ลึก มีจิตวิญญาณ',
        personality: 'มีปัญญา, ชอบศึกษา, ลึกลับ',
        careers: ['นักวิจัย', 'อาจารย์', 'นักปรัชญา', 'หมอ', 'นักจิตวิทยา', 'นักโหราศาสตร์'],
        zodiac: ['เมถุน', 'ตุล', 'กุมภ'],
        color: 'ม่วง, เงิน',
        lucky: 'มีโชคในการศึกษา การวิจัย งานที่ใช้สมอง',
        warning: 'ระวังการคิดมากเกินไป อย่าแยกตัวจากสังคม'
      },
      8: {
        meaning: 'เลขแห่งความสำเร็จ มีความทะเยอทะยาน ชอบอำนาจ มุ่งเน้นผลสำเร็จ เป็นคนที่มีความมั่งคั่ง',
        personality: 'ทะเยอทะยาน, ชอบอำนาจ, มุ่งความสำเร็จ',
        careers: ['นักธุรกิจ', 'ผู้บริหาร', 'นักการเงิน', 'นักลงทุน', 'ผู้จัดการ', 'ธนาคาร'],
        zodiac: ['กรกฎ', 'พิจิก', 'มีน'],
        color: 'ดำ, ทอง',
        lucky: 'มีโชคในการเงิน ธุรกิจ การลงทุน มีความมั่งคั่ง',
        warning: 'ระวังความโลภ อย่าเอาเงินมาเป็นที่ตั้งของทุกอย่าง'
      },
      9: {
        meaning: 'เลขแห่งการให้ มีจิตใจกว้างขวาง ชอบช่วยเหลือสังคม มีความเมตตา เป็นคนที่มีจิตวิญญาณสูง',
        personality: 'ใจกว้าง, ช่วยเหลือสังคม, มีเมตตา',
        careers: ['ครู', 'หมอ', 'ทนายความ', 'งานสาธารณะ', 'นักสังคมสงเคราะห์', 'นักการกุศล'],
        zodiac: ['เมษ', 'สิงห์', 'ธนู'],
        color: 'แดง, ทอง',
        lucky: 'มีโชคจากการทำความดี ช่วยเหลือผู้อื่น งานสาธารณะ',
        warning: 'ระวังการให้มากเกินตัว อย่าลืมดูแลตัวเองและครอบครัว'
      }
    };
  }

  /**
   * Calculate digit sum using Man Karin's method
   * @param {string} accountNumber - Account number (XXX-XXX-XXXX)
   * @returns {Object} Analysis result based on Man Karin's system
   */
  analyzeNumber(accountNumber) {
    // Remove dashes and extract digits
    const digits = accountNumber.replace(/-/g, '').split('').map(Number);
    const sum = digits.reduce((acc, digit) => acc + digit, 0);
    
    // Man Karin's method: Use sum directly (0-99) for more accuracy
    let finalSum = sum;
    const reductionSteps = [sum];
    
    // Only reduce if sum is greater than 99
    while (finalSum > 99) {
      const nextSum = finalSum.toString().split('').map(Number).reduce((acc, digit) => acc + digit, 0);
      reductionSteps.push(nextSum);
      finalSum = nextSum;
    }

    // Get Man Karin's interpretation
    const interpretation = this.getInterpretationForSum(finalSum);
    
    // Get rating level based on Man Karin's system
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

  /**
   * Get interpretation for sum (0-99)
   * @param {number} sum - Sum value (0-99)
   * @returns {Object} Interpretation based on numerology
   */
  getInterpretationForSum(sum) {
    // Reduce to single digit for base interpretation
    const singleDigit = sum === 0 ? 9 : (sum % 9 === 0 ? 9 : sum % 9);
    const baseInterpretation = this.manKarinNumbers[singleDigit];
    
    // Enhanced interpretation based on full sum (0-99)
    const enhancedMeaning = this.getEnhancedMeaning(sum);
    
    return {
      ...baseInterpretation,
      meaning: enhancedMeaning.meaning,
      personality: enhancedMeaning.personality,
      enhancedSum: sum
    };
  }

  /**
   * Get enhanced meaning based on full sum (0-99)
   * @param {number} sum - Full sum value
   * @returns {Object} Enhanced meaning
   */
  getEnhancedMeaning(sum) {
    // Special meanings for specific ranges
    if (sum >= 80 && sum <= 99) {
      return {
        meaning: 'เลขแห่งความสำเร็จสูงสุด มีพลังแห่งการเป็นผู้นำ ความมั่งคั่ง และการบรรลุเป้าหมาย',
        personality: 'ผู้นำระดับสูง, มีวิสัยทัศน์, ประสบความสำเร็จ'
      };
    } else if (sum >= 60 && sum <= 79) {
      return {
        meaning: 'เลขแห่งความสมดุล มีความรับผิดชอบสูง เป็นที่พึ่งพาได้ มีความเมตตาและปัญญา',
        personality: 'สมดุล, รับผิดชอบ, มีปัญญา'
      };
    } else if (sum >= 40 && sum <= 59) {
      return {
        meaning: 'เลขแห่งความมั่นคงและการเติบโต มีพื้นฐานที่แข็งแกร่ง ทำงานหนัก มีความอดทน',
        personality: 'มั่นคง, ขยัน, อดทน'
      };
    } else if (sum >= 20 && sum <= 39) {
      return {
        meaning: 'เลขแห่งความร่วมมือและการสื่อสาร มีความคิดสร้างสรรค์ ชอบทำงานเป็นทีม',
        personality: 'ร่วมมือ, สร้างสรรค์, สื่อสารดี'
      };
    } else {
      return {
        meaning: 'เลขแห่งการเริ่มต้นใหม่ มีพลังแห่งการสร้างสรรค์ ความมุ่งมั่น และการเป็นผู้นำ',
        personality: 'เริ่มต้นใหม่, สร้างสรรค์, มุ่งมั่น'
      };
    }
  }

  /**
   * Get rating level based on Man Karin's system
   * @param {number} finalSum - Final sum (0-99)
   * @returns {Object} Rating information
   */
  getRatingLevel(finalSum) {
    // Man Karin's enhanced rating system for 0-99 range
    if (finalSum >= 80 && finalSum <= 99) {
      return { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูงสุด เหมาะกับผู้นำและความสำเร็จ' };
    } else if (finalSum >= 60 && finalSum <= 79) {
      return { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับความสมดุลและปัญญา' };
    } else if (finalSum >= 40 && finalSum <= 59) {
      return { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับความมั่นคงและการเติบโต' };
    } else if (finalSum >= 20 && finalSum <= 39) {
      return { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับความร่วมมือและสร้างสรรค์' };
    } else if (finalSum >= 10 && finalSum <= 19) {
      return { level: 'พอใช้', color: '#ff9800', description: 'เลขพอใช้ เหมาะกับการเริ่มต้นใหม่' };
    } else {
      // 0-9 range
      const singleDigitRatings = {
        1: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับผู้นำ' },
        2: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการทำงานร่วมกัน' },
        3: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับงานสร้างสรรค์' },
        4: { level: 'พอใช้', color: '#ff9800', description: 'เลขที่มั่นคง แต่ต้องระวังความเครียด' },
        5: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการเปลี่ยนแปลง' },
        6: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับครอบครัว' },
        7: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการศึกษา' },
        8: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับธุรกิจ' },
        9: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการให้' },
        0: { level: 'พอใช้', color: '#ff9800', description: 'เลขแห่งการเริ่มต้น' }
      };
      
      return singleDigitRatings[finalSum] || { level: 'พอใช้', color: '#ff9800', description: 'เลขทั่วไป' };
    }
  }
}

/**
 * Lucky Number UI Controller
 * Manages the lucky number popup interface
 */
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

  /**
   * Initialize DOM elements
   */
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
    
    console.log('DOM elements found:', {
      overlay: !!this.elements.overlay,
      closeBtn: !!this.elements.closeBtn,
      selectedNumber: !!this.elements.selectedNumber,
      digitSum: !!this.elements.digitSum,
      ratingBadge: !!this.elements.ratingBadge
    });
    
    // Test overlay visibility
    if (this.elements.overlay) {
      console.log('Overlay computed style:', window.getComputedStyle(this.elements.overlay).display);
      console.log('Overlay initial classes:', this.elements.overlay.className);
    }
  }

  /**
   * Setup event listeners
   */
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

  /**
   * Show lucky number analysis popup
   * @param {string} accountNumber - Account number to analyze
   */
  showLuckyPopup(accountNumber) {
    console.log('showLuckyPopup called with:', accountNumber);
    console.log('Overlay element:', this.elements.overlay);
    
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

      // Update digit sum
      if (this.elements.digitSum) {
        this.elements.digitSum.textContent = analysis.finalSum;
      }

      // Update rating display
      if (this.elements.ratingBadge && this.elements.ratingDescription) {
        this.elements.ratingBadge.textContent = `ผลรวมระดับ${analysis.rating.level}`;
        this.elements.ratingBadge.style.backgroundColor = analysis.rating.color;
        this.elements.ratingDescription.textContent = analysis.rating.description;
      }

      // Update personality and meaning (Man Karin's interpretation)
      if (this.elements.personalitySection) {
        this.elements.personalitySection.innerHTML = `
          <div class="personality-item">
            <strong>บุคลิกภาพ:</strong> <span>${analysis.interpretation.personality}</span>
          </div>
          <div class="meaning-item">
            <strong>ความหมาย:</strong> <span>${analysis.interpretation.meaning}</span>
          </div>
        `;
      }

      // Update zodiac signs (Man Karin's compatible zodiac)
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

      // Update careers (Man Karin's suitable careers)
      if (this.elements.suitableCareers) {
        const careerHTML = `<div class="career-list">${analysis.interpretation.careers.map(career => 
          `<span class="career-tag">${career}</span>`
        ).join('')}</div>`;
        this.elements.suitableCareers.innerHTML = careerHTML;
      }

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

      // Add premium badge to the selected number if it's "ดีมาก"
      if (this.elements.selectedNumber && analysis.rating.level === 'ดีมาก') {
        const numberDisplay = this.elements.selectedNumber;
        if (!numberDisplay.querySelector('.premium-badge')) {
          const badge = document.createElement('div');
          badge.className = 'premium-badge';
          badge.innerHTML = '👑 PREMIUM';
          numberDisplay.appendChild(badge);
        }
      }

      // Show popup with force display
      this.elements.overlay.classList.add('show');
      this.elements.overlay.style.display = 'flex';
      this.elements.overlay.style.opacity = '1';
      this.elements.overlay.style.visibility = 'visible';
      console.log('Popup should be visible now, overlay classes:', this.elements.overlay.className);
      console.log('Overlay inline styles:', this.elements.overlay.style.cssText);
      
    } catch (error) {
      console.error('Error showing lucky popup:', error);
      alert('เกิดข้อผิดพลาดในการแสดงผล: ' + error.message);
    }
  }

  /**
   * Hide lucky number popup
   */
  hideLuckyPopup() {
    if (this.elements.overlay) {
      this.elements.overlay.classList.remove('show');
      this.elements.overlay.style.display = 'none';
      this.elements.overlay.style.opacity = '0';
      this.elements.overlay.style.visibility = 'hidden';
    }
    this.currentNumber = null;
  }

  /**
   * Copy account number to clipboard
   */
  async copyAccountNumber() {
    if (!this.currentNumber) return;

    try {
      await navigator.clipboard.writeText(this.currentNumber);
      
      // Show success feedback
      const originalText = this.elements.copyBtn.textContent;
      this.elements.copyBtn.textContent = '✅ คัดลอกแล้ว';
      this.elements.copyBtn.disabled = true;
      
      setTimeout(() => {
        this.elements.copyBtn.textContent = originalText;
        this.elements.copyBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('Failed to copy:', error);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.currentNumber;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        const originalText = this.elements.copyBtn.textContent;
        this.elements.copyBtn.textContent = '✅ คัดลอกแล้ว';
        setTimeout(() => {
          this.elements.copyBtn.textContent = originalText;
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        alert('ไม่สามารถคัดลอกได้ กรุณาคัดลอกด้วยตนเอง');
      }
      
      document.body.removeChild(textArea);
    }
  }
}

// Initialize lucky number system
let luckyNumberUI = null;

// Initialize when DOM is loaded - with proper error handling
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing lucky number system...');
  
  // Add delay to ensure all other scripts are loaded
  setTimeout(() => {
    try {
      // Check if all required DOM elements exist
      const requiredElements = [
        'lucky-overlay', 'close-lucky-btn', 'close-lucky-footer-btn',
        'selected-account-number', 'digit-sum', 'sum-calculation',
        'rating-badge', 'rating-description', 'personality-section', 
        'compatible-zodiac', 'suitable-careers', 'lucky-info', 'copy-number-btn'
      ];
      
      const missingElements = requiredElements.filter(id => !document.getElementById(id));
      
      if (missingElements.length > 0) {
        console.error('Missing required DOM elements:', missingElements);
        return;
      }
      
      luckyNumberUI = new LuckyNumberUI();
      // Export for global access after initialization
      window.luckyNumberUI = luckyNumberUI;
      console.log('Lucky number system ready!');
    } catch (error) {
      console.error('Failed to initialize lucky number system:', error);
    }
  }, 200);
});