"use client";

import { useEffect, useRef } from "react";
import { Particle, BioluminescentCanvasProps } from "@/lib/types";
import { THEME } from "@/config/theme";

export function BioluminescentCanvas({ isDark }: BioluminescentCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | null>(null);
  const textBoundingBoxRef = useRef<DOMRect | null>(null);
  const imageLoadedRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const getParticleCount = () => {
      if (typeof window === "undefined") return 150;
      return window.innerWidth < 768 ? 80 : 750;
    };

    const loadTexture = () => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = "/textures/spider-web.jpeg";
        img.crossOrigin = "anonymous";
        img.onload = () => {
          imageLoadedRef.current = img;
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const initializeParticles = (img?: HTMLImageElement) => {
      const texture = img || imageLoadedRef.current;
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

          const brightPixels: { x: number; y: number }[] = [];
          const step = 4;
          for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
              const index = (y * canvas.width + x) * 4;
              const r = imageData[index];
              const g = imageData[index + 1];
              const b = imageData[index + 2];
              const brightness = (r + g + b) / 3;

              if (brightness < 150) {
                brightPixels.push({ x, y });
              }
            }
          }

          if (brightPixels.length > 0) {
            particlesRef.current = Array.from({ length: count }, () => {
              const pixel = brightPixels[Math.floor(Math.random() * brightPixels.length)];
              return {
                x: pixel.x + (Math.random() - 0.5) * step,
                y: pixel.y + (Math.random() - 0.5) * step,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 1.8 + 1.0,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseBrightness: Math.random() * 0.4 + 0.6,
              };
            });
            return;
          }
        }
      }

      // Fallback to random if image fails or no bright pixels found
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.8 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseBrightness: Math.random() * 0.4 + 0.6,
      }));
    };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
    };

    // Initial setup
    loadTexture()
      .then(() => {
        updateCanvasSize();
      })
      .catch(() => {
        updateCanvasSize();
      });

    window.addEventListener("resize", updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const updateTextBoundingBox = () => {
      const h1 = document.querySelector("h1");
      if (h1) textBoundingBoxRef.current = h1.getBoundingClientRect();
    };
    updateTextBoundingBox();

    const animate = () => {
      // Clear with theme background
      ctx.globalCompositeOperation = "source-over";
      if (isDark) {
        ctx.fillStyle = "rgba(2, 13, 6, 0.15)";
      } else {
        ctx.fillStyle = "rgba(248, 250, 245, 0.15)";
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set composite operation for particles
      // Dark: "screen" makes bioluminescent fireflies pop
      // Light: "source-over" for subtle golden dust
      ctx.globalCompositeOperation = isDark ? "screen" : "source-over";

      const particles = particlesRef.current;
      const { x: mouseX, y: mouseY } = mouseRef.current;
      const repulsionRadius = 180;

      particles.forEach((particle) => {
        const dx = particle.x - mouseX;
        const dy = particle.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.6;
          particle.vy += Math.sin(angle) * force * 0.6;
        }

        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        let illumination = 1;
        if (textBoundingBoxRef.current) {
          const box = textBoundingBoxRef.current;
          if (
            particle.x > box.left - 50 &&
            particle.x < box.right + 50 &&
            particle.y > box.top - 50 &&
            particle.y < box.bottom + 50
          ) {
            illumination = 1.8;
          }
        }

        // Dark mode: 0.8 opacity for glowing fireflies
        // Light mode: 0.2-0.3 opacity for subtle golden dust
        const baseOpacity = isDark ? 0.8 : 0.25;
        const opacity = particle.baseBrightness * baseOpacity * illumination;

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
          gradient.addColorStop(0, `rgba(${particle.color}, ${opacity})`);
          gradient.addColorStop(0.4, `rgba(${particle.color}, ${opacity * 0.4})`);
          gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
        } else {
          // Golden dust / pollen - use particle's assigned color (golden tan or soft wheat)
          gradient.addColorStop(0, `rgba(${particle.color}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
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