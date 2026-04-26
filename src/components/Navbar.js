import { useEffect, useState } from "react";
import {
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
      let currentSection = "";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section) {
          const rect = section.getBoundingClientRect();

          /* active only when section is centered in viewport */
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

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo-box">
          <div className="logo-text">
            <span className="logo-initials">LL</span>
            <span className="logo-name">
              LOUIE LAURA
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#about"
              onClick={closeMenu}
              className={
                activeSection === "about"
                  ? "active-link"
                  : ""
              }
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#experience"
              onClick={closeMenu}
              className={
                activeSection === "experience"
                  ? "active-link"
                  : ""
              }
            >
              Experience
            </a>
          </li>

          <li>
            <a
              href="#technology"
              onClick={closeMenu}
              className={
                activeSection === "technology"
                  ? "active-link"
                  : ""
              }
            >
              Technology
            </a>
          </li>

          <li>
            <a
              href="#projects"
              onClick={closeMenu}
              className={
                activeSection === "projects"
                  ? "active-link"
                  : ""
              }
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#blog"
              onClick={closeMenu}
              className={
                activeSection === "blog"
                  ? "active-link"
                  : ""
              }
            >
              Blogs
            </a>
          </li>

          {/* Mobile Socials */}
          <div className="mobile-social-icons">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaGithub />
            </a>
          </div>
        </ul>

        {/* Desktop Socials */}
        <div className="social-icons">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaLinkedin />
          </a>
          <a href="#">
            <FaGithub />
          </a>
        </div>

        {/* Mobile Toggle */}
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