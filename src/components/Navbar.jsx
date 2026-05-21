import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Pi, Menu, X, ChevronDown, BookOpen, Shapes, BrainCircuit, GraduationCap, ArrowRight, FlaskConical } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const classes = ["6", "7", "8", "9", "10", "11", "12"];
const navLinks = [{
  label: "Home",
  href: "/"
}, {
  label: "Learn",
  href: "/learn"
}];
const classDropdown = classes.map(c => ({
  label: `Class ${c}`,
  href: "/learn",
  desc: c === "6" ? "Geometry, Fractions, Algebra" : c === "7" ? "Triangles, Equations, Ratios" : c === "8" ? "Quadrilaterals, Mensuration, Identities" : c === "9" ? "Polynomials, Circles, Heron's Formula" : c === "10" ? "Trigonometry, Quadratics, Volumes" : c === "11" ? "Calculus, Conics, Binomial" : "Matrices, Integrals, Vectors"
}));
const resourceLinks = [{
  icon: Shapes,
  label: "3D Shape Explorer",
  desc: "Rotate & explore geometry",
  href: "/learn"
}, {
  icon: BookOpen,
  label: "Formula Library",
  desc: "All formulas by chapter",
  href: "/learn"
}, {
  icon: BrainCircuit,
  label: "Quick Quizzes",
  desc: "Test your understanding",
  href: "/learn"
}, {
  icon: FlaskConical,
  label: "Maths Lab",
  desc: "Interactive visual tools",
  href: "/learn"
}];
export function Navbar() {
  const [location, setLocation] = useLocation();
  const {
    theme,
    setTheme
  } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeAll = () => {
    setClassesOpen(false);
    setResourcesOpen(false);
  };
  return /*#__PURE__*/_jsxs("nav", {
    className: "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
    onMouseLeave: closeAll,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto",
      children: [/*#__PURE__*/_jsxs(Link, {
        href: "/",
        className: "flex items-center gap-2 flex-shrink-0 transition-opacity hover:opacity-85",
        children: [/*#__PURE__*/_jsx("div", {
          className: "h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center shadow-md shadow-primary/30",
          children: /*#__PURE__*/_jsx(Pi, {
            className: "h-4 w-4 text-white"
          })
        }), /*#__PURE__*/_jsx("span", {
          className: "text-lg font-bold font-display tracking-tight text-foreground",
          children: "Mathrix"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "hidden md:flex items-center gap-1 text-sm font-medium",
        children: [/*#__PURE__*/_jsx(Link, {
          href: "/",
          className: `px-3 py-2 rounded-xl transition-colors ${location === "/" ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: "Home"
        }), /*#__PURE__*/_jsx(Link, {
          href: "/learn",
          className: `px-3 py-2 rounded-xl transition-colors ${location === "/learn" ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
          children: "Learn"
        }), /*#__PURE__*/_jsxs("div", {
          className: "relative",
          children: [/*#__PURE__*/_jsxs("button", {
            "data-testid": "nav-classes-btn",
            onMouseEnter: () => {
              setClassesOpen(true);
              setResourcesOpen(false);
            },
            className: `flex items-center gap-1 px-3 py-2 rounded-xl transition-colors ${classesOpen ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
            children: ["Classes", /*#__PURE__*/_jsx(ChevronDown, {
              className: `h-3.5 w-3.5 transition-transform ${classesOpen ? "rotate-180" : ""}`
            })]
          }), /*#__PURE__*/_jsx(AnimatePresence, {
            children: classesOpen && /*#__PURE__*/_jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 8
              },
              animate: {
                opacity: 1,
                y: 0
              },
              exit: {
                opacity: 0,
                y: 8
              },
              transition: {
                duration: 0.18
              },
              className: "absolute left-0 top-full mt-2 w-72 bg-background border border-border rounded-2xl shadow-xl p-2 z-50",
              children: [/*#__PURE__*/_jsx("p", {
                className: "text-xs font-bold text-muted-foreground uppercase tracking-widest px-3 py-2",
                children: "Select a class"
              }), /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-2 gap-1",
                children: classDropdown.map(({
                  label,
                  href,
                  desc
                }) => /*#__PURE__*/_jsxs("button", {
                  "data-testid": `nav-class-${label.replace(" ", "-")}`,
                  onClick: () => {
                    setLocation(href);
                    closeAll();
                  },
                  className: "flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors text-left",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "font-semibold text-foreground text-sm",
                    children: label
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-muted-foreground leading-tight",
                    children: desc
                  })]
                }, label))
              })]
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "relative",
          children: [/*#__PURE__*/_jsxs("button", {
            "data-testid": "nav-resources-btn",
            onMouseEnter: () => {
              setResourcesOpen(true);
              setClassesOpen(false);
            },
            className: `flex items-center gap-1 px-3 py-2 rounded-xl transition-colors ${resourcesOpen ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`,
            children: ["Resources", /*#__PURE__*/_jsx(ChevronDown, {
              className: `h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`
            })]
          }), /*#__PURE__*/_jsx(AnimatePresence, {
            children: resourcesOpen && /*#__PURE__*/_jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 8
              },
              animate: {
                opacity: 1,
                y: 0
              },
              exit: {
                opacity: 0,
                y: 8
              },
              transition: {
                duration: 0.18
              },
              className: "absolute left-0 top-full mt-2 w-64 bg-background border border-border rounded-2xl shadow-xl p-2 z-50",
              children: resourceLinks.map(({
                icon: Icon,
                label,
                desc,
                href
              }) => /*#__PURE__*/_jsxs("button", {
                "data-testid": `nav-resource-${label.replace(/\s+/g, "-").toLowerCase()}`,
                onClick: () => {
                  setLocation(href);
                  closeAll();
                },
                className: "w-full flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-secondary transition-colors text-left",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5",
                  children: /*#__PURE__*/_jsx(Icon, {
                    className: "h-4 w-4"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("p", {
                    className: "text-sm font-semibold text-foreground",
                    children: label
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-xs text-muted-foreground",
                    children: desc
                  })]
                })]
              }, label))
            })
          })]
        }), /*#__PURE__*/_jsx(Link, {
          href: "/",
          className: "px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
          children: "About"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex items-center gap-2",
        children: [/*#__PURE__*/_jsxs(Button, {
          size: "sm",
          "data-testid": "nav-cta-btn",
          className: "hidden md:flex h-9 px-4 rounded-full text-xs font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all",
          onClick: () => setLocation("/learn"),
          children: [/*#__PURE__*/_jsx(GraduationCap, {
            className: "h-3.5 w-3.5 mr-1.5"
          }), "Start Learning", /*#__PURE__*/_jsx(ArrowRight, {
            className: "h-3 w-3 ml-1"
          })]
        }), /*#__PURE__*/_jsxs(Button, {
          variant: "ghost",
          size: "icon",
          "data-testid": "nav-theme-toggle",
          onClick: () => setTheme(theme === "light" ? "dark" : "light"),
          className: "rounded-full h-9 w-9",
          "aria-label": "Toggle theme",
          children: [/*#__PURE__*/_jsx(Sun, {
            className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          }), /*#__PURE__*/_jsx(Moon, {
            className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          })]
        }), /*#__PURE__*/_jsx(Button, {
          variant: "ghost",
          size: "icon",
          "data-testid": "nav-mobile-toggle",
          onClick: () => setMobileOpen(v => !v),
          className: "md:hidden rounded-full h-9 w-9",
          "aria-label": "Toggle menu",
          children: mobileOpen ? /*#__PURE__*/_jsx(X, {
            className: "h-5 w-5"
          }) : /*#__PURE__*/_jsx(Menu, {
            className: "h-5 w-5"
          })
        })]
      })]
    }), /*#__PURE__*/_jsx(AnimatePresence, {
      children: mobileOpen && /*#__PURE__*/_jsx(motion.div, {
        initial: {
          opacity: 0,
          height: 0
        },
        animate: {
          opacity: 1,
          height: "auto"
        },
        exit: {
          opacity: 0,
          height: 0
        },
        transition: {
          duration: 0.22
        },
        className: "md:hidden border-t border-border bg-background overflow-hidden",
        children: /*#__PURE__*/_jsxs("div", {
          className: "px-4 py-4 space-y-1",
          children: [navLinks.map(({
            label,
            href
          }) => /*#__PURE__*/_jsx(Link, {
            href: href,
            onClick: () => setMobileOpen(false),
            className: `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location === href ? "text-primary bg-primary/8" : "text-foreground hover:bg-secondary"}`,
            children: label
          }, label)), /*#__PURE__*/_jsxs("div", {
            className: "pt-1 pb-1",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 py-2",
              children: "Classes"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-4 gap-1",
              children: classes.map(c => /*#__PURE__*/_jsx("button", {
                onClick: () => {
                  setLocation("/learn");
                  setMobileOpen(false);
                },
                className: "flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border",
                children: c
              }, c))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "pt-1",
            children: [/*#__PURE__*/_jsx("p", {
              className: "text-xs font-bold text-muted-foreground uppercase tracking-widest px-4 py-2",
              children: "Resources"
            }), resourceLinks.map(({
              icon: Icon,
              label,
              href
            }) => /*#__PURE__*/_jsxs("button", {
              onClick: () => {
                setLocation(href);
                setMobileOpen(false);
              },
              className: "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-foreground hover:bg-secondary transition-colors text-left",
              children: [/*#__PURE__*/_jsx(Icon, {
                className: "h-4 w-4 text-primary"
              }), label]
            }, label))]
          }), /*#__PURE__*/_jsx("div", {
            className: "pt-2 pb-1",
            children: /*#__PURE__*/_jsxs(Button, {
              className: "w-full rounded-xl",
              onClick: () => {
                setLocation("/learn");
                setMobileOpen(false);
              },
              children: [/*#__PURE__*/_jsx(GraduationCap, {
                className: "h-4 w-4 mr-2"
              }), "Start Learning Now"]
            })
          })]
        })
      })
    })]
  });
}

