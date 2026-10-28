'use client';

import React, { useEffect, useRef } from 'react';

type SakuraKind = 'blossom' | 'petal';

interface SakuraSpriteParticle {
  kind: SakuraKind;
  variant: number; // 0..3 palette row in Aseprite sheet
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
  frameInterval: number;
  opacity: number;
}

interface ButterflySprite {
  variant: number; // 0: White Onyx Morpho, 1: Bright Pink & White Sakura, 2: Pastel Amethyst
  x: number;
  y: number;
  vx: number;
  vy: number;
  dir: 1 | -1; // 1: fluttering right, -1: fluttering left
  scale: number;
  wavePhase: number;
  waveSpeed: number;
  waveAmp: number;
  tiltAngle: number;
  frame: number; // 0..7 in Aseprite `butterflies.png`
  frameTimer: number;
  flutterSpeedMs: number;
  glidePauseMs: number;
  opacity: number;
  fadeState: 'in' | 'active' | 'out';
  elapsedMs: number;
  maxLifeMs: number;
  petalDropTimer: number;
}

function pickFlowerVariant(): number {
  const r = Math.random();
  if (r < 0.36) return 0; // Pastel Blush Sakura
  if (r < 0.62) return 1; // Pastel Lilac-Lavender
  if (r < 0.82) return 2; // Pastel Peach-Rose
  return 3;               // Pastel Pearl-White
}

function pickPetalVariant(): number {
  const r = Math.random();
  if (r < 0.34) return 0; // Bright Pink & Crisp White Tip
  if (r < 0.62) return 1; // Pure White with Bright Pink Blush
  if (r < 0.84) return 2; // Radiant Bright Sakura Pink
  return 3;               // Snow White Onyx Petal
}

function pickButterflyVariant(): number {
  const r = Math.random();
  if (r < 0.38) return 0; // White Onyx Pearl & Lavender
  if (r < 0.72) return 1; // Bright Pink & White Sakura Butterfly
  return 2;               // Pastel Lilac & Amethyst Slogan Butterfly
}

/**
 * ScrollAmbience — Aseprite 2D Pastel Cherry Blossoms, Bright Pink/White Petals & Butterflies
 *
 * Renders authentic 2D pixel-art sprite sheets authored & exported via Aseprite CLI:
 * - `/sprites/sakura_blossoms.png` (32x32, 4 soft pastel flower variants x 8 frames)
 * - `/sprites/sakura_petals.png`   (20x20, 4 bright-pink & white blended variants x 8 frames)
 * - `/sprites/sakura_branch.png`   (144x104, 6-frame pastel cherry blossom garden boughs)
 * - `/sprites/butterflies.png`     (48x48, 3 butterfly variants x 8 silky wing-flutter frames)
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
      loadSprite('/sprites/butterflies.png'),
    ])
      .then(([blossomSheet, petalSheet, branchSheet, butterflySheet]) => {
        if (isDisposed) return;

        const initialMobile = width < 768;
        const baseParticleCount = initialMobile ? 22 : 40;
        const maxParticles = initialMobile ? 34 : 64;

        const particles: SakuraSpriteParticle[] = [];
        const butterflies: ButterflySprite[] = [];

        let lastScrollY = window.scrollY;
        let scrollImpulse = 0;
        let scrollAccumulator = 0;
        let lastButterflySpawnMs = 0;

        let mouseX = -1000;
        let mouseY = -1000;
        let mouseActive = false;

        let branchFrame = 0;
        let branchTimer = 0;

        const getBelowLogoY = () => {
          if (width >= 1280) return 120;
          if (width >= 1024) return 112;
          if (width >= 640) return 96;
          return 78;
        };

        // 0 = resting below top corner logos; 1 = nestled flush in the top screen corners
        const initRaw = Math.min(1, Math.max(0, window.scrollY / (getBelowLogoY() + 28)));
        let cornerProgress = initRaw * initRaw * (3 - 2 * initRaw);
        let liveBranchTopY = getBelowLogoY() * (1 - cornerProgress) + (-7) * cornerProgress;

        const createSakuraParticle = (
          customX?: number,
          customY?: number,
          forceKind?: SakuraKind
        ): SakuraSpriteParticle => {
          const isMobileNow = width < 768;
          const kind: SakuraKind =
            forceKind ?? (Math.random() < 0.30 ? 'blossom' : 'petal');
          const isBlossom = kind === 'blossom';
          const baseVy = isBlossom
            ? 0.50 + Math.random() * 0.50
            : 0.70 + Math.random() * 0.80;

          return {
            kind,
            variant: isBlossom ? pickFlowerVariant() : pickPetalVariant(),
            x: customX !== undefined ? customX : Math.random() * width,
            y: customY !== undefined ? customY : Math.random() * height,
            vx: 0.22 + (Math.random() - 0.35) * 0.60,
            vy: baseVy,
            baseVy,
            scale: isBlossom
              ? (isMobileNow ? 0.90 : 1.08) + Math.random() * 0.42
              : (isMobileNow ? 1.10 : 1.32) + Math.random() * 0.52,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * (isBlossom ? 0.011 : 0.017),
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.015 + Math.random() * 0.020,
            swayAmp: 0.65 + Math.random() * 1.20,
            frame: Math.floor(Math.random() * 8),
            frameTimer: Math.random() * 100,
            frameInterval: isBlossom ? 125 : 95,
            opacity: isBlossom
              ? 0.72 + Math.random() * 0.18
              : 0.76 + Math.random() * 0.18,
          };
        };

        for (let i = 0; i < baseParticleCount; i++) {
          particles.push(createSakuraParticle());
        }

        // Spawn a whimsical kaleidoscope of 2-3 fluttering 2D Aseprite butterflies
        const spawnButterflies = (count = 2) => {
          const now = performance.now();
          if (now - lastButterflySpawnMs < 1300) return;
          lastButterflySpawnMs = now;

          const isMobileNow = width < 768;
          const dir: 1 | -1 = Math.random() < 0.68 ? 1 : -1;
          const startX = dir === 1 ? -36 : width + 36;
          const startY = height * (0.48 + Math.random() * 0.40);
          const baseSpeed = isMobileNow ? 2.6 : 3.2;

          for (let i = 0; i < count; i++) {
            const speed = baseSpeed + (Math.random() - 0.5) * 0.65;
            const climbDeg = 18 + Math.random() * 14;
            const climbRad = (climbDeg * Math.PI) / 180;
            const bScale = (isMobileNow ? 1.30 : 1.60) + Math.random() * 0.42;

            butterflies.push({
              variant: pickButterflyVariant(),
              x: startX - dir * i * 62 + (Math.random() - 0.5) * 24,
              y: startY + i * 42 + (Math.random() - 0.5) * 28,
              vx: dir * Math.cos(climbRad) * speed,
              vy: -Math.sin(climbRad) * speed,
              dir,
              scale: bScale,
              wavePhase: Math.random() * Math.PI * 2,
              waveSpeed: 0.045 + Math.random() * 0.025,
              waveAmp: 1.15 + Math.random() * 0.85,
              tiltAngle: (Math.random() - 0.5) * 0.16,
              frame: Math.floor(Math.random() * 8),
              frameTimer: Math.random() * 60,
              flutterSpeedMs: 74 + Math.random() * 20,
              glidePauseMs: 0,
              opacity: 0,
              fadeState: 'in',
              elapsedMs: 0,
              maxLifeMs: 11000,
              petalDropTimer: Math.random() * 250,
            });
          }
        };

        const shedBranchPetals = (amount: number) => {
          const isMobileNow = width < 768;
          const branchSpanX = isMobileNow ? 120 : 195;
          for (let i = 0; i < amount; i++) {
            if (particles.length >= maxParticles) break;
            const fromLeft = isMobileNow ? true : Math.random() < 0.5;
            const bx = fromLeft
              ? 18 + Math.random() * branchSpanX
              : width - (18 + Math.random() * branchSpanX);
            const by = Math.max(8, liveBranchTopY + 18) + Math.random() * 95;
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
            if (scrollAccumulator > 220) {
              scrollAccumulator = 0;
              // Echoes the 2-3 butterflies taking flight on the "Flames to Flight" banner!
              spawnButterflies(Math.random() > 0.35 ? 3 : 2);
              shedBranchPetals(width < 768 ? 2 : 4);
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
          if (!document.hidden && butterflies.length < 2) {
            spawnButterflies(2);
          }
        }, 10500);

        const greetTimeout = setTimeout(() => {
          if (!isDisposed) {
            spawnButterflies(3);
          }
        }, 350);

        cleanupListeners = () => {
          clearInterval(idleInterval);
          clearTimeout(greetTimeout);
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
        };

        const drawSakuraBranches = (dtMs: number) => {
          branchTimer += dtMs;
          const effectiveBranchInterval =
            Math.abs(scrollImpulse) > 1 ? 115 : 185;
          if (branchTimer >= effectiveBranchInterval) {
            branchTimer = 0;
            branchFrame = (branchFrame + 1) % 6;
          }

          const isMobileNow = width < 768;
          const scrollYNow = Math.max(0, window.scrollY);
          const belowLogoY = getBelowLogoY();
          const cornerY = isMobileNow ? -5 : -7;

          // Smoothly glide from below the top logos into the exact top corners once logos scroll away
          const rawT = Math.min(1, scrollYNow / (belowLogoY + 28));
          const targetProgress = rawT * rawT * (3 - 2 * rawT);
          const damp = 1 - Math.exp(-dtMs * 0.015);
          cornerProgress += (targetProgress - cornerProgress) * damp;

          const glidedY = belowLogoY + (cornerY - belowLogoY) * cornerProgress;
          const logoLiveClearY = belowLogoY - scrollYNow;
          const finalY = Math.max(glidedY, logoLiveClearY);
          liveBranchTopY = finalY;

          const effectiveT = Math.min(
            1,
            Math.max(0, (belowLogoY - finalY) / (belowLogoY - cornerY))
          );

          const srcW = 144;
          const srcH = 104;
          const sx = branchFrame * srcW;
          const baseScale = isMobileNow
            ? 1.08
            : width < 1024
              ? 1.48
              : 1.72 + 0.12 * effectiveT;
          const dstW = Math.round(srcW * baseScale);
          const dstH = Math.round(srcH * baseScale);

          // Rotate upward slightly (-6 deg) as it settles into (0, 0) / (width, 0) so the
          // entire upper blossom canopy & trunk hug BOTH the top edge and side edge flush.
          const cornerNestleAngle = isMobileNow ? -0.09 : -0.105;
          const restAngle = 0.015;
          const branchAngle =
            restAngle + (cornerNestleAngle - restAngle) * effectiveT + scrollImpulse * 0.008;
          const edgeX = -8 + 2 * effectiveT; // -8px below logo -> -6px flush in corner

          if (!isMobileNow || effectiveT > 0.15) {
            const leftAlpha = isMobileNow
              ? 0.78 * Math.min(1, (effectiveT - 0.15) / 0.55)
              : 0.88;
            ctx.save();
            ctx.globalAlpha = leftAlpha;
            ctx.translate(edgeX, finalY);
            ctx.rotate(branchAngle);
            ctx.drawImage(branchSheet, sx, 0, srcW, srcH, 0, 0, dstW, dstH);
            ctx.restore();
          }

          // Right branch: desktop only (omitted on mobile/phone so it never clashes with the fixed hamburger menu)
          if (!isMobileNow) {
            ctx.save();
            ctx.globalAlpha = 0.88;
            ctx.translate(width - edgeX, finalY);
            ctx.scale(-1, 1);
            ctx.rotate(branchAngle);
            ctx.drawImage(branchSheet, sx, 0, srcW, srcH, 0, 0, dstW, dstH);
            ctx.restore();
          }
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

          // 1. Overhanging Pastel Cherry Blossom Boughs (glide into top corners on scroll)
          drawSakuraBranches(dtMs);

          // 2. Pastel Sakura Blossoms & Bright Pink/White Blended Petals
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];

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

          // 3. Fluttering 2D Aseprite Butterflies
          for (let i = butterflies.length - 1; i >= 0; i--) {
            const b = butterflies[i];
            b.elapsedMs += dtMs;

            // Occasional brief open-wing sunning glide between flutter bursts
            if (b.glidePauseMs > 0) {
              b.glidePauseMs -= dtMs;
              b.frame = 0;
            } else {
              b.frameTimer += dtMs;
              if (b.frameTimer >= b.flutterSpeedMs) {
                b.frameTimer %= b.flutterSpeedMs;
                b.frame = (b.frame + 1) % 8;
                if (b.frame === 0 && Math.random() < 0.22) {
                  b.glidePauseMs = 180 + Math.random() * 240;
                }
              }
            }

            // Organic dancing butterfly flight curve (gentle bobbing + weaving)
            const stepScale = dtMs / 16.667;
            b.wavePhase += b.waveSpeed * stepScale;
            const bobY = Math.sin(b.wavePhase) * b.waveAmp;
            const weaveX = Math.cos(b.wavePhase * 0.65) * 0.45;

            b.x += (b.vx + weaveX) * stepScale;
            b.y += (b.vy + bobY - scrollImpulse * 0.18) * stepScale;

            // Subtle bright pink/white petal trail stirred by butterfly wings
            b.petalDropTimer += dtMs;
            if (b.petalDropTimer >= 650 && particles.length < maxParticles) {
              b.petalDropTimer = 0;
              particles.push(
                createSakuraParticle(
                  b.x - b.dir * 16,
                  b.y + 8,
                  'petal'
                )
              );
            }

            if (b.fadeState === 'in') {
              b.opacity = Math.min(b.opacity + 0.045 * stepScale, 0.94);
              if (b.opacity >= 0.94) b.fadeState = 'active';
            } else if (
              b.elapsedMs > b.maxLifeMs ||
              b.x > width + 160 ||
              b.x < -160 ||
              b.y < -150
            ) {
              b.fadeState = 'out';
              b.opacity = Math.max(b.opacity - 0.035 * stepScale, 0);
              if (b.opacity <= 0) {
                butterflies.splice(i, 1);
                continue;
              }
            }

            const cell = 48;
            const drawSize = Math.round(cell * b.scale);
            const dynamicTilt = b.tiltAngle + Math.sin(b.wavePhase) * 0.08;

            ctx.save();
            ctx.globalAlpha = b.opacity;
            ctx.translate(Math.round(b.x), Math.round(b.y));
            if (b.dir === -1) {
              ctx.scale(-1, 1);
            }
            ctx.rotate(dynamicTilt);
            ctx.shadowColor = 'rgba(92, 75, 153, 0.16)';
            ctx.shadowBlur = 5;
            ctx.drawImage(
              butterflySheet,
              b.frame * cell,
              b.variant * cell,
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
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    />
  );
}

export default ScrollAmbience;
