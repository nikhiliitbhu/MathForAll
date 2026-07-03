import heroImage from "../assets/hero-img.png";
import { useLocation } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowRight, BookOpen, Shapes, BrainCircuit, CheckCircle2, Play, Star, Zap, Trophy, Users, ChevronRight, Calculator, Pi, Sigma, Infinity, Mail, Github, Twitter, Youtube, GraduationCap, FlaskConical, Lightbulb, Globe, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeScene } from "@/components/ThreeScene";
import { SEO } from "@/components/SEO";
import { pageSEO } from "@/hooks/useSEO";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const classes = [{
  cls: "6",
  topics: ["Basic Geometry", "Fractions & Decimals", "Algebra Intro", "Mensuration 2D"],
  color: "from-violet-500 to-purple-700"
}, {
  cls: "7",
  topics: ["Triangles", "Ratio & Proportion", "Linear Equations", "Perimeter & Area"],
  color: "from-blue-500 to-indigo-700"
}, {
  cls: "8",
  topics: ["Squares & Cubes", "Quadrilaterals", "Mensuration 3D", "Algebraic Identities"],
  color: "from-fuchsia-500 to-pink-700"
}, {
  cls: "9",
  topics: ["Number Systems", "Polynomials", "Coordinate Geometry", "Heron's Formula"],
  color: "from-cyan-500 to-blue-700"
}, {
  cls: "10",
  topics: ["Quadratic Equations", "Trigonometry", "Circles", "Surface Areas & Volumes"],
  color: "from-indigo-500 to-violet-700"
}, {
  cls: "11",
  topics: ["Conic Sections", "Sequences & Series", "Permutations", "Limits & Derivatives"],
  color: "from-purple-500 to-fuchsia-700"
}, {
  cls: "12",
  topics: ["Matrices", "Integrals", "Differential Equations", "Vectors & 3D Geometry"],
  color: "from-blue-600 to-cyan-700"
}];
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
export default function Home() {
  const [, setLocation] = useLocation();
  const { startLoading } = useLoading();
  const { t } = useLanguage();
  const [activeShape, setActiveShape] = useState("cube");
  const seo = pageSEO.home;

  const stats = [
    { value: "7", label: t.home.statClassesCovered, icon: BookOpen, color: "text-violet-500" },
    { value: "50+", label: t.home.statChapters, icon: Sigma, color: "text-blue-500" },
    { value: "300+", label: t.home.statFormulas, icon: Pi, color: "text-fuchsia-500" },
    { value: "200+", label: t.home.statQuizQuestions, icon: Zap, color: "text-amber-500" },
  ];

  const steps = [
    { step: "01", title: t.home.step1Title, desc: t.home.step1Desc, icon: Users, color: "bg-violet-500/10 text-violet-500 border-violet-500/20" },
    { step: "02", title: t.home.step2Title, desc: t.home.step2Desc, icon: Shapes, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { step: "03", title: t.home.step3Title, desc: t.home.step3Desc, icon: Trophy, color: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20" },
  ];

  const highlights = [t.home.hl1, t.home.hl2, t.home.hl3, t.home.hl4, t.home.hl5, t.home.hl6];

  const shapeShowcase = [
    { shape: "cube", label: t.home.shapeCubeLabel, formula: "V = a³   |   SA = 6a²", fact: t.home.shapeCubeFact, color: "from-violet-600 to-purple-800", accent: "#7c3aed" },
    { shape: "sphere", label: t.home.shapeSphereLabel, formula: "V = ⁴⁄₃πr³   |   SA = 4πr²", fact: t.home.shapeSphereFact, color: "from-blue-600 to-indigo-800", accent: "#2563eb" },
    { shape: "cylinder", label: t.home.shapeCylinderLabel, formula: "V = πr²h   |   SA = 2πr(r+h)", fact: t.home.shapeCylinderFact, color: "from-fuchsia-600 to-pink-800", accent: "#c026d3" },
    { shape: "cone", label: t.home.shapeConeLabel, formula: "V = ⅓πr²h   |   SA = πr(r+l)", fact: t.home.shapeConeFact, color: "from-cyan-600 to-blue-800", accent: "#0891b2" },
    { shape: "icosahedron", label: t.home.shapeOctahedronLabel, formula: "V = √2/3 a³   |   F = 8 faces", fact: t.home.shapeOctahedronFact, color: "from-indigo-600 to-violet-800", accent: "#4f46e5" },
    { shape: "torus", label: t.home.shapeTorusLabel, formula: "V = 2π²Rr²   |   SA = 4π²Rr", fact: t.home.shapeTorusFact, color: "from-purple-600 to-fuchsia-800", accent: "#9333ea" },
  ];

  const footerLinks = {
    [t.home.fhQuickLinks]: [
      { label: t.home.flHome, href: "/" },
      { label: t.home.flStartLearning, href: "/learn" },
      { label: t.home.flAboutMathsLab, href: "/" },
      { label: t.home.flClassSelector, href: "/learn" },
    ],
    [t.home.fhSubjects]: [
      { label: t.home.flAlgebra, href: "/learn" },
      { label: t.home.flGeometry, href: "/learn" },
      { label: t.home.flTrigonometry, href: "/learn" },
      { label: t.home.flCalculus, href: "/learn" },
      { label: t.home.flStatistics, href: "/learn" },
      { label: t.home.flProbability, href: "/learn" },
    ],
    [t.home.fhTools]: [
      { label: t.home.flFormulaLib, href: "/learn" },
      { label: t.home.fl3DExplorer, href: "/learn" },
      { label: t.home.flQuizzes, href: "/learn" },
      { label: t.home.flChapterGuide, href: "/learn" },
      { label: t.home.flDarkMode, href: "/" },
    ],
    [t.home.fhClasses]: [
      { label: "Class 6", href: "/learn" },
      { label: "Class 7", href: "/learn" },
      { label: "Class 8", href: "/learn" },
      { label: "Class 9", href: "/learn" },
      { label: "Class 10", href: "/learn" },
      { label: "Class 11 & 12", href: "/learn" },
    ],
  };

  const handleStartLearning = () => {
    startLoading("/learn");
  };

  const handleViewSyllabus = () => {
    startLoading("/learn");
  };

  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        type={seo.type}
      />
      <div className="flex flex-col">
        <main className="container mx-auto px-4 md:px-8 py-14 lg:py-24 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-8 text-center lg:text-left"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 md:px-3 md:py-1 text-xs md:text-sm font-medium text-primary">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                  {t.home.forClass}
                </div>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-foreground leading-[1.15] md:leading-[1.1]">
                  {t.home.learnTitlePrefix}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">
                    {t.home.scoreHigher}
                  </span>
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground max-w-[560px] mx-auto lg:mx-0 leading-relaxed">
                  {t.home.heroDesc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  data-testid="button-start-learning"
                  className="w-full sm:w-auto text-base h-12 md:h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
                  onClick={handleStartLearning}
                >
                  {t.home.startLearningNow}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  data-testid="button-view-syllabus"
                  onClick={handleViewSyllabus}
                  className="w-full sm:w-auto text-base h-12 md:h-14 px-8 rounded-full"
                >
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  {t.home.viewSyllabus}
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[300px] md:h-[520px] lg:h-[600px] w-full flex items-center justify-center mt-8 lg:mt-0"
            >
              <img
                src={heroImage}
                alt="Student learning mathematics with 3D shapes"
                className="h-full w-full object-contain select-none rounded-3xl"
                draggable={false}
              />
            </motion.div>
          </div>
        </main>

        <section className="border-y border-border bg-secondary/40 py-12">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
              {stats.map(({ value, label, icon: Icon, color }) => (
                <motion.div key={label} variants={fadeUp} className="flex flex-col items-center gap-2">
                  <div className={`h-10 w-10 rounded-2xl bg-background border border-border flex items-center justify-center ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-bold font-display text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.home.whatYouGet}</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">{t.home.everythingYouNeed}</h2>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { icon: BookOpen, color: "bg-violet-500/10 text-violet-500", title: t.home.feat1Title, desc: t.home.feat1Desc },
                { icon: Calculator, color: "bg-fuchsia-500/10 text-fuchsia-500", title: t.home.feat2Title, desc: t.home.feat2Desc },
                { icon: BrainCircuit, color: "bg-blue-500/10 text-blue-500", title: t.home.feat3Title, desc: t.home.feat3Desc },
                { icon: Shapes, color: "bg-cyan-500/10 text-cyan-500", title: t.home.feat4Title, desc: t.home.feat4Desc },
                { icon: Star, color: "bg-amber-500/10 text-amber-500", title: t.home.feat5Title, desc: t.home.feat5Desc },
                { icon: Infinity, color: "bg-pink-500/10 text-pink-500", title: t.home.feat6Title, desc: t.home.feat6Desc }
              ].map(({ icon: Icon, color, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="group bg-background border border-border rounded-3xl p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-12 w-12 ${color} rounded-2xl flex items-center justify-center mb-5`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-2 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.home.simpleToUse}</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">{t.home.howItWorks}</h2>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 relative"
            >
              {steps.map(({ step, title, desc, icon: Icon, color }, i) => (
                <motion.div key={step} variants={fadeUp} className="relative flex flex-col items-center text-center">
                  <div className={`h-16 w-16 rounded-2xl border ${color} flex items-center justify-center mb-5`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-3 -right-3 text-xs font-bold text-muted-foreground/30 font-display text-5xl select-none">{step}</span>
                  <h3 className="text-lg font-bold font-display mb-2 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  {i < steps.length - 1 && <ChevronRight className="hidden md:block absolute top-7 -right-5 h-6 w-6 text-muted-foreground/30" />}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.home.browseByClass}</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">{t.home.findYourClass}</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{t.home.findClassDesc}</p>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
            >
              {classes.map(({ cls, topics, color }) => (
                <motion.button
                  key={cls}
                  variants={fadeUp}
                  data-testid={`button-class-${cls}`}
                  onClick={() => setLocation("/learn")}
                  className="group relative bg-background border border-border rounded-3xl overflow-hidden text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/30"
                >
                  <div className={`h-2 w-full bg-gradient-to-r ${color}`}></div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-3xl md:text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-br ${color}`}>{cls}</span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.home.classLabel}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {topics.map(topic => (
                        <li key={topic} className="flex items-start gap-2 text-[13px] md:text-sm text-muted-foreground leading-snug">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0 mt-1.5"></span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 md:mt-5 flex items-center gap-1 text-[11px] md:text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                      {t.home.openClass} <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </motion.button>
              ))}
              <motion.div variants={fadeUp} className="relative bg-gradient-to-br from-primary/10 to-fuchsia-500/10 border border-primary/20 rounded-3xl overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 min-h-[180px] md:min-h-[220px]">
                <div className="h-20 w-20 md:h-28 md:w-28 mb-3">
                  <ThreeScene shapeType="cube" />
                </div>
                <p className="text-xs md:text-sm font-semibold text-foreground text-center">{t.home.shapeExplorer3D}</p>
                <p className="text-xs text-muted-foreground text-center mt-1">{t.home.dragToRotateShort}</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 border-y border-border bg-secondary/40">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.home.visualLearning}</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">{t.home.seeRotateGet}</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t.home.geometryDesc}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-border bg-background overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-[280px_1fr] min-h-[480px]">
                <div className="border-r border-border p-5 space-y-2 bg-secondary/30">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">{t.home.selectShapeLabel}</p>
                  {shapeShowcase.map(s => (
                    <button
                      key={s.shape}
                      data-testid={`shape-btn-${s.shape}`}
                      onClick={() => setActiveShape(s.shape)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${activeShape === s.shape ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "hover:bg-secondary text-foreground"}`}
                    >
                      <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${s.color} flex-shrink-0`}></div>
                      <div>
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className={`text-xs ${activeShape === s.shape ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{s.formula.split("|")[0].trim()}</p>
                      </div>
                      {activeShape === s.shape && <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="relative flex-1 flex items-center justify-center min-h-[300px] lg:min-h-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(109,40,217,0.08) 0%, transparent 70%)" }}>
                    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeShape}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.35 }}
                        className="h-64 w-64 lg:h-80 lg:w-80"
                      >
                        <ThreeScene shapeType={activeShape} />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">
                      <RotateCcw className="h-3 w-3" /> {t.home.dragToRotate}
                    </div>
                  </div>
                  <div className="lg:w-72 p-8 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {shapeShowcase.filter(s => s.shape === activeShape).map(s => (
                        <motion.div
                          key={s.shape}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${s.color} text-white text-xs font-semibold mb-4`}>
                            <Shapes className="h-3 w-3" /> {s.label}
                          </div>
                          <h3 className="text-lg font-bold font-display text-foreground mb-2">{t.home.formulaLabel}</h3>
                          <div className="bg-secondary/60 rounded-xl p-4 mb-5 border border-border">
                            <p className="font-mono text-sm text-foreground leading-relaxed">{s.formula}</p>
                          </div>
                          <h3 className="text-sm font-bold font-display text-foreground mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" /> {t.home.didYouKnow}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{s.fact}</p>
                          <Button size="sm" className="mt-6 rounded-full" onClick={() => setLocation("/learn")}>
                            {t.home.exploreInLab} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">{t.home.builtForIndia}</p>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-5">{t.home.designedTitle}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{t.home.mathrixBridges}</p>
                <ul className="space-y-3">
                  {highlights.map(h => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" /> {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="grid grid-cols-2 gap-5"
              >
                {[
                  { icon: GraduationCap, color: "text-violet-500 bg-violet-500/10", title: t.home.ncertAligned, desc: t.home.ncertAlignedDesc },
                  { icon: FlaskConical, color: "text-blue-500 bg-blue-500/10", title: t.home.mathsLabReady, desc: t.home.mathsLabReadyDesc },
                  { icon: Globe, color: "text-fuchsia-500 bg-fuchsia-500/10", title: t.home.anyDevice, desc: t.home.anyDeviceDesc },
                  { icon: Zap, color: "text-amber-500 bg-amber-500/10", title: t.home.instantAccess, desc: t.home.instantAccessDesc }
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} className="bg-background border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <div className={`h-10 w-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground mb-1">{title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/40 border-y border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-7xl font-display text-primary/20 leading-none mb-2 select-none">"</div>
              <blockquote className="text-2xl md:text-3xl font-bold font-display text-foreground leading-snug">{t.home.quote}</blockquote>
              <p className="mt-5 text-muted-foreground font-medium">{t.home.quoteAuthor}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/10 via-fuchsia-500/5 to-blue-500/10 px-8 py-16 text-center"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.12) 0%, transparent 70%)" }}></div>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-4 relative z-10">
                {t.home.ctaReadyTo} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-fuchsia-500">{t.home.ctaExcel}</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 relative z-10">{t.home.ctaJoin}</p>
              <Button
                size="lg"
                data-testid="button-cta-start"
                className="h-14 px-10 text-base rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all relative z-10"
                onClick={() => setLocation("/learn")}
              >
                {t.home.ctaExplore} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-border bg-secondary/30">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 font-bold font-display text-foreground mb-4">
                  <div src="/logo.png" alt="Mathrix logo" className="h-9 w-9 rounded-xl object-contain bg-transparent" draggable={false}></div>
                  <span className="text-2xl font-bold font-display tracking-tight text-foreground -ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B26EF] to-[#E317E3]">Mathrix</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">{t.home.footerDesc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["NCERT Aligned", "Class 6–12", "Free Forever"].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {[{ icon: Twitter, label: "Twitter" }, { icon: Github, label: "GitHub" }, { icon: Youtube, label: "YouTube" }, { icon: Mail, label: "Email" }].map(({ icon: Icon, label }) => (
                    <button key={label} data-testid={`footer-social-${label.toLowerCase()}`} className="h-9 w-9 rounded-xl border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors" title={label}>
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
              {Object.entries(footerLinks).map(([heading, links]) => (
                <div key={heading}>
                  <h4 className="text-sm font-bold text-foreground mb-4">{heading}</h4>
                  <ul className="space-y-2.5">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <button onClick={() => setLocation(href)} className="text-sm text-muted-foreground hover:text-primary transition-colors text-left">{label}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-border">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl py-6">
              <div className="flex flex-wrap justify-center gap-8 text-center">
                {[{ value: "7", label: t.home.footerStat1 }, { value: "50+", label: t.home.footerStat2 }, { value: "300+", label: t.home.footerStat3 }, { value: "6", label: t.home.footerStat4 }, { value: "200+", label: t.home.footerStat5 }].map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-lg font-bold font-display text-primary">{value}</span>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <p>{t.home.copyright}</p>
              <p className="text-center">{t.home.footerTagline}</p>
              <div className="flex items-center gap-4">
                <button className="hover:text-primary transition-colors">{t.home.privacy}</button>
                <button className="hover:text-primary transition-colors">{t.home.terms}</button>
                <button className="hover:text-primary transition-colors">{t.home.contact}</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}