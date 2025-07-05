import React from "react";

// PUBLIC_INTERFACE
function Themes() {
  /** Placeholder for the Themes page, where theme options will go later. */
  return (
    <main className="container" style={{ minHeight: "60vh", paddingTop: "2rem" }}>
      <h1>Themes</h1>
      <p>
        Choose from a variety of Anime, Disney, and Professional style themes (coming soon).
      </p>
      <div style={{ padding: "2em 0", textAlign: "center" }}>
        <span style={{
          fontSize: "2rem",
          color: "#fbbf24"
        }}>🎨</span>
        <p style={{ margin: "1rem 0 0", color: "#888" }}>
          Custom themes &amp; AI-powered style generator launching soon!
        </p>
      </div>
    </main>
  );
}

export default Themes;
