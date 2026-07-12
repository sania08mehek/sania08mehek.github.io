import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { portfolioData } from '@/data';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const url = project.liveUrl !== '#' ? project.liveUrl : project.githubUrl;

  return (
    <div
      ref={cardRef}
      className="project-card group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 130}ms, transform 0.7s ease ${index * 130}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(11,11,11,0.9) 0%, rgba(11,11,11,0.3) 60%, transparent 100%)',
          }}
        />
        {/* Category badge */}
        <div
          className="absolute top-4 left-4"
        >
          <span
            className="font-syne font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              background: 'rgba(139, 13, 26, 0.85)',
              color: '#F5F2ED',
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className="font-display font-bold text-lg leading-tight transition-colors duration-300"
            style={{ color: isHovered ? '#C01830' : '#F5F2ED' }}
          >
            {project.title}
          </h3>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 flex-shrink-0"
            style={{
              border: '1px solid rgba(139, 13, 26, 0.3)',
              color: '#8B0D1A',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#8B0D1A';
              (e.currentTarget as HTMLElement).style.color = '#F5F2ED';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#8B0D1A';
            }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'rgba(200, 196, 191, 0.65)' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="font-syne text-xs font-semibold px-2.5 py-1 rounded"
              style={{
                background: 'rgba(139, 13, 26, 0.1)',
                border: '1px solid rgba(139, 13, 26, 0.2)',
                color: 'rgba(200, 196, 191, 0.8)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link if different from live */}
        {project.githubUrl && project.githubUrl !== '#' && project.liveUrl !== project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 mt-4 text-xs font-syne font-semibold transition-colors duration-300"
            style={{ color: 'rgba(133, 127, 120, 0.7)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#F5F2ED'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(133, 127, 120, 0.7)'}
          >
            <Github className="w-3.5 h-3.5" />
            View Code
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === 'featured'
    ? portfolioData.projects.items.filter(p => p.featured)
    : portfolioData.projects.items;

  return (
    <section id="projects" ref={sectionRef} className="relative py-36 overflow-hidden">
      <div className="container-xl relative z-10">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <div className="section-label">
              <span className="label-text">{portfolioData.projects.sectionSubtitle}</span>
            </div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5F2ED', lineHeight: '1.1' }}
            >
              {portfolioData.projects.sectionTitle}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex gap-2 p-1 rounded-lg"
            style={{ background: 'rgba(22, 22, 22, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {(['all', 'featured'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="font-syne font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-md transition-all duration-300"
                style={{
                  background: filter === f ? '#8B0D1A' : 'transparent',
                  color: filter === f ? '#F5F2ED' : 'rgba(133, 127, 120, 0.8)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
