import './App.css';
import { About } from './components/About';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Project } from './components/Project';
import { Technology } from './components/Technology';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Technology />
      <Project />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;
