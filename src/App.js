/* App.js */

import { useEffect, useState } from "react";
import "./App.css";

import { About } from "./components/About";
import { Blog } from "./components/Blog";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Project } from "./components/Project";
import { Technology } from "./components/Technology";

import { motion, useScroll } from "framer-motion";
import {
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";

function App() {
  const portfolioOnProgress = true;
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  /* KEEP SCROLL PROGRESS */
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        setTimeout(() => {
          setLoading(false);

          /* show work in progress modal */
          setTimeout(() => {
            if (portfolioOnProgress) {
              setShowNotice(true);
            }
          }, 500);

          /* trigger hero stats AFTER preloader */
          setTimeout(() => {
            setStartHeroAnimation(true);
          }, 700);
        }, 800);
      } else {
        setProgress(current);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* PRELOADER */}
      {loading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="preloader-logo">
              <span>LL</span>
            </div>

            <h1 className="preloader-name">
              Louie Laura
            </h1>

            <p className="preloader-role">
              Software Engineer
            </p>

            {/* Loading Percentage */}
            <div className="preloader-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              <p className="progress-text">
                Loading... {progress}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WORK IN PROGRESS MODAL */}
      {showNotice && (
        <div className="notice-modal">
          <div className="notice-content">
            <button
              className="notice-close"
              onClick={() => setShowNotice(false)}
            >
              <FaTimes />
            </button>

            <div className="notice-icon">
              <FaExclamationTriangle />
            </div>

            <p className="notice-label">
              WORK IN PROGRESS
            </p>

            <h2>
              Portfolio is still being updated
            </h2>

            <p className="notice-text">
              Some information, project details,
              and content may not yet be fully
              accurate or updated.
              <br />
              <br />
              I’m continuously improving this
              portfolio to better reflect my latest
              work, experience, and skills.
            </p>

            <button
              className="notice-btn"
              onClick={() => setShowNotice(false)}
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* MAIN WEBSITE */}
      <div
        className={`app ${
          loading ? "app-hidden" : "app-show"
        }`}
      >
        {/* KEEP THIS */}
        <motion.div
          className="scroll-progress"
          style={{
            scaleX: scrollYProgress,
          }}
        />

        <Navbar />
        <Hero startAnimation={startHeroAnimation} />
        <About />
        <Experience />
        <Technology />
        <Project />
        <Blog />
        <Footer />
      </div>
    </>
  );
}

export default App;