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

interface CertItem {
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

function TiltCard({ children, index, isVisible }: { children: React.ReactNode; index: number; isVisible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        perspective: '1000px'
      }}
    >
      <div
        className="cert-card p-8 rounded-lg h-full transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${rotate.x === 0 ? 1 : 1.02}, ${rotate.y === 0 ? 1 : 1.02}, 1.02)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glare effect */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(223, 182, 178, ${glare.opacity}), transparent 80%)`,
            zIndex: 10
          }}
        />
        
        <div style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

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
              <TiltCard key={cert.title} index={index} isVisible={isVisible}>
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
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
