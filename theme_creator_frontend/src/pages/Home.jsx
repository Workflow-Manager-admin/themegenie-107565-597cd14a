import React, { useEffect, useRef } from "react";
import "./Home.css";

// PUBLIC_INTERFACE
function Home() {
  /** Home page with intro, WHAT WE DO section, and scroll-animated 3D character. */
  const charRef = useRef(null);

  // Parallax effect for 3D character
  useEffect(() => {
    const handleScroll = () => {
      if (charRef.current) {
        const scrollY = window.scrollY;
        charRef.current.style.transform = `translateY(${scrollY * 0.3}px) rotateY(${
          scrollY % 360
        }deg)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="home">
      <section className="home__intro">
        <h1>
          Welcome to <span className="home__brand">Theme Creator</span>!
        </h1>
        <div style={{
          margin: "1.5em 0 0.8em 0",
          textAlign: "left"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            color: "#4f46e5",
            letterSpacing: "0.5px"
          }}>
            What We Do
          </h2>
          <div style={{ color: "#222", fontSize: "1.1em", lineHeight: "1.7", maxWidth: "700px" }}>
            Theme Creator lets anyone instantly generate <strong>unique website themes</strong>—Anime, Disney, or Professional styles—by just describing your idea.
            <br /><br />
            Powered by <span style={{ color: "#ec4899", fontWeight: 700 }}>AI</span>, your chosen style comes to life with ready-to-use HTML, CSS, and JS code.
            <br />
            No design skills or coding expertise needed. Create, preview, and bring your web vision to life, all in a playful and modern interface!
          </div>
        </div>
      </section>
      <section className="home__character-section">
        <h2 className="home__character-title">
          <span role="img" aria-label="magic">✨</span> Watch our 3D friends!
        </h2>
        <div
          className="home__3d-character"
          ref={charRef}
          tabIndex={0}
          aria-label="Placeholder animated 3D character"
        >
          {/* Placeholder SVG as '3D' animated figure */}
          <svg
            width="100"
            height="120"
            viewBox="0 0 100 120"
            style={{ display: "block", margin: "0 auto" }}
          >
            <ellipse cx="50" cy="90" rx="25" ry="10" fill="#fbbf24" opacity="0.35" />
            <circle cx="50" cy="50" r="36" fill="#4f46e5" />
            <ellipse cx="50" cy="85" rx="18" ry="18" fill="#ec4899" />
            <ellipse cx="38" cy="42" rx="7" ry="10" fill="#fff" />
            <ellipse cx="62" cy="42" rx="7" ry="10" fill="#fff" />
            <circle cx="41" cy="46" r="3" fill="#282c34" />
            <circle cx="59" cy="46" r="3" fill="#282c34" />
            <ellipse cx="50" cy="60" rx="13" ry="7" fill="#fff" />
            <ellipse cx="50" cy="67" rx="7" ry="2.5" fill="#282c34" />
          </svg>
          <span className="home__3d-label">3D Character (Placeholder)</span>
        </div>
        <p style={{ marginTop: "1.3em", color: "#4f46e5", fontWeight: 600 }}>
          Scroll to see the magic!
        </p>
      </section>
    </main>
  );
}

export default Home;
