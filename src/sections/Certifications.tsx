import { useEffect, useRef, useState } from 'react';
import { Award, Code2, Shield, Layout, Brain, Server } from 'lucide-react';
import { portfolioData } from '@/data';

const certIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'award': Award,
  'code-2': Code2,
  'shield': Shield,
  'layout': Layout,
  'brain': Brain,
  'server': Server,
};

export function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title text-5xl md:text-6xl mb-4">
            {portfolioData.certifications.sectionTitle}
          </h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">
            {portfolioData.certifications.sectionSubtitle}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {portfolioData.certifications.items.map((cert, index) => {
            const IconComponent = certIcons[cert.icon] || Award;

            return (
              <div
                key={cert.title}
                className={`cert-card p-8 rounded-lg group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#522B5B]/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-[#DFB6B2]" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-display mb-2 text-white">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm text-gray-400 mb-4">
                  {cert.issuer}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {cert.date}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
