import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const COLOR = '#00f5d4';

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

  return (
    <>
      <style>{`
        @keyframes navUnderline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .nav-link{position:relative;background:none;border:none;cursor:pointer;padding:0;font-family:inherit;}
        .nav-link::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:${COLOR};transform:scaleX(0);transform-origin:left;transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);}
        .nav-link:hover::after{transform:scaleX(1);}
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--bd)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', height: '64px' }}>

            {/* Desktop links — centred */}
            <div style={{ alignItems: 'center', gap: '32px', flex: 1, justifyContent: 'center' }} className="hidden md:flex">
              {portfolio.nav.map((link) => (
                <NavLink key={link.href} label={link.label} onClick={() => handleNavClick(link.href)} />
              ))}

              {/* Theme toggle */}
              <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
            </div>

            {/* Mobile: hamburger only — centered */}
            <div className="flex md:hidden" style={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                style={{
                  background: 'none', border: `1px solid ${menuOpen ? COLOR + '50' : 'var(--bd)'}`,
                  borderRadius: '8px', padding: '8px', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  transition: 'border-color 0.25s',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    display: 'block', width: '18px', height: '1.5px', borderRadius: '2px',
                    background: menuOpen ? COLOR : 'var(--tx-2)',
                    transition: 'background 0.25s, transform 0.25s',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                        : i === 1 ? 'scaleX(0)'
                          : 'translateY(-5.5px) rotate(-45deg)'
                      : 'none',
                  }} />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                borderTop: '1px solid rgba(0,245,212,0.08)',
                padding: '12px 0 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                background: 'var(--nav-bg)',
              }}
            >
              {portfolio.nav.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'center', padding: '10px 24px',
                    width: '100%',
                    fontSize: '0.82rem', fontFamily: 'monospace',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: 'var(--tx-2)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLOR)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--tx-2)')}
                >
                  {link.label}
                </button>
              ))}
              {/* Theme toggle inside dropdown */}
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--bd)', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}

// ─── Nav link ────────────────────────────────────────────────────────────────
function NavLink({ label, onClick }: { label: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="nav-link"
      style={{
        fontSize: '0.78rem', fontFamily: 'monospace',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: hov ? COLOR : 'var(--tx-2)',
        transition: 'color 0.25s',
      }}
    >
      {label}
    </button>
  );
}

// ─── Theme toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label="Toggle theme"
      style={{
        background: hov ? `${COLOR}15` : 'var(--bg-card)',
        border: `1px solid ${hov ? COLOR + '45' : 'var(--bd)'}`,
        borderRadius: '9px', padding: '7px 9px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s', color: hov ? COLOR : 'var(--tx-3)',
      }}
    >
      {darkMode ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          {[0,45,90,135,180,225,270,315].map((d) => {
            const r = d * Math.PI / 180;
            return <line key={d} x1={12+7*Math.cos(r)} y1={12+7*Math.sin(r)} x2={12+9*Math.cos(r)} y2={12+9*Math.sin(r)} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />;
          })}
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
