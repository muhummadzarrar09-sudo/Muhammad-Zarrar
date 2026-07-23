"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

/**
 * Scroll-reactive 3D sculpture — FULLY CINEMATIC.
 * Reacts to actual page scroll position with deliberate, weighted, premium motion.
 * Mouse tilt + scroll drive together.
 * Multiple layered forms representing certainty / systems.
 */
function ReactiveSculpture({ scrollProgress, mouse }: { scrollProgress: number; mouse: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Group>(null!);
  const ring = useRef<THREE.Group>(null!);
  const accent = useRef<THREE.Group>(null!);
  const secondary = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.005; // extremely slow — scroll is 100% the driver
    const p = Math.max(0, Math.min(1, scrollProgress));

    // 🔥 ULTRA-IMMERSIVE SCROLL SENSITIVITY — MAXIMUM CINEMATIC "WOW"
    // Scrolling now feels like you're physically orbiting, circling, leaning over,
    // and walking toward a giant real sculpture in a dark cinematic space.
    // These multipliers are deliberately very high for addictive immersion.
    const scrollOrbit = p * 58;         // MASSIVE full 360° orbits (you circle it)
    const scrollTilt = p * 34;          // extreme dramatic lean/tilt
    const scrollRoll = p * 16;          // powerful cinematic roll
    const scrollScale = 1 + p * 2.4;    // huge breathing + getting closer (dolly)
    const scrollLift = p * -19;         // powerful vertical rise/fall
    const scrollDolly = p * 16;         // strong push toward the viewer
    const scrollSway = p * 9;           // lateral movement

    if (group.current) {
      // MAIN BODY — EXTREMELY responsive, feels like a real heavy physical object
      group.current.rotation.y = t * 0.03 + scrollOrbit + mouse.x * 0.28;
      group.current.rotation.x = Math.sin(t * 0.015) * 0.006 + scrollTilt + mouse.y * 0.14;
      group.current.rotation.z = scrollRoll * 1.4;
      group.current.scale.setScalar(scrollScale);
      group.current.position.y = scrollLift;
      group.current.position.z = scrollDolly;
      group.current.position.x = scrollSway;
    }
    if (core.current) {
      // CORE — strong counter-parallax (the heart feels alive and separate)
      core.current.rotation.y = -t * 0.35 + scrollOrbit * -8.5 + mouse.x * -0.07;
      core.current.rotation.x = Math.sin(t * 0.025) * 0.014 + scrollTilt * 3.8;
      core.current.position.y = scrollLift * 2.1;
      core.current.position.z = scrollDolly * 1.05;
    }
    if (ring.current) {
      // RING — spins and leans like the scroll is physically turning the entire form
      ring.current.rotation.z = t * 0.009 + scrollOrbit * 7.2;
      ring.current.rotation.x = scrollTilt * 3.2;
    }
    if (accent.current) {
      // ACCENT — flies with intense scroll-driven energy
      accent.current.rotation.y = t * 0.48 + scrollOrbit * 14 + mouse.x * 0.38;
    }
    if (secondary.current) {
      // SECONDARY LAYER — deep, independent, very immersive motion
      secondary.current.rotation.y = t * 0.08 + scrollOrbit * 6.5;
      secondary.current.position.y = scrollLift * 1.8;
      secondary.current.position.z = scrollDolly * 1.9;
      secondary.current.position.x = scrollSway * 1.6;
    }
  });

  return (
    <group ref={group}>
      {/* HIGH-ENTROPY ULTRA-SMOOTH ORGANIC FORM — REAL 3D DESIGNER QUALITY */}
      {/* Extremely complex torus knot — high entropy, flowing, sculptural */}
      {/* MASSIVE segment count (820 radial / 96 tubular) for silky smooth professional mesh */}
      <mesh>
        <torusKnotGeometry args={[1.12, 0.36, 820, 96, 2, 5]} />
        <meshPhongMaterial
          color="#ff6a3d"
          emissive="#1c1914"
          shininess={72}
          specular="#f4f1ea"
          flatShading={false}
        />
      </mesh>

      {/* Ultra-smooth high-poly core sphere */}
      <group ref={core}>
        <mesh position={[0, 1.22, 0]}>
          <sphereGeometry args={[0.79, 72, 56]} />
          <meshPhongMaterial
            color="#f4f1ea"
            shininess={118}
            specular="#ff4d17"
            flatShading={false}
          />
        </mesh>
      </group>

      {/* Elegant floating ring — very smooth */}
      <group ref={ring}>
        <mesh position={[0, 0.15, 0]} rotation={[1.65, 0, 0]}>
          <torusGeometry args={[2.42, 0.014, 16, 136]} />
          <meshPhongMaterial color="#c08532" transparent opacity={0.58} flatShading={false} />
        </mesh>
      </group>

      {/* Smooth orbiting accent sphere */}
      <group ref={accent}>
        <mesh position={[2.52, 0.5, 0]}>
          <sphereGeometry args={[0.29, 48, 36]} />
          <meshPhongMaterial color="#ff6a3d" shininess={145} flatShading={false} />
        </mesh>
      </group>

      {/* Secondary smooth architectural layer */}
      <group ref={secondary}>
        <mesh position={[0, -0.78, 0]} rotation={[0.5, 0.9, 0]}>
          <torusGeometry args={[1.88, 0.007, 12, 98]} />
          <meshPhongMaterial color="#f4f1ea" transparent opacity={0.19} flatShading={false} />
        </mesh>
      </group>

      {/* Ground plane */}
      <mesh position={[0, -2.85, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[11, 11]} />
        <meshPhongMaterial color="#3a362d" transparent opacity={0.45} />
      </mesh>

      {/* Subtle additional smooth planes for depth */}
      <mesh position={[0, -1.6, 2.1]} rotation={[0.4, 0.8, 0]}>
        <planeGeometry args={[3.2, 1.8]} />
        <meshPhongMaterial color="#f4f1ea" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function ScrollReactiveSculpture() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();

  // Real-time sync to actual scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div
      className="relative w-full h-[460px] md:h-[520px] rounded-3xl overflow-hidden bg-[#0f0d09] cursor-grab active:cursor-grabbing"
      style={{ perspective: "1400px" }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMouse({ x: x * 0.8, y: y * 0.8 });
      }}
      onPointerLeave={() => setMouse({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0.35, 8.2], fov: 31 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.32} color="#f4f1ea" />
        <directionalLight position={[5, 14, -7]} intensity={1.45} color="#ff6a3d" />
        <directionalLight position={[-12, 3, 9]} intensity={0.42} color="#f4f1ea" />
        <ReactiveSculpture scrollProgress={scrollProgress} mouse={mouse} />
      </Canvas>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/12 via-transparent to-black/78" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[length:2.8px_2.8px]" />

      <div className="absolute bottom-9 left-9 text-canvas pointer-events-none">
        <div className="font-mono text-[10px] tracking-[4.8px] text-spark/70">SCULPTURE 02 — SCROLL + DRAG</div>
        <div className="font-display text-[36px] tracking-[-1.6px] mt-1 leading-none">The form moves with you.</div>
      </div>
      <div className="absolute top-9 right-9 font-mono text-[10px] tracking-[3px] text-spark/45 pointer-events-none">SCROLL-DRIVEN 3D</div>
    </div>
  );
}
