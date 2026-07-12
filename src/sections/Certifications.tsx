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

function CertCard({ cert, index, isVisible }: {
  cert: typeof portfolioData.certifications.items[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const Icon = certIcons[cert.icon] || Award;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotate({ x: (y - cy) / 12, y: (cx - x) / 12 });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.12 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{
        perspective: '1000px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="cert-card p-7 h-full relative overflow-hidden"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Glare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(192, 24, 48, ${glare.opacity}), transparent 80%)`,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div style={{ transform: 'translateZ(20px)' }}>
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
            style={{
              background: 'rgba(139, 13, 26, 0.15)',
              border: '1px solid rgba(139, 13, 26, 0.25)',
            }}
          >
            <Icon className="w-6 h-6 text-[#C01830]" />
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold text-lg mb-2 leading-tight"
            style={{ color: '#F5F2ED' }}
          >
            {cert.title}
          </h3>

          {/* Issuer */}
          <p
            className="text-sm mb-4 font-syne font-medium"
            style={{ color: '#8B0D1A' }}
          >
            {cert.issuer}
          </p>

          {/* Date */}
          <p
            className="text-xs uppercase tracking-wider"
            style={{ color: 'rgba(133, 127, 120, 0.7)' }}
          >
            {cert.date}
          </p>
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
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      {/* Top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,13,26,0.4), transparent)' }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
            <span className="label-text">{portfolioData.certifications.sectionSubtitle}</span>
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
          </div>
          <h2
            className="font-display font-bold"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5F2ED', lineHeight: '1.1' }}
          >
            {portfolioData.certifications.sectionTitle}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.certifications.items.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* Bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,13,26,0.4), transparent)' }}
      />
    </section>
  );
}
