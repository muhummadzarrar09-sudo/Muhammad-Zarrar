"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Mini({ mouse }: { mouse?: { x: number; y: number } }) {
  const g = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.015; // ultra-slow, calm, editorial
    if (g.current) {
      g.current.rotation.y = t * 0.61 + (mouse?.x || 0) * 0.48;
      g.current.rotation.x = Math.sin(t * 0.17) * 0.072 + (mouse?.y || 0) * 0.36;
    }
  });

  return (
    <group ref={g}>
      {/* HIGH-ENTROPY SMOOTH MINI SCULPTURE — real 3D designer feel */}
      {/* Complex smooth torus knot */}
      <mesh>
        <torusKnotGeometry args={[1.05, 0.32, 210, 28, 2, 4]} />
        <meshPhongMaterial 
          color="#c08532" 
          shininess={52} 
          specular="#ff6a3d"
          flatShading={false}
        />
      </mesh>

      {/* Ultra-smooth high-poly core sphere */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.44, 56, 42]} />
        <meshPhongMaterial color="#f4f1ea" shininess={95} specular="#ff6a3d" flatShading={false} />
      </mesh>

      {/* Smooth delicate orbiting ring */}
      <mesh position={[0, -0.65, 0]} rotation={[0.9, 0.6, 0]}>
        <torusGeometry args={[1.38, 0.01, 14, 82]} />
        <meshPhongMaterial color="#f4f1ea" transparent opacity={0.28} flatShading={false} />
      </mesh>
    </group>
  );
}

export function MiniCinematicSculpture() {
  return (
    <div className="w-full h-[260px] rounded-2xl overflow-hidden bg-[#11100c]">
      <Canvas camera={{ position: [0, 0, 4.6], fov: 46 }}>
        <ambientLight intensity={0.65} color="#f4f1ea" />
        <directionalLight position={[3, 6, -4]} intensity={0.9} color="#ff6a3d" />
        <Mini />
      </Canvas>
    </div>
  );
}
