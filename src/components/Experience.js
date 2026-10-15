// Experience.jsx

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Experience.css";
import {
  FaCode,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const REVEAL_EASE = [0.22, 1, 0.36, 1];

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0, amount = 0.4) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: { duration: reduceMotion ? 0.3 : 0.7, delay, ease: REVEAL_EASE },
  });

  const experiences = [
    {
      year: "2018",
      title: "Hello World",
      company: "Started Programming Journey",
      period: "The Beginning",
      icon: <FaCode />,
      side: "right",
      description: [
        "Wrote my first line of code and discovered my passion for software development.",
        "Started learning problem solving, logic building, and software fundamentals.",
        "Developed strong interest in creating digital solutions and modern applications.",
      ],
    },

    {
      year: "2022",
      title: "IT and CAYDO",
      company: "Municipality of Carmona, Cavite",
      period: "March 2022 – March 2023",
      icon: <FaBuilding />,
      side: "left",
      description: [
        "Managing data, information, materials, documents, and social media.",
        "Facilitating activities, events, and community services in the municipality.",
        "Producing reports, presentations, and flyers for internal operations.",
        "Creating layout design for publication materials and documentation.",
        "Assisting in technical needs and support across departments.",
        "Development and maintenance of the WordPress site.",
      ],
    },

    {
      year: "2023 - Present",
      title: "Software Engineer",
      company: "SVI Software Service Corporation",
      period: "August 2023 – Present",
      icon: <FaBriefcase />,
      side: "right",
      description: [
        "Built and enhanced an Authentication System with Single Sign-On (SSO) Portal.",
        "Developed KYC Onboarding systems with biometric login and OCR-based ID verification.",
        "Created batch processing programs for credit card approval and onboarding.",
        "Developed loan processing APIs and automated report generation systems.",
        "Enhanced employee timekeeping, payroll, and HR management systems.",
        "Integrated Keycloak-based access control and role management solutions.",
        "Improved dealership record systems through automation and bulk uploads.",
      ],
    },
  ];

  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              entry.target.getAttribute("data-index")
            );
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience">
      <svg className="experience-connector" viewBox="0 0 24 80" aria-hidden="true">
        <motion.path
          d="M12 0 C12 22 6 30 12 52 L12 62"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: REVEAL_EASE }}
        />
        <g transform="rotate(45 12 68)">
          <motion.rect
            x="9"
            y="65"
            width="6"
            height="6"
            rx="1"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.7, ease: REVEAL_EASE }}
          />
        </g>
      </svg>

      <div className="experience-container">
        <motion.div className="experience-header" {...reveal()}>
          <p className="experience-label">EXPERIENCE</p>

          <h2 className="experience-title">
            My Career <span>Journey</span>
          </h2>
        </motion.div>

        <motion.div className="timeline" {...reveal(0.1, 0.05)}>
          {experiences.map((item, index) => (
            <div
              key={index}
              data-index={index}
              className={`timeline-item ${item.side} ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="timeline-content">
                <span className="timeline-year">
                  {item.year}
                </span>

                <h3>{item.title}</h3>

                <h4>{item.company}</h4>

                <p className="timeline-period">
                  {item.period}
                </p>

                <ul>
                  {item.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>

              <div className="timeline-icon">
                {item.icon}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};