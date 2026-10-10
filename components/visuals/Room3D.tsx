"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { palette, type RoomFeatures } from "@/lib/room";

const W = 6;
const D = 5;
const H = 3;

/* Перевод координат из «плана» (x вправо, y вглубь, z вверх) в three.js */
const p = (x: number, y: number, z: number): [number, number, number] => [x - W / 2, z, y - D / 2];

const damp = THREE.MathUtils.damp;

/** Объект плавно «вырастает» из точки pivot (дети — в абсолютных координатах сцены) */
function Appear({ show, children, from = [0, 0, 0] }: { show: boolean; children: React.ReactNode; from?: [number, number, number] }) {
  const back: [number, number, number] = [-from[0], -from[1], -from[2]];
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const s = damp(g.scale.x, show ? 1 : 0.0001, 5, dt);
    g.scale.setScalar(s);
    g.visible = s > 0.002;
  });
  return (
    <group position={from}>
      <group ref={ref} scale={0.0001}>
        <group position={back}>{children}</group>
      </group>
    </group>
  );
}

function Block({
  at, size, color, cast = true, emissive, emissiveIntensity = 0,
}: {
  at: [number, number, number]; size: [number, number, number]; color: string; cast?: boolean; emissive?: string; emissiveIntensity?: number;
}) {
  // at — угол блока в координатах плана, size — [w, d, h]
  const [w, d, h] = size;
  const pos = p(at[0] + w / 2, at[1] + d / 2, at[2] + h / 2);
  return (
    <mesh position={pos} castShadow={cast} receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={color} roughness={0.85} emissive={emissive ?? "#000"} emissiveIntensity={emissiveIntensity} />
    </mesh>
  );
}

function Shell({ f }: { f: RoomFeatures }) {
  const wallBack = useRef<THREE.MeshStandardMaterial>(null);
  const wallSide = useRef<THREE.MeshStandardMaterial>(null);
  const floor = useRef<THREE.MeshStandardMaterial>(null);
  const targets = useRef({ back: new THREE.Color(), side: new THREE.Color(), floor: new THREE.Color(), glow: 0 });

  useEffect(() => {
    targets.current.back.set(palette.wall[f.level]);
    targets.current.side.set(palette.wallSide[f.level]);
    targets.current.floor.set(palette.floor[f.level]);
    targets.current.glow = f.warmFloor ? 0.22 : 0;
  }, [f.level, f.warmFloor]);

  useFrame((_, dt) => {
    const t = targets.current;
    const k = 1 - Math.exp(-4 * dt);
    wallBack.current?.color.lerp(t.back, k);
    wallSide.current?.color.lerp(t.side, k);
    if (floor.current) {
      floor.current.color.lerp(t.floor, k);
      floor.current.emissiveIntensity = damp(floor.current.emissiveIntensity, t.glow, 3, dt);
    }
  });

  return (
    <group>
      <mesh position={p(W / 2, D / 2, -0.1)} receiveShadow>
        <boxGeometry args={[W, 0.2, D]} />
        <meshStandardMaterial ref={floor} color={palette.concrete} roughness={0.7} emissive="#d88b69" emissiveIntensity={0} />
      </mesh>
      <mesh position={p(W / 2, -0.1, H / 2)} receiveShadow>
        <boxGeometry args={[W + 0.4, H, 0.2]} />
        <meshStandardMaterial ref={wallBack} color={palette.concrete} roughness={0.95} />
      </mesh>
      <mesh position={p(-0.1, D / 2, H / 2)} receiveShadow>
        <boxGeometry args={[0.2, H, D]} />
        <meshStandardMaterial ref={wallSide} color={palette.concrete} roughness={0.95} />
      </mesh>
    </group>
  );
}

function Pendant({ show }: { show: boolean }) {
  const light = useRef<THREE.PointLight>(null);
  useFrame((_, dt) => {
    if (light.current) light.current.intensity = damp(light.current.intensity, show ? 3 : 0, 3, dt);
  });
  return (
    <>
      <Appear show={show} from={p(3, 2.2, H)}>
        <mesh position={p(3, 2.2, H - 0.45)}>
          <cylinderGeometry args={[0.008, 0.008, 0.9]} />
          <meshStandardMaterial color="#2e2b27" />
        </mesh>
        <mesh position={p(3, 2.2, H - 1)}>
          <sphereGeometry args={[0.2, 32, 16]} />
          <meshStandardMaterial color="#fff3df" emissive="#ffd9a0" emissiveIntensity={1.4} />
        </mesh>
      </Appear>
      <pointLight ref={light} position={p(3, 2.2, H - 1.2)} color="#ffd29a" intensity={0} distance={6} decay={1.6} />
    </>
  );
}

function Furniture({ f }: { f: RoomFeatures }) {
  return (
    <>
      <Appear show={f.baseboard}>
        <Block at={[0, 0, 0]} size={[W, 0.04, 0.12]} color="#faf7f1" cast={false} />
        <Block at={[0, 0, 0]} size={[0.04, D, 0.12]} color="#faf7f1" cast={false} />
      </Appear>

      <Appear show={f.sofa} from={p(2.7, 1, 0)}>
        <Block at={[1.2, 0.5, 0]} size={[3, 1, 0.45]} color="#8c857b" />
        <Block at={[1.2, 0.3, 0]} size={[3, 0.3, 0.95]} color="#958e84" />
        <Block at={[1.5, 0.62, 0.45]} size={[0.6, 0.22, 0.4]} color="#d9cbb4" />
        <Block at={[3.3, 0.62, 0.45]} size={[0.6, 0.22, 0.4]} color="#d88b69" />
      </Appear>

      <Appear show={f.floorLamp} from={p(4.8, 0.6, 0)}>
        <Block at={[4.76, 0.56, 0]} size={[0.08, 0.08, 1.7]} color="#2e2b27" />
          <mesh position={p(4.8, 0.6, 1.85)} castShadow>
            <cylinderGeometry args={[0.18, 0.26, 0.32, 32, 1, true]} />
            <meshStandardMaterial color="#fff3e0" emissive="#ffdcae" emissiveIntensity={0.6} side={THREE.DoubleSide} />
          </mesh>
      </Appear>

      <Appear show={f.window}>
        <Block at={[2.2, 0.01, 1.1]} size={[2.4, 0.06, 1.5]} color="#2e2b27" cast={false} />
        <Block at={[2.3, 0.05, 1.2]} size={[2.2, 0.03, 1.3]} color="#cfe0df" cast={false} emissive="#e8f1ee" emissiveIntensity={0.5} />
        <Block at={[3.37, 0.06, 1.2]} size={[0.06, 0.04, 1.3]} color="#2e2b27" cast={false} />
      </Appear>

      <Appear show={f.rug}>
        <Block at={[1.4, 1.5, 0]} size={[3.2, 2.4, 0.02]} color="#f3eee5" cast={false} />
      </Appear>

      <Appear show={f.shelf}>
        <Block at={[0.01, 0.4, 1.7]} size={[0.35, 1.2, 0.05]} color="#6b4e32" />
        <Block at={[0.05, 0.55, 1.75]} size={[0.2, 0.2, 0.32]} color="#a94e34" />
        <Block at={[0.05, 1.0, 1.75]} size={[0.22, 0.3, 0.18]} color="#cbbba2" />
      </Appear>

      <Appear show={f.slats}>
        {Array.from({ length: 10 }, (_, i) => (
          <Block key={i} at={[0.01, 2.0 + i * 0.28, 0.12]} size={[0.08, 0.14, H - 0.12]} color="#a94e34" />
        ))}
      </Appear>

      <Appear show={f.table} from={p(3, 2.65, 0)}>
        <mesh position={p(3, 2.65, 0.36)} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 0.06, 48]} />
          <meshStandardMaterial color="#3a342e" roughness={0.5} />
        </mesh>
        <mesh position={p(3, 2.65, 0.17)} castShadow>
          <cylinderGeometry args={[0.12, 0.2, 0.34, 24]} />
          <meshStandardMaterial color="#2e2b27" />
        </mesh>
      </Appear>

      <Appear show={f.art}>
        <Block at={[4.9, 0.01, 1.3]} size={[0.85, 0.05, 1.05]} color="#2e2b27" cast={false} />
        <Block at={[4.97, 0.04, 1.37]} size={[0.71, 0.03, 0.91]} color="#d88b69" cast={false} />
      </Appear>

      <Appear show={f.plant} from={p(5.25, 3.9, 0)}>
        <mesh position={p(5.25, 3.9, 0.25)} castShadow>
          <cylinderGeometry args={[0.24, 0.2, 0.5, 24]} />
          <meshStandardMaterial color="#cbbba2" />
        </mesh>
        <mesh position={p(5.25, 3.9, 0.85)} castShadow>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#6c7a55" flatShading roughness={0.9} />
        </mesh>
        <mesh position={p(5.1, 4.0, 1.2)} castShadow>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial color="#7d8b63" flatShading roughness={0.9} />
        </mesh>
      </Appear>

      <Appear show={f.acoustic}>
        {[0.5, 1.15].map((x) => (
          <Block key={x} at={[x, 0.01, 1.2]} size={[0.55, 0.08, 1.2]} color="#cbbba2" cast={false} />
        ))}
      </Appear>

      <Appear show={f.ac}>
        <Block at={[0.01, 3.6, 2.4]} size={[0.3, 1.1, 0.35]} color="#ffffff" />
      </Appear>

      <Appear show={f.smart}>
        <Block at={[5.3, 0.01, 1.0]} size={[0.3, 0.04, 0.36]} color="#22201d" cast={false} emissive="#d88b69" emissiveIntensity={0.35} />
      </Appear>

      <Pendant show={f.pendant} />
    </>
  );
}

/** Подгоняет зум ортокамеры под размер контейнера и плавно наклоняет сцену за курсором */
function Rig({ children, onLowFps }: { children: React.ReactNode; onLowFps: () => void }) {
  const group = useRef<THREE.Group>(null);
  const perf = useRef({ t: 0, frames: 0, done: false });

  useFrame((state, dt) => {
    const cam = state.camera as THREE.OrthographicCamera;
    const zoom = Math.min(state.size.width / 11.5, state.size.height / 8.4);
    if (Math.abs(cam.zoom - zoom) > 0.01) {
      cam.zoom = zoom;
      cam.updateProjectionMatrix();
    }
    const g = group.current;
    if (g) {
      const idle = Math.sin(state.clock.elapsedTime * 0.25) * 0.04;
      g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.14 + idle, 2.5, dt);
      g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.04, 2.5, dt);
    }
    // Простейший монитор производительности: если первые 3 секунды < 38 fps — уходим на SVG
    const m = perf.current;
    if (!m.done) {
      m.t += dt;
      m.frames += 1;
      if (m.t > 3) {
        m.done = true;
        if (m.frames / m.t < 38) onLowFps();
      }
    }
  });

  return <group ref={group}>{children}</group>;
}

export default function Room3D({ f, onLowFps }: { f: RoomFeatures; onLowFps: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        orthographic
        shadows="percentage"
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [10, 8.2, 10], near: 0.1, far: 100, zoom: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, 1.05, 0)}
      >
        <ambientLight intensity={0.7} color="#fff6ea" />
        <hemisphereLight args={["#fff6ea", "#8a7b6a", 0.6]} />
        <directionalLight
          position={[6, 10, 7]}
          intensity={1.7}
          color="#fff0dc"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0005}
        />
        <Rig onLowFps={onLowFps}>
          <Shell f={f} />
          <Furniture f={f} />
        </Rig>
      </Canvas>
    </div>
  );
}
