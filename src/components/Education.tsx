import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

export default function Education() {
  const { education } = portfolio;

  return (
    <section id="education" className="py-24 px-4 bg-white dark:bg-gray-950">
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
            Education
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-2xl mb-4">
                🎓
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {item.institution}
              </h3>
              <p className="text-brand-600 dark:text-brand-400 font-semibold mb-1">
                {item.degree} — {item.field}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {item.startYear} – {item.endYear}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                📍 {item.location}
              </p>
              {item.grade && (
                <span className="inline-block text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
                  {item.grade}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
