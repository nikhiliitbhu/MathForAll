import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  XCircle,
  GraduationCap,
  Sigma,
  Zap,
  Menu,
  X,
  Hash,
  FlaskConical,
  Trophy,
  Circle,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeScene } from "@/components/ThreeScene";
import { mathClasses } from "@/data/mathData";
import { topicData } from "@/data/topicData";
import { formulaData } from "@/data/formulaData";
import { BookView } from "@/components/BookView";

function QuizCard({ question, index, t, lang }) {
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
          let cls =
            "justify-start h-auto py-2.5 px-4 text-left text-sm font-normal border-border hover:border-primary/40 hover:bg-primary/5 transition-colors";
          if (submitted) {
            if (i === question.correctAnswer)
              cls =
                "justify-start h-auto py-2.5 px-4 text-left text-sm font-medium bg-green-500/10 border-green-500/40 text-green-700 dark:text-green-400";
            else if (i === selected)
              cls =
                "justify-start h-auto py-2.5 px-4 text-left text-sm font-normal bg-destructive/10 border-destructive/40 text-destructive";
          } else if (selected === i) {
            cls =
              "justify-start h-auto py-2.5 px-4 text-left text-sm font-medium border-primary bg-primary/10 text-primary ring-1 ring-primary/20";
          }

          return (
            <Button
              key={i}
              variant="outline"
              className={cls}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
            >
              <span className="mr-2.5 text-muted-foreground w-4 text-xs">
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </Button>
          );
        })}
      </div>

      <div className="pl-12">
        {!submitted ? (
          <Button
            onClick={() => setSubmitted(true)}
            disabled={selected === null}
            size="sm"
            className="min-w-[120px]"
          >
            {t.learn.checkAnswer}
          </Button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className={`p-4 rounded-xl border flex gap-3 ${
                correct
                  ? "bg-green-500/8 border-green-500/25"
                  : "bg-destructive/8 border-destructive/25"
              }`}
            >
              {correct ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              )}
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    correct
                      ? "text-green-700 dark:text-green-400"
                      : "text-destructive"
                  }`}
                >
                  {correct
                    ? lang === "hi"
                      ? "सही! 🎉"
                      : "Correct! 🎉"
                    : lang === "hi"
                      ? "गलत"
                      : "Incorrect"}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

export default function Learn() {
  const { lang, t } = useLanguage();

  const [selectedClassId, setSelectedClassId] = useState(mathClasses[0].id);
  const [expandedChapterId, setExpandedChapterId] = useState(mathClasses[0].chapters[0].id);
  const [activeShape, setActiveShape] = useState(
    mathClasses[0].chapters[0].shapeType
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const selectedClass =
    mathClasses.find((c) => c.id === selectedClassId) || mathClasses[0];
  const selectedChapter =
    selectedClass.chapters.find((c) => c.id === expandedChapterId) ||
    selectedClass.chapters[0];

  const chapterTitle = (ch) =>
    lang === "hi" && ch.titleHi ? ch.titleHi : ch.title;

  // Topics (language-aware)
  const topics =
    (topicData?.[lang]?.[expandedChapterId] ?? topicData?.en?.[expandedChapterId] ?? []) ||
    [];

  // Formulas + quizzes (language-aware where available)
  const formulasAndQuizzes =
    (formulaData?.[lang]?.[selectedClassId]?.[expandedChapterId] ??
      formulaData?.en?.[selectedClassId]?.[expandedChapterId]) ||
    null;

  const formulas =
    formulasAndQuizzes?.formulas || selectedChapter.formulas || [];
  const quizzes =
    formulasAndQuizzes?.quizzes || selectedChapter.quizzes || [];

  useEffect(() => {
    setActiveTab("overview");
    setActiveShape(selectedChapter.shapeType);
    setActiveSection(topics[0]?.id || null);
  }, [expandedChapterId]);

  useEffect(() => {
    const firstChapter = selectedClass.chapters[0];
    setExpandedChapterId(firstChapter.id);
    setActiveShape(firstChapter.shapeType);
    setActiveTab("overview");
  }, [selectedClassId]);

  // Scroll Spy Logic
  useEffect(() => {
    if (activeTab !== "overview") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".topic-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [expandedChapterId, activeTab, topics]);

  const handleClassSelect = (classId) => {
    setSelectedClassId(classId);
    setSidebarOpen(false);
  };

  const tabs = [
    { id: "overview", label: t.learn.overviewTitle, icon: BookOpen },
    { id: "formulas", label: t.learn.formulas, icon: Sigma },
    { id: "quiz", label: t.learn.quiz, icon: Zap },
    { id: "book", label: lang === "hi" ? "NCERT पुस्तक" : "NCERT Book", icon: Library },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background relative">
      {/* Sidebar */}
      <aside
        className={`
        fixed md:sticky top-16 z-40 md:z-auto
        w-72 md:w-72 border-r border-border bg-sidebar flex-shrink-0 flex flex-col
        h-[calc(100vh-4rem)] overflow-hidden
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-4 border-b border-border bg-sidebar space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1 mb-2">
            {t.learn.sidebarSelectClass}
          </p>

          <div className="grid grid-cols-4 gap-1.5">
            {mathClasses.map((c) => (
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

        <div className="flex-1 overflow-y-auto py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-5 mb-2">
            {t.learn.chapters}
          </p>

          <div className="space-y-0.5 px-2">
            {selectedClass.chapters.map((chapter) => {
              const isExpanded = expandedChapterId === chapter.id;
              const chapterTopics =
                topicData?.[lang]?.[chapter.id] ??
                topicData?.en?.[chapter.id] ??
                [];

              return (
                <div key={chapter.id}>
                  <button
                    onClick={() => setExpandedChapterId(chapter.id)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                      isExpanded
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <span className="truncate">{chapterTitle(chapter)}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

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
                          {chapterTopics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setActiveTab("overview");
                                setSidebarOpen(false);
                                setTimeout(() => {
                                  const el = document.getElementById(topic.id);
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              }}
                              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                                activeSection === topic.id
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

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>
              {selectedClass.title} · {selectedClass.chapters.length} {t.learn.chapters.toLowerCase()}
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 md:hidden flex items-center gap-3 px-4 py-3 bg-background/95 backdrop-blur border-b border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-secondary transition-colors relative z-50"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
            <span className="text-primary font-medium shrink-0">
              {selectedClass.title}
            </span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{chapterTitle(selectedChapter)}</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 pb-24 flex gap-10">
          <div className="flex-1 min-w-0 space-y-8">
          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-1.5 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">{selectedClass.title}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{chapterTitle(selectedChapter)}</span>
          </div>

          {/* Chapter heading */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
              {chapterTitle(selectedChapter)}
            </h1>
            <p className="text-muted-foreground text-sm">
              {`${selectedClass.title} · ${topics.length} ${lang === "hi" ? "टॉपिक्स" : "topics"} · ${formulas.length} ${lang === "hi" ? "सूत्र" : "formulas"} · ${quizzes.length} ${lang === "hi" ? "क्विज़ प्रश्न" : "quiz questions"}`}
            </p>
          </div>

          {/* Tab navigation */}
              <div className="flex gap-1 bg-secondary/60 p-1 rounded-2xl w-fit">
                {tabs.map((tab) => (
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
                {/* Overview */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-8"
                  >
                    <section className="space-y-4">
                      <h2 className="text-xl font-bold border-b border-border pb-2">
                        {t.learn.interactive3D}
                      </h2>
                      <div className="grid lg:grid-cols-3 gap-5">
                        <div className="lg:col-span-2 relative h-80 bg-secondary/30 rounded-2xl border border-border shadow-inner overflow-hidden">
                          <ThreeScene shapeType={activeShape} />
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                            <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border text-xs font-medium text-foreground shadow-sm capitalize">
                              {activeShape}
                            </div>
                            <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border text-xs text-muted-foreground shadow-sm flex items-center gap-1.5">
                              <RotateCcw className="h-3 w-3" /> {t.learn.dragToRotate}
                            </div>
                          </div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-5">
                          <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                            {t.learn.shapeControls}
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {["cube", "sphere", "cylinder", "cone", "icosahedron", "torus"].map(
                              (shape) => (
                                <Button
                                  key={shape}
                                  variant={activeShape === shape ? "default" : "outline"}
                                  className="w-full justify-start capitalize h-9 text-sm"
                                  onClick={() => setActiveShape(shape)}
                                >
                                  {shape}
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="space-y-16">
                        {topics.map((topic, i) => (
                          <div
                            key={topic.id}
                            id={topic.id}
                            className="topic-section scroll-mt-24 space-y-6"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                                {i + 1}
                              </div>
                              <h2 className="text-2xl font-bold text-foreground">
                                {topic.title}
                              </h2>
                            </div>
                            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
                              {topic.diagram && (
                                <div 
                                  className="flex justify-center mb-6 overflow-hidden"
                                  dangerouslySetInnerHTML={{ __html: topic.diagram }}
                                />
                              )}
                              <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-6">
                                {topic.content}
                              </p>
                              <div className="flex items-start gap-3 bg-primary/8 border border-primary/20 rounded-xl p-4">
                                <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                                    {t.learn.keyFact}
                                  </p>
                                  <p className="text-sm text-foreground font-medium leading-relaxed">
                                    {topic.keyFact}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: lang === "hi" ? "टॉपिक्स" : "Topics",
                          value: topics.length,
                          icon: BookOpen,
                          color: "text-blue-500",
                        },
                        {
                          label: lang === "hi" ? "फॉर्मूले" : "Formulas",
                          value: formulas.length,
                          icon: Sigma,
                          color: "text-violet-500",
                        },
                        {
                          label: lang === "hi" ? "क्विज़ प्रश्न" : "Quiz Q's",
                          value: quizzes.length,
                          icon: FlaskConical,
                          color: "text-amber-500",
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-card border border-border rounded-2xl p-4 text-center"
                        >
                          <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Formulas */}
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
                      {formulas.map((f, i) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="relative bg-card border border-border rounded-2xl p-5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                        >
                          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                            {f.title}
                          </p>
                          <p className="text-xl md:text-2xl font-mono text-card-foreground leading-relaxed">
                            {f.expression}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/20 rounded-2xl p-4">
                      <Trophy className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">{t.learn.proTip}</span>{" "}
                        {lang === "hi"
                          ? "प्रत्येक फॉर्मूला को हाथ से कम से कम 3 बार लिखें — एग्ज़ाम के लिए यही muscle memory सबसे ज़्यादा काम आती है!"
                          : "Write out each formula by hand at least 3 times — muscle memory is your best friend for exams!"}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Quiz */}
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
                        <span className="font-semibold">{quizzes.length}</span>{" "}
                        {lang === "hi" ? "प्रश्न" : "questions"}{" "}
                        {lang === "hi" ? "पर" : "on"} {chapterTitle(selectedChapter)}.{" "}
                        {lang === "hi"
                          ? "एक विकल्प चुनें और उत्तर जांचें।"
                          : 'Select an answer and click "Check Answer".'}
                      </p>
                    </div>

                    {quizzes.map((q, i) => (
                      <QuizCard
                        key={`${expandedChapterId}-${q.id}`}
                        question={q}
                        index={i}
                        t={t}
                        lang={lang}
                      />
                    ))}
                  </motion.div>
                )}

                {/* NCERT Book View */}
                {activeTab === "book" && (
                  <BookView
                    key={`book-${selectedClassId}-${expandedChapterId}`}
                    classId={selectedClassId}
                    chapterId={expandedChapterId}
                    lang={lang}
                  />
                )}
              </AnimatePresence>
          </div>

          {/* Right Sidebar - On this Page Table of Contents */}
          {activeTab === "overview" && (
            <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] px-1">
                  On this page
                </p>
                <nav className="flex flex-col space-y-1">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => {
                        const el = document.getElementById(topic.id);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`text-left text-xs py-2 px-3 border-l-2 transition-all hover:bg-secondary/50 ${
                        activeSection === topic.id
                          ? "border-primary text-primary font-semibold bg-primary/5"
                          : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      # {topic.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}