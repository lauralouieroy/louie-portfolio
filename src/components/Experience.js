import exp1 from '../assets/img1.jpg';
import exp2 from '../assets/img2.jpg';
import exp3 from '../assets/img3.jpg';
import './Experience.css';

export const Experience = () => {
  const experiences = [
    {
      company: 'Creative Minds, New York, USA',
      period: 'February 2022 – Present',
      role: 'Senior Frontend Developer',
      tags: ['UI/UX', 'Branding'],
    },
    {
      company: 'Innovative Designs Inc, USA',
      period: 'January 2020 – February 2022',
      role: 'Frontend Developer',
      tags: ['UI/UX', 'Branding'],
    },
    {
      company: 'Visionary Creations Ltd, UK',
      period: 'February 2018 – Present',
      role: 'UI Engineer',
      tags: ['Branding', 'UI/UX'],
    },
  ];

  return (
    <section id="experience" className="experience">
      <div className="exp-header">
        <div>
          <h3>• Experiences</h3>
          <h1>Explore My Development Journey</h1>
        </div>
        <div className="exp-desc">
          <p>
            Over the past 4+ years, I’ve had the opportunity to work on a wide
            range of web applications — collaborating with diverse teams and
            clients to bring creative ideas to life.
          </p>
          <a href="#contact" className="exp-call">
            Book A Call ↗
          </a>
        </div>
      </div>

      <div className="exp-list">
        {experiences.map((exp, i) => (
          <div key={i} className="exp-item">
            <div className="exp-left">
              <h3>{exp.company}</h3>
              <p className="period">{exp.period}</p>
            </div>
            <div className="exp-right">
              <p>{exp.role}</p>
              <div className="tags">
                {exp.tags.map((tag, j) => (
                  <span key={j} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="exp-gallery">
        <img src={exp1} alt="project 1" />
        <img src={exp2} alt="project 2" />
        <img src={exp3} alt="project 3" />
        <div className="exp-summary">
          <p>
            From crafting seamless user experiences to leading frontend design
            initiatives, each project has strengthened my passion for solving
            digital design challenges.
          </p>
          <button className="arrow-btn">➜</button>
        </div>
      </div>
    </section>
  );
};
