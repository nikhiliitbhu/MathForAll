import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const STORAGE_KEY = "mathrix_lang";

const normalizeLang = (v) => (v === "hi" ? "hi" : "en");

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLang(normalizeLang(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLanguage: setLang,
    t: {
      // Navbar
      navbar: {
        home: lang === "hi" ? "होम" : "Home",
        learn: lang === "hi" ? "सीखें" : "Learn",
        about: lang === "hi" ? "के बारे में" : "About",
        resources: lang === "hi" ? "संसाधन" : "Resources",
        classes: lang === "hi" ? "क्लासेस" : "Classes",
        startLearning: lang === "hi" ? "शुरू करें" : "Start Learning",
        selectLanguage: lang === "hi" ? "भाषा चुनें" : "Select language",
        english: "English",
        hindi: "हिंदी",
      },

      // Home page (best-effort)
      home: {
        forClass: lang === "hi" ? "कक्षा 6–12 के छात्र" : "For Class 6–12 Students",
        learnTitlePrefix: lang === "hi" ? "गणित सीखें." : "Learn Maths.",
        scoreHigher: lang === "hi" ? "अच्छा स्कोर करें." : "Score Higher.",
        heroDesc:
          lang === "hi"
            ? "कक्षा 6–12 के लिए आपका पूरा गणित गाइड। चैप्टर-वाइज पढ़ें, फॉर्मूला में महारत पाएं, और क्विज़ के साथ खुद को टेस्ट करें — सब कुछ एक ही जगह, पूरी तरह फ्री।"
            : "Your complete Maths guide for Class 6–12. Study chapter-wise, master formulas, test yourself with quizzes — all in one place, completely free.",
        startLearningNow: lang === "hi" ? "अभी सीखना शुरू करें" : "Start Learning Now",
        viewSyllabus: lang === "hi" ? "सिलेबस देखें" : "View Syllabus",

        whatYouGet: lang === "hi" ? "आपको क्या मिलेगा" : "What you get",
        everythingYouNeed: lang === "hi" ? "गणित में आगे बढ़ने के लिए सब कुछ" : "Everything you need to ace Maths",

        browseByClass: lang === "hi" ? "कक्षा के अनुसार" : "Browse by class",
        findYourClass: lang === "hi" ? "अपनी कक्षा ढूंढें" : "Find your class",
        findClassDesc:
          lang === "hi"
            ? "हर कक्षा की अपनी पूरी चैप्टर लाइब्रेरी, फॉर्मूला सेट और क्विज़ बैंक है।"
            : "Every class has its own complete chapter library, formula set, and quiz bank.",

        howItWorks: lang === "hi" ? "कैसे काम करता है" : "How it works",
        simpleToUse: lang === "hi" ? "यूज़ करने में आसान" : "Simple to use",

        ctaReadyTo: lang === "hi" ? "गणित में" : "Ready to",
        ctaExcel: lang === "hi" ? "बेहतर बनें?" : "excel in Maths?",
        ctaJoin:
          lang === "hi"
            ? "हजारों छात्रों से जुड़ें जो समझकर पढ़ते हैं — मुश्किल नहीं। अपनी कक्षा चुनें और आज ही शुरू करें।"
            : "Join thousands of students who study smarter — not harder. Pick your class and start today.",
        ctaExplore:
          lang === "hi" ? "शुरू करें" : "Start Learning Now",
        backToHome: lang === "hi" ? "होम पर वापस" : "Back to Home",
      },

      // About page (best-effort)
      about: {
        aboutChip: lang === "hi" ? "Mathrix के बारे में" : "About Mathrix",
        aboutTitle:
          lang === "hi" ? "जुनून के साथ बना" : "Built with passion for maths",
        aboutDesc:
          lang === "hi"
            ? "Mathrix कक्षा 6–12 के छात्रों के लिए एक फ्री गणित प्लेटफ़ॉर्म है। इसे दो छात्रों ने बनाया है जिन्होंने गणित सीखना सच में आनंददायक बनाना चाहा।"
            : "Mathrix is a free mathematics platform for students of Class 6–12. Conceived, designed, and developed by two students who wanted to make learning maths genuinely enjoyable.",

        school: lang === "hi" ? "स्कूल" : "School",
        inspiredBy: lang === "hi" ? "प्रेरित" : "Inspired by",
        theTeam: lang === "hi" ? "टीम" : "The Team",
        meetDevelopers: lang === "hi" ? "डेवलपर्स से मिलें" : "Meet the developers",

        projectInfo: lang === "hi" ? "प्रोजेक्ट जानकारी" : "Project information",
        readyTitle: lang === "hi" ? "शुरू करने के लिए तैयार?" : "Ready to start learning?",
        readyDesc:
          lang === "hi"
            ? "अध्याय, फॉर्मूला और क्विज़ — सब कुछ फ्री, हमेशा के लिए।"
            : "Explore chapters, formulas, and quizzes — all free, forever.",
      },

      // Learn page
      learn: {
        sidebarSelectClass: lang === "hi" ? "कक्षा चुनें" : "Select Class",
        chapters: lang === "hi" ? "चैप्टर्स" : "Chapters",
        overviewTitle: lang === "hi" ? "ओवरव्यू" : "Overview",
        formulas: lang === "hi" ? "फॉर्मूले" : "Formulas",
        quiz: lang === "hi" ? "क्विज़" : "Quiz",
        selectShape: lang === "hi" ? "शेप चुनें" : "Select Shape",
        interactive3D: lang === "hi" ? "इंटरएक्टिव 3D एक्सप्लोरर" : "Interactive 3D Explorer",
        topicsInChapter: lang === "hi" ? "इस चैप्टर के टॉपिक्स" : "Topics in this Chapter",
        allTopicsInChapter: lang === "hi" ? "इस चैप्टर के सभी टॉपिक्स" : "All topics in this chapter",
        backToChapter: lang === "hi" ? "चैप्टर ओवरव्यू पर वापस" : "Back to chapter overview",
        shapeControls: lang === "hi" ? "शेप कंट्रोल्स" : "Shape Controls",
        checkAnswer: lang === "hi" ? "उत्तर जांचें" : "Check Answer",
        keyFact: lang === "hi" ? "मुख्य बात" : "Key Fact",
        proTip: lang === "hi" ? "प्रो टिप:" : "Pro tip:",
        dragToRotate: lang === "hi" ? "घुमाने के लिए ड्रैग करें" : "Drag to rotate",
      },
    },
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

