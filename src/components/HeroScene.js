import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import pinkArch from "../assets/hero-scene/pink-arch.webp";
import blueCluster from "../assets/hero-scene/blue-cluster.webp";
import greenArch from "../assets/hero-scene/green-arch.webp";
import orangeTri from "../assets/hero-scene/orange-tri.webp";
import tileCode from "../assets/hero-scene/tile-code.webp";
import tileBraces from "../assets/hero-scene/tile-braces.webp";
import cubeYellow from "../assets/hero-scene/cube-yellow.webp";
import { HeroSkyline } from "./HeroSkyline";
import {
  Birds,
  Clouds,
  Fireflies,
  Moon,
  ShootingStars,
  SkyBurst,
  Sun,
} from "./HeroNightSky";
import { HeroWalkers } from "./HeroWalkers";
import "./HeroScene.css";

/*
  x / y:  centre position in % of the hero.
  w:      width in vw (scaled per breakpoint via --scene-scale).
  idle:   "drift" (slow vertical drift, tiny rotation) or "float" (small cube bob).
  fx/fy:  idle travel for "float" objects, so cubes don't all move the same way.
*/
const LAYERS = {
  distant: {
    speed: 70,
    spread: 20,
    pointer: 8,
    items: [],
  },
  mid: {
    speed: 170,
    spread: 80,
    pointer: 18,
    items: [
      { id: "pink-arch", src: pinkArch, x: 9.5, y: 27, w: 9.8, idle: "drift", dur: 12, delay: 0, tilt: -2 },
      { id: "tile-code", src: tileCode, x: 24, y: 12, w: 5.6, idle: "drift", dur: 10, delay: 1.5, tilt: -6, mobileHidden: true },
      { id: "green-arch", src: greenArch, x: 10, y: 72, w: 9.8, idle: "drift", dur: 13, delay: 4 },
      { id: "blue-cluster", src: blueCluster, x: 89, y: 24, w: 10.5, idle: "drift", dur: 11, delay: 2.5 },
      { id: "tile-braces", src: tileBraces, x: 93, y: 50, w: 6, idle: "drift", dur: 9.5, delay: 6, tilt: 5, mobileHidden: true },
      { id: "orange-tri", src: orangeTri, x: 89, y: 74, w: 10.5, idle: "drift", dur: 14, delay: 1 },
    ],
  },
  fore: {
    speed: 280,
    spread: 140,
    pointer: 30,
    items: [
      { id: "cube-yellow", src: cubeYellow, x: 21, y: 56, w: 3.4, idle: "float", dur: 9, delay: 3, fx: "8px", fy: "-12px" },
    ],
  },
};

const SceneObject = ({ item, layer, progress, mouseX, mouseY, motionScale }) => {
  const direction = item.x < 50 ? -1 : 1;
  const tilt = item.tilt || 0;

  const x = useTransform([progress, mouseX], ([p, m]) => {
    const spread = p * layer.spread * direction;
    const pointer = m * -layer.pointer;
    return (spread + pointer) * motionScale;
  });
  const y = useTransform([progress, mouseY], ([p, m]) => {
    const rise = p * -layer.speed;
    const pointer = m * -layer.pointer * 0.7;
    return (rise + pointer) * motionScale;
  });
  const rotate = useTransform(
    progress,
    [0, 1],
    [tilt, tilt + direction * 6 * motionScale]
  );

  const className = [
    "scene-object",
    item.mobileHidden && "is-mobile-hidden",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={className}
      style={{ left: `${item.x}%`, top: `${item.y}%`, "--w": item.w, x, y, rotate }}
    >
      <div
        className={`scene-idle scene-idle--${item.idle}`}
        style={{
          "--idle-duration": `${item.dur}s`,
          "--idle-delay": `-${item.delay}s`,
          "--fx": item.fx,
          "--fy": item.fy,
        }}
      >
        <img src={item.src} alt="" draggable="false" decoding="async" />
      </div>
    </motion.div>
  );
};

const SceneLayer = ({ name, progress, mouseX, mouseY, motionScale, children }) => {
  const layer = LAYERS[name];

  return (
    <div className={`scene-layer scene-layer--${name}`}>
      {children}
      {layer.items.map((item) => (
        <SceneObject
          key={item.id}
          item={item}
          layer={layer}
          progress={progress}
          mouseX={mouseX}
          mouseY={mouseY}
          motionScale={motionScale}
        />
      ))}
    </div>
  );
};

const TRAIL_MS = 900;
const TRAIL_SPREAD = 9;

const between = (min, max) => min + Math.random() * (max - min);

/*
  One flight: a cubic Bézier (in fractions of the hero) that enters off-screen on one side,
  swoops through the scene via two random control points, and exits off-screen on the other.
*/
const createFlight = () => {
  const fromLeft = Math.random() < 0.6;
  const startX = fromLeft ? -0.2 : 1.2;
  return {
    p0: { x: startX, y: between(0.15, 0.85) },
    p1: { x: between(0.15, 0.45), y: between(0.05, 0.95) },
    p2: { x: between(0.55, 0.85), y: between(0.05, 0.95) },
    p3: { x: 1 - startX, y: between(0.1, 0.8) },
    mirror: !fromLeft,
    duration: between(9000, 13000),
    pauseAfter: between(2500, 6000),
    wobble: between(0, Math.PI * 2),
  };
};

const bezier = (f, t) => {
  const p1 = f.mirror ? { x: 1 - f.p2.x, y: f.p2.y } : f.p1;
  const p2 = f.mirror ? { x: 1 - f.p1.x, y: f.p1.y } : f.p2;
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * f.p0.x + b * p1.x + c * p2.x + d * f.p3.x,
    y: a * f.p0.y + b * p1.y + c * p2.y + d * f.p3.y,
  };
};

const PaperPlane = ({ reduceMotion }) => {
  const areaRef = useRef(null);
  const trailLeftRef = useRef(null);
  const trailRightRef = useRef(null);
  const gradientRef = useRef(null);
  const planeRef = useRef(null);
  const size = useRef({ w: 0, h: 0, plane: 80 });
  const visible = useRef(true);
  const flight = useRef({ plan: createFlight(), elapsed: 0, history: [] });

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return undefined;

    const resize = new ResizeObserver(([entry]) => {
      size.current = {
        w: entry.contentRect.width,
        h: entry.contentRect.height,
        plane: planeRef.current ? planeRef.current.offsetWidth : 80,
      };
      if (reduceMotion) {
        x.set(size.current.w * 0.2);
        y.set(size.current.h * 0.4);
        rotate.set(-18);
      }
    });
    const inView = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });

    resize.observe(el);
    inView.observe(el);
    return () => {
      resize.disconnect();
      inView.disconnect();
    };
  }, [reduceMotion, x, y, rotate]);

  const drawTrail = (history) => {
    const left = trailLeftRef.current;
    const right = trailRightRef.current;
    const gradient = gradientRef.current;
    if (!left || !right || !gradient) return;

    if (history.length < 2) {
      left.setAttribute("d", "");
      right.setAttribute("d", "");
      return;
    }

    const offset = (p, side) => {
      const normal = p.angle + Math.PI / 2;
      return `${(p.x + Math.cos(normal) * TRAIL_SPREAD * side * p.scale).toFixed(1)} ${(
        p.y + Math.sin(normal) * TRAIL_SPREAD * side * p.scale
      ).toFixed(1)}`;
    };
    const path = (side) =>
      history.map((p, i) => `${i ? "L" : "M"} ${offset(p, side)}`).join(" ");

    left.setAttribute("d", path(-1));
    right.setAttribute("d", path(1));

    const tail = history[0];
    const head = history[history.length - 1];
    gradient.setAttribute("x1", tail.x);
    gradient.setAttribute("y1", tail.y);
    gradient.setAttribute("x2", head.x);
    gradient.setAttribute("y2", head.y);
  };

  useAnimationFrame((time, delta) => {
    const { w, h } = size.current;
    if (reduceMotion || !visible.current || !w) return;

    const state = flight.current;
    state.elapsed += Math.min(delta, 50);
    const { plan } = state;

    if (state.elapsed > plan.duration + plan.pauseAfter) {
      state.plan = createFlight();
      state.elapsed = 0;
      state.history = [];
      drawTrail(state.history);
      return;
    }

    if (state.elapsed > plan.duration) {
      state.history = state.history.filter((p) => time - p.time < TRAIL_MS);
      drawTrail(state.history);
      return;
    }

    const t = state.elapsed / plan.duration;
    const now = bezier(plan, t);
    const next = bezier(plan, Math.min(1, t + 0.005));
    const angle = Math.atan2((next.y - now.y) * h, (next.x - now.x) * w);
    const s = 0.9 + 0.2 * Math.sin(t * Math.PI * 2 + plan.wobble);

    x.set(now.x * w);
    y.set(now.y * h);
    rotate.set((angle * 180) / Math.PI);
    scale.set(s);

    const tailOffset = size.current.plane * 0.38 * s;
    state.history.push({
      x: now.x * w - Math.cos(angle) * tailOffset,
      y: now.y * h - Math.sin(angle) * tailOffset,
      angle,
      scale: s,
      time,
    });
    state.history = state.history.filter((p) => time - p.time < TRAIL_MS);
    drawTrail(state.history);
  });

  return (
    <div className="scene-plane-area" ref={areaRef}>
      {!reduceMotion && (
        <svg className="scene-plane-trail">
          <defs>
            <linearGradient id="planeTrailFade" ref={gradientRef} gradientUnits="userSpaceOnUse">
              <stop offset="0%" className="scene-plane-trail-stop" stopOpacity="0" />
              <stop offset="100%" className="scene-plane-trail-stop" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path ref={trailLeftRef} className="scene-plane-trail-line" />
          <path ref={trailRightRef} className="scene-plane-trail-line" />
        </svg>
      )}

      <motion.div className="scene-plane" ref={planeRef} style={{ x, y, rotate, scale }}>
        <svg viewBox="0 0 120 100" className="scene-plane-svg">
          <polygon points="116,50 8,8 52,52" fill="#c9dcf5" />
          <polygon points="116,50 8,92 52,52" fill="#9dbde9" />
          <polygon points="52,52 8,8 30,48" fill="#e6effb" />
          <polygon points="116,50 52,52 44,72" fill="#5b8fd4" />
        </svg>
      </motion.div>
    </div>
  );
};

export const HeroScene = ({ progress, mouseX, mouseY, reduceMotion }) => {
  const motionScale = reduceMotion ? 0 : 1;
  const [burst, setBurst] = useState(null);

  const triggerBurst = useCallback((kind) => {
    if (reduceMotion) return;
    setBurst({ kind, key: Date.now() });
  }, [reduceMotion]);

  const clearBurst = useCallback(() => setBurst(null), []);

  const baseY = useTransform(progress, [0, 1], [0, -40 * motionScale]);
  const moonY = useTransform(progress, [0, 1], [0, -90 * motionScale]);
  const fireflyY = useTransform(progress, [0, 1], [0, -50 * motionScale]);
  const decorOpacity = useTransform(progress, (p) =>
    reduceMotion ? 1 : Math.min(1, Math.max(0, 1 - (p - 0.3) / 0.45))
  );

  const layerProps = { progress, mouseX, mouseY, motionScale };

  return (
    <div className="hero-scene">
      {/* 1. Base: airy day sky, with the night sky cross-fading over it in dark mode */}
      <motion.div className="scene-base" style={{ y: baseY }} aria-hidden="true">
        <div className="scene-base-night" />
      </motion.div>

      {/* Light mode only: sun, drifting clouds in three depths, and the occasional flock of birds */}
      <div className="day-sky">
        <div aria-hidden="true">
          <Clouds progress={progress} motionScale={motionScale} />
        </div>
        <div className="sky-egg-anchor">
          <Sun y={moonY} onActivate={() => triggerBurst("day")} />
          {burst?.kind === "day" && (
            <SkyBurst kind="day" burstKey={burst.key} onDone={clearBurst} />
          )}
        </div>
        <div aria-hidden="true">
          <Birds reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* Dark mode only: moon and the occasional shooting star, behind the skyline */}
      <div className="night-sky">
        <div className="sky-egg-anchor">
          <Moon y={moonY} onActivate={() => triggerBurst("night")} />
          {burst?.kind === "night" && (
            <SkyBurst kind="night" burstKey={burst.key} onDone={clearBurst} />
          )}
        </div>
        <div aria-hidden="true">
          <ShootingStars reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* Skyline: far, mid and edge layers each sink at their own rate as the hero scrolls away */}
      <div aria-hidden="true">
        <HeroSkyline progress={progress} mouseX={mouseX} motionScale={motionScale} />
      </div>

      {/* Little cartoon people strolling along the street below the skyline */}
      <div aria-hidden="true">
        <HeroWalkers progress={progress} motionScale={motionScale} />
      </div>

      <motion.div className="scene-decor" style={{ opacity: decorOpacity }} aria-hidden="true">

        {/* 2. Distant: a single faint dot grid */}
        <SceneLayer name="distant" {...layerProps}>
          <span className="scene-dots scene-dots--a" />
        </SceneLayer>

        {/* 3. Midground: large coding symbols on the outer edges */}
        <SceneLayer name="mid" {...layerProps} />

        {/* 4. Foreground: one small cube for depth */}
        <SceneLayer name="fore" {...layerProps} />

        <Fireflies y={fireflyY} />

        <PaperPlane reduceMotion={reduceMotion} />
      </motion.div>
    </div>
  );
};
