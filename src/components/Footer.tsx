import { useState, useEffect, useRef } from 'react';
import portfolio from '../data/portfolio';

const COLOR = '#00f5d4';

// ─── Icons ────────────────────────────────────────────────────────────────────
const GHIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
      fill={color} />
  </svg>
);

const LIIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
    <line x1="7" y1="10" x2="7" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="7" cy="7" r="1.3" fill={color} />
    <path d="M11 10v7M11 13.5c0-2.5 7-3 7 1v2.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = ({ color }: { color: string }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="15" rx="2" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.1" />
    <polyline points="2,6 12,14 22,6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Particle canvas ──────────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;

    const hex = COLOR.replace('#', '');
    const cr = parseInt(hex.slice(0, 2), 16);
    const cg = parseInt(hex.slice(2, 4), 16);
    const cb = parseInt(hex.slice(4, 6), 16);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(1 - d / 110) * 0.12})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker() {
  const items = [
    'Available for Work', 'Open to Collaboration', 'Full-Stack Engineer',
    'AI & Data Professional', 'Based in Wales, UK', 'mohiduzzaman.com',
    'React · Python · SQL', 'Aviation Tech', 'Mental Health Advocate',
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--bd)', borderBottom: '1px solid var(--bd)', padding: '10px 0' }}>
      <div style={{ display: 'flex', animation: 'ftTicker 28s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--tx-3)', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0 28px' }}>
              {item}
            </span>
            <span style={{ color: 'var(--bd)', fontSize: '0.5rem' }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Nav link ─────────────────────────────────────────────────────────────────
function NavLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '0.72rem', fontFamily: 'monospace',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: hov ? COLOR : 'var(--tx-3)',
        textDecoration: 'none', transition: 'color 0.25s', position: 'relative',
      }}
    >
      <span style={{
        width: '4px', height: '4px', borderRadius: '50%',
        background: hov ? COLOR : 'var(--tx-5)',
        boxShadow: hov ? `0 0 8px ${COLOR}` : 'none',
        transition: 'all 0.25s', flexShrink: 0,
      }} />
      {label}
      <span style={{
        position: 'absolute', bottom: '-2px', left: '10px', right: 0, height: '1px',
        background: COLOR,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </a>
  );
}

// ─── Social button ────────────────────────────────────────────────────────────
function SocialBtn({ href, Icon, label, color }: {
  href: string; Icon: React.ComponentType<{ color: string }>; label: string; color: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer" title={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '44px', height: '44px', borderRadius: '12px',
        border: `1px solid ${hov ? color + '60' : 'var(--bd)'}`,
        background: hov ? `${color}18` : 'var(--bg-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 8px 24px ${color}30` : 'none',
        textDecoration: 'none',
      }}
    >
      <Icon color={hov ? color : 'var(--tx-3)'} />
    </a>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Footer() {
  const { nav, contact, hero } = portfolio;
  const [time, setTime] = useState('');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  // Live UK time
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit',
    }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!footerRef.current) return;
      const r = footerRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  // Build socials from portfolio data
  const socials = contact.socials.map((s) => ({
    href: s.url,
    Icon: s.icon === 'github' ? GHIcon : LIIcon,
    label: s.platform,
    color: s.icon === 'github' ? '#c77dff' : '#4cc9f0',
  }));
  socials.push({ href: `mailto:${contact.email}`, Icon: MailIcon, label: 'Email', color: COLOR });

  const [first, last] = hero.name.split(' ').reduce<[string, string]>((acc, w, i, arr) => {
    if (i < Math.ceil(arr.length / 2)) acc[0] += (acc[0] ? ' ' : '') + w;
    else acc[1] += (acc[1] ? ' ' : '') + w;
    return acc;
  }, ['', '']);

  return (
    <>
      <style>{`
        @keyframes ftTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes ftFadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ftNameReveal{from{opacity:0;transform:translateY(40px) skewY(4deg)}to{opacity:1;transform:translateY(0) skewY(0)}}
        @keyframes ftGlowPulse{0%,100%{opacity:0.4}50%{opacity:0.9}}
        @keyframes ftScanDown{from{top:-2px}to{top:100%}}
        @keyframes ftBlinkDot{0%,100%{opacity:1}49%{opacity:1}50%{opacity:0}99%{opacity:0}}
        @keyframes ftFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes ftOrbit{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      <footer ref={footerRef} style={{ background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--bd)' }}>

        {/* Particle background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ParticleField />
        </div>

        {/* Mouse glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: `radial-gradient(ellipse 60% 60% at ${mousePos.x}% ${mousePos.y}%, ${COLOR}0d 0%, transparent 70%)`,
          transition: 'background 1s ease',
        }} />

        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, ${COLOR}30, transparent)`,
          animation: 'ftScanDown 8s linear infinite', pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Ticker */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <Ticker />
        </div>

        {/* Giant name hero */}
        <div style={{ position: 'relative', zIndex: 3, padding: '64px 0 40px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: '600px', height: '200px',
            background: `radial-gradient(ellipse, ${COLOR}12, transparent 70%)`,
            pointerEvents: 'none', animation: 'ftGlowPulse 4s ease-in-out infinite',
          }} />

          <div style={{ opacity: visible ? 1 : 0, animation: visible ? 'ftNameReveal 0.9s cubic-bezier(0.16,1,0.3,1) both' : 'none' }}>
            <div style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 900,
              lineHeight: 0.92, letterSpacing: '-0.03em',
              backgroundImage: `linear-gradient(160deg, var(--h-from) 30%, ${COLOR}80 70%, var(--tx-5) 100%)`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              userSelect: 'none', filter: `drop-shadow(0 0 60px ${COLOR}25)`,
            } as React.CSSProperties}>
              {first}
            </div>
            <div style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontWeight: 900,
              lineHeight: 0.92, letterSpacing: '-0.03em',
              backgroundImage: `linear-gradient(160deg, ${COLOR} 0%, var(--h-from) 50%, ${COLOR}40 100%)`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              userSelect: 'none', filter: `drop-shadow(0 0 80px ${COLOR}40)`,
              animation: 'ftFloat 6s ease-in-out infinite',
            } as React.CSSProperties}>
              {last}
            </div>
          </div>

          <div style={{
            marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
            opacity: visible ? 1 : 0, animation: visible ? 'ftFadeUp 0.7s ease 0.3s both' : 'none',
          }}>
            <div style={{ height: '1px', width: '60px', background: `linear-gradient(90deg, transparent, ${COLOR}50)` }} />
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--tx-3)' }}>
              {hero.title}
            </span>
            <div style={{ height: '1px', width: '60px', background: `linear-gradient(90deg, ${COLOR}50, transparent)` }} />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          position: 'relative', zIndex: 3, margin: '0 40px', height: '1px',
          background: `linear-gradient(90deg, transparent, ${COLOR}25, var(--bd), ${COLOR}25, transparent)`,
        }} />

        {/* Main body: 3 columns */}
        <div style={{
          position: 'relative', zIndex: 3,
          maxWidth: '1080px', margin: '0 auto', padding: '48px 40px 40px',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '48px', alignItems: 'start',
        }}>

          {/* LEFT: Nav */}
          <div style={{ opacity: visible ? 1 : 0, animation: visible ? 'ftFadeUp 0.6s ease 0.15s both' : 'none' }}>
            <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--tx-5)', marginBottom: '18px' }}>
              Navigate
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {nav.map((link) => <NavLink key={link.href} label={link.label} href={link.href} />)}
            </div>
          </div>

          {/* CENTER: Monogram + socials + clock */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px',
            opacity: visible ? 1 : 0, animation: visible ? 'ftFadeUp 0.7s ease 0.2s both' : 'none',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              border: `1.5px solid ${COLOR}40`,
              background: `radial-gradient(circle, ${COLOR}15, var(--bg-deep))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 40px ${COLOR}20, inset 0 1px 0 ${COLOR}20`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', inset: '-8px', borderRadius: '50%',
                border: `1px dashed ${COLOR}20`, animation: 'ftOrbit 12s linear infinite',
              }} />
              <span style={{
                fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: 900,
                backgroundImage: `linear-gradient(135deg, var(--h-from), ${COLOR})`,
                backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              } as React.CSSProperties}>
                MO
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s) => <SocialBtn key={s.label} {...s} />)}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '7px 16px', borderRadius: '100px',
              border: '1px solid var(--bd)', background: 'var(--bg-card)',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 8px #06d6a0', display: 'inline-block', animation: 'ftGlowPulse 2s infinite' }} />
              <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--tx-3)', letterSpacing: '0.08em' }}>
                Wales, UK
              </span>
              <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: COLOR, letterSpacing: '0.05em', minWidth: '66px' }}>
                {time}<span style={{ animation: 'ftBlinkDot 1s step-end infinite', marginLeft: '1px' }}>_</span>
              </span>
            </div>
          </div>

          {/* RIGHT: Philosophy + copyright */}
          <div style={{
            textAlign: 'right',
            opacity: visible ? 1 : 0, animation: visible ? 'ftFadeUp 0.6s ease 0.25s both' : 'none',
          }}>
            <div style={{ fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--tx-5)', marginBottom: '18px' }}>
              Philosophy
            </div>
            <blockquote style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.95rem',
              color: 'var(--tx-3)', lineHeight: 1.7, marginBottom: '20px',
              borderRight: `2px solid ${COLOR}40`, paddingRight: '16px',
            }}>
              "Build systems that<br />think, feel, and heal."
            </blockquote>
            <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
              {['React', 'Python', 'SQL', 'Power BI', 'Azure', 'AI/ML'].map((t) => (
                <span key={t} style={{
                  fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--tx-3)',
                  letterSpacing: '0.08em', padding: '3px 10px', borderRadius: '6px',
                  border: '1px solid var(--bd)', background: 'var(--bg-card)',
                }}>
                  {t}
                </span>
              ))}
            </div>
            <div style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--tx-5)', letterSpacing: '0.1em', lineHeight: 1.8 }}>
              <div>Designed &amp; built with care</div>
              <div style={{ color: 'var(--tx-5)' }}>© {year} {hero.name}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'relative', zIndex: 3,
          borderTop: '1px solid var(--bd)',
          padding: '16px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
          opacity: visible ? 1 : 0, animation: visible ? 'ftFadeUp 0.6s ease 0.4s both' : 'none',
        }}>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--tx-5)', letterSpacing: '0.1em' }}>
            mohiduzzaman.com · {year}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem', fontFamily: 'monospace', color: `${COLOR}50`, letterSpacing: '0.1em' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: COLOR, boxShadow: `0 0 6px ${COLOR}`, display: 'inline-block' }} />
            v1.0.0 · React + Vite · Deployed on Vercel
          </div>
          <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: 'var(--tx-5)', letterSpacing: '0.1em' }}>
            All rights reserved
          </span>
        </div>
      </footer>
    </>
  );
}
