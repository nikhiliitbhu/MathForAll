// Formula data for Learn page (EN + HI)
// Currently only the formulas/questions for Class 6 are present in both languages.
// Other classes/chapter formulas remain available from mathClasses in src/data/mathData.js (EN).

export const formulaData = {
  en: {
    // keep structure aligned with mathClasses → classes[] → chapters[]
    'class-6': {
      'c6-1': {
        formulas: [
          { id: 'f1', title: 'Line Segment', expression: 'A straight line with two endpoints.' },
          { id: 'f2', title: 'Angle', expression: 'Formed by two rays sharing a common endpoint.' },
          { id: 'f3', title: 'Triangle', expression: 'A polygon with 3 edges and 3 vertices.' },
          { id: 'f4', title: 'Quadrilateral', expression: 'A polygon with 4 edges and 4 vertices.' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'How many endpoints does a line segment have?',
            options: ['0', '1', '2', '3'],
            correctAnswer: 2,
            explanation: 'A line segment has exactly two endpoints.',
          },
          {
            id: 'q2',
            question: 'What is the sum of angles in a triangle?',
            options: ['90°', '180°', '270°', '360°'],
            correctAnswer: 1,
            explanation:
              'The sum of interior angles of a triangle is always 180 degrees.',
          },
        ],
      },
      'c6-2': {
        formulas: [
          { id: 'f1', title: 'Fraction', expression: 'Numerator / Denominator' },
          { id: 'f2', title: 'Addition', expression: 'a/c + b/c = (a+b)/c' },
          { id: 'f3', title: 'Multiplication', expression: '(a/b) × (c/d) = (ac)/(bd)' },
          { id: 'f4', title: 'Division', expression: '(a/b) ÷ (c/d) = (a/b) × (d/c)' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'What is 1/2 + 1/4?',
            options: ['2/6', '3/4', '1/8', '2/4'],
            correctAnswer: 1,
            explanation:
              'Convert 1/2 to 2/4. Then 2/4 + 1/4 = 3/4.',
          },
          {
            id: 'q2',
            question: 'What is 0.5 as a fraction?',
            options: ['1/5', '1/2', '5/100', '5/2'],
            correctAnswer: 1,
            explanation: '0.5 = 5/10 = 1/2.',
          },
        ],
      },
      'c6-5': {
        formulas: [
          { id: 'f1', title: 'Area of Rectangle', expression: 'A = l × w' },
          { id: 'f2', title: 'Perimeter of Rectangle', expression: 'P = 2(l + w)' },
          { id: 'f3', title: 'Area of Square', expression: 'A = s²' },
          { id: 'f4', title: 'Perimeter of Square', expression: 'P = 4s' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'What is the area of a rectangle with length 5 and width 3?',
            options: ['15', '16', '8', '30'],
            correctAnswer: 0,
            explanation: 'Area = length × width = 5 × 3 = 15.',
          },
          {
            id: 'q2',
            question: 'What is the perimeter of a square with side 4?',
            options: ['8', '12', '16', '20'],
            correctAnswer: 2,
            explanation: 'Perimeter = 4 × side = 4 × 4 = 16.',
          },
        ],
      },
    },
  },

  hi: {
    'class-6': {
      'c6-1': {
        formulas: [
          { id: 'f1', title: 'रेखाखंड', expression: 'दो निश्चित सिरों वाला सीधा रेखा-खंड।' },
          { id: 'f2', title: 'कोण', expression: 'एक सामान्य सिरे वाली दो किरणों से बना।' },
          { id: 'f3', title: 'त्रिभुज', expression: '3 भुजाओं और 3 शीर्षों वाला बहुभुज।' },
          { id: 'f4', title: 'चतुर्भुज', expression: '4 भुजाओं और 4 शीर्षों वाला बहुभुज।' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'रेखाखंड के कितने सिरे (endpoints) होते हैं?',
            options: ['0', '1', '2', '3'],
            correctAnswer: 2,
            explanation: 'रेखाखंड के ठीक 2 सिरे होते हैं।',
          },
          {
            id: 'q2',
            question: 'त्रिभुज के कोणों का योग कितना होता है?',
            options: ['90°', '180°', '270°', '360°'],
            correctAnswer: 1,
            explanation: 'त्रिभुज के अंतःकोणों का योग हमेशा 180° होता है।',
          },
        ],
      },
      'c6-2': {
        formulas: [
          { id: 'f1', title: 'भिन्न', expression: 'अंश / हर' },
          { id: 'f2', title: 'जोड़', expression: 'a/c + b/c = (a+b)/c' },
          { id: 'f3', title: 'गुणा', expression: '(a/b) × (c/d) = (ac)/(bd)' },
          { id: 'f4', title: 'भाग', expression: '(a/b) ÷ (c/d) = (a/b) × (d/c)' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: '1/2 + 1/4 कितना होगा?',
            options: ['2/6', '3/4', '1/8', '2/4'],
            correctAnswer: 1,
            explanation:
              '1/2 को 2/4 में बदलें। फिर 2/4 + 1/4 = 3/4।',
          },
          {
            id: 'q2',
            question: '0.5 को भिन्न में लिखिए।',
            options: ['1/5', '1/2', '5/100', '5/2'],
            correctAnswer: 1,
            explanation: '0.5 = 5/10 = 1/2।',
          },
        ],
      },
      'c6-5': {
        formulas: [
          { id: 'f1', title: 'आयत का क्षेत्रफल', expression: 'A = l × w' },
          { id: 'f2', title: 'आयत का परिमाप', expression: 'P = 2(l + w)' },
          { id: 'f3', title: 'वर्ग का क्षेत्रफल', expression: 'A = s²' },
          { id: 'f4', title: 'वर्ग का परिमाप', expression: 'P = 4s' },
        ],
        quizzes: [
          {
            id: 'q1',
            question: 'लंबाई 5 और चौड़ाई 3 वाली आयत का क्षेत्रफल कितना है?',
            options: ['15', '16', '8', '30'],
            correctAnswer: 0,
            explanation: 'क्षेत्रफल = लंबाई × चौड़ाई = 5 × 3 = 15।',
          },
          {
            id: 'q2',
            question: 'भुजा 4 वाले वर्ग का परिमाप कितना है?',
            options: ['8', '12', '16', '20'],
            correctAnswer: 2,
            explanation: 'परिमाप = 4 × भुजा = 4 × 4 = 16।',
          },
        ],
      },
    },
  },
};

