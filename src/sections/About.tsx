import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { portfolioData } from '@/data';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
    >
      {/* Subtle dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(139, 13, 26, 0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT — Image */}
          <div
            ref={imgRef}
            className="transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-60px)',
            }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-12px',
                  borderRadius: '1.5rem',
                  border: '1px solid rgba(139, 13, 26, 0.2)',
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-24px',
                  borderRadius: '2rem',
                  border: '1px dashed rgba(139, 13, 26, 0.1)',
                }}
              />

              {/* Crimson glow behind image */}
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle at 30% 70%, rgba(139, 13, 26, 0.25), transparent 70%)',
                  borderRadius: '1.25rem',
                }}
              />

              <img
                src={portfolioData.about.image}
                alt={portfolioData.personal.name}
                className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-700"
                style={{
                  height: 'auto',
                  borderRadius: '1.25rem',
                  objectFit: 'contain',
                }}
              />

              {/* Availability badge floating on image */}
              <div
                className="absolute bottom-6 left-6 z-20 flex items-center gap-2 px-4 py-2.5"
                style={{
                  background: 'rgba(11, 11, 11, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(139, 13, 26, 0.3)',
                  borderRadius: '2rem',
                }}
              >
                <div className="availability-dot" />
                <span
                  className="font-syne font-semibold text-xs tracking-wider"
                  style={{ color: '#F5F2ED' }}
                >
                  {portfolioData.contact.availability}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Content */}
          <div
            ref={textRef}
            className="transition-all duration-1000 delay-200 p-8 md:p-10 rounded-[2rem]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(60px)',
              background: 'rgba(30, 5, 10, 0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 13, 26, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Section label */}
            <div className="section-label mb-6">
              <span className="label-text">{portfolioData.about.sectionSubtitle}</span>
            </div>

            <h2
              className="font-display font-bold mb-8 leading-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                color: '#F5F2ED',
              }}
            >
              {portfolioData.about.sectionTitle}
            </h2>

            <div className="space-y-5 mb-10">
              {portfolioData.about.bio.map((para, i) => (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{ color: 'rgba(200, 196, 191, 0.75)', fontSize: '0.95rem' }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 mb-10">
              <span className="label-text">Find me on</span>
              <div className="flex gap-4">
                {portfolioData.personal.socials.github && (
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      border: '1px solid rgba(139, 13, 26, 0.3)',
                      color: 'rgba(200, 196, 191, 0.7)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#8B0D1A';
                      (e.currentTarget as HTMLElement).style.color = '#F5F2ED';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(139, 13, 26, 0.15)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139, 13, 26, 0.3)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.7)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.personal.socials.linkedin && (
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      border: '1px solid rgba(139, 13, 26, 0.3)',
                      color: 'rgba(200, 196, 191, 0.7)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#8B0D1A';
                      (e.currentTarget as HTMLElement).style.color = '#F5F2ED';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(139, 13, 26, 0.15)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139, 13, 26, 0.3)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.7)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {portfolioData.personal.socials.instagram && (
                  <a
                    href={portfolioData.personal.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      border: '1px solid rgba(139, 13, 26, 0.3)',
                      color: 'rgba(200, 196, 191, 0.7)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#8B0D1A';
                      (e.currentTarget as HTMLElement).style.color = '#F5F2ED';
                      (e.currentTarget as HTMLElement).style.background = 'rgba(139, 13, 26, 0.15)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139, 13, 26, 0.3)';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(200, 196, 191, 0.7)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Download Resume */}
            <button
              onClick={() => window.open(portfolioData.hero.ctaPrimary.href, '_blank')}
              className="btn-crimson"
            >
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
