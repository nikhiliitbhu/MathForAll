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

  const hi = lang === "hi";

  const value = useMemo(() => ({
    lang,
    setLanguage: setLang,
    t: {
      // ── Navbar ──────────────────────────────────────────────────
      navbar: {
        home: hi ? "होम" : "Home",
        learn: hi ? "सीखें" : "Learn",
        about: hi ? "के बारे में" : "About",
        resources: hi ? "संसाधन" : "Resources",
        classes: hi ? "क्लासेस" : "Classes",
        startLearning: hi ? "शुरू करें" : "Start Learning",
        selectLanguage: hi ? "भाषा चुनें" : "Select language",
        english: "English",
        hindi: "हिंदी",
        selectClass: hi ? "एक कक्षा चुनें" : "Select a class",
        // Class dropdown descriptions
        cls6desc: hi ? "ज्यामिति, भिन्न, बीजगणित" : "Geometry, Fractions, Algebra",
        cls7desc: hi ? "त्रिभुज, समीकरण, अनुपात" : "Triangles, Equations, Ratios",
        cls8desc: hi ? "चतुर्भुज, क्षेत्रमिति, सर्वसमिकाएँ" : "Quadrilaterals, Mensuration, Identities",
        cls9desc: hi ? "बहुपद, वृत्त, हेरॉन का सूत्र" : "Polynomials, Circles, Heron's Formula",
        cls10desc: hi ? "त्रिकोणमिति, द्विघात, आयतन" : "Trigonometry, Quadratics, Volumes",
        cls11desc: hi ? "कलन, शंकु, द्विपद" : "Calculus, Conics, Binomial",
        cls12desc: hi ? "आव्यूह, समाकलन, सदिश" : "Matrices, Integrals, Vectors",
        // Resource labels
        res3dExplorer: hi ? "3D आकृति एक्सप्लोरर" : "3D Shape Explorer",
        res3dDesc: hi ? "घुमाएं और ज्यामिति देखें" : "Rotate & explore geometry",
        resFormulaLib: hi ? "सूत्र पुस्तकालय" : "Formula Library",
        resFormulaDesc: hi ? "अध्यायवार सभी सूत्र" : "All formulas by chapter",
        resQuizzes: hi ? "त्वरित क्विज़" : "Quick Quizzes",
        resQuizzesDesc: hi ? "अपनी समझ परखें" : "Test your understanding",
        resMathsLab: hi ? "मैथ्स लैब" : "Maths Lab",
        resMathsLabDesc: hi ? "इंटरेक्टिव विज़ुअल टूल्स" : "Interactive visual tools",
      },

      // ── Home page ────────────────────────────────────────────────
      home: {
        // Hero
        forClass: hi ? "कक्षा 6–12 के छात्र" : "For Class 6–12 Students",
        learnTitlePrefix: hi ? "गणित सीखें." : "Learn Maths.",
        scoreHigher: hi ? "अच्छा स्कोर करें." : "Score Higher.",
        heroDesc: hi
          ? "कक्षा 6–12 के लिए आपका पूरा गणित गाइड। चैप्टर-वाइज पढ़ें, फॉर्मूला में महारत पाएं, और क्विज़ के साथ खुद को टेस्ट करें — सब कुछ एक ही जगह, पूरी तरह फ्री।"
          : "Your complete Maths guide for Class 6–12. Study chapter-wise, master formulas, test yourself with quizzes — all in one place, completely free.",
        startLearningNow: hi ? "अभी सीखना शुरू करें" : "Start Learning Now",
        viewSyllabus: hi ? "सिलेबस देखें" : "View Syllabus",

        // Stats
        statClassesCovered: hi ? "कक्षाएँ शामिल" : "Classes Covered",
        statChapters: hi ? "अध्याय" : "Chapters",
        statFormulas: hi ? "सूत्र" : "Formulas",
        statQuizQuestions: hi ? "क्विज़ प्रश्न" : "Quiz Questions",

        // Features (What you get)
        whatYouGet: hi ? "आपको क्या मिलेगा" : "What you get",
        everythingYouNeed: hi ? "गणित में आगे बढ़ने के लिए सब कुछ" : "Everything you need to ace Maths",
        feat1Title: hi ? "अध्यायवार अध्ययन" : "Chapter-wise Study",
        feat1Desc: hi
          ? "कक्षा 6–12 NCERT गणित का हर अध्याय — व्याख्या, मुख्य अवधारणाओं और हल उदाहरणों के साथ।"
          : "Every chapter of Class 6–12 NCERT Maths — neatly organised with explanations, key concepts, and solved examples.",
        feat2Title: hi ? "सूत्र पुस्तकालय" : "Formula Library",
        feat2Desc: hi
          ? "सभी सूत्र, प्रमेय और सर्वसमिकाएँ एक ही जगह। साधारण भिन्नों से अवकल समीकरणों तक — आसानी से खोजें।"
          : "All formulas, theorems, and identities in one place. From basic fractions to differential equations — easy to find, easy to remember.",
        feat3Title: hi ? "अभ्यास क्विज़" : "Practice Quizzes",
        feat3Desc: hi
          ? "हर अध्याय के बाद MCQ क्विज़ से खुद को परखें। तुरंत परिणाम और व्याख्या के साथ।"
          : "Topic-wise MCQ quizzes to test yourself after every chapter. Instant results with explanations so you learn from mistakes.",
        feat4Title: hi ? "3D आकृतियाँ" : "Visual 3D Shapes",
        feat4Desc: hi
          ? "इंटरेक्टिव 3D मॉडल से क्षेत्रमिति और ज्यामिति को बेहतर समझें — घुमाएं और सूत्र लाइव देखें।"
          : "Understand mensuration and geometry better with interactive 3D shape models — rotate them, see formulas update live.",
        feat5Title: hi ? "डार्क और लाइट मोड" : "Dark & Light Mode",
        feat5Desc: hi
          ? "दिन के किसी भी समय सुविधाजनक रूप से पढ़ें — सावधानी से डिज़ाइन किए गए डार्क और लाइट मोड के साथ।"
          : "Study comfortably any time of day with a carefully designed dark mode and crisp light mode.",
        feat6Title: hi ? "हमेशा मुफ़्त" : "Always Free",
        feat6Desc: hi
          ? "कोई लॉगिन नहीं, कोई पेवॉल नहीं, कोई विज्ञापन नहीं। बस खोलें और पढ़ना शुरू करें।"
          : "No login, no paywall, no ads. Just open and start learning. Knowledge should always be accessible.",

        // How it works
        simpleToUse: hi ? "उपयोग में आसान" : "Simple to use",
        howItWorks: hi ? "कैसे काम करता है" : "How it works",
        step1Title: hi ? "अपनी कक्षा चुनें" : "Pick Your Class",
        step1Desc: hi
          ? "कक्षा 6 से 12 में से अपनी कक्षा चुनें और तुरंत अपने पाठ्यक्रम की पूरी अध्याय सूची पाएं।"
          : "Select your class from 6 to 12 and instantly get the full chapter list for your curriculum.",
        step2Title: hi ? "देखें और समझें" : "Explore & Visualise",
        step2Desc: hi
          ? "सुंदर फॉर्मूला कार्ड्स देखें और लाइव 3D ज्यामितीय आकृतियों के साथ इंटरेक्ट करें।"
          : "Browse beautifully formatted formula cards and interact with live 3D geometric shapes.",
        step3Title: hi ? "खुद को परखें" : "Test Yourself",
        step3Desc: hi
          ? "चैप्टर-विशेष क्विज़ लें और तुरंत फीडबैक से जो सीखा उसे पक्का करें।"
          : "Take chapter-specific quizzes with instant feedback to lock in what you have learnt.",

        // Browse by class
        browseByClass: hi ? "कक्षा के अनुसार" : "Browse by class",
        findYourClass: hi ? "अपनी कक्षा ढूंढें" : "Find your class",
        findClassDesc: hi
          ? "हर कक्षा की अपनी पूरी चैप्टर लाइब्रेरी, फॉर्मूला सेट और क्विज़ बैंक है।"
          : "Every class has its own complete chapter library, formula set, and quiz bank.",
        classLabel: hi ? "कक्षा" : "Class",
        openClass: hi ? "खोलें" : "Open",
        shapeExplorer3D: hi ? "3D आकृति एक्सप्लोरर" : "3D Shape Explorer",
        dragToRotateShort: hi ? "घुमाने के लिए खींचें" : "Drag to rotate",

        // Shape showcase
        visualLearning: hi ? "विज़ुअल लर्निंग टूल" : "Visual Learning Tool",
        seeRotateGet: hi ? "देखें. घुमाएं. समझें." : "See it. Rotate it. Get it.",
        geometryDesc: hi
          ? "जब आप आकृतियाँ देख सकते हैं तो ज्यामिति और क्षेत्रमिति आसान हो जाती है। नीचे किसी भी आकृति को घुमाएं — सूत्र और तथ्य लाइव अपडेट होते हैं।"
          : "Geometry and mensuration become easy when you can see them. Drag any shape below to rotate it — the formula and a quick fact update live as you switch.",
        selectShapeLabel: hi ? "आकृति चुनें" : "Select Shape",
        formulaLabel: hi ? "सूत्र" : "Formula",
        didYouKnow: hi ? "क्या आप जानते हैं?" : "Did you know?",
        exploreInLab: hi ? "लैब में देखें" : "Explore in Lab",
        dragToRotate: hi ? "घुमाने के लिए खींचें" : "Drag to rotate",
        // Shape labels and facts
        shapeCubeLabel: hi ? "घन" : "Cube",
        shapeCubeFact: hi
          ? "एक घन के 6 समान वर्गाकार फलक, 12 किनारे और 8 शीर्ष होते हैं। यह पाँच प्लेटोनिक ठोसों में से एक है।"
          : "A cube has 6 identical square faces, 12 edges, and 8 vertices. It is one of the five Platonic solids.",
        shapeSphereLabel: hi ? "गोला" : "Sphere",
        shapeSphereFact: hi
          ? "गोला पूरी तरह सममित है — इसके हर बिंदु से केंद्र की दूरी बराबर होती है।"
          : "A sphere is perfectly symmetrical — every point on its surface is equidistant from the centre.",
        shapeCylinderLabel: hi ? "बेलन" : "Cylinder",
        shapeCylinderFact: hi
          ? "बेलन में दो वृत्ताकार आधार और एक वक्र पृष्ठ होता है। इसका आयतन = आधार क्षेत्रफल × ऊँचाई।"
          : "A cylinder has two circular bases connected by a curved surface. Its volume equals the base area times height.",
        shapeConeLabel: hi ? "शंकु" : "Cone",
        shapeConeFact: hi
          ? "तिरछी ऊँचाई l = √(r²+h²)। शंकु का आयतन, समान आधार वाले बेलन के आयतन का ठीक एक-तिहाई होता है।"
          : "The slant height l = √(r²+h²). A cone's volume is exactly one-third of a cylinder with the same base and height.",
        shapeOctahedronLabel: hi ? "अष्टफलक" : "Octahedron",
        shapeOctahedronFact: hi
          ? "अष्टफलक के 8 समबाहु त्रिकोणीय फलक, 6 शीर्ष और 12 किनारे होते हैं। यह घन का द्वैत है।"
          : "An octahedron has 8 equilateral triangle faces, 6 vertices, and 12 edges. It is dual to the cube.",
        shapeTorusLabel: hi ? "टोरस" : "Torus",
        shapeTorusFact: hi
          ? "टोरस एक वृत्त को अक्ष के चारों ओर घुमाने से बनता है। यह एक डोनट जैसा दिखता है!"
          : "A torus is generated by revolving a circle of radius r around an axis at distance R. It looks like a donut!",

        // Highlights / Built for India section
        builtForIndia: hi ? "भारत की कक्षाओं के लिए" : "Built for India's classrooms",
        designedTitle: hi ? "छात्रों के लिए डिज़ाइन किया गया, शिक्षकों का भरोसा" : "Designed for students, trusted by teachers",
        mathrixBridges: hi
          ? "Mathrix अमूर्त समीकरणों और वास्तविक समझ के बीच की खाई को पाटता है — विशेष रूप से भारत के स्कूल मैथ्स लैब के लिए, NCERT पाठ्यक्रम को पूरी तरह कवर करता है।"
          : "Mathrix bridges the gap between abstract equations and real understanding — built specifically for school Maths Labs across India, covering the complete NCERT curriculum.",
        hl1: hi ? "कोई लॉगिन नहीं — खोलें और तुरंत शुरू करें" : "No login required — open and start instantly",
        hl2: hi ? "कक्षा 6 से 12 तक का पूरा NCERT पाठ्यक्रम" : "Covers entire NCERT syllabus from Class 6 to 12",
        hl3: hi ? "खींचकर घुमाएं — इंटरेक्टिव 3D आकृति व्यूअर" : "Drag-to-rotate interactive 3D shape viewer",
        hl4: hi ? "क्विज़ में तुरंत फीडबैक और व्याख्या" : "Instant quiz feedback with explanations",
        hl5: hi ? "किसी भी डिवाइस पर — डेस्कटॉप, टैबलेट या फोन" : "Works on any device — desktop, tablet, or phone",
        hl6: hi ? "डार्क और लाइट मोड से आरामदायक पढ़ाई" : "Dark and light mode for comfortable studying",

        // Mini feature cards
        ncertAligned: hi ? "NCERT के अनुसार" : "NCERT Aligned",
        ncertAlignedDesc: hi
          ? "हर अध्याय आधिकारिक NCERT कक्षा 6–12 पाठ्यक्रम के अनुसार है।"
          : "Every chapter follows the official Class 6–12 NCERT curriculum structure.",
        mathsLabReady: hi ? "मैथ्स लैब के लिए" : "Maths Lab Ready",
        mathsLabReadyDesc: hi
          ? "विज़ुअल और व्यावहारिक सीखने के साथ स्कूल मैथ्स लैब के लिए विशेष रूप से डिज़ाइन।"
          : "Designed specifically for school Maths Labs with visual, hands-on learning.",
        anyDevice: hi ? "कोई भी डिवाइस" : "Any Device",
        anyDeviceDesc: hi
          ? "डेस्कटॉप, टैबलेट और फोन पर काम करता है — कोई ऐप इंस्टॉलेशन नहीं।"
          : "Works on desktop, tablet, and phone — no app installation needed.",
        instantAccess: hi ? "तुरंत एक्सेस" : "Instant Access",
        instantAccessDesc: hi
          ? "कोई लॉगिन नहीं, कोई साइन-अप नहीं। साइट खोलें और सेकंड में पढ़ना शुरू करें।"
          : "No login, no sign-up. Open the site and start learning in seconds.",

        // Quote
        quote: hi
          ? "गणित संख्याओं, समीकरणों या एल्गोरिदम के बारे में नहीं है — यह समझ के बारे में है।"
          : "Mathematics is not about numbers, equations, or algorithms — it is about understanding.",
        quoteAuthor: hi ? "विलियम पॉल थर्स्टन — फील्ड्स मेडल विजेता" : "William Paul Thurston — Fields Medal Laureate",

        // CTA
        ctaReadyTo: hi ? "गणित में" : "Ready to",
        ctaExcel: hi ? "उत्कृष्ट बनें?" : "excel in Maths?",
        ctaJoin: hi
          ? "हजारों छात्रों से जुड़ें जो समझकर पढ़ते हैं — मुश्किल नहीं। अपनी कक्षा चुनें और आज ही शुरू करें।"
          : "Join thousands of students who study smarter — not harder. Pick your class and start today.",
        ctaExplore: hi ? "अभी शुरू करें" : "Start Learning Now",
        backToHome: hi ? "होम पर वापस" : "Back to Home",

        // Footer
        footerDesc: hi
          ? "भारत के स्कूल मैथ्स लैब के लिए बना इंटरेक्टिव गणित लर्निंग प्लेटफॉर्म। विज़ुअल, स्थानिक और हमेशा मुफ़्त।"
          : "An interactive mathematics learning platform built for school Maths Labs across India. Visual, spatial, and always free.",
        footerClassesLabel: hi ? "Classes" : "Classes",
        footerStat1: hi ? "कक्षाएँ" : "Classes",
        footerStat2: hi ? "अध्याय" : "Chapters",
        footerStat3: hi ? "सूत्र" : "Formulas",
        footerStat4: hi ? "3D आकृतियाँ" : "3D Shapes",
        footerStat5: hi ? "क्विज़ प्रश्न" : "Quiz Questions",
        copyright: hi ? "© 2026 Mathrix. हर छात्र के लिए मुफ़्त गणित।" : "© 2026 Mathrix. Free Maths learning for every student.",
        footerTagline: hi ? "कक्षा 6–12 · NCERT के अनुसार · हमेशा मुफ़्त" : "Class 6–12 · NCERT Aligned · Always Free",
        privacy: hi ? "गोपनीयता" : "Privacy",
        terms: hi ? "नियम" : "Terms",
        contact: hi ? "संपर्क" : "Contact",
        // Footer link labels
        flHome: hi ? "होम" : "Home",
        flStartLearning: hi ? "सीखना शुरू करें" : "Start Learning",
        flAboutMathsLab: hi ? "मैथ्स लैब के बारे में" : "About MathsLab",
        flClassSelector: hi ? "कक्षा चुनें" : "Class Selector",
        flAlgebra: hi ? "बीजगणित और संख्याएँ" : "Algebra & Numbers",
        flGeometry: hi ? "ज्यामिति" : "Geometry",
        flTrigonometry: hi ? "त्रिकोणमिति" : "Trigonometry",
        flCalculus: hi ? "कलन और सीमाएँ" : "Calculus & Limits",
        flStatistics: hi ? "सांख्यिकी" : "Statistics",
        flProbability: hi ? "प्रायिकता" : "Probability",
        flFormulaLib: hi ? "सूत्र पुस्तकालय" : "Formula Library",
        fl3DExplorer: hi ? "3D आकृति एक्सप्लोरर" : "3D Shape Explorer",
        flQuizzes: hi ? "त्वरित क्विज़" : "Quick Quizzes",
        flChapterGuide: hi ? "अध्याय गाइड" : "Chapter Guide",
        flDarkMode: hi ? "डार्क मोड" : "Dark Mode",
        // Footer section headings
        fhQuickLinks: hi ? "त्वरित लिंक" : "Quick Links",
        fhSubjects: hi ? "विषय" : "Subjects",
        fhTools: hi ? "टूल्स" : "Tools",
        fhClasses: hi ? "कक्षाएँ" : "Classes",
      },

      // ── About page ───────────────────────────────────────────────
      about: {
        aboutChip: hi ? "Mathrix के बारे में" : "About Mathrix",
        aboutTitle: hi ? "जुनून के साथ बना" : "Built with passion for maths",
        passionWord: hi ? "जुनून" : "passion",
        aboutDesc: hi
          ? "Mathrix कक्षा 6–12 के छात्रों के लिए एक फ्री गणित प्लेटफ़ॉर्म है। इसे उन छात्रों ने बनाया है जिन्होंने गणित सीखना सच में आनंददायक बनाना चाहा।"
          : "Mathrix is a free mathematics platform for students of Class 6–12. Conceived, designed, and developed by two students who wanted to make learning maths genuinely enjoyable.",
        school: hi ? "स्कूल" : "School",
        schoolDesc: hi ? "मूल्यों, उत्कृष्टता और समग्र शिक्षा में निहित एक स्कूल।" : "A school rooted in values, excellence, and holistic education.",
        inspiredBy: hi ? "प्रेरित" : "Inspired by",
        iskconDesc: hi
          ? "हम ISKCON समुदाय से जुड़े होने पर गर्व महसूस करते हैं, जिनके समर्पण और निस्वार्थ सेवा के मूल्य हमारे काम को प्रेरित करते हैं।"
          : "We are proud to be associated with the ISKCON community, whose values of dedication and selfless service inspire our work.",
        theTeam: hi ? "टीम" : "The Team",
        meetDevelopers: hi ? "डेवलपर्स से मिलें" : "Meet the developers",
        portfolio: hi ? "पोर्टफोलियो" : "Portfolio",
        credits: hi ? "श्रेय" : "Credits",
        projectInfo: hi ? "प्रोजेक्ट जानकारी" : "Project information",
        projLabelName: hi ? "प्रोजेक्ट का नाम" : "Project Name",
        projLabelPurpose: hi ? "उद्देश्य" : "Purpose",
        projLabelStack: hi ? "टेक स्टैक" : "Stack",
        projLabelVersion: hi ? "संस्करण" : "Version",
        projValuePurpose: hi ? "कक्षा 6–12 के छात्रों के लिए मुफ़्त गणित संसाधन" : "Free mathematics resource for Class 6–12 students",
        readyTitle: hi ? "शुरू करने के लिए तैयार?" : "Ready to start learning?",
        readyDesc: hi
          ? "अध्याय, फॉर्मूला और क्विज़ — सब कुछ फ्री, हमेशा के लिए।"
          : "Explore chapters, formulas, and quizzes — all free, forever.",
        startLearning: hi ? "सीखना शुरू करें" : "Start Learning",
        backToHome: hi ? "होम पर वापस" : "Back to Home",
        footerNote: hi ? "प्यार के साथ बनाया GIC नोएडा, 2026. सर्वाधिकार सुरक्षित।" : "Made with GIC Noida, 2026. All rights reserved.",
      },

      // ── Learn page ───────────────────────────────────────────────
      learn: {
        sidebarSelectClass: hi ? "कक्षा चुनें" : "Select Class",
        chapters: hi ? "चैप्टर्स" : "Chapters",
        overviewTitle: hi ? "ओवरव्यू" : "Overview",
        formulas: hi ? "फॉर्मूले" : "Formulas",
        quiz: hi ? "क्विज़" : "Quiz",
        selectShape: hi ? "शेप चुनें" : "Select Shape",
        interactive3D: hi ? "इंटरएक्टिव 3D एक्सप्लोरर" : "Interactive 3D Explorer",
        topicsInChapter: hi ? "इस चैप्टर के टॉपिक्स" : "Topics in this Chapter",
        allTopicsInChapter: hi ? "इस चैप्टर के सभी टॉपिक्स" : "All topics in this chapter",
        backToChapter: hi ? "चैप्टर ओवरव्यू पर वापस" : "Back to chapter overview",
        shapeControls: hi ? "शेप कंट्रोल्स" : "Shape Controls",
        checkAnswer: hi ? "उत्तर जांचें" : "Check Answer",
        keyFact: hi ? "मुख्य बात" : "Key Fact",
        proTip: hi ? "प्रो टिप:" : "Pro tip:",
        dragToRotate: hi ? "घुमाने के लिए ड्रैग करें" : "Drag to rotate",
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
