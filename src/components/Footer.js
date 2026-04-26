import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaArrowUp,
  FaArrowRight,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../components/Footer.css";

export const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        {/* LEFT SIDE */}
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">LL</div>
            <span>LOUIE LAURA</span>
          </div>

          <p>
            Building digital solutions with
            <br />
            passion and purpose.
          </p>

          <div className="footer-socials">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaLinkedinIn />
            </a>
            <a href="#">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#technology">Technology</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blogs</a>
        </div>

        {/* LET'S CONNECT */}
        <div className="footer-column footer-connect">
          <h4>Let’s Connect</h4>

          <p>
            Have a project in mind?
            <br />
            Let’s build something great together.
          </p>

          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope />
              <span>lauralouieroy@gmail.com</span>
            </div>

            <div className="contact-item">
              <FaPhoneAlt />
              <span>09569187196</span>
            </div>

            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>GMA, Cavite</span>
            </div>
          </div>

          <a href="mailto:lauralouieroy@gmail.com" className="footer-btn">
            Get In Touch <FaArrowRight />
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Louie Laura. All rights reserved.</p>

        <a href="#hero" className="back-to-top">
          Back to top <FaArrowUp />
        </a>
      </div>
    </footer>
  );
};