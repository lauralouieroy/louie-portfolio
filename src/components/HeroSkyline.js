import { motion, useTransform } from "framer-motion";

const VIEW_W = 1600;
const VIEW_H = 320;
const EDGE_W = 420;

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const pick = (rand, list) => list[Math.floor(rand() * list.length)];

/* 0 at the centre of the hero, 1 at either edge. Keeps the area behind the stat cards low. */
const edgeness = (cx) => Math.min(1, Math.abs(cx / VIEW_W - 0.5) * 2);

const MID_ROOFS = ["flat", "flat", "setback", "stepped", "spire", "antenna", "slant", "tank"];

const buildRow = ({ seed, minH, maxH, minW, maxW, gap, centerScale, roofs, detail }) => {
  const rand = seeded(seed);
  const buildings = [];
  let x = -20;

  while (x < VIEW_W + 20) {
    const w = minW + rand() * (maxW - minW);
    const edge = edgeness(x + w / 2);
    const profile = centerScale + (1 - centerScale) * Math.pow(edge, 1.3);
    buildings.push({
      x,
      w,
      h: (minH + rand() * (maxH - minH)) * profile,
      roof: pick(rand, roofs),
      roofSize: rand(),
      ledge: detail && rand() < 0.55,
      windows: detail && edge > 0.3,
    });
    x += w + 1 + rand() * gap;
  }

  return buildings;
};

/* Foreground towers only at the outer edges: tallest at the very edge, stepping down inward. */
const buildEdge = (seed) => {
  const rand = seeded(seed);
  const buildings = [];
  let x = -12;
  let i = 0;

  while (x < EDGE_W - 90) {
    const w = 58 + rand() * 30;
    buildings.push({
      x,
      w,
      h: (272 - i * 46) * (0.88 + rand() * 0.14),
      roof: pick(rand, ["setback", "antenna", "flat", "stepped"]),
      roofSize: rand(),
      ledge: true,
      windows: true,
      lit: Array.from({ length: 2 }, () => ({
        col: Math.floor(rand() * 3),
        row: 1 + Math.floor(rand() * 5),
        delay: rand() * 6,
      })),
    });
    x += w + 3 + rand() * 8;
    i += 1;
  }

  return buildings;
};

const ROWS = {
  far: buildRow({
    seed: 11, minH: 90, maxH: 170, minW: 22, maxW: 50, gap: 4, centerScale: 0.7,
    roofs: ["flat", "flat", "flat", "antenna", "setback"], detail: false,
  }),
  mid: buildRow({
    seed: 29, minH: 90, maxH: 210, minW: 34, maxW: 72, gap: 12, centerScale: 0.42,
    roofs: MID_ROOFS, detail: true,
  }),
};

const EDGES = { left: buildEdge(47), right: buildEdge(83) };

const WINDOWS = {
  mid: { id: "skylineWindowsMid", cellW: 9, cellH: 12, winW: 3, winH: 5, classes: ["a", "b", "c", "c", "b", "c"] },
  near: { id: "skylineWindowsNear", cellW: 12, cellH: 16, winW: 4, winH: 7, classes: ["c", "b", "c", "c", "c", "a"] },
};

/* Window classes a/b/c: dark mode lights a few brightly, some dimly, and leaves the rest off. */
const WindowPattern = ({ spec }) => (
  <pattern id={spec.id} width={spec.cellW * 3} height={spec.cellH * 2} patternUnits="userSpaceOnUse">
    {spec.classes.map((cls, i) => (
      <rect
        key={i}
        className={`skyline-window skyline-window--${cls}`}
        x={(i % 3) * spec.cellW + 3}
        y={Math.floor(i / 3) * spec.cellH + 4}
        width={spec.winW}
        height={spec.winH}
        rx="0.6"
      />
    ))}
  </pattern>
);

const Roof = ({ b, top }) => {
  const { x, w, roofSize: s } = b;
  switch (b.roof) {
    case "setback":
      return <rect x={x + w * 0.16} y={top - (8 + s * 12)} width={w * 0.68} height={9 + s * 12} />;
    case "stepped":
      return (
        <>
          <rect x={x + w * 0.12} y={top - 10} width={w * 0.76} height="11" />
          <rect x={x + w * 0.28} y={top - (20 + s * 8)} width={w * 0.44} height={11 + s * 8} />
        </>
      );
    case "spire":
      return (
        <>
          <rect x={x + w * 0.3} y={top - 8} width={w * 0.4} height="9" />
          <rect x={x + w / 2 - 1.2} y={top - (26 + s * 22)} width="2.4" height={20 + s * 22} />
        </>
      );
    case "antenna":
      return <rect x={x + w * (0.2 + s * 0.5)} y={top - (12 + s * 16)} width="1.6" height={13 + s * 16} />;
    case "slant":
      return <polygon points={`${x},${top + 0.5} ${x + w},${top - w * 0.32} ${x + w},${top + 0.5}`} />;
    case "tank":
      return (
        <>
          <rect x={x + w * 0.58} y={top - 13} width="11" height="8" rx="2" />
          <rect x={x + w * 0.58 + 1.5} y={top - 6} width="1.4" height="6.5" />
          <rect x={x + w * 0.58 + 8} y={top - 6} width="1.4" height="6.5" />
        </>
      );
    default:
      return null;
  }
};

const Buildings = ({ row, windows, rimSide }) =>
  row.map((b, i) => {
    const top = VIEW_H - b.h;
    return (
      <g key={i}>
        <Roof b={b} top={top} />
        <rect x={b.x} y={top} width={b.w} height={b.h} />
        {b.ledge && <rect className="skyline-ledge" x={b.x - 1.5} y={top + 5} width={b.w + 3} height="2.2" />}
        {windows && b.windows && (
          <rect
            className="skyline-windows"
            x={b.x + 5}
            y={top + 12}
            width={Math.max(0, b.w - 10)}
            height={Math.max(0, b.h - 12)}
            fill={`url(#${windows.id})`}
          />
        )}
        {rimSide && (
          <rect
            className="skyline-rim"
            x={rimSide === "right" ? b.x + b.w - 2.5 : b.x}
            y={top}
            width="2.5"
            height={b.h}
          />
        )}
        {windows &&
          b.lit?.map((l, j) => {
            const firstCol = Math.ceil((b.x + 5) / windows.cellW) * windows.cellW;
            const lx = firstCol + l.col * windows.cellW + 3;
            const ly = Math.ceil((top + 12) / windows.cellH) * windows.cellH + l.row * windows.cellH + 4;
            if (lx + windows.winW > b.x + b.w - 5 || ly > VIEW_H - 10) return null;
            return (
              <rect
                key={j}
                className="skyline-lit"
                x={lx}
                y={ly}
                width={windows.winW}
                height={windows.winH}
                rx="0.6"
                style={{ "--lit-delay": `-${l.delay}s` }}
              />
            );
          })}
      </g>
    );
  });

const mirror = (row) => row.map((b) => ({ ...b, x: EDGE_W - b.x - b.w }));

export const HeroSkyline = ({ progress, mouseX, motionScale }) => {
  const m = motionScale;
  const opacity = useTransform(progress, (p) => (m ? Math.min(1, Math.max(0, 1 - (p - 0.6) / 0.4)) : 1));

  /* As the hero leaves, nearer layers sink faster and the edge towers slide outward. */
  const farY = useTransform(progress, (p) => p * 14 * m);
  const midY = useTransform(progress, (p) => p * 38 * m);
  const nearY = useTransform(progress, (p) => p * 76 * m);
  const farX = useTransform(mouseX, (v) => v * -4 * m);
  const midX = useTransform(mouseX, (v) => v * -10 * m);
  const leftX = useTransform([progress, mouseX], ([p, v]) => (-p * 60 + v * -16) * m);
  const rightX = useTransform([progress, mouseX], ([p, v]) => (p * 60 + v * -16) * m);

  return (
    <motion.div className="scene-skyline" style={{ opacity }}>
      <motion.svg
        className="skyline-layer skyline-layer--far"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMax slice"
        style={{ x: farX, y: farY }}
      >
        <Buildings row={ROWS.far} />
      </motion.svg>

      <motion.svg
        className="skyline-layer skyline-layer--mid"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMax slice"
        style={{ x: midX, y: midY }}
      >
        <defs>
          <WindowPattern spec={WINDOWS.mid} />
        </defs>
        <Buildings row={ROWS.mid} windows={WINDOWS.mid} />
      </motion.svg>

      <motion.svg
        className="skyline-layer skyline-layer--near skyline-edge skyline-edge--left"
        viewBox={`0 0 ${EDGE_W} ${VIEW_H}`}
        preserveAspectRatio="xMinYMax meet"
        style={{ x: leftX, y: nearY }}
      >
        <defs>
          <WindowPattern spec={WINDOWS.near} />
        </defs>
        <Buildings row={EDGES.left} windows={WINDOWS.near} rimSide="right" />
      </motion.svg>

      <motion.svg
        className="skyline-layer skyline-layer--near skyline-edge skyline-edge--right"
        viewBox={`0 0 ${EDGE_W} ${VIEW_H}`}
        preserveAspectRatio="xMaxYMax meet"
        style={{ x: rightX, y: nearY }}
      >
        <Buildings row={mirror(EDGES.right)} windows={WINDOWS.near} rimSide="left" />
      </motion.svg>
    </motion.div>
  );
};
