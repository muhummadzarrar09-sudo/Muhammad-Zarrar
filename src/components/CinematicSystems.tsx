"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Systems() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.014;
    if (group.current) {
      group.current.rotation.y = t * 0.29;
      group.current.rotation.x = Math.sin(t * 0.1) * 0.032;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.92, 0.34, 64, 12, 2, 3]} />
        <meshPhongMaterial color="#ff6a3d" shininess={58} specular="#f4f1ea" emissive="#1c1914" flatShading={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.58, 24, 18]} />
        <meshPhongMaterial color="#f4f1ea" shininess={92} specular="#ff6a3d" flatShading={false} />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[Math.cos((i * Math.PI) / 2) * 1.92, Math.sin((i * Math.PI) / 2) * 0.52, Math.sin(i) * 0.32]}
          rotation={[0.7, i * 1.25, 0.15]}
        >
          <torusGeometry args={[1.05, 0.012, 8, 24]} />
          <meshPhongMaterial color="#c08532" transparent opacity={0.42} side={THREE.DoubleSide} flatShading={false} />
        </mesh>
      ))}
      <mesh position={[0, 1.42, 0]} rotation={[0.4, 0.9, 0]}>
        <torusGeometry args={[0.82, 0.008, 8, 24]} />
        <meshPhongMaterial color="#f4f1ea" transparent opacity={0.19} flatShading={false} />
      </mesh>
      <mesh position={[0, -2.35, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshPhongMaterial color="#3a362d" transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export function CinematicSystems() {
  return (
    <div className="relative w-full h-[340px] rounded-3xl overflow-hidden bg-[#13100c]">
      <Canvas camera={{ position: [0, 0.5, 6.5], fov: 36 }}>
        <ambientLight intensity={0.5} color="#f4f1ea" />
        <directionalLight position={[5, 8, -4]} intensity={0.9} color="#ff6a3d" />
        <Systems />
      </Canvas>
      <div className="absolute bottom-7 left-8 text-xs font-mono tracking-widest text-spark/60 pointer-events-none">
        SYSTEMS — THE INVISIBLE ARCHITECTURE
      </div>
    </div>
  );
}

export default CinematicSystems;
