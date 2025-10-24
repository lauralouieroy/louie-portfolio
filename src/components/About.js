import './About.css';

export const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-left">
        <h2>About Me</h2>
        <p>
          I’m <strong>Louie Laura</strong>, a passionate Frontend Developer with
          a love for building elegant, user-centered web interfaces. My focus is
          on crafting smooth, responsive, and performant experiences using
          modern technologies like React.js, JavaScript, and CSS.
        </p>
        <p>
          With a strong eye for detail and design, I aim to bring creativity and
          clarity into every project I take on — transforming complex ideas into
          simple, beautiful, and functional digital solutions.
        </p>
      </div>
      <div className="about-right">
        <ul>
          <li>
            <strong>Frontend:</strong> React.js, HTML, CSS, JavaScript
          </li>
          <li>
            <strong>Backend:</strong> Java, PHP
          </li>
          <li>
            <strong>Tools:</strong> Git, Docker, AWS, VS Code, Eclipse
          </li>
          <li>
            <strong>Other:</strong> WordPress, UI/UX Collaboration
          </li>
        </ul>
      </div>
    </section>
  );
};
