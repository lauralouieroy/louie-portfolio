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

        {/* DESKTOP NAV */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#technology" onClick={closeMenu}>Technology</a></li>
          <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="#blog" onClick={closeMenu}>Blogs</a></li>

          {/* Mobile Socials */}
          <div className="mobile-social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </ul>

        {/* Desktop Socials */}
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaGithub /></a>
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