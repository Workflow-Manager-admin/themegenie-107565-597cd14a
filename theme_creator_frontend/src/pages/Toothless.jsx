import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

/**
 * Preload the Toothless GLTF model at file scope for fast initial loading.
 * Path MUST be relative to the public directory, i.e., "/assets/toothless.glb"
 */
useGLTF.preload("/assets/toothless.glb");

// PUBLIC_INTERFACE
/**
 * Toothless 3D glTF model for use inside react-three/fiber <Canvas>.
 * Renders nothing unless the `scene` is available and valid.
 * Defensive: supports optional "y" prop for vertical positioning.
 * Must only be used inside <Canvas>.
 *
 * @param {object} props
 * @param {number} [props.y] - Y position offset (default: 0).
 */
export function Toothless({ y = 0 }) {
  // Load the GLTF scene; useGLTF caches internally.
  const { scene } = useGLTF("/assets/toothless.glb") || {};
  const ref = useRef();

  // Defensive: Only render if scene is present (preload won't cause crash).
  if (!scene) return null;

  return (
    <group ref={ref} position={[0, y, 0]}>
      {/* Using <primitive> to inject the root scene node safely */}
      <primitive object={scene} scale={0.8} />
    </group>
  );
}
