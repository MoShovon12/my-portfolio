import { useState, useEffect, useRef } from 'react';
import portfolio from '../data/portfolio';

// ─── Skill percentages (level → realistic %) ─────────────────────────────────
const SKILL_PCT: Record<string, number> = {
  'JavaScript': 95, 'TypeScript': 92, 'Python': 90, 'SQL': 86, 'HTML / CSS': 94,
  'React': 91, 'Tailwind CSS': 88, 'Pandas': 89, 'REST APIs': 84,
  'Power BI': 88, 'Data Visualisation': 90, 'ETL Pipelines': 82,
  'Big Data': 80, 'Forecasting': 82, 'Excel': 84,
  'Machine Learning': 85, 'Deep Learning': 70, 'Predictive Modelling': 83,
  'Computer Vision': 68, 'AI Integration': 82,
  'Git': 93, 'Azure DevOps': 84, 'CI/CD': 75,
  'Cloud Databases': 72,
  'Agile / Scrum': 86, 'IoT Integration': 70,
};
const levelToPct = (name: string, level = 'intermediate') => {
  if (SKILL_PCT[name] !== undefined) return SKILL_PCT[name];
  return { expert: 90, advanced: 82, intermediate: 70, beginner: 55 }[level] ?? 70;
};

// ─── Icon components ──────────────────────────────────────────────────────────
interface IconProps { color: string; animate: boolean; }

function LangIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes langDraw{from{stroke-dashoffset:40}to{stroke-dashoffset:0}}@keyframes langFade{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      <path d="M2 5h10M7 2v3" stroke={color} strokeWidth="1.9" strokeLinecap="round"
        style={animate ? { strokeDasharray: 40, strokeDashoffset: 0, animation: 'langDraw 0.6s ease both' } : {}} />
      <path d="M2 5c2 4 6 8 11 10" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeOpacity="0.55"
        style={animate ? { strokeDasharray: 40, strokeDashoffset: 0, animation: 'langDraw 0.6s ease 0.1s both' } : {}} />
      <path d="M6 12c1.5 2 4 3 6 3" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeOpacity="0.7"
        style={animate ? { strokeDasharray: 30, strokeDashoffset: 0, animation: 'langDraw 0.5s ease 0.2s both' } : {}} />
      <path d="M15 3l-4 18" stroke={color} strokeWidth="1.9" strokeLinecap="round"
        style={animate ? { animation: 'langFade 2s ease infinite' } : {}} />
      <path d="M19 3l-4 18" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeOpacity="0.5"
        style={animate ? { animation: 'langFade 2s ease 0.3s infinite' } : {}} />
      <path d="M13 13h6" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function FrameworkIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes hexSpin{from{transform-origin:12px 12px;transform:rotate(0deg)}to{transform-origin:12px 12px;transform:rotate(360deg)}}`}</style>
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke={color} strokeWidth="1.8"
        fill={color} fillOpacity="0.08"
        style={animate ? { animation: 'hexSpin 8s linear infinite' } : {}} />
      <polygon points="12,6.5 17.2,9.5 17.2,15.5 12,18.5 6.8,15.5 6.8,9.5" stroke={color} strokeWidth="1.4"
        fill={color} fillOpacity="0.14"
        style={animate ? { animation: 'hexSpin 8s linear infinite reverse' } : {}} />
      <circle cx="12" cy="12" r="2.4" fill={color}
        style={animate ? { animation: 'langFade 2s ease infinite' } : {}} />
    </svg>
  );
}

function DataIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes dataFlow{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}`}</style>
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.12" />
      <path d="M3 5v4.5c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke={color} strokeWidth="1.8"
        style={animate ? { strokeDasharray: 60, animation: 'dataFlow 0.7s ease both' } : {}} />
      <path d="M3 9.5v4.5c0 1.66 4.03 3 9 3s9-1.34 9-3V9.5" stroke={color} strokeWidth="1.8" strokeOpacity="0.55"
        style={animate ? { strokeDasharray: 60, animation: 'dataFlow 0.7s ease 0.15s both' } : {}} />
      <path d="M3 14v4.5c0 1.66 4.03 3 9 3s9-1.34 9-3V14" stroke={color} strokeWidth="1.8" strokeOpacity="0.25"
        style={animate ? { strokeDasharray: 60, animation: 'dataFlow 0.7s ease 0.3s both' } : {}} />
    </svg>
  );
}

function AIIcon({ color, animate }: IconProps) {
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes aiPulse{0%,100%{opacity:1}50%{opacity:.7}}@keyframes spokeAnim{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8"
        style={animate ? { animation: 'aiPulse 2s ease-in-out infinite' } : {}} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      {spokes.map((d, i) => {
        const r = d * Math.PI / 180;
        return <line key={i}
          x1={12 + 3.5 * Math.cos(r)} y1={12 + 3.5 * Math.sin(r)}
          x2={12 + 9 * Math.cos(r)} y2={12 + 9 * Math.sin(r)}
          stroke={color} strokeWidth="1.6" strokeLinecap="round"
          strokeOpacity={i % 2 === 0 ? 1 : 0.4}
          style={animate ? { animation: `spokeAnim 1.5s ease ${i * 0.15}s infinite` } : {}} />;
      })}
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="0.7" strokeOpacity="0.2" strokeDasharray="3 3" />
    </svg>
  );
}

function DevOpsIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes devSpin{from{transform-origin:12px 12px;transform:rotate(0deg)}to{transform-origin:12px 12px;transform:rotate(360deg)}}`}</style>
      <path d="M12 3C7 3 3 7 3 12s4 9 9 9" stroke={color} strokeWidth="1.9" strokeLinecap="round"
        style={animate ? { animation: 'devSpin 4s linear infinite' } : {}} />
      <path d="M12 3c5 0 9 4 9 9s-4 9-9 9" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeOpacity="0.35"
        style={animate ? { animation: 'devSpin 4s linear infinite reverse' } : {}} />
      <polyline points="17,7 22,2 22,7" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="7,17 2,22 7,22" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloudIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes cloudFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}`}</style>
      <path d="M17.5 19H6a4 4 0 1 1 .55-7.96A6 6 0 1 1 17.5 19z"
        stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1"
        style={animate ? { animation: 'cloudFloat 2.5s ease-in-out infinite' } : {}} />
      <line x1="12" y1="13" x2="12" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <polyline points="9,16 12,19 15,16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OtherIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes starPop{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}`}</style>
      <circle cx="12" cy="7" r="3.5" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1"
        style={animate ? { animation: 'starPop 2s ease infinite' } : {}} />
      <path d="M5 21v-1a7 7 0 0 1 14 0v1" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 9l1.5-1.5M7 9L5.5 7.5M12 5V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

// ─── Category config ──────────────────────────────────────────────────────────
type CatId = 'lang' | 'fw' | 'data' | 'ai' | 'devops' | 'cloud' | 'other';

interface CatConfig {
  id: CatId;
  label: string;
  portfolioCat: string;
  Icon: React.ComponentType<IconProps>;
  color: string;
  desc: string;
}

const CATS: CatConfig[] = [
  { id: 'lang',   label: 'Languages',             portfolioCat: 'Languages',             Icon: LangIcon,      color: '#00f5d4', desc: 'Core programming languages I work with daily' },
  { id: 'fw',     label: 'Frameworks & Libraries', portfolioCat: 'Frameworks & Libraries', Icon: FrameworkIcon, color: '#f72585', desc: 'Production-grade frameworks powering my apps' },
  { id: 'data',   label: 'Data & Analytics',       portfolioCat: 'Data & Analytics',       Icon: DataIcon,      color: '#4cc9f0', desc: 'End-to-end data engineering and BI expertise' },
  { id: 'ai',     label: 'AI & ML',                portfolioCat: 'AI & Machine Learning',  Icon: AIIcon,        color: '#c77dff', desc: 'Building intelligent predictive systems' },
  { id: 'devops', label: 'Tools & DevOps',         portfolioCat: 'Tools & DevOps',         Icon: DevOpsIcon,    color: '#f4a261', desc: 'Automation, CI/CD, and version control' },
  { id: 'cloud',  label: 'Cloud & Databases',      portfolioCat: 'Cloud & Databases',      Icon: CloudIcon,     color: '#06d6a0', desc: 'Scalable cloud platforms and database systems' },
  { id: 'other',  label: 'Other',                  portfolioCat: 'Other',                  Icon: OtherIcon,     color: '#ffd60a', desc: 'Cross-domain and leadership skills' },
];

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ pct, color, trigger }: { pct: number; color: string; trigger: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (trigger) { const t = setTimeout(() => setW(pct), 100); return () => clearTimeout(t); }
    else setW(0);
  }, [trigger, pct]);
  return (
    <div style={{ position: 'relative', height: '8px', borderRadius: '20px', background: 'var(--bd)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: `${w}%`, borderRadius: '20px',
        background: `linear-gradient(90deg,${color}80,${color}ff)`,
        boxShadow: `0 0 12px ${color}70`,
        transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
      }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '40px',
        background: 'linear-gradient(90deg,transparent,var(--tx-3),transparent)',
        animation: trigger ? 'skillShine 2.2s ease 1s infinite' : 'none',
        borderRadius: '20px',
      }} />
    </div>
  );
}

// ─── Skill Row ────────────────────────────────────────────────────────────────
function SkillRow({ name, pct, color, delay, trigger }: {
  name: string; pct: number; color: string; delay: number; trigger: boolean;
}) {
  const [hov, setHov] = useState(false);
  const lvl = pct >= 90 ? 'Expert' : pct >= 80 ? 'Advanced' : pct >= 65 ? 'Intermediate' : 'Beginner';
  const lvlOpacity = pct >= 90 ? 1 : pct >= 80 ? 0.85 : pct >= 65 ? 0.65 : 0.45;
  const opHex = Math.round(lvlOpacity * 255).toString(16).padStart(2, '0');
  const opHex2 = Math.round(lvlOpacity * 150).toString(16).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '14px 16px', borderRadius: '12px',
        background: hov ? `${color}0d` : 'transparent',
        border: `1px solid ${hov ? color + '35' : 'transparent'}`,
        transition: 'all 0.25s ease',
        animation: trigger ? `skillRowIn 0.45s ease ${delay}s both` : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: color, opacity: lvlOpacity,
            boxShadow: hov ? `0 0 8px ${color}` : 'none',
            transition: 'box-shadow 0.3s', flexShrink: 0,
          }} />
          <span style={{
            fontSize: '0.92rem', color: hov ? 'var(--tx)' : 'var(--tx-2)',
            fontWeight: 500, transition: 'color 0.25s',
          }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{
            fontSize: '0.63rem', fontFamily: 'monospace', letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: `${color}${opHex}`,
            border: `1px solid ${color}${opHex2}`,
            padding: '2px 9px', borderRadius: '100px', background: `${color}10`,
          }}>
            {lvl}
          </span>
          <span style={{
            fontSize: '0.82rem', fontFamily: 'monospace',
            color: hov ? color : 'var(--tx-2)',
            fontWeight: 700, minWidth: '36px', textAlign: 'right' as const,
            transition: 'color 0.25s',
          }}>
            {pct}%
          </span>
        </div>
      </div>
      <ProgressBar pct={pct} color={color} trigger={trigger} />
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabBtn({ cat, isActive, onClick }: { cat: CatConfig; isActive: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [iconAnim, setIconAnim] = useState(false);
  const lit = isActive || hov;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => { setHov(true); setIconAnim(true); }}
      onMouseLeave={() => { setHov(false); setTimeout(() => setIconAnim(false), 600); }}
      style={{
        display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '10px',
        padding: '18px 12px 14px', borderRadius: '16px', border: 'none',
        background: isActive
          ? `linear-gradient(160deg,${cat.color}22,${cat.color}08)`
          : hov ? `${cat.color}0d` : 'var(--bg-card)',
        outline: isActive
          ? `1.5px solid ${cat.color}65`
          : hov ? `1px solid ${cat.color}35` : '1px solid var(--bd)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: isActive ? 'scale(1.04) translateY(-2px)' : hov ? 'translateY(-2px)' : 'none',
        boxShadow: isActive ? `0 8px 32px ${cat.color}28` : hov ? `0 4px 16px ${cat.color}15` : 'none',
        position: 'relative' as const, overflow: 'hidden',
      }}
    >
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', borderRadius: '0 0 4px 4px',
          background: cat.color, boxShadow: `0 0 12px ${cat.color}`,
        }} />
      )}
      <div style={{
        width: '46px', height: '46px', borderRadius: '13px',
        border: `1.5px solid ${lit ? cat.color + '55' : 'var(--bd)'}`,
        background: lit ? `${cat.color}18` : 'var(--bg-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s',
        boxShadow: isActive ? `0 0 20px ${cat.color}30` : 'none',
      }}>
        <cat.Icon color={lit ? cat.color : 'var(--tx-3)'} animate={iconAnim || isActive} />
      </div>
      <span style={{
        fontSize: '0.65rem', fontFamily: 'monospace',
        color: isActive ? cat.color : hov ? cat.color + 'cc' : 'var(--tx-3)',
        fontWeight: 700, letterSpacing: '0.05em', textAlign: 'center' as const, lineHeight: 1.3,
        transition: 'color 0.3s', textTransform: 'uppercase' as const, whiteSpace: 'pre-line' as const,
      }}>
        {cat.label.replace(' & ', '\n& ')}
      </span>
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Skills() {
  const { skills } = portfolio;
  const [active, setActive] = useState<CatId>('lang');
  const [animKey, setAnimKey] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [triggered, setTriggered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const ag = CATS.find((c) => c.id === active)!;

  // Build skill rows for active category from portfolio data
  const activeSkills = skills
    .filter((s) => s.category === ag.portfolioCat)
    .map((s) => ({ name: s.name, pct: levelToPct(s.name, s.level) }));

  const totalSkills = skills.length;
  const avgAll = Math.round(skills.reduce((a, s) => a + levelToPct(s.name, s.level), 0) / skills.length);
  const avgActive = activeSkills.length
    ? Math.round(activeSkills.reduce((a, s) => a + s.pct, 0) / activeSkills.length)
    : 0;

  const handleTab = (id: CatId) => {
    setActive(id); setAnimKey((k) => k + 1);
    setTriggered(false); setTimeout(() => setTriggered(true), 80);
  };

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.1 });
    if (panelRef.current) obs.observe(panelRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes skillFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes skillRowIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes skillShine{0%{left:-40px}100%{left:110%}}
        @keyframes skillPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes skillPanelIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes langFade{0%,100%{opacity:.4}50%{opacity:1}}
      `}</style>

      <section
        id="skills"
        ref={containerRef}
        style={{ background: 'var(--bg)', color: 'var(--tx)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Mouse glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, ${ag.color}12 0%, transparent 65%)`,
          transition: 'background 1s ease',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Corner blob */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px',
          borderRadius: '50%', background: `radial-gradient(circle,${ag.color}08,transparent 70%)`,
          pointerEvents: 'none', transition: 'background 1.2s',
        }} />

        <div className="section-pad" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', padding: '80px 32px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '52px', animation: 'skillFadeUp 0.6s ease both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: ag.color, fontFamily: 'monospace', marginBottom: '18px',
              border: `1px solid ${ag.color}35`, padding: '7px 20px', borderRadius: '100px',
              transition: 'color 0.5s, border-color 0.5s', background: `${ag.color}08`,
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: ag.color,
                display: 'inline-block', animation: 'skillPulse 2s infinite',
                boxShadow: `0 0 8px ${ag.color}`, transition: 'background 0.5s',
              }} />
              Technical Expertise
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px',
              backgroundImage: `linear-gradient(140deg, var(--h-from) 35%, ${ag.color} 100%)`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
              transition: 'background-image 0.6s',
            } as React.CSSProperties}>
              Skills &amp;<br />Technologies
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--tx-3)', lineHeight: 1.8, fontStyle: 'italic' }}>
              Hover icons to see them animate · select a category to explore proficiency
            </p>
          </div>

          {/* Stats */}
          <div className="skills-stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
            marginBottom: '40px', animation: 'skillFadeUp 0.6s ease 0.1s both',
          }}>
            {[
              { label: 'Total Skills', value: totalSkills, suffix: '' },
              { label: 'Domains', value: CATS.length, suffix: '' },
              { label: 'Avg Proficiency', value: avgAll, suffix: '%' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '20px 24px', borderRadius: '16px',
                border: '1px solid var(--bd)',
                background: 'var(--bg-card)',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: `linear-gradient(90deg, transparent, ${ag.color}55, transparent)`,
                  transition: 'background 0.5s',
                }} />
                <div style={{
                  fontSize: '2.4rem', fontWeight: 900, color: ag.color,
                  lineHeight: 1, transition: 'color 0.5s', textShadow: `0 0 30px ${ag.color}40`,
                }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--tx-3)', marginTop: '6px',
                  fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Category tabs */}
          <div className="skills-cat-tabs" style={{
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px',
            marginBottom: '28px', animation: 'skillFadeUp 0.6s ease 0.15s both',
          }}>
            {CATS.map((c) => (
              <TabBtn key={c.id} cat={c} isActive={active === c.id} onClick={() => handleTab(c.id)} />
            ))}
          </div>

          {/* Skills panel */}
          <div ref={panelRef} key={animKey} style={{
            borderRadius: '22px',
            border: `1.5px solid ${ag.color}45`,
            background: `linear-gradient(160deg, ${ag.color}10 0%, var(--bg-card-deep) 60%)`,
            boxShadow: `0 0 100px ${ag.color}15, inset 0 1px 0 ${ag.color}25`,
            overflow: 'hidden', position: 'relative',
            animation: 'skillPanelIn 0.4s cubic-bezier(0.4,0,0.2,1) both',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent 5%, ${ag.color}80 50%, transparent 95%)`,
              boxShadow: `0 0 20px ${ag.color}50`,
            }} />

            {/* Panel header */}
            <div className="skills-panel-header" style={{
              padding: '26px 32px 22px',
              borderBottom: `1px solid ${ag.color}15`,
              display: 'flex', alignItems: 'center', gap: '18px',
              background: `${ag.color}05`,
            }}>
              <div style={{
                width: '58px', height: '58px', borderRadius: '16px',
                border: `2px solid ${ag.color}55`,
                background: `linear-gradient(135deg, ${ag.color}20, ${ag.color}08)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 30px ${ag.color}30, inset 0 1px 0 ${ag.color}30`,
                flexShrink: 0,
              }}>
                <ag.Icon color={ag.color} animate={true} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--tx)', marginBottom: '5px' }}>
                  {ag.label}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--tx-3)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  {ag.desc}
                </p>
              </div>
              <div className="skills-avg-box" style={{
                textAlign: 'center', padding: '14px 22px', borderRadius: '14px',
                border: `1px solid ${ag.color}35`, background: `${ag.color}10`, flexShrink: 0,
              }}>
                <div style={{
                  fontSize: '2.2rem', fontWeight: 900, color: ag.color,
                  lineHeight: 1, textShadow: `0 0 24px ${ag.color}60`,
                }}>
                  {avgActive}%
                </div>
                <div style={{
                  fontSize: '0.6rem', color: 'var(--tx-3)', marginTop: '4px',
                  fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  avg
                </div>
              </div>
            </div>

            {/* Skills grid */}
            <div className="skills-panel-body" style={{
              padding: '24px 24px 28px',
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px',
            }}>
              {activeSkills.map((skill, i) => (
                <SkillRow
                  key={`${animKey}-${skill.name}`}
                  name={skill.name} pct={skill.pct}
                  color={ag.color} delay={i * 0.08} trigger={triggered}
                />
              ))}
            </div>
          </div>

          {/* All skills quick-browse */}
          <div style={{
            marginTop: '20px', padding: '22px 26px', borderRadius: '16px',
            border: '1px solid var(--bd)',
            background: 'var(--bg-card)',
            animation: 'skillFadeUp 0.6s ease 0.4s both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{
                fontSize: '0.65rem', fontFamily: 'monospace',
                color: 'var(--tx-3)', letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                All Skills
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--bd)' }} />
              <span style={{
                fontSize: '0.65rem', fontFamily: 'monospace',
                color: 'var(--tx-5)', letterSpacing: '0.1em',
              }}>
                click to filter
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {CATS.flatMap((c) =>
                skills.filter((s) => s.category === c.portfolioCat).map((s) => {
                  const isActiveCat = active === c.id;
                  return (
                    <button
                      key={`${c.id}-${s.name}`}
                      onClick={() => handleTab(c.id)}
                      style={{
                        padding: '6px 14px', borderRadius: '9px', border: 'none',
                        fontSize: '0.78rem', fontWeight: 500,
                        outline: `1px solid ${isActiveCat ? c.color + '55' : 'var(--bd)'}`,
                        color: isActiveCat ? c.color : 'var(--tx-3)',
                        background: isActiveCat ? `${c.color}14` : 'var(--bg-card)',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.outline = `1px solid ${c.color}60`;
                        e.currentTarget.style.color = c.color;
                        e.currentTarget.style.background = `${c.color}12`;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.outline = `1px solid ${isActiveCat ? c.color + '55' : 'var(--bd)'}`;
                        e.currentTarget.style.color = isActiveCat ? c.color : 'var(--tx-3)';
                        e.currentTarget.style.background = isActiveCat ? `${c.color}14` : 'var(--bg-card)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: c.color, opacity: isActiveCat ? 1 : 0.4, flexShrink: 0,
                      }} />
                      {s.name}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer */}
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
      </section>
    </>
  );
}
