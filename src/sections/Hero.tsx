import { useEffect, useRef, useState, useCallback } from 'react';
import { FileText } from 'lucide-react';
import { portfolioData } from '@/data';

function useTypewriter(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
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

  const taglines = portfolioData.hero.taglines || [
    "Data Analyst",
    "UI/UX Designer",
    "Creative Technologist"
  ];

  const typewriterText = useTypewriter(taglines, 100, 50, 2000);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && contentRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 600);
        const translateY = scrollY * 0.3;
        contentRef.current.style.opacity = String(opacity);
        contentRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openResume = useCallback(() => {
    window.open(portfolioData.hero.ctaPrimary.href, '_blank');
  }, []);

  const scrollToAbout = useCallback(() => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center"
      >
        {/* Greeting */}
        <div className="mb-4 opacity-0 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            {portfolioData.hero.greeting}
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light mb-6 leading-tight opacity-0 animate-fade-in-up delay-200">
          <span className="block text-white">SANIA</span>
          <span className="block gradient-text italic">MEHEK</span>
        </h1>

        {/* Typewriter Tagline */}
        <div className="h-8 mb-8 opacity-0 animate-fade-in-up delay-300 flex items-center justify-center">
          <span className="text-xl md:text-2xl text-gray-400 font-light">
            {typewriterText}
            <span className="typewriter-cursor" />
          </span>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-400/80 mb-12 leading-relaxed opacity-0 animate-fade-in-up delay-400">
          {portfolioData.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 opacity-0 animate-fade-in-up delay-500">
          <button
            onClick={openResume}
            className="btn-secondary flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {portfolioData.hero.ctaPrimary.label}
          </button>
          <button
            onClick={scrollToAbout}
            className="btn-primary"
          >
            {portfolioData.hero.ctaSecondary.label}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-700">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
