import React, { useState } from "react";
import "../pages/Themes.css";
import { generateThemeCode } from "../utils/openrouter";

// PUBLIC_INTERFACE
/**
 * CodeLab page: Modern AI-powered code generation with theme dropdown,
 * idea input, and colorfully styled, responsive output for HTML, CSS, JS.
 */
function CodeLab() {
  const THEMES = [
    { value: "Anime", label: "Anime", accent: "var(--anime-color)", bg: "linear-gradient(120deg,#ede9fe 0%,#fbcfe8 100%)" },
    { value: "Disney", label: "Disney", accent: "var(--disney-color)", bg: "linear-gradient(90deg,#fef3c7 40%,#dbeafe 100%)" },
    { value: "Professional", label: "Professional", accent: "var(--professional-color)", bg: "linear-gradient(130deg,#e0f2fe 0%,#f1f5f9 100%)" },
  ];
  const [theme, setTheme] = useState(THEMES[0].value);
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputs, setOutputs] = useState({ html: "", css: "", js: "" });
  const [raw, setRaw] = useState(""); // For debugging, shows full Gemini/OpenRouter response

  // Extract HTML, CSS, JS from a multi-part code string from OpenRouter Gemini
  function parseCodeSections(code) {
    if (!code) return { html: "", css: "", js: "" };
    let html = "", css = "", js = "";

    // Primary mode: ---HTML---, ---CSS---, ---JS--- blocks
    const htmlMatch = code.match(/---HTML---([\s\S]*?)(?=(---CSS---|---JS---|$))/i);
    const cssMatch = code.match(/---CSS---([\s\S]*?)(?=(---JS---|$))/i);
    const jsMatch = code.match(/---JS---([\s\S]*)/i);

    if (htmlMatch) html = htmlMatch[1].trim();
    if (cssMatch) css = cssMatch[1].replace(/<\/?style[^>]*>/gi, "").trim();
    if (jsMatch) js = jsMatch[1].replace(/<\/?script[^>]*>/gi, "").trim();

    // Fallback: legacy code with <style> and <script>
    if (!html && !css && !js && code) {
      const legacyStyleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const legacyScriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

      if (legacyStyleMatch) css = legacyStyleMatch[1].trim();
      if (legacyScriptMatch) js = legacyScriptMatch[1].trim();

      html = code
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .trim();

      const htmlBlockMatch = html.match(/(<html[\s\S]*<\/html>)/i);
      if (htmlBlockMatch) html = htmlBlockMatch[1];
    }

    return { html, css, js };
  }

  // PUBLIC_INTERFACE
  async function handleGenerate(e) {
    e.preventDefault();
    setLoading(true);
    setOutputs({ html: "", css: "", js: "" });
    setRaw("");
    // Use OpenRouter Gemini API utility for code generation
    const code = await generateThemeCode(theme, idea);
    const sections = parseCodeSections(code);
    setOutputs(sections);
    setRaw(code);
    setLoading(false);
  }

  // For accent colors, find current selected theme
  const currentThemeObj = THEMES.find(t => t.value === theme);

  return (
    <main
      style={{
        maxWidth: "880px",
        margin: "0 auto",
        padding: "2.1rem 1.1rem 2.2rem 1.1rem",
        minHeight: "74vh",
        width: "100%",
      }}
    >
      <section
        style={{
          background: currentThemeObj.bg,
          borderRadius: 22,
          boxShadow: "0 8px 36px 0 rgba(79,70,229,0.08), 0 1px 4px 0 rgba(0,0,0,0.07)",
          padding: "1.8rem 1.2rem 1.5rem 1.2rem",
          border: `3px solid ${currentThemeObj.accent}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          transition: "background 0.4s, border 0.3s",
        }}
      >
        <h1 style={{
          marginBottom: "0.42em",
          fontWeight: 900,
          letterSpacing: 1.2,
          color: currentThemeObj.accent,
          fontSize: "2.2rem",
        }}>
          CodeLab – AI Theme Generator
        </h1>
        <p style={{
          color: "#444",
          fontSize: "1.1em",
          marginBottom: "1.2em"
        }}>
          Pick a theme, describe your idea, and build creative site code (HTML, CSS, and JavaScript) using Gemini AI.
        </p>

        <form
          onSubmit={handleGenerate}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "flex-end",
            marginBottom: "2.2em"
          }}
          aria-label="Theme and idea input"
        >
          <div style={{ minWidth: 150, flex: "1 1 160px", maxWidth: 220 }}>
            <label htmlFor="theme-dropdown" style={{ fontWeight: 600, color: currentThemeObj.accent }}>Theme</label>
            <select
              id="theme-dropdown"
              value={theme}
              style={{
                width: "100%",
                marginTop: 4,
                borderRadius: 8,
                padding: "0.5em 0.8em",
                background: "#fff",
                border: `2px solid ${currentThemeObj.accent}`,
                color: "#222",
                fontSize: "1.07em",
                outline: "none"
              }}
              onChange={e => setTheme(e.target.value)}
              disabled={loading}
            >
              {THEMES.map(option => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: "2 1 320px" }}>
            <label htmlFor="idea-input" style={{ fontWeight: 600, color: "#888" }}>Website / app idea</label>
            <input
              id="idea-input"
              type="text"
              value={idea}
              placeholder={`E.g. Portfolio for a ${theme} chef, cute pet blog, etc.`}
              required
              maxLength={180}
              style={{
                width: "100%",
                marginTop: 4,
                borderRadius: 8,
                padding: "0.5em 1em",
                fontSize: "1.06em",
                border: "1.8px solid #e5e7eb",
                outline: "none",
              }}
              onChange={e => setIdea(e.target.value)}
              disabled={loading}
              aria-label="Describe your idea for the generator"
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                background: currentThemeObj.accent,
                color: "#fff",
                padding: "0.64em 1.2em",
                border: "none",
                borderRadius: 8,
                fontSize: "1em",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 2px 12px rgba(76,60,229,0.11)",
                marginTop: 15
              }}
              disabled={loading || !idea.trim()}
              aria-busy={loading}
            >
              {loading ? "Generating…" : "Generate Code"}
            </button>
          </div>
        </form>

        <ResponsivePreviewOutputs outputs={outputs} accent={currentThemeObj.accent} />

        {/* <textarea style={{display: "none"}} value={raw} readOnly rows={4} /> */}

        <div style={{
          margin: "2.4em 0 0",
          textAlign: "right",
          fontSize: "1em",
          color: "#aaa",
        }}>
          Powered by Gemini AI &nbsp; <span aria-label="sparkles" role="img">✨</span>
        </div>
      </section>
    </main>
  );
}

// Responsive component to display three labeled output boxes for HTML, CSS, JS.
function ResponsivePreviewOutputs({ outputs, accent }) {
  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "1.2em",
      marginTop: "0.2em",
      marginBottom: "0.8em"
    }}>
      <PreviewPanel
        label="HTML"
        value={outputs.html}
        accent={accent}
        gradient="linear-gradient(120deg,#ede9fe 0%,#fbcfe8 100%)"
        codeColor="#7c3aed"
      />
      <PreviewPanel
        label="CSS"
        value={outputs.css}
        accent={accent}
        gradient="linear-gradient(90deg,#fef3c7 10%,#a7f3d0 100%)"
        codeColor="#10b981"
      />
      <PreviewPanel
        label="JavaScript"
        value={outputs.js}
        accent={accent}
        gradient="linear-gradient(130deg,#e0f2fe,#f1f5f9 100%)"
        codeColor="#1e293b"
      />
      <style>{`
        @media (max-width: 960px) {
          section[aria-label="output-panels"] { grid-template-columns: 1fr !important;}
        }
      `}</style>
    </section>
  );
}

// PUBLIC_INTERFACE
function PreviewPanel({ label, value, accent, gradient, codeColor }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 13,
        padding: "1em 0.7em 0.5em 0.7em",
        border: `2.5px solid ${accent}`,
        background: gradient,
        minHeight: 170,
        position: "relative",
        boxShadow: "0 3px 18px 0 rgba(150,120,246,0.07)",
      }}
      aria-label={`${label}-output`}
    >
      <span style={{
        fontWeight: 800,
        letterSpacing: 1.1,
        fontSize: "1.08em",
        color: codeColor,
        marginBottom: "0.3em"
      }}>
        {label}
      </span>
      <textarea
        value={value}
        readOnly
        spellCheck={false}
        rows={7}
        style={{
          background: "rgba(255,255,255,0.81)",
          color: "#222",
          fontFamily: "Fira Mono, Menlo, monospace",
          fontSize: "1em",
          border: "none",
          borderRadius: 7,
          resize: "vertical",
          minHeight: 90,
          outline: "none",
          marginBottom: "0.1em",
          opacity: value ? 1 : 0.95,
        }}
        aria-label={`${label} code output`}
        placeholder={`...${label} code will appear here...`}
      />
    </div>
  );
}

export default CodeLab;
