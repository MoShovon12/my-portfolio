import { useState } from 'react';

interface MOLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  darkMode?: boolean;
}

const SIZES = {
  sm: { outer: 30, font: '0.68rem', sub: '0.38rem', gap: 8 },
  md: { outer: 40, font: '0.85rem', sub: '0.44rem', gap: 10 },
  lg: { outer: 56, font: '1.15rem', sub: '0.54rem', gap: 12 },
  xl: { outer: 82, font: '1.75rem', sub: '0.68rem', gap: 14 },
};

export default function MOLogo({ size = 'md', onClick, darkMode = true }: MOLogoProps) {
  const [hov, setHov] = useState(false);
  const s = SIZES[size];
  const base = darkMode ? 'rgba(4,7,16,' : 'rgba(240,244,248,';
  const textGrad = darkMode
    ? hov ? 'linear-gradient(135deg, #00f5d4 0%, #4cc9f0 50%, #c77dff 100%)'
           : 'linear-gradient(135deg, #ffffff 0%, #00f5d4 60%, #4cc9f0 100%)'
    : hov ? 'linear-gradient(135deg, #00c9ae 0%, #4cc9f0 50%, #6366f1 100%)'
           : 'linear-gradient(135deg, #0d1117 0%, #00b89e 60%, #4cc9f0 100%)';

  const inner = (
    <>
      <style>{`
        @keyframes moSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* Badge */}
      <div style={{ position: 'relative', width: s.outer, height: s.outer, flexShrink: 0 }}>
        {/* Outer dashed ring */}
        <div style={{
          position: 'absolute', inset: '-3px', borderRadius: '50%',
          border: '1px dashed rgba(0,245,212,0.22)',
          animation: 'moSpin 12s linear infinite',
        }} />
        {/* Counter ring */}
        <div style={{
          position: 'absolute', inset: '-6px', borderRadius: '50%',
          border: '1px dashed rgba(76,201,240,0.1)',
          animation: 'moSpin 18s linear infinite reverse',
        }} />
        {/* Teal orbiting dot */}
        <div style={{ position: 'absolute', inset: '-3px', animation: 'moSpin 4s linear infinite', borderRadius: '50%' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '-3px',
            width: '5px', height: '5px', borderRadius: '50%',
            background: '#00f5d4', boxShadow: '0 0 10px #00f5d4, 0 0 18px #00f5d440',
            transform: 'translateY(-50%)',
          }} />
        </div>
        {/* Purple orbiting dot */}
        <div style={{ position: 'absolute', inset: '-6px', animation: 'moSpin 7s linear infinite reverse', borderRadius: '50%' }}>
          <div style={{
            position: 'absolute', bottom: '-2px', right: '20%',
            width: '4px', height: '4px', borderRadius: '50%',
            background: '#c77dff', boxShadow: '0 0 8px #c77dff',
          }} />
        </div>
        {/* Main circle */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: hov
            ? `radial-gradient(circle at 35% 35%, rgba(0,245,212,0.25), rgba(76,201,240,0.1), ${base}0.95))`
            : `radial-gradient(circle at 35% 35%, rgba(0,245,212,0.12), ${base}0.98))`,
          border: `1.5px solid ${hov ? 'rgba(0,245,212,0.75)' : 'rgba(0,245,212,0.35)'}`,
          boxShadow: hov
            ? '0 0 28px rgba(0,245,212,0.35), inset 0 1px 0 rgba(0,245,212,0.3)'
            : '0 0 10px rgba(0,245,212,0.12), inset 0 1px 0 rgba(0,245,212,0.15)',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 900,
            fontSize: s.font, lineHeight: 1,
            backgroundImage: textGrad,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            transition: 'all 0.4s', letterSpacing: '-0.03em',
            filter: hov ? 'drop-shadow(0 0 8px rgba(0,245,212,0.6))' : 'none',
          } as React.CSSProperties}>
            MO
          </span>
        </div>
      </div>

    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'inline-flex', alignItems: 'center', gap: `${s.gap}px`,
        }}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href="/"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: `${s.gap}px` }}
    >
      {inner}
    </a>
  );
}
