import { useState, useEffect } from "react";
import {
  FaAngular,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaReact,
  FaArrowRight,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMysql,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";

import { ScrollReveal } from "./Utils/ScrollReveal";
import "./Technology.css";


export const Technology = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const techs = [
    {
      name: "React",
      icon: <FaReact style={{ color: "#61DBFB" }} />,
    },
    {
      name: "Angular",
      icon: <FaAngular style={{ color: "#DD0031" }} />,
    },
    {
      name: "Java",
      icon: <FaJava style={{ color: "#f89820" }} />,
    },
    {
      name: "Spring Boot",
      icon: <SiSpringboot style={{ color: "#6DB33F" }} />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript style={{ color: "#F7DF1E" }} />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript style={{ color: "#3178C6" }} />,
    },
    {
      name: "MySQL",
      icon: <SiMysql style={{ color: "#4479A1" }} />,
    },
    {
      name: "Docker",
      icon: <FaDocker style={{ color: "#2496ED" }} />,
    },
    {
      name: "AWS",
      icon: <FaAws style={{ color: "#FF9900" }} />,
    },
    {
      name: "Git",
      icon: <FaGitAlt style={{ color: "#F05032" }} />,
    },
  ];

  /*
    Desktop: show 6 first
    Mobile: show 6 first
    Click View More -> show all
  */

  const initialCount = 7;

  const displayedTechs = showAll
    ? techs
    : techs.slice(0, initialCount);

  return (
    <ScrollReveal>
    <section id="technology" className="tech">
      <div className="tech-header">
        <p className="tech-label">TECHNOLOGIES</p>

        <h1>
          Technologies I <span>work with</span>
        </h1>
      </div>

      <div className="tech-grid">
        {displayedTechs.map((tech, index) => (
          <div key={index} className="tech-card">
            <div className="icon">{tech.icon}</div>
            <p>{tech.name}</p>
          </div>
        ))}
      </div>

      {/* VIEW MORE BUTTON */}
      {techs.length > initialCount && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View More"}
          <FaArrowRight />
        </button>
      )}
    </section>
    </ScrollReveal>
  );
};