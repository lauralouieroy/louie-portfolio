import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Birds, DriftClouds, Fireflies, ShootingStars } from "./HeroNightSky";
import "./HeroScene.css";
import "./AmbientSky.css";

/*
  Page sky behind Experience → Blog. Fades in after the hero leaves,
  so light mode keeps clouds + birds and dark mode keeps stars + fireflies + comets.
*/
export const AmbientSky = () => {
  const reduceMotion = useReducedMotion();
  const [heroHeight, setHeroHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 900
  );
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => {
      const hero = document.querySelector(".hero");
      setHeroHeight(hero ? hero.offsetHeight : window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const opacity = useTransform(
    scrollY,
    [heroHeight * 0.45, heroHeight * 0.85],
    [0, 1]
  );

  return (
    <motion.div className="ambient-sky" style={{ opacity }} aria-hidden="true">
      <div className="ambient-sky-day">
        <DriftClouds />
        <Birds reduceMotion={reduceMotion} />
      </div>

      <div className="ambient-sky-night">
        <div className="ambient-sky-stars" />
        <Fireflies />
        <ShootingStars reduceMotion={reduceMotion} />
        <ShootingStars reduceMotion={reduceMotion} />
      </div>
    </motion.div>
  );
};
