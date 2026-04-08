import { useEffect, useRef, useState } from 'react';
import { Github, Database, Terminal, Share2, Star, Cloud, GitBranch, MonitorSmartphone } from 'lucide-react';
import { portfolioData } from '@/data';

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'github': Github,
  'database': Database,
  'terminal': Terminal,
  'share-2': Share2,
  'star': Star,
  'cloud': Cloud,
  'git-branch': GitBranch,
  'monitor-smartphone': MonitorSmartphone,
};

interface SkillItem {
  name: string;
  level: number;
  learningSoon?: boolean;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: SkillItem[];
}

// Static data for CSS-animated symbols — stable, no canvas, no sizing issues
const SYMBOLS = [
  { char: '∑', x: 5,  y: 10, dur: 14, delay: 0,   size: 18, opacity: 0.35 },
  { char: 'π', x: 15, y: 70, dur: 18, delay: 2,   size: 22, opacity: 0.28 },
  { char: '∫', x: 25, y: 30, dur: 12, delay: 4,   size: 16, opacity: 0.32 },
  { char: 'λ', x: 35, y: 85, dur: 20, delay: 1,   size: 20, opacity: 0.30 },
  { char: '{}', x: 48, y: 15, dur: 16, delay: 3,  size: 14, opacity: 0.38 },
  { char: '∆', x: 58, y: 60, dur: 13, delay: 5,   size: 24, opacity: 0.25 },
  { char: '0', x: 68, y: 40, dur: 17, delay: 0.5, size: 15, opacity: 0.40 },
  { char: '1', x: 75, y: 80, dur: 11, delay: 2.5, size: 16, opacity: 0.38 },
  { char: 'Σ', x: 82, y: 20, dur: 19, delay: 1.5, size: 22, opacity: 0.28 },
  { char: '<>', x: 90, y: 65, dur: 15, delay: 4.5, size: 14, opacity: 0.36 },
  { char: '×', x: 10, y: 50, dur: 22, delay: 6,   size: 20, opacity: 0.30 },
  { char: '÷', x: 92, y: 45, dur: 10, delay: 3.5, size: 18, opacity: 0.34 },
  { char: '#', x: 52, y: 92, dur: 16, delay: 7,   size: 16, opacity: 0.32 },
  { char: '@', x: 42, y: 5,  dur: 21, delay: 8,   size: 15, opacity: 0.36 },
];

const SHAPES = [
  { type: 'hex',     x: 8,  y: 25, size: 35, dur: 16, delay: 0,   opacity: 0.15, rot: 0 },
  { type: 'diamond', x: 85, y: 15, size: 28, dur: 20, delay: 3,   opacity: 0.18, rot: 45 },
  { type: 'hex',     x: 72, y: 75, size: 42, dur: 14, delay: 6,   opacity: 0.12, rot: 30 },
  { type: 'diamond', x: 20, y: 88, size: 30, dur: 18, delay: 1.5, opacity: 0.16, rot: 15 },
  { type: 'circle',  x: 55, y: 35, size: 25, dur: 22, delay: 4,   opacity: 0.14, rot: 0  },
  { type: 'hex',     x: 95, y: 50, size: 38, dur: 12, delay: 8,   opacity: 0.13, rot: 60 },
  { type: 'circle',  x: 30, y: 55, size: 20, dur: 17, delay: 2,   opacity: 0.17, rot: 0  },
  { type: 'diamond', x: 65, y: 10, size: 26, dur: 19, delay: 5,   opacity: 0.15, rot: 25 },
];

function hexPoints(cx: number, cy: number, r: number, rotDeg: number): string {
  const rot = (rotDeg * Math.PI) / 180;
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i + rot;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

function DataMatrix() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Keyframe styles */}
      <style>{`
        @keyframes sym-float {
          0%   { transform: translateY(0px) rotate(0deg);   opacity: var(--sym-op); }
          25%  { transform: translateY(-18px) rotate(5deg);  opacity: calc(var(--sym-op) * 1.3); }
          50%  { transform: translateY(-8px) rotate(-3deg);  opacity: var(--sym-op); }
          75%  { transform: translateY(-22px) rotate(6deg);  opacity: calc(var(--sym-op) * 0.7); }
          100% { transform: translateY(0px) rotate(0deg);   opacity: var(--sym-op); }
        }
        @keyframes shape-drift {
          0%   { transform: translateY(0)    rotate(var(--sh-rot)); opacity: var(--sh-op); }
          33%  { transform: translateY(-20px) rotate(calc(var(--sh-rot) + 15deg)); opacity: calc(var(--sh-op) * 1.4); }
          66%  { transform: translateY(-10px) rotate(calc(var(--sh-rot) - 8deg)); opacity: calc(var(--sh-op) * 0.8); }
          100% { transform: translateY(0)    rotate(var(--sh-rot)); opacity: var(--sh-op); }
        }

      `}</style>

      {/* Floating math / code symbols */}
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className="absolute font-mono select-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            fontSize: s.size,
            color: `rgba(133, 79, 108, ${s.opacity})`,
            ['--sym-op' as string]: s.opacity,
            animation: `sym-float ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            textShadow: `0 0 12px rgba(223,182,178,${s.opacity * 1.5})`,
          }}
        >
          {s.char}
        </span>
      ))}

      {/* Floating geometric shapes (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: 1 }}
      >
        {SHAPES.map((sh, i) => {
          const r = sh.size / 2 / 10; // normalized to viewBox 100×100
          const cx = sh.x;
          const cy = sh.y;

          const sharedStyle: React.CSSProperties = {
            ['--sh-rot' as string]: `${sh.rot}deg`,
            ['--sh-op' as string]: sh.opacity,
            animation: `shape-drift ${sh.dur}s ease-in-out infinite`,
            animationDelay: `${sh.delay}s`,
            transformOrigin: `${cx}% ${cy}%`,
          };

          if (sh.type === 'hex') {
            return (
              <polygon
                key={i}
                points={hexPoints(cx, cy, r * 1.2, sh.rot)}
                fill="none"
                stroke="rgba(223,182,178,1)"
                strokeWidth="0.3"
                style={{ ...sharedStyle, opacity: sh.opacity }}
              />
            );
          }
          if (sh.type === 'diamond') {
            return (
              <polygon
                key={i}
                points={`${cx},${cy - r * 1.4} ${cx + r * 0.9},${cy} ${cx},${cy + r * 1.4} ${cx - r * 0.9},${cy}`}
                fill="none"
                stroke="rgba(223,182,178,1)"
                strokeWidth="0.3"
                style={{ ...sharedStyle, opacity: sh.opacity }}
              />
            );
          }
          // circle
          return (
            <g key={i} style={{ ...sharedStyle, opacity: sh.opacity }}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(223,182,178,1)" strokeWidth="0.3" />
              <circle cx={cx} cy={cy} r="0.4" fill="rgba(223,182,178,0.9)" />
            </g>
          );
        })}
      </svg>


    </div>
  );
}

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`skill-category-card transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(196, 181, 179, 0.1)' }}>
        <span className="text-xl">{category.icon}</span>
        <h3
          className="font-display text-xl font-semibold uppercase tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #C4B5B3, #DFB6B2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.08em',
          }}
        >
          {category.name}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, skillIndex) => (
          <div
            key={skill.name}
            className={`skill-tag ${skill.learningSoon ? 'learning' : ''} opacity-0`}
            style={{
              animation: isVisible
                ? `fadeInUp 0.4s ${index * 150 + skillIndex * 80}ms forwards`
                : 'none',
            }}
          >
            {skill.learningSoon && <span className="learning-soon-badge">Learning Soon</span>}
            <div className="flex items-center gap-1.5">
              <span className="text-[0.8rem] font-medium text-gray-300 tracking-wide">{skill.name}</span>

             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Pure CSS data-matrix animation — always visible */}
      <DataMatrix />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title text-5xl md:text-6xl mb-4">{portfolioData.skills.sectionTitle}</h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">{portfolioData.skills.sectionSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioData.skills.categories.map((category, index) => (
            <SkillCategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>

        <div className={`mt-16 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-xl uppercase tracking-widest mb-8 text-center text-[#DFB6B2]">
            Tools &amp; Soft Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {portfolioData.skills.tools.map((tool, index) => {
              const IconComponent = toolIcons[tool.icon] || Star;
              return (
                <div
                  key={`${tool.name}-${index}`}
                  className="cert-card p-8 rounded-lg text-center opacity-0"
                  style={{ animation: isVisible ? `fadeInUp 0.4s ${600 + index * 80}ms forwards` : 'none' }}
                >
                  <IconComponent className="w-8 h-8 text-[#DFB6B2] mb-3 mx-auto" />
                  <div className="text-sm font-medium">{tool.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
