import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCode,
  FaFolderOpen,
  FaUsers,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";
import heroBg from "../assets/hero-workspace.jpg";
import profile from "../assets/about-me-person.png";
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

  const experience = useCounter(startAnimation ? 3 : 0, 1200);
  const projects = useCounter(startAnimation ? 4 : 0, 1000);
  const technologies = useCounter(startAnimation ? 24 : 0, 1100);
  const collaborations = useCounter(startAnimation ? 2 : 0, 1300);

  const resumePath = `${process.env.PUBLIC_URL}/resume.pdf`;

  return (
    <>
      <section
        id="about"
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero-fade" aria-hidden="true" />

        <div className="hero-portrait">
          <img
            src={profile}
            alt="Louie Roy F. Laura"
            className="profile-img"
            width={1024}
            height={1024}
            decoding="async"
          />
        </div>

        <div className="hero-main">
          <div className="hero-left">
            <p className="hero-label">Code / Build / Solve / Impact</p>

            <h1 className="hero-title">
              Turning Ideas Into
              <br />
              <span>Real Solutions.</span>
            </h1>

            <p className="hero-description">
              I&apos;m <span>Louie Roy F. Laura</span>, a Software Engineer who
              enjoys building scalable web applications, solving real-world
              problems, and creating technology that makes a meaningful impact.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-btn">
                View My Work <FaArrowRight />
              </a>

              <button
                className="secondary-btn"
                onClick={() => setShowResume(true)}
              >
                <FaDownload /> Download Resume
              </button>
            </div>
          </div>

          <div className="hero-right-spacer" aria-hidden="true" />
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaCode />
            </div>
            <h2>{experience}+</h2>
            <p>Years of Experience</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaFolderOpen />
            </div>
            <h2>{projects}+</h2>
            <p>Projects Completed</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <h2>{technologies}+</h2>
            <p>Technologies</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartBar />
            </div>
            <h2>{collaborations}+</h2>
            <p>Happy Collaborations</p>
          </div>
        </div>
      </section>

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
