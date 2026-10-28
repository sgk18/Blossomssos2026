'use client';

import React, { useEffect, useRef } from 'react';

type SakuraKind = 'blossom' | 'petal';

interface SakuraSpriteParticle {
  kind: SakuraKind;
  variant: number; // 0: classic pink, 1: vivid rose, 2: onyx lavender, 3: sunset coral
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  scale: number;
  angle: number;
  rotSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmp: number;
  frame: number;
  frameTimer: number;
  frameInterval: number; // ms per Aseprite frame
  opacity: number;
}

interface PigeonSprite {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dir: 1 | -1; // 1: flying right, -1: flying left
  scale: number;
  tiltAngle: number;
  frame: number; // 0..5 = "flap" tag, 6..7 = "glide" tag
  frameTimer: number;
  mode: 'flap' | 'glide';
  modeTimer: number;
  modeDuration: number;
  opacity: number;
  fadeState: 'in' | 'active' | 'out';
  elapsedMs: number;
  maxLifeMs: number;
  petalDropTimer: number;
}

// Weighted color selection favoring authentic cherry blossom pinks with festive accents
function pickSakuraVariant(): number {
  const r = Math.random();
  if (r < 0.44) return 0; // Classic Somei-Yoshino Sakura Pink
  if (r < 0.74) return 1; // Vivid Yaezakura Rose-Magenta
  if (r < 0.89) return 2; // Team Onyx Wisteria-Lavender
  return 3;               // Sunset Coral Sakura
}

/**
 * ScrollAmbience — Aseprite 2D Cherry Blossom & White Onyx Pigeon Sprite Engine
 *
 * Renders authentic pixel-art 2D sprite sheets generated via Aseprite CLI:
 * - `/sprites/sakura_blossoms.png` (32x32, 4 variants x 8 frames)
 * - `/sprites/sakura_petals.png`   (20x20, 4 variants x 8 3D-tumble frames)
 * - `/sprites/sakura_branch.png`   (144x104, 6-frame breeze-swaying cherry boughs)
 * - `/sprites/white_pigeon.png`    (64x64, 8-frame `flap` + `glide` white dove)
 */
export function ScrollAmbience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;
    let isDisposed = false;

    // Load Aseprite-exported 2D sprite sheets
    const loadSprite = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let cleanupListeners: (() => void) | null = null;

    Promise.all([
      loadSprite('/sprites/sakura_blossoms.png'),
      loadSprite('/sprites/sakura_petals.png'),
      loadSprite('/sprites/sakura_branch.png'),
      loadSprite('/sprites/white_pigeon.png'),
    ])
      .then(([blossomSheet, petalSheet, branchSheet, pigeonSheet]) => {
        if (isDisposed) return;

        const isMobile = width < 768;
        const baseParticleCount = isMobile ? 22 : 40;
        const maxParticles = isMobile ? 34 : 64;

        const particles: SakuraSpriteParticle[] = [];
        const pigeons: PigeonSprite[] = [];

        let lastScrollY = window.scrollY;
        let scrollImpulse = 0;
        let scrollAccumulator = 0;
        let lastPigeonSpawnMs = 0;

        let mouseX = -1000;
        let mouseY = -1000;
        let mouseActive = false;

        // Branch animation state (6 frames in `sakura_branch.png`)
        let branchFrame = 0;
        let branchTimer = 0;

        const createSakuraParticle = (
          customX?: number,
          customY?: number,
          forceKind?: SakuraKind
        ): SakuraSpriteParticle => {
          const kind: SakuraKind =
            forceKind ?? (Math.random() < 0.34 ? 'blossom' : 'petal');
          const isBlossom = kind === 'blossom';
          const baseVy = isBlossom
            ? 0.55 + Math.random() * 0.55
            : 0.75 + Math.random() * 0.85;

          return {
            kind,
            variant: pickSakuraVariant(),
            x: customX !== undefined ? customX : Math.random() * width,
            y: customY !== undefined ? customY : Math.random() * height,
            vx: 0.25 + (Math.random() - 0.35) * 0.65,
            vy: baseVy,
            baseVy,
            scale: isBlossom
              ? (isMobile ? 0.95 : 1.15) + Math.random() * 0.45
              : (isMobile ? 1.1 : 1.35) + Math.random() * 0.55,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * (isBlossom ? 0.012 : 0.018),
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.016 + Math.random() * 0.022,
            swayAmp: 0.65 + Math.random() * 1.25,
            frame: Math.floor(Math.random() * 8),
            frameTimer: Math.random() * 100,
            frameInterval: isBlossom ? 120 : 95,
            opacity: isBlossom
              ? 0.82 + Math.random() * 0.16
              : 0.78 + Math.random() * 0.2,
          };
        };

        for (let i = 0; i < baseParticleCount; i++) {
          particles.push(createSakuraParticle());
        }

        // Spawn 2D Aseprite White Onyx Pigeons in flight
        const spawnPigeonFlock = (count = 1) => {
          const now = performance.now();
          if (now - lastPigeonSpawnMs < 2200) return;
          lastPigeonSpawnMs = now;

          const dir: 1 | -1 = Math.random() < 0.72 ? 1 : -1;
          const startX = dir === 1 ? -150 : width + 150;
          const startY = height * (0.48 + Math.random() * 0.38);
          const baseSpeed = isMobile ? 3.5 : 4.4;

          for (let i = 0; i < count; i++) {
            const speed = baseSpeed + (Math.random() - 0.5) * 0.6;
            const climbDeg = 20 + Math.random() * 10; // Ascending flight angle
            const climbRad = (climbDeg * Math.PI) / 180;

            // Proper big 2D sprite size: 64px * 2.25..2.85 = ~144px..182px on desktop!
            const spriteScale =
              (isMobile ? 1.85 : 2.35) + Math.random() * 0.45;

            pigeons.push({
              x: startX - dir * i * 88,
              y: startY + i * 52 + (Math.random() - 0.5) * 24,
              vx: dir * Math.cos(climbRad) * speed,
              vy: -Math.sin(climbRad) * speed,
              dir,
              scale: spriteScale,
              tiltAngle: -climbRad * 0.55,
              frame: Math.floor(Math.random() * 6),
              frameTimer: 0,
              mode: 'flap',
              modeTimer: 0,
              modeDuration: 950 + Math.random() * 550,
              opacity: 0,
              fadeState: 'in',
              elapsedMs: 0,
              maxLifeMs: 9000,
              petalDropTimer: 0,
            });
          }
        };

        // Shed fresh cherry blossom petals from the overhanging boughs on scroll
        const shedBranchPetals = (amount: number) => {
          for (let i = 0; i < amount; i++) {
            if (particles.length >= maxParticles) break;
            const fromLeft = Math.random() < 0.5;
            const bx = fromLeft
              ? 30 + Math.random() * 180
              : width - (30 + Math.random() * 180);
            const by = 24 + Math.random() * 110;
            particles.push(createSakuraParticle(bx, by, 'petal'));
          }
        };

        const handleScroll = () => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;
          lastScrollY = currentScrollY;

          scrollImpulse = Math.max(Math.min(delta * 0.085, 6.5), -6.5);

          if (delta > 3) {
            scrollAccumulator += delta;
            if (Math.random() < 0.35) {
              shedBranchPetals(1);
            }
            if (scrollAccumulator > 380) {
              scrollAccumulator = 0;
              spawnPigeonFlock(Math.random() > 0.45 ? 2 : 1);
              shedBranchPetals(isMobile ? 2 : 4);
            }
          } else if (delta < -3) {
            scrollAccumulator = Math.max(0, scrollAccumulator + delta * 0.5);
          }
        };

        const handleMouseMove = (e: MouseEvent) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          mouseActive = true;
        };

        const handleMouseLeave = () => {
          mouseActive = false;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

        const idleInterval = setInterval(() => {
          if (!document.hidden && pigeons.length === 0) {
            spawnPigeonFlock(1);
          }
        }, 13000);

        const greetTimeout = setTimeout(() => {
          if (!isDisposed) {
            spawnPigeonFlock(2);
          }
        }, 1400);

        cleanupListeners = () => {
          clearInterval(idleInterval);
          clearTimeout(greetTimeout);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        };

        // Draw overhanging cherry blossom boughs in upper left & right corners
        const drawSakuraBranches = (dtMs: number) => {
          branchTimer += dtMs;
          const effectiveBranchInterval =
            Math.abs(scrollImpulse) > 1 ? 110 : 180;
          if (branchTimer >= effectiveBranchInterval) {
            branchTimer = 0;
            branchFrame = (branchFrame + 1) % 6;
          }

          const srcW = 144;
          const srcH = 104;
          const sx = branchFrame * srcW;
          const branchScale = isMobile ? 1.15 : 1.85;
          const dstW = Math.round(srcW * branchScale);
          const dstH = Math.round(srcH * branchScale);
          const windTilt = scrollImpulse * 0.008;

          // 1. Top-Left Overhanging Sakura Bough
          if (!isMobile) {
            ctx.save();
            ctx.globalAlpha = 0.92;
            ctx.translate(-6, -4);
            ctx.rotate(windTilt);
            ctx.drawImage(branchSheet, sx, 0, srcW, srcH, 0, 0, dstW, dstH);
            ctx.restore();
          }

          // 2. Top-Right Overhanging Sakura Bough (mirrored horizontally)
          ctx.save();
          ctx.globalAlpha = isMobile ? 0.82 : 0.92;
          ctx.translate(width + 6, -4);
          ctx.scale(-1, 1);
          ctx.rotate(windTilt);
          ctx.drawImage(branchSheet, sx, 0, srcW, srcH, 0, 0, dstW, dstH);
          ctx.restore();
        };

        let lastTime = performance.now();

        const render = (now: number) => {
          if (isDisposed) return;

          const dtMs = Math.min(now - lastTime, 50);
          lastTime = now;

          if (document.hidden) {
            animId = requestAnimationFrame(render);
            return;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.imageSmoothingEnabled = false;

          scrollImpulse *= 0.93;
          if (Math.abs(scrollImpulse) < 0.01) scrollImpulse = 0;

          // 1. Render Overhanging 2D Cherry Blossom Boughs
          drawSakuraBranches(dtMs);

          // 2. Update & Render 2D Sakura Blossoms & Falling Petals
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

            // Advance Aseprite sprite frame (faster tumble during scroll gusts!)
            const speedBoost = 1 + Math.abs(scrollImpulse) * 0.35;
            p.frameTimer += dtMs * speedBoost;
            if (p.frameTimer >= p.frameInterval) {
              p.frameTimer %= p.frameInterval;
              p.frame = (p.frame + 1) % 8;
            }

            p.swayPhase += p.swaySpeed;
            const sway = Math.sin(p.swayPhase) * p.swayAmp;

            const effectiveVy = p.baseVy - scrollImpulse * 0.42;
            p.y += effectiveVy;
            p.x += p.vx + sway + scrollImpulse * 0.22;
            p.angle += p.rotSpeed * speedBoost;

            // Gentle mouse breeze interaction
            if (mouseActive) {
              const dx = p.x - mouseX;
              const dy = p.y - mouseY;
              const distSq = dx * dx + dy * dy;
              if (distSq < 12100 && distSq > 1) {
                const dist = Math.sqrt(distSq);
                const push = (1 - dist / 110) * 2.4;
                p.x += (dx / dist) * push;
                p.y += (dy / dist) * push;
              }
            }

            // Trim burst-spawned extras once offscreen; recycle baseline pool
            const offBottom = p.y > height + 48;
            const offTop = p.y < -60;
            if (offBottom || offTop) {
              if (particles.length > baseParticleCount) {
                particles.splice(i, 1);
                continue;
              }
              p.y = offBottom ? -32 : height + 28;
              p.x = Math.random() * width;
            }
            if (p.x > width + 48) p.x = -32;
            else if (p.x < -48) p.x = width + 32;

            const isBlossom = p.kind === 'blossom';
            const sheet = isBlossom ? blossomSheet : petalSheet;
            const cell = isBlossom ? 32 : 20;
            const drawSize = Math.round(cell * p.scale);

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(Math.round(p.x), Math.round(p.y));
            ctx.rotate(p.angle);
            ctx.drawImage(
              sheet,
              p.frame * cell,
              p.variant * cell,
              cell,
              cell,
              -Math.round(drawSize / 2),
              -Math.round(drawSize / 2),
              drawSize,
              drawSize
            );
            ctx.restore();
          }

          // 3. Update & Render Big 2D Aseprite White Onyx Pigeons
          for (let i = pigeons.length - 1; i >= 0; i--) {
            const d = pigeons[i];
            d.elapsedMs += dtMs;
            d.modeTimer += dtMs;

            // Alternate naturally between active wingbeats ("flap": 0..5) and soaring ("glide": 6..7)
            if (d.modeTimer >= d.modeDuration) {
              d.modeTimer = 0;
              if (d.mode === 'flap') {
                d.mode = 'glide';
                d.modeDuration = 600 + Math.random() * 450;
                d.frame = 6;
              } else {
                d.mode = 'flap';
                d.modeDuration = 950 + Math.random() * 550;
                d.frame = 0;
              }
            }

            const frameDur = d.mode === 'flap' ? 88 : 160;
            d.frameTimer += dtMs;
            if (d.frameTimer >= frameDur) {
              d.frameTimer %= frameDur;
              if (d.mode === 'flap') {
                d.frame = (d.frame + 1) % 6;
              } else {
                d.frame = d.frame === 6 ? 7 : 6;
              }
            }

            const stepScale = dtMs / 16.667;
            d.x += d.vx * stepScale;
            d.y += d.vy * stepScale;

            // Gently shake loose a tumbling sakura petal along the flight wake
            d.petalDropTimer += dtMs;
            if (d.petalDropTimer >= 420 && particles.length < maxParticles) {
              d.petalDropTimer = 0;
              particles.push(
                createSakuraParticle(
                  d.x - d.dir * 26,
                  d.y + 8,
                  'petal'
                )
              );
            }

            if (d.fadeState === 'in') {
              d.opacity = Math.min(d.opacity + 0.045 * stepScale, 0.98);
              if (d.opacity >= 0.98) d.fadeState = 'active';
            } else if (
              d.elapsedMs > d.maxLifeMs ||
              d.x > width + 220 ||
              d.x < -220 ||
              d.y < -180
            ) {
              d.fadeState = 'out';
              d.opacity = Math.max(d.opacity - 0.035 * stepScale, 0);
              if (d.opacity <= 0) {
                pigeons.splice(i, 1);
                continue;
              }
            }

            const cell = 64;
            const drawSize = Math.round(cell * d.scale);

            ctx.save();
            ctx.globalAlpha = d.opacity;
            ctx.translate(Math.round(d.x), Math.round(d.y));
            if (d.dir === -1) {
              ctx.scale(-1, 1);
            }
            ctx.rotate(d.tiltAngle);
            // Soft lavender ambient drop-shadow for crisp contrast over peach & white sections
            ctx.shadowColor = 'rgba(61, 36, 108, 0.22)';
            ctx.shadowBlur = 8;
            ctx.drawImage(
              pigeonSheet,
              d.frame * cell,
              0,
              cell,
              cell,
              -Math.round(drawSize / 2),
              -Math.round(drawSize / 2),
              drawSize,
              drawSize
            );
            ctx.restore();
          }

          animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);
      })
      .catch(() => {
        // Fail silently if sprite assets fail to load offline
      });

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (cleanupListeners) cleanupListeners();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}

export default ScrollAmbience;
