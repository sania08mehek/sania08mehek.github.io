import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, FileText, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data';

function useTypewriter(texts: string[], typingSpeed = 90, deletingSpeed = 45, pauseDuration = 2200) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const taglines = portfolioData.hero.taglines || ['Data Analyst', 'UI/UX Designer', 'Creative Technologist'];
  const typewriterText = useTypewriter(taglines, 90, 45, 2200);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 650);
        const ty = scrollY * 0.25;
        contentRef.current.style.opacity = String(opacity);
        contentRef.current.style.transform = `translateY(${ty}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = useCallback(() => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Rotating decorative ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px solid rgba(139, 13, 26, 0.12)',
          animation: 'spin-slow 30s linear infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '850px',
          height: '850px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: '1px dashed rgba(139, 13, 26, 0.07)',
          animation: 'spin-slow 50s linear infinite reverse',
        }}
      />

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative z-10 container-xl text-center mt-12 pb-28"
      >
        {/* Label */}
        <div className="animate-fade-in-up delay-100 flex items-center justify-center gap-3 mb-8">
          <div style={{ width: '2rem', height: '1.5px', background: '#8B0D1A' }} />
          <span className="label-text">
            {portfolioData.hero.greeting}
          </span>
          <div style={{ width: '2rem', height: '1.5px', background: '#8B0D1A' }} />
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-200 font-display font-black leading-none mb-4"
          style={{
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            letterSpacing: '-0.02em',
            lineHeight: '0.92',
          }}
        >
          <span style={{ color: '#F5F2ED', display: 'block' }}>SANIA</span>
          <span
            className="italic"
            style={{
              background: 'linear-gradient(135deg, #C01830 0%, #E84060 50%, #8B0D1A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}
          >
            MEHEK
          </span>
        </h1>

        {/* Typewriter */}
        <div
          className="animate-fade-in-up delay-300 h-10 flex items-center justify-center mb-6"
        >
          <span
            className="font-syne font-semibold text-xl tracking-widest uppercase"
            style={{ color: '#8B0D1A' }}
          >
            {typewriterText}
            <span className="typewriter-cursor" />
          </span>
        </div>

        {/* Description */}
        <p
          className="animate-fade-in-up delay-400 mx-auto mb-12 leading-relaxed"
          style={{
            maxWidth: '560px',
            color: 'rgba(200, 196, 191, 0.75)',
            fontSize: '1.05rem',
          }}
        >
          {portfolioData.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={() => window.open(portfolioData.hero.ctaPrimary.href, '_blank')}
            className="btn-crimson"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {portfolioData.hero.ctaPrimary.label}
            </span>
          </button>
          <button onClick={scrollToAbout} className="btn-outline">
            <span className="flex items-center gap-2">
              {portfolioData.hero.ctaSecondary.label}
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
        {/* Scroll indicator — inline, below buttons */}
        <div className="animate-fade-in delay-1000 flex flex-col items-center gap-2 mt-10">
          <span className="label-text text-[0.6rem]" style={{ color: 'rgba(133, 127, 120, 0.6)' }}>
            Scroll
          </span>
          <div
            className="flex items-center justify-center animate-bounce"
            style={{ color: '#8B0D1A' }}
          >
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>

      </div>
    </section>
  );
}
