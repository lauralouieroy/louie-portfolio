import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export const Moon = ({ y }) => (
  <motion.div className="night-moon" style={{ y }}>
    <svg viewBox="-16 -16 96 96">
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
  </motion.div>
);

export const Sun = ({ y }) => (
  <motion.div className="day-sun" style={{ y }}>
    <svg viewBox="0 0 100 100">
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
  </motion.div>
);

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
