import React, { useEffect, useRef } from "react";
import "./ParallaxHome.css";

/**
 * Parallax HTML Hero (Fullscreen, layered, pure JSX version)
 * Layered, scroll-based effect that mimics old CSS/Compass SASS versions.
 * 
 * Image credits/footer as per original demo – injected at hero bottom.
 */
function ParallaxHTMLHero() {
  // Refs for JS-driven parallax effect
  const containerRef = useRef();
  const layers = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Parallax scroll logic (matches typical SASS/CSS+Compass approaches)
    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      // Layer speeds (closer = faster)
      layers[0].current &&
        (layers[0].current.style.transform = `translateY(${scrollY * 0.1}px) scale(1.06)`);
      layers[1].current &&
        (layers[1].current.style.transform = `translateY(${scrollY * 0.25}px) scale(1.13)`);
      layers[2].current &&
        (layers[2].current.style.transform = `translateY(${scrollY * 0.48}px) scale(1.2)`);
      // Foreground (text/buttons): sticky, doesn’t move with parallax
      layers[3].current &&
        (layers[3].current.style.transform = `translateY(${scrollY * 0.0}px)`);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    requestAnimationFrame(handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="parallax_container" ref={containerRef}>
      {/* Layered backgrounds – lower index = farther back */}
      <div
        className="parallax_layer parallax_bg"
        ref={layers[0]}
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80)",
        }}
      />
      <div
        className="parallax_layer parallax_cloud"
        ref={layers[1]}
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(https://pngimg.com/uploads/cloud/cloud_PNG17.png)",
        }}
      />
      <div
        className="parallax_layer parallax_mountain"
        ref={layers[2]}
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2017/01/20/00/30/mountains-1993088_1280.png)",
        }}
      />
      {/* Hero headline & button in foreground layer */}
      <div className="parallax_layer parallax_hero" ref={layers[3]}>
        <div className="hero-content">
          <h1>
            <span role="img" aria-label="genie">🧞‍♂️</span> Theme Creator
          </h1>
          <p>
            Effortless theme generation.<br />
            <span style={{ color: "#ec4899", fontWeight: 600 }}>Anime</span>, <span style={{ color: "#f59e42", fontWeight: 600 }}>Disney</span> or <span style={{ color: "#1e293b", fontWeight: 600 }}>Professional</span> – powered by AI.
          </p>
          <a
            href="#howitworks"
            className="hero-btn"
          >
            Try Now
          </a>
        </div>
        {/* Image credits, as per provided HTML – always after the hero */}
        {/* 
          <!-- Image credits: Unsplash + Pixabay, required for demo use only -->
          <footer class="image-credits">
            Mountain: Photo by Sean Pierce on Unsplash. Cloud: pngimg.com. 
            Mountain illustration: pixabay.com (CC0).
          </footer>
        */}
        {/* Image credits/footer (do not remove attribution for demo use) */}
        <footer className="image-credits">
          Mountain: Photo by Sean Pierce on Unsplash. Cloud: pngimg.com. Mountain illustration: pixabay.com (CC0).
        </footer>
      </div>
    </div>
  );
}

/**
 * ParallaxShapes – Animated, interactive, themed parallax layers for each theme panel
 * React useRef/useEffect for scroll+hover motion, SVG/CSS for visuals, well-documented for customization
 */
function ParallaxShapes({ theme }) {
  // Layer references for scroll-based animation
  const layer1 = useRef(), layer2 = useRef(), layer3 = useRef(), sparkle = useRef();

  // Theme-based color palette and shape logic
  const colorSets = {
    anime: {
      bg1: "#fbcfe8",
      bg2: "#ede9fe",
      fg: "#a78bfa",
      accent: "#7c3aed",
      sparkle: "#fff",
      outline: "#fff"
    },
    disney: {
      bg1: "#fef3c7",
      bg2: "#dbeafe",
      fg: "#fbcfe8",
      accent: "#f59e42",
      sparkle: "#fffbea",
      outline: "#f59e42"
    },
    professional: {
      bg1: "#e0f2fe",
      bg2: "#f1f5f9",
      fg: "#94a3b8",
      accent: "#1e293b",
      sparkle: "#38bdf8",
      outline: "#1e293b"
    }
  };
  const defaults = {
    bg1: "#e0e7ff",
    bg2: "#fbcfe8",
    fg: "#4f46e5",
    accent: "#ec4899",
    sparkle: "#fff",
    outline: "#fff"
  };
  const colors = colorSets[theme] || defaults;

  useEffect(() => {
    // Animate on scroll: depth, X/Y, or oscillate (for playful motion)
    let frame, prevScroll = 0;

    function scrollAnimate() {
      const y = window.scrollY;
      // Parallax translation
      if (layer1.current)
        layer1.current.style.transform = `translateY(${y * 0.18}px) scale(1.10)`;
      if (layer2.current)
        layer2.current.style.transform = `translateY(${y * 0.30}px) scale(1.05)`;
      if (layer3.current) {
        // For "slide"/"bounce" per theme
        let slide = 0;
        if (theme === "anime") slide = Math.sin(y * 0.01) * 12; // Bounce
        if (theme === "disney") slide = Math.cos(y * 0.009) * 7; // Soft float
        if (theme === "professional") slide = Math.max(0, Math.min(16, y * 0.07)); // Subtle
        layer3.current.style.transform =
          `translateY(${y * 0.12 + slide}px) scale(1.12)` +
          (theme === "anime" ? " rotate(-6deg)" : theme === "professional" ? " rotate(5deg)" : "");
      }
      // Sparkle/floating element extra movement
      if (sparkle.current) {
        // Rotate/swing for anime/disney, hover on professional (see mouse effect below)
        if (theme === "anime") {
          const bounce = Math.sin(y * 0.018) * 12;
          sparkle.current.style.transform = `translateY(${bounce}px) scale(1.09)`;
        } else if (theme === "disney") {
          const updown = Math.cos(y * 0.012) * 8;
          sparkle.current.style.transform = `translateY(${updown}px) scale(1.08)`;
        } else {
          // Professional – subtle rise
          sparkle.current.style.transform = `translateY(${y * 0.045}px) scale(1.07)`;
        }
      }
      frame = requestAnimationFrame(scrollAnimate);
    }
    scrollAnimate();
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [theme]);

  // Professional theme: make geometric sparkle morph/rotate on hover for subtle interaction
  useEffect(() => {
    if (theme !== "professional" || !sparkle.current) return;
    const elem = sparkle.current;
    let mouseHandler;
    let active = false;
    mouseHandler = (e) => {
      if (!elem) return;
      const p = elem.getBoundingClientRect();
      const x = ((e.clientX - p.left) / p.width - 0.5) * 28; // -14 to +14deg
      const y = ((e.clientY - p.top) / p.height - 0.5) * 14; // -7 to +7deg
      elem.style.transition = 'transform 0.2s cubic-bezier(.32,1,.34,.98)';
      elem.style.transform += ` rotateX(${-y}deg) rotateY(${x}deg)`;
      active = true;
    };
    elem.addEventListener("mousemove", mouseHandler);
    elem.addEventListener("mouseleave", () => {
      elem.style.transition = 'transform 0.38s cubic-bezier(.33,1.7,.24,.98)';
      elem.style.transform = elem.style.transform.replace(/rotate[XY]\([^)]+\)/g, "");
      active = false;
    });
    return () => {
      elem.removeEventListener("mousemove", mouseHandler);
      elem.removeEventListener("mouseleave", () => {});
    };
  }, [theme]);

  // --- SVG shape rendering logic per theme (anime = manga accent, disney = soft cloud/sparkle, professional = geometric) ---
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
      {/* Farthest background: large blurred ellipse/shape */}
      <svg
        ref={layer1}
        width="900"
        height="340"
        viewBox="0 0 900 340"
        style={{
          position: "absolute",
          top: "-90px",
          left: "-120px",
          opacity: 0.36,
          filter: "blur(18px) saturate(1.3)",
          transition: "filter 0.37s"
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
      {/* Middle layer: shape changes based on theme */}
      <svg
        ref={layer2}
        width="620"
        height="340"
        viewBox="0 0 620 340"
        style={{
          position: "absolute",
          bottom: "-44px",
          right: "-92px",
          opacity: 0.42,
          filter: "blur(13px) saturate(1.29)",
          transition: "filter 0.36s"
        }}
      >
        {/* CLOUD for disney, SLOPE for anime, DIAMOND for professional */}
        {theme === "disney" ? (
          <path
            d="M140,280 Q160,230 235,230 Q245,170 360,210 Q410,120 500,180 Q620,220 570,310 Q400,340 140,280Z"
            fill={colors.bg2}
          />
        ) : theme === "professional" ? (
          <polygon
            points="120,306 340,95 590,250 450,335"
            fill={colors.bg2}
          />
        ) : (
          // anime: sloped squiggle blob
          <ellipse
            cx="400"
            cy="220"
            rx="155"
            ry="70"
            fill={colors.bg2}
          />
        )}
      </svg>
      {/* Foreground: themed accent – blob for anime, big sparkle/circle for disney, geometric poly for professional */}
      <svg
        ref={layer3}
        width="410"
        height="210"
        viewBox="0 0 410 210"
        style={{
          position: "absolute",
          top: "58%",
          left: theme === "professional" ? "11vw" : "6vw",
          opacity: 0.74,
          filter: "blur(4.7px)",
          transition: "filter 0.38s"
        }}
      >
        {theme === "disney" ? (
          // Soft pastel bubble
          <ellipse
            cx="180"
            cy="94"
            rx="88"
            ry="42"
            fill={colors.fg}
            style={{ filter: "drop-shadow(0 0 16px #fef3c7b0)" }}
          />
        ) : theme === "professional" ? (
          // Geometric parallelogram
          <polygon
            points="15,17 390,48 368,184 27,188"
            fill={colors.fg}
            stroke={colors.outline}
            strokeWidth="3.5"
          />
        ) : (
          // Anime: bold manga blob
          <ellipse
            cx="190"
            cy="72"
            rx="98"
            ry="42"
            fill={colors.fg}
            style={{ filter: "drop-shadow(0 0 22px #a78bfa3a)" }}
          />
        )}
      </svg>
      {/* Floating sparkle, star, or geometric marker – themed */}
      <svg
        ref={sparkle}
        width={theme === "professional" ? "50" : "55"}
        height={theme === "professional" ? "50" : "55"}
        style={{
          position: "absolute",
          top: theme === "anime"
            ? "32%" : theme === "disney" ? "33%" : "39%",
          right: theme === "professional" ? "11%" : "14%",
          opacity: 0.95,
          filter: theme === "disney" ? "blur(1.6px)" : theme === "anime" ? "blur(0.3px)" : "none",
          transition: "filter 0.28s, opacity 0.30s"
        }}
      >
        {/* Anime: sparkle star, Disney: pastel bubble+sparkle, Professional: polygon */}
        {theme === "anime" ? (
          // Anime sparkle – classic manga effect, pulses in/out
          <g>
            <polygon points="28,8 32,22 46,25 34,32 37,45 28,36 19,45 22,32 10,25 24,22"
              fill={colors.sparkle}
              style={{ opacity: 0.85, filter: "drop-shadow(0 0 4px #fff8)" }}
            />
            <animate
              attributeName="opacity"
              from="1" to="0.7" dur="1.1s"
              repeatCount="indefinite"
              begin="0.2s"
            />
          </g>
        ) : theme === "disney" ? (
          // Circular sparkle + small pastel circle
          <g>
            <ellipse
              cx="26"
              cy="26"
              rx="19"
              ry="19"
              fill="#fffbea"
              opacity="0.62"
            />
            <ellipse
              cx="41"
              cy="14"
              rx="5"
              ry="4"
              fill={colors.accent}
              opacity="0.57"
            />
            <polygon points="18,27 20,32 25,33 21.2,36.5 22.7,41 18,38 13.7,41 15,36.5 11,33 16,32"
              fill={colors.accent}
              opacity="0.44"
            />
          </g>
        ) : (
          // Professional – geometric (rotates on hover), subtle color
          <polygon
            points="10,35 25,13 46,18 39,40"
            fill={colors.accent}
            stroke={colors.outline}
            strokeWidth="2"
            style={{ opacity: 0.93, filter: "drop-shadow(0 2.7px 8px #1e293b29)" }}
          />
        )}
      </svg>
    </div>
  );
}

/**
 * ParallaxHome – Combines the injected HTML-based hero and themed parallax sections below.
 */
// PUBLIC_INTERFACE
export default function ParallaxHome() {
  // Per-panel settings: each theme panel gets custom effects and mascot
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
      theme: "generic",
      background: {
        background: "linear-gradient(120deg,#ede9fe 60%,#fbcfe8 100%)",
        color: "#282c34"
      }
    },
    {
      key: "anime",
      heading: "Anime Theme",
      description: "Bright colours, manga shapes and playful motions. Bouncing stars, bold blobs & lively accents.",
      theme: "anime"
    },
    {
      key: "disney",
      heading: "Disney Theme",
      description: "Pastel clouds, sparkling bubbles, and soft floating magic animate your theme.",
      theme: "disney"
    },
    {
      key: "professional",
      heading: "Professional Theme",
      description: "Clean geometric layers and interactive shapes. Modern motion, subtle color, sharp accents.",
      theme: "professional"
    }
  ];

  return (
    <React.Fragment>
      {/* Injected parallax HTML hero (fullscreen, above themed panels) */}
      <ParallaxHTMLHero />
      {/* The themed scroll panels (legacy ParallaxHome content) – for demo, leave below hero */}
      <div className="parallax-wrapper" style={{ background: "#fefafd", position: "relative" }}>
        {/* SECTION 0 – About/intro (no parallax shapes, but uses a static SVG for branding) */}
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
          {/* Subtle brand SVG motif */}
          <svg width="78" height="78" style={{ marginTop: 26 }}>
            <ellipse cx="39" cy="46" rx="31" ry="14" fill="#fbbf24" opacity="0.22" />
            <circle cx="39" cy="34" r="22" fill="#4f46e5" />
            <ellipse cx="39" cy="57" rx="20" ry="8" fill="#ec4899" opacity="0.48" />
          </svg>
        </section>
        {/* Animated theme panels with interactive layered parallax */}
        {sections.slice(1).map((panel) => (
          <section
            key={panel.key}
            className="panel"
            style={{
              position: "relative",
              background: "none",
              color: "#282c34",
              overflow: "hidden"
            }}
          >
            {/* Themed, interactive parallax background */}
            <ParallaxShapes theme={panel.theme} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{
                color: panel.theme === "anime"
                  ? "#7c3aed"
                  : panel.theme === "disney"
                    ? "#f59e42"
                    : "#1e293b"
              }}>{panel.heading}</h2>
              <p>{panel.description}</p>
              {/* Animated theme mascot illustration (SVG, static, but visually expressive) */}
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
                    {/* Manga sparkles */}
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
                    {/* smile */}
                    <path d="M46 81 q9 7 18 0" stroke="#ec4899" strokeWidth="2" fill="none" />
                    {/* star sparkle (theme motif) */}
                    <polygon points="24,34 26,40 32,41 27.5,44.5 29.5,50 24,46.5 18.5,50 20.5,44.5 16,41 22,40" fill="#fef3c7" />
                    <polygon points="96,34 98,40 104,41 99.5,44.5 101.5,50 96,46.5 90.5,50 92.5,44.5 88,41 94,40" fill="#fef3c7" />
                  </svg>
                  <div style={{ color: "#f59e42", fontWeight: 700, fontSize: 15, marginTop: 2 }}>
                    Magical Mouse
                  </div>
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
                  <div style={{ color: "#1e293b", fontWeight: 700, fontSize: 15, marginTop: 2 }}>
                    Pro Mascot
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </React.Fragment>
  );
}

/*
  --- Customization Documentation ---

  ParallaxHTMLHero:
    - Structure mirrors original HTML demo, with layered .parallax_layer divs for stacking.
    - Each layer uses a remote image for background (URL preserved, not imported).
    - The hero-content is sticky and overlays above parallax background/mountain/cloud.
    - Buttons and layout adapt for mobile/fullscreen; credits must remain as footer.
    - Parallax effect achieved via JS scroll event, moving layers at different rates (see useEffect logic).

  ParallaxShapes logic for each theme:
    - As before, see detailed comments above for themed panel layers.

  --- End Documentation ---
*/
