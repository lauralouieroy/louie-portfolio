import { useEffect, useState } from "react";
import {
  FaAngular,
  FaAws,
  FaCss3Alt,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileWord,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLightbulb,
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaReact,
  FaExchangeAlt,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { TbBrandAws, TbTestPipe } from "react-icons/tb";
import {
  SiJavascript,
  SiMysql,
  SiSpringboot,
  SiTypescript,
  SiFigma,
  SiCanva,
  SiDiagramsdotnet,
  SiLucid,
  SiMermaid,
  SiGoogledocs,
  SiGooglesheets,
  SiSass,
  SiMui,
  SiTailwindcss,
  SiBootstrap,
  SiPhp,
  SiPostman,
  SiJsonwebtokens,
  SiKeycloak,
  SiApachecassandra,
  SiDocker,
  SiGitlab,
  SiGithub,
  SiJira,
  SiConfluence,
  SiZoom,
  SiGooglemeet,
  SiDiscord,
  SiIntellijidea,
  SiEclipseide,
  SiSublimetext,
  SiNotepadplusplus,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import { ScrollReveal } from "./Utils/ScrollReveal";
import "./Technology.css";

const categories = [
  {
    id: "01",
    title: "Design & Planning",
    description: "Turn ideas into meaningful experiences.",
    tone: "rose",
    icon: <FaLightbulb />,
    tools: [
      { name: "Figma", icon: <SiFigma style={{ color: "#F24E1E" }} /> },
      { name: "Adobe Photoshop", icon: <DiPhotoshop style={{ color: "#31A8FF" }} /> },
      { name: "Canva", icon: <SiCanva style={{ color: "#00C4CC" }} /> },
      { name: "Draw.io / diagrams.net", icon: <SiDiagramsdotnet style={{ color: "#F2A60A" }} /> },
      { name: "Lucidchart", icon: <SiLucid style={{ color: "#FF8060" }} /> },
      { name: "Mermaid", icon: <SiMermaid style={{ color: "#FF3670" }} /> },
      { name: "Microsoft Word", icon: <FaFileWord style={{ color: "#2B579A" }} /> },
      { name: "Excel", icon: <FaFileExcel style={{ color: "#217346" }} /> },
      { name: "PowerPoint", icon: <FaFilePowerpoint style={{ color: "#D24726" }} /> },
      { name: "Google Docs", icon: <SiGoogledocs style={{ color: "#4285F4" }} /> },
      { name: "Google Sheets", icon: <SiGooglesheets style={{ color: "#34A853" }} /> },
    ],
  },
  {
    id: "02",
    title: "Frontend Development",
    description: "Build modern, responsive and user-friendly interfaces.",
    tone: "sky",
    icon: <FaCode />,
    tools: [
      { name: "Angular", icon: <FaAngular style={{ color: "#DD0031" }} /> },
      { name: "React", icon: <FaReact style={{ color: "#61DBFB" }} /> },
      { name: "TypeScript", icon: <SiTypescript style={{ color: "#3178C6" }} /> },
      { name: "JavaScript", icon: <SiJavascript style={{ color: "#F7DF1E" }} /> },
      { name: "HTML5", icon: <FaHtml5 style={{ color: "#E34F26" }} /> },
      { name: "CSS3", icon: <FaCss3Alt style={{ color: "#1572B6" }} /> },
      { name: "SCSS / Sass", icon: <SiSass style={{ color: "#CC6699" }} /> },
      { name: "Angular Material", icon: <SiMui style={{ color: "#007FFF" }} /> },
      { name: "Bootstrap", icon: <SiBootstrap style={{ color: "#7952B3" }} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
      { name: "Playwright", icon: <TbTestPipe style={{ color: "#2EAD33" }} /> },
    ],
  },
  {
    id: "03",
    title: "Backend Development",
    description: "Create scalable and secure server-side solutions.",
    tone: "mint",
    icon: <FaServer />,
    tools: [
      { name: "Java", icon: <FaJava style={{ color: "#f89820" }} /> },
      { name: "Spring Boot", icon: <SiSpringboot style={{ color: "#6DB33F" }} /> },
      { name: "PHP", icon: <SiPhp style={{ color: "#777BB4" }} /> },
      { name: "Payara Server", icon: <FaServer style={{ color: "#1B75BB" }} /> },
      { name: "REST API", icon: <FaExchangeAlt style={{ color: "#5B8FD4" }} /> },
      { name: "Postman", icon: <SiPostman style={{ color: "#FF6C37" }} /> },
      { name: "JWT", icon: <SiJsonwebtokens style={{ color: "var(--navy)" }} /> },
      { name: "Keycloak", icon: <SiKeycloak style={{ color: "var(--navy-soft)" }} /> },
    ],
  },
  {
    id: "04",
    title: "Database & Cloud",
    description: "Manage data and deploy solutions reliably.",
    tone: "amber",
    icon: <FaDatabase />,
    tools: [
      { name: "MySQL", icon: <SiMysql style={{ color: "#4479A1" }} /> },
      { name: "Cassandra", icon: <SiApachecassandra style={{ color: "#1287B1" }} /> },
      { name: "AWS EC2", icon: <TbBrandAws style={{ color: "#FF9900" }} /> },
      { name: "AWS S3", icon: <FaAws style={{ color: "#FF9900" }} /> },
      { name: "Docker", icon: <SiDocker style={{ color: "#2496ED" }} /> },
    ],
  },
  {
    id: "05",
    title: "Tools & Collaboration",
    description: "Work efficiently and ship better, together.",
    tone: "violet",
    icon: <FaTools />,
    tools: [
      { name: "Git", icon: <FaGitAlt style={{ color: "#F05032" }} /> },
      { name: "GitHub", icon: <SiGithub style={{ color: "var(--navy)" }} /> },
      { name: "GitLab", icon: <SiGitlab style={{ color: "#FC6D26" }} /> },
      { name: "Jira", icon: <SiJira style={{ color: "#0052CC" }} /> },
      { name: "Confluence", icon: <SiConfluence style={{ color: "#2684FF" }} /> },
      { name: "Microsoft Teams", icon: <BiLogoMicrosoftTeams style={{ color: "#6264A7" }} /> },
      { name: "Zoom", icon: <SiZoom style={{ color: "#2D8CFF" }} /> },
      { name: "Google Meet", icon: <SiGooglemeet style={{ color: "#00897B" }} /> },
      { name: "Discord", icon: <SiDiscord style={{ color: "#5865F2" }} /> },
      { name: "Visual Studio Code", icon: <VscVscode style={{ color: "#007ACC" }} /> },
      { name: "IntelliJ IDEA", icon: <SiIntellijidea style={{ color: "var(--navy)" }} /> },
      { name: "Eclipse", icon: <SiEclipseide style={{ color: "var(--navy-soft)" }} /> },
      { name: "Sublime Text", icon: <SiSublimetext style={{ color: "#FF9800" }} /> },
      { name: "Notepad++", icon: <SiNotepadplusplus style={{ color: "#90E59A" }} /> },
    ],
  },
];

const PREVIEW_COUNT = 2;

export const Technology = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (!activeCategory) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveCategory(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCategory]);

  return (
    <ScrollReveal>
      <section id="technology" className="tech">
        <div className="tech-header">
          <p className="tech-label">TECHNOLOGIES</p>
          <h1>
            Technology <span>Stack</span>
          </h1>
          <p className="tech-intro">
            Tools and platforms I use to design, build, and ship reliable products.
          </p>
        </div>

        <div className="tech-categories">
          {categories.map((category) => {
            const previewTools = category.tools.slice(0, PREVIEW_COUNT);

            return (
              <article
                key={category.id}
                className={`tech-category tech-category--${category.tone}`}
              >
                <div className="tech-category-top">
                  <span className="tech-category-icon">{category.icon}</span>
                  <span className="tech-category-index">{category.id}</span>
                </div>

                <h3>{category.title}</h3>
                <p className="tech-category-desc">{category.description}</p>

                <div className="tech-tools">
                  {previewTools.map((tool) => (
                    <div key={tool.name} className="tech-tool">
                      <span className="tech-tool-icon">{tool.icon}</span>
                      <span className="tech-tool-name">{tool.name}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="tech-view-more"
                  onClick={() => setActiveCategory(category)}
                >
                  View more <FaArrowRight />
                </button>
              </article>
            );
          })}
        </div>

        {activeCategory && (
          <div
            className="tech-modal"
            onClick={() => setActiveCategory(null)}
            role="presentation"
          >
            <div
              className={`tech-modal-content tech-category--${activeCategory.tone}`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-modal-title"
            >
              <button
                type="button"
                className="tech-modal-close"
                onClick={() => setActiveCategory(null)}
                aria-label="Close"
              >
                <FaTimes />
              </button>

              <div className="tech-modal-header">
                <span className="tech-category-icon">{activeCategory.icon}</span>
                <div>
                  <p className="tech-modal-index">{activeCategory.id}</p>
                  <h2 id="tech-modal-title">{activeCategory.title}</h2>
                  <p>{activeCategory.description}</p>
                </div>
              </div>

              <div className="tech-modal-tools">
                {activeCategory.tools.map((tool) => (
                  <div key={tool.name} className="tech-tool">
                    <span className="tech-tool-icon">{tool.icon}</span>
                    <span className="tech-tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </ScrollReveal>
  );
};
