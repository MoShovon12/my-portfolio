import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import portfolio from '../data/portfolio';

// ─── Blob config ────────────────────────────────────────────────────────────
const BLOBS = [
  { color: '99, 102, 241',  size: 700, x: 30,  y: 25,  dur: 0     }, // indigo – mouse
  { color: '168, 85,  247', size: 600, x: 65,  y: 60,  dur: 8000  }, // purple
  { color: '236, 72,  153', size: 500, x: 20,  y: 70,  dur: 11000 }, // pink
  { color: '59,  130, 246', size: 550, x: 75,  y: 20,  dur: 9500  }, // blue
  { color: '16,  185, 129', size: 400, x: 50,  y: 85,  dur: 13000 }, // emerald
];

// ─── Tilt-interactive profile card ──────────────────────────────────────────
function ProfileCard() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), {
    stiffness: 700,
    damping: 55,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 700,
    damping: 55,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15, duration: 0.9, ease: 'easeOut' }}
      className="flex-shrink-0 flex items-center justify-center"
    >
      {/* Perspective wrapper */}
      <div style={{ perspective: '900px' }}>
        <motion.div
          className="relative cursor-pointer select-none"
          style={{
            width: 'clamp(220px, 28vw, 320px)',
            height: 'clamp(220px, 28vw, 320px)',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* ── Outermost slow-pulse ring ── */}
          <div
            style={{
              position: 'absolute',
              inset: '-28px',
              borderRadius: '50%',
              border: '1px solid rgba(99, 102, 241, 0.28)',
              animation: 'pulseRing 3.5s ease-in-out infinite',
            }}
          />

          {/* ── Counter-spinning dashed ring ── */}
          <div
            style={{
              position: 'absolute',
              inset: '-14px',
              borderRadius: '50%',
              border: '2px dashed rgba(168, 85, 247, 0.38)',
              animation: 'spinRingReverse 10s linear infinite',
            }}
          />

          {/* ── Spinning conic-gradient ring ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              animation: 'spinRing 4.5s linear infinite',
              zIndex: 2,
            }}
          >
            {/* The gradient fills the whole circle */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, rgba(99,102,241,1) 0%, rgba(168,85,247,0.95) 30%, rgba(236,72,153,0.7) 60%, transparent 78%, rgba(99,102,241,1) 100%)',
              }}
            />
            {/* Inner mask creates the ring gap */}
            <div
              style={{
                position: 'absolute',
                inset: '3px',
                borderRadius: '50%',
                background: 'var(--bg-hero)',
              }}
            />
          </div>

          {/* ── Orbiting particles ── */}
          {[0, 1, 2].map((i) => {
            const colors = [
              'rgba(99,102,241,0.95)',
              'rgba(168,85,247,0.95)',
              'rgba(236,72,153,0.95)',
            ];
            const glows = [
              'rgba(99,102,241,0.7)',
              'rgba(168,85,247,0.7)',
              'rgba(236,72,153,0.7)',
            ];
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: '-22px',
                  borderRadius: '50%',
                  animation: `orbitSpin ${6 + i * 1.4}s linear infinite`,
                  animationDelay: `${i * -1.1}s`,
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: i % 2 === 0 ? '7px' : '5px',
                    height: i % 2 === 0 ? '7px' : '5px',
                    borderRadius: '50%',
                    background: colors[i],
                    transform: 'translateX(-50%)',
                    boxShadow: `0 0 8px 2px ${glows[i]}`,
                  }}
                />
              </div>
            );
          })}

          {/* ── Profile image ── */}
          <div
            style={{
              position: 'absolute',
              inset: '5px',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 3,
              boxShadow:
                '0 0 48px rgba(99,102,241,0.55), 0 0 90px rgba(168,85,247,0.28)',
            }}
          >
            <img
              src="/profile.jpg"
              alt="Muhammad Ohiduzzaman"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
            {/* Dark vignette – fades bright background toward edges */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle, transparent 40%, rgba(7,7,26,0.5) 100%)',
                pointerEvents: 'none',
              }}
            />
            {/* Holographic colour tint overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, transparent 50%, rgba(168,85,247,0.12) 100%)',
                mixBlendMode: 'overlay',
                animation: 'holoShift 5s ease-in-out infinite alternate',
                pointerEvents: 'none',
              }}
            />
            {/* Scan-line texture */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(99,102,241,0.04) 3px, rgba(99,102,241,0.04) 4px)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* ── "Available" floating badge ── */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-card-deep)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '999px',
              padding: '5px 14px',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                animation: 'pulseDot 2s ease-in-out infinite',
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--tx-2)', fontWeight: 500 }}>
              Available for work
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero section ───────────────────────────────────────────────────────
export default function Hero({ darkMode = true }: { darkMode?: boolean }) {
  const { hero } = portfolio;
  const blobRef  = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current  = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId    = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, mousePos.current.x, 0.06);
      current.current.y = lerp(current.current.y, mousePos.current.y, 0.06);

      if (blobRef.current) {
        const el = blobRef.current.querySelector<HTMLDivElement>('[data-mouse]');
        if (el) {
          el.style.left = `${(current.current.x / window.innerWidth)  * 100}%`;
          el.style.top  = `${(current.current.y / window.innerHeight) * 100}%`;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 overflow-hidden"
      style={{ background: 'var(--bg-hero)' }}
    >
      {/* ── Aurora blob layer ──────────────────────────────────────────── */}
      <div ref={blobRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          data-mouse
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width:  BLOBS[0].size,
            height: BLOBS[0].size,
            left:   `${BLOBS[0].x}%`,
            top:    `${BLOBS[0].y}%`,
            background: `radial-gradient(circle, rgba(${BLOBS[0].color}, ${darkMode ? 0.55 : 0.20}) 0%, transparent 70%)`,
            filter: 'blur(60px)',
            willChange: 'transform',
          }}
        />
        {BLOBS.slice(1).map((b, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width:  b.size,
              height: b.size,
              left:   `${b.x}%`,
              top:    `${b.y}%`,
              background: `radial-gradient(circle, rgba(${b.color}, ${darkMode ? 0.45 : 0.16}) 0%, transparent 70%)`,
              filter: 'blur(70px)',
              animation: `blobDrift ${b.dur}ms ease-in-out infinite alternate`,
              animationDelay: `${i * -2000}ms`,
              willChange: 'transform',
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3CfilterFilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Content: photo left + text right ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-20">

        <ProfileCard />

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left max-w-xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg mb-4 tracking-wide"
          >
            Hi, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 leading-tight"
          >
            {hero.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl sm:text-2xl font-medium text-indigo-600 dark:text-indigo-300 mb-6"
          >
            {hero.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl leading-relaxed mb-10"
          >
            {hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollTo(hero.ctaPrimary.href)}
              className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/40 hover:scale-105"
            >
              {hero.ctaPrimary.label}
            </button>
            <button
              onClick={() => scrollTo(hero.ctaSecondary.href)}
              className="px-8 py-3 rounded-full border border-gray-400/40 dark:border-white/20 text-gray-800 dark:text-white font-semibold hover:bg-gray-200/50 dark:hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105"
            >
              {hero.ctaSecondary.label}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-1 text-gray-500 dark:text-gray-500 text-xs tracking-widest uppercase"
      >
        <span>Scroll to discover</span>
        <span className="text-base">↓</span>
      </motion.div>

      {/* ── Keyframes ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes blobDrift {
          0%   { transform: translate(-50%, -50%) scale(1)    rotate(0deg);  }
          33%  { transform: translate(-55%, -45%) scale(1.08) rotate(5deg);  }
          66%  { transform: translate(-45%, -55%) scale(0.95) rotate(-4deg); }
          100% { transform: translate(-50%, -50%) scale(1.05) rotate(3deg);  }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes spinRingReverse {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulseRing {
          0%, 100% { opacity: 0.25; transform: scale(1);    }
          50%      { opacity: 0.6;  transform: scale(1.04); }
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.6); }
          50%      { box-shadow: 0 0 0 5px rgba(52,211,153,0);  }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes holoShift {
          0%   { opacity: 0.6; transform: rotate(0deg)   scale(1);    }
          50%  { opacity: 1;   transform: rotate(8deg)   scale(1.03); }
          100% { opacity: 0.7; transform: rotate(-5deg)  scale(0.98); }
        }
      `}</style>
    </section>
  );
}
