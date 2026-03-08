import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Over the dark hero: white text. After scrolling: normal light/dark text.
  const linkClass = scrolled
    ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    : 'text-white/80 hover:text-white';

  const logoClass = scrolled
    ? 'text-indigo-600 dark:text-indigo-400'
    : 'text-white';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-xl font-bold hover:opacity-80 transition-all ${logoClass}`}
          >
            Shovon
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {portfolio.nav.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors ${linkClass}`}
              >
                {link.label}
              </button>
            ))}

            {/* Dark / Light toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white/10'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white/10'
              }`}
            >
              <span className={`block w-5 h-0.5 mb-1 ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}`} />
              <span className={`block w-5 h-0.5 mb-1 ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}`} />
              <span className={`block w-5 h-0.5 ${scrolled ? 'bg-gray-700 dark:bg-gray-300' : 'bg-white'}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-4 flex flex-col gap-3"
          >
            {portfolio.nav.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left px-4 py-1"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
