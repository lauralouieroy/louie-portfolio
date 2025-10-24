import profile from '../assets/Profilee.png'; // Replace with your photo
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="stats">
          <div>
            <h2>+200</h2>
            <p>Projects completed</p>
          </div>
          <div>
            <h2>+50</h2>
            <p>Startups raised</p>
          </div>
        </div>
        <div className="intro">
          <h1>Hello</h1>
          <p>
            — I’m <span className="highlight">Louie Laura</span>, a
            Programmer/Developer
          </p>
        </div>
        <p
          className="scroll"
          onClick={() => {
            const footer = document.getElementById('footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Scroll down ↓
        </p>
      </div>
      <div className="hero-right">
        <img src={profile} alt="Profile" className="profile-img" />
      </div>
    </section>
  );
};
