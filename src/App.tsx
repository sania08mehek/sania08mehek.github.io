import { useEffect, useRef, useState } from 'react';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Projects } from '@/sections/Projects';
import { Certifications } from '@/sections/Certifications';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { Background } from '@/sections/StarBackground';

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const interactives = document.querySelectorAll('a, button, [data-hover]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);

    const animate = () => {
      const dx = posRef.current.x - ringPos.current.x;
      const dy = posRef.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${posRef.current.x}px`;
        dotRef.current.style.top = `${posRef.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hover' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${isHovering ? 'hover' : ''}`} />
    </>
  );
}

function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#0B0B0B' }}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Animated Background */}
      <Background />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlays */}
      <div className="grain-overlay" />
      <div className="vignette" />
    </div>
  );
}

export default App;
