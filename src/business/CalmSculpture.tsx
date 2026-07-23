"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Calm, editorial 3D sculpture for the Business route.
 * Much slower, more restrained, premium studio feel.
 * Perfect for the "more cinematic than kinetic" side.
 */

function CalmForm() {
  const g = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.022; // extremely slow
    if (g.current) {
      g.current.rotation.y = t * 0.6;
      g.current.rotation.x = Math.sin(t * 0.15) * 0.04;
    }
  });

  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[1.0, 0.12, 18, 72, Math.PI * 1.5]} />
        <meshPhongMaterial
          color="#c08532"
          emissive="#1f1c17"
          shininess={15}
          specular="#f4f1ea"
        />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <octahedronGeometry args={[0.55]} />
        <meshPhongMaterial color="#f4f1ea" shininess={30} />
      </mesh>
    </group>
  );
}

export function CalmSculpture() {
  return (
    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden bg-[#15130f]">
      <Canvas camera={{ position: [0, 0.2, 5.8], fov: 38 }}>
        <ambientLight intensity={0.5} color="#f4f1ea" />
        <directionalLight position={[4, 7, -3]} intensity={0.7} color="#ff6a3d" />
        <CalmForm />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 pointer-events-none" />
    </div>
  );
}
