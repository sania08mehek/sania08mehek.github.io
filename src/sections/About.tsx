import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { portfolioData } from '@/data';



export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#522B5B] to-[#854F6C] opacity-20 blur-3xl" />
              <img
                src={portfolioData.about.image}
                alt={portfolioData.personal.name}
                className="relative z-10 w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
              />
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h2 className="font-display text-5xl md:text-6xl mb-8 gradient-text">
              {portfolioData.about.sectionTitle}
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              {portfolioData.about.bio.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-lg' : ''}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex gap-4">
              {portfolioData.personal.socials.github && (
                <a href={portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#DFB6B2] transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {portfolioData.personal.socials.linkedin && (
                <a href={portfolioData.personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#DFB6B2] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {portfolioData.personal.socials.instagram && (
                <a href={portfolioData.personal.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#DFB6B2] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
