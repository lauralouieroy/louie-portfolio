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

  return (
    <section id="technology" className="tech">
      <div className="tech-header">
        <p className="tech-label">TECHNOLOGIES</p>

        <h1>
          Technologies I <span>work with</span>
        </h1>
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