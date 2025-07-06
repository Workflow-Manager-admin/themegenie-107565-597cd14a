import React from "react";
import { Canvas } from "@react-three/fiber";
import { Toothless } from "./Toothless";
import "./ParallaxHome.css";

const panelBackground = {
  background: `url(${process.env.PUBLIC_URL}/webbg1.png) center / cover fixed`,
  color: "#fff"
};

/**
 * ParallaxHome page with animated 3D model for all three theme panels.
 */
export default function ParallaxHome() {
  // <Canvas> children must be valid React elements; never return objects anywhere.
  return (
    <div className="parallax-wrapper">
      {/* SECTION 0 – About */}
      <section className="panel" style={panelBackground}>
        <h1>Theme Genie</h1>
        <p>
          We turn your idea into ready‑to‑copy <strong>HTML, CSS, JS</strong>. Choose
          Anime, Disney or Professional style – our AI writes the code.
        </p>
      </section>

      {/* SECTION 1 – Anime */}
      <section className="panel" style={panelBackground}>
        <h2>Anime Theme</h2>
        <p>Bright colours, manga fonts and playful motions.</p>
        <Canvas className="model">
          <ambientLight />
          <directionalLight position={[2, 2, 2]} />
          <Toothless y={0} />
        </Canvas>
      </section>

      {/* SECTION 2 – Disney */}
      <section className="panel" style={panelBackground}>
        <h2>Disney Theme</h2>
        <p>Rounded edges, soft gradients, a sprinkle of magic.</p>
        <Canvas className="model">
          <ambientLight />
          <directionalLight position={[2, 2, 2]} />
          <Toothless y={0} />
        </Canvas>
      </section>

      {/* SECTION 3 – Professional */}
      <section className="panel" style={panelBackground}>
        <h2>Professional Theme</h2>
        <p>Clean lines, business fonts and calm colours.</p>
        <Canvas className="model">
          <ambientLight />
          <directionalLight position={[2, 2, 2]} />
          <Toothless y={0} />
        </Canvas>
      </section>
    </div>
  );
}
