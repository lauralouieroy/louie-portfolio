import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Navbar.css';

export const Navbar = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="logo-box">
          <div className="logo-text">
            <span className="logo-initials">LL</span>
            <span className="logo-name">LOUIE LAURA</span>
          </div>
        </div>

        {/* Center Links */}
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#technology">Technology</a>
          </li>
          <li>
            <a href="#project">Projects</a>
          </li>
          <li>
            <a href="#blog">Blogs</a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="social-icons">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </div>
      </nav>
    </header>
  );
};
