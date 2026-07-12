import { useEffect, useRef, useState } from 'react';
import { Github, Database, Terminal, Share2, Star, Cloud, MessageSquare, Brain, BarChart3, LayoutDashboard, Cpu } from 'lucide-react';
import { portfolioData } from '@/data';

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'github': Github,
  'database': Database,
  'terminal': Terminal,
  'share-2': Share2,
  'star': Star,
  'cloud': Cloud,
  'message-square': MessageSquare,
  'brain': Brain,
  'bar-chart': BarChart3,
  'layout-dashboard': LayoutDashboard,
  'cpu': Cpu,
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

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass-card p-7 transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center gap-3 mb-6 pb-4"
        style={{ borderBottom: '1px solid rgba(139, 13, 26, 0.2)' }}
      >
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg text-xl"
          style={{ background: 'rgba(139, 13, 26, 0.15)', border: '1px solid rgba(139, 13, 26, 0.25)' }}
        >
          {category.icon}
        </div>
        <h3
          className="font-syne font-bold text-base uppercase tracking-wider"
          style={{ color: '#F5F2ED' }}
        >
          {category.name}
        </h3>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill, si) => (
          <div
            key={skill.name}
            className={`skill-tag ${skill.learningSoon ? 'learning' : ''}`}
            style={{
              opacity: isVisible ? 1 : 0,
              animation: isVisible
                ? `fadeInUp 0.4s ${index * 150 + si * 70}ms forwards`
                : 'none',
            }}
          >
            {skill.learningSoon && <span className="learning-badge">Soon</span>}
            <span className="text-sm">{skill.name}</span>
            {!skill.learningSoon && skill.level > 0 && (
              <span
                className="text-xs font-bold font-syne"
                style={{ color: '#C01830' }}
              >
                {skill.level}%
              </span>
            )}
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-36 overflow-hidden"
      style={{ background: 'rgba(0,0,0,0.25)' }}
    >
      {/* Top edge line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,13,26,0.4), transparent)' }}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
            <span className="label-text">{portfolioData.skills.sectionSubtitle}</span>
            <div style={{ width: '2.5rem', height: '1.5px', background: '#8B0D1A' }} />
          </div>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#F5F2ED',
              lineHeight: '1.1',
            }}
          >
            {portfolioData.skills.sectionTitle}
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-sm leading-relaxed"
            style={{ color: 'rgba(200, 196, 191, 0.6)' }}
          >
            {portfolioData.skills.description}
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {portfolioData.skills.categories.map((cat, i) => (
            <SkillCategoryCard key={cat.name} category={cat} index={i} />
          ))}
        </div>

        {/* Tools & Soft Skills */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transitionDelay: '500ms',
          }}
        >
          <div className="text-center mb-10">
            <span className="label-text">Tools &amp; Soft Skills</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {portfolioData.skills.tools.map((tool, i) => {
              const Icon = toolIcons[tool.icon] || Star;
              return (
                <div
                  key={`${tool.name}-${i}`}
                  className="card-crimson p-6 text-center group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    animation: isVisible ? `fadeInUp 0.4s ${600 + i * 70}ms forwards` : 'none',
                  }}
                >
                  <Icon
                    className="w-7 h-7 mx-auto mb-3 transition-transform duration-300 group-hover:scale-125 text-[#8B0D1A]"
                  />
                  <div
                    className="font-syne font-semibold text-sm"
                    style={{ color: '#F5F2ED' }}
                  >
                    {tool.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,13,26,0.4), transparent)' }}
      />
    </section>
  );
}
