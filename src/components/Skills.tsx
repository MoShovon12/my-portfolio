import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';
import type { SkillCategory } from '../types';

const CATEGORY_ORDER: SkillCategory[] = [
  'Languages',
  'Frameworks & Libraries',
  'Data & Analytics',
  'AI & Machine Learning',
  'Tools & DevOps',
  'Cloud & Databases',
  'Other',
];

const LEVEL_COLOR: Record<string, string> = {
  beginner:     'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
  intermediate: 'bg-blue-100  dark:bg-blue-900  text-blue-700  dark:text-blue-300',
  advanced:     'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
  expert:       'bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300',
};

export default function Skills() {
  const { skills } = portfolio;

  const grouped = CATEGORY_ORDER.reduce<Record<SkillCategory, typeof skills>>(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>,
  );

  return (
    <section id="skills" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
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
            Skills
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
        </motion.div>

        {/* Category groups */}
        <div className="space-y-10">
          {CATEGORY_ORDER.map((category, ci) => {
            const items = grouped[category];
            if (!items.length) return null;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.07 }}
              >
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        LEVEL_COLOR[skill.level ?? 'intermediate']
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center text-xs text-gray-500 dark:text-gray-400">
          {Object.entries(LEVEL_COLOR).map(([level, cls]) => (
            <span key={level} className={`px-3 py-1 rounded-full capitalize ${cls}`}>
              {level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
