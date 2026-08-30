/**
 * UP Board (UPMSP) Mathematics syllabus, Class 9-12, session 2026-27.
 *
 * Transcribed from the official syllabus PDFs published at upmsp.edu.in
 * (Downloads/Syllabus/Class{09,10,11,12}/…-Maths-Class-{9,10,11,12}.pdf). Those
 * files are typeset in the legacy Krutidev font, so their text has to be read
 * rather than copied — the unit names and marks below were decoded from them.
 *
 * UP Board prescribes the NCERT textbooks (its own site links straight to
 * NCERT's e-books), so `chapters` here are NCERT chapter numbers. What the board
 * adds is its own grouping into units, each carrying a mark weightage — which is
 * what a student revising for the exam actually needs to see.
 *
 * Class 9 is the exception: the board's 2026-27 syllabus still follows the older
 * twelve-chapter NCERT Class 9 book, but NCERT now publishes the eight-chapter
 * "Ganita Manjari" under the same code, so the two no longer line up. The unit
 * list is kept for reference and `syllabusMismatch` flags it for the UI.
 */

export const upBoardSyllabus = {
  "class-9": {
    written: 70,
    internal: 30,
    syllabusMismatch: true,
    units: [
      { roman: "I",   name: "Number Systems",       nameHi: "संख्या पद्धति",       marks: 12, chapters: [] },
      { roman: "II",  name: "Algebra",              nameHi: "बीजगणित",             marks: 22, chapters: [] },
      { roman: "III", name: "Coordinate Geometry",  nameHi: "निर्देशांक ज्यामिति", marks: 4,  chapters: [] },
      { roman: "IV",  name: "Geometry",             nameHi: "ज्यामिति",            marks: 16, chapters: [] },
      { roman: "V",   name: "Mensuration",          nameHi: "मेंसुरेशन",           marks: 12, chapters: [] },
      { roman: "VI",  name: "Statistics",           nameHi: "सांख्यिकी",           marks: 4,  chapters: [] },
    ],
  },

  "class-10": {
    written: 70,
    internal: 30,
    units: [
      { roman: "I",   name: "Number Systems",             nameHi: "संख्या पद्धति",             marks: 5,  chapters: [1] },
      { roman: "II",  name: "Algebra",                    nameHi: "बीजगणित",                   marks: 18, chapters: [2, 3, 4, 5] },
      { roman: "III", name: "Coordinate Geometry",        nameHi: "निर्देशांक ज्यामिति",       marks: 5,  chapters: [7] },
      { roman: "IV",  name: "Geometry",                   nameHi: "ज्यामिति",                  marks: 10, chapters: [6, 10] },
      { roman: "V",   name: "Trigonometry",               nameHi: "त्रिकोणमिति",               marks: 12, chapters: [8, 9] },
      { roman: "VI",  name: "Mensuration",                nameHi: "मेंसुरेशन",                 marks: 10, chapters: [11, 12] },
      { roman: "VII", name: "Statistics and Probability", nameHi: "सांख्यिकी तथा प्रायिकता",   marks: 10, chapters: [13, 14] },
    ],
  },

  "class-11": {
    written: 100,
    internal: 0,
    units: [
      { roman: "I",   name: "Sets and Functions",         nameHi: "समुच्चय तथा फलन",           marks: 28, chapters: [1, 2, 3] },
      { roman: "II",  name: "Algebra",                    nameHi: "बीजगणित",                   marks: 35, chapters: [4, 5, 6, 7, 8] },
      { roman: "III", name: "Coordinate Geometry",        nameHi: "निर्देशांक ज्यामिति",       marks: 15, chapters: [9, 10, 11] },
      { roman: "IV",  name: "Calculus",                   nameHi: "कलन",                       marks: 10, chapters: [12] },
      { roman: "V",   name: "Statistics and Probability", nameHi: "सांख्यिकी तथा प्रायिकता",   marks: 12, chapters: [13, 14] },
    ],
  },

  "class-12": {
    written: 100,
    internal: 0,
    units: [
      { roman: "I",   name: "Relations and Functions",         nameHi: "संबंध तथा फलन",                 marks: 10, chapters: [1, 2] },
      { roman: "II",  name: "Algebra",                         nameHi: "बीजगणित",                       marks: 15, chapters: [3, 4] },
      { roman: "III", name: "Calculus",                        nameHi: "कलन",                           marks: 44, chapters: [5, 6, 7, 8, 9] },
      { roman: "IV",  name: "Vectors and 3-D Geometry",         nameHi: "सदिश तथा त्रिविमीय ज्यामिति",   marks: 18, chapters: [10, 11] },
      { roman: "V",   name: "Linear Programming",              nameHi: "रैखिक प्रोग्रामन",              marks: 5,  chapters: [12] },
      { roman: "VI",  name: "Probability",                     nameHi: "प्रायिकता",                     marks: 8,  chapters: [13] },
    ],
  },
};

/** Classes the board actually covers. Class 6-8 sit with the Basic Shiksha Parishad. */
export const upBoardClasses = ["class-9", "class-10", "class-11", "class-12"];

/**
 * Groups a class's chapters under its UP Board units. Chapters the syllabus does
 * not place (Class 9, where book and syllabus have diverged) come back under a
 * trailing `null` unit so nothing is hidden from the student.
 */
export function groupByUnit(classId, chapters) {
  const syllabus = upBoardSyllabus[classId];
  if (!syllabus) return [{ unit: null, chapters }];

  const numberOf = (ch) => {
    const m = /^(\d+)\./.exec(ch.title);
    return m ? Number(m[1]) : null;
  };

  const placed = new Set();
  const groups = syllabus.units.map((unit) => {
    const inUnit = chapters.filter((ch) => {
      const n = numberOf(ch);
      if (n === null || !unit.chapters.includes(n)) return false;
      placed.add(ch.id);
      return true;
    });
    return { unit, chapters: inUnit };
  });

  const rest = chapters.filter((ch) => !placed.has(ch.id));
  if (rest.length) groups.push({ unit: null, chapters: rest });
  return groups.filter((g) => g.chapters.length);
}
