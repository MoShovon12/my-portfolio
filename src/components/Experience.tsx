import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

export default function Experience() {
  const { experience } = portfolio;

  return (
    <section id="experience" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-200 dark:bg-brand-900 -translate-x-1/2" />

          {experience.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-600 border-2 border-white dark:border-gray-900 z-10 top-6" />

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-5/12 ${
                    isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.role}
                        </h3>
                        <p className="text-brand-600 dark:text-brand-400 font-semibold">
                          {item.company}
                        </p>
                      </div>
                      <span className="text-xs bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.startDate} — {item.endDate}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      📍 {item.location}
                    </p>

                    <ul className="space-y-1.5 mb-4">
                      {item.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 dark:text-gray-300 flex gap-2"
                        >
                          <span className="text-brand-600 mt-0.5">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {item.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
