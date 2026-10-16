import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import "./Experience.css";
import {
  FaCode,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const REVEAL_EASE = [0.22, 1, 0.36, 1];
const SKIN = "#f3c9a5";
const SHOE = "#232a3d";
const HAIR = "#2b2230";

/* graduate → Hello World, worker → IT/CAYDO, programmer → Software Engineer */
const ROLES = ["graduate", "worker", "programmer"];

const Head = ({ cap }) => (
  <g>
    <circle cx="12" cy="6.5" r="4.6" fill={SKIN} />
    <path
      d="M7.4 6.2 A4.6 4.6 0 0 1 16.6 6.2 L16.6 5.2 Q12 0.4 7.4 5.2 Z"
      fill={HAIR}
    />
    <circle cx="14.4" cy="6.8" r="0.7" fill={HAIR} />
    {cap === "mortarboard" && (
      <g>
        <rect x="5.5" y="2.2" width="13" height="2.2" rx="0.4" fill="#1a202c" />
        <polygon points="12,0.4 20.5,3.2 12,5.8 3.5,3.2" fill="#1a202c" />
        <path d="M18.2 3.2 Q20 7 18.8 10.5" stroke="#c9a227" strokeWidth="0.9" fill="none" strokeLinecap="round" />
        <circle cx="18.8" cy="10.8" r="1.1" fill="#c9a227" />
      </g>
    )}
    {cap === "worker" && (
      <path d="M7 5.2 Q12 1.6 17 5.2 L17.6 6.2 Q12 4.4 6.4 6.2 Z" fill="#2c4a6e" />
    )}
    {cap === "hoodie" && (
      <path d="M7.2 5.4 Q12 1.2 16.8 5.4 L17.2 9.5 Q12 11.2 6.8 9.5 Z" fill="#3d4f6f" opacity="0.95" />
    )}
  </g>
);

const Legs = ({ pants, shoes }) => (
  <>
    <g className="timeline-walker-limb timeline-walker-limb--back-leg">
      <rect x="10.2" y="26" width="3.6" height="15" rx="1.8" fill={pants} />
      <rect x="10" y="39.5" width="5.5" height="2.8" rx="1.4" fill={shoes} />
    </g>
    <g className="timeline-walker-limb timeline-walker-limb--front-leg">
      <rect x="10.2" y="26" width="3.6" height="15" rx="1.8" fill={pants} />
      <rect x="10" y="39.5" width="5.5" height="2.8" rx="1.4" fill={shoes} />
    </g>
  </>
);

const FrontArm = ({ shirt, prop }) => (
  <g className="timeline-walker-limb timeline-walker-limb--front-arm">
    <rect x="10.5" y="13" width="3" height="11" rx="1.5" fill={shirt} />
    <circle cx="12" cy="23.5" r="1.6" fill={SKIN} />
    {prop === "diploma" && (
      <g>
        <rect x="13.2" y="20.5" width="7" height="3.2" rx="0.6" fill="#f4efe4" stroke="#d4c8b0" strokeWidth="0.4" />
        <rect x="18.8" y="20.8" width="1.4" height="2.6" fill="#c9a227" />
      </g>
    )}
    {prop === "folder" && (
      <rect x="13" y="19.5" width="7.5" height="5.5" rx="0.8" fill="#e8b84a" />
    )}
    {prop === "laptop" && (
      <g>
        <rect x="12.5" y="20" width="8" height="5.5" rx="0.8" fill="#c3cfe2" />
        <rect x="13.2" y="20.6" width="6.6" height="3.6" rx="0.4" fill="#2b3648" />
      </g>
    )}
  </g>
);

const TimelineWalker = ({ role }) => {
  const looks = {
    graduate: {
      shirt: "#1a202c",
      pants: "#1a202c",
      shoes: SHOE,
      cap: "mortarboard",
      prop: "diploma",
      extra: "gown",
    },
    worker: {
      shirt: "#2f6fed",
      pants: "#3b4a6b",
      shoes: "#4a5568",
      cap: "worker",
      prop: "folder",
      extra: "badge",
    },
    programmer: {
      shirt: "#3d4f6f",
      pants: "#2c3550",
      shoes: "#5b8fd4",
      cap: "hoodie",
      prop: "laptop",
      extra: null,
    },
  }[role];

  return (
    <svg viewBox="0 0 28 44" className="timeline-walker-svg" aria-hidden="true">
      <g className="timeline-walker-limb timeline-walker-limb--back-arm">
        <rect x="10.5" y="13" width="3" height="11" rx="1.5" fill={looks.shirt} />
      </g>
      <Legs pants={looks.pants} shoes={looks.shoes} />

      {looks.extra === "gown" && (
        <path d="M6 12 Q12 10 18 12 L19 28 Q12 31 5 28 Z" fill="#1a202c" />
      )}

      <rect x="8" y="11.5" width="8" height="16" rx="3.5" fill={looks.shirt} />

      {looks.extra === "badge" && (
        <rect x="14.5" y="14" width="3.2" height="4" rx="0.5" fill="#ffd27a" stroke="#c9a227" strokeWidth="0.4" />
      )}

      <Head cap={looks.cap} />
      <FrontArm shirt={looks.shirt} prop={looks.prop} />
    </svg>
  );
};

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const walkerTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        <motion.div className="timeline" ref={timelineRef} {...reveal(0.1, 0.05)}>
          <motion.div
            className="timeline-progress"
            style={{ height: reduceMotion ? "100%" : progressHeight }}
            aria-hidden="true"
          />

          <motion.div
            className={`timeline-walker${reduceMotion ? " is-static" : ""}`}
            style={reduceMotion ? undefined : { top: walkerTop }}
            aria-hidden="true"
          >
            <div className="timeline-walker-body">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={ROLES[activeIndex] || "graduate"}
                  className="timeline-walker-outfit"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.82 }}
                  transition={{ duration: 0.28, ease: REVEAL_EASE }}
                >
                  <TimelineWalker role={ROLES[activeIndex] || "graduate"} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

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
