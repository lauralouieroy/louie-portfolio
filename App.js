import './App.css';
import { About } from './src/components/About';
import { Blog } from './src/components/Blog';
import { Footer } from './src/components/Footer';
import { Hero } from './src/components/Hero';
import { Navbar } from './src/components/Navbar';
import { Project } from './src/components/Project';
import { Technology } from './src/components/Technology';

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
