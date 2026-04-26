// Experience.jsx

import { useEffect, useState } from "react";
import "./Experience.css";
import {
  FaCode,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import { ScrollReveal } from "./Utils/ScrollReveal";

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      title: "Regular Programmer",
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
    <ScrollReveal>
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="experience-header">
          <p className="experience-label">EXPERIENCE</p>

          <h2 className="experience-title">
            My Career <span>Journey</span>
          </h2>
        </div>

        <div className="timeline">
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
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
};