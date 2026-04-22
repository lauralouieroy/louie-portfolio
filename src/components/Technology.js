import {
  FaAngular,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaJava,
  FaReact,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMysql,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";

import "./Technology.css";

export const Technology = () => {
  const techs = [
    { name: "React", icon: <FaReact /> },
    { name: "Angular", icon: <FaAngular /> },
    { name: "Java", icon: <FaJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Docker", icon: <FaDocker /> },
    { name: "AWS", icon: <FaAws /> },
    { name: "Git", icon: <FaGitAlt /> },
  ];

  return (
    <section id="technology" className="tech">
      <div className="tech-header">
        <h1>Technologies Stack</h1>
      </div>

      <div className="tech-grid">
        {techs.map((tech, index) => (
          <div key={index} className="tech-card">
            <div className="icon">{tech.icon}</div>
            <p>{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
