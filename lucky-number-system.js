/**
 * Lucky Number Analysis System - Enhanced Traditional Thai Numerology
 * 
 * This system combines traditional Thai numerology wisdom with comprehensive
 * interpretations for numbers 0-99, providing detailed analysis for:
 * - แมน การิน: Modern numerology approach with personality-based interpretations
 * - หมอช้าง: Traditional astrology combined with number analysis, expert in high-value numbers
 * - หมอลักษณ์: Master number specialist, expert in special combinations and patterns
 * 
 * Enhanced Features:
 * - Detailed ratings for all numbers 10-99
 * - Master Numbers (11, 22, 33, 44, 55, 66, 77, 88, 99) with special significance
 * - Traditional Thai numerology principles
 * - Comprehensive star rating system for career, money, health, and love
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

      // Update circular badge
      if (this.elements.digitSum) {
        this.elements.digitSum.textContent = analysis.finalSum;
      }

      // Update rating display with floating badge
      if (this.elements.ratingBadge && this.elements.ratingDescription) {
        this.elements.ratingBadge.textContent = `ระดับ${analysis.rating.level}`;
        this.elements.ratingBadge.className = `rating-badge-floating ${this.getRatingClass(analysis.rating.level)}`;
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

      // Add premium badge to the selected number if it's "ดีมาก"
      if (this.elements.selectedNumber && analysis.rating.level === 'ดีมาก') {
        const numberDisplay = this.elements.selectedNumber;
        if (!numberDisplay.querySelector('.premium-badge')) {
          const badge = document.createElement('div');
          badge.className = 'premium-badge';
          badge.innerHTML = '🏅'; // Gold medal emoji
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
   * Get CSS class for rating level
   * @param {string} level - Rating level (ดีมาก, ดี, พอใช้)
   * @returns {string} CSS class name
   */
  getRatingClass(level) {
    switch (level) {
      case 'ดีมาก': return 'excellent';
      case 'ดี': return 'good';
      case 'พอใช้': return 'fair';
      default: return 'fair';
    }
  }

  /**
   * Update star ratings based on numerology analysis
   * @param {Object} analysis - Numerology analysis result
   */
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

  /**
   * Calculate star ratings based on numerology analysis
   * Enhanced system inspired by traditional Thai numerology principles
   * Incorporates detailed interpretations for numbers 10-99 range
   * @param {Object} analysis - Numerology analysis result
   * @returns {Object} Star ratings for each category
   */
  calculateStarRatings(analysis) {
    const finalSum = analysis.finalSum;
    const ratingLevel = analysis.rating.level;
    const singleDigit = finalSum === 0 ? 9 : (finalSum % 9 === 0 ? 9 : finalSum % 9);
    
    // Enhanced detailed ratings for numbers 10-99 based on traditional Thai numerology
    const detailedRatings = this.getDetailedRatings(finalSum);
    
    if (detailedRatings) {
      return detailedRatings;
    }
    
    // Base ratings from traditional numerology system for single digits
    const baseRatings = {
      1: { career: 5, money: 5, health: 4, love: 3 }, // ผู้นำ - เก่งการงาน การเงิน
      2: { career: 3, money: 3, health: 5, love: 5 }, // ความร่วมมือ - ดีด้านสุขภาพ ความรัก
      3: { career: 5, money: 4, health: 3, love: 4 }, // ความคิดสร้างสรรค์ - เก่งการงาน
      4: { career: 4, money: 5, health: 5, love: 3 }, // ความมั่นคง - ดีด้านการเงิน สุขภาพ
      5: { career: 4, money: 3, health: 3, love: 3 }, // อิสรภาพ - ปานกลางทุกด้าน
      6: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบ - ดีด้านสุขภาพ ความรัก
      7: { career: 5, money: 3, health: 4, love: 3 }, // ปัญญา - เก่งการงาน
      8: { career: 5, money: 5, health: 3, love: 3 }, // ความสำเร็จ - เก่งการงาน การเงิน
      9: { career: 4, money: 4, health: 4, love: 5 }  // การให้ - ดีด้านความรัก
    };

    // Get base ratings
    let ratings = { ...baseRatings[singleDigit] };

    // Apply rating level adjustments
    if (ratingLevel === 'ดีมาก') {
      // Boost all ratings for excellent numbers
      ratings.career = Math.min(5, ratings.career + 1);
      ratings.money = Math.min(5, ratings.money + 1);
      ratings.health = Math.min(5, ratings.health + 1);
      ratings.love = Math.min(5, ratings.love + 1);
    } else if (ratingLevel === 'พอใช้') {
      // Reduce ratings for fair numbers
      ratings.career = Math.max(1, ratings.career - 1);
      ratings.money = Math.max(1, ratings.money - 1);
      ratings.health = Math.max(1, ratings.health - 1);
      ratings.love = Math.max(1, ratings.love - 1);
    }

    return ratings;
  }

  /**
   * Get detailed ratings for specific numbers 10-99
   * Based on traditional Thai numerology interpretations
   * @param {number} finalSum - The final sum (10-99)
   * @returns {Object|null} Detailed ratings or null if not found
   */
  getDetailedRatings(finalSum) {
    // Detailed ratings for numbers 10-99 based on traditional Thai numerology
    const detailedRatingsMap = {
      // Numbers 10-19: New beginnings and leadership
      10: { career: 4, money: 4, health: 3, love: 3 }, // เลขแห่งการเริ่มต้นใหม่
      11: { career: 5, money: 4, health: 4, love: 5 }, // Master Number - ความเป็นผู้นำ
      12: { career: 4, money: 3, health: 4, love: 4 }, // ความร่วมมือและสร้างสรรค์
      13: { career: 3, money: 3, health: 3, love: 3 }, // ความท้าทายและการเปลี่ยนแปลง
      14: { career: 4, money: 3, health: 3, love: 4 }, // อิสรภาพและการผจญภัย
      15: { career: 3, money: 4, health: 4, love: 5 }, // ความรับผิดชอบและครอบครัว
      16: { career: 4, money: 3, health: 4, love: 3 }, // ปัญญาและการศึกษา
      17: { career: 5, money: 4, health: 3, love: 3 }, // ความสำเร็จและอำนาจ
      18: { career: 4, money: 4, health: 4, love: 4 }, // การให้และความเมตตา
      19: { career: 4, money: 4, health: 3, love: 4 }, // การสิ้นสุดและเริ่มต้นใหม่

      // Numbers 20-29: Cooperation and relationships
      20: { career: 3, money: 3, health: 4, love: 5 }, // ความร่วมมือสูงสุด
      21: { career: 4, money: 4, health: 4, love: 4 }, // ความสมดุลและความสำเร็จ
      22: { career: 5, money: 5, health: 4, love: 4 }, // Master Number - นักสร้าง
      23: { career: 4, money: 3, health: 3, love: 4 }, // ความคิดสร้างสรรค์และสื่อสาร
      24: { career: 4, money: 4, health: 5, love: 4 }, // ความมั่นคงและการทำงานหนัก
      25: { career: 3, money: 3, health: 3, love: 3 }, // การเปลี่ยนแปลงและอิสรภาพ
      26: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบและการดูแล
      27: { career: 5, money: 3, health: 4, love: 3 }, // ปัญญาและความเข้าใจลึก
      28: { career: 5, money: 5, health: 3, love: 3 }, // ความสำเร็จทางธุรกิจ
      29: { career: 4, money: 4, health: 4, love: 5 }, // การให้และความเมตตา

      // Numbers 30-39: Creativity and expression
      30: { career: 5, money: 4, health: 3, love: 4 }, // ความคิดสร้างสรรค์สูงสุด
      31: { career: 4, money: 4, health: 4, love: 3 }, // ความเป็นผู้นำที่สร้างสรรค์
      32: { career: 4, money: 3, health: 4, love: 5 }, // ความร่วมมือและการสื่อสาร
      33: { career: 5, money: 4, health: 5, love: 5 }, // Master Number - ครูผู้ยิ่งใหญ่
      34: { career: 4, money: 4, health: 4, love: 3 }, // ความมั่นคงและสร้างสรรค์
      35: { career: 4, money: 3, health: 3, love: 4 }, // อิสรภาพและการแสดงออก
      36: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบและศิลปะ
      37: { career: 5, money: 3, health: 4, love: 3 }, // ปัญญาและความคิดสร้างสรรค์
      38: { career: 5, money: 5, health: 3, love: 3 }, // ความสำเร็จและการแสดงออก
      39: { career: 4, money: 4, health: 4, love: 5 }, // การให้และความสร้างสรรค์

      // Numbers 40-49: Stability and hard work
      40: { career: 4, money: 5, health: 5, love: 3 }, // ความมั่นคงสูงสุด
      41: { career: 4, money: 4, health: 4, love: 3 }, // ความเป็นผู้นำที่มั่นคง
      42: { career: 3, money: 4, health: 5, love: 4 }, // ความร่วมมือและมั่นคง
      43: { career: 4, money: 4, health: 4, love: 4 }, // ความคิดสร้างสรรค์และมั่นคง
      44: { career: 5, money: 5, health: 5, love: 3 }, // Master Number - นักสร้างที่ยิ่งใหญ่
      45: { career: 4, money: 4, health: 4, love: 3 }, // อิสรภาพและความมั่นคง
      46: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบและมั่นคง
      47: { career: 5, money: 4, health: 5, love: 3 }, // ปัญญาและความมั่นคง
      48: { career: 5, money: 5, health: 4, love: 3 }, // ความสำเร็จและมั่นคง
      49: { career: 4, money: 4, health: 5, love: 4 }, // การให้และความมั่นคง

      // Numbers 50-59: Freedom and adventure
      50: { career: 4, money: 3, health: 3, love: 3 }, // อิสรภาพสูงสุด
      51: { career: 4, money: 4, health: 3, love: 3 }, // ความเป็นผู้นำที่อิสระ
      52: { career: 3, money: 3, health: 4, love: 4 }, // ความร่วมมือและอิสรภาพ
      53: { career: 4, money: 3, health: 3, love: 4 }, // ความคิดสร้างสรรค์และอิสรภาพ
      54: { career: 4, money: 4, health: 4, love: 3 }, // ความมั่นคงและอิสรภาพ
      55: { career: 5, money: 4, health: 3, love: 4 }, // Master Number - อิสรภาพที่ยิ่งใหญ่
      56: { career: 3, money: 4, health: 4, love: 5 }, // ความรับผิดชอบและอิสรภาพ
      57: { career: 5, money: 3, health: 3, love: 3 }, // ปัญญาและอิสรภาพ
      58: { career: 5, money: 4, health: 3, love: 3 }, // ความสำเร็จและอิสรภาพ
      59: { career: 4, money: 3, health: 3, love: 4 }, // การให้และอิสรภาพ

      // Numbers 60-69: Responsibility and nurturing
      60: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบสูงสุด
      61: { career: 4, money: 4, health: 4, love: 4 }, // ความเป็นผู้นำที่รับผิดชอบ
      62: { career: 3, money: 3, health: 5, love: 5 }, // ความร่วมมือและการดูแล
      63: { career: 4, money: 4, health: 4, love: 5 }, // ความคิดสร้างสรรค์และการดูแล
      64: { career: 4, money: 4, health: 5, love: 4 }, // ความมั่นคงและการดูแล
      65: { career: 3, money: 3, health: 4, love: 4 }, // อิสรภาพและการดูแล
      66: { career: 3, money: 4, health: 5, love: 5 }, // Master Number - ผู้ดูแลที่ยิ่งใหญ่
      67: { career: 4, money: 3, health: 5, love: 4 }, // ปัญญาและการดูแล
      68: { career: 4, money: 5, health: 4, love: 4 }, // ความสำเร็จและการดูแล
      69: { career: 4, money: 4, health: 5, love: 5 }, // การให้และการดูแล

      // Numbers 70-79: Wisdom and spirituality
      70: { career: 5, money: 3, health: 4, love: 3 }, // ปัญญาสูงสุด
      71: { career: 5, money: 4, health: 4, love: 3 }, // ความเป็นผู้นำที่มีปัญญา
      72: { career: 4, money: 3, health: 4, love: 4 }, // ความร่วมมือและปัญญา
      73: { career: 5, money: 3, health: 3, love: 4 }, // ความคิดสร้างสรรค์และปัญญา
      74: { career: 5, money: 4, health: 4, love: 3 }, // ความมั่นคงและปัญญา
      75: { career: 4, money: 3, health: 3, love: 3 }, // อิสรภาพและปัญญา
      76: { career: 4, money: 3, health: 4, love: 4 }, // ความรับผิดชอบและปัญญา
      77: { career: 5, money: 4, health: 4, love: 4 }, // Master Number - ปัญญาที่ยิ่งใหญ่
      78: { career: 5, money: 4, health: 4, love: 3 }, // ความสำเร็จและปัญญา
      79: { career: 5, money: 3, health: 4, love: 4 }, // การให้และปัญญา

      // Numbers 80-89: Material success and power
      80: { career: 5, money: 5, health: 3, love: 3 }, // ความสำเร็จสูงสุด
      81: { career: 5, money: 5, health: 4, love: 3 }, // ความเป็นผู้นำที่ประสบความสำเร็จ
      82: { career: 4, money: 4, health: 4, love: 4 }, // ความร่วมมือและความสำเร็จ
      83: { career: 5, money: 4, health: 3, love: 4 }, // ความคิดสร้างสรรค์และความสำเร็จ
      84: { career: 5, money: 5, health: 4, love: 3 }, // ความมั่นคงและความสำเร็จ
      85: { career: 5, money: 4, health: 3, love: 3 }, // อิสรภาพและความสำเร็จ
      86: { career: 4, money: 5, health: 4, love: 4 }, // ความรับผิดชอบและความสำเร็จ
      87: { career: 5, money: 4, health: 4, love: 3 }, // ปัญญาและความสำเร็จ
      88: { career: 5, money: 5, health: 4, love: 4 }, // Master Number - ความสำเร็จที่ยิ่งใหญ่
      89: { career: 5, money: 5, health: 4, love: 4 }, // การให้และความสำเร็จ

      // Numbers 90-99: Universal love and completion
      90: { career: 4, money: 4, health: 4, love: 5 }, // การให้สูงสุด
      91: { career: 5, money: 4, health: 4, love: 4 }, // ความเป็นผู้นำที่ให้
      92: { career: 4, money: 3, health: 4, love: 5 }, // ความร่วมมือและการให้
      93: { career: 5, money: 4, health: 3, love: 5 }, // ความคิดสร้างสรรค์และการให้
      94: { career: 4, money: 4, health: 4, love: 4 }, // ความมั่นคงและการให้
      95: { career: 4, money: 3, health: 3, love: 4 }, // อิสรภาพและการให้
      96: { career: 3, money: 4, health: 5, love: 5 }, // ความรับผิดชอบและการให้
      97: { career: 5, money: 3, health: 4, love: 4 }, // ปัญญาและการให้
      98: { career: 5, money: 5, health: 4, love: 4 }, // ความสำเร็จและการให้
      99: { career: 5, money: 5, health: 5, love: 5 }, // Master Number - ความสมบูรณ์แบบ
    };

    return detailedRatingsMap[finalSum] || null;
  }

  /**
   * Render stars in a container
   * @param {HTMLElement} container - Container element
   * @param {number} rating - Rating (1-5)
   */
  renderStars(container, rating) {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('filled');
        star.classList.remove('empty');
        star.textContent = '★'; // Filled star
      } else {
        star.classList.add('empty');
        star.classList.remove('filled');
        star.textContent = '☆'; // Empty star
      }
    });
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