import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";

const random = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const between = (min, max) => min + Math.random() * (max - min);

/* Fireflies stay away from the centred intro copy and cluster near the skyline. */
const FIREFLIES = (() => {
  const rand = random(73);
  return Array.from({ length: 14 }, (_, i) => {
    const side = i % 2 === 0 ? 0 : 1;
    const x = side ? 64 + rand() * 33 : 3 + rand() * 33;
    const y = 30 + rand() * 62;
    return {
      x,
      y,
      size: 2.5 + rand() * 3,
      duration: 7 + rand() * 9,
      delay: -rand() * 12,
      blink: 2.2 + rand() * 3,
      dx: (rand() - 0.5) * 70,
      dy: -12 - rand() * 40,
      mobileHidden: i % 3 === 0,
    };
  });
})();

export const Moon = ({ y, onActivate }) => (
  <motion.button
    type="button"
    className="night-moon sky-egg"
    style={{ y }}
    onClick={onActivate}
    aria-label="Moon easter egg: reveal a constellation"
  >
    <svg viewBox="-16 -16 96 96" aria-hidden="true">
      <defs>
        <radialGradient id="nightMoonFill" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="100%" stopColor="#f2c86b" />
        </radialGradient>
        <radialGradient id="nightMoonHalo">
          <stop offset="35%" stopColor="#ffd98f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffd98f" stopOpacity="0" />
        </radialGradient>
        <mask id="nightMoonCut">
          <rect x="-16" y="-16" width="96" height="96" fill="#fff" />
          <circle cx="42" cy="24" r="22" fill="#000" />
        </mask>
      </defs>
      <circle cx="32" cy="32" r="47" fill="url(#nightMoonHalo)" />
      <circle cx="32" cy="32" r="24" fill="url(#nightMoonFill)" mask="url(#nightMoonCut)" />
    </svg>
  </motion.button>
);

export const Sun = ({ y, onActivate }) => (
  <motion.button
    type="button"
    className="day-sun sky-egg"
    style={{ y }}
    onClick={onActivate}
    aria-label="Sun easter egg: release a flock of birds"
  >
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="daySunFill" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="60%" stopColor="#ffd25e" />
          <stop offset="100%" stopColor="#ffb53d" />
        </radialGradient>
        <radialGradient id="daySunHalo">
          <stop offset="30%" stopColor="#ffd25e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffd25e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#daySunHalo)" />
      <g className="day-sun-rays">
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="48"
            y="4"
            width="4"
            height="14"
            rx="2"
            fill="#ffcf5c"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="24" fill="url(#daySunFill)" />
    </svg>
  </motion.button>
);

/* One-shot burst when the sun or moon is clicked. */
export const SkyBurst = ({ kind, burstKey, onDone }) => {
  useEffect(() => {
    if (!kind) return undefined;
    const timer = window.setTimeout(onDone, 1400);
    return () => window.clearTimeout(timer);
  }, [kind, burstKey, onDone]);

  if (!kind) return null;

  if (kind === "day") {
    const birds = Array.from({ length: 10 }, (_, i) => {
      const angle = (-40 + i * 14) * (Math.PI / 180);
      const dist = 90 + (i % 3) * 40;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 20,
        delay: i * 0.04,
        size: 0.75 + (i % 3) * 0.15,
      };
    });

    return (
      <div key={burstKey} className="sky-burst sky-burst--day" aria-hidden="true">
        {birds.map((b, i) => (
          <svg
            key={i}
            className="sky-burst-bird"
            viewBox="0 0 24 10"
            style={{
              "--bx": `${b.x}px`,
              "--by": `${b.y}px`,
              "--bdelay": `${b.delay}s`,
              "--bsize": b.size,
            }}
          >
            <path d="M1 7 Q6 1 12 7 Q18 1 23 7" />
          </svg>
        ))}
      </div>
    );
  }

  const stars = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const dist = 50 + (i % 4) * 28;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      delay: i * 0.03,
      size: 2 + (i % 3),
    };
  });

  return (
    <div key={burstKey} className="sky-burst sky-burst--night" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="sky-burst-star"
          style={{
            "--sx": `${s.x}px`,
            "--sy": `${s.y}px`,
            "--sdelay": `${s.delay}s`,
            "--ssize": `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
};

/*
  Day clouds in three depths. x/y in % of the hero, w in vw, speed = seconds to drift across.
  The near bank sits low so it peeks out from behind the skyline.
*/
const CLOUDS = {
  far: [
    { y: 7, w: 8, speed: 260, delay: -40, flip: false },
    { y: 15, w: 6.5, speed: 300, delay: -170, flip: true },
    { y: 4, w: 7, speed: 280, delay: -230, flip: false },
  ],
  mid: [
    { y: 24, w: 17, speed: 190, delay: -20, flip: true },
    { y: 38, w: 14, speed: 210, delay: -120, flip: false },
  ],
  near: [
    { y: 56, w: 32, speed: 150, delay: -30, flip: false },
    { y: 61, w: 28, speed: 165, delay: -105, flip: true },
  ],
};

const CLOUD_RISE = { far: 30, mid: 70, near: 120 };

const Cloud = ({ c, depth }) => (
  <div
    className={`day-cloud day-cloud--${depth}`}
    style={{
      top: `${c.y}%`,
      "--cloud-w": `${c.w}vw`,
      "--cloud-speed": `${c.speed}s`,
      "--cloud-delay": `${c.delay}s`,
    }}
  >
    <svg viewBox="0 0 200 90" style={c.flip ? { scale: "-1 1" } : undefined}>
      <defs>
        <linearGradient id={`dayCloudFill-${depth}`} x1="0" y1="18" x2="0" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f2f7fd" />
          <stop offset="100%" stopColor="#c9d8ec" />
        </linearGradient>
      </defs>
      <g fill={`url(#dayCloudFill-${depth})`}>
        <circle cx="62" cy="54" r="27" />
        <circle cx="98" cy="42" r="35" />
        <circle cx="138" cy="52" r="27" />
        <circle cx="164" cy="64" r="17" />
        <circle cx="36" cy="66" r="17" />
        <rect x="36" y="56" width="128" height="26" rx="13" />
      </g>
    </svg>
  </div>
);

export const Clouds = ({ progress, motionScale }) => {
  const farY = useTransform(progress, (p) => -p * CLOUD_RISE.far * motionScale);
  const midY = useTransform(progress, (p) => -p * CLOUD_RISE.mid * motionScale);
  const nearY = useTransform(progress, (p) => -p * CLOUD_RISE.near * motionScale);
  const ys = { far: farY, mid: midY, near: nearY };

  return Object.entries(CLOUDS).map(([depth, list]) => (
    <motion.div key={depth} className={`day-clouds day-clouds--${depth}`} style={{ y: ys[depth] }}>
      {list.map((c, i) => (
        <Cloud key={i} c={c} depth={depth} />
      ))}
    </motion.div>
  ));
};

/* Same clouds without scroll parallax, for screens that don't scroll (the preloader). */
export const DriftClouds = () =>
  Object.entries(CLOUDS).map(([depth, list]) => (
    <div key={depth} className={`day-clouds day-clouds--${depth}`}>
      {list.map((c, i) => (
        <Cloud key={i} c={c} depth={depth} />
      ))}
    </div>
  ));

/* Daytime counterpart to shooting stars: a small flock occasionally crossing the sky. */
export const Birds = ({ reduceMotion }) => {
  const [flock, setFlock] = useState(null);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let timer;
    const schedule = (wait) => {
      timer = setTimeout(() => {
        if (!isDark() && !document.hidden) {
          const count = 3 + Math.floor(Math.random() * 3);
          setFlock({
            id: Date.now(),
            y: between(8, 26),
            toLeft: Math.random() < 0.4,
            duration: between(16, 22),
            birds: Array.from({ length: count }, (_, i) => ({
              dx: -i * between(16, 24),
              dy: (i % 2 ? 1 : -1) * Math.ceil(i / 2) * between(7, 11),
              size: between(0.75, 1.05),
              flap: between(0.38, 0.5),
            })),
          });
        }
        schedule(between(14000, 26000));
      }, wait);
    };

    schedule(between(2500, 6000));
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  if (!flock) return null;

  return (
    <div
      key={flock.id}
      className={`day-flock${flock.toLeft ? " day-flock--left" : ""}`}
      style={{ top: `${flock.y}%`, "--flock-duration": `${flock.duration}s` }}
      onAnimationEnd={(e) => e.target === e.currentTarget && setFlock(null)}
    >
      {flock.birds.map((b, i) => (
        <svg
          key={i}
          className="day-bird"
          viewBox="0 0 24 10"
          style={{
            left: `${b.dx}px`,
            top: `${b.dy}px`,
            "--bird-size": b.size,
            "--bird-flap": `${b.flap}s`,
          }}
        >
          <path d="M1 7 Q6 1 12 7 Q18 1 23 7" />
        </svg>
      ))}
    </div>
  );
};

const isDark = () => document.documentElement.dataset.theme === "dark";

export const ShootingStars = ({ reduceMotion }) => {
  const [star, setStar] = useState(null);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let timer;
    const schedule = (wait) => {
      timer = setTimeout(() => {
        if (isDark() && !document.hidden) {
          const toLeft = Math.random() < 0.5;
          setStar({
            id: Date.now(),
            x: toLeft ? between(45, 92) : between(8, 55),
            y: between(4, 32),
            angle: toLeft ? between(150, 165) : between(15, 30),
            length: between(90, 160),
            travel: between(220, 380),
            duration: between(0.9, 1.4),
          });
        }
        schedule(between(4000, 11000));
      }, wait);
    };

    schedule(between(1500, 4000));
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  if (!star) return null;

  return (
    <span
      key={star.id}
      className="night-shooting-star"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        "--angle": `${star.angle}deg`,
        "--length": `${star.length}px`,
        "--travel": `${star.travel}px`,
        "--duration": `${star.duration}s`,
      }}
      onAnimationEnd={() => setStar(null)}
    />
  );
};

export const Fireflies = ({ y }) => (
  <motion.div className="night-fireflies" style={{ y }}>
    {FIREFLIES.map((f, i) => (
      <span
        key={i}
        className={`night-firefly${f.mobileHidden ? " is-mobile-hidden" : ""}`}
        style={{
          left: `${f.x}%`,
          top: `${f.y}%`,
          "--size": `${f.size}px`,
          "--duration": `${f.duration}s`,
          "--delay": `${f.delay}s`,
          "--blink": `${f.blink}s`,
          "--dx": `${f.dx}px`,
          "--dy": `${f.dy}px`,
        }}
      >
        <span className="night-firefly-glow" />
      </span>
    ))}
  </motion.div>
);
