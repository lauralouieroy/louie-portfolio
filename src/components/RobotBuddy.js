import { useEffect, useState } from "react";
import frame01 from "../assets/robot/frame-01.png";
import frame02 from "../assets/robot/frame-02.png";
import frame03 from "../assets/robot/frame-03.png";
import frame04 from "../assets/robot/frame-04.png";
import frame05 from "../assets/robot/frame-05.png";
import frame06 from "../assets/robot/frame-06.png";
import frame07 from "../assets/robot/frame-07.png";
import frame08 from "../assets/robot/frame-08.png";
import frame09 from "../assets/robot/frame-09.png";
import frame10 from "../assets/robot/frame-10.png";
import "./RobotBuddy.css";

const FRAMES = [
  frame01,
  frame02,
  frame03,
  frame04,
  frame05,
  frame06,
  frame07,
  frame08,
  frame09,
  frame10,
];

const FRAME_MS = 180;

export const RobotBuddy = ({ ready = true }) => {
  const [entered, setEntered] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!ready) return undefined;

    const enterTimer = setTimeout(() => setEntered(true), 400);
    return () => clearTimeout(enterTimer);
  }, [ready]);

  useEffect(() => {
    if (!ready || !entered) return undefined;

    const cycle = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, FRAME_MS);

    return () => clearInterval(cycle);
  }, [ready, entered]);

  return (
    <div
      className={`robot-buddy${entered ? " is-in" : ""}${
        ready ? "" : " is-hidden"
      }`}
      aria-live="polite"
    >
      <div
        className="robot-buddy-stage"
        role="img"
        aria-label="Friendly robot animation"
      >
        {FRAMES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={index !== frameIndex}
            className={`robot-buddy-img${
              index === frameIndex ? " is-active" : ""
            }`}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
};
