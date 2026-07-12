import { Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '@/data';

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-16 overflow-hidden"
      style={{ borderTop: '1px solid rgba(139, 13, 26, 0.2)' }}
    >
      {/* Subtle top crimson glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 13, 26, 0.15), transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-md font-display font-black text-lg"
                style={{
                  background: 'linear-gradient(135deg, #8B0D1A, #C01830)',
                  color: '#F5F2ED',
                  boxShadow: '0 0 20px rgba(139, 13, 26, 0.35)',
                }}
              >
                S
              </div>
              <span
                className="font-syne font-bold text-sm tracking-widest uppercase"
                style={{ color: '#F5F2ED' }}
              >
                Sania Mehek
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(133, 127, 120, 0.8)' }}
            >
              {portfolioData.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-syne font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: '#8B0D1A' }}
            >
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {portfolioData.footer.quickLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-sm font-medium transition-colors duration-300"
                  style={{ color: 'rgba(200, 196, 191, 0.6)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F2ED'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.6)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-syne font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: '#8B0D1A' }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: 'rgba(200, 196, 191, 0.6)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F2ED'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.6)'}
              >
                <Mail className="w-4 h-4" style={{ color: '#8B0D1A' }} />
                {portfolioData.personal.email}
              </a>
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: 'rgba(200, 196, 191, 0.6)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F2ED'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.6)'}
              >
                <Github className="w-4 h-4" style={{ color: '#8B0D1A' }} />
                GitHub
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors duration-300"
                style={{ color: 'rgba(200, 196, 191, 0.6)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F2ED'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.6)'}
              >
                <Linkedin className="w-4 h-4" style={{ color: '#8B0D1A' }} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            className="font-syne text-xs tracking-wider"
            style={{ color: 'rgba(133, 127, 120, 0.6)' }}
          >
            {portfolioData.footer.copyright}
          </p>

          <div className="flex items-center gap-2">
            <span className="font-syne text-xs tracking-wider" style={{ color: 'rgba(133, 127, 120, 0.6)' }}>
              CLEAN · PREMIUM · TIMELESS
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#8B0D1A' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
