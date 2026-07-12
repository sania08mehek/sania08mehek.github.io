import { useEffect, useRef } from 'react';

/**
 * Japanese-inspired animated canvas background
 * 
 * Elements (inspired by reference image):
 *  1. Full-screen Seigaiha (fish-scale wave) pattern
 *  2. Large glowing Rising Sun red circle
 *  3. Ink-painted cherry blossom branches — top-left & bottom-right
 *  4. Floating crimson sakura petals drifting down
 *  5. Japanese corner bracket decorations (L-shaped red frames)
 *  6. Subtle drifting single kanji characters
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    /* ─────────────────────────────────────────────────────
       1. SEIGAIHA PATTERN
    ───────────────────────────────────────────────────── */
    function drawSeigaiha() {
      const r = 32;
      const dw = r * 2;
      const dh = r * 1.75;
      const cols = Math.ceil(W / dw) + 2;
      const rows = Math.ceil(H / dh) + 2;

      ctx.save();
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * dw + (row % 2 === 0 ? 0 : r);
          const y = row * dh;

          // fill arc
          ctx.beginPath();
          ctx.arc(x, y, r, Math.PI, 0, false);
          ctx.closePath();
          ctx.fillStyle = 'rgba(139, 13, 26, 0.045)';
          ctx.fill();

          // stroke arc
          ctx.beginPath();
          ctx.arc(x, y, r, Math.PI, 0, false);
          ctx.strokeStyle = 'rgba(139, 13, 26, 0.12)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    /* ─────────────────────────────────────────────────────
       2. RISING SUN CIRCLE
    ───────────────────────────────────────────────────── */
    function drawSun(t: number) {
      const cx = W * 0.68;
      const cy = H * 0.40;
      const r = Math.min(W, H) * 0.25;
      const pulse = 1 + Math.sin(t * 0.003) * 0.008;

      // Far outer atmospheric glow
      const atmosGrad = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 2.8);
      atmosGrad.addColorStop(0,   'rgba(139, 13, 26, 0.08)');
      atmosGrad.addColorStop(0.6, 'rgba(100,  5, 15, 0.04)');
      atmosGrad.addColorStop(1,   'rgba(0,    0,  0, 0)');
      ctx.fillStyle = atmosGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Inner circle fill
      const circleGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * pulse);
      circleGrad.addColorStop(0,   'rgba(160, 16, 32, 0.18)');
      circleGrad.addColorStop(0.5, 'rgba(120, 10, 22, 0.10)');
      circleGrad.addColorStop(1,   'rgba( 80,  4, 10, 0.04)');
      ctx.fillStyle = circleGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Circle border
      ctx.beginPath();
      ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 13, 26, 0.22)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Thin inner ring
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.82 * pulse, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 13, 26, 0.08)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }



    /* ─────────────────────────────────────────────────────
       4. JAPANESE FRET CORNER (maze/key pattern like reference)
    ───────────────────────────────────────────────────── */
    function drawCornerBracket(x: number, y: number, size: number, flipX: boolean, flipY: boolean) {
      const sx = flipX ? -1 : 1;
      const sy = flipY ? -1 : 1;
      const lw  = 2.2;
      const col = 'rgba(139, 13, 26, 0.55)';

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(sx, sy);
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      ctx.lineCap  = 'square';
      ctx.lineJoin = 'miter';

      // Unit grid: s = one cell size
      const s = size / 5.5;

      /*
        Drawing the exact maze pattern from the image, as a series of
        connected path segments on a grid. Traced from top-left:

          ┌──────────┐
          │  ┌────┐  │
          │  │ ┌┐ │  │
          │  │ └┘ │  │
          │  └────┘  │
          └──────────┘  (only top-left corner portion)

        The pattern is a set of nested rectangular C/U open shapes,
        building outward from the inner square.
      */

      ctx.beginPath();

      // ── Outermost arm (top horizontal, tall vertical down)
      ctx.moveTo(s * 5.5, 0);       // start far right on top
      ctx.lineTo(0, 0);             // across to corner
      ctx.lineTo(0, s * 5.5);      // down

      // ── Step in from outer
      ctx.moveTo(s * 1.0, s * 5.5);
      ctx.lineTo(s * 1.0, s * 1.0);
      ctx.lineTo(s * 5.5, s * 1.0);

      // ── Second ring top-left portion (C open to bottom-right)
      ctx.moveTo(s * 2.0, s * 1.0);
      ctx.lineTo(s * 2.0, s * 2.0);
      ctx.lineTo(s * 5.5, s * 2.0);

      ctx.moveTo(s * 1.0, s * 2.0);
      ctx.lineTo(s * 1.0, s * 2.0); // spacer

      // ── Third ring
      ctx.moveTo(s * 2.0, s * 3.0);
      ctx.lineTo(s * 3.0, s * 3.0);
      ctx.lineTo(s * 3.0, s * 2.0);

      ctx.moveTo(s * 3.0, s * 3.0);
      ctx.lineTo(s * 3.0, s * 4.0);
      ctx.lineTo(s * 2.0, s * 4.0);
      ctx.lineTo(s * 2.0, s * 3.0);

      // ── Inner square
      ctx.moveTo(s * 4.0, s * 2.0);
      ctx.lineTo(s * 4.0, s * 3.0);
      ctx.lineTo(s * 5.5, s * 3.0);

      ctx.moveTo(s * 4.0, s * 4.0);
      ctx.lineTo(s * 4.0, s * 5.5);

      ctx.moveTo(s * 3.0, s * 4.0);
      ctx.lineTo(s * 5.5, s * 4.0);

      ctx.stroke();
      ctx.restore();
    }


    /* ─────────────────────────────────────────────────────
       5. FLOATING SAKURA PETALS
    ───────────────────────────────────────────────────── */
    interface Petal {
      x: number; y: number; size: number; opacity: number;
      vx: number; vy: number;
      rotation: number; rotSpeed: number;
      wobble: number; wobbleSpeed: number;
      colorShift: number;
    }

    const petalPool: Petal[] = [];
    for (let i = 0; i < 40; i++) {
      petalPool.push({
        x: Math.random() * 1200,
        y: Math.random() * 900 - 100,
        size: 2 + Math.random() * 5,
        opacity: 0.06 + Math.random() * 0.20,
        vx: (Math.random() - 0.5) * 0.55,
        vy: 0.3 + Math.random() * 0.55,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.035,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.018 + Math.random() * 0.022,
        colorShift: Math.random(),
      });
    }

    function updatePetals() {
      petalPool.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.55;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.y > H + 20 || p.x < -20 || p.x > W + 20) {
          p.x = Math.random() * W;
          p.y = -12;
          p.vy = 0.3 + Math.random() * 0.55;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Petal gradient
        const pg = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        const rr = p.colorShift > 0.5 ? 200 : 160;
        pg.addColorStop(0,   `rgba(${rr}, 40, 50, ${p.opacity})`);
        pg.addColorStop(1,   `rgba(${rr - 20}, 15, 25, 0)`);
        ctx.fillStyle = pg;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.52, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    /* ─────────────────────────────────────────────────────
       6. JAPANESE RAIN — falling columns (Matrix style, subtle)
    ───────────────────────────────────────────────────── */
    const kanjiChars = [
      '桜','美','創','技','夢','花','風','月','侍','心','道','刀',
      'ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ',
      'ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ',
      '永','字','水','火','木','金','土','天','地','人','力','気',
    ];

    const fontSize  = 16;
    const colSpacing = 38; // pixels between columns

    interface RainColumn {
      x: number;
      y: number;         // current head Y
      speed: number;
      length: number;    // trail length in characters
      chars: string[];   // current chars in trail
      opacity: number;   // base opacity (very low for subtlety)
      colorMode: 'crimson' | 'white';
    }

    const initColumns = (): RainColumn[] => {
      const cols: RainColumn[] = [];
      const numCols = Math.floor(W / colSpacing);
      for (let i = 0; i < numCols; i++) {
        // Only ~35% of columns active at any time for subtlety
        if (Math.random() > 0.35) continue;
        const len = 4 + Math.floor(Math.random() * 10);
        cols.push({
          x: i * colSpacing + colSpacing / 2 + (Math.random() - 0.5) * 10,
          y: -Math.random() * H * 1.5, // stagger start times
          speed: 0.5 + Math.random() * 1.2,
          length: len,
          chars: Array.from({ length: len }, () =>
            kanjiChars[Math.floor(Math.random() * kanjiChars.length)]
          ),
          opacity: 0.04 + Math.random() * 0.08, // very subtle: max ~0.12
          colorMode: Math.random() > 0.7 ? 'crimson' : 'white',
        });
      }
      return cols;
    };

    let rainCols = initColumns();

    // Randomly mutate a char in a column occasionally
    let charMutateTimer = 0;

    function drawKanji() {
      charMutateTimer++;
      if (charMutateTimer % 8 === 0) {
        rainCols.forEach(col => {
          if (Math.random() < 0.3) {
            const idx = Math.floor(Math.random() * col.chars.length);
            col.chars[idx] = kanjiChars[Math.floor(Math.random() * kanjiChars.length)];
          }
        });
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `300 ${fontSize}px "Noto Serif JP", "Hiragino Sans", sans-serif`;

      rainCols.forEach(col => {
        col.y += col.speed;

        // Reset when the entire trail has passed the bottom
        if (col.y - col.length * fontSize > H + 20) {
          col.y = -fontSize * (Math.random() * 5 + 2);
          col.speed = 0.5 + Math.random() * 1.2;
          col.opacity = 0.04 + Math.random() * 0.08;
          col.chars = Array.from({ length: col.length }, () =>
            kanjiChars[Math.floor(Math.random() * kanjiChars.length)]
          );
        }

        // Draw each character in the trail (head → tail)
        for (let i = 0; i < col.chars.length; i++) {
          const charY = col.y - i * fontSize;
          if (charY < -fontSize || charY > H + fontSize) continue;

          // Trail fade: head (i=0) is brightest, tail fades out
          const trailFade = 1 - i / col.length;
          const alpha = col.opacity * trailFade;

          if (col.colorMode === 'crimson') {
            // Crimson head with red trail
            if (i === 0) {
              ctx.fillStyle = `rgba(220, 60, 80, ${alpha * 2.2})`; // brighter head
            } else {
              ctx.fillStyle = `rgba(139, 13, 26, ${alpha})`;
            }
          } else {
            // Off-white head with pale trail
            if (i === 0) {
              ctx.fillStyle = `rgba(245, 242, 237, ${alpha * 2.0})`; // brighter head
            } else {
              ctx.fillStyle = `rgba(200, 196, 191, ${alpha})`;
            }
          }

          ctx.fillText(col.chars[i], col.x, charY);
        }
      });
    }


    /* ─────────────────────────────────────────────────────
       RENDER LOOP — branches are drawn once to offscreen
       then composited each frame for performance
    ───────────────────────────────────────────────────── */
    // Offscreen canvas for static branch art
    const branchCanvas = document.createElement('canvas');
    const branchCtx = branchCanvas.getContext('2d')!;

    function renderBranches() {
      branchCanvas.width  = W;
      branchCanvas.height = H;
      branchCtx.clearRect(0, 0, W, H);

      /* ── A. INK-WASH MOUNTAINS ─────────────────────────────── */
      const horizon = H * 0.72; // where water meets mountains

      // Layer 1 — far distant mountains (darkest = most washed, behind)
      const drawMountainRange = (
        pts: [number, number][],
        fillColor: string,
        strokeColor: string
      ) => {
        branchCtx.beginPath();
        branchCtx.moveTo(0, H);
        pts.forEach(([x, y]) => branchCtx.lineTo(x * W, y * H));
        branchCtx.lineTo(W, H);
        branchCtx.closePath();
        branchCtx.fillStyle = fillColor;
        branchCtx.fill();
        branchCtx.strokeStyle = strokeColor;
        branchCtx.lineWidth = 0.8;
        branchCtx.stroke();
      };

      // Far range (lightest)
      drawMountainRange([
        [0.00, 0.70],[0.06, 0.60],[0.13, 0.66],[0.20, 0.54],[0.28, 0.62],
        [0.36, 0.52],[0.44, 0.60],[0.52, 0.50],[0.60, 0.57],[0.70, 0.48],
        [0.80, 0.56],[0.88, 0.52],[0.94, 0.60],[1.00, 0.64],
      ], 'rgba(60, 70, 80, 0.12)', 'rgba(80, 90, 100, 0.10)');

      // Mid range
      drawMountainRange([
        [0.00, 0.78],[0.05, 0.68],[0.12, 0.75],[0.18, 0.62],[0.27, 0.70],
        [0.35, 0.58],[0.43, 0.67],[0.50, 0.55],[0.57, 0.64],[0.65, 0.53],
        [0.73, 0.62],[0.82, 0.57],[0.90, 0.65],[0.96, 0.72],[1.00, 0.75],
      ], 'rgba(50, 60, 75, 0.18)', 'rgba(60, 70, 90, 0.14)');

      // Near range (darkest, most defined)
      drawMountainRange([
        [0.00, 0.88],[0.04, 0.76],[0.10, 0.82],[0.16, 0.70],[0.24, 0.79],
        [0.30, 0.68],[0.38, 0.76],[0.46, 0.65],[0.52, 0.73],[0.60, 0.62],
        [0.68, 0.70],[0.76, 0.63],[0.84, 0.72],[0.92, 0.78],[1.00, 0.84],
      ], 'rgba(40, 50, 65, 0.22)', 'rgba(50, 60, 80, 0.18)');

      /* ── B. WATER / LAKE ─────────────────────────────────────── */
      // Water fill
      const waterGrad = branchCtx.createLinearGradient(0, horizon, 0, H);
      waterGrad.addColorStop(0, 'rgba(80, 100, 130, 0.10)');
      waterGrad.addColorStop(0.5, 'rgba(60, 80, 110, 0.06)');
      waterGrad.addColorStop(1, 'rgba(30, 40, 60, 0.04)');
      branchCtx.fillStyle = waterGrad;
      branchCtx.fillRect(0, horizon, W, H - horizon);

      // Horizontal water shimmer lines
      branchCtx.save();
      for (let i = 0; i < 18; i++) {
        const wy = horizon + (H - horizon) * (i / 18);
        const wAlpha = 0.025 + (i / 18) * 0.03;
        branchCtx.beginPath();
        branchCtx.moveTo(W * 0.05, wy);
        branchCtx.lineTo(W * 0.95, wy);
        branchCtx.strokeStyle = `rgba(160, 180, 210, ${wAlpha})`;
        branchCtx.lineWidth = 0.5 + i * 0.03;
        branchCtx.stroke();
      }
      branchCtx.restore();

      // Mountain reflection in water (mirrored, very faint)
      branchCtx.save();
      branchCtx.globalAlpha = 0.07;
      branchCtx.translate(0, horizon * 2);
      branchCtx.scale(1, -1);
      drawMountainRange([
        [0.00, 0.88],[0.04, 0.76],[0.10, 0.82],[0.16, 0.70],[0.24, 0.79],
        [0.30, 0.68],[0.38, 0.76],[0.46, 0.65],[0.52, 0.73],[0.60, 0.62],
        [0.68, 0.70],[0.76, 0.63],[0.84, 0.72],[0.92, 0.78],[1.00, 0.84],
      ], 'rgba(40, 50, 65, 1)', 'rgba(50, 60, 80, 0.5)');
      branchCtx.restore();

      /* ── C. SMALL BOAT ──────────────────────────────────────── */
      const boatX = W * 0.48;
      const boatY = horizon + (H - horizon) * 0.28;
      branchCtx.save();
      branchCtx.strokeStyle = 'rgba(20, 15, 15, 0.55)';
      branchCtx.fillStyle   = 'rgba(20, 15, 15, 0.50)';
      branchCtx.lineWidth   = 1.2;
      branchCtx.lineCap     = 'round';
      // Hull
      branchCtx.beginPath();
      branchCtx.moveTo(boatX - 16, boatY);
      branchCtx.quadraticCurveTo(boatX, boatY + 5, boatX + 16, boatY);
      branchCtx.lineTo(boatX + 12, boatY - 3);
      branchCtx.lineTo(boatX - 12, boatY - 3);
      branchCtx.closePath();
      branchCtx.fill();
      branchCtx.stroke();
      // Mast / person silhouette
      branchCtx.beginPath();
      branchCtx.moveTo(boatX + 2, boatY - 3);
      branchCtx.lineTo(boatX + 2, boatY - 14);
      branchCtx.stroke();
      // Pole/oar
      branchCtx.beginPath();
      branchCtx.moveTo(boatX - 10, boatY - 2);
      branchCtx.lineTo(boatX - 20, boatY + 8);
      branchCtx.stroke();
      branchCtx.restore();

      /* ── D. FLYING BIRDS ────────────────────────────────────── */
      const birdCenterX = W * 0.62;
      const birdCenterY = H * 0.28;
      const birds = [
        [0, 0], [22, -8], [42, -4], [60, -12], [75, -6],
        [-18, 5], [-35, 0], [-50, 8],
      ];
      branchCtx.save();
      branchCtx.strokeStyle = 'rgba(20, 15, 15, 0.45)';
      branchCtx.lineWidth   = 1.0;
      branchCtx.lineCap     = 'round';
      birds.forEach(([dx, dy]) => {
        const bx = birdCenterX + dx;
        const by = birdCenterY + dy;
        const ws = 5 + Math.abs(dx) * 0.06; // farther = slightly smaller
        branchCtx.beginPath();
        branchCtx.moveTo(bx - ws, by + ws * 0.3);
        branchCtx.quadraticCurveTo(bx, by - ws * 0.3, bx + ws, by + ws * 0.3);
        branchCtx.stroke();
      });
      branchCtx.restore();

      /* ── E. CHERRY BLOSSOM BRANCHES WITH FLOWERS ───────────── */
      const drawB = (
        bCtx: CanvasRenderingContext2D,
        x: number, y: number, angle: number, length: number,
        depth: number, maxDepth: number, alpha: number
      ) => {
        if (depth > maxDepth || length < 5) return;
        const ex = x + Math.cos(angle) * length;
        const ey = y + Math.sin(angle) * length;
        const thick = Math.max(0.4, (maxDepth - depth + 1) * 1.8);

        bCtx.beginPath();
        bCtx.moveTo(x, y);
        const cpx = (x + ex) / 2 + Math.sin(angle + 1.2) * length * 0.18;
        const cpy = (y + ey) / 2 + Math.cos(angle + 1.2) * length * 0.18;
        bCtx.quadraticCurveTo(cpx, cpy, ex, ey);
        bCtx.strokeStyle = `rgba(50, 28, 18, ${alpha})`;
        bCtx.lineWidth   = thick;
        bCtx.lineCap     = 'round';
        bCtx.stroke();

        // Draw white/pink flowers at tips
        if (depth >= maxDepth - 1) {
          const numFlowers = depth === maxDepth ? 4 : 2;
          for (let i = 0; i < numFlowers; i++) {
            const fx = ex + (Math.random() - 0.5) * 10;
            const fy = ey + (Math.random() - 0.5) * 10;
            if (Math.random() > 0.25) {
              // 5-petal flower — white to blush pink
              const r = 3.5 + Math.random() * 4.5;
              for (let p = 0; p < 5; p++) {
                const a = (p / 5) * Math.PI * 2;
                bCtx.beginPath();
                bCtx.ellipse(
                  fx + Math.cos(a) * r * 0.9,
                  fy + Math.sin(a) * r * 0.9,
                  r * 0.72, r * 0.5, a + Math.PI / 2, 0, Math.PI * 2
                );
                const isWhite = Math.random() > 0.4;
                const pr = isWhite ? 238 + Math.floor(Math.random() * 17) : 245;
                const pg = isWhite ? 190 + Math.floor(Math.random() * 30) : 160 + Math.floor(Math.random() * 30);
                const pb = isWhite ? 200 + Math.floor(Math.random() * 25) : 175 + Math.floor(Math.random() * 25);
                bCtx.fillStyle   = `rgba(${pr}, ${pg}, ${pb}, ${alpha * 0.88})`;
                bCtx.fill();
                bCtx.strokeStyle = `rgba(210, 130, 150, ${alpha * 0.3})`;
                bCtx.lineWidth   = 0.5;
                bCtx.stroke();
              }
              // Yellow center
              bCtx.beginPath();
              bCtx.arc(fx, fy, r * 0.28, 0, Math.PI * 2);
              bCtx.fillStyle = `rgba(255, 228, 140, ${alpha})`;
              bCtx.fill();
            } else {
              // Bud
              bCtx.beginPath();
              bCtx.ellipse(fx, fy, 1.8, 4, -0.4, 0, Math.PI * 2);
              bCtx.fillStyle = `rgba(235, 155, 175, ${alpha * 0.8})`;
              bCtx.fill();
            }
          }
        }

        const rnd1 = 0.62 + Math.random() * 0.1;
        const rnd2 = 0.55 + Math.random() * 0.1;
        drawB(bCtx, ex, ey, angle - (0.35 + Math.random() * 0.2), length * rnd1, depth + 1, maxDepth, alpha * 0.97);
        if (depth < maxDepth - 1) {
          drawB(bCtx, ex, ey, angle + (0.28 + Math.random() * 0.2), length * rnd2, depth + 1, maxDepth, alpha * 0.9);
        }
      };

      // Top-left corner branches drooping in
      drawB(branchCtx, -W * 0.01, H * 0.0,   0.22, H * 0.22, 0, 8, 0.92);
      drawB(branchCtx, W * 0.04,  -H * 0.01,  0.55, H * 0.18, 0, 7, 0.78);
      // Bottom-right corner branches
      drawB(branchCtx, W * 1.01,  H,          Math.PI + 0.25,  H * 0.24, 0, 8, 0.88);
      drawB(branchCtx, W * 0.96,  H * 1.01,  -Math.PI * 0.45, H * 0.16, 0, 7, 0.72);
    }

    // Initial render
    renderBranches();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      rainCols = initColumns();
      renderBranches();
    };
    window.addEventListener('resize', handleResize);

    // Main loop
    let t = 0;
    const loop = () => {
      t++;
      ctx.clearRect(0, 0, W, H);

      // 1. Seigaiha
      drawSeigaiha();

      // 2. Rising sun
      drawSun(t);

      // 3. Branch art (from offscreen canvas)
      ctx.drawImage(branchCanvas, 0, 0);

      // 4. Corner brackets — top-left and bottom-right only
      const bs  = Math.min(W, H) * 0.12;
      const pad = 18;
      drawCornerBracket(pad,     pad,     bs, false, false); // top-left
      drawCornerBracket(W - pad, H - pad, bs, true,  true);  // bottom-right

      // 5. Floating petals
      updatePetals();

      // 6. Kanji
      drawKanji();

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafRef.current);
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
