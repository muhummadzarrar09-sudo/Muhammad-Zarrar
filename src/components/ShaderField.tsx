import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Plane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.x * 0.2, mouse.y * 0.2),
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.2, 2.2, 1]}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          // tiny noise
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
          float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i+vec2(1.0,0.0));
            float c = hash(i+vec2(0.0,1.0));
            float d = hash(i+vec2(1.0,1.0));
            vec2 u = f*f*(3.0-2.0*f);
            return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }
          void main(){
            vec2 uv = vUv;
            float t = uTime * 0.07;
            // subtle fluid warp
            uv.x += sin(uv.y*2.5 + t)*0.07 + uMouse.x*0.06;
            uv.y += cos(uv.x*2.0 - t)*0.06 + uMouse.y*0.06;
            float n = noise(uv*2.8 + t);
            float d = length(uv-0.5);
            vec3 cCanvas = vec3(0.956,0.945,0.917);
            vec3 cSpark = vec3(1.0,0.30,0.09);
            vec3 cCircuit = vec3(0.11,0.36,0.31);
            // ultra subtle blends — Fable restraint 0.08
            float m1 = smoothstep(0.3,0.9, sin(d*3.2 + t*0.6 + n*0.6)*0.5+0.5);
            float m2 = smoothstep(0.4,0.9, cos(d*2.8 - t*0.5 + n*0.4)*0.5+0.5);
            vec3 col = cCanvas;
            col = mix(col, cSpark, m1*0.10);
            col = mix(col, cCircuit, m2*0.06);
            // vignette
            col *= 1.0 - d*0.22;
            // grain via noise
            col += (hash(vUv*800.0)-0.5)*0.018;
            gl_FragColor = vec4(col,1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function ShaderField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Plane />
      </Canvas>
      <div className="absolute inset-0 bg-canvas/10 mix-blend-multiply pointer-events-none" />
    </div>
  );
}
