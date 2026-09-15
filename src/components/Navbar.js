import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaBars,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = [
      "about",
      "experience",
      "technology",
      "projects",
      "blog",
    ];

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      let currentSection = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (
            rect.top <= window.innerHeight * 0.35 &&
            rect.bottom >= window.innerHeight * 0.35
          ) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar-container ${scrolled ? "navbar-scrolled" : "navbar-top"} ${
        menuOpen ? "menu-open-container" : ""
      }`}
    >
      <nav className={`navbar ${menuOpen ? "menu-open" : ""}`}>
        <div className="logo-box">
          <div className="logo-text">
            <span className="logo-initials">LL</span>
            <div className="logo-copy">
              <span className="logo-name">LOUIE ROY F. LAURA</span>
              <span className="logo-tagline">Software Engineer</span>
            </div>
          </div>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <div className="mobile-menu-logo">
            <div className="mobile-logo-box">LL</div>
          </div>

          <li>
            <a
              href="#about"
              onClick={closeMenu}
              className={activeSection === "about" ? "active-link" : ""}
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#experience"
              onClick={closeMenu}
              className={activeSection === "experience" ? "active-link" : ""}
            >
              Experience
            </a>
          </li>

          <li>
            <a
              href="#technology"
              onClick={closeMenu}
              className={activeSection === "technology" ? "active-link" : ""}
            >
              Technology
            </a>
          </li>

          <li>
            <a
              href="#projects"
              onClick={closeMenu}
              className={activeSection === "projects" ? "active-link" : ""}
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#blog"
              onClick={closeMenu}
              className={activeSection === "blog" ? "active-link" : ""}
            >
              Blogs
            </a>
          </li>

          <div className="mobile-social-icons">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </ul>

        <a href="#footer" className="nav-cta">
          Let&apos;s Connect <FaArrowUp style={{ transform: "rotate(45deg)" }} />
        </a>

        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>
    </header>
  );
};
