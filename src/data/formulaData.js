// Formula data for Learn page (EN + HI)
// Currently only theq formulas/questions for Class 6 are present in both languages.
// Other classes/chapter formulas remain available from mathClasses in src/data/mathData.js (EN).

export const formulaData = {
  en: {
    // keep structure aligned with mathClasses → classes[] → chapters[]
    'class-6': {
      'c6-1': {
        formulas: [
          { id: 'f1', title: 'Successor', expression: 'n + 1' },
          { id: 'f2', title: 'Predecessor', expression: 'n - 1' },
          { id: 'f3', title: 'Expanded Form', expression: '432 = 400 + 30 + 2' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'What is the successor of 999?',
            options: ['998', '1000', '1001', '990'],
            correctAnswer: 1,
            explanation: 'Successor is obtained by adding 1: 999 + 1 = 1000.'
          },
        ],
      },
      'c6-2': { formulas: [], quizzes: [] },
      'c6-3': {
        formulas: [
          { id: 'f1', title: 'Integers', expression: 'Set of numbers: {..., -3, -2, -1, 0, 1, 2, 3, ...}' },
          { id: 'f2', title: 'Absolute Value', expression: '|a| = a if a ≥ 0, -a if a < 0' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'What is the sum of -5 and 8?',
            options: ['-13', '3', '-3', '13'],
            correctAnswer: 1,
            explanation: 'When signs are different, subtract the numbers and use the sign of the larger number: 8 - 5 = 3.'
          },
        ],
      },
      'c6-4': { formulas: [], quizzes: [] },
      'c6-5': { formulas: [], quizzes: [] },
      'c6-6': { formulas: [], quizzes: [] },
      'c6-7': { formulas: [], quizzes: [] },
      'c6-8': { formulas: [], quizzes: [] },
      'c6-9': { formulas: [], quizzes: [] },
      'c6-10': { formulas: [], quizzes: [] },
      'c6-11': { formulas: [], quizzes: [] },
      'c6-12': { formulas: [], quizzes: [] },
      'c6-13': { formulas: [], quizzes: [] },
      'c6-14': { formulas: [], quizzes: [] },
    },
    'class-10': {
      'c10-1': { formulas: [], quizzes: [] },
      'c10-2': { formulas: [], quizzes: [] },
      'c10-3': { formulas: [], quizzes: [] },
      'c10-4': { formulas: [], quizzes: [] },
      'c10-5': { formulas: [], quizzes: [] },
    }
  },

  hi: {
    'class-6': {
      'c6-1': {
        title: '1. प्राकृतिक संख्याएँ',
        formulas: [
          { id: 'f1', title: 'अनुवर्ती (Successor)', expression: 'n + 1' },
          { id: 'f2', title: 'पूर्ववर्ती (Predecessor)', expression: 'n - 1' },
          { id: 'f3', title: 'विस्तारित रूप', expression: '432 = 400 + 30 + 2' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: '999 की अनुवर्ती संख्या क्या है?',
            options: ['998', '1000', '1001', '990'],
            correctAnswer: 1,
            explanation: 'अनुवर्ती संख्या 1 जोड़ने पर प्राप्त होती है: 999 + 1 = 1000।'
          },
        ],
      },
      'c6-2': { title: '2. पूर्ण संख्याएँ', formulas: [], quizzes: [] },
      'c6-3': {
        title: '3. पूर्णांक',
        formulas: [
          { id: 'f1', title: 'पूर्णांक', expression: 'संख्याओं का समूह: {..., -3, -2, -1, 0, 1, 2, 3, ...}' },
          { id: 'f2', title: 'निरपेक्ष मान', expression: '|a| = a यदि a ≥ 0, -a यदि a < 0' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: '-5 और 8 का योग क्या है?',
            options: ['-13', '3', '-3', '13'],
            correctAnswer: 1,
            explanation: 'जब चिह्न अलग-अलग हों, तो संख्याओं को घटाएं और बड़ी संख्या का चिह्न लगाएं: 8 - 5 = 3।'
          },
        ],
      },
      'c6-4': { title: '4. सांख्यिकी', formulas: [], quizzes: [] },
      'c6-5': { title: '5. बीजगणित की अवधारणा', formulas: [], quizzes: [] },
      'c6-6': { title: '6. बीजीय व्यंजक', formulas: [], quizzes: [] },
      'c6-7': { title: '7. ज्यामितीय अवधारणाएँ', formulas: [], quizzes: [] },
      'c6-8': { title: '8. कोण', formulas: [], quizzes: [] },
      'c6-9': { title: '9. त्रिभुज', formulas: [], quizzes: [] },
      'c6-10': { title: '10. ज्यामितीय रचनाएँ', formulas: [], quizzes: [] },
      'c6-11': { title: '11. सममिति', formulas: [], quizzes: [] },
      'c6-12': { title: '12. परिमाप और क्षेत्रफल', formulas: [], quizzes: [] },
      'c6-13': { title: '13. अनुपात, एकिक नियम और प्रतिशत', formulas: [], quizzes: [] },
      'c6-14': { title: '14. आंकड़ों का प्रबंधन', formulas: [], quizzes: [] },
    },
    'class-10': {
      'c10-1': { title: '1. वास्तविक संख्याएँ', formulas: [], quizzes: [] },
      'c10-2': { title: '2. बहुपद', formulas: [], quizzes: [] },
      'c10-3': { title: '3. दो चर वाले रैखिक समीकरण युग्म', formulas: [], quizzes: [] },
      'c10-4': { title: '4. द्विघात समीकरण', formulas: [], quizzes: [] },
      'c10-5': { title: '5. समांतर श्रेढ़ियाँ', formulas: [], quizzes: [] },
    }
  },
};
