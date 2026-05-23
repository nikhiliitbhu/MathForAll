// Topic data for Learn page (EN + HI).
// NOTE: Currently only Class 6 content is fully provided in both languages.

export const topicData = {
  en: {
    "c6-1": [
      {
        id: "t1",
        title: "Points, Lines & Rays",
        content:
          "A point has no dimension. A line extends infinitely in both directions. A ray starts at a point and goes infinitely in one direction. A line segment has two fixed endpoints.",
        keyFact:
          "A line has no endpoints, a ray has one, a segment has two.",
      },
      {
        id: "t2",
        title: "Types of Angles",
        content:
          "Acute angle: less than 90°. Right angle: exactly 90°. Obtuse angle: between 90° and 180°. Straight angle: exactly 180°. Reflex angle: greater than 180°.",
        keyFact:
          "Complementary angles add to 90°. Supplementary angles add to 180°.",
      },
      {
        id: "t3",
        title: "Triangles",
        content:
          "A triangle has 3 sides, 3 angles, and 3 vertices. Types by sides: Equilateral (all equal), Isosceles (two equal), Scalene (all different). Types by angle: Acute, Right, Obtuse.",
        keyFact: "The sum of all angles in any triangle is always 180°.",
      },
      {
        id: "t4",
        title: "Quadrilaterals",
        content:
          "A quadrilateral has 4 sides and 4 angles. Types include Square, Rectangle, Rhombus, Parallelogram, Trapezium, and Kite. The sum of interior angles is always 360°.",
        keyFact:
          "All rectangles are parallelograms, but not all parallelograms are rectangles.",
      },
    ],
    "c6-2": [
      {
        id: "t1",
        title: "What is a Fraction?",
        content:
          "A fraction represents a part of a whole. It is written as p/q where p is the numerator (parts taken) and q is the denominator (total equal parts). Example: 3/4 means 3 parts out of 4.",
        keyFact: "The denominator can never be zero.",
      },
      {
        id: "t2",
        title: "Equivalent Fractions",
        content:
          "Fractions that represent the same value are equivalent. Multiply or divide both numerator and denominator by the same non-zero number to get equivalent fractions. Example: 1/2 = 2/4 = 4/8.",
        keyFact: "To simplify a fraction, divide both parts by their HCF.",
      },
      {
        id: "t3",
        title: "Adding & Subtracting Fractions",
        content:
          "For same denominators: add/subtract numerators directly. For different denominators: first find the LCM, convert to equivalent fractions, then add/subtract.",
        keyFact: "Always simplify your answer to lowest terms.",
      },
      {
        id: "t4",
        title: "Multiplying & Dividing Fractions",
        content:
          "Multiplication: multiply numerators together and denominators together. Division: flip the second fraction (take reciprocal) and multiply. Example: (a/b) ÷ (c/d) = (a/b) × (d/c).",
        keyFact: "To divide by a fraction, multiply by its reciprocal.",
      },
    ],
    "c6-5": [
      {
        id: "t1",
        title: "Perimeter",
        content:
          "Perimeter is the total length of the boundary of a 2D shape. For a rectangle: P = 2(l + w). For a square: P = 4s. For a triangle: P = sum of all three sides.",
        keyFact:
          "Perimeter is always measured in linear units (cm, m, etc.).",
      },
      {
        id: "t2",
        title: "Area of Rectangle & Square",
        content:
          "Area measures the surface enclosed by a shape. Rectangle: A = length × width. Square: A = side². These are the two most fundamental area formulas.",
        keyFact:
          "Area is always measured in square units (cm², m², etc.).",
      },
      {
        id: "t3",
        title: "Area of Triangle",
        content:
          "The area of a triangle is half the product of its base and height. A = ½ × base × height. The height must be perpendicular to the chosen base.",
        keyFact: "Any side can be the base — just make sure the height is perpendicular to it.",
      },
      {
        id: "t4",
        title: "Area of Circle",
        content:
          "Area of a circle = πr² where r is the radius. Circumference = 2πr. Use π ≈ 3.14 or 22/7 for calculations.",
        keyFact:
          "Doubling the radius quadruples the area (because r is squared).",
      },
    ],
  },

  hi: {
    "c6-1": [
      {
        id: "t1",
        title: "बिंदु, रेखाएँ और किरणें",
        content:
          "बिंदु का कोई आयाम नहीं होता। रेखा दोनों दिशाओं में अनंत तक फैली होती है। किरण एक बिंदु से शुरू होकर एक ही दिशा में अनंत तक जाती है। रेखाखंड के दो निश्चित सिरे होते हैं।",
        keyFact:
          "रेखा के कोई सिरे नहीं होते, किरण का 1 सिरा होता है, और रेखाखंड के 2 सिरे होते हैं।",
      },
      {
        id: "t2",
        title: "कोणों के प्रकार",
        content:
          "तेज कोण: 90° से कम। समकोण: बिल्कुल 90°। अधिक कोण: 90° और 180° के बीच। सरल कोण: बिल्कुल 180°। प्रतिवर्ती (रिफ्लेक्स) कोण: 180° से अधिक।",
        keyFact:
          "पूरक कोणों का योग 90° होता है। पूरक (सप्लीमेंटरी) कोणों का योग 180° होता है।",
      },
      {
        id: "t3",
        title: "त्रिभुज",
        content:
          "त्रिभुज में 3 भुजाएँ, 3 कोण और 3 शीर्ष होते हैं। भुजाओं के आधार पर: समबाहु (तीनों बराबर), समद्विबाहु (दो बराबर), विषमबाहु (तीनों अलग)। कोणों के आधार पर: तीक्ष्ण, समकोण, अधिक कोण।",
        keyFact: "किसी भी त्रिभुज के सभी कोणों का योग हमेशा 180° होता है।",
      },
      {
        id: "t4",
        title: "चतुर्भुज",
        content:
          "चतुर्भुज में 4 भुजाएँ और 4 कोण होते हैं। प्रकारों में वर्ग (Square), आयत (Rectangle), समलंब (Rhombus), समांतर चतुर्भुज (Parallelogram), समलम्ब चतुर्भुज (Trapezium) और पतंग (Kite) शामिल हैं। सभी अंतःकोणों का योग हमेशा 360° होता है।",
        keyFact:
          "सभी आयतें समांतर चतुर्भुज होती हैं, लेकिन सभी समांतर चतुर्भुज आयतें नहीं होते।",
      },
    ],
    "c6-2": [
      {
        id: "t1",
        title: "भिन्न (Fraction) क्या है?",
        content:
          "भिन्न किसी संख्या/सम्पूर्ण का एक भाग दर्शाता है। इसे p/q के रूप में लिखा जाता है जहाँ p = अंश (numerator) और q = हर (denominator)। उदाहरण: 3/4 का अर्थ है 4 में से 3 भाग।",
        keyFact: "हर (denominator) कभी शून्य नहीं हो सकता।",
      },
      {
        id: "t2",
        title: "समतुल्य भिन्न (Equivalent Fractions)",
        content:
          "जो भिन्न समान मान को दर्शाते हैं वे समतुल्य होते हैं। अंश और हर दोनों को किसी एक ही शून्य से अलग संख्या से गुणा या भाग करने पर समतुल्य भिन्न मिलते हैं। उदाहरण: 1/2 = 2/4 = 4/8।",
        keyFact: "भिन्न को सरल (simplify) करने के लिए अंश और हर को उनके HCF से भाग दें।",
      },
      {
        id: "t3",
        title: "भिन्नों का जोड़ और घटाव",
        content:
          "यदि हर समान हों, तो अंशों को सीधे जोड़ें/घटाएँ। यदि हर अलग हों, तो पहले LCM निकालें, भिन्नों को समतुल्य बनाकर फिर जोड़ें/घटाएँ।",
        keyFact: "हमेशा उत्तर को सबसे सरल रूप (lowest terms) में करें।",
      },
      {
        id: "t4",
        title: "भिन्नों का गुणा और भाग",
        content:
          "गुणा: अंशों को आपस में गुणा करें और हरों को आपस में गुणा करें। भाग: दूसरी भिन्न का reciprocal लें (अर्थात उलट दें) और फिर गुणा करें। उदाहरण: (a/b) ÷ (c/d) = (a/b) × (d/c)।",
        keyFact: "किसी भिन्न से भाग देने के लिए उसे उसके reciprocal से गुणा करें।",
      },
    ],
    "c6-5": [
      {
        id: "t1",
        title: "परिमाप (Perimeter)",
        content:
          "परिमाप किसी 2D आकृति की सीमा (boundary) की कुल लंबाई होती है। आयत में: P = 2(l + w)। वर्ग में: P = 4s। त्रिभुज में: P = तीनों भुजाओं का योग।",
        keyFact: "परिमाप हमेशा रैखिक इकाइयों (जैसे cm, m) में मापा जाता है।",
      },
      {
        id: "t2",
        title: "आयत और वर्ग का क्षेत्रफल (Area)",
        content:
          "क्षेत्रफल किसी आकृति के भीतर घिरा हुआ क्षेत्र बताता है। आयत: A = लंबाई × चौड़ाई। वर्ग: A = भुजा²। ये क्षेत्रफल की सबसे मूलभूत दो विधियाँ हैं।",
        keyFact: "क्षेत्रफल हमेशा वर्ग इकाइयों (cm², m² आदि) में मापा जाता है।",
      },
      {
        id: "t3",
        title: "त्रिभुज का क्षेत्रफल",
        content:
          "त्रिभुज का क्षेत्रफल = आधार × ऊँचाई का आधा। A = ½ × base × height। ऊँचाई चुनी हुई आधार रेखा पर लंबवत होनी चाहिए।",
        keyFact:
          "किसी भी भुजा को आधार बना सकते हैं — बस ऊँचाई को उस पर लंबवत रखें।",
      },
      {
        id: "t4",
        title: "वृत्त का क्षेत्रफल",
        content:
          "वृत्त का क्षेत्रफल = πr², जहाँ r त्रिज्या (radius) है। परिधि = 2πr। गणनाओं के लिए π ≈ 3.14 या 22/7 का प्रयोग करें।",
        keyFact:
          "त्रिज्या को दोगुना करने पर क्षेत्रफल चार गुना हो जाता है (क्योंकि r² होता है)।",
      },
    ],
  },
};

