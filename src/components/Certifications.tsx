import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import portfolio from '../data/portfolio';

// ─── Static presentational metadata (not in portfolio.ts) ────────────────────
const CERT_META: Record<string, { color: string; skills: string[] }> = {
  'cert-1': { color: '#00f5d4', skills: ['Professional Writing', 'Presentation', 'Interpersonal Skills'] },
  'cert-2': { color: '#c77dff', skills: ['Mentoring', 'IT Support', 'Leadership'] },
};

const PUB_META: Record<string, { color: string; tags: string[]; abstract: string }> = {
  'pub-1': {
    color: '#f72585',
    tags: ['AI', 'Healthcare', 'Machine Learning', 'Social Prescribing'],
    abstract: 'This paper presents an AI-driven framework for monitoring physical activity patterns to support social prescribing initiatives, leveraging machine learning to personalise healthcare recommendations.',
  },
};

const STATUS_COLOR: Record<string, string> = {
  published: '#06d6a0',
  'in-progress': '#f4a261',
  preprint: '#4cc9f0',
};

const STATUS_LABEL: Record<string, string> = {
  published: 'Published',
  'in-progress': 'In Progress',
  preprint: 'Preprint',
};

// ─── Icons ────────────────────────────────────────────────────────────────────
interface IconProps { color: string; animate: boolean; }

function CertIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`
        @keyframes certMedalSwing{0%,100%{transform-origin:12px 4px;transform:rotate(-8deg)}50%{transform-origin:12px 4px;transform:rotate(8deg)}}
        @keyframes certStarGlow{0%,100%{opacity:.5}50%{opacity:1}}
      `}</style>
      <circle cx="12" cy="14" r="6" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1"
        style={animate ? { animation: 'certStarGlow 2s ease infinite' } : {}} />
      <polyline points="9,14 11,16 15,12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 8.5 L12 4 L15.5 8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"
        style={animate ? { animation: 'certMedalSwing 2.5s ease-in-out infinite' } : {}} />
      <line x1="10" y1="8.5" x2="10" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="14" y1="8.5" x2="14" y2="10" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  );
}

function PubIcon({ color, animate }: IconProps) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <style>{`
        @keyframes pubPageFlip{0%,100%{transform:skewY(0deg)}50%{transform:skewY(-3deg)}}
        @keyframes pubLineAppear{from{stroke-dashoffset:20}to{stroke-dashoffset:0}}
      `}</style>
      <rect x="4" y="3" width="12" height="16" rx="2" stroke={color} strokeWidth="1.7"
        fill={color} fillOpacity="0.07"
        style={animate ? { animation: 'pubPageFlip 3s ease-in-out infinite' } : {}} />
      <rect x="8" y="5" width="12" height="16" rx="2" stroke={color} strokeWidth="1.7"
        fill={color} fillOpacity="0.04" strokeOpacity="0.5" />
      {[7, 10, 13, 16].map((y, i) => (
        <line key={y} x1="7" y1={y} x2={i === 3 ? 12 : 15} y2={y} stroke={color} strokeWidth="1.2"
          strokeLinecap="round" strokeOpacity={i === 0 ? 0.9 : 0.45}
          style={animate ? { strokeDasharray: 20, animation: `pubLineAppear 0.4s ease ${i * 0.1}s both` } : {}} />
      ))}
    </svg>
  );
}

function CalIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.3" strokeOpacity="0.6" />
      <line x1="1" y1="7" x2="15" y2="7" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
      <line x1="5" y1="1" x2="5" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="11" y1="1" x2="11" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

// ─── Interactive icon box (3D tilt + squish + wiggle — consistent with app) ──
function InteractiveIconBox({
  color, isHovered, children,
}: { color: string; isHovered: boolean; children: React.ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-26, 26], [14, -14]), { stiffness: 380, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-26, 26], [-14, 14]), { stiffness: 380, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scaleX: 1.22, scaleY: 0.72, rotate: -10, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
      whileHover={{ scale: 1.1 }}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformPerspective: 500, transformStyle: 'preserve-3d',
        width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
        border: `1.5px solid ${isHovered ? color + '55' : 'var(--bd)'}`,
        background: isHovered ? `${color}18` : 'var(--bg-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.35s, background 0.35s',
        boxShadow: isHovered ? `0 0 28px ${color}35` : 'none',
        cursor: 'default',
      }}
    >
      <motion.div
        animate={isHovered
          ? { rotate: [0, -14, 12, -6, 4, 0], scale: [1, 1.18, 0.9, 1.06, 0.97, 1] }
          : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Cert card ────────────────────────────────────────────────────────────────
function CertCard({ cert, index, visible }: {
  cert: typeof portfolio.certifications[number];
  index: number;
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  const meta = CERT_META[cert.id] ?? { color: '#6366f1', skills: [] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '18px',
        border: `1.5px solid ${hov ? meta.color + '60' : 'var(--bd)'}`,
        background: hov
          ? `linear-gradient(145deg, ${meta.color}12, ${meta.color}04, var(--bg-card-deep))`
          : 'var(--bg-card)',
        padding: '28px', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.35s, background 0.35s, transform 0.35s, box-shadow 0.35s',
        transform: hov ? 'translateY(-6px)' : 'none',
        boxShadow: hov ? `0 16px 48px ${meta.color}22, inset 0 1px 0 ${meta.color}20` : 'none',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hov ? `linear-gradient(90deg, transparent 5%, ${meta.color}70 50%, transparent 95%)` : 'transparent',
        transition: 'background 0.4s',
        boxShadow: hov ? `0 0 16px ${meta.color}50` : 'none',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
        <InteractiveIconBox color={meta.color} isHovered={hov}>
          <CertIcon color={meta.color} animate={hov} />
        </InteractiveIconBox>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tx)', marginBottom: '5px', lineHeight: 1.3 }}>
            {cert.name}
          </h3>
          <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: meta.color, letterSpacing: '0.04em', fontWeight: 700 }}>
            {cert.issuer}
          </div>
        </div>
      </div>

      {/* Date */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '0.75rem', color: 'var(--tx-3)', marginBottom: '14px',
      }}>
        <CalIcon color="var(--tx-3)" />
        Issued {cert.issueDate}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', marginBottom: '14px', background: `linear-gradient(90deg, ${meta.color}25, transparent)` }} />

      {/* Description */}
      {cert.description && (
        <p style={{ fontSize: '0.84rem', color: 'var(--tx-3)', lineHeight: 1.75, marginBottom: '16px' }}>
          {cert.description}
        </p>
      )}

      {/* Tags */}
      {meta.skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
          {meta.skills.map((s) => (
            <span key={s} style={{
              padding: '4px 12px', borderRadius: '8px',
              fontSize: '0.72rem', fontFamily: 'monospace',
              color: hov ? meta.color : 'var(--tx-3)',
              border: `1px solid ${hov ? meta.color + '45' : 'var(--bd)'}`,
              background: hov ? `${meta.color}0e` : 'var(--bg-card)',
              transition: 'all 0.3s', letterSpacing: '0.03em',
            }}>
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Publication card ─────────────────────────────────────────────────────────
function PubCard({ pub, index, visible }: {
  pub: typeof portfolio.publications[number];
  index: number;
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const meta = PUB_META[pub.id] ?? { color: '#6366f1', tags: [], abstract: '' };
  const sColor = STATUS_COLOR[pub.status] ?? '#6366f1';
  const sLabel = STATUS_LABEL[pub.status] ?? pub.status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '18px',
        border: `1.5px solid ${hov ? meta.color + '55' : 'var(--bd)'}`,
        background: hov
          ? `linear-gradient(145deg, ${meta.color}0e, ${meta.color}04, var(--bg-card-deep))`
          : 'var(--bg-card)',
        padding: '28px', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.35s, background 0.35s, transform 0.35s, box-shadow 0.35s',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 12px 48px ${meta.color}18, inset 0 1px 0 ${meta.color}18` : 'none',
      }}
    >
      {/* Top shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hov ? `linear-gradient(90deg, transparent 5%, ${meta.color}65 50%, transparent 95%)` : 'transparent',
        transition: 'background 0.4s', boxShadow: hov ? `0 0 16px ${meta.color}40` : 'none',
      }} />

      {/* Header */}
      <div className="pub-card-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <InteractiveIconBox color={meta.color} isHovered={hov}>
          <PubIcon color={meta.color} animate={hov} />
        </InteractiveIconBox>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--tx)', lineHeight: 1.4, marginBottom: '10px' }}>
            {pub.title}
          </h3>
          <p style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: meta.color, fontWeight: 700, marginBottom: '6px', lineHeight: 1.5 }}>
            {pub.authors.join(', ')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--tx-3)', fontStyle: 'italic', lineHeight: 1.5 }}>
              {pub.venue}
            </span>
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'var(--tx-3)' }}>
              · {pub.year}
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div className="pub-status-pill" style={{
          display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
          fontSize: '0.63rem', fontFamily: 'monospace',
          color: sColor, background: `${sColor}15`,
          border: `1px solid ${sColor}45`,
          padding: '6px 12px', borderRadius: '100px', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: sColor, boxShadow: `0 0 8px ${sColor}`, display: 'inline-block' }}
          />
          {sLabel}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', marginBottom: '16px', background: `linear-gradient(90deg, ${meta.color}20, var(--bg-card), transparent)` }} />

      {/* Abstract (toggleable) */}
      {meta.abstract && (
        <div style={{
          maxHeight: expanded ? '200px' : '0px', overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          marginBottom: expanded ? '16px' : '0',
        }}>
          <p style={{
            fontSize: '0.84rem', color: 'var(--tx-3)',
            lineHeight: 1.75, paddingLeft: '14px',
            borderLeft: `2px solid ${meta.color}40`, fontStyle: 'italic',
          }}>
            {meta.abstract}
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
          {meta.tags.map((t) => (
            <span key={t} style={{
              padding: '4px 12px', borderRadius: '8px',
              fontSize: '0.7rem', fontFamily: 'monospace',
              color: hov ? meta.color : 'var(--tx-3)',
              border: `1px solid ${hov ? meta.color + '40' : 'var(--bd)'}`,
              background: hov ? `${meta.color}0d` : 'var(--bg-card)',
              transition: 'all 0.3s', letterSpacing: '0.03em',
            }}>
              {t}
            </span>
          ))}
        </div>

        {meta.abstract && (
          <motion.button
            onClick={() => setExpanded((e) => !e)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '9px', border: 'none',
              background: 'var(--bg-card)',
              outline: `1px solid ${expanded ? meta.color + '50' : 'var(--bd)'}`,
              color: expanded ? meta.color : 'var(--tx-3)',
              fontSize: '0.72rem', fontFamily: 'monospace',
              cursor: 'pointer', transition: 'color 0.25s, outline 0.25s', letterSpacing: '0.06em',
            }}
          >
            <motion.svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.35 }}
            >
              <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            {expanded ? 'Hide Abstract' : 'Read Abstract'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ badge, title, subtitle, color }: {
  badge: string; title: string; subtitle: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ marginBottom: '36px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color, fontFamily: 'monospace',
          border: `1px solid ${color}35`, padding: '6px 18px', borderRadius: '100px',
          background: `${color}08`,
        }}>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', boxShadow: `0 0 8px ${color}` }}
          />
          {badge}
        </div>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}20, transparent)` }} />
      </div>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '10px',
        backgroundImage: `linear-gradient(140deg, var(--h-from) 40%, ${color} 100%)`,
        backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
      } as React.CSSProperties}>
        {title}
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--tx-3)', lineHeight: 1.7, fontStyle: 'italic', maxWidth: '520px' }}>
        {subtitle}
      </p>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Certifications() {
  const { certifications, publications } = portfolio;
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [certsVisible, setCertsVisible] = useState(false);
  const [pubsVisible, setPubsVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const pubsRef = useRef<HTMLDivElement>(null);

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
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCertsVisible(true); }, { threshold: 0.1 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPubsVisible(true); }, { threshold: 0.1 });
    if (certsRef.current) o1.observe(certsRef.current);
    if (pubsRef.current) o2.observe(pubsRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <section
      id="certifications"
      ref={containerRef}
      style={{ background: 'var(--bg)', color: 'var(--tx)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mouse glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, #00f5d40c 0%, transparent 65%)`,
        transition: 'background 1.2s ease',
      }} />
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%', width: '500px', height: '500px',
        borderRadius: '50%', background: 'radial-gradient(circle, #00f5d407, transparent 70%)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%', width: '400px', height: '400px',
        borderRadius: '50%', background: 'radial-gradient(circle, #c77dff05, transparent 70%)', pointerEvents: 'none',
      }} />

      <div className="section-pad" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', padding: '80px 32px' }}>

        {/* Certifications */}
        <div ref={certsRef}>
          <SectionLabel
            badge="Credentials"
            title="Certifications & Awards"
            subtitle="Verified credentials and recognitions that demonstrate my commitment to continuous professional development."
            color="#00f5d4"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '18px',
            marginBottom: '80px',
          }}>
            {certifications.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} visible={certsVisible} />
            ))}
          </div>
        </div>

        {/* Separator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '72px',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--bd), transparent)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--tx-5)', boxShadow: '0 0 12px var(--bd)' }} />
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--bd), transparent)' }} />
        </div>

        {/* Publications */}
        {publications.length > 0 && (
          <div ref={pubsRef}>
            <SectionLabel
              badge="Research"
              title="Publications"
              subtitle="Academic research and conference papers exploring the intersection of AI, healthcare, and emerging technologies."
              color="#f72585"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {publications.map((pub, i) => (
                <PubCard key={pub.id} pub={pub} index={i} visible={pubsVisible} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: '72px',
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
  );
}
