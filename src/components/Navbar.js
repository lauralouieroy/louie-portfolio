import { useState } from "react";
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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo-box">
          <div className="logo-text">
            <span className="logo-initials">LL</span>
            <span className="logo-name">LOUIE LAURA</span>
          </div>
        </div>

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>

          <li>
            <a href="#technology" onClick={closeMenu}>
              Technology
            </a>
          </li>

          <li>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
          </li>

          <li>
            <a href="#blog" onClick={closeMenu}>
              Blogs
            </a>
          </li>

          {/* MOBILE SOCIAL ICONS */}
          <div className="mobile-social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.linkedin.com/in/louie-laura-335719201/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://github.com/lauralouieroy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </ul>

        {/* DESKTOP SOCIAL ICONS */}
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.linkedin.com/in/louie-laura-335719201/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com/lauralouieroy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
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
