import "./About.css";
import aboutProfile from "../assets/Profile.png";
import aboutBg from "../assets/about-bg.png";

export const About = () => {
  return (
    <section
      id="about"
      className="about"
      style={{
        backgroundImage: `url(${aboutBg})`,
      }}
    >
      {/* LEFT SIDE */}
      <div className="about-left">
        <p className="about-label">✦ ABOUT ME</p>

        <h2 className="about-title">
          Passionate about
          <br />
          code and <span>creativity.</span>
        </h2>

        <p className="about-description">
          I’m <strong>Louie Roy F. Laura</strong>, a Software Engineer who
          enjoys building modern web applications with clean architecture,
          scalable systems, and intuitive user experiences.
        </p>

        <p className="about-description">
          I have worked on enterprise-level applications including SSO portals,
          onboarding systems, HR platforms, payroll systems, and internal
          business applications using React, Angular, Java, and Spring Boot.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="about-right">
        <div className="about-image-box">
          <img
            src={aboutProfile}
            alt="About Profile"
            className="about-img"
          />

          <div className="experience-card">
            <h3>3+</h3>
            <p>Years of Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};