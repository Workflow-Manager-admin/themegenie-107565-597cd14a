import React, { useEffect, useRef } from "react";
import "./Home.css";

// PUBLIC_INTERFACE
function Home() {
  /** Home page with intro and scroll-animated 3D character placeholder. */
  const charRef = useRef(null);

  // On scroll, move "3D" character placeholder up/down in a fun way
  useEffect(() => {
    const handleScroll = () => {
      if (charRef.current) {
        // Simple parallax effect - moves with scroll
        const scrollY = window.scrollY;
        charRef.current.style.transform = `translateY(${scrollY * 0.3}px) rotateY(${
          (scrollY % 360)
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
        <p>
          Build <b>fun</b>, <b>personalized themes</b> in awesome anime, Disney, or professional styles — powered by <span style={{ color: "#4f46e5" }}>AI</span>! 
          Enjoy a playful, modern, and minimal site that makes theme creation a breeze.
        </p>
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
