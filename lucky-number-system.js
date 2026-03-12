// Lucky Number Analysis System - Traditional Numerology
// This system uses traditional numerology principles based on ancient wisdom
// and universal number meanings that have been practiced across cultures.

class LuckyNumberAnalyzer {
  constructor() {
    // Complete Numerology System 0-99 - ระบบเลขศาสตร์ครบถ้วน 0-99
    this.numerologyData = {
      0: { meaning: 'เลขแห่งศักยภาพที่ไม่จำกัด มีความเป็นไปได้ทุกอย่าง เป็นจุดเริ่มต้นของทุกสิ่ง', personality: 'ลึกลับ, มีศักยภาพ, เปิดกว้าง', careers: ['นักปรัชญา', 'นักจิตวิทยา', 'ที่ปรึกษา'], zodiac: ['มีน', 'กรกฎ'], color: 'ขาว, เงิน', lucky: 'มีโชคในการเริ่มต้นใหม่', warning: 'ระวังความไม่แน่นอน' },
      1: { meaning: 'เลขแห่งผู้นำและการเริ่มต้น มีความมุ่งมั่น เด็ดขาด เป็นอิสระ มีความคิดริเริ่ม', personality: 'ผู้นำ, มุ่งมั่น, อิสระ', careers: ['ผู้บริหาร', 'ผู้ประกอบการ', 'นักการเมือง'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'เหมาะกับการเป็นผู้นำ', warning: 'ระวังความเย่อหยิ่ง' },
      2: { meaning: 'เลขแห่งความร่วมมือและความสมดุล มีความอ่อนโยน เข้าใจผู้อื่น ชอบทำงานเป็นทีม', personality: 'อ่อนโยน, ร่วมมือ, อดทน', careers: ['ที่ปรึกษา', 'นักการทูต', 'พยาบาล'], zodiac: ['พฤษภ', 'กันย์'], color: 'ส้ม, เหลือง', lucky: 'มีโชคจากการช่วยเหลือผู้อื่น', warning: 'ระวังการถูกเอาเปรียบ' },
      3: { meaning: 'เลขแห่งความคิดสร้างสรรค์และการสื่อสาร มีความสนุกสนาน ร่าเริง มีจินตนาการ', personality: 'สร้างสรรค์, สื่อสารเก่ง, ร่าเริง', careers: ['ศิลปิน', 'นักเขียน', 'นักแสดง'], zodiac: ['เมถุน', 'ตุล'], color: 'เหลือง, เขียวอ่อน', lucky: 'มีโชคในงานศิลปะ', warning: 'ระวังการกระจายสมาธิ' },
      4: { meaning: 'เลขแห่งความมั่นคงและระเบียบแบบแผน มีความขยัน ทำงานหนัก เชื่อถือได้', personality: 'มั่นคง, ขยัน, เชื่อถือได้', careers: ['วิศวกร', 'นักบัญชี', 'ข้าราชการ'], zodiac: ['กรกฎ', 'มกร'], color: 'น้ำเงิน, เทา', lucky: 'มีโชคในงานที่ต้องความละเอียด', warning: 'ระวังความเครียด' },
      5: { meaning: 'เลขแห่งอิสรภาพและการผจญภัย ชอบการเปลี่ยนแปลง มีความยืดหยุ่น รักการเดินทาง', personality: 'รักอิสรภาพ, ผจญภัย, ยืดหยุ่น', careers: ['นักเดินทาง', 'นักขาย', 'นักการตลาด'], zodiac: ['ธนู', 'กุมภ'], color: 'เขียว, ฟ้า', lucky: 'มีโชคในการเดินทาง', warning: 'ระวังความไม่มั่นคง' },
      6: { meaning: 'เลขแห่งความรับผิดชอบและความรัก รักครอบครัว เอาใจใส่ ชอบช่วยเหลือ', personality: 'รับผิดชอบ, รักครอบครัว, เมตตา', careers: ['แพทย์', 'พยาบาล', 'ครู'], zodiac: ['พฤษภ', 'กันย์'], color: 'ชมพู, ม่วง', lucky: 'มีโชคจากครอบครัว', warning: 'ระวังการเสียสละมากเกินไป' },
      7: { meaning: 'เลขแห่งปัญญาและจิตวิญญาณ ชอบการศึกษาค้นคว้า มีสัญชาตญาณ ลึกลับ', personality: 'มีปัญญา, ลึกลับ, ชอบศึกษา', careers: ['นักวิจัย', 'อาจารย์', 'นักปรัชญา'], zodiac: ['เมถุน', 'ตุล'], color: 'ม่วง, เงิน', lucky: 'มีโชคในการศึกษา', warning: 'ระวังการคิดมากเกินไป' },
      8: { meaning: 'เลขแห่งความสำเร็จและอำนาจ มีความทะเยอทะยาน ชอบอำนาจ มุ่งเน้นผลสำเร็จ', personality: 'ทะเยอทะยาน, มุ่งความสำเร็จ, มีอำนาจ', careers: ['นักธุรกิจ', 'ผู้บริหาร', 'นักการเงิน'], zodiac: ['พิจิก', 'มกร'], color: 'ดำ, ทอง', lucky: 'มีโชคในการเงิน', warning: 'ระวังความโลภ' },
      9: { meaning: 'เลขแห่งการให้และความสมบูรณ์ มีจิตใจกว้างขวาง ชอบช่วยเหลือสังคม มีความเมตตา', personality: 'ใจกว้าง, ช่วยเหลือสังคม, มีเมตตา', careers: ['ครู', 'หมอ', 'ทนายความ'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ทอง', lucky: 'มีโชคจากการทำความดี', warning: 'ระวังการให้มากเกินตัว' },
      10: { meaning: 'เลขแห่งการเริ่มต้นใหม่ด้วยประสบการณ์ มีความมั่นใจ กล้าหาญ เป็นผู้นำที่มีวุฒิภาวะ', personality: 'มั่นใจ, กล้าหาญ, มีประสบการณ์', careers: ['ผู้จัดการ', 'ที่ปรึกษา', 'โค้ช'], zodiac: ['เมษ', 'สิงห์'], color: 'แดง, ส้ม', lucky: 'มีโชคในการนำทีม', warning: 'ระวังการตัดสินใจเร็วเกินไป' },
      11: { meaning: 'Master Number - เลขแห่งสัญชาตญาณและการเป็นแรงบันดาลใจ มีพลังจิตสูง มีวิสัยทัศน์', personality: 'มีสัญชาตญาณ, เป็นแรงบันดาลใจ, ละเอียดอ่อน', careers: ['นักจิตวิทยา', 'ศิลปิน', 'นักเขียน'], zodiac: ['กุมภ', 'มีน'], color: 'เงิน, ขาว', lucky: 'มีโชคในงานสร้างสรรค์', warning: 'ระวังความเครียดจากความไวต่อสิ่งรอบตัว' },
      12: { meaning: 'เลขแห่งการสร้างสรรค์ที่มีระเบียบ ผสมผสานความคิดสร้างสรรค์กับความมั่นคง', personality: 'สร้างสรรค์, มีระเบียบ, สมดุล', careers: ['นักออกแบบ', 'สถาปนิก', 'ผู้จัดการโครงการ'], zodiac: ['เมถุน', 'กันย์'], color: 'เหลือง, น้ำเงิน', lucky: 'มีโชคในงานที่ต้องใช้ทั้งความคิดและระเบียบ', warning: 'ระวังการลังเลในการตัดสินใจ' }
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
    
    // Modify based on tens digit
    const tensModifiers = {
      3: { prefix: 'ความคิดสร้างสรรค์และ', strength: 'การสื่อสาร' },
      4: { prefix: 'ความมั่นคงและ', strength: 'การวางแผน' },
      5: { prefix: 'อิสรภาพและ', strength: 'การเปลี่ยนแปลง' },
      6: { prefix: 'ความรับผิดชอบและ', strength: 'การดูแลผู้อื่น' },
      7: { prefix: 'ปัญญาและ', strength: 'การศึกษาค้นคว้า' },
      8: { prefix: 'ความสำเร็จและ', strength: 'การบริหารจัดการ' },
      9: { prefix: 'การให้และ', strength: 'การช่วยเหลือสังคม' }
    };
    
    const modifier = tensModifiers[tens] || tensModifiers[1];
    
    return {
      meaning: `เลขแห่ง${modifier.prefix}${baseData.meaning.split('เลขแห่ง')[1] || baseData.meaning}`,
      personality: `${baseData.personality}, เน้น${modifier.strength}`,
      careers: this.combineArrays(baseData.careers, this.getCareersByTens(tens)),
      zodiac: baseData.zodiac,
      color: baseData.color,
      lucky: `${baseData.lucky} และ${modifier.strength}`,
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
    // Enhanced rating system based on numerological significance
    if (finalSum === 11 || finalSum === 22 || finalSum === 33 || finalSum === 44 || 
        finalSum === 55 || finalSum === 66 || finalSum === 77 || finalSum === 88 || finalSum === 99) {
      return { level: 'ดีมาก', color: '#4caf50', description: 'Master Number - เลขมงคลพิเศษ มีพลังจิตสูง' };
    } else if (finalSum >= 80 && finalSum <= 99) {
      return { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูงสุด เหมาะกับความสำเร็จ' };
    } else if (finalSum >= 60 && finalSum <= 79) {
      return { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับความสมดุล' };
    } else if (finalSum >= 40 && finalSum <= 59) {
      return { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับความมั่นคง' };
    } else if (finalSum >= 20 && finalSum <= 39) {
      return { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับความร่วมมือ' };
    } else if (finalSum >= 10 && finalSum <= 19) {
      return { level: 'พอใช้', color: '#ff9800', description: 'เลขพอใช้ เหมาะกับการเริ่มต้น' };
    } else {
      // 0-9 range - use specific ratings
      const singleDigitRatings = {
        0: { level: 'พอใช้', color: '#ff9800', description: 'เลขแห่งศักยภาพ' },
        1: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับผู้นำ' },
        2: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการทำงานร่วมกัน' },
        3: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับงานสร้างสรรค์' },
        4: { level: 'พอใช้', color: '#ff9800', description: 'เลขที่มั่นคง แต่ต้องระวังความเครียด' },
        5: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการเปลี่ยนแปลง' },
        6: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับครอบครัว' },
        7: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการศึกษา' },
        8: { level: 'ดีมาก', color: '#4caf50', description: 'เลขมงคลระดับสูง เหมาะกับธุรกิจ' },
        9: { level: 'ดี', color: '#2196f3', description: 'เลขที่ดี เหมาะกับการให้' }
      };
      
      return singleDigitRatings[finalSum] || { level: 'พอใช้', color: '#ff9800', description: 'เลขทั่วไป' };
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

      // Update rating display with floating badge
      if (this.elements.ratingBadge && this.elements.ratingDescription) {
        this.elements.ratingBadge.textContent = `ระดับ${analysis.rating.level}`;
        this.elements.ratingBadge.className = `rating-badge-floating ${this.getRatingClass(analysis.rating.level)}`;
        this.elements.ratingDescription.textContent = analysis.rating.description;
      }

      // Update personality and meaning
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

      // Add premium badge if it's "ดีมาก"
      if (this.elements.selectedNumber && analysis.rating.level === 'ดีมาก') {
        const numberDisplay = this.elements.selectedNumber;
        if (!numberDisplay.querySelector('.premium-badge')) {
          const badge = document.createElement('div');
          badge.className = 'premium-badge';
          badge.innerHTML = '🏅';
          numberDisplay.appendChild(badge);
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
      case 'ดีมาก': return 'excellent';
      case 'ดี': return 'good';
      case 'พอใช้': return 'fair';
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
      0: { career: 3, money: 3, health: 3, love: 3 },
      1: { career: 5, money: 5, health: 4, love: 3 },
      2: { career: 3, money: 3, health: 5, love: 5 },
      3: { career: 5, money: 4, health: 3, love: 4 },
      4: { career: 4, money: 5, health: 5, love: 3 },
      5: { career: 4, money: 3, health: 3, love: 3 },
      6: { career: 3, money: 4, health: 5, love: 5 },
      7: { career: 5, money: 3, health: 4, love: 3 },
      8: { career: 5, money: 5, health: 3, love: 3 },
      9: { career: 4, money: 4, health: 4, love: 5 },
      10: { career: 4, money: 4, health: 4, love: 3 },
      11: { career: 5, money: 4, health: 4, love: 5 },
      12: { career: 4, money: 4, health: 4, love: 4 }
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
    
    // Apply rating level adjustments
    if (ratingLevel === 'ดีมาก') {
      ratings.career = Math.min(5, ratings.career + 1);
      ratings.money = Math.min(5, ratings.money + 1);
      ratings.health = Math.min(5, ratings.health + 1);
      ratings.love = Math.min(5, ratings.love + 1);
    } else if (ratingLevel === 'พอใช้') {
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