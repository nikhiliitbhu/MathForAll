/**
 * NCERT Mathematics textbooks, Class 6-12, English and Hindi medium.
 *
 * AUTO-GENERATED — do not hand-edit. Regenerate with:  node scripts/build-ncert-data.mjs
 *
 * Source of truth is ncert.nic.in: the class/subject/book lists come from the
 * dropdowns hard-coded in textbook.php, and the chapter titles are read out of
 * each book's contents page in its prelims PDF. Chapter counts were verified
 * against the live server (every chapter 200, one past the last 404).
 *
 * Chapter PDF URL:  https://ncert.nic.in/textbook/pdf/{code}{file}.pdf
 *   {code} — the per-medium book code, e.g. "jemh1" English / "jhmh1" Hindi
 *   {file} — "ps" for the prelims, else the file number padded to two digits
 *
 * `code.hi` is absent where NCERT publishes no Hindi edition (the Class 7 and
 * Class 8 Part-II books). `number` is what the book calls the chapter and
 * `file` is what the PDF is named — they differ for Part-II books, whose
 * chapter 7 is file 01.
 *
 * Hindi chapter titles are not included: NCERT's Hindi PDFs use non-Unicode
 * font encodings, so text extracted from them is mangled and cannot be trusted.
 * The UI shows "अध्याय N" with the English title alongside instead.
 */

export const ncertMaths = {
  "class-6": {
    "id": "class-6",
    "title": "Class 6",
    "titleHi": "कक्षा 6",
    "books": [
      {
        "id": "fegp1",
        "title": {
          "en": "Ganita Prakash",
          "hi": "गणित प्रकाश"
        },
        "code": {
          "en": "fegp1",
          "hi": "fhgp1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Patterns in Mathematics"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Lines and Angles"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Number Play"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Data Handling and Presentation"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Prime Time"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Perimeter and Area"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Fractions"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Playing with Constructions"
          },
          {
            "file": 9,
            "number": 9,
            "title": "Symmetry"
          },
          {
            "file": 10,
            "number": 10,
            "title": "The Other Side of Zero"
          }
        ]
      }
    ]
  },
  "class-7": {
    "id": "class-7",
    "title": "Class 7",
    "titleHi": "कक्षा 7",
    "books": [
      {
        "id": "gegp1",
        "title": {
          "en": "Ganita Prakash Part-I",
          "hi": "गणित प्रकाश भाग-1"
        },
        "code": {
          "en": "gegp1",
          "hi": "ghgp1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Large Numbers Around Us"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Arithmetic Expressions"
          },
          {
            "file": 3,
            "number": 3,
            "title": "A Peek Beyond the Point"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Expressions using Letter-Numbers"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Parallel and Intersecting Lines"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Number Play"
          },
          {
            "file": 7,
            "number": 7,
            "title": "A Tale of Three Intersecting Lines"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Working with Fractions"
          }
        ]
      },
      {
        "id": "gegp2",
        "title": {
          "en": "Ganita Prakash Part-II",
          "hi": "गणित प्रकाश भाग-2"
        },
        "code": {
          "en": "gegp2"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Geometric Twins"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Operations with Integers"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Finding Common Ground"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Another Peek Beyond the Point"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Connecting the Dots..."
          },
          {
            "file": 6,
            "number": 6,
            "title": "Constructions and Tilings"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Finding the Unknown"
          }
        ]
      }
    ]
  },
  "class-8": {
    "id": "class-8",
    "title": "Class 8",
    "titleHi": "कक्षा 8",
    "books": [
      {
        "id": "hegp1",
        "title": {
          "en": "Ganita Prakash Part-I",
          "hi": "गणित प्रकाश भाग-1"
        },
        "code": {
          "en": "hegp1",
          "hi": "hhgp1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "A Square and A Cube"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Power Play"
          },
          {
            "file": 3,
            "number": 3,
            "title": "A Story of Numbers"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Quadrilaterals"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Number Play"
          },
          {
            "file": 6,
            "number": 6,
            "title": "We Distribute, Yet Things Multiply"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Proportional Reasoning-1"
          }
        ]
      },
      {
        "id": "hegp2",
        "title": {
          "en": "Ganita Prakash Part-II",
          "hi": "गणित प्रकाश भाग-2"
        },
        "code": {
          "en": "hegp2"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Fractions in Disguise"
          },
          {
            "file": 2,
            "number": 2,
            "title": "The Baudhayana-Pythagoras Theorem"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Proportional Reasoning-2"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Exploring Some Geometric Themes"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Tales by Dots and Lines"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Algebra Play"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Area"
          }
        ]
      },
      {
        "id": "hemh1",
        "title": {
          "en": "Mathematics",
          "hi": "गणित"
        },
        "code": {
          "en": "hemh1",
          "hi": "hhmh1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Rational Numbers"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Linear Equations in One Variable"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Understanding Quadrilaterals"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Data Handling"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Squares and Square Roots"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Cubes and Cube Roots"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Comparing Quantities"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Algebraic Expressions and Identities"
          },
          {
            "file": 9,
            "number": 9,
            "title": "Mensuration"
          },
          {
            "file": 10,
            "number": 10,
            "title": "Exponents and Powers"
          },
          {
            "file": 11,
            "number": 11,
            "title": "Direct and Inverse Proportions"
          },
          {
            "file": 12,
            "number": 12,
            "title": "Factorisation"
          },
          {
            "file": 13,
            "number": 13,
            "title": "Introduction to Graphs"
          }
        ]
      }
    ]
  },
  "class-9": {
    "id": "class-9",
    "title": "Class 9",
    "titleHi": "कक्षा 9",
    "books": [
      {
        "id": "iemh1",
        "title": {
          "en": "Ganita Manjari",
          "hi": "गणित मंजरी"
        },
        "code": {
          "en": "iemh1",
          "hi": "ihmh1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Orienting Yourself: The Use of Coordinates"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Introduction to Linear Polynomials"
          },
          {
            "file": 3,
            "number": 3,
            "title": "The World of Numbers"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Exploring Algebraic Identities"
          },
          {
            "file": 5,
            "number": 5,
            "title": "I’m Up and Down, and Round and Round"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Measuring Space: Perimeter and Area"
          },
          {
            "file": 7,
            "number": 7,
            "title": "The Mathematics of Maybe: Introduction to Probability"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Predicting What Comes Next: Exploring Sequences"
          }
        ]
      }
    ]
  },
  "class-10": {
    "id": "class-10",
    "title": "Class 10",
    "titleHi": "कक्षा 10",
    "books": [
      {
        "id": "jemh1",
        "title": {
          "en": "Mathematics",
          "hi": "गणित"
        },
        "code": {
          "en": "jemh1",
          "hi": "jhmh1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Real Numbers"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Polynomials"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Pair of Linear Equations in Two Variables"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Quadratic Equations"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Arithmetic Progressions"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Triangles"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Coordinate Geometry"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Introduction to Trigonometry"
          },
          {
            "file": 9,
            "number": 9,
            "title": "Some Applications of Trigonometry"
          },
          {
            "file": 10,
            "number": 10,
            "title": "Circles"
          },
          {
            "file": 11,
            "number": 11,
            "title": "Areas Related to Circles"
          },
          {
            "file": 12,
            "number": 12,
            "title": "Surface Areas and Volumes"
          },
          {
            "file": 13,
            "number": 13,
            "title": "Statistics"
          },
          {
            "file": 14,
            "number": 14,
            "title": "Probability"
          }
        ]
      }
    ]
  },
  "class-11": {
    "id": "class-11",
    "title": "Class 11",
    "titleHi": "कक्षा 11",
    "books": [
      {
        "id": "kemh1",
        "title": {
          "en": "Mathematics",
          "hi": "गणित"
        },
        "code": {
          "en": "kemh1",
          "hi": "khmh1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Sets"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Relations and Functions"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Trigonometric Functions"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Complex Numbers and Quadratic Equations"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Linear Inequalities"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Permutations and Combinations"
          },
          {
            "file": 7,
            "number": 7,
            "title": "Binomial Theorem"
          },
          {
            "file": 8,
            "number": 8,
            "title": "Sequences and Series"
          },
          {
            "file": 9,
            "number": 9,
            "title": "Straight Lines"
          },
          {
            "file": 10,
            "number": 10,
            "title": "Conic Sections"
          },
          {
            "file": 11,
            "number": 11,
            "title": "Introduction to Three Dimensional Geometry"
          },
          {
            "file": 12,
            "number": 12,
            "title": "Limits and Derivatives"
          },
          {
            "file": 13,
            "number": 13,
            "title": "Statistics"
          },
          {
            "file": 14,
            "number": 14,
            "title": "Probability"
          }
        ]
      }
    ]
  },
  "class-12": {
    "id": "class-12",
    "title": "Class 12",
    "titleHi": "कक्षा 12",
    "books": [
      {
        "id": "lemh1",
        "title": {
          "en": "Mathematics Part-I",
          "hi": "गणित भाग-1"
        },
        "code": {
          "en": "lemh1",
          "hi": "lhmh1"
        },
        "numberOffset": 0,
        "chapters": [
          {
            "file": 1,
            "number": 1,
            "title": "Relations and Functions"
          },
          {
            "file": 2,
            "number": 2,
            "title": "Inverse Trigonometric Functions"
          },
          {
            "file": 3,
            "number": 3,
            "title": "Matrices"
          },
          {
            "file": 4,
            "number": 4,
            "title": "Determinants"
          },
          {
            "file": 5,
            "number": 5,
            "title": "Continuity and Differentiability"
          },
          {
            "file": 6,
            "number": 6,
            "title": "Application of Derivatives"
          }
        ]
      },
      {
        "id": "lemh2",
        "title": {
          "en": "Mathematics Part-II",
          "hi": "गणित भाग-2"
        },
        "code": {
          "en": "lemh2",
          "hi": "lhmh2"
        },
        "numberOffset": 6,
        "chapters": [
          {
            "file": 1,
            "number": 7,
            "title": "Integrals"
          },
          {
            "file": 2,
            "number": 8,
            "title": "Application of Integrals"
          },
          {
            "file": 3,
            "number": 9,
            "title": "Differential Equations"
          },
          {
            "file": 4,
            "number": 10,
            "title": "Vector Algebra"
          },
          {
            "file": 5,
            "number": 11,
            "title": "Three Dimensional Geometry"
          },
          {
            "file": 6,
            "number": 12,
            "title": "Linear Programming"
          },
          {
            "file": 7,
            "number": 13,
            "title": "Probability"
          }
        ]
      }
    ]
  }
};
