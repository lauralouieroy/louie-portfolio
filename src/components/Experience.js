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
  FaArrowRight,
  FaCode,
  FaBuilding,
  FaBriefcase,
  FaTerminal,
  FaLandmark,
  FaLaptopCode,
  FaTimes,
} from "react-icons/fa";
import carmonaSeal from "../assets/experience/carmona-seal.png";
import cvsuLogo from "../assets/experience/cvsu-logo.png";
import sviLogo from "../assets/experience/svi-logo.png";

const REVEAL_EASE = [0.22, 1, 0.36, 1];
const SKIN = "#f3c9a5";
const SHOE = "#232a3d";
const HAIR = "#2b2230";

/* graduate → Hello World, worker → IT/CAYDO, programmer → Software Engineer */
const ROLES = ["graduate", "worker", "programmer"];
const ROLE_PROPS = ["book", "community", "laptop"];

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

const Prop = ({ prop }) => {
  if (prop === "book") {
    return (
      <g transform="translate(13.2 18.8)">
        <rect x="0" y="1.2" width="8.2" height="6.2" rx="0.7" fill="#5b8fd4" />
        <rect x="0.5" y="1.7" width="3.2" height="5.2" rx="0.3" fill="#e8f0fa" />
        <rect x="4.2" y="1.7" width="3.5" height="5.2" rx="0.3" fill="#c9dcf5" />
        <path d="M4 1.7 L4 6.9" stroke="#2d5faf" strokeWidth="0.55" />
      </g>
    );
  }

  if (prop === "community") {
    return (
      <g transform="translate(12.2 18)">
        <circle cx="3.2" cy="3.2" r="1.5" fill={SKIN} />
        <rect x="2.2" y="4.7" width="2" height="3" rx="0.8" fill="#2f6fed" />
        <circle cx="7.2" cy="3" r="1.5" fill={SKIN} />
        <rect x="6.2" y="4.5" width="2" height="3.2" rx="0.8" fill="#48a39a" />
        <circle cx="5.2" cy="6.8" r="1.35" fill={SKIN} />
        <rect x="4.3" y="8.1" width="1.8" height="2.6" rx="0.7" fill="#e0b400" />
        <rect x="9.4" y="4.2" width="4.6" height="5.8" rx="0.7" fill="#2b3648" />
        <rect x="9.9" y="4.7" width="3.6" height="3.8" rx="0.35" fill="#7eaaea" />
      </g>
    );
  }

  if (prop === "laptop") {
    return (
      <g transform="translate(12.2 19.2)">
        <rect x="0.4" y="0" width="9.2" height="6.2" rx="0.9" fill="#c3cfe2" />
        <rect x="1.1" y="0.7" width="7.8" height="4.2" rx="0.45" fill="#2b3648" />
        <rect x="0" y="6" width="10" height="1.5" rx="0.4" fill="#9dbde9" />
        <rect x="3.2" y="1.5" width="3.6" height="0.45" rx="0.2" fill="#5b8fd4" opacity="0.9" />
        <rect x="2.4" y="2.5" width="5.2" height="0.4" rx="0.2" fill="#7eaaea" opacity="0.75" />
        <rect x="2.4" y="3.4" width="4.2" height="0.4" rx="0.2" fill="#7eaaea" opacity="0.55" />
      </g>
    );
  }

  return null;
};

const FrontArm = ({ shirt, prop }) => (
  <g className="timeline-walker-limb timeline-walker-limb--front-arm">
    <rect x="10.5" y="13" width="3" height="11" rx="1.5" fill={shirt} />
    <circle cx="12" cy="23.5" r="1.6" fill={SKIN} />
    <Prop prop={prop} />
  </g>
);

/* Large prop icon that peeks over the experience card roof (not the person). */
const CardPropIcon = ({ prop }) => {
  if (prop === "book") {
    return (
      <svg
        viewBox="0 0 72 52"
        className="timeline-card-prop-svg timeline-card-prop-svg--book"
        aria-hidden="true"
      >
        <rect x="32" y="8" width="8" height="40" rx="2" fill="#2d5faf" />
        <g className="prop-book-page prop-book-page--3">
          <path d="M36 10 H58 Q62 10 62 14 V42 Q62 46 58 46 H36 Z" fill="#f4f7fb" />
        </g>
        <g className="prop-book-page prop-book-page--2">
          <path d="M36 10 H56 Q60 10 60 14 V42 Q60 46 56 46 H36 Z" fill="#e8f0fa" />
        </g>
        <g className="prop-book-page prop-book-page--1">
          <path d="M36 10 H54 Q58 10 58 14 V42 Q58 46 54 46 H36 Z" fill="#d5e4f7" />
          <path d="M40 18 H52 M40 24 H50 M40 30 H52" stroke="#5b8fd4" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <g className="prop-book-cover-left">
          <path d="M36 10 H14 Q10 10 10 14 V42 Q10 46 14 46 H36 Z" fill="#5b8fd4" />
          <path d="M16 18 H30 M16 24 H28 M16 30 H30" stroke="#e8f0fa" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        </g>
      </svg>
    );
  }

  if (prop === "community") {
    return (
      <svg
        viewBox="0 0 84 54"
        className="timeline-card-prop-svg timeline-card-prop-svg--community"
        aria-hidden="true"
      >
        {/* People / community cluster */}
        <g className="prop-community-people">
          <circle cx="18" cy="14" r="6.5" fill={SKIN} />
          <path d="M11.5 14 Q18 8 24.5 14" fill="#2b2230" />
          <rect x="12.5" y="20" width="11" height="16" rx="5" fill="#2f6fed" />
          <circle cx="34" cy="12" r="6.5" fill={SKIN} />
          <path d="M27.5 12 Q34 6 40.5 12" fill="#2b2230" />
          <rect x="28.5" y="18" width="11" height="16" rx="5" fill="#48a39a" />
          <circle cx="26" cy="22" r="5.5" fill={SKIN} />
          <rect x="21" y="27" width="10" height="14" rx="4.5" fill="#e0b400" />
        </g>
        {/* IT / device for youth officer + tech */}
        <g className="prop-community-device">
          <rect x="48" y="10" width="30" height="36" rx="4" fill="#2b3648" />
          <rect x="51.5" y="13.5" width="23" height="26" rx="2" fill="#1a2538" />
          <g className="prop-community-screen">
            <rect x="54" y="17" width="12" height="2" rx="1" fill="#7eaaea" />
            <rect x="54" y="22" width="18" height="2" rx="1" fill="#5b8fd4" opacity="0.85" />
            <rect x="54" y="27" width="15" height="2" rx="1" fill="#48a39a" opacity="0.8" />
            <circle cx="63" cy="35" r="2.2" fill="#e0b400" />
          </g>
          <circle cx="63" cy="42.5" r="1.4" fill="#c3cfe2" />
        </g>
      </svg>
    );
  }

  if (prop === "laptop") {
    return (
      <svg
        viewBox="0 0 72 48"
        className="timeline-card-prop-svg timeline-card-prop-svg--laptop"
        aria-hidden="true"
      >
        <rect x="10" y="4" width="52" height="32" rx="4" fill="#c3cfe2" />
        <rect x="14" y="8" width="44" height="24" rx="2.5" fill="#152033" />
        <g className="prop-laptop-code">
          <text className="prop-code-line prop-code-line--1" x="18" y="15" fill="#7eaaea">
            const build = () =&gt; {"{"}
          </text>
          <text className="prop-code-line prop-code-line--2" x="22" y="22" fill="#48a39a">
            ship(impact);
          </text>
          <text className="prop-code-line prop-code-line--3" x="18" y="29" fill="#e0b400">
            {"}"};
          </text>
          <rect className="prop-code-caret" x="34" y="24.5" width="1.4" height="5" fill="#e8eef8" />
        </g>
        <rect x="4" y="36" width="64" height="8" rx="2" fill="#9dbde9" />
        <rect x="28" y="38.5" width="16" height="3" rx="1.5" fill="#5b8fd4" opacity="0.5" />
      </svg>
    );
  }

  return null;
};

const TimelineWalker = ({ role }) => {
  const looks = {
    graduate: {
      shirt: "#1a202c",
      pants: "#1a202c",
      shoes: SHOE,
      cap: "mortarboard",
      prop: "book",
      extra: "gown",
    },
    worker: {
      shirt: "#2f6fed",
      pants: "#3b4a6b",
      shoes: "#4a5568",
      cap: "worker",
      prop: "community",
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

const PREVIEW_COUNT = 2;

export const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState(null);
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
      year: "2018 – 2023",
      title: "Hello World",
      company: "Cavite State University — Carmona Campus",
      period: "Bachelor of Science in Information Technology · August 2018 – April 2023",
      icon: <FaCode />,
      cardIcon: <FaTerminal />,
      logo: cvsuLogo,
      logoAlt: "Cavite State University logo",
      side: "right",
      description: [
        "Began my programming journey while pursuing BSIT at Cavite State University — Carmona Campus.",
        "Built foundations in problem solving, software fundamentals, and modern application development.",
        "Grew from first lines of code into a passion for creating digital solutions that make an impact.",
      ],
    },

    {
      year: "2022",
      title: "IT and CAYDO",
      company: "City of Carmona, Cavite",
      period: "March 2022 – March 2023",
      icon: <FaBuilding />,
      cardIcon: <FaLandmark />,
      logo: carmonaSeal,
      logoAlt: "City of Carmona seal",
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
      company: "Software Ventures International – Software Service Corporation",
      period: "August 2023 – Present · Ortigas, Pasig City",
      icon: <FaBriefcase />,
      cardIcon: <FaLaptopCode />,
      logo: sviLogo,
      logoAlt: "SVI logo",
      side: "right",
      description: [
        "Built and enhanced a mobile-first Authentication and Single Sign-On (SSO) platform, enabling secure and responsive access across devices and applications.",
        "Integrated SSO with KYC Onboarding, KYC Viewer, SSO Administration, and Role-Based Access Management applications, supporting identity verification, user and access management, application integration, and secure onboarding workflows.",
        "Contributed to the modernization and development of a loan origination and credit information system by translating legacy business processes into a modern React and Spring Boot architecture, improving its foundation for scalability and future enhancements.",
        "Developed credit card batch-processing programs that load, encrypt, validate, and transmit customer KYC data to banking clients, improving the reliability of credit-card decisioning and onboarding workflows.",
        "Enhanced an employee timekeeping system with biometric clock in/out, shift scheduling, swap requests, and responsive mobile interfaces for attendance and leave management.",
        "Improved the payroll system by updating BIR, SSS, and HDMF reporting templates, enhancing 13th-month pay processing, and implementing version tracking to improve compliance and auditability.",
        "Integrated Keycloak-based role management into an HR file and access management system, centralizing authorization and strengthening secure access control.",
        "Developed a government transaction-processing module supporting multiple transaction types, validation workflows, and downstream batch processing.",
        "Automated bulk uploads and exception reporting for a dealership management system while linking customer and vehicle records, improving data consistency and reducing manual data handling.",
        "Mentored programmer trainees as an Instructor and Panelist, strengthening their understanding of usability, design practices, web services, and database integration through technical guidance and project evaluation.",
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

  useEffect(() => {
    if (!selectedExperience) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedExperience(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedExperience]);

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

          {experiences.map((item, index) => {
            const preview = item.description.slice(0, PREVIEW_COUNT);

            return (
              <div
                key={index}
                data-index={index}
                className={`timeline-item ${item.side} ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <button
                  type="button"
                  className="timeline-content"
                  onClick={() => setSelectedExperience(item)}
                  aria-label={`View details for ${item.title}`}
                >
                  {activeIndex === index && (
                    <div
                      className={`timeline-card-mascot is-active${
                        reduceMotion ? " is-static" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <div className="timeline-card-mascot-inner">
                        <CardPropIcon prop={ROLE_PROPS[index] || "book"} />
                      </div>
                    </div>
                  )}

                  <div className="timeline-card-top">
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-card-icon" aria-hidden="true">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt=""
                          className="timeline-org-logo"
                        />
                      ) : (
                        item.cardIcon
                      )}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <h4>{item.company}</h4>

                  <p className="timeline-period">{item.period}</p>

                  <ul className="timeline-preview">
                    {preview.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <span className="timeline-view-more">
                    View details <FaArrowRight />
                  </span>
                </button>

                <div className="timeline-icon">{item.icon}</div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {selectedExperience && (
        <div
          className="experience-modal"
          onClick={() => setSelectedExperience(null)}
          role="presentation"
        >
          <div
            className="experience-modal-content"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-modal-title"
          >
            <button
              type="button"
              className="experience-modal-close"
              onClick={() => setSelectedExperience(null)}
              aria-label="Close experience details"
            >
              <FaTimes />
            </button>

            <div className="experience-modal-header">
              {selectedExperience.logo ? (
                <img
                  src={selectedExperience.logo}
                  alt={selectedExperience.logoAlt || ""}
                  className="experience-modal-logo"
                />
              ) : (
                <span className="experience-modal-icon" aria-hidden="true">
                  {selectedExperience.cardIcon}
                </span>
              )}
              <div>
                <p className="experience-modal-year">
                  {selectedExperience.year}
                </p>
                <h2 id="experience-modal-title">{selectedExperience.title}</h2>
                <h3>{selectedExperience.company}</h3>
                <p className="experience-modal-period">
                  {selectedExperience.period}
                </p>
              </div>
            </div>

            <h4>Highlights</h4>
            <ul className="experience-modal-list">
              {selectedExperience.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
