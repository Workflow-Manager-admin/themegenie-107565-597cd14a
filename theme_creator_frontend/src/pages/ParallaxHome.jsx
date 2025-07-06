import React, { useEffect, useRef } from "react";
import "./ParallaxHome.css";

/**
 * Animated parallax shape for backgrounds.
 * Moves layers at different speeds for a parallax effect on scroll.
 */
function ParallaxShapes({ theme }) {
  // Parent listens for scroll and moves shapes at different speeds
  const layer1 = useRef();
  const layer2 = useRef();
  const layer3 = useRef();

  // Theme-based colors (playful but minimal)
  const colorSets = {
    anime: {
      bg1: "#fbcfe8",
      bg2: "#ede9fe",
      fg: "#a78bfa",
      accent: "#7c3aed"
    },
    disney: {
      bg1: "#fef3c7",
      bg2: "#dbeafe",
      fg: "#fbcfe8",
      accent: "#f59e42"
    },
    professional: {
      bg1: "#e0f2fe",
      bg2: "#f1f5f9",
      fg: "#94a3b8",
      accent: "#1e293b"
    }
  };
  const fallback = {
    bg1: "#e0e7ff",
    bg2: "#fbcfe8",
    fg: "#4f46e5",
    accent: "#ec4899"
  };
  const colors = colorSets[theme] || fallback;

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // Animate X and Y with different translations for depth
      if (layer1.current)
        layer1.current.style.transform = `translateY(${y * 0.22}px) scale(1.08)`;
      if (layer2.current)
        layer2.current.style.transform = `translateY(${y * 0.33}px) scale(1.03)`;
      if (layer3.current)
        layer3.current.style.transform = `translateY(${y * 0.18}px) scale(1.12)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Use SVG blobs for modern minimalist look
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
      aria-hidden="true"
    >
      {/* Back most layer: big blurred blob */}
      <svg
        ref={layer1}
        width="900"
        height="340"
        viewBox="0 0 900 340"
        style={{
          position: "absolute",
          top: "-90px",
          left: "-120px",
          opacity: 0.33,
          filter: "blur(17px) saturate(1.25)",
        }}
      >
        <ellipse
          cx="460"
          cy="125"
          rx="300"
          ry="110"
          fill={colors.bg1}
        />
      </svg>
      {/* Mid blob */}
      <svg
        ref={layer2}
        width="600"
        height="420"
        viewBox="0 0 600 420"
        style={{
          position: "absolute",
          bottom: "-37px",
          right: "-90px",
          opacity: 0.40,
          filter: "blur(13px) saturate(1.2)",
        }}
      >
        <ellipse
          cx="400"
          cy="260"
          rx="160"
          ry="100"
          fill={colors.bg2}
        />
      </svg>
      {/* Top accent blob (foreground) */}
      <svg
        ref={layer3}
        width="410"
        height="220"
        viewBox="0 0 410 220"
        style={{
          position: "absolute",
          top: "58%",
          left: "6vw",
          opacity: 0.72,
          filter: "blur(4px)",
        }}
      >
        <ellipse
          cx="190"
          cy="110"
          rx="118"
          ry="48"
          fill={colors.fg}
        />
      </svg>
      {/* A fun floating accent circle */}
      <svg
        width="55"
        height="55"
        style={{
          position: "absolute",
          top: "35%",
          right: "14%",
          opacity: 0.85,
          filter: "blur(1.3px)"
        }}
      >
        <circle cx="28" cy="28" r="20" fill={colors.accent} />
      </svg>
    </div>
  );
}

/**
 * ParallaxHome uses layered parallax SVGs for theme panels.
 */
export default function ParallaxHome() {
  // Static per-theme assignments for each panel
  const sections = [
    {
      key: "about",
      heading: "Theme\u2006Genie",
      description: (
        <>
          We turn your idea into ready‑to‑copy <strong>HTML, CSS,&thinsp;JS</strong>. Choose
          Anime, Disney or Professional style – our AI writes the code.
        </>
      ),
      theme: "generic", // special background below
      background: {
        background: "linear-gradient(120deg,#ede9fe 60%,#fbcfe8 100%)",
        color: "#282c34"
      }
    },
    {
      key: "anime",
      heading: "Anime Theme",
      description: "Bright colours, manga fonts and playful motions.",
      theme: "anime"
    },
    {
      key: "disney",
      heading: "Disney Theme",
      description: "Rounded edges, soft gradients, a sprinkle of magic.",
      theme: "disney"
    },
    {
      key: "professional",
      heading: "Professional Theme",
      description: "Clean lines, business fonts and calm colours.",
      theme: "professional"
    }
  ];

  return (
    <div className="parallax-wrapper" style={{ background: "#fefafd", position: "relative" }}>
      {/* SECTION 0 – About (simple, brand gradient bg) */}
      <section
        className="panel"
        style={{
          ...sections[0].background,
          position: "relative",
          zIndex: 1
        }}
      >
        <h1>{sections[0].heading}</h1>
        <p>{sections[0].description}</p>
        {/* Subtle logo icon */}
        <svg width="78" height="78" style={{ marginTop: 26 }}>
          <ellipse cx="39" cy="46" rx="31" ry="14" fill="#fbbf24" opacity="0.22" />
          <circle cx="39" cy="34" r="22" fill="#4f46e5" />
          <ellipse cx="39" cy="57" rx="20" ry="8" fill="#ec4899" opacity="0.48" />
        </svg>
      </section>
      {/* Three panels for each theme */}
      {sections.slice(1).map((panel) => (
        <section key={panel.key} className="panel" style={{ position: "relative", background: "none", color: "#282c34", overflow: "hidden" }}>
          {/* Animated Parallax background */}
          <ParallaxShapes theme={panel.theme} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              color: panel.theme === "anime" ? "#7c3aed"
                : panel.theme === "disney" ? "#f59e42"
                : "#1e293b"
            }}>{panel.heading}</h2>
            <p>{panel.description}</p>
            {/* Animated avatar SVG character, matches theme */}
            {panel.theme === "anime" && (
              <div style={{ margin: "1.5rem auto 0 auto", width: 110, filter: "drop-shadow(0 7px 19px #fbcfe87c)" }}>
                <svg width="110" height="115" viewBox="0 0 110 115">
                  <ellipse cx="55" cy="109" rx="37" ry="7.7" fill="#fbcfe8" />
                  <ellipse cx="55" cy="64" rx="38" ry="36" fill="#7c3aed" />
                  <ellipse cx="33" cy="56" rx="7" ry="11" fill="#fff" />
                  <ellipse cx="77" cy="56" rx="7" ry="11" fill="#fff" />
                  <circle cx="38" cy="61" r="2.7" fill="#282c34" />
                  <circle cx="72" cy="61" r="2.7" fill="#282c34" />
                  <ellipse cx="55" cy="80" rx="14" ry="8" fill="#fff" />
                  <ellipse cx="55" cy="85" rx="7" ry="2" fill="#282c34" />
                  {/* Manga sparkle */}
                  <circle cx="26" cy="44" r="2" fill="#fbcfe8" />
                  <circle cx="84" cy="44" r="2" fill="#fbcfe8" />
                </svg>
                <div style={{ color: "#7c3aed", fontWeight: 700, fontSize: 15, marginTop: 2 }}>Manga Mascot</div>
              </div>
            )}
            {panel.theme === "disney" && (
              <div style={{ margin: "1.5rem auto 0 auto", width: 110, filter: "drop-shadow(0 4px 14px #f59e4291)" }}>
                <svg width="110" height="115" viewBox="0 0 110 115">
                  <ellipse cx="55" cy="109" rx="37" ry="7.7" fill="#dbeafe" />
                  <ellipse cx="55" cy="60" rx="37" ry="35" fill="#f59e42" />
                  <ellipse cx="39" cy="54" rx="8.5" ry="13" fill="#fff" />
                  <ellipse cx="71" cy="54" rx="8.5" ry="13" fill="#fff" />
                  <circle cx="44" cy="62" r="3.4" fill="#333cff" />
                  <circle cx="66" cy="62" r="3.4" fill="#333cff" />
                  {/* nose */}
                  <ellipse cx="55" cy="75" rx="10" ry="4" fill="#fff" />
                  {/* mouth smile */}
                  <path d="M46 81 q9 7 18 0" stroke="#ec4899" strokeWidth="2" fill="none" />
                  {/* stars */}
                  <polygon points="24,34 26,40 32,41 27.5,44.5 29.5,50 24,46.5 18.5,50 20.5,44.5 16,41 22,40" fill="#fef3c7" />
                  <polygon points="96,34 98,40 104,41 99.5,44.5 101.5,50 96,46.5 90.5,50 92.5,44.5 88,41 94,40" fill="#fef3c7" />
                </svg>
                <div style={{ color: "#f59e42", fontWeight: 700, fontSize: 15, marginTop: 2 }}>Magical Mouse</div>
              </div>
            )}
            {panel.theme === "professional" && (
              <div style={{ margin: "1.5rem auto 0 auto", width: 110, filter: "drop-shadow(0 4px 12px #1e293b44)" }}>
                <svg width="110" height="115" viewBox="0 0 110 115">
                  <ellipse cx="55" cy="109" rx="37" ry="7.7" fill="#94a3b8" opacity="0.3"/>
                  <ellipse cx="55" cy="60" rx="36" ry="32" fill="#1e293b" opacity="0.88"/>
                  <ellipse cx="43" cy="53" rx="6" ry="10" fill="#fff" />
                  <ellipse cx="67" cy="53" rx="6" ry="10" fill="#fff" />
                  <circle cx="47" cy="58" r="2.7" fill="#38bdf8" />
                  <circle cx="63" cy="58" r="2.7" fill="#38bdf8" />
                  <ellipse cx="55" cy="75" rx="11" ry="5.3" fill="#fff" />
                  <ellipse cx="55" cy="81" rx="6" ry="1.7" fill="#282c34" />
                  {/* Glasses */}
                  <ellipse cx="43" cy="53" rx="8" ry="10" fill="none" stroke="#38bdf8" strokeWidth="2"/>
                  <ellipse cx="67" cy="53" rx="8" ry="10" fill="none" stroke="#38bdf8" strokeWidth="2"/>
                  <rect x="50" y="53" width="10" height="2.2" fill="#38bdf8" opacity="0.59"/>
                </svg>
                <div style={{ color: "#1e293b", fontWeight: 700, fontSize: 15, marginTop: 2 }}>Pro Mascot</div>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
