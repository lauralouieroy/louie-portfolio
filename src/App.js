/* App.js */

import { useEffect, useState } from "react";
import "./App.css";

import { About } from "./components/About";
import { Blog } from "./components/Blog";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Project } from "./components/Project";
import { Technology } from "./components/Technology";

function App() {
  const [loading, setLoading] = useState(true);
  const [startHeroAnimation, setStartHeroAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      /* trigger hero stats AFTER preloader */
      setTimeout(() => {
        setStartHeroAnimation(true);
      }, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* PRELOADER */}
      {loading && (
        <div className="preloader">
          <div className="preloader-content">
            <div className="preloader-logo">
              <span>LL</span>
            </div>

            <h1 className="preloader-name">Louie Laura</h1>

            <p className="preloader-role">
              Software Engineer
            </p>
          </div>
        </div>
      )}

      {/* MAIN WEBSITE */}
      <div className={`app ${loading ? "app-hidden" : "app-show"}`}>
        <Navbar />
        <Hero startAnimation={startHeroAnimation} />
        <About />
        <Technology />
        <Project />
        <Blog />
        <Footer />
      </div>
    </>
  );
}

export default App;