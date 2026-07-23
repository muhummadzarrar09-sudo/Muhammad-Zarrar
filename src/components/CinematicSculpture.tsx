"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

/**
 * ULTIMATE PREMIUM CINEMATIC SCULPTURE
 * The hero of the entire experience.
 * Extremely slow, deliberate, high-craft motion.
 * Mouse tilts with elegant response.
 * Multiple layered forms + rich materials.
 */

function Sculpture({ mouse }: { mouse: { x: number; y: number } }) {
  const outer = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Group>(null!);
  const accent = useRef<THREE.Group>(null!);
  const innerRing = useRef<THREE.Group>(null!);
  const secondary = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.013; // ultra-luxurious, heavy, zero anxiety

    if (outer.current) {
      outer.current.rotation.y = t * 0.15 + mouse.x * 0.72;
      outer.current.rotation.x = Math.sin(t * 0.06) * 0.028 + mouse.y * 0.5;
    }
    if (core.current) {
      core.current.rotation.y = -t * 0.65 + mouse.x * -0.22;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.065;
    }
    if (accent.current) {
      accent.current.rotation.y = t * 1.1 + mouse.x * 0.4;
    }
    if (innerRing.current) {
      innerRing.current.rotation.z = -t * 0.36;
    }
    if (secondary.current) {
      secondary.current.rotation.y = t * 0.78 + mouse.x * 0.25;
    }
  });

  return (
    <group ref={outer}>
      {/* HIGH-ENTROPY ULTRA-SMOOTH SCULPTURE — REAL 3D DESIGNER QUALITY */}
      {/* Extremely complex organic torus knot — very high entropy, flowing, sculptural */}
      {/* MASSIVE segment count (1100 radial / 128 tubular) for silky-smooth, professional mesh like a real sculptor */}
      <mesh>
        <torusKnotGeometry args={[1.05, 0.42, 1100, 128, 2, 7]} />
        <meshPhongMaterial
          color="#ff6a3d"
          emissive="#1c1914"
          shininess={82}
          specular="#f4f1ea"
          flatShading={false}
        />
      </mesh>

      {/* Second intersecting high-entropy form for complexity (real designer layering) */}
      <mesh position={[0.6, -0.3, 0.4]} rotation={[0.8, 1.6, 0.3]}>
        <torusKnotGeometry args={[0.68, 0.29, 180, 24, 3, 5]} />
        <meshPhongMaterial
          color="#c08532"
          emissive="#1c1914"
          shininess={62}
          specular="#f4f1ea"
          transparent
          opacity={0.85}
          flatShading={false}
        />
      </mesh>

      {/* Ultra-smooth high-poly organic core */}
      <group ref={core}>
        <mesh position={[0, 1.12, 0]}>
          <sphereGeometry args={[0.81, 80, 64]} />
          <meshPhongMaterial
            color="#f4f1ea"
            shininess={125}
            specular="#ff4d17"
            flatShading={false}
          />
        </mesh>
      </group>

      {/* Large elegant smooth floating ring */}
      <group ref={ring}>
        <mesh position={[0, 0.1, 0]} rotation={[1.6, 0, 0]}>
          <torusGeometry args={[2.42, 0.016, 22, 148]} />
          <meshPhongMaterial color="#c08532" transparent opacity={0.52} flatShading={false} />
        </mesh>
      </group>

      {/* Smooth high-quality orbiting accent */}
      <group ref={accent}>
        <mesh position={[2.55, 0.48, 0]}>
          <sphereGeometry args={[0.33, 52, 40]} />
          <meshPhongMaterial color="#ff6a3d" shininess={140} flatShading={false} />
        </mesh>
      </group>

      {/* Inner smooth ring for depth */}
      <group ref={innerRing}>
        <mesh position={[0, 0.62, 0]} rotation={[0.9, 0, 0]}>
          <torusGeometry args={[0.99, 0.01, 16, 96]} />
          <meshPhongMaterial color="#f4f1ea" transparent opacity={0.32} flatShading={false} />
        </mesh>
      </group>

      {/* Secondary complex smooth layer */}
      <group ref={secondary}>
        <mesh position={[0, -0.9, 0]} rotation={[0.55, 1.15, 0]}>
          <torusGeometry args={[2.0, 0.009, 14, 112]} />
          <meshPhongMaterial color="#f4f1ea" transparent opacity={0.19} flatShading={false} />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[1.05, 0.45, 0]}>
          <torusGeometry args={[1.68, 0.007, 12, 98]} />
          <meshPhongMaterial color="#c08532" transparent opacity={0.14} flatShading={false} />
        </mesh>
      </group>

      {/* Ground plane */}
      <mesh position={[0, -2.75, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshPhongMaterial color="#3a362d" shininess={0} transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export function CinematicSculpture() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <div 
      className="relative w-full h-[580px] md:h-[680px] rounded-3xl overflow-hidden bg-[#100e0a] cursor-grab active:cursor-grabbing"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMouse({ x: x * 0.75, y: y * 0.75 });
      }}
      onPointerLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0.1, 8.6], fov: 29 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          preserveDrawingBuffer: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.28} color="#f4f1ea" />
        <directionalLight position={[5, 13, -8]} intensity={1.55} color="#ff6a3d" />
        <directionalLight position={[-11, 2, 10]} intensity={0.38} color="#f4f1ea" />
        <Sculpture mouse={mouse} />
      </Canvas>

      {/* Heavy cinematic film overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/75" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-[length:2.5px_2.5px]" />

      <div className="absolute bottom-11 left-11 text-canvas pointer-events-none">
        <div className="font-mono text-[10px] tracking-[4.5px] text-spark/70">SCULPTURE 01 — DRAG ANYWHERE</div>
        <div className="font-display text-[42px] tracking-[-1.8px] mt-1 leading-none">Form follows certainty.</div>
      </div>
      <div className="absolute top-10 right-10 font-mono text-[10px] tracking-[3px] text-spark/40 pointer-events-none">INTERACTIVE 3D</div>
    </div>
  );
}
