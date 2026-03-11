

import { useState, useEffect } from 'react';

import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Experience     from './components/Experience';
import Skills         from './components/Skills';
import Certifications from './components/Certifications';
import Contact        from './components/Contact';
import Footer         from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Restore preference from localStorage, fall back to OS preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply / remove 'dark' class on <html> for Tailwind class strategy
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <Hero darkMode={darkMode} />
        <About />
        <Experience />
        <Skills darkMode={darkMode} />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
