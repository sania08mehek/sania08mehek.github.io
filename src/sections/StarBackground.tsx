import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number;
}

/**
 * Velvet Background — floating purple glow orbs + visible twinkling stars
 * that respond to mouse movement with parallax.
 */
export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ===== Glow orb definitions (more visible) =====
    const orbs = [
      { baseX: 0.15, baseY: 0.2,  radius: 400, color: [82, 43, 91],   speed: 0.0008, phase: 0,              parallax: 25 },
      { baseX: 0.8,  baseY: 0.6,  radius: 350, color: [133, 79, 108],  speed: 0.0006, phase: Math.PI,        parallax: 20 },
      { baseX: 0.5,  baseY: 0.4,  radius: 300, color: [43, 18, 76],    speed: 0.001,  phase: Math.PI / 3,    parallax: 30 },
      { baseX: 0.1,  baseY: 0.8,  radius: 250, color: [82, 43, 91],    speed: 0.0007, phase: Math.PI / 2,    parallax: 22 },
      { baseX: 0.9,  baseY: 0.15, radius: 220, color: [25, 0, 25],     speed: 0.0009, phase: Math.PI * 1.5,  parallax: 15 },
      { baseX: 0.4,  baseY: 0.75, radius: 280, color: [60, 20, 70],    speed: 0.0005, phase: Math.PI * 0.7,  parallax: 18 },
    ];

    // ===== Stars — actual twinkling star field =====
    const stars: Star[] = [];
    const starCount = Math.min(400, Math.floor((window.innerWidth * window.innerHeight) / 3000));
    for (let i = 0; i < starCount; i++) {
      const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.6 ? 1 : 2;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 3, // spread across 3x viewport for scroll
        size: layer === 0 ? Math.random() * 1.0 + 0.3
            : layer === 1 ? Math.random() * 1.5 + 0.5
            : Math.random() * 2.2 + 0.8,
        opacity: layer === 0 ? Math.random() * 0.4 + 0.15
               : layer === 1 ? Math.random() * 0.5 + 0.2
               : Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        layer,
      });
    }

    // ===== Floating dust motes =====
    const dust: { x: number; y: number; size: number; opacity: number; speed: number; drift: number }[] = [];
    for (let i = 0; i < 40; i++) {
      dust.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.2 + 0.05,
        speed: Math.random() * 0.25 + 0.05,
        drift: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollY = scrollRef.current;

      // ===== Draw glow orbs (increased opacity) =====
      orbs.forEach((orb) => {
        const floatX = Math.sin(time * orb.speed + orb.phase) * 50;
        const floatY = Math.cos(time * orb.speed * 0.8 + orb.phase) * 40;
        const parallaxX = (0.5 - mx) * orb.parallax;
        const parallaxY = (0.5 - my) * orb.parallax;

        const cx = orb.baseX * canvas.width + floatX + parallaxX;
        const cy = orb.baseY * canvas.height + floatY + parallaxY;

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.radius);
        gradient.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.35)`);
        gradient.addColorStop(0.4, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, 0.12)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(cx - orb.radius, cy - orb.radius, orb.radius * 2, orb.radius * 2);
      });

      // ===== Draw stars with scroll parallax =====
      stars.forEach((star) => {
        const parallaxMultiplier = star.layer === 0 ? 0.015 : star.layer === 1 ? 0.04 : 0.08;
        const yOffset = (scrollY * parallaxMultiplier) % (canvas.height * 3);

        let drawY = (star.y - yOffset + canvas.height * 3) % (canvas.height * 3);
        // Only draw if on screen
        if (drawY > canvas.height + 5) return;

        let drawX = star.x;
        // Subtle horizontal drift
        drawX += Math.sin(time * 0.005 + star.twinklePhase) * 0.4;

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = star.opacity * (0.5 + 0.5 * twinkle);

        // Color variation
        const colorSeed = star.twinklePhase;
        let r: number, g: number, b: number;
        if (colorSeed < 2) {
          // Warm pink-white
          r = 220 + Math.floor(twinkle * 20);
          g = 195 + Math.floor(twinkle * 15);
          b = 210;
        } else if (colorSeed < 4) {
          // Cool purple-white
          r = 200;
          g = 185 + Math.floor(twinkle * 20);
          b = 230;
        } else {
          // Warm cream
          r = 240;
          g = 225 + Math.floor(twinkle * 10);
          b = 210;
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.fill();

        // Glow halo for larger stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.1})`;
          ctx.fill();
        }

        // Cross-hair sparkle for the biggest stars
        if (star.size > 1.8 && currentOpacity > 0.4) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.25})`;
          ctx.lineWidth = 0.5;
          const sparkLen = star.size * 4;
          ctx.beginPath();
          ctx.moveTo(drawX - sparkLen, drawY);
          ctx.lineTo(drawX + sparkLen, drawY);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(drawX, drawY - sparkLen);
          ctx.lineTo(drawX, drawY + sparkLen);
          ctx.stroke();
        }
      });

      // ===== Draw floating dust =====
      dust.forEach((p) => {
        p.y -= p.speed;
        p.x += Math.sin(time * 0.008 + p.drift) * 0.25;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const twinkle = Math.sin(time * 0.015 + p.drift) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(223, 182, 178, ${p.opacity * twinkle})`;
        ctx.fill();
      });

      // ===== Occasional shooting star =====
      if (Math.random() < 0.0015) {
        const sx = Math.random() * canvas.width;
        const sy = Math.random() * canvas.height * 0.5;
        const angle = Math.PI / 4 + Math.random() * 0.5;
        const len = 80 + Math.random() * 120;
        const gradient = ctx.createLinearGradient(
          sx, sy,
          sx + Math.cos(angle) * len,
          sy + Math.sin(angle) * len
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.3, 'rgba(223, 182, 178, 0.4)');
        gradient.addColorStop(1, 'rgba(223, 182, 178, 0)');

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
