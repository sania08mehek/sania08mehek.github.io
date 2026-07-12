import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '@/data';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Track active section
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled
            ? 'rgba(11, 11, 11, 0.85)'
            : 'rgba(11, 11, 11, 0.0)',
          backdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(1.5)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(139, 13, 26, 0.2)'
            : '1px solid transparent',
        }}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
              className="flex items-center gap-2 group"
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-md font-display font-black text-lg transition-all duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #8B0D1A, #C01830)',
                  color: '#F5F2ED',
                  boxShadow: '0 0 20px rgba(139, 13, 26, 0.4)',
                }}
              >
                S
              </div>
              <span
                className="font-syne font-bold text-sm tracking-[0.2em] uppercase"
                style={{ color: '#F5F2ED' }}
              >
                Sania Mehek
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {portfolioData.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className={`nav-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 transition-colors"
              style={{ color: '#F5F2ED' }}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(11, 11, 11, 0.97)', backdropFilter: 'blur(24px)' }}
          onClick={() => setIsMobileOpen(false)}
        />
        <div className="absolute top-24 left-0 right-0 px-8">
          <div className="flex flex-col gap-8">
            {portfolioData.navigation.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className="font-display text-3xl font-bold transition-colors"
                style={{
                  color: activeSection === item.href.replace('#', '') ? '#8B0D1A' : '#F5F2ED',
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
