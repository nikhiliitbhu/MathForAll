import { motion } from "framer-motion";
import { Github, Mail, School, Heart, BookOpen, Sparkles, MapPin, ExternalLink, Code2, Palette, Pi, Shapes, BrainCircuit } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { SEO } from "@/components/SEO";
import { pageSEO } from "@/hooks/useSEO";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const developers = [
  {
    name: "Mithun Halder",
    role: "Team Leader & Frontend Developer",
    icon: Code2,
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
    description:
      "Team leader. Built the frontend using React, Tailwind CSS, and Framer Motion. Focused on UI architecture and smooth animations.",
    skills: ["React", "Tailwind CSS", "Framer Motion"],
    portfolioUrl: "https://mithunhalder01.github.io/portfolio/",
  },
  {
    name: "Ansh Pandey",
    role: "Logic & Development (HTML/CSS/JS)",
    icon: Code2,
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    description:
      "Works on logic and development using HTML, CSS, and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript"],
    portfolioUrl: "https://github.com/",
  },
  {
    name: "Nitin Patel",
    role: "Professional UI & Development (HTML/CSS/JS)",
    icon: Palette,
    color: "from-fuchsia-500 to-pink-600",
    glow: "shadow-fuchsia-500/20",
    description:
      "Specializes in professional UI and implementation using HTML, CSS, and JavaScript.",
    skills: ["UI", "HTML", "CSS", "JavaScript"],
    portfolioUrl: "https://github.com/",
  },
  {
    name: "Shubham Tiwari",
    role: "Logic, Content & Frontend (HTML/CSS/JS)",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    description:
      "Handles logic/content and builds interactive frontend pieces using HTML, CSS, and JavaScript.",
    skills: ["Content", "Logic", "HTML/CSS/JS"],
    portfolioUrl: "https://github.com/",
  },
  {
    name: "Ravi Kushwaha",
    role: "3D Interactive Design (Three.js)",
    icon: Shapes,
    color: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/20",
    description:
      "Builds interactive 3D visuals using Three.js alongside HTML/CSS/JavaScript.",
    skills: ["Three.js", "3D", "JavaScript"],
    portfolioUrl: "https://github.com/",
  },
  {
    name: "Vaibhav Jha",
    role: "Logic & Frontend Development (HTML/CSS/JS)",
    icon: BrainCircuit,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    description:
      "Works on application logic and frontend development using HTML, CSS, and JavaScript.",
    skills: ["Logic", "HTML", "CSS", "JavaScript"],
    portfolioUrl: "https://github.com/",
  },
];

export default function About() {
  const { t } = useLanguage();
  const seo = pageSEO.about;

  const projectInfo = [
    { label: t.about.projLabelName, value: "Mathrix" },
    { label: t.about.projLabelPurpose, value: t.about.projValuePurpose },
    { label: t.about.projLabelStack, value: "React · Vite · Tailwind CSS · Three.js" },
    { label: t.about.projLabelVersion, value: "1.0.0" },
  ];
  
  return (
    <>
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        type={seo.type}
      />
      <div className="min-h-screen bg-background text-foreground">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 40px,hsl(var(--foreground)) 40px,hsl(var(--foreground)) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,hsl(var(--foreground)) 40px,hsl(var(--foreground)) 41px)",
          }}
        />
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.about.aboutChip}
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-5"
          >
            {t.about.aboutTitle.split(t.about.passionWord)[0]}
            <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
              {t.about.passionWord}
            </span>
            {t.about.aboutTitle.split(t.about.passionWord)[1]}
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t.about.aboutDesc}
          </motion.p>
        </div>
      </section>

      {/* ── School & ISKCON ── */}
      <section className="py-12 border-y border-border bg-secondary/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-6">

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <School className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{t.about.school}</p>
                <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-foreground text-base leading-snug">
                      GIC Noida Sector 12
                    </h3>
                  <a
                    href="https://gicnoida.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    aria-label="School portfolio"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.about.schoolDesc}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className="flex items-start gap-4 rounded-2xl border border-border bg-background p-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{t.about.inspiredBy}</p>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-foreground text-base leading-snug">
                    ISKCON Temple, Noida
                  </h3>
                  <a
                    href="https://iskconnoida.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    aria-label="ISKCON portfolio"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {t.about.iskconDesc}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Developers ── */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.about.theTeam}</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.about.meetDevelopers}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {developers.map((dev, i) => (
              <motion.div
                key={dev.name}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-background p-7 shadow-lg ${dev.glow} hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br ${dev.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${dev.color} shadow-md`}>
                    <dev.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{dev.name}</h3>
                  <p className="text-sm font-medium text-primary mb-3">{dev.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{dev.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {dev.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-secondary px-3 py-0.5 text-xs font-medium text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {dev.portfolioUrl && (
                    <a
                      href={dev.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t.about.portfolio}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Info ── */}
      <section className="py-14 border-t border-border bg-secondary/20">
        <div className="container max-w-4xl mx-auto px-4">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{t.about.credits}</p>
            <h2 className="text-3xl font-bold tracking-tight">{t.about.projectInfo}</h2>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
            className="rounded-2xl border border-border bg-background overflow-hidden"
          >
            {projectInfo.map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between px-6 py-4 ${i !== projectInfo.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                <span className="text-sm text-foreground font-semibold text-right">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 shadow-lg shadow-primary/30">
              <Pi className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t.about.readyTitle}</h2>
            <p className="text-muted-foreground mb-8">{t.about.readyDesc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/learn">
                <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-primary to-fuchsia-600 hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                  <BookOpen className="h-4 w-4" />
                  {t.about.startLearning}
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                  {t.about.backToHome}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          {t.about.footerNote.split("GIC")[0]}
          <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
          {"GIC" + t.about.footerNote.split("GIC")[1]}
        </span>
      </div>

      </div>
    </>
  );
}