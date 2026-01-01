"use client";

import { useEffect, useRef } from "react";
import { Particle, BioluminescentCanvasProps } from "@/lib/types";
import { THEME } from "@/config/theme";

// Texture paths for each section
const SECTION_TEXTURES: Record<string, string> = {
  hero: "/textures/spider-web.jpeg",
  about: "/textures/about-frame.jpg",
  projects: "/textures/spider-web.jpeg", // Reusing for now
};

export function BioluminescentCanvas({ 
  isDark, 
  scrollProgress = 0, 
  activeSection = 'hero',
  isHoveringProject = false 
}: BioluminescentCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const texturesRef = useRef<Record<string, HTMLImageElement>>({});
  const scrollProgressRef = useRef(0);
  const activeSectionRef = useRef<string>(activeSection);
  const transitionProgressRef = useRef(1); // 0 = transitioning, 1 = complete
  const isHoveringRef = useRef(false);

  // Keep refs in sync for the animation loop
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    isHoveringRef.current = isHoveringProject;
  }, [isHoveringProject]);

  // Helper function to set positions from a texture
  const setPositionsFromTexture = (canvas: HTMLCanvasElement, particles: Particle[], texture: HTMLImageElement) => {
    if (!texture || canvas.width === 0) return;

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    offscreen.width = canvas.width;
    offscreen.height = canvas.height;

    const iRatio = texture.width / texture.height;
    const cRatio = canvas.width / canvas.height;
    let drawW, drawH, drawX, drawY;
    if (cRatio > iRatio) {
      drawW = canvas.width;
      drawH = canvas.width / iRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    } else {
      drawH = canvas.height;
      drawW = canvas.height * iRatio;
      drawY = 0;
      drawX = (canvas.width - drawW) / 2;
    }

    offCtx.drawImage(texture, drawX, drawY, drawW, drawH);
    const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

    const darkPixels: { x: number; y: number }[] = [];
    const step = 4;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const brightness = (imageData[index] + imageData[index + 1] + imageData[index + 2]) / 3;
        if (brightness < 150) {
          darkPixels.push({ x, y });
        }
      }
    }

    if (darkPixels.length > 0) {
      particles.forEach((particle) => {
        const pixel = darkPixels[Math.floor(Math.random() * darkPixels.length)];
        particle.homeX = pixel.x + (Math.random() - 0.5) * step;
        particle.homeY = pixel.y + (Math.random() - 0.5) * step;
      });
    }
  };

  // Helper function to update home positions based on section
  const updateHomePositions = (canvas: HTMLCanvasElement, section: string) => {
    const particles = particlesRef.current;
    if (particles.length === 0) return;

    const texture = texturesRef.current[section];
    if (texture) {
      setPositionsFromTexture(canvas, particles, texture);
    }
  };

  // Reposition particles when section changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeSectionRef.current === activeSection) return;
    
    activeSectionRef.current = activeSection;
    transitionProgressRef.current = 0; // Start transition
    
    updateHomePositions(canvas, activeSection);
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const getParticleCount = () => {
      if (typeof window === "undefined") return 150;
      return window.innerWidth < 768 ? 80 : 750;
    };

    // Load all section textures
    const loadAllTextures = async () => {
      const entries = Object.entries(SECTION_TEXTURES);
      const loaded: Record<string, HTMLImageElement> = {};
      
      await Promise.all(
        entries.map(([section, src]) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.crossOrigin = "anonymous";
            img.onload = () => {
              loaded[section] = img;
              resolve();
            };
            img.onerror = () => resolve(); // Continue even if one fails
          });
        })
      );
      
      texturesRef.current = loaded;
      return loaded.hero; // Return hero texture for initial particle setup
    };

    const initializeParticles = (texture?: HTMLImageElement) => {
      const count = getParticleCount();
      const mode = isDark ? "dark" : "light";
      const colors = THEME[mode].particle.colors;

      if (texture && canvas.width > 0 && canvas.height > 0) {
        const offscreen = document.createElement("canvas");
        const offCtx = offscreen.getContext("2d");
        if (offCtx) {
          offscreen.width = canvas.width;
          offscreen.height = canvas.height;

          const iWidth = texture.width;
          const iHeight = texture.height;
          const iRatio = iWidth / iHeight;
          const cRatio = canvas.width / canvas.height;

          let drawW, drawH, drawX, drawY;
          if (cRatio > iRatio) {
            drawW = canvas.width;
            drawH = canvas.width / iRatio;
            drawX = 0;
            drawY = (canvas.height - drawH) / 2;
          } else {
            drawH = canvas.height;
            drawW = canvas.height * iRatio;
            drawY = 0;
            drawX = (canvas.width - drawW) / 2;
          }

          offCtx.drawImage(texture, drawX, drawY, drawW, drawH);
          const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height).data;

          const darkPixels: { x: number; y: number }[] = [];
          const step = 4;
          for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
              const index = (y * canvas.width + x) * 4;
              const r = imageData[index];
              const g = imageData[index + 1];
              const b = imageData[index + 2];
              const brightness = (r + g + b) / 3;

              if (brightness < 150) {
                darkPixels.push({ x, y });
              }
            }
          }

          if (darkPixels.length > 0) {
            particlesRef.current = Array.from({ length: count }, () => {
              const pixel = darkPixels[Math.floor(Math.random() * darkPixels.length)];
              const x = pixel.x + (Math.random() - 0.5) * step;
              const y = pixel.y + (Math.random() - 0.5) * step;
              return {
                x,
                y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.8 + 1.0,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseBrightness: Math.random() * 0.4 + 0.6,
                homeX: x,
                homeY: y,
              };
            });
            return;
          }
        }
      }

      // Fallback to random if image fails or no dark pixels found
      particlesRef.current = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.8 + 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseBrightness: Math.random() * 0.4 + 0.6,
          homeX: x,
          homeY: y,
        };
      });
    };

    const updateCanvasSize = (heroTexture?: HTMLImageElement) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles(heroTexture);
    };

    const handleResize = () => updateCanvasSize(texturesRef.current.hero);

    // Initial setup - load all textures then initialize
    loadAllTextures()
      .then((heroTexture) => {
        updateCanvasSize(heroTexture);
      })
      .catch(() => {
        updateCanvasSize();
      });

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Draw background with trail effect
      ctx.globalCompositeOperation = "source-over";
      if (isDark) {
        ctx.fillStyle = "rgba(2, 13, 6, 0.15)";
      } else {
        ctx.fillStyle = "rgba(248, 250, 245, 0.15)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const progress = scrollProgressRef.current;
      const particles = particlesRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;
      const isHovering = isHoveringRef.current;
      const repulsionRadius = isHovering ? 300 : 180;
      
      // Fast transition - particles arrive quickly (~2 seconds)
      if (transitionProgressRef.current < 1) {
        transitionProgressRef.current = Math.min(1, transitionProgressRef.current + 0.01);
      }
      const isTransitioning = transitionProgressRef.current < 1;
      
      // Global time for oscillation effects
      const time = Date.now() * 0.001;
      
      // Particle composite mode
      ctx.globalCompositeOperation = isDark ? "screen" : "source-over";

      particles.forEach((particle, index) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Distance to home
        const homeDx = particle.homeX - particle.x;
        const homeDy = particle.homeY - particle.y;
        const homeDistance = Math.sqrt(homeDx * homeDx + homeDy * homeDy);
        // Particle is "arrived" when close enough to home
        const isNearHome = homeDistance < 20;

        // Mouse interaction
        if (distance < repulsionRadius && (!isTransitioning || isNearHome)) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          
          if (isHovering) {
            // Vortex / Swirl effect when hovering a project
            // Tangential force + slight attraction
            const swirlSpeed = 2.5;
            particle.vx += Math.cos(angle + Math.PI / 2) * force * swirlSpeed;
            particle.vy += Math.sin(angle + Math.PI / 2) * force * swirlSpeed;
            
            // Slight pull towards mouse to keep them in the vortex
            particle.vx -= Math.cos(angle) * force * 0.2;
            particle.vy -= Math.sin(angle) * force * 0.2;
          } else {
            // Normal repulsion
            particle.vx += Math.cos(angle) * force * 0.6;
            particle.vy += Math.sin(angle) * force * 0.6;
          }
        }

        // During transition: fast lerp to home, then immediately behave normally
        if (isTransitioning && !isNearHome) {
          // Strong lerp to get there fast
          particle.x += homeDx * 0.08;
          particle.y += homeDy * 0.08;
        } else {
          // Normal behavior - apply velocity
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        // Friction
        const baseFriction = 0.96 - (progress * 0.05);
        const friction = isHovering && distance < repulsionRadius ? 0.92 : baseFriction;
        particle.vx *= friction;
        particle.vy *= friction;
        
        // Random movement for organic floating feel
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Illumination - brighten particles near center of viewport
        let illumination = 1;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distToCenter = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2);
        const illuminationRadius = Math.min(canvas.width, canvas.height) * 0.4;
        
        if (distToCenter < illuminationRadius) {
          illumination = 1 + (1 - distToCenter / illuminationRadius) * 0.8;
        }

        // Dark mode: 0.8 opacity for glowing fireflies
        // Light mode: 0.2-0.3 opacity for subtle golden dust
        const baseOpacity = isDark ? 0.8 : 0.25;
        const opacity = particle.baseBrightness * baseOpacity * illumination;

        // Color shift when hovering project
        let particleColor = particle.color;
        if (isHovering && distance < repulsionRadius) {
          // Blend towards emerald (16, 185, 129)
          particleColor = "16, 185, 129";
        }

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 5
        );

        if (isDark) {
          // Bioluminescent fireflies - emerald/cyan glow
          gradient.addColorStop(0, `rgba(${particleColor}, ${opacity})`);
          gradient.addColorStop(0.4, `rgba(${particleColor}, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        } else {
          // Golden dust / pollen - use particle's assigned color (golden tan or soft wheat)
          gradient.addColorStop(0, `rgba(${particleColor}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        }

        // Draw particle
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 block touch-none pointer-events-none"
      style={{ filter: isDark ? "contrast(1.1)" : "none" }}
    />
  );
}