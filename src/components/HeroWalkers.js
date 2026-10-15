import { motion, useTransform } from "framer-motion";

/*
  type:     "person", "dog" (person walking a dog on a leash) or "bike" (cyclist).
  dir:      1 moves left → right, -1 moves right → left.
  duration: seconds to cross the hero; delay is negative so walkers start spread out.
  extra:    small prop that gives each walker some character.
*/
const WALKERS = [
  { type: "person", shirt: "#e8748a", pants: "#3b4a6b", hair: "#2b2230", dir: 1, duration: 38, delay: -4, size: 1, extra: "backpack" },
  { type: "person", shirt: "#5b8fd4", pants: "#2c3550", hair: "#4a3326", dir: -1, duration: 46, delay: -18, size: 1.05, extra: "laptop" },
  { type: "dog", shirt: "#7cc79a", pants: "#3a3f58", hair: "#1f1b24", dir: 1, duration: 56, delay: -30, size: 0.95, extra: "cap", dog: "#c98a4b" },
  { type: "person", shirt: "#f2b14c", pants: "#46506e", hair: "#6b4426", dir: -1, duration: 34, delay: -9, size: 0.72, extra: null, mobileHidden: true },
  { type: "bike", shirt: "#9b7fd6", pants: "#2f3a55", hair: "#2b2230", dir: 1, duration: 17, delay: -6, size: 1, bike: "#e8748a" },
  { type: "person", shirt: "#ef8f5a", pants: "#36405c", hair: "#3a2a20", dir: -1, duration: 58, delay: -40, size: 1.02, extra: "coffee", mobileHidden: true },
];

const SKIN = "#f3c9a5";
const SHOE = "#232a3d";

const VIEW_W = { person: 24, dog: 62, bike: 50 };

const Head = ({ w, cx = 12, cy = 6.5 }) => (
  <g>
    <circle cx={cx} cy={cy} r="4.6" fill={SKIN} />
    <path
      d={`M${cx - 4.6} ${cy - 0.3} A4.6 4.6 0 0 1 ${cx + 4.6} ${cy - 0.3} L${cx + 4.6} ${cy - 1.3} Q${cx} ${cy - 6.1} ${cx - 4.6} ${cy - 1.3} Z`}
      fill={w.hair}
    />
    {w.extra === "cap" && (
      <path
        d={`M${cx - 4.8} ${cy - 1.5} Q${cx} ${cy - 5.9} ${cx + 4.8} ${cy - 1.5} L${cx + 7.6} ${cy - 0.9} L${cx + 4.8} ${cy - 0.5} Z`}
        fill="#3a6fb5"
      />
    )}
    <circle cx={cx + 2.4} cy={cy + 0.3} r="0.7" fill="#2b2230" />
  </g>
);

const Leg = ({ w, className }) => (
  <g className={`walker-limb ${className}`}>
    <rect x="10.2" y="26" width="3.6" height="15" rx="1.8" fill={w.pants} />
    <rect x="10" y="39.5" width="5.5" height="2.8" rx="1.4" fill={SHOE} />
  </g>
);

const Person = ({ w }) => (
  <g>
    <g className="walker-limb walker-limb--back-arm">
      <rect x="10.5" y="13" width="3" height="11" rx="1.5" fill={w.shirt} />
    </g>
    <Leg w={w} className="walker-limb--back-leg" />

    {w.extra === "backpack" && <rect x="5" y="13" width="5" height="10" rx="2" fill="#3b4a6b" />}

    <rect x="8" y="11.5" width="8" height="16" rx="3.5" fill={w.shirt} />
    <Head w={w} />

    <Leg w={w} className="walker-limb--front-leg" />
    <g className="walker-limb walker-limb--front-arm">
      <rect x="10.5" y="13" width="3" height="11" rx="1.5" fill={w.shirt} />
      <circle cx="12" cy="23.5" r="1.6" fill={SKIN} />
      {w.extra === "laptop" && <rect x="9" y="22" width="7" height="5" rx="1" fill="#c3cfe2" />}
      {w.extra === "coffee" && <rect x="10.4" y="20.5" width="3.4" height="4.4" rx="0.8" fill="#fff" />}
    </g>
  </g>
);

/* Dog trots ahead of its owner; the leash runs from the owner's leading hand to the collar. */
const Dog = ({ color }) => (
  <g className="walker-dog">
    <path className="walker-leash" d="M14 22 Q32 34 49 31" />
    <g className="walker-dog-tail">
      <path d="M38 34 Q34 30 35 27" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <rect className="walker-dog-leg walker-dog-leg--a" x="39.5" y="36" width="2.2" height="7" rx="1.1" fill={color} />
    <rect className="walker-dog-leg walker-dog-leg--b" x="49.5" y="36" width="2.2" height="7" rx="1.1" fill={color} />
    <rect x="37" y="31" width="17" height="7.5" rx="3.75" fill={color} />
    <rect className="walker-dog-leg walker-dog-leg--b" x="41.5" y="36" width="2.2" height="7" rx="1.1" fill={color} />
    <rect className="walker-dog-leg walker-dog-leg--a" x="51.5" y="36" width="2.2" height="7" rx="1.1" fill={color} />
    <g className="walker-dog-head">
      <circle cx="55" cy="29" r="4.4" fill={color} />
      <ellipse cx="59" cy="30.6" rx="2.6" ry="1.8" fill={color} />
      <circle cx="61.2" cy="30.2" r="0.9" fill="#2b2230" />
      <circle cx="56.4" cy="28" r="0.6" fill="#2b2230" />
      <path d="M52.6 26 Q51 30 53.4 31.4 Q54.4 28.6 52.6 26 Z" fill="#8a5a2e" />
    </g>
    <rect x="49.6" y="30.2" width="1.6" height="4.6" rx="0.8" fill="#e8748a" />
  </g>
);

const Cyclist = ({ w }) => (
  <g>
    <g className="walker-wheel">
      <circle cx="10" cy="35" r="7.6" fill="none" stroke={SHOE} strokeWidth="1.8" />
      <path d="M10 27.4 V42.6 M2.4 35 H17.6" stroke="#8a95ad" strokeWidth="0.6" />
    </g>
    <g className="walker-wheel">
      <circle cx="40" cy="35" r="7.6" fill="none" stroke={SHOE} strokeWidth="1.8" />
      <path d="M40 27.4 V42.6 M32.4 35 H47.6" stroke="#8a95ad" strokeWidth="0.6" />
    </g>
    <path
      d="M10 35 L19 24 L35 24 L40 35 M19 24 L25 35 L35 24 M25 35 L10 35 M35 24 L36 19"
      fill="none"
      stroke={w.bike}
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <rect x="15.5" y="21.5" width="7" height="2.2" rx="1.1" fill={SHOE} />
    <path d="M34 19 H39" stroke={SHOE} strokeWidth="1.8" strokeLinecap="round" />

    <g className="walker-crank">
      <path d="M21 31 L29 39" stroke={SHOE} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="25" cy="35" r="1.8" fill={SHOE} />
    </g>

    <path d="M19 21 L26 26 L24.5 34" fill="none" stroke={w.pants} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.5 20.5 L28 9.5" stroke={w.shirt} strokeWidth="7" strokeLinecap="round" />
    <path d="M27 11.5 L35.5 19" stroke={w.shirt} strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="35.5" cy="19" r="1.4" fill={SKIN} />
    <Head w={w} cx={30.5} cy={5.5} />
  </g>
);

export const HeroWalkers = ({ progress, motionScale }) => {
  const opacity = useTransform(progress, (p) =>
    motionScale ? Math.min(1, Math.max(0, 1 - (p - 0.55) / 0.3)) : 1
  );

  return (
    <motion.div className="scene-walkers" style={{ opacity }}>
      {WALKERS.map((w, i) => (
        <div
          key={i}
          className={`walker walker--${w.type} walker--${w.dir > 0 ? "right" : "left"}${
            w.mobileHidden ? " is-mobile-hidden" : ""
          }`}
          style={{
            "--walk-duration": `${w.duration}s`,
            "--walk-delay": `${w.delay}s`,
            "--walker-size": w.size,
            "--walker-ratio": `${VIEW_W[w.type]} / 44`,
          }}
        >
          <div className="walker-body">
            <svg viewBox={`0 0 ${VIEW_W[w.type]} 44`} className="walker-svg">
              {w.type === "bike" ? <Cyclist w={w} /> : <Person w={w} />}
              {w.type === "dog" && <Dog color={w.dog} />}
            </svg>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
