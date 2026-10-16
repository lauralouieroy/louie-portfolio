import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaLaptopCode,
  FaPhp,
  FaReact,
  FaSitemap,
  FaTrophy,
  FaUsers,
} from "react-icons/fa";
import { MediaTile } from "./MediaTile";
import { ScrollReveal } from "./Utils/ScrollReveal";
import "./Certificates.css";

/* sortKey = YYYY-MM; list is newest → oldest. */
const CERTIFICATES = [
  {
    title: "Engaging in a Community-Based Software Project",
    issuer: "ISTA — IT Education",
    dateLabel: "2021",
    sortKey: "2021-01",
    kind: "Seminar",
    tone: "#48a39a",
    icon: FaUsers,
  },
  {
    title: "DevFest 2021: Webinar Series",
    issuer: "Exceed Philippines & ALPHA",
    dateLabel: "2021",
    sortKey: "2021-02",
    kind: "Seminar",
    tone: "#4285F4",
    icon: FaLaptopCode,
  },
  {
    title: "TechNow 2021: Web Dev Trilogy",
    issuer: "Exceed Philippines",
    dateLabel: "2021",
    sortKey: "2021-03",
    kind: "Seminar",
    tone: "#3d8bfd",
    icon: FaLaptopCode,
  },
  {
    title: "PHP Full Stack Web Developer Bootcamp",
    issuer: "Srinivas Vanamala · Udemy, Inc.",
    dateLabel: "2021",
    sortKey: "2021-04",
    kind: "Workshop",
    tone: "#777BB4",
    icon: FaPhp,
  },
  {
    title: "Best in Thesis (BSIT)",
    issuer: "Student Research Congress",
    dateLabel: "2022",
    sortKey: "2022-01",
    kind: "Achievement",
    tone: "#e0b400",
    icon: FaTrophy,
  },
  {
    title: "Career Service Professional Eligibility",
    issuer: "Civil Service Commission (CSC)",
    dateLabel: "2023",
    sortKey: "2023-01",
    kind: "Certification",
    tone: "#5b8fd4",
    icon: FaAward,
  },
  {
    title: "App Builders Hackathon — Participant",
    issuer: "SM Makati Cyberzone · StackOverFlowers (WARDEN)",
    dateLabel: "2026",
    sortKey: "2026-03",
    kind: "Hackathon",
    tone: "#22c55e",
    icon: FaLaptopCode,
  },
  {
    title: "Decomposing Large System",
    issuer: "Software Ventures International",
    dateLabel: "2025",
    sortKey: "2025-01",
    kind: "Workshop",
    tone: "#2d3748",
    icon: FaSitemap,
  },
  {
    title: "Agile Scrum Master",
    issuer: "Tanmay Panchal · Udemy, Inc.",
    dateLabel: "2026",
    sortKey: "2026-01",
    kind: "Workshop",
    tone: "#6b8cae",
    icon: FaUsers,
  },
  {
    title: "React — The Complete Guide with React Hook Redux",
    issuer: "Kim Chen · Udemy, Inc.",
    dateLabel: "2026",
    sortKey: "2026-02",
    kind: "Workshop",
    tone: "#149eca",
    icon: FaReact,
  },
].sort((a, b) => b.sortKey.localeCompare(a.sortKey));

function useVisibleCount() {
  /* null = show all (desktop); otherwise carousel page size */
  const getCount = () => {
    if (typeof window === "undefined") return null;
    if (window.innerWidth <= 900) return 1;
    if (window.innerWidth <= 1199) return 2;
    return null;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

export const Certificates = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = useVisibleCount();
  const isCarousel = visibleCount != null;
  const canSlide = isCarousel && CERTIFICATES.length > visibleCount;

  useEffect(() => {
    setStartIndex(0);
  }, [visibleCount]);

  const nextSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) => (prev + 1) % CERTIFICATES.length);
  };

  const prevSlide = () => {
    if (!canSlide) return;
    setStartIndex((prev) =>
      prev === 0 ? CERTIFICATES.length - 1 : prev - 1
    );
  };

  const visible = isCarousel
    ? Array.from({ length: visibleCount }, (_, i) => {
        return CERTIFICATES[(startIndex + i) % CERTIFICATES.length];
      })
    : CERTIFICATES;

  return (
    <ScrollReveal>
      <section id="certificates" className="certificates">
        <div className="certificates-container">
          <div className="certificates-header">
            <div>
              <p className="certificates-label">CREDENTIALS</p>
              <h1 className="section-title">
                Certificate &amp; <span>Learning</span>
              </h1>
            </div>

            {isCarousel && (
              <div className="carousel-controls certificates-carousel">
                <button
                  type="button"
                  onClick={prevSlide}
                  disabled={!canSlide}
                  aria-label="Previous certificates"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  disabled={!canSlide}
                  aria-label="Next certificates"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>

          <div className="certificates-grid">
            {visible.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <article
                  key={`${cert.title}-${cert.sortKey}-${index}`}
                  className="certificate-card"
                >
                  <MediaTile
                    tone={cert.tone}
                    label={cert.kind}
                    className="certificate-image"
                  >
                    <Icon />
                  </MediaTile>

                  <div className="certificate-content">
                    <p className="certificate-year">{cert.dateLabel}</p>
                    <h2>{cert.title}</h2>
                    <p className="certificate-issuer">{cert.issuer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};
