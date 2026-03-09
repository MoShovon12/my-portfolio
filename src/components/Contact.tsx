import { useState, useEffect, useRef } from 'react';
import portfolio from '../data/portfolio';

const COLOR = '#00f5d4';

// ─── Icons ────────────────────────────────────────────────────────────────────
interface IconProps { color: string; animate?: boolean; }

function EmailIcon({ color, animate }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes mailOpen{0%,100%{transform-origin:12px 8px;transform:rotateX(0deg)}50%{transform-origin:12px 8px;transform:rotateX(-20deg)}}`}</style>
      <rect x="2" y="6" width="20" height="14" rx="2" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.08"
        style={animate ? { animation: 'mailOpen 2.5s ease-in-out infinite' } : {}} />
      <polyline points="2,7 12,14 22,7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon({ color, animate }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes liPulse{0%,100%{opacity:1}50%{opacity:0.6}}`}</style>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.08"
        style={animate ? { animation: 'liPulse 2s ease infinite' } : {}} />
      <line x1="7" y1="10" x2="7" y2="17" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="7" cy="7.5" r="1.2" fill={color} />
      <path d="M11 10v7M11 13c0-2 7-3 7 1v3" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GitHubIcon({ color, animate }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <style>{`@keyframes gitSpin{from{transform-origin:12px 12px;transform:rotate(0deg)}to{transform-origin:12px 12px;transform:rotate(360deg)}}`}</style>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
        stroke={color} strokeWidth="0.5" fill={color} fillOpacity="0.85"
        style={animate ? { animation: 'gitSpin 8s linear infinite' } : {}} />
    </svg>
  );
}

function LocationIcon({ color }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
      <circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

function SendIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <line x1="22" y1="2" x2="11" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <polygon points="22,2 15,22 11,13 2,9" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08" />
      <polyline points="14,24 21,31 34,17" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Build contact items from portfolio data ──────────────────────────────────
interface ContactItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  color: string;
  Icon: React.ComponentType<IconProps>;
  href: string | null;
}

// ─── Contact card ─────────────────────────────────────────────────────────────
function ContactCard({ item, index, visible }: { item: ContactItem; index: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  const [iconAnim, setIconAnim] = useState(false);

  const inner = (
    <>
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '2px',
        background: hov ? item.color : 'transparent',
        borderRadius: '0 2px 2px 0',
        boxShadow: hov ? `0 0 12px ${item.color}` : 'none',
        transition: 'all 0.3s',
      }} />

      <div style={{
        width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
        border: `1px solid ${hov ? item.color + '50' : 'var(--bd)'}`,
        background: hov ? `${item.color}15` : 'var(--bg-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.32s', boxShadow: hov ? `0 0 22px ${item.color}28` : 'none',
      }}>
        <item.Icon color={hov ? item.color : 'var(--tx-3)'} animate={iconAnim} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.65rem', fontFamily: 'monospace',
          color: 'var(--tx-3)', letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: '3px',
        }}>
          {item.label}
        </div>
        <div style={{
          fontSize: '0.88rem', color: hov ? 'var(--tx)' : 'var(--tx-2)',
          fontWeight: 500, transition: 'color 0.25s',
          whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.value}
        </div>
        <div style={{
          fontSize: '0.72rem', color: hov ? item.color : 'var(--tx-3)',
          marginTop: '2px', transition: 'color 0.3s', fontStyle: 'italic',
        }}>
          {item.sub}
        </div>
      </div>

      {item.href && (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
          style={{ flexShrink: 0, opacity: hov ? 0.8 : 0.2, transition: 'opacity 0.3s' }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke={item.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  const sharedStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '16px',
    padding: '18px 20px', borderRadius: '16px',
    border: `1px solid ${hov ? item.color + '55' : 'var(--bd)'}`,
    background: hov
      ? `linear-gradient(135deg, ${item.color}10, ${item.color}04, var(--bg-card-deep))`
      : 'var(--bg-card)',
    textDecoration: 'none', color: 'inherit',
    transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
    transform: hov ? 'translateX(6px)' : 'none',
    boxShadow: hov ? `0 8px 32px ${item.color}18, inset 0 1px 0 ${item.color}15` : 'none',
    cursor: item.href ? 'pointer' : 'default',
    opacity: visible ? 1 : 0,
    animation: visible ? `ctSlideIn 0.5s ease ${index * 0.08}s both` : 'none',
    position: 'relative', overflow: 'hidden',
  };

  const handlers = {
    onMouseEnter: () => { setHov(true); setIconAnim(true); },
    onMouseLeave: () => { setHov(false); setTimeout(() => setIconAnim(false), 800); },
  };

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={sharedStyle} {...handlers}>
        {inner}
      </a>
    );
  }
  return <div style={sharedStyle} {...handlers}>{inner}</div>;
}

// ─── Form field ───────────────────────────────────────────────────────────────
function Field({ label, type = 'text', name, placeholder, value, onChange, rows }: {
  label: string; type?: string; name: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '14px 18px',
    background: 'var(--bg-card)',
    border: `1.5px solid ${focused ? COLOR + '60' : value ? 'var(--bd-2)' : 'var(--bd)'}`,
    borderRadius: '12px', color: 'var(--tx)',
    fontSize: '0.9rem', fontFamily: 'inherit',
    outline: 'none', resize: rows ? 'vertical' : 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused ? `0 0 0 3px ${COLOR}12, 0 0 24px ${COLOR}10` : 'none',
    lineHeight: 1.6, minHeight: rows ? '120px' : 'auto',
  };

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        display: 'block', fontSize: '0.68rem', fontFamily: 'monospace',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: focused ? COLOR : 'var(--tx-3)',
        marginBottom: '8px', transition: 'color 0.25s',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        {rows ? (
          <textarea name={name} placeholder={placeholder} value={value} onChange={onChange}
            rows={rows} style={fieldStyle}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        ) : (
          <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
            style={fieldStyle}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
          background: `linear-gradient(90deg, transparent, ${COLOR}, transparent)`,
          opacity: focused ? 1 : 0, boxShadow: focused ? `0 0 12px ${COLOR}` : 'none',
          transition: 'opacity 0.3s', borderRadius: '0 0 12px 12px',
        }} />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const { contact } = portfolio;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [infoVisible, setInfoVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Build contact items from portfolio data
  const contactItems: ContactItem[] = [
    {
      id: 'email', label: 'Email', value: contact.email,
      sub: 'Available Mon–Fri, reply within 24hrs',
      color: '#00f5d4', Icon: EmailIcon, href: `mailto:${contact.email}`,
    },
    ...contact.socials.map((s) => ({
      id: s.platform.toLowerCase(),
      label: s.platform,
      value: s.url.replace('https://', ''),
      sub: s.platform === 'LinkedIn' ? "Let's connect professionally" : 'Check out my open source work',
      color: s.platform === 'LinkedIn' ? '#4cc9f0' : '#c77dff',
      Icon: s.platform === 'LinkedIn' ? LinkedInIcon : GitHubIcon,
      href: s.url,
    })),
    {
      id: 'location', label: 'Location', value: 'Wales, United Kingdom',
      sub: 'Open to remote & hybrid roles',
      color: '#f4a261', Icon: LocationIcon, href: null,
    },
  ];

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
    const o1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInfoVisible(true); }, { threshold: 0.1 });
    const o2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVisible(true); }, { threshold: 0.1 });
    if (infoRef.current) o1.observe(infoRef.current);
    if (formRef.current) o2.observe(formRef.current);
    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true); setError(false);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST', body: data, headers: { Accept: 'application/json' },
      });
      if (res.ok) { setSent(true); }
      else { setError(true); }
    } catch { setError(true); }
    finally { setSending(false); }
  };

  const allFilled = !!(form.name && form.email && form.message);

  return (
    <>
      <style>{`
        @keyframes ctFadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ctSlideIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ctSlideRight{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ctPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes ctSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes ctSuccessPop{0%{opacity:0;transform:scale(0.85)}100%{opacity:1;transform:scale(1)}}
        @keyframes ctShimmer{0%{left:-40px}100%{left:110%}}
        input::placeholder,textarea::placeholder{color:var(--tx-5);}
      `}</style>

      <section
        id="contact"
        ref={containerRef}
        style={{ background: 'var(--bg)', color: 'var(--tx)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Mouse glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, ${COLOR}0e 0%, transparent 65%)`,
          transition: 'background 1.2s ease',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${COLOR}07, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, #4cc9f005, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1080px', margin: '0 auto', padding: '80px 32px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'ctFadeUp 0.6s ease both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '0.67rem', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: COLOR, fontFamily: 'monospace', marginBottom: '18px',
              border: `1px solid ${COLOR}35`, padding: '7px 20px', borderRadius: '100px',
              background: `${COLOR}08`,
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', background: COLOR,
                display: 'inline-block', animation: 'ctPulse 2s infinite', boxShadow: `0 0 8px ${COLOR}`,
              }} />
              Let's Connect
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '18px',
              backgroundImage: `linear-gradient(140deg, var(--h-from) 35%, ${COLOR} 100%)`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
            } as React.CSSProperties}>
              Get In Touch
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--tx-3)', lineHeight: 1.8, fontStyle: 'italic', maxWidth: '520px', margin: '0 auto' }}>
              Have a project in mind or just want to say hi? Drop me a message —<br />
              I'll get back to you as soon as possible.
            </p>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'start' }}>

            {/* LEFT: Contact info */}
            <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Availability */}
              <div style={{
                padding: '16px 20px', borderRadius: '14px',
                border: `1px solid ${COLOR}30`,
                background: `linear-gradient(135deg, ${COLOR}0e, ${COLOR}04, var(--bg-card-deep))`,
                display: 'flex', alignItems: 'center', gap: '14px',
                opacity: infoVisible ? 1 : 0,
                animation: infoVisible ? 'ctSlideIn 0.5s ease both' : 'none',
                boxShadow: `0 0 40px ${COLOR}10, inset 0 1px 0 ${COLOR}15`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px', background: `linear-gradient(90deg, transparent, ${COLOR}50, transparent)` }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06d6a0', boxShadow: '0 0 12px #06d6a0', animation: 'ctPulse 2s infinite', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#06d6a0', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '2px' }}>
                    Available for Work
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--tx-3)', fontStyle: 'italic' }}>
                    Open to full-time &amp; freelance opportunities
                  </div>
                </div>
              </div>

              {contactItems.map((item, i) => (
                <ContactCard key={item.id} item={item} index={i} visible={infoVisible} />
              ))}

              {/* Response time */}
              <div style={{
                padding: '14px 18px', borderRadius: '12px',
                border: '1px solid var(--bd)',
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px',
                opacity: infoVisible ? 1 : 0,
                animation: infoVisible ? 'ctSlideIn 0.5s ease 0.45s both' : 'none',
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="var(--tx-5)" strokeWidth="1.2" />
                  <polyline points="8,4.5 8,8.5 10.5,10.5" stroke="var(--tx-3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '0.72rem', color: 'var(--tx-3)', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                  Avg response time: &lt; 24 hours
                </span>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div ref={formRef} style={{
              borderRadius: '22px',
              border: `1.5px solid ${sent ? '#06d6a060' : COLOR + '35'}`,
              background: `linear-gradient(160deg, ${COLOR}0a 0%, var(--bg-card-deep) 60%)`,
              boxShadow: `0 0 80px ${COLOR}10, inset 0 1px 0 ${COLOR}18`,
              overflow: 'hidden', position: 'relative',
              opacity: formVisible ? 1 : 0,
              animation: formVisible ? 'ctSlideRight 0.6s ease 0.1s both' : 'none',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent 5%, ${sent ? '#06d6a080' : COLOR + '70'} 50%, transparent 95%)`,
                boxShadow: `0 0 20px ${COLOR}40`,
              }} />

              {sent ? (
                <div style={{ padding: '60px 40px', textAlign: 'center', animation: 'ctSuccessPop 0.5s cubic-bezier(0.4,0,0.2,1) both' }}>
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircleIcon color="#06d6a0" />
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--tx)', marginBottom: '10px' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--tx-3)', lineHeight: 1.75, marginBottom: '28px' }}>
                    Thanks for reaching out, {form.name.split(' ')[0]}!<br />I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                    style={{
                      padding: '11px 24px', borderRadius: '10px', border: 'none',
                      background: 'var(--bg-card)',
                      outline: '1px solid var(--bd)',
                      color: 'var(--tx-3)', fontSize: '0.75rem',
                      fontFamily: 'monospace', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--tx)'; e.currentTarget.style.outline = '1px solid var(--bd-2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--tx-3)'; e.currentTarget.style.outline = '1px solid var(--bd)'; }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--tx)', marginBottom: '6px' }}>
                      Send a Message
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--tx-3)', fontStyle: 'italic' }}>
                      All fields marked * are required
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="Name *" name="name" placeholder="Muhammad Ali" value={form.name} onChange={update('name')} />
                    <Field label="Email *" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={update('email')} />
                  </div>

                  <Field label="Subject" name="subject" placeholder="Project enquiry, collaboration…" value={form.subject} onChange={update('subject')} />
                  <Field label="Message *" name="message" placeholder="Tell me about your project, idea, or just say hello…" value={form.message} onChange={update('message')} rows={5} />

                  {error && (
                    <p style={{ fontSize: '0.8rem', color: '#f87171', fontFamily: 'monospace' }}>
                      Something went wrong — please try again or email me directly.
                    </p>
                  )}

                  <button
                    onClick={handleSend}
                    disabled={!allFilled || sending}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                      padding: '15px 32px', borderRadius: '12px', border: 'none',
                      background: allFilled ? `linear-gradient(135deg, ${COLOR}cc, ${COLOR})` : 'var(--bd)',
                      color: allFilled ? '#060912' : 'var(--tx-5)',
                      fontSize: '0.82rem', fontFamily: 'monospace',
                      letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
                      cursor: allFilled && !sending ? 'pointer' : 'not-allowed',
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                      boxShadow: allFilled ? `0 8px 32px ${COLOR}40` : 'none',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => { if (allFilled && !sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${COLOR}55`; } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = allFilled ? `0 8px 32px ${COLOR}40` : 'none'; }}
                  >
                    {allFilled && !sending && (
                      <div style={{
                        position: 'absolute', top: 0, bottom: 0, width: '40px',
                        background: 'linear-gradient(90deg, transparent, var(--tx-3), transparent)',
                        animation: 'ctShimmer 2.5s ease infinite',
                      }} />
                    )}
                    {sending ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid #060912', borderTopColor: 'transparent', borderRadius: '50%', animation: 'ctSpin 0.8s linear infinite', flexShrink: 0 }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        <SendIcon color={allFilled ? '#060912' : 'var(--tx-5)'} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', marginTop: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
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
