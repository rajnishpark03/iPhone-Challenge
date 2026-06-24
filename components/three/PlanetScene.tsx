"use client";

/**
 * Real 3D planets rendered with react-three-fiber.
 *
 * Each world is an actual lit sphere — a single "sun" (directional light) gives
 * it a real day/night terminator — wrapped in a procedurally generated surface
 * texture (no external image assets, no hydration cost). We build:
 *   • a banded gas giant with a real, tilted ring system
 *   • an Earth-like world with oceans, land and ice caps
 *   • a rusty Mars-like world with polar caps
 *   • a large, prominent cratered moon
 * Each gets a soft atmospheric halo. The whole field sits behind the page,
 * ignores pointer events, and rotates slowly for life.
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";

/* ---------------------------------------------------------------- noise --- */
// Value-noise fbm that is *seamless* across longitude (u wraps 0↔1) so a
// rotating planet shows no visible seam.
function createNoise(seed: number) {
  const hash = (xi: number, yi: number, period: number) => {
    const x = ((xi % period) + period) % period;
    let h = (x * 374761393 + yi * 668265263 + seed * 6360631) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  return (u: number, v: number, octaves = 5, basePeriod = 6) => {
    let amp = 0.5;
    let sum = 0;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      const period = basePeriod * (1 << o);
      const x = u * period;
      const y = v * period * 0.5;
      const xi = Math.floor(x);
      const yi = Math.floor(y);
      const xf = smooth(x - xi);
      const yf = smooth(y - yi);
      const v00 = hash(xi, yi, period);
      const v10 = hash(xi + 1, yi, period);
      const v01 = hash(xi, yi + 1, period);
      const v11 = hash(xi + 1, yi + 1, period);
      const top = lerp(v00, v10, xf);
      const bot = lerp(v01, v11, xf);
      sum += amp * lerp(top, bot, yf);
      norm += amp;
      amp *= 0.5;
    }
    return sum / norm;
  };
}

/* ------------------------------------------------------------- painting --- */
type RGB = [number, number, number];
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smoothstep = (a: number, b: number, t: number) => {
  const x = clamp01((t - a) / (b - a));
  return x * x * (3 - 2 * x);
};
const mix = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
function ramp(stops: { t: number; c: RGB }[], t: number): RGB {
  if (t <= stops[0].t) return stops[0].c;
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i].t) {
      const a = stops[i - 1];
      const b = stops[i];
      return mix(a.c, b.c, (t - a.t) / (b.t - a.t));
    }
  }
  return stops[stops.length - 1].c;
}

function paint(
  w: number,
  h: number,
  fn: (u: number, v: number) => RGB
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const [r, g, b] = fn(x / w, v);
      const i = (y * w + x) * 4;
      d[i] = r;
      d[i + 1] = g;
      d[i + 2] = b;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/* ------------------------------------------------------------- textures --- */
function gasGiantTexture(seed: number): THREE.CanvasTexture {
  const n = createNoise(seed);
  const bands: { t: number; c: RGB }[] = [
    { t: 0.0, c: [236, 224, 188] },
    { t: 0.18, c: [206, 178, 132] },
    { t: 0.32, c: [232, 214, 170] },
    { t: 0.45, c: [184, 150, 108] },
    { t: 0.58, c: [228, 208, 162] },
    { t: 0.72, c: [198, 166, 120] },
    { t: 0.86, c: [234, 220, 182] },
    { t: 1.0, c: [210, 184, 140] },
  ];
  return paint(512, 256, (u, v) => {
    const warp = (n(u, v, 4, 5) - 0.5) * 0.06;
    const stripe = 0.5 + 0.5 * Math.sin((v + warp) * Math.PI * 16);
    let c = ramp(bands, clamp01(v + warp));
    c = mix(c, ramp(bands, clamp01(v + warp + 0.04)), stripe * 0.5);
    const detail = 0.92 + 0.08 * n(u, v, 6, 40);
    return [c[0] * detail, c[1] * detail, c[2] * detail];
  });
}

function earthTexture(seed: number): THREE.CanvasTexture {
  const n = createNoise(seed);
  const ocean: { t: number; c: RGB }[] = [
    { t: 0.0, c: [8, 28, 66] },
    { t: 0.7, c: [16, 52, 104] },
    { t: 1.0, c: [30, 86, 140] },
  ];
  const land: { t: number; c: RGB }[] = [
    { t: 0.0, c: [38, 92, 48] },
    { t: 0.45, c: [70, 110, 54] },
    { t: 0.7, c: [128, 116, 72] },
    { t: 1.0, c: [156, 140, 104] },
  ];
  return paint(512, 256, (u, v) => {
    const e = n(u, v, 6, 5);
    const lat = Math.abs(v - 0.5) * 2;
    const sea = 0.5;
    let c: RGB;
    if (e < sea) {
      c = ramp(ocean, e / sea);
    } else {
      c = ramp(land, (e - sea) / (1 - sea));
      c = mix(c, [236, 240, 245], smoothstep(0.78, 0.92, e) * 0.8);
    }
    c = mix(c, [238, 242, 248], smoothstep(0.82, 0.96, lat));
    return c;
  });
}

function marsTexture(seed: number): THREE.CanvasTexture {
  const n = createNoise(seed);
  const surf: { t: number; c: RGB }[] = [
    { t: 0.0, c: [92, 38, 22] },
    { t: 0.4, c: [150, 72, 38] },
    { t: 0.7, c: [188, 104, 58] },
    { t: 1.0, c: [214, 150, 102] },
  ];
  return paint(512, 256, (u, v) => {
    const e = n(u, v, 6, 6);
    const lat = Math.abs(v - 0.5) * 2;
    let c = ramp(surf, e);
    c = mix(c, [120, 54, 30], smoothstep(0.55, 0.2, e) * 0.3);
    c = mix(c, [232, 224, 214], smoothstep(0.86, 0.98, lat));
    return c;
  });
}

function moonTexture(seed: number): THREE.CanvasTexture {
  const n = createNoise(seed);
  const surf: { t: number; c: RGB }[] = [
    { t: 0.0, c: [70, 70, 78] },
    { t: 0.5, c: [128, 128, 138] },
    { t: 1.0, c: [186, 186, 196] },
  ];
  return paint(512, 256, (u, v) => {
    const e = n(u, v, 6, 6);
    let c = ramp(surf, e);
    const maria = smoothstep(0.42, 0.3, n(u, v, 3, 4));
    c = mix(c, [58, 58, 66], maria * 0.7);
    return c;
  });
}

// grayscale relief used as a bump map for rocky worlds
function bumpTexture(seed: number, octaves = 6, period = 6): THREE.CanvasTexture {
  const n = createNoise(seed);
  const tex = paint(256, 128, (u, v) => {
    const e = n(u, v, octaves, period) * 255;
    return [e, e, e];
  });
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

// Saturn-style ring band: a 1-D gradient sampled radially by the ring mesh.
function ringTexture(): THREE.CanvasTexture {
  const n = createNoise(7);
  const w = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = 4;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(w, 4);
  const d = img.data;
  for (let x = 0; x < w; x++) {
    const t = x / w;
    let a = 0.55 + 0.45 * Math.sin(t * 90) * 0.6 + 0.25 * (n(t, 0.5, 5, 24) - 0.5);
    a = clamp01(a);
    if (t > 0.46 && t < 0.52) a *= 0.1;
    if (t > 0.7 && t < 0.73) a *= 0.2;
    a *= smoothstep(0.0, 0.06, t) * smoothstep(1.0, 0.9, t);
    const shade = 0.8 + 0.2 * n(t, 0.2, 4, 16);
    const col: RGB = [222 * shade, 206 * shade, 168 * shade];
    for (let y = 0; y < 4; y++) {
      const i = (y * w + x) * 4;
      d[i] = col[0];
      d[i + 1] = col[1];
      d[i + 2] = col[2];
      d[i + 3] = a * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// soft radial glow sprite for the atmosphere halo
function glowTexture(): THREE.CanvasTexture {
  const s = 128;
  const canvas = document.createElement("canvas");
  canvas.width = s;
  canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(0.75, "rgba(255,255,255,0.06)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* --------------------------------------------------------- ring geometry --- */
// RingGeometry's default UVs are box-projected; remap so u runs radially,
// letting the 1-D ring texture form concentric bands.
function makeRingGeometry(inner: number, outer: number) {
  const geo = new THREE.RingGeometry(inner, outer, 160, 1);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const r = v.length();
    uv.setXY(i, (r - inner) / (outer - inner), 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

// shared glow texture (built once, lazily, on the client)
let GLOW: THREE.Texture | null = null;

/* ------------------------------------------------------------- a planet --- */
type Satellite = {
  dist?: number; // orbit radius as multiple of planet radius
  size?: number; // satellite radius as multiple of planet radius
  speed?: number;
  color?: string;
  tilt?: number;
  craft?: boolean; // true = realistic man-made satellite, false = small moon
};

type PlanetProps = {
  position: [number, number, number];
  radius: number;
  map: THREE.Texture;
  bump?: THREE.Texture;
  bumpScale?: number;
  tilt?: number;
  spin?: number;
  glow: string;
  glowOpacity?: number;
  ring?: { tex: THREE.Texture; inner: number; outer: number };
  bobAmp?: number; // vertical sway amplitude
  bobSpeed?: number;
  phase?: number;
  satellite?: Satellite;
};

/* a small, realistic man-made satellite: foil-wrapped body + solar panels + dish */
function SatelliteMesh({ scale = 0.1 }: { scale?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.5;
  });
  return (
    <group ref={g} scale={scale}>
      {/* body */}
      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.82]} />
        <meshStandardMaterial color="#cfd3db" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* gold-foil accent */}
      <mesh>
        <boxGeometry args={[0.58, 0.42, 0.5]} />
        <meshStandardMaterial color="#d8b25a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* solar panels */}
      <mesh position={[1.05, 0, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.62]} />
        <meshStandardMaterial
          color="#163a6b"
          metalness={0.4}
          roughness={0.5}
          emissive="#0e2550"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[-1.05, 0, 0]}>
        <boxGeometry args={[1.3, 0.04, 0.62]} />
        <meshStandardMaterial
          color="#163a6b"
          metalness={0.4}
          roughness={0.5}
          emissive="#0e2550"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* struts */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.42, 0.05, 0.05]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.42, 0.05, 0.05]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* dish antenna */}
      <mesh position={[0, 0.44, 0.12]} rotation={[Math.PI / 2.6, 0, 0]}>
        <coneGeometry args={[0.22, 0.16, 14, 1, true]} />
        <meshStandardMaterial
          color="#e8e8ee"
          metalness={0.3}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Planet({
  position,
  radius,
  map,
  bump,
  bumpScale = 0.04,
  tilt = 0.4,
  spin = 0.02,
  glow,
  glowOpacity = 0.45,
  ring,
  bobAmp = 0.2,
  bobSpeed = 0.5,
  phase = 0,
  satellite,
}: PlanetProps) {
  const root = useRef<THREE.Group>(null);
  const surface = useRef<THREE.Mesh>(null);
  const satOrbit = useRef<THREE.Group>(null);
  const ringGeo = useMemo(
    () => (ring ? makeRingGeometry(radius * ring.inner, radius * ring.outer) : null),
    [ring, radius]
  );
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    if (surface.current) surface.current.rotation.y += spin * dt;
    // gentle up/down sway only
    if (root.current) root.current.position.y = position[1] + Math.sin(t * bobSpeed + phase) * bobAmp;
    if (satOrbit.current) satOrbit.current.rotation.y = t * (satellite?.speed ?? 0.6);
  });
  return (
    <group ref={root} position={position} rotation={[tilt, 0, 0.18]}>
      <mesh ref={surface}>
        <sphereGeometry args={[radius, 64, 48]} />
        <meshStandardMaterial
          map={map}
          bumpMap={bump}
          bumpScale={bump ? bumpScale : 0}
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      {ring && ringGeo && (
        <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            map={ring.tex}
            side={THREE.DoubleSide}
            transparent
            roughness={1}
            metalness={0}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* orbiting satellite — realistic craft or small moon */}
      {satellite && (
        <group ref={satOrbit} rotation={[satellite.tilt ?? 0.5, 0, 0]}>
          {satellite.craft ? (
            <group position={[radius * (satellite.dist ?? 1.9), 0, 0]}>
              <SatelliteMesh scale={radius * (satellite.size ?? 0.09)} />
            </group>
          ) : (
            <mesh position={[radius * (satellite.dist ?? 1.9), 0, 0]}>
              <sphereGeometry args={[radius * (satellite.size ?? 0.06), 18, 18]} />
              <meshStandardMaterial
                color={satellite.color ?? "#cdd2dc"}
                roughness={0.85}
                metalness={0.1}
              />
            </mesh>
          )}
        </group>
      )}

      {/* atmospheric halo */}
      <sprite scale={[radius * 4.4, radius * 4.4, 1]}>
        <spriteMaterial
          map={GLOW ?? undefined}
          color={glow}
          transparent
          opacity={glowOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  );
}

/* --------------------------------------------------------------- scene --- */
function Worlds({ scale }: { scale: number }) {
  const tex = useMemo(() => {
    GLOW = glowTexture();
    return {
      saturn: gasGiantTexture(11),
      saturnBump: bumpTexture(11, 4, 6),
      earth: earthTexture(23),
      earthBump: bumpTexture(23, 6, 5),
      mars: marsTexture(37),
      marsBump: bumpTexture(37, 6, 6),
      moon: moonTexture(53),
      moonBump: bumpTexture(53, 6, 6),
      ring: ringTexture(),
    };
  }, []);

  return (
    <group scale={scale}>
      {/* ringed gas giant — upper right */}
      <Planet
        position={[5.0, 2.5, -2]}
        radius={1.6}
        map={tex.saturn}
        bump={tex.saturnBump}
        bumpScale={0.015}
        tilt={0.5}
        spin={0.03}
        glow="#e8d6a8"
        glowOpacity={0.4}
        ring={{ tex: tex.ring, inner: 1.35, outer: 2.35 }}
        bobAmp={0.1}
        bobSpeed={0.42}
        phase={0}
        satellite={{ dist: 2.7, size: 0.045, speed: 0.6, color: "#d8d2c4", tilt: 0.4 }}
      />
      {/* large, prominent moon — upper left (the reference's hero body) */}
      <Planet
        position={[-4.7, 2.9, -1]}
        radius={1.45}
        map={tex.moon}
        bump={tex.moonBump}
        bumpScale={0.07}
        tilt={0.18}
        spin={0.02}
        glow="#dfe4ee"
        glowOpacity={0.35}
        bobAmp={0.12}
        bobSpeed={0.5}
        phase={1.3}
        satellite={{ dist: 1.85, size: 0.05, speed: 0.55, color: "#bfc4cf", tilt: 0.6 }}
      />
      {/* Earth-like — lower left */}
      <Planet
        position={[-5.2, -2.2, -2]}
        radius={1.0}
        map={tex.earth}
        bump={tex.earthBump}
        bumpScale={0.03}
        tilt={0.41}
        spin={0.05}
        glow="#6fb4ff"
        glowOpacity={0.5}
        bobAmp={0.14}
        bobSpeed={0.6}
        phase={2.1}
        satellite={{ dist: 1.9, size: 0.085, speed: 0.7, craft: true, tilt: 0.5 }}
      />
      {/* Mars-like — lower right, further back */}
      <Planet
        position={[4.4, -2.6, -4]}
        radius={0.7}
        map={tex.mars}
        bump={tex.marsBump}
        bumpScale={0.05}
        tilt={0.35}
        spin={0.05}
        glow="#ff8a4a"
        glowOpacity={0.4}
        bobAmp={0.14}
        bobSpeed={0.7}
        phase={0.6}
        satellite={{ dist: 1.9, size: 0.05, speed: 0.7, color: "#caa089", tilt: 0.45 }}
      />
    </group>
  );
}

export default function PlanetScene() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setScale(mq.matches ? 0.62 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 12], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        {/* the sun + a faint cosmic fill */}
        <ambientLight intensity={0.16} />
        <directionalLight position={[6, 2.5, 4]} intensity={2.4} color="#fff6e8" />
        <directionalLight position={[-6, -1, -3]} intensity={0.18} color="#6d4df2" />
        <Worlds scale={scale} />
      </Suspense>
    </Canvas>
  );
}
