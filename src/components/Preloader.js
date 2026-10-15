import { motion, useReducedMotion } from "framer-motion";
import { DriftClouds, Moon, Sun } from "./HeroNightSky";
import "./Preloader.css";

const NAME = "Louie Roy F. Laura";
const VIEW_W = 1600;
const VIEW_H = 260;
const RING_R = 54;
const RING_C = 2 * Math.PI * RING_R;

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

/* Low in the centre (behind the text), taller toward the edges, like the hero skyline. */
const BUILDINGS = (() => {
  const rand = seeded(19);
  const list = [];
  let x = -10;
  while (x < VIEW_W + 10) {
    const w = 38 + rand() * 54;
    const edge = Math.min(1, Math.abs((x + w / 2) / VIEW_W - 0.5) * 2);
    const h = (70 + rand() * 150) * (0.45 + 0.55 * Math.pow(edge, 1.2));
    list.push({
      x,
      w,
      h,
      spire: rand() < 0.2 ? 14 + rand() * 20 : 0,
      at: Math.round(4 + rand() * 80),
      near: rand() < 0.5,
    });
    x += w + 2 + rand() * 10;
  }
  return list;
})();

const STATUS = [
  [0, "Laying the foundations"],
  [30, "Raising the skyline"],
  [65, "Turning on the lights"],
  [95, "Ready"],
];

const statusFor = (p) => STATUS.filter(([at]) => p >= at).pop()[1];

const Skyline = ({ progress }) => (
  <svg
    className="preloader-skyline"
    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="preloaderWindows" width="12" height="16" patternUnits="userSpaceOnUse">
        <rect className="preloader-window" x="3" y="4" width="4" height="6" rx="0.6" />
      </pattern>
    </defs>
    {BUILDINGS.map((b, i) => {
      const top = VIEW_H - b.h;
      const built = progress >= b.at;
      return (
        <g
          key={i}
          className={`preloader-building${b.near ? " is-near" : ""}${built ? " is-built" : ""}${
            progress >= b.at + 12 ? " is-lit" : ""
          }`}
        >
          {b.spire > 0 && <rect x={b.x + b.w / 2 - 1.5} y={top - b.spire} width="3" height={b.spire} />}
          <rect x={b.x} y={top} width={b.w} height={b.h} />
          <rect
            className="preloader-building-windows"
            x={b.x + 6}
            y={top + 10}
            width={Math.max(0, b.w - 12)}
            height={Math.max(0, b.h - 10)}
            fill="url(#preloaderWindows)"
          />
        </g>
      );
    })}
  </svg>
);

const Plane = () => (
  <div className="preloader-plane" aria-hidden="true">
    <span className="preloader-plane-trail" />
    <svg viewBox="0 0 120 100">
      <polygon points="116,50 8,8 52,52" fill="#c9dcf5" />
      <polygon points="116,50 8,92 52,52" fill="#9dbde9" />
      <polygon points="52,52 8,8 30,48" fill="#e6effb" />
      <polygon points="116,50 52,52 44,72" fill="#5b8fd4" />
    </svg>
  </div>
);

export const Preloader = ({ progress, done }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`preloader${done ? " is-done" : ""}`} role="status" aria-live="polite">
      <div className="preloader-sky" aria-hidden="true" />
      <div className="day-sky" aria-hidden="true">
        <DriftClouds />
        <Sun />
      </div>
      <div className="night-sky" aria-hidden="true">
        <Moon />
      </div>
      {!reduceMotion && <Plane />}
      <Skyline progress={progress} />

      <div className="preloader-content">
        <div className="preloader-emblem">
          <svg className="preloader-ring" viewBox="0 0 128 128" aria-hidden="true">
            <circle className="preloader-ring-track" cx="64" cy="64" r={RING_R} />
            <circle
              className="preloader-ring-fill"
              cx="64"
              cy="64"
              r={RING_R}
              strokeDasharray={RING_C}
              strokeDashoffset={RING_C * (1 - progress / 100)}
            />
            <g className="preloader-ring-dot" style={{ transform: `rotate(${progress * 3.6}deg)` }}>
              <circle cx="64" cy={64 - RING_R} r="4.5" />
            </g>
          </svg>
          <div className="preloader-logo">
            <span>LL</span>
          </div>
        </div>

        <h1 className="preloader-name" aria-label={NAME}>
          {NAME.split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, y: 18, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.035, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch === " " ? "\u00a0" : ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="preloader-role"
          initial={reduceMotion ? false : { opacity: 0, letterSpacing: "6px" }}
          animate={{ opacity: 1, letterSpacing: "2.4px" }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Software Engineer
        </motion.p>

        <div className="preloader-status">
          <span key={statusFor(progress)} className="preloader-status-text">
            {statusFor(progress)}
          </span>
          <span className="preloader-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
