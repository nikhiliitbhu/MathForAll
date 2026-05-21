import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThreeScene } from "@/components/ThreeScene";
import { mathClasses } from "@/data/mathData";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Learn() {
  const [selectedClassId, setSelectedClassId] = useState(mathClasses[0].id);
  const selectedClass = mathClasses.find(c => c.id === selectedClassId) || mathClasses[0];
  const [selectedChapterId, setSelectedChapterId] = useState(selectedClass.chapters[0].id);
  const chapter = selectedClass.chapters.find(c => c.id === selectedChapterId) || selectedClass.chapters[0];
  const [activeShape, setActiveShape] = useState(chapter.shapeType);

  // Update shape when chapter changes
  useState(() => {
    setActiveShape(chapter.shapeType);
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "flex flex-col md:flex-row min-h-[calc(100vh-4rem)] bg-background",
    children: [/*#__PURE__*/_jsxs("aside", {
      className: "w-full md:w-80 border-r border-border bg-sidebar flex-shrink-0 flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-hidden z-10",
      children: [/*#__PURE__*/_jsx("div", {
        className: "p-4 border-b border-border bg-sidebar",
        children: /*#__PURE__*/_jsxs(Select, {
          value: selectedClassId,
          onValueChange: val => {
            setSelectedClassId(val);
            const newClass = mathClasses.find(c => c.id === val);
            if (newClass && newClass.chapters.length > 0) {
              setSelectedChapterId(newClass.chapters[0].id);
              setActiveShape(newClass.chapters[0].shapeType);
            }
          },
          children: [/*#__PURE__*/_jsx(SelectTrigger, {
            className: "w-full font-display font-medium text-lg bg-background border-border shadow-sm h-12",
            children: /*#__PURE__*/_jsx(SelectValue, {
              placeholder: "Select Class"
            })
          }), /*#__PURE__*/_jsx(SelectContent, {
            children: mathClasses.map(c => /*#__PURE__*/_jsx(SelectItem, {
              value: c.id,
              className: "font-medium cursor-pointer",
              children: c.title
            }, c.id))
          })]
        })
      }), /*#__PURE__*/_jsxs("div", {
        className: "flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar",
        children: [/*#__PURE__*/_jsx("div", {
          className: "text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-2",
          children: "Chapters"
        }), selectedClass.chapters.map(c => /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setSelectedChapterId(c.id);
            setActiveShape(c.shapeType);
          },
          className: `w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-all ${selectedChapterId === c.id ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`,
          children: [/*#__PURE__*/_jsx("span", {
            className: "truncate",
            children: c.title
          }), selectedChapterId === c.id && /*#__PURE__*/_jsx(ChevronRight, {
            className: "h-4 w-4 shrink-0"
          })]
        }, c.id))]
      })]
    }), /*#__PURE__*/_jsx("main", {
      className: "flex-1 overflow-y-auto p-4 md:p-8 bg-background relative custom-scrollbar",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-5xl mx-auto space-y-12 pb-24",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "space-y-2",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2 text-sm text-primary font-medium",
            children: [/*#__PURE__*/_jsx(BookOpen, {
              className: "h-4 w-4"
            }), /*#__PURE__*/_jsx("span", {
              children: selectedClass.title
            }), /*#__PURE__*/_jsx(ChevronRight, {
              className: "h-4 w-4 text-muted-foreground"
            }), /*#__PURE__*/_jsx("span", {
              className: "text-muted-foreground",
              children: chapter.title
            })]
          }), /*#__PURE__*/_jsx("h1", {
            className: "text-3xl md:text-5xl font-bold font-display text-foreground",
            children: chapter.title
          })]
        }), /*#__PURE__*/_jsxs("section", {
          className: "space-y-4",
          children: [/*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-bold font-display border-b border-border pb-2",
            children: "Interactive 3D Explorer"
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid lg:grid-cols-3 gap-6",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "lg:col-span-2 relative h-[400px] bg-secondary/30 rounded-3xl border border-border shadow-inner overflow-hidden group",
              children: [/*#__PURE__*/_jsx(ThreeScene, {
                shapeType: activeShape
              }), /*#__PURE__*/_jsxs("div", {
                className: "absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border text-xs font-medium text-foreground shadow-sm",
                  children: activeShape.charAt(0).toUpperCase() + activeShape.slice(1)
                }), /*#__PURE__*/_jsxs("div", {
                  className: "bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground shadow-sm flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsx(RotateCcw, {
                    className: "h-3.5 w-3.5"
                  }), " Drag to rotate"]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col",
              children: [/*#__PURE__*/_jsx("h3", {
                className: "text-lg font-bold mb-4 font-display",
                children: "Shape Controls"
              }), /*#__PURE__*/_jsx("div", {
                className: "grid grid-cols-2 gap-3",
                children: ["cube", "sphere", "cylinder", "cone", "icosahedron", "torus"].map(shape => /*#__PURE__*/_jsx(Button, {
                  variant: activeShape === shape ? "default" : "outline",
                  className: "w-full justify-start capitalize h-10",
                  onClick: () => setActiveShape(shape),
                  children: shape
                }, shape))
              })]
            })]
          })]
        }), /*#__PURE__*/_jsxs("section", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-bold font-display border-b border-border pb-2",
            children: "Formula Library"
          }), /*#__PURE__*/_jsx("div", {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
            children: /*#__PURE__*/_jsx(AnimatePresence, {
              mode: "popLayout",
              children: chapter.formulas.map((f, i) => /*#__PURE__*/_jsxs(motion.div, {
                initial: {
                  opacity: 0,
                  y: 20
                },
                animate: {
                  opacity: 1,
                  y: 0
                },
                transition: {
                  delay: i * 0.1,
                  duration: 0.4
                },
                className: "bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"
                }), /*#__PURE__*/_jsx("h4", {
                  className: "text-sm font-semibold text-primary mb-2 uppercase tracking-wider",
                  children: f.title
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xl md:text-2xl font-serif text-card-foreground",
                  children: f.expression
                })]
              }, f.id))
            })
          })]
        }), /*#__PURE__*/_jsxs("section", {
          className: "space-y-6",
          children: [/*#__PURE__*/_jsx("h2", {
            className: "text-2xl font-bold font-display border-b border-border pb-2",
            children: "Quick Quiz"
          }), /*#__PURE__*/_jsx("div", {
            className: "space-y-6",
            children: chapter.quizzes.map((q, i) => /*#__PURE__*/_jsx(QuizCard, {
              question: q,
              index: i
            }, q.id))
          })]
        })]
      })
    })]
  });
}
function QuizCard({
  question,
  index
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCorrect = selectedOption === question.correctAnswer;
  return /*#__PURE__*/_jsxs("div", {
    className: "bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm",
    children: [/*#__PURE__*/_jsxs("div", {
      className: "flex gap-4 items-start mb-6",
      children: [/*#__PURE__*/_jsx("div", {
        className: "flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold font-display",
        children: index + 1
      }), /*#__PURE__*/_jsx("h3", {
        className: "text-lg md:text-xl font-medium pt-1 text-card-foreground",
        children: question.question
      })]
    }), /*#__PURE__*/_jsx("div", {
      className: "grid sm:grid-cols-2 gap-3 mb-6 pl-0 md:pl-12",
      children: question.options.map((opt, i) => {
        let btnClass = "justify-start h-auto py-3 px-4 text-left font-normal border-border hover:border-primary/50 hover:bg-primary/5 transition-colors";
        if (isSubmitted) {
          if (i === question.correctAnswer) {
            btnClass = "justify-start h-auto py-3 px-4 text-left font-medium bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400";
          } else if (i === selectedOption) {
            btnClass = "justify-start h-auto py-3 px-4 text-left font-normal bg-destructive/10 border-destructive/50 text-destructive";
          }
        } else if (selectedOption === i) {
          btnClass = "justify-start h-auto py-3 px-4 text-left font-medium border-primary bg-primary/10 text-primary ring-1 ring-primary/20";
        }
        return /*#__PURE__*/_jsxs(Button, {
          variant: "outline",
          className: btnClass,
          onClick: () => !isSubmitted && setSelectedOption(i),
          disabled: isSubmitted,
          children: [/*#__PURE__*/_jsxs("span", {
            className: "mr-3 text-muted-foreground w-4",
            children: [String.fromCharCode(65 + i), "."]
          }), opt]
        }, i);
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "pl-0 md:pl-12 flex flex-col sm:flex-row gap-4 items-center justify-between",
      children: !isSubmitted ? /*#__PURE__*/_jsx(Button, {
        onClick: () => setIsSubmitted(true),
        disabled: selectedOption === null,
        className: "w-full sm:w-auto min-w-[120px]",
        children: "Check Answer"
      }) : /*#__PURE__*/_jsx("div", {
        className: "w-full",
        children: /*#__PURE__*/_jsxs(motion.div, {
          initial: {
            opacity: 0,
            height: 0
          },
          animate: {
            opacity: 1,
            height: "auto"
          },
          className: `p-4 rounded-xl border flex gap-3 ${isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-destructive/10 border-destructive/30"}`,
          children: [isCorrect ? /*#__PURE__*/_jsx(CheckCircle, {
            className: "h-6 w-6 text-green-600 dark:text-green-400 shrink-0"
          }) : /*#__PURE__*/_jsx(XCircle, {
            className: "h-6 w-6 text-destructive shrink-0"
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("p", {
              className: `font-semibold mb-1 ${isCorrect ? "text-green-700 dark:text-green-400" : "text-destructive"}`,
              children: isCorrect ? "Correct!" : "Incorrect"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm text-foreground/80",
              children: question.explanation
            })]
          })]
        })
      })
    })]
  });
}

