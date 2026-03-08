import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

// ─── Blob config ────────────────────────────────────────────────────────────
const BLOBS = [
  // The first blob follows the mouse (handled in JS)
  { color: '99, 102, 241',  size: 700, x: 30,  y: 25,  dur: 0    }, // indigo – mouse
  { color: '168, 85,  247', size: 600, x: 65,  y: 60,  dur: 8000 }, // purple
  { color: '236, 72,  153', size: 500, x: 20,  y: 70,  dur: 11000 }, // pink
  { color: '59,  130, 246', size: 550, x: 75,  y: 20,  dur: 9500 }, // blue
  { color: '16,  185, 129', size: 400, x: 50,  y: 85,  dur: 13000 }, // emerald
];

export default function Hero() {
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

    // Smooth lerp loop for the mouse-following blob
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, mousePos.current.x, 0.06);
      current.current.y = lerp(current.current.y, mousePos.current.y, 0.06);

      if (blobRef.current) {
        const el = blobRef.current.querySelector<HTMLDivElement>('[data-mouse]');
        if (el) {
          const px = (current.current.x / window.innerWidth)  * 100;
          const py = (current.current.y / window.innerHeight) * 100;
          el.style.left = `${px}%`;
          el.style.top  = `${py}%`;
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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden"
      style={{ background: '#07071a' }}
    >
      {/* ── Aurora blob layer ──────────────────────────────────────────── */}
      <div ref={blobRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        {/* Mouse-tracking blob */}
        <div
          data-mouse
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width:  BLOBS[0].size,
            height: BLOBS[0].size,
            left:   `${BLOBS[0].x}%`,
            top:    `${BLOBS[0].y}%`,
            background: `radial-gradient(circle, rgba(${BLOBS[0].color}, 0.55) 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />

        {/* Floating blobs with CSS keyframe drift */}
        {BLOBS.slice(1).map((b, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width:  b.size,
              height: b.size,
              left:   `${b.x}%`,
              top:    `${b.y}%`,
              background: `radial-gradient(circle, rgba(${b.color}, 0.45) 0%, transparent 70%)`,
              filter: 'blur(70px)',
              animation: `blobDrift ${b.dur}ms ease-in-out infinite alternate`,
              animationDelay: `${i * -2000}ms`,
            }}
          />
        ))}

        {/* Subtle noise overlay for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3CfilterFilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl"
      >
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-indigo-400 font-semibold text-lg mb-4 tracking-wide"
        >
          Hi, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight"
        >
          {hero.name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl font-medium text-indigo-300 mb-6"
        >
          {hero.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {hero.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo(hero.ctaPrimary.href)}
            className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/40 hover:scale-105"
          >
            {hero.ctaPrimary.label}
          </button>
          <button
            onClick={() => scrollTo(hero.ctaSecondary.href)}
            className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105"
          >
            {hero.ctaSecondary.label}
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-1 text-gray-500 text-xs tracking-widest uppercase"
      >
        <span>Scroll to discover</span>
        <span className="text-base">↓</span>
      </motion.div>

      {/* ── Keyframes injected via style tag ───────────────────────────── */}
      <style>{`
        @keyframes blobDrift {
          0%   { transform: translate(-50%, -50%) scale(1)    rotate(0deg);   }
          33%  { transform: translate(-55%, -45%) scale(1.08) rotate(5deg);   }
          66%  { transform: translate(-45%, -55%) scale(0.95) rotate(-4deg);  }
          100% { transform: translate(-50%, -50%) scale(1.05) rotate(3deg);   }
        }
      `}</style>
    </section>
  );
}
