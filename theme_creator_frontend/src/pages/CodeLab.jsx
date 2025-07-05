import React, { useState } from "react";
import "./Themes.css";

/**
 * Async placeholder for Gemini or AI backend integration.
 * Simulates code generation for a given theme and idea.
 * @param {string} theme - The theme type: "Anime"|"Disney"|"Professional"
 * @param {string} idea - The user site idea
 * @returns {Promise<string>} - Returns generated HTML/CSS/JS as string
 */
// PUBLIC_INTERFACE
async function generateThemeCode(theme, idea) {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 900));
  // Placeholder example
  if (!idea || !idea.trim()) {
    return "// Please enter a website idea to get started!";
  }
  switch (theme) {
    case "Anime":
      return `<html>
  <head>
    <title>${idea} - Anime Theme</title>
    <style>
      body { background: linear-gradient(120deg,#ede9fe 0%,#fbcfe8 100%); color: #811; font-size: 120%; }
      h1 { color: #7c3aed; text-shadow: 0 2px 14px #e0a7f6; }
      .sparkle { color: #f472b6; font-size: 1.9em; }
    </style>
  </head>
  <body>
    <h1><span class="sparkle">★</span> ${idea} <span class="sparkle">★</span></h1>
    <p>Welcome to your personalized Anime web experience!</p>
  </body>
</html>`;
    case "Disney":
      return `<html>
  <head>
    <title>${idea} - Disney Magic</title>
    <style>
      body { background: linear-gradient(90deg,#fef3c7 40%,#dbeafe 100%); font-family: 'Comic Sans MS', cursive; }
      h1 { color: #f59e42; text-shadow: 0 2px 10px #fff3c9; }
      .magic { color: #333cff; font-weight: bold; font-size: 1.6em; }
    </style>
  </head>
  <body>
    <h1><span class="magic">✨</span> ${idea} <span class="magic">✨</span></h1>
    <p>Create your own story with Disney-inspired design!</p>
  </body>
</html>`;
    case "Professional":
      return `<html>
  <head>
    <title>${idea} - Professional Theme</title>
    <style>
      body { background: linear-gradient(130deg,#e0f2fe 0%,#f1f5f9 100%); color: #111927; }
      h1 { color: #1e293b; letter-spacing: 1.6px; }
      .accent { color: #38bdf8; font-weight: bold; }
    </style>
  </head>
  <body>
    <h1><span class="accent">▍</span> ${idea} <span class="accent">▍</span></h1>
    <p>Modern, elegant theme for your professional needs.</p>
  </body>
</html>`;
    default:
      return "// AI response: Cannot generate code for unknown theme.";
  }
}

// Single theme card (chatbot) component
function ThemeChatCard({ themeKey, title, desc, accentClass }) {
  const [idea, setIdea] = useState("");
  const [resultCode, setResultCode] = useState("");
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await generateThemeCode(title, idea);
      setResultCode(result);
    } catch (e) {
      setResultCode("// Error: Unable to generate code.");
    }
    setLoading(false);
  }

  return (
    <section className={`theme-card ${accentClass}`} tabIndex={0} aria-label={`${title} theme card`}>
      <h2 className="theme-title">{title}</h2>
      <p className="theme-description">{desc}</p>
      {/* Chat UI */}
      <div className="ai-section" style={{ marginTop: ".5em" }}>
        <label htmlFor={`ai-prompt-${themeKey}`} className="theme-ai-label">
          Website idea:
        </label>
        <div className="theme-ai-input-row">
          <input
            className="theme-ai-input"
            type="text"
            id={`ai-prompt-${themeKey}`}
            maxLength={120}
            placeholder={`e.g. Cute ${title.toLowerCase()} blog...`}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={loading}
          />
          <button
            className="theme-generate-btn"
            onClick={handleGenerate}
            disabled={!idea.trim() || loading}
            aria-busy={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </button>
        </div>
        <div className="theme-ai-output">
          <pre style={{
            background: "none",
            color: accentClass === "anime" ? "#8933e9"
              : accentClass === "disney" ? "#f59e42"
              : accentClass === "professional" ? "#29486a"
              : "#666",
            margin: 0,
            fontFamily: "'Fira Mono','Menlo',monospace",
            fontSize: "0.93em",
            lineHeight: "1.28",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            minHeight: "44px",
            padding: "0",
          }}>
            {resultCode ? resultCode : "HTML, CSS, JS code will appear here..."}
          </pre>
        </div>
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function CodeLab() {
  /**
   * CodeLab page with three fully interactive, themed chatbot cards (Anime, Disney, Professional).
   * Each card is self-contained, styled, and updates output with generateThemeCode().
   * Responsive, fun, and colorful layout.
   */
  return (
    <main className="themes-page-main">
      <h1 style={{ marginBottom: "0.2em", fontWeight: 900, letterSpacing: 2 }}>
        Explore CodeLab
      </h1>
      <p style={{ color: "#4f46e5", fontSize: "1.09em", margin: 0 }}>
        Choose your style and try AI code generator!
      </p>
      <div className="themes-grid">
        <ThemeChatCard
          themeKey="anime"
          title="Anime"
          desc="Epic anime web themes inspired by your favorite shows. Bright color splashes, expressive graphics, and bold fonts for maximum personality!"
          accentClass="anime"
        />
        <ThemeChatCard
          themeKey="disney"
          title="Disney"
          desc="Magical Disney-style sites with charming, whimsical touches. Vibrant palettes, rounded layouts, and a hint of fairytale magic for all ages."
          accentClass="disney"
        />
        <ThemeChatCard
          themeKey="professional"
          title="Professional"
          desc="Clean, modern, and polished themes for businesses, portfolios, and landing pages. Minimal yet dynamic and perfect for serious projects."
          accentClass="professional"
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "1.8em", fontSize: "2rem" }}>
        <span role="img" aria-label="palette">
          🎨
        </span>
        <div
          style={{
            margin: "1.1rem 0 0",
            color: "#888",
            fontSize: "1.08rem",
          }}
        >
          Custom themes &amp; AI-powered code generator launching soon!
        </div>
      </div>
    </main>
  );
}

export default CodeLab;
