// Topic data for Learn page (EN + HI).
// NOTE: Currently only Class 6 content is fully provided in both languages.

export const topicData = {
  en: {
    "c6-1": [
      {
        id: "t1",
        title: "What are Natural Numbers?",
        content:
          "All numbers used for counting (1, 2, 3, 4, ...) are called Natural Numbers. These numbers are used to count objects in a set and represent quantity. They start from 1 and go up to infinity.",
        keyFact:
          "The smallest natural number is 1.",
      },
      {
        id: "t2",
        title: "Number and Numerals",
        content:
          "A number is a mathematical concept used for counting, while a numeral is the symbol or word used to represent that number. This topic covers writing numbers in digits (123) and words (One hundred twenty-three), as well as handling large numbers.",
        keyFact:
          "A numeral is just a written sign for a number.",
      },
      {
        id: "t3",
        title: "Place Value and Face Value",
        content:
          "Face Value is the digit itself, regardless of its position. Place Value is the value of a digit based on its position in the number (Ones, Tens, Hundreds, etc.). Expanded Form is writing a number as the sum of its digits' place values.",
        keyFact: "Place value changes with position, but face value always remains the same.",
      },
      {
        id: "t4",
        title: "Predecessor and Successor",
        content:
          "Predecessor: The number that comes just before a given number, obtained by subtracting 1 (n - 1). Successor: The number that comes just after a given number, obtained by adding 1 (n + 1).",
        keyFact:
          "Every natural number except 1 has a predecessor.",
      },
      {
        id: "t5",
        title: "Comparison of Numbers",
        content:
          "To compare numbers, we first check the number of digits. If the digits are equal, we compare from the leftmost position. This helps in identifying the greatest and smallest numbers in a group.",
        keyFact:
          "Numbers can be arranged in Ascending (increasing) or Descending (decreasing) order.",
      },
      {
        id: "t6",
        title: "Formation of Numbers",
        content:
          "Using a given set of digits, we can form the largest number by arranging digits in descending order, and the smallest number by arranging them in ascending order (keeping in mind not to start with zero).",
        keyFact:
          "Largest number uses descending order, Smallest uses ascending order.",
      },
      {
        id: "t7",
        title: "Number Line",
        content:
          "A number line is a visual representation where natural numbers are marked at equal distances. Moving to the right increases the value, and moving to the left decreases it.",
        keyFact: "The distance between any two consecutive natural numbers on the line is 1 unit.",
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
    "c10-1": [
      {
        id: "t1",
        title: "Introduction to Real Numbers",
        content: "Real numbers include both rational and irrational numbers. This chapter explores the properties of integers and the nature of numbers.",
        keyFact: "Every real number can be represented on a number line."
      },
      {
        id: "t2",
        title: "The Fundamental Theorem of Arithmetic",
        content: "Every composite number can be expressed as a product of primes, and this factorization is unique, apart from the order in which the prime factors occur.",
        keyFact: "HCF(a, b) × LCM(a, b) = a × b."
      },
      {
        id: "t3",
        title: "Revisiting Irrational Numbers",
        content: "This topic proves why numbers like √2, √3, and √5 are irrational using the method of contradiction.",
        keyFact: "A number is irrational if it cannot be written in p/q form."
      }
    ],
    "c10-2": [
      {
        id: "t1",
        title: "Introduction to Polynomials",
        content: "A polynomial is an expression consisting of variables and coefficients. The degree of the polynomial is the highest power of the variable.",
        keyFact: "A linear polynomial has degree 1, quadratic has degree 2, and cubic has degree 3."
      },
      {
        id: "t2",
        title: "Geometrical Meaning of the Zeroes",
        content: "The zeroes of a polynomial p(x) are the x-coordinates of the points where the graph of y = p(x) intersects the x-axis.",
        keyFact: "A quadratic polynomial graph is a parabola."
      },
      {
        id: "t3",
        title: "Zeroes and Coefficients Relationship",
        content: "For a quadratic polynomial ax² + bx + c, the sum of zeroes (α+β) = -b/a and the product (αβ) = c/a.",
        keyFact: "The relationship helps in verifying the zeroes of a polynomial."
      }
    ],
    "c10-3": [
      {
        id: "t1",
        title: "Introduction to Linear Equations",
        content: "Two linear equations in the same two variables are called a pair of linear equations in two variables.",
        keyFact: "The general form is a1x + b1y + c1 = 0 and a2x + b2y + c2 = 0."
      },
      {
        id: "t2",
        title: "Graphical Method of Solution",
        content: "The solution is the point where the two lines intersect. If they are parallel, there is no solution. If they coincide, there are infinite solutions.",
        keyFact: "Intersecting lines mean a unique solution."
      },
      {
        id: "t3",
        title: "Algebraic Methods: Substitution & Elimination",
        content: "Substitution involves expressing one variable in terms of another. Elimination involves adding or subtracting equations to remove one variable.",
        keyFact: "Elimination is often faster for complex coefficients."
      }
    ],
    "c10-4": [
      {
        id: "t1",
        title: "Quadratic Equations",
        content: "A quadratic equation in the variable x is an equation of the form ax² + bx + c = 0, where a ≠ 0.",
        keyFact: "Any equation of degree 2 is a quadratic equation."
      },
      {
        id: "t2",
        title: "Nature of Roots",
        content: "The nature of roots depends on the discriminant D = b² - 4ac. If D > 0, roots are real and distinct; if D = 0, real and equal; if D < 0, no real roots.",
        keyFact: "D helps determine the solution type without solving the equation."
      }
    ],
    "c10-5": [
      {
        id: "t1",
        title: "Introduction to Arithmetic Progressions",
        content: "An Arithmetic Progression (AP) is a list of numbers in which each term is obtained by adding a fixed number to the preceding term.",
        keyFact: "The fixed number is called the common difference 'd'."
      }
    ]
  },

  hi: {
    "c6-1": [
      {
        id: "t1",
        title: "प्राकृतिक संख्याएँ क्या हैं?",
        content:
          "गिनती में प्रयुक्त होने वाली सभी संख्याएँ (1, 2, 3, 4, ...) प्राकृतिक संख्याएँ कहलाती हैं। इन संख्याओं का उपयोग वस्तुओं को गिनने के लिए किया जाता है। ये 1 से शुरू होकर अनंत तक जाती हैं।",
        keyFact:
          "सबसे छोटी प्राकृतिक संख्या 1 होती है।",
      },
      {
        id: "t2",
        title: "संख्या और संख्यांक",
        content:
          "संख्या एक विचार है, जबकि संख्यांक (numeral) उस संख्या को लिखने का संकेत है। इस विषय में हम संख्याओं को अंकों और शब्दों में लिखना और बड़ी संख्याओं को पढ़ना सीखेंगे।",
        keyFact:
          "संख्यांक केवल संख्या को दर्शाने का एक प्रतीक है।",
      },
      {
        id: "t3",
        title: "स्थानीय मान और अंकित मान",
        content:
          "किसी अंक का अंकित मान (Face Value) स्वयं वही अंक होता है। स्थानीय मान (Place Value) किसी संख्या में अंक की स्थिति (इकाई, दहाई, सैकड़ा आदि) के आधार पर उसका मान होता है। विस्तारित रूप में हम संख्या को उसके स्थानीय मानों के योग के रूप में लिखते हैं।",
        keyFact: "स्थान बदलने पर स्थानीय मान बदल जाता है, लेकिन अंकित मान वही रहता है।",
      },
      {
        id: "t4",
        title: "पूर्ववर्ती और अनुवर्ती संख्याएँ",
        content:
          "पूर्ववर्ती (Predecessor): किसी संख्या के ठीक पहले वाली संख्या, जो संख्या में से 1 घटाने पर प्राप्त होती है (n - 1)। अनुवर्ती (Successor): किसी संख्या के ठीक बाद वाली संख्या, जो संख्या में 1 जोड़ने पर प्राप्त होती है (n + 1)।",
        keyFact:
          "1 को छोड़कर प्रत्येक प्राकृतिक संख्या का एक पूर्ववर्ती होता है।",
      },
      {
        id: "t5",
        title: "संख्याओं की तुलना",
        content:
          "संख्याओं की तुलना करने के लिए सबसे पहले अंकों की संख्या देखी जाती है। यदि अंक बराबर हों, तो सबसे बाईं ओर के अंकों की तुलना की जाती है। इससे हमें सबसे बड़ी और सबसे छोटी संख्या की पहचान करने में मदद मिलती है।",
        keyFact:
          "संख्याओं को बढ़ते क्रम (Ascending) या घटते क्रम (Descending) में व्यवस्थित किया जा सकता है।",
      },
      {
        id: "t6",
        title: "अंकों से संख्याएँ बनाना",
        content:
          "दिए गए अंकों का उपयोग करके सबसे बड़ी संख्या बनाने के लिए अंकों को घटते क्रम में और सबसे छोटी संख्या बनाने के लिए बढ़ते क्रम में लिखा जाता है।",
        keyFact:
          "सबसे छोटी संख्या बनाते समय ध्यान रखें कि शून्य (0) पहले स्थान पर नहीं आ सकता।",
      },
      {
        id: "t7",
        title: "संख्या रेखा",
        content:
          "संख्या रेखा पर प्राकृतिक संख्याओं को समान दूरी पर बिंदुओं द्वारा दर्शाया जाता है। दाईं ओर बढ़ने पर संख्या का मान बढ़ता है।",
        keyFact: "संख्या रेखा पर कोई भी संख्या अपने बाईं ओर की संख्या से बड़ी होती है।",
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
