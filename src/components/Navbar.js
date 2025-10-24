import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">⚡</div>
      <ul className="nav-links">
        <li><a href="#about">About Me</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#blog">Blog</a></li>
      </ul>
      <a href="#contact" className="book-call">
        Book A Call ↗
      </a>
    </nav>
  );
};
