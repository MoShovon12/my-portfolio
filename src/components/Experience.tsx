import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

// ─── Per-entry display metadata (color + duration) ───────────────────────────
const META: Record<string, { color: string; duration: string }> = {
  'exp-1': { color: '#6366f1', duration: 'Present' },
  'exp-2': { color: '#a855f7', duration: '6 mos'   },
  'exp-3': { color: '#3b82f6', duration: 'Present' },
  'exp-4': { color: '#10b981', duration: '1.3 yrs' },
  'exp-5': { color: '#f59e0b', duration: '1.2 yrs' },
  'edu-1': { color: '#ec4899', duration: '1 yr'    },
  'edu-2': { color: '#fbbf24', duration: '4 yrs'   },
};

// ─── SVG icons ───────────────────────────────────────────────────────────────
function ChevronIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
      <polyline points="3,5 8,11 13,5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="7" width="16" height="11" rx="2" stroke={color} strokeWidth="1.3" />
      <path d="M6 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="1.3" />
      <line x1="2" y1="12" x2="18" y2="12" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

function GradCapIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <polygon points="10,3 20,8 10,13 0,8" stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.08" strokeLinejoin="round" />
      <path d="M4 10v5c0 0 2 3 6 3s6-3 6-3v-5" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <line x1="20" y1="8" x2="20" y2="14" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="12" rx="2" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="1" y1="7" x2="15" y2="7" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <line x1="5" y1="1" x2="5" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
      <line x1="11" y1="1" x2="11" y2="5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

function LocationIcon({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M8 1C5.24 1 3 3.24 3 6c0 4 5 9 5 9s5-5 5-9c0-2.76-2.24-5-5-5z"
        stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx="8" cy="6" r="1.8" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <polyline points="2,6 5,9 10,3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Collapsible card ────────────────────────────────────────────────────────
interface TimelineEntry {
  id: string;
  title: string;
  org: string;
  period: string;
  location: string;
  entryType: 'job' | 'project' | 'education';
  isCurrent: boolean;
  summary: string;
  bullets: string[];
  technologies: string[];
  color: string;
  duration: string;
}

function TimelineCard({ entry, index, isOpen, onToggle }: {
  entry: TimelineEntry; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const typeLabel = entry.entryType === 'education' ? 'Education'
    : entry.entryType === 'project' ? 'Project' : 'Full-time';
  const typeColor = entry.entryType === 'education' ? '#ec4899'
    : entry.entryType === 'project' ? '#f59e0b' : 'var(--tx-3)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div style={{
        border: `1px solid ${isOpen ? entry.color + '55' : 'var(--bd)'}`,
        borderRadius: '16px',
        background: isOpen
          ? `linear-gradient(145deg, ${entry.color}0e, ${entry.color}04, var(--bg-card-deep))`
          : 'var(--bg-card)',
        transition: 'border-color 0.4s, background 0.4s, box-shadow 0.4s',
        boxShadow: isOpen ? `0 8px 48px ${entry.color}18, inset 0 1px 0 ${entry.color}15` : 'none',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Top shimmer */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: isOpen
            ? `linear-gradient(90deg, transparent 5%, ${entry.color}50 50%, transparent 95%)`
            : 'transparent',
          transition: 'background 0.4s',
        }} />

        {/* Header — always visible */}
        <div onClick={onToggle} className="exp-card-header" style={{
          padding: '20px 24px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '16px', userSelect: 'none',
        }}>
          {/* Icon box */}
          <div style={{
            width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
            border: `1px solid ${isOpen ? entry.color + '50' : 'var(--bd)'}`,
            background: isOpen ? `${entry.color}12` : 'var(--bg-card)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.4s',
            boxShadow: isOpen ? `0 0 20px ${entry.color}20` : 'none',
          }}>
            {entry.entryType === 'education'
              ? <GradCapIcon color={entry.color} size={18} />
              : <BriefcaseIcon color={entry.color} size={18} />}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tx)' }}>
                {entry.title}
              </span>
              {entry.isCurrent && (
                <span style={{
                  fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: entry.color,
                  background: `${entry.color}18`, border: `1px solid ${entry.color}40`,
                  padding: '2px 8px', borderRadius: '100px',
                }}>
                  Current
                </span>
              )}
              <span style={{
                fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: typeColor,
                background: `${typeColor}18`, border: `1px solid ${typeColor}30`,
                padding: '2px 8px', borderRadius: '100px',
              }}>
                {typeLabel}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: entry.color, fontFamily: 'monospace', fontWeight: 700 }}>
                {entry.org}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.75rem', color: 'var(--tx-3)' }}>
                <CalendarIcon color="var(--tx-3)" />
                {entry.period}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.75rem', color: 'var(--tx-3)' }}>
                <LocationIcon color="var(--tx-3)" />
                {entry.location}
              </span>
            </div>
          </div>

          {/* Duration + chevron */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: 'var(--tx-3)', letterSpacing: '0.08em' }}>
              {entry.duration}
            </span>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              border: `1px solid ${isOpen ? entry.color + '40' : 'var(--bd)'}`,
              background: isOpen ? `${entry.color}10` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.35s',
            }}>
              <ChevronIcon open={isOpen} color={isOpen ? entry.color : 'var(--tx-3)'} />
            </div>
          </div>
        </div>

        {/* Summary teaser (collapsed only) */}
        <div style={{
          maxHeight: isOpen ? '0' : '40px', overflow: 'hidden',
          opacity: isOpen ? 0 : 1,
          transition: 'all 0.35s ease',
          padding: isOpen ? '0 24px' : '0 24px 16px 80px',
        }}>
          <p style={{
            fontSize: '0.8rem', color: 'var(--tx-3)', lineHeight: 1.5,
            fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {entry.summary}
          </p>
        </div>

        {/* Expanded content */}
        <div style={{
          height: `${height}px`, overflow: 'hidden',
          transition: 'height 0.45s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <div ref={contentRef}>
            <div style={{ borderTop: `1px solid ${entry.color}18`, margin: '0 24px' }} />
            <div style={{ padding: '20px 24px 24px' }}>

              {/* Summary */}
              <p style={{
                fontSize: '0.88rem', color: 'var(--tx-2)',
                lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic',
                paddingLeft: '12px', borderLeft: `2px solid ${entry.color}40`,
              }}>
                {entry.summary}
              </p>

              {/* Bullets */}
              {entry.bullets.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    fontSize: '0.65rem', fontFamily: 'monospace', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'var(--tx-3)', marginBottom: '12px',
                  }}>
                    Key Highlights
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {entry.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                          border: `1px solid ${entry.color}35`, background: `${entry.color}0d`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px',
                        }}>
                          <CheckIcon color={entry.color} />
                        </div>
                        <span style={{ fontSize: '0.83rem', color: 'var(--tx-2)', lineHeight: 1.6 }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech pills */}
              {entry.technologies.length > 0 && (
                <div>
                  <div style={{
                    fontSize: '0.65rem', fontFamily: 'monospace', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'var(--tx-3)', marginBottom: '10px',
                  }}>
                    Technologies
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {entry.technologies.map((t) => (
                      <span key={t} style={{
                        padding: '5px 13px', borderRadius: '100px',
                        fontSize: '0.72rem', fontFamily: 'monospace',
                        border: `1px solid ${entry.color}40`,
                        color: entry.color, background: `${entry.color}0e`,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Collapse */}
              <button
                onClick={onToggle}
                style={{
                  marginTop: '20px', background: 'transparent',
                  border: '1px solid var(--bd)', borderRadius: '8px',
                  padding: '8px 16px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: 'var(--tx-3)', fontSize: '0.72rem',
                  fontFamily: 'monospace', letterSpacing: '0.08em', transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${entry.color}50`;
                  e.currentTarget.style.color = entry.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bd)';
                  e.currentTarget.style.color = 'var(--tx-3)';
                }}
              >
                <ChevronIcon open={true} color="currentColor" />
                Collapse
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Experience() {
  const { experience, education } = portfolio;
  const [openId, setOpenId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // Merge experience + education into one timeline
  const entries: TimelineEntry[] = [
    ...experience.map((e) => ({
      id: e.id,
      title: e.role,
      org: e.company,
      period: `${e.startDate} — ${e.endDate}`,
      location: e.location,
      entryType: e.type as 'job' | 'project',
      isCurrent: e.endDate === 'Present',
      summary: e.description[0] ?? '',
      bullets: e.description,
      technologies: e.technologies ?? [],
      color: META[e.id]?.color ?? '#6366f1',
      duration: META[e.id]?.duration ?? '',
    })),
    ...education.map((e) => ({
      id: e.id,
      title: `${e.degree} ${e.field}`,
      org: e.institution,
      period: `${e.startYear} — ${e.endYear}`,
      location: e.location,
      entryType: 'education' as const,
      isCurrent: false,
      summary: `${e.degree} in ${e.field} at ${e.institution}, ${e.location}.`,
      bullets: [],
      technologies: [],
      color: META[e.id]?.color ?? '#ec4899',
      duration: META[e.id]?.duration ?? '',
    })),
  ];

  const expEntries = entries.filter((e) => e.entryType !== 'education');
  const eduEntries = entries.filter((e) => e.entryType === 'education');
  const activeColor = openId ? (entries.find((e) => e.id === openId)?.color ?? '#6366f1') : '#6366f1';

  function SectionLabel({ label, color, icon }: { label: string; color: string; icon: string }) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px',
      }}>
        <span style={{
          fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color, fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '8px',
          border: `1px solid ${color}30`, padding: '5px 16px', borderRadius: '100px',
          background: `${color}08`,
        }}>
          <span>{icon}</span> {label}
        </span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}20, transparent)` }} />
      </div>
    );
  }

  return (
    <section
      id="experience"
      ref={containerRef}
      style={{ background: 'var(--bg)', color: 'var(--tx)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Mouse glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 55% 45% at ${mousePos.x}% ${mousePos.y}%, ${activeColor}0c 0%, transparent 65%)`,
        transition: 'background 1.2s ease',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="section-pad" style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', padding: '80px 32px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#6366f1', fontFamily: 'monospace', marginBottom: '18px',
            border: '1px solid #6366f130', padding: '6px 18px', borderRadius: '100px',
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
            Career Journey
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '16px',
            backgroundImage: 'linear-gradient(140deg, var(--h-from) 40%, #6366f1 100%)',
            backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
          } as React.CSSProperties}>
            Experience &amp;<br />Education
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--tx-3)', lineHeight: 1.8, fontStyle: 'italic' }}>
            Click any role to expand full details — click again to collapse.
          </p>
        </motion.div>

        {/* ── Work Experience ── */}
        <SectionLabel label="Work Experience" color="#6366f1" icon="💼" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '64px' }}>
          {expEntries.map((entry, i) => (
            <TimelineCard
              key={entry.id}
              entry={entry} index={i}
              isOpen={openId === entry.id}
              onToggle={() => setOpenId((prev) => prev === entry.id ? null : entry.id)}
            />
          ))}
        </div>

        {/* ── Education ── */}
        <SectionLabel label="Education" color="#ec4899" icon="🎓" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {eduEntries.map((entry, i) => (
            <TimelineCard
              key={entry.id}
              entry={entry} index={i}
              isOpen={openId === entry.id}
              onToggle={() => setOpenId((prev) => prev === entry.id ? null : entry.id)}
            />
          ))}
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

      <style>{`
        @keyframes xpNodePulse {
          0%, 100% { opacity: 0.7; transform: scale(0.96); }
          50%       { opacity: 1;   transform: scale(1.1);  }
        }
      `}</style>
    </section>
  );
}
