import React, { useState } from "react";
import "./Themes.css";

// PUBLIC_INTERFACE
function Themes() {
  /**
   * PUBLIC_INTERFACE
   * Themes page displays a responsive grid of theme cards (Anime, Disney, Professional),
   * each with an expandable "Try AI" input section and placeholder code output.
   * Clean, colorful, and mobile-friendly layout.
   */
  const themes = [
    {
      key: "anime",
      name: "Anime",
      desc: "Epic anime web themes inspired by your favorite shows. Bright color splashes, expressive graphics, and bold fonts for maximum personality!",
    },
    {
      key: "disney",
      name: "Disney",
      desc: "Magical Disney-style sites with charming, whimsical touches. Vibrant palettes, rounded layouts, and a hint of fairytale magic for all ages.",
    },
    {
      key: "professional",
      name: "Professional",
      desc: "Clean, modern, and polished themes for businesses, portfolios, and landing pages. Minimal yet dynamic and perfect for serious projects.",
    },
  ];

  const [expander, setExpander] = useState({
    anime: false,
    disney: false,
    professional: false,
  });
  const [prompts, setPrompts] = useState({
    anime: "",
    disney: "",
    professional: "",
  });
  const [outputs, setOutputs] = useState({
    anime: "",
    disney: "",
    professional: "",
  });

  // Toggle "Try AI" expansion for a theme
  // PUBLIC_INTERFACE
  function handleExpand(themeKey) {
    setExpander((prev) => ({
      ...prev,
      [themeKey]: !prev[themeKey],
    }));
  }

  // Capture input changes (AI prompt field)
  function handlePromptChange(themeKey, value) {
    setPrompts((prev) => ({
      ...prev,
      [themeKey]: value,
    }));
  }

  // Simulate "generate code" (for now, display a placeholder HTML/JS/CSS block)
  function handleGenerate(themeKey) {
    setOutputs((prev) => ({
      ...prev,
      [themeKey]:
        "// (HTML, CSS, JS code will appear here for " +
        themeKey.charAt(0).toUpperCase() +
        themeKey.slice(1) +
        " themes)\n" +
        "<!-- Example site code output -->",
    }));
  }

  return (
    <main className="themes-page-main">
      <h1 style={{ marginBottom: "0.2em", fontWeight: 900, letterSpacing: 2 }}>
        Explore Themes
      </h1>
      <p style={{ color: "#4f46e5", fontSize: "1.09em", margin: 0 }}>
        Choose your style and try AI theme generator!
      </p>
      <div className="themes-grid">
        {themes.map((theme) => (
          <section
            key={theme.key}
            className={`theme-card ${theme.key}`}
            tabIndex={0}
            aria-label={theme.name + " theme card"}
          >
            <h2 className="theme-title">{theme.name}</h2>
            <p className="theme-description">{theme.desc}</p>
            <button
              className="try-ai-btn"
              onClick={() => handleExpand(theme.key)}
              aria-expanded={!!expander[theme.key]}
            >
              {expander[theme.key] ? "Close" : "Try AI"}
            </button>
            {expander[theme.key] && (
              <div className="ai-section">
                <label
                  htmlFor={`ai-prompt-${theme.key}`}
                  className="theme-ai-label"
                >
                  Website idea:
                </label>
                <div className="theme-ai-input-row">
                  <input
                    className="theme-ai-input"
                    type="text"
                    id={`ai-prompt-${theme.key}`}
                    maxLength={120}
                    placeholder="e.g. Cute anime blog/Disney fan club/Portfolio site"
                    value={prompts[theme.key]}
                    onChange={(e) =>
                      handlePromptChange(theme.key, e.target.value)
                    }
                  />
                  <button
                    className="theme-generate-btn"
                    onClick={() => handleGenerate(theme.key)}
                  >
                    Generate Code
                  </button>
                </div>
                <div className="theme-ai-output">
                  {outputs[theme.key]
                    ? outputs[theme.key]
                    : "HTML, CSS, JS code will appear here..."}
                </div>
              </div>
            )}
          </section>
        ))}
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
          Custom themes &amp; AI-powered style generator launching soon!
        </div>
      </div>
    </main>
  );
}

export default Themes;
