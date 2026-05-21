import { useRef, useEffect, useState, useCallback } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─── CUBE ──────────────────────────────────────────────────────────────────
function CubeShape({
  rotX,
  rotY,
  size
}) {
  const s = size;
  const faces = [{
    transform: `rotateY(0deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#7c3aed,#4c1d95)"
  }, {
    transform: `rotateY(180deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#5b21b6,#3730a3)"
  }, {
    transform: `rotateY(90deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#6d28d9,#4338ca)"
  }, {
    transform: `rotateY(-90deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#4c1d95,#312e81)"
  }, {
    transform: `rotateX(90deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#a78bfa,#7c3aed)"
  }, {
    transform: `rotateX(-90deg) translateZ(${s / 2}px)`,
    bg: "linear-gradient(135deg,#3730a3,#1e1b4b)"
  }];
  return /*#__PURE__*/_jsx("div", {
    style: {
      width: s,
      height: s,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: faces.map((face, i) => /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        width: s,
        height: s,
        background: face.bg,
        border: "1px solid rgba(196,181,253,0.25)",
        transform: face.transform,
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)"
      }
    }, i))
  });
}

// ─── SPHERE ─────────────────────────────────────────────────────────────────
function SphereShape({
  rotX,
  rotY
}) {
  const size = 150;
  const r = size / 2;
  const meridianCount = 9;
  const latitudes = [{
    yOffset: -r * 0.71,
    scale: 0.71
  }, {
    yOffset: -r * 0.42,
    scale: 0.91
  }, {
    yOffset: 0,
    scale: 1
  }, {
    yOffset: r * 0.42,
    scale: 0.91
  }, {
    yOffset: r * 0.71,
    scale: 0.71
  }];
  return /*#__PURE__*/_jsxs("div", {
    style: {
      width: size,
      height: size,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: [Array.from({
      length: meridianCount
    }).map((_, i) => /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: `1.5px solid rgba(139,92,246,${i === 0 ? 0.75 : 0.4})`,
        transform: `rotateY(${180 / meridianCount * i}deg)`,
        boxShadow: i === 0 ? "0 0 6px rgba(139,92,246,0.3)" : "none"
      }
    }, `m${i}`)), latitudes.map(({
      yOffset,
      scale
    }, i) => {
      const w = size * scale;
      return /*#__PURE__*/_jsx("div", {
        style: {
          position: "absolute",
          width: w,
          height: w,
          left: `calc(50% - ${w / 2}px)`,
          top: `calc(50% + ${yOffset}px - ${w / 2}px)`,
          borderRadius: "50%",
          border: `${i === 2 ? "2px solid rgba(167,139,250,0.7)" : "1.5px solid rgba(139,92,246,0.4)"}`,
          transform: "rotateX(90deg)",
          boxShadow: i === 2 ? "0 0 10px rgba(139,92,246,0.4)" : "none"
        }
      }, `l${i}`);
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        inset: "20%",
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 35%, rgba(196,181,253,0.2), rgba(109,40,217,0.05))",
        filter: "blur(4px)"
      }
    })]
  });
}

// ─── CYLINDER ────────────────────────────────────────────────────────────────
function CylinderShape({
  rotX,
  rotY
}) {
  const r = 55;
  const h = 140;
  const segs = 16;
  const segAngle = 360 / segs;
  const segW = 2 * r * Math.sin(Math.PI / segs) + 1.5;
  return /*#__PURE__*/_jsxs("div", {
    style: {
      width: r * 2,
      height: h,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: [Array.from({
      length: segs
    }).map((_, i) => {
      const shade = Math.cos(i / segs * Math.PI * 2);
      const light = 0.55 + shade * 0.3;
      return /*#__PURE__*/_jsx("div", {
        style: {
          position: "absolute",
          width: segW,
          height: h,
          left: "50%",
          top: 0,
          marginLeft: -segW / 2,
          background: `rgba(${Math.round(109 + shade * 20)},${Math.round(40 + shade * 10)},${Math.round(217 + shade * 20)},${light})`,
          border: "1px solid rgba(167,139,250,0.12)",
          transform: `rotateY(${segAngle * i}deg) translateZ(${r}px)`
        }
      }, i);
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        width: r * 2,
        height: r * 2,
        left: 0,
        top: 0,
        marginTop: -r,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 35%, #c4b5fd, #7c3aed 60%, #4c1d95)",
        border: "1px solid rgba(196,181,253,0.5)",
        transform: "rotateX(90deg)",
        boxShadow: "0 0 12px rgba(139,92,246,0.4)"
      }
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        width: r * 2,
        height: r * 2,
        left: 0,
        top: h,
        marginTop: -r,
        borderRadius: "50%",
        background: "radial-gradient(circle, #5b21b6, #2e1065)",
        border: "1px solid rgba(109,40,217,0.4)",
        transform: "rotateX(90deg)"
      }
    })]
  });
}

// ─── CONE ────────────────────────────────────────────────────────────────────
function ConeShape({
  rotX,
  rotY
}) {
  const r = 70; // base radius
  const h = 140; // height
  const segs = 16;
  const segAngle = 360 / segs;
  return /*#__PURE__*/_jsxs("div", {
    style: {
      width: r * 2,
      height: h,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: [Array.from({
      length: segs
    }).map((_, i) => {
      const shade = Math.cos(i / segs * Math.PI * 2);
      const alpha = 0.55 + shade * 0.3;
      return /*#__PURE__*/_jsx("div", {
        style: {
          position: "absolute",
          width: r * 2,
          height: h,
          top: 0,
          left: 0,
          background: `rgba(${Math.round(124 + shade * 15)},${Math.round(58 + shade * 10)},${Math.round(237 + shade * 10)},${alpha})`,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          border: "none",
          transform: `rotateY(${segAngle * i}deg) translateZ(0px)`,
          transformOrigin: "50% 100%"
        }
      }, i);
    }), /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        width: r * 2,
        height: r * 2,
        left: 0,
        top: h,
        marginTop: -r,
        borderRadius: "50%",
        background: "radial-gradient(circle, #6d28d9 0%, #2e1065 80%)",
        border: "1.5px solid rgba(167,139,250,0.4)",
        transform: "rotateX(90deg)"
      }
    })]
  });
}

// ─── OCTAHEDRON / DIAMOND ────────────────────────────────────────────────────
function IcosahedronShape({
  rotX,
  rotY
}) {
  const size = 130;
  const r = size / 2;

  // 4 upper triangle panels + 4 lower — each as a clip-path triangle
  const panels = [0, 90, 180, 270].flatMap((angle, qi) => {
    const shade = Math.cos(qi / 4 * Math.PI * 2);
    const uColor = `rgba(${Math.round(139 + shade * 20)},${Math.round(92 + shade * 10)},${Math.round(246 + shade * 5)},0.85)`;
    const lColor = `rgba(${Math.round(109 + shade * 15)},${Math.round(40 + shade * 8)},${Math.round(217 + shade * 5)},0.75)`;
    return [{
      angle,
      clipPath: "polygon(50% 0%, 0% 50%, 100% 50%)",
      top: 0,
      height: size,
      color: uColor,
      key: `u${qi}`
    }, {
      angle,
      clipPath: "polygon(0% 50%, 50% 100%, 100% 50%)",
      top: 0,
      height: size,
      color: lColor,
      key: `l${qi}`
    }];
  });
  return /*#__PURE__*/_jsxs("div", {
    style: {
      width: size,
      height: size,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: [panels.map(p => /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        width: size,
        height: p.height,
        top: p.top,
        left: 0,
        background: p.color,
        clipPath: p.clipPath,
        transform: `rotateY(${p.angle}deg)`,
        filter: "drop-shadow(0 0 4px rgba(139,92,246,0.3))"
      }
    }, p.key)), /*#__PURE__*/_jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "1.5px solid rgba(196,181,253,0.2)",
        transform: "rotateX(90deg)"
      }
    })]
  });
}

// ─── TORUS ───────────────────────────────────────────────────────────────────
function TorusShape({
  rotX,
  rotY
}) {
  const torusR = 65; // major radius (ring center)
  const tubeR = 22; // tube radius
  const tubeSegs = 18; // number of tube cross-sections
  const tubeSides = 8; // sides per tube cross-section

  return /*#__PURE__*/_jsx("div", {
    style: {
      width: (torusR + tubeR) * 2,
      height: (torusR + tubeR) * 2,
      transformStyle: "preserve-3d",
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      position: "relative"
    },
    children: Array.from({
      length: tubeSegs
    }).map((_, i) => {
      const phi = i / tubeSegs * Math.PI * 2;
      const cx = Math.cos(phi) * torusR;
      const cz = Math.sin(phi) * torusR;
      const brightness = 0.5 + Math.cos(phi) * 0.4;
      return /*#__PURE__*/_jsx("div", {
        style: {
          position: "absolute",
          width: tubeR * 2,
          height: tubeR * 2,
          top: "50%",
          left: "50%",
          marginTop: -tubeR,
          marginLeft: -tubeR,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, rgba(196,181,253,${brightness}), rgba(109,40,217,${brightness * 0.8}))`,
          border: "1px solid rgba(167,139,250,0.3)",
          boxShadow: `0 0 ${8 + brightness * 6}px rgba(139,92,246,0.4)`,
          transform: `translateX(${cx}px) translateZ(${cz}px)`
        }
      }, i);
    })
  });
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export function ThreeScene({
  shapeType = "icosahedron",
  className = "",
  wireframe: _wireframe = false
}) {
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(30);
  const isDragging = useRef(false);
  const prevPos = useRef({
    x: 0,
    y: 0
  });
  const velRef = useRef({
    x: 0.1,
    y: 0.25
  });
  const rotRef = useRef({
    x: 20,
    y: 30
  });
  const animRef = useRef(null);
  const tick = useCallback(() => {
    if (!isDragging.current) {
      velRef.current.y += 0.25;
      velRef.current.x += 0.08;
    }
    velRef.current.x *= 0.95;
    velRef.current.y *= 0.95;
    rotRef.current.x += velRef.current.x;
    rotRef.current.y += velRef.current.y;
    setRotX(rotRef.current.x);
    setRotY(rotRef.current.y);
    animRef.current = requestAnimationFrame(tick);
  }, []);
  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [tick]);
  const onPointerDown = (clientX, clientY) => {
    isDragging.current = true;
    prevPos.current = {
      x: clientX,
      y: clientY
    };
    velRef.current = {
      x: 0,
      y: 0
    };
  };
  useEffect(() => {
    const onMove = (clientX, clientY) => {
      if (!isDragging.current) return;
      const dx = clientX - prevPos.current.x;
      const dy = clientY - prevPos.current.y;
      velRef.current = {
        x: dy * 0.5,
        y: dx * 0.5
      };
      rotRef.current.x += dy * 0.5;
      rotRef.current.y += dx * 0.5;
      prevPos.current = {
        x: clientX,
        y: clientY
      };
    };
    const onUp = () => {
      isDragging.current = false;
    };
    const onMouseMove = e => onMove(e.clientX, e.clientY);
    const onTouchMove = e => {
      if (e.touches.length) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, {
      passive: true
    });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
  const renderShape = () => {
    const cubeSize = Math.min(120, 140);
    switch (shapeType) {
      case "cube":
        return /*#__PURE__*/_jsx(CubeShape, {
          rotX: rotX,
          rotY: rotY,
          size: cubeSize
        });
      case "sphere":
        return /*#__PURE__*/_jsx(SphereShape, {
          rotX: rotX,
          rotY: rotY
        });
      case "cylinder":
        return /*#__PURE__*/_jsx(CylinderShape, {
          rotX: rotX,
          rotY: rotY
        });
      case "cone":
        return /*#__PURE__*/_jsx(ConeShape, {
          rotX: rotX,
          rotY: rotY
        });
      case "torus":
        return /*#__PURE__*/_jsx(TorusShape, {
          rotX: rotX,
          rotY: rotY
        });
      case "icosahedron":
      default:
        return /*#__PURE__*/_jsx(IcosahedronShape, {
          rotX: rotX,
          rotY: rotY
        });
    }
  };
  return /*#__PURE__*/_jsx("div", {
    onMouseDown: e => onPointerDown(e.clientX, e.clientY),
    onTouchStart: e => {
      if (e.touches.length) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    },
    className: `w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`,
    style: {
      perspective: "700px"
    },
    "data-testid": `three-scene-${shapeType}`,
    children: renderShape()
  });
}

