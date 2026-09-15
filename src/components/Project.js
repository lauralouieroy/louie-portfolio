import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
} from "react-icons/fa";
import "./Project.css";
import project1 from "../assets/fintra-project.png";
import project2 from "../assets/stratosense-project.png";
import project3 from "../assets/kairo-project.png";
import project4 from "../assets/toms-project.png";

import { ScrollReveal } from "./Utils/ScrollReveal";

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth <= 900) return 1;
    if (window.innerWidth <= 1199) return 2;
    return 3;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

export const Project = () => {
  const projects = [
    {
      title: "Fintra – Financial Tracker",
      desc:
        "A modern financial tracking web application that helps users manage credits, payments, and financial activities with real-time insights and clean dashboard analytics.",
      tech: ["React", "JavaScript", "HTML", "CSS"],
      img: project1,
      github: "https://github.com/lauralouieroy/fintra",
      demo: "https://lauralouieroy.github.io/fintra/",
      role: "Frontend Development + UI/UX Design",
    },
    {
      title: "StratoSense – Weather Intelligence App",
      desc:
        "A responsive weather application that provides real-time conditions, hourly forecasts, and location-based climate insights with a clean and intuitive UI.",
      tech: ["React", "JavaScript", "HTML", "CSS", "API Integration"],
      img: project2,
      github: "https://github.com/lauralouieroy/stratosense",
      demo: "https://lauralouieroy.github.io/stratosense/",
      role: "Frontend Development + API Integration",
    },
    {
      title: "Kairo – Focus & Productivity Timer",
      desc:
        "A minimalist Pomodoro-based productivity app designed to help users stay focused, manage work sessions, and build better habits through structured time tracking and clean UI experience.",
      tech: ["React", "JavaScript", "CSS", "HTML"],
      img: project3,
      github: "https://github.com/lauralouieroy/kairo",
      demo: "https://lauralouieroy.github.io/kairo/",
      role: "Frontend Development & UI/UX Design",
    },
    {
      title: "TOMS – Transaction Operational Management System",
      desc:
        "A system designed for SK Barangay to manage purchase requests, purchase orders, and operational transactions efficiently with centralized monitoring and reporting.",
      tech: ["PHP", "JavaScript", "CSS", "MySQL"],
      img: project4,
      github: "https://github.com/lauralouieroy/toms",
      demo: "#",
      role: "Fullstack Development",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [linkError, setLinkError] = useState("");
  const visibleCount = useVisibleCount();
  const canSlide = projects.length > visibleCount;

  const nextSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const handleLinkClick = (url, label) => {
    if (!url || url === "#") {
      setLinkError(`${label} is not available yet.`);
      return;
    }

    setLinkError("");
    window.open(url, "_blank");
  };

  const visibleProjects = Array.from({ length: visibleCount }, (_, i) => {
    return projects[(startIndex + i) % projects.length];
  });

  return (
    <>
      <ScrollReveal>
        <section id="projects" className="projects">
          <div className="project-container">
            <div className="project-header">
              <div>
                <p className="project-label">FEATURED PROJECTS</p>

                <h1 className="section-title">
                  Some things <span>I’ve built</span>
                </h1>
              </div>

              <div className="carousel-controls">
                <button onClick={prevSlide} disabled={!canSlide}>
                  <FaArrowLeft />
                </button>

                <button onClick={nextSlide} disabled={!canSlide}>
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div className="project-grid">
              {visibleProjects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="project-card"
                  onClick={() => {
                    setSelectedProject(project);
                    setLinkError("");
                  }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="project-image"
                  />

                  <div className="project-content">
                    <h2>{project.title}</h2>

                    <p>{project.desc}</p>

                    <div className="tech-tags">
                      {project.tech.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>

                    <button className="view-btn">
                      View Project <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {selectedProject && (
        <div className="project-modal">
          <div className="project-modal-content">
            <button
              className="close-modal"
              onClick={() => setSelectedProject(null)}
            >
              <FaTimes />
            </button>

            <img
              src={selectedProject.img}
              alt={selectedProject.title}
              className="modal-image"
            />

            <h2>{selectedProject.title}</h2>

            <p>{selectedProject.desc}</p>

            <h4>My Role</h4>
            <p>{selectedProject.role}</p>

            <div className="modal-tags">
              {selectedProject.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            <div className="modal-actions">
              <button
                onClick={() =>
                  handleLinkClick(selectedProject.github, "GitHub")
                }
              >
                <FaGithub /> GitHub
              </button>

              <button
                onClick={() =>
                  handleLinkClick(selectedProject.demo, "Live Demo")
                }
              >
                <FaExternalLinkAlt /> Live Demo
              </button>
            </div>

            {linkError && <p className="link-error">{linkError}</p>}
          </div>
        </div>
      )}
    </>
  );
};
