import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import "./ParallaxHome.css";

const panelBackground = {
  background: `url(${process.env.PUBLIC_URL}/webbg1.png) center / cover fixed`,
  color: "#fff"
};

/* 3‑D Toothless component */
function Toothless({ y }) {
  const { scene } = useGLTF("/assets/toothless.glb");
  const ref = useRef();
  useFrame(() => {
    // simple floating animation
    ref.current.rotation.y += 0.005;
    ref.current.position.x = Math.sin(Date.now() * 0.0005) * 2;
  });
  return <primitive ref={ref} object={scene} scale={0.8} position={[0, y, 0]} />;
}

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

/* allow drei to cache model */
useGLTF.preload("/assets/toothless.glb");
