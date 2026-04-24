import "../components/Project.css";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

export const Project = () => {
  const projects = [
    {
      title: "Single Sign-On (SSO) Portal",
      desc: "Developed a centralized authentication system with admin dashboard, enabling secure access across multiple applications using token-based authentication.",
      tech: ["React", "Angular", "Java", "Spring Boot"],
      img: img1,
    },
    {
      title: "KYC Onboarding & Dashboard",
      desc: "Built onboarding and monitoring system for user verification, including dashboards for tracking and managing customer identity workflows.",
      tech: ["Angular", "Java", "REST API"],
      img: img2,
    },
    {
      title: "HR, Payroll & Timekeeping System",
      desc: "Contributed to internal systems for employee management, payroll processing, and time tracking with improved data accuracy and automation.",
      tech: ["Java", "Spring Boot", "MySQL"],
      img: img3,
    },
    {
      title: "Batch Processing Systems",
      desc: "Worked on backend batch jobs for credit card and loan inquiry processing, ensuring efficient and reliable data handling.",
      tech: ["Java", "SQL"],
      img: img4,
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="project-container">

        <h1 className="section-title">Projects</h1>

        <div className="project-list">
          {projects.map((project, index) => (
            <div key={index} className="project-item">

              {/* IMAGE */}
              <div className="project-image">
                <img src={project.img} alt={project.title} />
              </div>

              {/* CONTENT */}
              <div className="project-left">
                <h2>{project.title}</h2>
                <p>{project.desc}</p>

                <div className="tech-tags">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <div className="project-right">
                <button className="view-btn">View Details →</button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
