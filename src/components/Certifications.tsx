import { motion } from 'framer-motion';
import portfolio from '../data/portfolio';

const STATUS_LABEL: Record<string, string> = {
  published:   'Published',
  'in-progress': 'In Progress',
  preprint:    'Preprint',
};

const STATUS_COLOR: Record<string, string> = {
  published:    'bg-green-100  dark:bg-green-900  text-green-700  dark:text-green-300',
  'in-progress':'bg-amber-100  dark:bg-amber-900  text-amber-700  dark:text-amber-300',
  preprint:     'bg-blue-100   dark:bg-blue-900   text-blue-700   dark:text-blue-300',
};

export default function Certifications() {
  const { certifications, publications } = portfolio;

  return (
    <section id="certifications" className="py-24 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* ── Certifications ──────────────────────────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Certifications
            </h2>
            <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🏅
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 leading-snug">
                  {cert.name}
                </h3>
                <p className="text-sm text-brand-600 dark:text-brand-400 font-semibold mb-3">
                  {cert.issuer}
                </p>

                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 mb-3">
                  <p>Issued: {cert.issueDate}</p>
                  {cert.expiryDate  && <p>Expires: {cert.expiryDate}</p>}
                  {cert.credentialId && <p>ID: {cert.credentialId}</p>}
                </div>

                {cert.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3 flex-1">
                    {cert.description}
                  </p>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline mt-auto"
                  >
                    Verify credential →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Publications ────────────────────────────────────────────── */}
        {publications.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Publications
              </h2>
              <div className="mt-3 mx-auto w-16 h-1 rounded-full bg-brand-600" />
            </motion.div>

            <div className="space-y-4">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug flex-1">
                      {pub.title}
                    </h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_COLOR[pub.status]}`}>
                      {STATUS_LABEL[pub.status]}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {pub.authors.join(', ')}
                  </p>

                  <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
                    {pub.venue} · {pub.year}
                  </p>

                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Read paper →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
