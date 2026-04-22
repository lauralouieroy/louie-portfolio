import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/Profile-icon.png";
import "./Hero.css";

function useCounter(target, duration = 1000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps

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

export const Hero = () => {
  const [showResume, setShowResume] = useState(false);

  const projects = useCounter(2, 1000);
  const certifications = useCounter(10, 1200);
  const experience = useCounter(3, 1400);
  const blogs = useCounter(1, 1000);

  return (
    <>
      <section className="hero">
        <div className="hero-left">
        <div className="stats">
          <div>
            <h2>{experience}+</h2>
            <p>Years of experience</p>
          </div>
          <div>
            <h2>{projects}</h2>
            <p>Projects completed</p>
          </div>
          <div>
            <h2>{blogs}</h2>
            <p>Blogs</p>
          </div>
          <div>
            <h2>{certifications}</h2>
            <p>Certifications</p>
          </div>
        </div>

          <div className="intro">
            <h1 className="typing">
              <Typewriter
                words={["Hello", "Hi", "Welcome"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </h1>
            <p>
              — I’m <span className="highlight">Louie Laura</span>, a
              Programmer/Developer
            </p>

            {/* BUTTON */}
            <button
              className="resume-btn"
              onClick={() => setShowResume(true)}
            >
              Resume
            </button>
          </div>

          <p
            className="scroll"
            onClick={() => {
              const footer = document.getElementById("footer");
              if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Scroll down ↓
          </p>
        </div>

        <div className="hero-right">
          <img src={profile} alt="Profile" className="profile-img" />
        </div>
      </section>

      {/* ✅ ADD THIS MODAL */}
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
              src="/resume.pdf"
              title="Resume"
              className="resume-frame"
            />

            <div className="resume-actions">
              <a href="/resume.pdf" download className="download-btn">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
