import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  FaArrowRight,
  FaCode,
  FaFolderOpen,
  FaUsers,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";
import { HeroScene } from "./HeroScene";
import profile from "../assets/hero-avatar.jpg";
import "./Hero.css";

const ENTRANCE_EASE = [0.22, 1, 0.36, 1];

function useCounter(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export const Hero = ({ startAnimation }) => {
  const [showResume, setShowResume] = useState(false);

  const experience = useCounter(startAnimation ? 3 : 0, 1200);
  const projects = useCounter(startAnimation ? 4 : 0, 1000);
  const technologies = useCounter(startAnimation ? 24 : 0, 1100);
  const collaborations = useCounter(startAnimation ? 2 : 0, 1300);

  const resumePath = `${process.env.PUBLIC_URL}/resume.pdf`;

  useEffect(() => {
    if (!showResume) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowResume(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [showResume]);

  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const entrance = startAnimation ? "show" : "hidden";
  const rise = (delay, scale = 1) => ({
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : scale },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0.3 : 0.7, delay, ease: ENTRANCE_EASE },
    },
  });

  const stats = [
    { icon: <FaCode />, value: experience, label: "Years of Experience" },
    { icon: <FaFolderOpen />, value: projects, label: "Projects Completed" },
    { icon: <FaUsers />, value: technologies, label: "Technologies" },
    { icon: <FaChartBar />, value: collaborations, label: "Happy Collaborations" },
  ];

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 16, mass: 0.6 };
  const mouseX = useSpring(pointerX, springConfig);
  const mouseY = useSpring(pointerY, springConfig);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <>
      <section
        id="about"
        className="hero"
        ref={heroRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <HeroScene
          progress={scrollYProgress}
          mouseX={mouseX}
          mouseY={mouseY}
          reduceMotion={reduceMotion}
        />

        <div className="hero-fade" aria-hidden="true" />

        <div className="hero-main">
          <div className="hero-left">
            <motion.div
              className="hero-avatar"
              initial="hidden"
              animate={entrance}
              variants={rise(0, 0.94)}
            >
              <span className="hero-avatar-orbit" aria-hidden="true" />
              <div className="hero-avatar-frame">
                <img
                  src={profile}
                  alt="Louie Roy F. Laura"
                  width={960}
                  height={960}
                  decoding="async"
                />
              </div>
            </motion.div>

            <motion.p
              className="hero-description"
              initial="hidden"
              animate={entrance}
              variants={rise(0.12)}
            >
              I&apos;m <span>Louie Roy F. Laura</span>, a Software Engineer who
              enjoys building scalable web applications, solving real-world
              problems, and creating technology that makes a meaningful impact.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial="hidden"
              animate={entrance}
              variants={rise(0.24)}
            >
              <a href="#projects" className="primary-btn">
                View My Work <FaArrowRight />
              </a>

              <button
                className="secondary-btn"
                onClick={() => setShowResume(true)}
              >
                <FaDownload /> Download Resume
              </button>
            </motion.div>
          </div>
        </div>

        <div className="stats">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial="hidden"
              animate={entrance}
              variants={rise(0.36 + i * 0.08)}
              whileHover={reduceMotion ? undefined : { y: -3 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h2>{stat.value}+</h2>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {showResume && (
        <div
          className="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowResume(false);
          }}
        >
          <div className="resume-content">
            <button
              className="close-btn"
              onClick={() => setShowResume(false)}
              aria-label="Close resume"
            >
              ✕
            </button>

            <iframe
              src={resumePath}
              title="Resume"
              className="resume-frame"
            />

            <div className="resume-actions">
              <a
                href={resumePath}
                download
                className="download-btn"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
