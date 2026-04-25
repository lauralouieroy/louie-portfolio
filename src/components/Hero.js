import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import {
  FaArrowRight,
  FaBriefcase,
  FaProjectDiagram,
  FaPenNib,
  FaAward,
} from "react-icons/fa";
import profile from "../assets/hero-icon.png";
import heroBg from "../assets/hero-bg.png";
import "./Hero.css";

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

  const projects = useCounter(startAnimation ? 12 : 0, 1000);
  const certifications = useCounter(startAnimation ? 10 : 0, 1200);
  const experience = useCounter(startAnimation ? 3 : 0, 1400);
  const blogs = useCounter(startAnimation ? 5 : 0, 1000);

  const resumePath = `${process.env.PUBLIC_URL}/resume.pdf`;
  return (
    <>
      <section
      id="hero"
  className="hero"
  style={{
    backgroundImage: `url(${heroBg})`,
  }}
>
        <div className="hero-left">
          {/* TOP LABEL */}
          <p className="hero-label">
            SOFTWARE ENGINEER
          </p>

          {/* MAIN TITLE */}
          <h1 className="hero-title">
            Building digital
            <br />
            solutions that
            <br />
            make an <span>impact.</span>
          </h1>

          {/* TYPEWRITER REMAINS */}
          <div className="hero-subtitle">
            <span>I create </span>
            <span className="typing">
              <Typewriter
                words={[
                  "Scalable Systems",
                  "Enterprise Applications",
                  "Modern UI/UX",
                  "Fullstack Solutions",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="hero-description">
            I’m <span>Louie Laura</span>, a passionate developer who loves
            turning ideas into clean, efficient and intuitive solutions.
          </p>

          {/* BUTTONS */}
          <div className="hero-actions">
            {/* CHANGED TO CONTACT ME */}
            <a href="#footer" className="primary-btn">
              Contact Me
            </a>

            <button
              className="secondary-btn"
              onClick={() => setShowResume(true)}
            >
              Download Resume
            </button>
          </div>

          {/* STATS BELOW */}
{/* STATS BELOW */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FaBriefcase />
          </div>
          <h2>{experience}+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram />
          </div>
          <h2>{projects}+</h2>
          <p>Projects Completed</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaPenNib />
          </div>
          <h2>{blogs}+</h2>
          <p>Blogs Published</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaAward />
          </div>
          <h2>{certifications}+</h2>
          <p>Certifications</p>
        </div>
      </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hero-right">
          <div className="image-glow"></div>

          <img
            src={profile}
            alt="Profile"
            className="profile-img"
          />
        </div>
      </section>

      {/* RESUME MODAL */}
      {showResume && (
        <div className="resume-modal">
          <div className="resume-content">
            <button
              className="close-btn"
              onClick={() => setShowResume(false)}
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