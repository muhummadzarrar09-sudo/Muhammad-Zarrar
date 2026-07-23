"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Cinematic Light Study
 * Pure light and form. Very editorial.
 * Represents "motion with meaning".
 */

function LightForms() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.013; // ultra-slow, pure editorial light
    if (group.current) {
      group.current.rotation.y = t * 0.41;
      group.current.rotation.x = Math.sin(t * 0.22) * 0.028;
    }
  });

  return (
    <group ref={group}>
      {/* HIGH-ENTROPY LIGHT STUDY — real 3D designer quality + relevance */}
      {/* Smooth organic light "core" (high-poly sphere + subtle knot) */}
      <mesh>
        <sphereGeometry args={[1.05, 72, 56]} />
        <meshPhongMaterial 
          color="#f4f1ea" 
          emissive="#ff6a3d" 
          emissiveIntensity={0.42}
          shininess={105} 
          flatShading={false}
        />
      </mesh>

      {/* Intersecting high-entropy smooth light form */}
      <mesh rotation={[0.6, 1.4, 0.9]}>
        <torusKnotGeometry args={[0.58, 0.19, 142, 20, 2, 3]} />
        <meshPhongMaterial 
          color="#ff6a3d" 
          emissive="#1c1914"
          emissiveIntensity={0.28}
          shininess={85}
          flatShading={false}
        />
      </mesh>

      {/* Orbiting smooth light rods — elegant high-fidelity */}
      {[0,1,2,3].map(i => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i * 1.85) + 0.8) * 1.72, 
            Math.sin(i) * 0.92, 
            Math.sin(i * 1.4) * 0.6
          ]}
          rotation={[0.3, i * 0.7, 0]}
        >
          <boxGeometry args={[0.06, 2.15, 0.06]} />
          <meshPhongMaterial color="#ff6a3d" shininess={92} flatShading={false} />
        </mesh>
      ))}

      {/* Extra delicate smooth floating light ring */}
      <mesh position={[0, 1.1, 0]}>
        <torusGeometry args={[0.72, 0.015, 12, 58]} />
        <meshPhongMaterial color="#f4f1ea" transparent opacity={0.38} flatShading={false} />
      </mesh>

      <mesh position={[0, -2.55, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshPhongMaterial color="#3a362d" transparent opacity={0.52} />
      </mesh>
    </group>
  );
}

export function CinematicLightStudy() {
  return (
    <div className="relative w-full h-[380px] rounded-3xl overflow-hidden bg-[#0f0d09]">
      <Canvas camera={{ position: [0, 0.8, 5.5], fov: 40 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 4, -2]} intensity={1.2} color="#ff6a3d" />
        <LightForms />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10" />
      <div className="absolute bottom-7 left-8 text-xs font-mono tracking-[3px] text-spark/70">LIGHT STUDY — MOTION WITH MEANING</div>
    </div>
  );
}
