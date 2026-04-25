import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
} from "react-icons/fa";
import "./Project.css";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";

export const Project = () => {
  const projects = [
    {
      title: "Single Sign-On (SSO) Portal",
      desc:
        "Developed a centralized authentication system with admin dashboard, enabling secure access across multiple applications.",
      tech: ["React", "Angular", "Java", "Spring Boot"],
      img: img1,
      github: "#",
      demo: "#",
      role: "Frontend + Backend Development",
    },
    {
      title: "KYC Onboarding & Dashboard",
      desc:
        "Built onboarding and monitoring system for user verification and customer identity workflows.",
      tech: ["Angular", "Java", "REST API"],
      img: img2,
      github: "#",
      demo: "#",
      role: "Frontend + API Integration",
    },
    {
      title: "HR, Payroll & Timekeeping System",
      desc:
        "Contributed to employee management, payroll processing, and timekeeping systems.",
      tech: ["Java", "Spring Boot", "MySQL"],
      img: img3,
      github: "#",
      demo: "#",
      role: "Backend Development",
    },
    {
      title: "Batch Processing Systems",
      desc:
        "Worked on backend batch jobs for credit card and loan inquiry processing.",
      tech: ["Java", "SQL"],
      img: img4,
      github: "#",
      demo: "#",
      role: "Backend Processing",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const nextSlide = () => {
    if (projects.length <= 3) return;

    setStartIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (projects.length <= 3) return;

    setStartIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

const isMobile = window.innerWidth <= 900;

const visibleProjects = isMobile
  ? [projects[startIndex]]
  : projects.length <= 3
  ? projects
  : [
      projects[startIndex],
      projects[(startIndex + 1) % projects.length],
      projects[(startIndex + 2) % projects.length],
    ];

  return (
    <>
      <section id="projects" className="projects">
        <div className="project-container">
          {/* HEADER */}
          <div className="project-header">
            <div>
              <p className="project-label">FEATURED PROJECTS</p>

              <h1 className="section-title">
                Some things <span>I’ve built</span>
              </h1>
            </div>

            {/* ARROWS */}
            <div className="carousel-controls">
              <button
                onClick={prevSlide}
                disabled={projects.length <= 3}
              >
                <FaArrowLeft />
              </button>

              <button
                onClick={nextSlide}
                disabled={projects.length <= 3}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* PROJECT GRID */}
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => setSelectedProject(project)}
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
                    View Details <FaExternalLinkAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
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
              <a href={selectedProject.github}>
                <FaGithub /> GitHub
              </a>

              <a href={selectedProject.demo}>
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};