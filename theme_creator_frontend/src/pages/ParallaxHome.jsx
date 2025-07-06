import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import "./ParallaxHome.css";

// IMPORTANT: The preload call must be outside of any component body
useGLTF.preload("/assets/toothless.glb");

const panelBackground = {
  background: `url(${process.env.PUBLIC_URL}/webbg1.png) center / cover fixed`,
  color: "#fff"
};

/**
 * PUBLIC_INTERFACE
 * 3D Toothless model (glTF). Used inside react-three/fiber <Canvas>.
 */
function Toothless({ y }) {
  const { scene } = useGLTF("/assets/toothless.glb");
  const ref = useRef();
  useFrame(() => {
    // simple floating animation
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.position.x = Math.sin(Date.now() * 0.0005) * 2;
    }
  });
  // NOTE: <primitive /> is valid as Canvas child; do not wrap as object/function call.
  return <primitive ref={ref} object={scene} scale={0.8} position={[0, y, 0]} />;
}

// PUBLIC_INTERFACE
/**
 * ParallaxHome page with animated 3D model for all three theme panels.
 */
export default function ParallaxHome() {
  return (
    <div className="parallax-wrapper">
      {/* SECTION 0 – About */}
      <section className="panel" style={panelBackground}>
        <h1>Theme Genie</h1>
        <p>
          We turn your idea into ready‑to‑copy <strong>HTML, CSS, JS</strong>. Choose
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
          {/* Only use as <Toothless /> not Toothless() */}
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
