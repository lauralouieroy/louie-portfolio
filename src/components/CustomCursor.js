import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const HOVER_SEL =
  "a, button, [role='button'], input, textarea, select, label, .project-card, .blog-card, .theme-toggle, .view-btn, .footer-btn, .carousel-controls button";

/*
  Same folded-paper silhouette as the hero plane: wide top/bottom wings,
  rear fold, and a darker centre crease so it reads as origami, not an arrow.
*/
const PlaneSvg = () => (
  <svg viewBox="0 0 120 100" className="custom-cursor-plane-svg">
    <polygon className="custom-cursor-plane-top" points="116,50 8,8 52,52" />
    <polygon className="custom-cursor-plane-bottom" points="116,50 8,92 52,52" />
    <polygon className="custom-cursor-plane-rear" points="52,52 8,8 30,48" />
    <polygon className="custom-cursor-plane-crease" points="116,50 52,52 44,72" />
  </svg>
);

export const CustomCursor = () => {
  const planeRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const prev = useRef({ x: -100, y: -100 });
  const angle = useRef(-28);
  const smoothAngle = useRef(-28);
  const raf = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return undefined;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      const dx = e.clientX - prev.current.x;
      const dy = e.clientY - prev.current.y;
      if (dx * dx + dy * dy > 4) {
        angle.current = (Math.atan2(dy, dx) * 180) / Math.PI;
        prev.current.x = e.clientX;
        prev.current.y = e.clientY;
      }
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onOver = (e) => {
      setHover(Boolean(e.target.closest?.(HOVER_SEL)));
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    const tick = () => {
      let diff = angle.current - smoothAngle.current;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      smoothAngle.current += diff * 0.18;

      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${smoothAngle.current}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={planeRef}
        className={`custom-cursor-plane${hover ? " is-hover" : ""}${down ? " is-down" : ""}`}
      >
        <span className="custom-cursor-trail" />
        <PlaneSvg />
      </div>
    </div>
  );
};
