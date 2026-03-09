import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import portfolio from '../data/portfolio';

// ─── Custom SVG icons ────────────────────────────────────────────────────────
function AIIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="6" stroke={color} strokeWidth="1.5" />
      <circle cx="18" cy="18" r="2.5" fill={color} opacity="0.8" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={18 + 6 * Math.cos(rad)} y1={18 + 6 * Math.sin(rad)}
              x2={18 + 14 * Math.cos(rad)} y2={18 + 14 * Math.sin(rad)}
              stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
            <circle cx={18 + 14 * Math.cos(rad)} cy={18 + 14 * Math.sin(rad)}
              r="2" fill={color} opacity="0.7" />
          </g>
        );
      })}
      <circle cx="18" cy="18" r="14" stroke={color} strokeWidth="0.5"
        strokeOpacity="0.2" strokeDasharray="3 4" />
    </svg>
  );
}

function CodeIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="3" y="6" width="30" height="24" rx="3"
        stroke={color} strokeWidth="1.2" strokeOpacity="0.3" />
      <rect x="3" y="6" width="30" height="7" rx="3"
        fill={color} fillOpacity="0.08" />
      <circle cx="8"  cy="9.5" r="1.2" fill={color} opacity="0.6" />
      <circle cx="12" cy="9.5" r="1.2" fill={color} opacity="0.4" />
      <circle cx="16" cy="9.5" r="1.2" fill={color} opacity="0.2" />
      <polyline points="9,18 6,21 9,24"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="27,18 30,21 27,24"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="16" x2="15" y2="26"
        stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

function DataIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="4" y="22" width="6" height="10" rx="1.5" fill={color} fillOpacity="0.7" />
      <rect x="13" y="14" width="6" height="18" rx="1.5" fill={color} fillOpacity="0.5" />
      <rect x="22" y="8"  width="6" height="24" rx="1.5" fill={color} fillOpacity="0.3" />
      <polyline points="7,20 16,12 25,6"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
      <circle cx="7"  cy="20" r="2" fill={color} />
      <circle cx="16" cy="12" r="2" fill={color} />
      <circle cx="25" cy="6"  r="2" fill={color} />
      <line x1="4" y1="32" x2="32" y2="32"
        stroke={color} strokeWidth="0.8" strokeOpacity="0.25" />
    </svg>
  );
}

function CloudIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M26 22 C29.3 22 32 19.3 32 16 C32 12.7 29.3 10 26 10 C25.4 10 24.8 10.1 24.3 10.3 C23.2 7.8 20.8 6 18 6 C14.1 6 11 9.1 11 13 C11 13.2 11 13.4 11 13.6 C9.2 14.3 8 16 8 18 C8 20.2 9.8 22 12 22 Z"
        stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.07" strokeLinejoin="round" />
      <line x1="14" y1="22" x2="14" y2="30" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="18" y1="22" x2="18" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="22" y1="22" x2="22" y2="30" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="11" y1="30" x2="25" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = [AIIcon, CodeIcon, DataIcon, CloudIcon];

// ─── Data ────────────────────────────────────────────────────────────────────
const EXPERTISE = [
  {
    category: 'AI & Machine Learning',
    color: '#6366f1',
    items: ['Machine Learning', 'Deep Learning', 'Predictive Modelling', 'Computer Vision', 'AI Integration'],
    description: 'Building intelligent systems that turn raw data into actionable business insights.',
  },
  {
    category: 'Software Engineering',
    color: '#a855f7',
    items: ['React', 'TypeScript', 'Python', 'REST APIs', 'Tailwind CSS'],
    description: 'Crafting production-grade web applications from frontend to backend infrastructure.',
  },
  {
    category: 'Data & Analytics',
    color: '#3b82f6',
    items: ['Power BI', 'ETL Pipelines', 'Big Data', 'Forecasting', 'Data Visualisation'],
    description: 'Turning complex data workflows into clear, actionable intelligence.',
  },
  {
    category: 'Cloud & DevOps',
    color: '#10b981',
    items: ['Git', 'Azure DevOps', 'CI/CD', 'Agile / Scrum', 'Cloud Databases'],
    description: 'Delivering scalable, reliable infrastructure with modern DevOps practices.',
  },
] as const;

const STATS = [
  { label: 'Years Experience',      value: 5,  suffix: '+' },
  { label: 'Projects Delivered',    value: 30, suffix: '+' },
  { label: 'Data Models Built',     value: 50, suffix: '+' },
  { label: 'Team Members Led',      value: 12, suffix: '+' },
];

type ExpertiseArea = typeof EXPERTISE[number];

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / 2000, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Interactive avatar face (big circle) ────────────────────────────────────
function AvatarFace({ color, children }: { color: string; children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 300, damping: 24 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 300, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div style={{ width: '100%', height: '100%', perspective: '500px' }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileTap={{
          scaleX: 1.18, scaleY: 0.78, rotate: -10,
          transition: { type: 'spring', stiffness: 550, damping: 14 },
        }}
        style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${color}22, var(--bg) 75%)`,
          border: `2px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 60px ${color}18`,
          transition: 'background 0.5s, border-color 0.5s, box-shadow 0.5s',
          cursor: 'pointer',
          rotateX: rotX, rotateY: rotY,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Float + wiggle on hover */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          whileHover={{ rotate: [0, -12, 10, -5, 3, 0], transition: { duration: 0.55, ease: 'easeInOut' } }}
          whileTap={{ scale: 0.82, rotate: 18, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Interactive icon box ────────────────────────────────────────────────────
function IconBox({ color, lit, children }: { color: string; lit: boolean; children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), { stiffness: 400, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 400, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div style={{ perspective: '200px', width: '50px', height: '50px', flexShrink: 0 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.18, boxShadow: `0 0 32px ${color}55` }}
        whileTap={{
          scaleX: 1.28, scaleY: 0.72, rotate: -12,
          transition: { type: 'spring', stiffness: 600, damping: 12 },
        }}
        style={{
          width: '50px', height: '50px', borderRadius: '12px',
          border: `1px solid ${lit ? color + '55' : 'var(--bd)'}`,
          background: lit ? `${color}12` : 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          rotateX: rotX, rotateY: rotY,
          transition: 'border-color 0.35s, background 0.35s',
          cursor: 'pointer',
        }}
        transition={{ type: 'spring', stiffness: 340, damping: 22 }}
      >
        <motion.div
          whileHover={{ rotate: [0, -14, 12, -6, 4, 0], transition: { duration: 0.55, ease: 'easeInOut' } }}
          whileTap={{ rotate: 20, scale: 0.85, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────
function SkillCard({ skill, index, isActive, onClick }: {
  skill: ExpertiseArea; index: number; isActive: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICONS[index];
  const lit = isActive || hovered;

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      animate={{ y: isActive ? -6 : hovered ? -3 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      style={{
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        border: `1px solid ${lit ? skill.color + '70' : 'var(--bd)'}`,
        borderRadius: '18px', padding: '28px 26px',
        background: isActive
          ? `linear-gradient(145deg, ${skill.color}12, ${skill.color}04, var(--bg-card-deep))`
          : hovered ? 'var(--bg-card-hov)' : 'var(--bg-card)',
        boxShadow: isActive ? `0 10px 50px ${skill.color}1e, inset 0 1px 0 ${skill.color}18` : 'none',
        transition: 'border-color 0.38s, background 0.38s, box-shadow 0.38s',
      }}
    >
      {/* Corner glow when active */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
          background: `radial-gradient(circle at top right, ${skill.color}18, transparent 70%)`,
          borderRadius: '0 18px 0 0', pointerEvents: 'none',
        }} />
      )}

      {/* Header: icon + category label side by side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
        <IconBox color={skill.color} lit={lit}>
          <Icon color={skill.color} size={26} />
        </IconBox>
        <div style={{
          fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: lit ? skill.color : 'var(--tx-2)',
          fontFamily: 'monospace', lineHeight: 1.3,
          transition: 'color 0.3s',
        }}>
          {skill.category}
        </div>
      </div>

      <div style={{ fontSize: '0.83rem', color: 'var(--tx-3)', lineHeight: 1.7 }}>
        {skill.description}
      </div>

      {/* Corner status dot */}
      <div style={{
        position: 'absolute', bottom: '18px', right: '20px',
        width: '6px', height: '6px', borderRadius: '50%',
        background: isActive ? skill.color : 'var(--bd)',
        boxShadow: isActive ? `0 0 10px ${skill.color}` : 'none',
        transition: 'all 0.4s',
      }} />
    </motion.div>
  );
}

// ─── Skill pills ──────────────────────────────────────────────────────────────
function SkillPills({ items, color }: { items: readonly string[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '22px' }}>
      {items.map((item, i) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          style={{
            padding: '7px 16px', borderRadius: '100px',
            fontSize: '0.74rem', fontFamily: 'monospace',
            border: `1px solid ${color}45`, color, background: `${color}0e`,
            letterSpacing: '0.02em',
          }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
  const { about } = portfolio;
  const [activeSkill, setActiveSkill] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLElement>(null);
  const active = EXPERTISE[activeSkill];
  const ActiveIcon = ICONS[activeSkill];

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      style={{ background: 'var(--bg)', color: 'var(--tx)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mouse-tracking glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 55% 45% at ${mousePos.x}% ${mousePos.y}%, ${active.color}0d 0%, transparent 65%)`,
        transition: 'background 1s ease',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-8%', width: '480px', height: '480px',
        borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(circle, ${active.color}07, transparent 70%)`,
        transition: 'background 1.2s',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-8%', width: '380px', height: '380px',
        borderRadius: '50%', pointerEvents: 'none',
        background: `radial-gradient(circle, ${active.color}05, transparent 70%)`,
        transition: 'background 1.2s',
      }} />

      <div className="about-inner" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', padding: '80px 32px' }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: active.color, fontFamily: 'monospace', marginBottom: '20px',
            border: `1px solid ${active.color}30`, padding: '6px 18px', borderRadius: '100px',
            transition: 'color 0.5s, border-color 0.5s',
          }}>
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: active.color, display: 'inline-block', transition: 'background 0.5s',
            }} />
            Muhammad Ohiduzzaman
          </div>

          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0',
            backgroundImage: `linear-gradient(140deg, var(--h-from) 35%, ${active.color} 100%)`,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            transition: 'background-image 0.6s',
          } as React.CSSProperties}>
            Crafting Digital<br />Experiences
          </h2>
        </motion.div>

        {/* ── Avatar + Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="about-profile-row"
        >
          {/* Avatar */}
          <div className="about-avatar-wrap">
            {/* Pulse rings */}
            <div style={{
              position: 'absolute', inset: '-10px', borderRadius: '50%',
              border: `1.5px solid ${active.color}80`,
              animation: 'aboutPulse 3.5s ease-in-out infinite',
              transition: 'border-color 0.5s',
            }} />
            <div style={{
              position: 'absolute', inset: '-20px', borderRadius: '50%',
              border: `1px dashed ${active.color}28`,
              animation: 'aboutPulse 3.5s ease-in-out infinite 1.2s',
              transition: 'border-color 0.5s',
            }} />
            {/* Orbiting dot */}
            <div style={{
              position: 'absolute', inset: '-20px', borderRadius: '50%',
              animation: 'aboutOrbit 8s linear infinite',
            }}>
              <div style={{
                position: 'absolute', top: '50%', left: '-3px',
                width: '6px', height: '6px', borderRadius: '50%',
                background: active.color, boxShadow: `0 0 12px ${active.color}`,
                transform: 'translateY(-50%)', transition: 'background 0.5s, box-shadow 0.5s',
              }} />
            </div>
            {/* Face — tilt + bend interactive */}
            <AvatarFace color={active.color}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill}
                  initial={{ scale: 0.3, opacity: 0, rotate: -25 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0,
                    transition: { type: 'spring', stiffness: 340, damping: 20 } }}
                  exit={{ scale: 0.3, opacity: 0, rotate: 25,
                    transition: { duration: 0.16, ease: 'easeIn' } }}
                >
                  <ActiveIcon color={active.color} size={68} />
                </motion.div>
              </AnimatePresence>
            </AvatarFace>
          </div>

          {/* Stats */}
          <div className="about-stats-grid">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.15 + i * 0.08 }}
                style={{
                  padding: '24px 22px', borderRadius: '14px', position: 'relative', overflow: 'hidden',
                  border: '1px solid var(--bd)', background: 'var(--bg-card)',
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: `linear-gradient(90deg, transparent, ${active.color}38, transparent)`,
                  transition: 'background 0.5s',
                }} />
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: active.color, lineHeight: 1, transition: 'color 0.5s' }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--tx-2)', marginTop: '7px',
                  fontFamily: 'monospace', letterSpacing: '0.06em',
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Skill Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginTop: '56px', marginBottom: '20px' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            fontSize: '0.66rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--tx-5)', fontFamily: 'monospace', marginBottom: '20px',
          }}>
            <span style={{ flex: 1, height: '1px', background: 'var(--bd)' }} />
            Click to explore expertise
            <span style={{ flex: 1, height: '1px', background: 'var(--bd)' }} />
          </div>

          <div className="expertise-grid">
            {EXPERTISE.map((skill, i) => (
              <SkillCard
                key={skill.category} skill={skill} index={i}
                isActive={activeSkill === i} onClick={() => setActiveSkill(i)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Detail panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: '34px 36px', borderRadius: '20px', position: 'relative', overflow: 'hidden',
              border: `1px solid ${active.color}30`,
              background: `linear-gradient(145deg, ${active.color}0b, var(--bg-card-deep))`,
              boxShadow: `0 0 80px ${active.color}10, inset 0 1px 0 ${active.color}12`,
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent 10%, ${active.color}55 50%, transparent 90%)`,
            }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px' }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '11px', flexShrink: 0,
                border: `1px solid ${active.color}38`, background: `${active.color}0e`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ActiveIcon color={active.color} size={24} />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--tx)', marginBottom: '5px' }}>
                  {active.category}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--tx-3)', lineHeight: 1.65 }}>
                  {active.description}
                </div>
              </div>
            </div>
            <SkillPills items={active.items} color={active.color} />
          </motion.div>
        </AnimatePresence>

        {/* ── Bio + Download CV ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginTop: '32px', padding: '36px', borderRadius: '16px',
            border: '1px solid var(--bd)', background: 'var(--bg-card)',
          }}
        >
          <p style={{ color: 'var(--tx-2)', lineHeight: 1.9, fontSize: '1rem', whiteSpace: 'pre-line' }}>
            {about.bio}
          </p>

          {about.resumeUrl && (
            <motion.a
              href={about.resumeUrl}
              download="Muhammad-Ohiduzzaman-CV.pdf"
              whileHover={{ scale: 1.04, opacity: 0.88 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: 'inline-block', marginTop: '28px', padding: '12px 30px',
                borderRadius: '100px', background: active.color, color: '#fff',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                transition: 'background 0.4s',
              }}
            >
              Download Resume ↓
            </motion.a>
          )}
        </motion.div>

        {/* ── Footer tagline ── */}
        <div style={{
          textAlign: 'center', marginTop: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
        }}>
          <span style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'var(--bd)' }} />
          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'var(--tx-5)', letterSpacing: '0.12em' }}>
            mohiduzzaman.com
          </span>
          <span style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'var(--bd)' }} />
        </div>

      </div>

      {/* ── Keyframes + responsive ── */}
      <style>{`
        @keyframes aboutPulse {
          0%, 100% { transform: scale(0.96); opacity: 0.7; }
          50%       { transform: scale(1.04); opacity: 0.3; }
        }
        @keyframes aboutOrbit {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        .about-profile-row {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 52px;
          align-items: center;
        }
        .about-avatar-wrap {
          position: relative;
          width: 210px;
          height: 210px;
          flex-shrink: 0;
        }
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .expertise-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 680px) {
          .about-inner { padding: 64px 20px !important; }
          .about-profile-row { grid-template-columns: 1fr; justify-items: center; }
          .expertise-grid    { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
