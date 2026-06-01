import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Pi,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Shapes,
  BrainCircuit,
  GraduationCap,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { useLanguage } from "./LanguageProvider";
import { useLoading } from "@/context/LoadingContext";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const classes = ["6", "7", "8", "9", "10", "11", "12"];

const classDropdown = classes.map((c) => ({
  label: `Class ${c}`,
  href: "/learn",
  desc:
    c === "6"
      ? "Geometry, Fractions, Algebra"
      : c === "7"
        ? "Triangles, Equations, Ratios"
        : c === "8"
          ? "Quadrilaterals, Mensuration, Identities"
          : c === "9"
            ? "Polynomials, Circles, Heron's Formula"
            : c === "10"
              ? "Trigonometry, Quadratics, Volumes"
              : c === "11"
                ? "Calculus, Conics, Binomial"
                : "Matrices, Integrals, Vectors",
}));

const resourceLinks = [
  {
    icon: Shapes,
    label: "3D Shape Explorer",
    desc: "Rotate & explore geometry",
    href: "/learn",
  },
  {
    icon: BookOpen,
    label: "Formula Library",
    desc: "All formulas by chapter",
    href: "/learn",
  },
  {
    icon: BrainCircuit,
    label: "Quick Quizzes",
    desc: "Test your understanding",
    href: "/learn",
  },
  {
    icon: FlaskConical,
    label: "Maths Lab",
    desc: "Interactive visual tools",
    href: "/learn",
  },
];

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const { setLanguage, t } = useLanguage();
  const { startLoading } = useLoading();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setClassesOpen(false);
    setResourcesOpen(false);
  };

  return _jsxs("nav", {
    className: "sticky top-0 z-50 w-full transition-all duration-300 " + (isScrolled || mobileOpen ? "border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent border-b border-transparent"),
    onMouseLeave: closeAll,
    children: [
      _jsxs("div", {
        className:
          "container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto",
        children: [
          _jsxs(Link, {
            href: "/",
            className:
              "flex items-center gap-2 flex-shrink-0 transition-opacity hover:opacity-85",
            children: [
              _jsx("img", {
                src: "/logo.png",
                alt: "Mathrix logo",
                className: "h-10 w-10 rounded-xl object-contain bg-transparent",
                draggable: false,
              }),
              _jsx("span", {
                className:
                  "text-2xl font-bold font-display tracking-tight text-foreground -ml-2 text-transparent bg-clip-text bg-gradient-to-r from-[#8B26EF] to-[#E317E3] font-bold",
                children: "athrix",

              }),
            ],
          }),

          _jsxs("div", {
            className: "hidden md:flex items-center gap-1 text-sm font-medium",
            children: [
              _jsx(Link, {
                href: "/",
                className:
                  "px-3 py-2 rounded-xl transition-colors " +
                  (location === "/"
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
                children: t.navbar.home,
              }),
              _jsx(Link, {
                href: "/learn",
                className:
                  "px-3 py-2 rounded-xl transition-colors " +
                  (location === "/learn"
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
                children: t.navbar.learn,
              }),

              _jsxs("div", {
                className: "relative",
                children: [
                  _jsxs("button", {
                    "data-testid": "nav-classes-btn",
                    onMouseEnter: () => {
                      setClassesOpen(true);
                      setResourcesOpen(false);
                    },
                    className:
                      "flex items-center gap-1 px-3 py-2 rounded-xl transition-colors " +
                      (classesOpen
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
                    children: [
                      "Classes",
                      _jsx(ChevronDown, {
                        className:
                          "h-3.5 w-3.5 transition-transform " +
                          (classesOpen ? "rotate-180" : ""),
                      }),
                    ],
                  }),

                  _jsx(AnimatePresence, {
                    children:
                      classesOpen &&
                      _jsxs(motion.div, {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 8 },
                        transition: { duration: 0.18 },
                        className:
                          "absolute left-0 top-full mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl p-2 z-50",
                        children: [
                          _jsx("p", {
                            className:
                              "text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 py-2",
                            children: "Select a class",
                          }),
                          _jsx("div", {
                            className: "grid grid-cols-2 gap-1",
                            children: classDropdown.map(({ label, href, desc }) =>
                              _jsxs("button", {
                                "data-testid": `nav-class-${label.replace(" ", "-")}`,
                                onClick: () => {
                                  setLocation(href);
                                  closeAll();
                                },
                                className:
                                  "flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors text-left",
                                children: [
                                  _jsx("span", {
                                    className:
                                      "font-semibold text-foreground text-sm",
                                    children: label,
                                  }),
                                  _jsx("span", {
                                    className:
                                      "text-xs text-muted-foreground leading-tight",
                                    children: desc,
                                  }),
                                ],
                              }, label)
                            ),
                          }),
                        ],
                      }),
                  }),
                ],
              }),

              _jsxs("div", {
                className: "relative",
                children: [
                  _jsxs("button", {
                    "data-testid": "nav-resources-btn",
                    onMouseEnter: () => {
                      setResourcesOpen(true);
                      setClassesOpen(false);
                    },
                    className:
                      "flex items-center gap-1 px-3 py-2 rounded-xl transition-colors " +
                      (resourcesOpen
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"),
                    children: [
                      t.navbar.resources,
                      _jsx(ChevronDown, {
                        className:
                          "h-3.5 w-3.5 transition-transform " +
                          (resourcesOpen ? "rotate-180" : ""),
                      }),
                    ],
                  }),

                  _jsx(AnimatePresence, {
                    children:
                      resourcesOpen &&
                      _jsxs(motion.div, {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 8 },
                        transition: { duration: 0.18 },
                        className:
                          "absolute left-0 top-full mt-2 w-64 bg-background border border-border rounded-2xl shadow-xl p-2 z-50",
                        children: resourceLinks.map(
                          ({ icon: Icon, label, desc, href }) =>
                            _jsxs("button", {
                              "data-testid": `nav-resource-${label
                                .replace(/\s+/g, "-")
                                .toLowerCase()}`,
                              onClick: () => {
                                setLocation(href);
                                closeAll();
                              },
                              className:
                                "w-full flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition-colors text-left",
                              children: [
                                _jsx("div", {
                                  className:
                                    "h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5",
                                  children: _jsx(Icon, { className: "h-4 w-4" }),
                                }),
                                _jsxs("div", {
                                  children: [
                                    _jsx("p", {
                                      className:
                                        "text-sm font-semibold text-foreground",
                                      children: label,
                                    }),
                                    _jsx("p", {
                                      className: "text-xs text-muted-foreground",
                                      children: desc,
                                    }),
                                  ],
                                }),
                              ],
                            })
                        ),
                      }),
                  }),
                ],
              }),

              _jsx(Link, {
                href: "/about",
                className:
                  "px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                children: t.navbar.about,
              }),
            ],
          }),

          _jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              _jsx(Button, {
                size: "sm",
                "data-testid": "nav-cta-btn",
                className:
                  "hidden md:flex h-9 px-4 rounded-full text-xs font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all",
                onClick: () => startLoading("/learn"),
                children: [
                  _jsx(GraduationCap, {
                    className: "h-3.5 w-3.5 mr-1.5",
                  }),
                  t.navbar.startLearning,
                  _jsx(ArrowRight, { className: "h-3 w-3 ml-1" }),
                ],
              }),

              _jsxs(Button, {
                variant: "ghost",
                size: "icon",
                "data-testid": "nav-theme-toggle",
                onClick: () => setTheme(theme === "light" ? "dark" : "light"),
                className: "rounded-full h-9 w-9",
                "aria-label": "Toggle theme",
                children: [
                  _jsx(Sun, {
                    className:
                      "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
                  }),
                  _jsx(Moon, {
                    className:
                      "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
                  }),
                ],
              }),

              _jsxs(Button, {
                variant: "ghost",
                size: "icon",
                "data-testid": "nav-mobile-toggle",
                onClick: () => setMobileOpen((v) => !v),
                className: "md:hidden rounded-full h-9 w-9",
                "aria-label": "Toggle menu",
                children: mobileOpen ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Menu, { className: "h-5 w-5" }),
              }),
            ],
          }),
        ],
      }),

      _jsx(AnimatePresence, {
        children:
          mobileOpen &&
          _jsxs(motion.div, {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.22 },
            className: "md:hidden border-t border-border bg-background overflow-hidden",
            children: [
              _jsxs("div", {
                className: "px-4 py-4 space-y-1",
                children: [
                  _jsx(Link, {
                    href: "/",
                    onClick: () => setMobileOpen(false),
                    className:
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors " +
                      (location === "/"
                        ? "text-primary bg-primary/8"
                        : "text-foreground hover:bg-secondary"),
                    children: t.navbar.home,
                  }),
                  _jsx(Link, {
                    href: "/learn",
                    onClick: () => setMobileOpen(false),
                    className:
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors " +
                      (location === "/learn"
                        ? "text-primary bg-primary/8"
                        : "text-foreground hover:bg-secondary"),
                    children: t.navbar.learn,
                  }),

                  _jsx("div", {
                    className: "pt-1 pb-1",
                    children: [
                      _jsx("p", {
                        className:
                          "text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 py-2",
                        children: t.navbar.classes,
                      }),
                      _jsxs("div", {
                        className: "grid grid-cols-4 gap-1",
                        children: classes.map((c) =>
                          _jsx(
                            "button",
                            {
                              key: c,
                              onClick: () => {
                                setLocation("/learn");
                                setMobileOpen(false);
                              },
                              className:
                                "flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border",
                              children: c,
                            },
                            c
                          )
                        ),
                      }),
                    ],
                  }),

                  _jsx("div", {
                    className: "pt-1",
                    children: [
                      _jsx("p", {
                        className:
                          "text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 py-2",
                        children: t.navbar.resources,
                      }),
                      resourceLinks.map(({ icon: Icon, label, href }) =>
                        _jsx(
                          "button",
                          {
                            key: label,
                            onClick: () => {
                              setLocation(href);
                              setMobileOpen(false);
                            },
                            className:
                              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-foreground hover:bg-secondary transition-colors text-left",
                            children: [
                              _jsx(Icon, { className: "h-4 w-4 text-primary" }),
                              label,
                            ],
                          },
                          label
                        )
                      ),
                    ],
                  }),

                  _jsx("div", {
                    className: "pt-2 pb-1",
                    children: _jsx(Button, {
                      className: "w-full rounded-xl",
                      onClick: () => {
                        startLoading("/learn");
                        setMobileOpen(false);
                      },
                      children: [
                        _jsx(GraduationCap, { className: "h-4 w-4 mr-2" }),
                        t.navbar.startLearning,
                      ],
                    }),
                  }),

                  _jsx(Link, {
                    href: "/about",
                    onClick: () => setMobileOpen(false),
                    className:
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors text-foreground hover:bg-secondary",
                    children: t.navbar.about,
                  }),

                  {/* Language select moved to Learn page */}
                ],
              }),
            ],
          }),
      }),
    ],
  });
}
