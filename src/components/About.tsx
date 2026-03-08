import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

export default function About() {
  const { about } = portfolio;

  return (
    <section id="about" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <img
              src={about.profileImage}
              alt="Profile photo"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/256x256/3b82f6/ffffff?text=Shovon';
              }}
              className="w-56 h-56 rounded-full object-cover shadow-xl border-4 border-brand-100 dark:border-brand-900"
            />
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {about.bio}
            </p>

            {about.resumeUrl && (
              <a
                href={about.resumeUrl}
                download="Muhammad-Ohiduzzaman-CV.pdf"
                className="inline-block mt-8 px-6 py-3 bg-brand-600 text-white rounded-full font-semibold hover:bg-brand-700 transition-colors shadow-md"
              >
                Download Resume ↓
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
