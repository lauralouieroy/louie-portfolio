/* App.js */

import { useEffect, useState } from "react";
import "./App.css";

import { AmbientSky } from "./components/AmbientSky";
import { Blog } from "./components/Blog";
import { Certificates } from "./components/Certificates";
import { CustomCursor } from "./components/CustomCursor";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { GithubActivity } from "./components/GithubActivity";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Preloader } from "./components/Preloader";
import { Project } from "./components/Project";
import { Technology } from "./components/Technology";
import { motion, useScroll } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  /* KEEP SCROLL PROGRESS */
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let current = 0;
    const timers = [];

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 2;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        /* Hold on "Ready" with the city lit, then wipe up to reveal the hero. */
        timers.push(setTimeout(() => setDone(true), 600));
        timers.push(setTimeout(() => setStartHeroAnimation(true), 950));
        timers.push(setTimeout(() => setLoading(false), 1550));
      } else {
        setProgress(current);
      }
    }, 70);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <CustomCursor />
      {loading && <Preloader progress={progress} done={done} />}

      {/* MAIN WEBSITE */}
      <div
        className={`app ${
          done ? "app-show" : "app-hidden"
        }`}
      >
        {/* KEEP THIS */}
        <motion.div
          className="scroll-progress"
          style={{
            scaleX: scrollYProgress,
          }}
        />

        <AmbientSky />

        <div className="app-main">
          <Navbar />
          <Hero startAnimation={startHeroAnimation} />
          <Experience />
          <Technology />
          <Project />
          <Blog />
          <Certificates />
          <GithubActivity />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
