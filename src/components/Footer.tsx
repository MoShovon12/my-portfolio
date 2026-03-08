import portfolio from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm">
          © {year} Muhammad (Shawon) Ohiduzzaman. All rights reserved.
        </p>

        {/* Quick nav links */}
        <nav className="flex flex-wrap gap-4 justify-center">
          {portfolio.nav.map((link) => (
            <button
              key={link.href}
              onClick={() =>
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-sm hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex gap-3">
          {portfolio.contact.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.platform}
              className="hover:text-white transition-colors text-lg"
            >
              {social.icon === 'linkedin' && '🔗'}
              {social.icon === 'github'   && '🐙'}
              {social.icon === 'twitter'  && '🐦'}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
