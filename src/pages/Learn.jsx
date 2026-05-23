import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { LearnLanguageSelect } from "@/components/LearnLanguageSelect";


import {
  BookOpen, CheckCircle, ChevronRight, ChevronDown,
  RotateCcw, XCircle, GraduationCap, Sigma, Zap,
  Menu, X, Hash, FlaskConical, Trophy, Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeScene } from "@/components/ThreeScene";
import { mathClasses } from "@/data/mathData";

// ─── Rich topic content per chapter ──────────────────────────────────────────
const topicContent = {
  "c6-1": [
    { id: "t1", title: "Points, Lines & Rays", content: "A point has no dimension. A line extends infinitely in both directions. A ray starts at a point and goes infinitely in one direction. A line segment has two fixed endpoints.", keyFact: "A line has no endpoints, a ray has one, a segment has two." },
    { id: "t2", title: "Types of Angles", content: "Acute angle: less than 90°. Right angle: exactly 90°. Obtuse angle: between 90° and 180°. Straight angle: exactly 180°. Reflex angle: greater than 180°.", keyFact: "Complementary angles add to 90°. Supplementary angles add to 180°." },
    { id: "t3", title: "Triangles", content: "A triangle has 3 sides, 3 angles, and 3 vertices. Types by sides: Equilateral (all equal), Isosceles (two equal), Scalene (all different). Types by angle: Acute, Right, Obtuse.", keyFact: "The sum of all angles in any triangle is always 180°." },
    { id: "t4", title: "Quadrilaterals", content: "A quadrilateral has 4 sides and 4 angles. Types include Square, Rectangle, Rhombus, Parallelogram, Trapezium, and Kite. The sum of interior angles is always 360°.", keyFact: "All rectangles are parallelograms, but not all parallelograms are rectangles." },
  ],
  "c6-2": [
    { id: "t1", title: "What is a Fraction?", content: "A fraction represents a part of a whole. It is written as p/q where p is the numerator (parts taken) and q is the denominator (total equal parts). Example: 3/4 means 3 parts out of 4.", keyFact: "The denominator can never be zero." },
    { id: "t2", title: "Equivalent Fractions", content: "Fractions that represent the same value are equivalent. Multiply or divide both numerator and denominator by the same non-zero number to get equivalent fractions. Example: 1/2 = 2/4 = 4/8.", keyFact: "To simplify a fraction, divide both parts by their HCF." },
    { id: "t3", title: "Adding & Subtracting Fractions", content: "For same denominators: add/subtract numerators directly. For different denominators: first find the LCM, convert to equivalent fractions, then add/subtract.", keyFact: "Always simplify your answer to lowest terms." },
    { id: "t4", title: "Multiplying & Dividing Fractions", content: "Multiplication: multiply numerators together and denominators together. Division: flip the second fraction (take reciprocal) and multiply. Example: (a/b) ÷ (c/d) = (a/b) × (d/c).", keyFact: "To divide by a fraction, multiply by its reciprocal." },
  ],
  "c6-5": [
    { id: "t1", title: "Perimeter", content: "Perimeter is the total length of the boundary of a 2D shape. For a rectangle: P = 2(l + w). For a square: P = 4s. For a triangle: P = sum of all three sides.", keyFact: "Perimeter is always measured in linear units (cm, m, etc.)." },
    { id: "t2", title: "Area of Rectangle & Square", content: "Area measures the surface enclosed by a shape. Rectangle: A = length × width. Square: A = side². These are the two most fundamental area formulas.", keyFact: "Area is always measured in square units (cm², m², etc.)." },
    { id: "t3", title: "Area of Triangle", content: "The area of a triangle is half the product of its base and height. A = ½ × base × height. The height must be perpendicular to the chosen base.", keyFact: "Any side can be the base — just make sure the height is perpendicular to it." },
    { id: "t4", title: "Area of Circle", content: "Area of a circle = πr² where r is the radius. Circumference = 2πr. Use π ≈ 3.14 or 22/7 for calculations.", keyFact: "Doubling the radius quadruples the area (because r is squared)." },
  ],
  "c7-1": [
    { id: "t1", title: "Types of Triangles", content: "By angles: Acute (all angles < 90°), Right (one angle = 90°), Obtuse (one angle > 90°). By sides: Equilateral (3 equal), Isosceles (2 equal), Scalene (all different).", keyFact: "A triangle can never have more than one obtuse or right angle." },
    { id: "t2", title: "Congruence of Triangles", content: "Two triangles are congruent if they have the same shape and size. Criteria: SSS (3 sides), SAS (2 sides, included angle), ASA (2 angles, included side), RHS (right angle, hypotenuse, side).", keyFact: "Congruent triangles have all corresponding parts equal (CPCT)." },
    { id: "t3", title: "Pythagoras Theorem", content: "In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. a² + b² = c² where c is the hypotenuse.", keyFact: "Common Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17)." },
    { id: "t4", title: "Triangle Inequality", content: "The sum of any two sides of a triangle must be greater than the third side. If a, b, c are sides then: a+b > c, b+c > a, a+c > b.", keyFact: "If the triangle inequality is not satisfied, no triangle can be formed." },
  ],
  "c7-3": [
    { id: "t1", title: "Exponents Basics", content: "An exponent (or power) tells how many times to multiply a base by itself. Example: 2⁴ = 2 × 2 × 2 × 2 = 16. Here 2 is the base and 4 is the exponent.", keyFact: "Any number to the power of 1 equals itself. Any number to the power of 0 equals 1." },
    { id: "t2", title: "Laws of Exponents", content: "Product law: aᵐ × aⁿ = aᵐ⁺ⁿ. Quotient law: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. Power law: (aᵐ)ⁿ = aᵐⁿ. These laws make multiplication and division much easier.", keyFact: "Laws only apply when bases are the same." },
    { id: "t3", title: "Negative Exponents", content: "A negative exponent means take the reciprocal: a⁻ⁿ = 1/aⁿ. Example: 2⁻³ = 1/2³ = 1/8. Negative exponents do not make the result negative.", keyFact: "a⁻¹ = 1/a (just the reciprocal)." },
    { id: "t4", title: "Standard Form (Scientific Notation)", content: "Very large or very small numbers can be written as a × 10ⁿ where 1 ≤ a < 10. Example: 35,000,000 = 3.5 × 10⁷. This makes calculation and comparison easier.", keyFact: "A positive power of 10 means large number; negative means small (decimal)." },
  ],
  "c8-1": [
    { id: "t1", title: "Perfect Squares", content: "A perfect square is a number that is the square of an integer. Examples: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100. The square of n is written as n².", keyFact: "A perfect square always ends in 0, 1, 4, 5, 6, or 9 — never 2, 3, 7, or 8." },
    { id: "t2", title: "Finding Square Roots", content: "Methods to find square roots: Prime Factorisation (pair up prime factors), Long Division method (for larger numbers). The square root of x is written as √x.", keyFact: "√(a × b) = √a × √b. This is the product property of square roots." },
    { id: "t3", title: "Squares of Binomials", content: "(a+b)² = a² + 2ab + b². (a-b)² = a² - 2ab + b². These identities save a lot of calculation. Example: 99² = (100-1)² = 10000 - 200 + 1 = 9801.", keyFact: "Use algebraic identities to find squares mentally — much faster!" },
    { id: "t4", title: "Cube & Cube Roots", content: "The cube of a number is x³ = x × x × x. The cube root is ∛x. Perfect cubes: 1, 8, 27, 64, 125, 216. Use prime factorisation to find cube roots — make groups of three.", keyFact: "Cube of a negative number is negative. Cube root of a negative number is also negative." },
  ],
  "c8-4": [
    { id: "t1", title: "Cube, Cuboid & Volume", content: "Volume of a cube = a³. Volume of a cuboid = l × b × h. Volume measures the space inside a 3D object and is measured in cubic units (cm³, m³).", keyFact: "A cube is a special cuboid where all three dimensions are equal." },
    { id: "t2", title: "Surface Area", content: "Total Surface Area (TSA) of a cube = 6a². TSA of a cuboid = 2(lb + bh + hl). Lateral Surface Area (LSA) of a cuboid = 2h(l + b) — excludes top and bottom.", keyFact: "TSA includes all faces. LSA excludes the top and bottom faces." },
    { id: "t3", title: "Cylinder", content: "Volume of cylinder = πr²h. Curved (Lateral) Surface Area = 2πrh. Total Surface Area = 2πr(r + h). r is the radius of the circular base, h is the height.", keyFact: "A cylinder has 2 circular faces and 1 curved surface." },
    { id: "t4", title: "Cone & Sphere", content: "Volume of cone = ⅓πr²h. Slant height l = √(r² + h²). CSA of cone = πrl. Volume of sphere = (4/3)πr³. Surface area of sphere = 4πr².", keyFact: "A cone is ⅓ of a cylinder with the same base and height." },
  ],
  "c9-2": [
    { id: "t1", title: "What are Polynomials?", content: "A polynomial is an algebraic expression with one or more terms. Degree is the highest power of the variable. Types: Monomial (1 term), Binomial (2 terms), Trinomial (3 terms).", keyFact: "The degree of a polynomial is the highest exponent of its variable." },
    { id: "t2", title: "Zeroes of a Polynomial", content: "The zero (or root) of a polynomial p(x) is a value of x for which p(x) = 0. A polynomial of degree n has at most n zeroes. Linear polynomial: 1 zero. Quadratic: up to 2 zeroes.", keyFact: "To find zeroes, set the polynomial equal to zero and solve for x." },
    { id: "t3", title: "Remainder & Factor Theorem", content: "Remainder Theorem: When p(x) is divided by (x-a), the remainder = p(a). Factor Theorem: (x-a) is a factor of p(x) if and only if p(a) = 0.", keyFact: "Factor theorem is a special case of remainder theorem where remainder = 0." },
    { id: "t4", title: "Algebraic Identities", content: "(x+y)² = x²+2xy+y². (x-y)² = x²-2xy+y². x²-y² = (x+y)(x-y). (x+y+z)² = x²+y²+z²+2xy+2yz+2zx. These are essential for fast calculations.", keyFact: "Memorise these 4 identities — they appear in almost every algebra problem." },
  ],
  "c9-5": [
    { id: "t1", title: "Circle Basics", content: "A circle is the set of all points equidistant from a fixed point (centre). Key terms: Radius (r), Diameter (d = 2r), Chord, Arc, Sector, Segment.", keyFact: "A diameter is the longest chord of a circle." },
    { id: "t2", title: "Chord Properties", content: "A perpendicular from the centre bisects any chord. Equal chords are equidistant from the centre. Two equal chords subtend equal angles at the centre.", keyFact: "The perpendicular bisector of a chord always passes through the centre." },
    { id: "t3", title: "Angles in a Circle", content: "The angle subtended at the centre = 2 × angle subtended at any point on the remaining arc. Angles in the same segment are equal. Angle in a semicircle is always 90°.", keyFact: "Angle at centre = 2 × angle at circumference (on the same arc)." },
    { id: "t4", title: "Cyclic Quadrilateral", content: "A cyclic quadrilateral has all 4 vertices on a circle. Opposite angles of a cyclic quadrilateral are supplementary (add to 180°). This is a key theorem for proofs.", keyFact: "If opposite angles sum to 180°, the quadrilateral is cyclic." },
  ],
  "c10-3": [
    { id: "t1", title: "Standard Form & Roots", content: "A quadratic equation is ax² + bx + c = 0 (a ≠ 0). Its solutions are called roots or zeroes. Every quadratic has exactly 2 roots (counting multiplicity), which may be real or complex.", keyFact: "If sum of roots = -b/a and product of roots = c/a." },
    { id: "t2", title: "Solving by Factorisation", content: "Split the middle term method: find two numbers whose sum = b and product = ac. Rewrite bx as sum of two terms, then factor by grouping. Example: x²+5x+6 = (x+2)(x+3).", keyFact: "Factorisation works best when roots are integers or simple fractions." },
    { id: "t3", title: "Quadratic Formula", content: "x = (-b ± √(b²-4ac)) / 2a. This formula works for ALL quadratic equations. The discriminant D = b²-4ac tells us about the nature of roots.", keyFact: "Memorise the quadratic formula — it always works when factorisation fails." },
    { id: "t4", title: "Nature of Roots (Discriminant)", content: "D = b²-4ac. If D > 0: two distinct real roots. If D = 0: two equal real roots. If D < 0: no real roots (complex). The discriminant is the key to understanding a quadratic.", keyFact: "D = 0 means the parabola just touches the x-axis (one repeated root)." },
  ],
  "c10-5": [
    { id: "t1", title: "Trigonometric Ratios", content: "In a right triangle: sin θ = Opposite/Hypotenuse, cos θ = Adjacent/Hypotenuse, tan θ = Opposite/Adjacent. Reciprocals: cosec θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ.", keyFact: "SOH-CAH-TOA is the easy way to remember sin, cos, and tan." },
    { id: "t2", title: "Standard Angle Values", content: "sin 0°=0, sin 30°=½, sin 45°=1/√2, sin 60°=√3/2, sin 90°=1. cos values are sin values in reverse order. tan = sin/cos.", keyFact: "For the standard table, sin increases and cos decreases from 0° to 90°." },
    { id: "t3", title: "Trigonometric Identities", content: "sin²θ + cos²θ = 1 (most important!). 1 + tan²θ = sec²θ. 1 + cot²θ = cosec²θ. These are derived from Pythagoras theorem and are used to simplify expressions.", keyFact: "All 3 identities come from one source: Pythagoras theorem." },
    { id: "t4", title: "Heights & Distances", content: "Angle of Elevation: angle looking up from horizontal. Angle of Depression: angle looking down from horizontal. These are applied using tan θ = height/horizontal distance.", keyFact: "Angle of elevation from A to B = Angle of depression from B to A." },
  ],
  "c11-4": [
    { id: "t1", title: "Circle (Conic Section)", content: "A circle is a conic section formed by cutting a cone with a plane parallel to the base. Standard form: (x-h)² + (y-k)² = r². Centre (h,k), radius r. For circle centred at origin: x² + y² = r².", keyFact: "General form of a circle: x² + y² + 2gx + 2fy + c = 0. Centre = (-g, -f)." },
    { id: "t2", title: "Parabola", content: "Standard form: y² = 4ax (opens right). Other forms: y² = -4ax (left), x² = 4ay (up), x² = -4ay (down). The focus is at (a, 0) and directrix is x = -a for y² = 4ax.", keyFact: "A parabola is the set of points equidistant from focus and directrix." },
    { id: "t3", title: "Ellipse", content: "x²/a² + y²/b² = 1 (a > b). Foci at (±c, 0) where c² = a²-b². Sum of distances from any point on the ellipse to both foci is constant (= 2a).", keyFact: "When a = b, the ellipse becomes a circle." },
    { id: "t4", title: "Hyperbola", content: "x²/a² - y²/b² = 1. Foci at (±c, 0) where c² = a²+b². The difference of distances from any point to both foci is constant (= 2a). Asymptotes: y = ±(b/a)x.", keyFact: "A hyperbola has two separate branches, unlike the single curve of an ellipse." },
  ],
  "c11-7": [
    { id: "t1", title: "Concept of Limits", content: "lim(x→a) f(x) = L means f(x) gets closer and closer to L as x approaches a (but may not equal L at x=a). Left-hand limit (x→a⁻) and right-hand limit (x→a⁺) must be equal for the limit to exist.", keyFact: "A limit can exist even if the function is undefined at that point." },
    { id: "t2", title: "Limits of Standard Functions", content: "lim(x→0) sin(x)/x = 1. lim(x→0) (1-cos x)/x = 0. lim(x→0) (eˣ-1)/x = 1. lim(x→∞) (1+1/x)ˣ = e. These are fundamental limits used in calculus.", keyFact: "lim sin(x)/x = 1 only when x is in radians, not degrees." },
    { id: "t3", title: "Derivatives & Power Rule", content: "The derivative of f(x) is f'(x) = lim(h→0) [f(x+h)-f(x)]/h. Power rule: d/dx(xⁿ) = nxⁿ⁻¹. Examples: d/dx(x²)=2x, d/dx(x³)=3x², d/dx(√x)=1/(2√x).", keyFact: "The derivative gives the instantaneous rate of change or slope of the tangent." },
    { id: "t4", title: "Product, Quotient & Chain Rule", content: "Product: (uv)' = u'v + uv'. Quotient: (u/v)' = (u'v - uv')/v². Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x). Standard: d/dx(sin x)=cos x, d/dx(cos x)=-sin x, d/dx(eˣ)=eˣ.", keyFact: "Chain rule is used whenever you have a function inside another function." },
  ],
  "c12-2": [
    { id: "t1", title: "Matrix Basics & Types", content: "A matrix is a rectangular array of numbers arranged in rows and columns. m×n matrix has m rows and n columns. Types: Row matrix, Column matrix, Square matrix, Diagonal matrix, Identity matrix (I), Zero matrix.", keyFact: "An identity matrix has 1s on the diagonal and 0s elsewhere." },
    { id: "t2", title: "Matrix Addition & Scalar Multiplication", content: "Add matrices: add corresponding elements (matrices must have same order). Scalar multiplication: multiply every element by the scalar. (A+B)+C = A+(B+C) and k(A+B) = kA+kB.", keyFact: "Only matrices of the same order can be added or subtracted." },
    { id: "t3", title: "Matrix Multiplication", content: "For A(m×n) × B(n×p): inner dimensions must match, result is m×p. Each element cᵢⱼ = Σ aᵢₖ bₖⱼ. Note: AB ≠ BA in general (matrix multiplication is not commutative).", keyFact: "Matrix multiplication is NOT commutative: AB ≠ BA in general." },
    { id: "t4", title: "Determinant & Inverse", content: "For 2×2 matrix A = [[a,b],[c,d]], det(A) = ad - bc. Inverse A⁻¹ = (1/det A) × adj(A). A matrix is invertible only if det(A) ≠ 0. A × A⁻¹ = I.", keyFact: "If det(A) = 0, the matrix is called singular and has no inverse." },
  ],
  "c12-4": [
    { id: "t1", title: "Integration as Anti-derivative", content: "Integration is the reverse of differentiation. ∫f(x)dx = F(x) + C where F'(x) = f(x). C is the constant of integration. Example: ∫x² dx = x³/3 + C because d/dx(x³/3) = x².", keyFact: "The constant of integration C is essential — without it, the answer is incomplete." },
    { id: "t2", title: "Standard Integrals", content: "∫xⁿdx = xⁿ⁺¹/(n+1)+C (n≠-1). ∫eˣdx = eˣ+C. ∫(1/x)dx = ln|x|+C. ∫sin x dx = -cos x+C. ∫cos x dx = sin x+C. ∫sec²x dx = tan x+C.", keyFact: "Memorise the 6 standard integrals — they are used in almost every problem." },
    { id: "t3", title: "Integration by Substitution", content: "If the integral has a function and its derivative present, substitute u = inner function. Then du = derivative × dx. Transform the integral in terms of u, integrate, and back-substitute.", keyFact: "Substitution is the reverse of the chain rule in differentiation." },
    { id: "t4", title: "Definite Integrals", content: "∫ₐᵇ f(x)dx = F(b) - F(a) where F is the antiderivative. This gives the net area between the curve and the x-axis from x=a to x=b. Properties: ∫ₐᵇ = -∫ᵦᵃ and ∫ₐᵃ = 0.", keyFact: "Definite integrals give exact numerical values (no constant C needed)." },
  ],
};

// ─── QuizCard component ───────────────────────────────────────────────────────
function QuizCard({ question, index }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const correct = selected === question.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm"
    >
      <div className="flex gap-4 items-start mb-5">
        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
        <h3 className="text-base md:text-lg font-medium pt-1 text-card-foreground leading-snug">
          {question.question}
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-5 pl-12">
        {question.options.map((opt, i) => {
          let cls = "justify-start h-auto py-2.5 px-4 text-left text-sm font-normal border-border hover:border-primary/40 hover:bg-primary/5 transition-colors";
          if (submitted) {
            if (i === question.correctAnswer) cls = "justify-start h-auto py-2.5 px-4 text-left text-sm font-medium bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400";
            else if (i === selected) cls = "justify-start h-auto py-2.5 px-4 text-left text-sm font-normal bg-destructive/10 border-destructive/40 text-destructive";
          } else if (selected === i) {
            cls = "justify-start h-auto py-2.5 px-4 text-left text-sm font-medium border-primary bg-primary/10 text-primary ring-1 ring-primary/20";
          }
          return (
            <Button key={i} variant="outline" className={cls} onClick={() => !submitted && setSelected(i)} disabled={submitted}>
              <span className="mr-2.5 text-muted-foreground w-4 text-xs">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </Button>
          );
        })}
      </div>

      <div className="pl-12">
        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={selected === null} size="sm" className="min-w-[120px]">
            Check Answer
          </Button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`p-4 rounded-xl border flex gap-3 ${correct ? "bg-green-500/8 border-green-500/25" : "bg-destructive/8 border-destructive/25"}`}
            >
              {correct
                ? <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                : <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              }
              <div>
                <p className={`text-sm font-semibold mb-1 ${correct ? "text-green-700 dark:text-green-400" : "text-destructive"}`}>
                  {correct ? (lang === "hi" ? "सही! 🎉" : "Correct! 🎉") : (lang === "hi" ? "गलत" : "Incorrect")}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">{question.explanation}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Learn page ──────────────────────────────────────────────────────────
export default function Learn() {
  const { lang, t } = useLanguage();
  const [selectedClassId, setSelectedClassId] = useState(mathClasses[0].id);

  const [expandedChapterId, setExpandedChapterId] = useState(mathClasses[0].chapters[0].id);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [activeShape, setActiveShape] = useState(mathClasses[0].chapters[0].shapeType);
  const [activeTab, setActiveTab] = useState("overview"); // overview | formulas | quiz
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedClass = mathClasses.find(c => c.id === selectedClassId) || mathClasses[0];
  const selectedChapter = selectedClass.chapters.find(c => c.id === expandedChapterId) || selectedClass.chapters[0];
  const topics = topicContent[expandedChapterId] || [];
  const selectedTopic = topics.find(t => t.id === selectedTopicId) || null;

  // reset when chapter changes
  useEffect(() => {
    setSelectedTopicId(null);
    setActiveTab("overview");
    setActiveShape(selectedChapter.shapeType);
  }, [expandedChapterId]);

  // reset when class changes
  useEffect(() => {
    const firstChapter = selectedClass.chapters[0];
    setExpandedChapterId(firstChapter.id);
    setActiveShape(firstChapter.shapeType);
    setSelectedTopicId(null);
    setActiveTab("overview");
  }, [selectedClassId]);

  const handleClassSelect = (classId) => {
    setSelectedClassId(classId);
    setSidebarOpen(false);
  };

  const tabs = [
    { id: "overview", label: t.learn.overviewTitle, icon: BookOpen },
    { id: "formulas", label: t.learn.formulas, icon: Sigma },
    { id: "quiz", label: t.learn.quiz, icon: Zap },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background relative">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed md:sticky top-16 z-40 md:z-auto
        w-72 md:w-72 border-r border-border bg-sidebar flex-shrink-0 flex flex-col
        h-[calc(100vh-4rem)] overflow-hidden
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Class selector */}
        <div className="p-4 border-b border-border bg-sidebar space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1 mb-2">{t.learn.sidebarSelectClass}</p>

          <div className="grid grid-cols-4 gap-1.5">
            {mathClasses.map(c => (
              <button
                key={c.id}
                onClick={() => handleClassSelect(c.id)}
                className={`rounded-xl py-2 text-sm font-semibold transition-all ${
                  selectedClassId === c.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "bg-background/60 text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
                }`}
              >
                {c.title.replace("Class ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Chapter tree */}
        <div className="flex-1 overflow-y-auto py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-5 mb-2">
            {t.learn.chapters}
          </p>

          <div className="space-y-0.5 px-2">
            {selectedClass.chapters.map(chapter => {
              const isExpanded = expandedChapterId === chapter.id;
              const chapterTopics = topicContent[chapter.id] || [];
              return (
                <div key={chapter.id}>
                  {/* Chapter button */}
                  <button
                    onClick={() => setExpandedChapterId(chapter.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                      isExpanded
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <span className="truncate">{chapter.title}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  {/* Topics (expanded) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-1 pt-0.5 space-y-0.5">
                          {chapterTopics.map(topic => (
                            <button
                              key={topic.id}
                              onClick={() => { setSelectedTopicId(topic.id); setSidebarOpen(false); setActiveTab("overview"); }}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                                selectedTopicId === topic.id
                                  ? "bg-primary text-primary-foreground font-medium"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                              }`}
                            >
                              <Circle className="h-1.5 w-1.5 fill-current shrink-0 opacity-60" />
                              <span className="leading-snug">{topic.title}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress hint */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{selectedClass.title} · {selectedClass.chapters.length} chapters</span>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 md:hidden flex items-center gap-3 px-4 py-3 bg-background/95 backdrop-blur border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
            <span className="text-primary font-medium shrink-0">{selectedClass.title}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{selectedChapter.title}</span>
            {selectedTopic && <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-foreground">{selectedTopic.title}</span>
            </>}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-24 space-y-8">

          {/* ── Learn header actions (language select) ── */}
          <div className="hidden md:flex justify-end">
            <LearnLanguageSelect />
          </div>


          {/* ── Breadcrumb ── */}
          <div className="hidden md:flex items-center gap-1.5 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">{selectedClass.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{selectedChapter.title}</span>
            {selectedTopic && <>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{selectedTopic.title}</span>
            </>}
          </div>

          {/* ── Chapter heading ── */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {selectedTopic ? selectedTopic.title : selectedChapter.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {selectedTopic
                ? `${selectedClass.title} · ${selectedChapter.title}`
                : `${selectedClass.title} · ${topics.length} topics · ${selectedChapter.formulas.length} formulas · ${selectedChapter.quizzes.length} quiz questions`
              }
            </p>
          </div>

          {/* ── TOPIC VIEW ── */}
          {selectedTopic ? (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Content card */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-6">
                  {selectedTopic.content}
                </p>
                <div className="flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-xl p-4">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">{t.learn.keyFact}</p>
                    <p className="text-sm text-foreground font-medium leading-relaxed">{selectedTopic.keyFact}</p>
                  </div>
                </div>
              </div>

              {/* All topics navigator */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">{t.learn.allTopicsInChapter}</p>

                <div className="grid sm:grid-cols-2 gap-2">
                  {topics.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl text-left border transition-all text-sm ${
                        t.id === selectedTopicId
                          ? "border-primary/40 bg-primary/8 text-primary font-medium"
                          : "border-border bg-card hover:bg-secondary text-foreground"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        t.id === selectedTopicId ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}>{i + 1}</span>
                      <span className="leading-snug">{t.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Back to chapter */}
              <Button variant="outline" className="gap-2 rounded-xl" onClick={() => setSelectedTopicId(null)}>
                ← {t.learn.backToChapter}
              </Button>
            </motion.div>
          ) : (
            /* ── CHAPTER VIEW ── */
            <>
              {/* Tab bar */}
              <div className="flex gap-1 bg-secondary/60 p-1 rounded-2xl w-fit">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">

                {/* ── Overview tab ── */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-8"
                  >
                    {/* 3D Scene */}
                    <section className="space-y-4">
                      <h2 className="text-xl font-bold border-b border-border pb-2">{t.learn.interactive3D}</h2>
                      <div className="grid lg:grid-cols-3 gap-5">
                        <div className="lg:col-span-2 relative h-80 bg-secondary/30 rounded-2xl border border-border shadow-inner overflow-hidden">
                          <ThreeScene shapeType={activeShape} />
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                            <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border text-xs font-medium text-foreground shadow-sm capitalize">
                              {activeShape}
                            </div>
                            <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border text-xs text-muted-foreground shadow-sm flex items-center gap-1.5">
                              <RotateCcw className="h-3 w-3" /> Drag to rotate
                            </div>
                          </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-5">
                          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">{t.learn.shapeControls}</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {["cube", "sphere", "cylinder", "cone", "icosahedron", "torus"].map(shape => (
                              <Button
                                key={shape}
                                variant={activeShape === shape ? "default" : "outline"}
                                className="w-full justify-start capitalize h-9 text-sm"
                                onClick={() => setActiveShape(shape)}
                              >
                                {shape}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Topics list */}
                    <section className="space-y-4">
                      <h2 className="text-xl font-bold border-b border-border pb-2 flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" />
                        {t.learn.topicsInChapter}
                      </h2>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {topics.map((topic, i) => (
                          <motion.button
                            key={topic.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            onClick={() => setSelectedTopicId(topic.id)}
                            className="group flex items-start gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/40 hover:bg-primary/4 transition-all text-left shadow-sm"
                          >
                            <span className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                              {i + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{topic.title}</p>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{topic.content.slice(0, 80)}...</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
                          </motion.button>
                        ))}
                      </div>
                    </section>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: lang === "hi" ? "टॉपिक्स" : "Topics", value: topics.length, icon: BookOpen, color: "text-blue-500" },
                        { label: lang === "hi" ? "फॉर्मूले" : "Formulas", value: selectedChapter.formulas.length, icon: Sigma, color: "text-violet-500" },
                        { label: lang === "hi" ? "क्विज़ प्रश्न" : "Quiz Q's", value: selectedChapter.quizzes.length, icon: FlaskConical, color: "text-amber-500" },
                      ].map(stat => (
                        <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                          <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── Formulas tab ── */}
                {activeTab === "formulas" && (
                  <motion.div
                    key="formulas"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedChapter.formulas.map((f, i) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="relative bg-card border border-border rounded-2xl p-5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">{f.title}</p>
                          <p className="text-xl md:text-2xl font-mono text-card-foreground leading-relaxed">{f.expression}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Formula tip */}
                    <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-4">
                      <Trophy className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">{t.learn.proTip}</span> {lang === "hi" ? "प्रत्येक फॉर्मूला को हाथ से कम से कम 3 बार लिखें — एग्ज़ाम के लिए यही muscle memory सबसे ज़्यादा काम आती है!" : "Write out each formula by hand at least 3 times — muscle memory is your best friend for exams!"}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── Quiz tab ── */}
                {activeTab === "quiz" && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-2xl px-4 py-3 mb-2">
                      <Zap className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{selectedChapter.quizzes.length} questions</span> on {selectedChapter.title}. Select an answer and click "Check Answer".
                      </p>
                    </div>
                    {selectedChapter.quizzes.map((q, i) => (
                      <QuizCard key={`${expandedChapterId}-${q.id}`} question={q} index={i} />
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
