"use client";

import { motion, AnimatePresence } from "framer-motion";
import { THEME } from "@/config";
import { useEffect, useState, useMemo, useCallback } from "react";
import "./loading.css";

interface LoadingScreenProps {
  isDark: boolean;
  onLoadingComplete?: () => void;
}

// Generate particles once to avoid re-renders causing new random values
interface Particle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export function LoadingScreen({ isDark, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [texturePositions, setTexturePositions] = useState<{x: number, y: number}[]>([]);

  // Particle configuration - reduced for performance
  const PARTICLE_COUNT = 100;

  // Load the same texture used by the canvas and extract positions
  useEffect(() => {
    const loadTexturePositions = async () => {
      try {
        const img = new Image();
        img.src = "/textures/spider-web.jpeg";
        img.crossOrigin = "anonymous";
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Create offscreen canvas to sample the texture
        const offscreen = document.createElement("canvas");
        const ctx = offscreen.getContext("2d");
        if (!ctx) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        offscreen.width = width;
        offscreen.height = height;

        // Draw texture to fit viewport (same logic as bioluminescent canvas)
        const iRatio = img.width / img.height;
        const cRatio = width / height;
        let drawW, drawH, drawX, drawY;
        
        if (cRatio > iRatio) {
          drawW = width;
          drawH = width / iRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * iRatio;
          drawY = 0;
          drawX = (width - drawW) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
        const imageData = ctx.getImageData(0, 0, width, height).data;

        // Sample bright/dark pixels (matching the canvas logic)
        const positions: {x: number, y: number}[] = [];
        const step = 8; // Sample every 8 pixels for performance
        
        for (let y = 0; y < height; y += step) {
          for (let x = 0; x < width; x += step) {
            const index = (y * width + x) * 4;
            const r = imageData[index];
            const g = imageData[index + 1];
            const b = imageData[index + 2];
            const brightness = (r + g + b) / 3;

            // Match the canvas threshold - dark areas of the texture
            if (brightness < 150) {
              positions.push({ x, y });
            }
          }
        }

        // Shuffle and limit positions
        const shuffled = positions.sort(() => Math.random() - 0.5);
        setTexturePositions(shuffled.slice(0, PARTICLE_COUNT * 2));
      } catch (error) {
        // Fallback to random edge positions if texture fails
        const fallbackPositions = [...Array(PARTICLE_COUNT * 2)].map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }));
        setTexturePositions(fallbackPositions);
      }
    };

    loadTexturePositions();
  }, []);

  // Track window dimensions for SSR safety
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate particles with endpoints based on texture positions
  const particles = useMemo<Particle[]>(() => {
    if (!isMounted) return []; // Return empty on server
    
    // Use the same colors as the bioluminescent canvas from THEME
    const colors = isDark 
      ? THEME.dark.particle.colors.map(c => `rgb(${c})`)   // Electric Blue, Deep Navy
      : THEME.light.particle.colors.map(c => `rgb(${c})`); // Golden Tan, Soft Wheat
    
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    return [...Array(PARTICLE_COUNT)].map((_, i) => {
      // Start position: clustered around center (ghost location)
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 80; // Start within 80px of center
      const startX = centerX + Math.cos(angle) * radius;
      const startY = centerY + Math.sin(angle) * radius;
      
      // End position: from texture or fallback to radial burst
      let endX, endY;
      if (texturePositions.length > 0) {
        const pos = texturePositions[i % texturePositions.length];
        endX = pos.x;
        endY = pos.y;
      } else {
        // Fallback: burst outward radially
        const burstAngle = (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.5;
        const burstRadius = 200 + Math.random() * 600;
        endX = centerX + Math.cos(burstAngle) * burstRadius;
        endY = centerY + Math.sin(burstAngle) * burstRadius;
      }
      
      // Calculate distance for duration (farther = longer)
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const maxDistance = Math.sqrt(Math.pow(dimensions.width, 2) + Math.pow(dimensions.height, 2));
      const normalizedDist = distance / maxDistance;
      
      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.4, // Staggered start
        duration: 1.2 + normalizedDist * 1.5, // 1.2s to 2.7s based on distance
      };
    });
  }, [texturePositions, isDark, isMounted, dimensions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Start exit animation
          setTimeout(() => {
            setIsExiting(true);
          }, 400);
          // Then hide and complete
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 2000); // Allow time for particles to reach destinations
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const theme = isDark ? THEME.dark : THEME.light;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, delay: 1.5 } }}
          className="fixed inset-0 z-100 overflow-hidden"
          style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
          {/* Background that fades to transparent */}
          <motion.div
            className="absolute inset-0 bg-black"
            animate={{ 
              opacity: isExiting ? 0 : 1,
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Floating Particles - burst from center to texture positions */}
          {isExiting && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full will-change-transform"
              style={{
                left: 0,
                top: 0,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size}px ${particle.color}`,
              }}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: particle.startX,
                y: particle.startY,
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0.3],
                x: particle.endX,
                y: particle.endY,
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* White smoke trails following particles */}
          {isExiting && particles.slice(0, 25).map((particle) => (
            <motion.div
              key={`smoke-${particle.id}`}
              className="absolute rounded-full will-change-transform"
              style={{
                left: 0,
                top: 0,
                width: particle.size * 3,
                height: particle.size * 3,
                background: `radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(200,200,200,0.3) 40%, transparent 70%)`,
                filter: 'blur(4px)',
              }}
              initial={{ 
                opacity: 0,
                x: particle.startX - particle.size,
                y: particle.startY - particle.size,
              }}
              animate={{ 
                opacity: [0, 0.5, 0.3, 0],
                x: particle.endX - particle.size,
                y: particle.endY - particle.size,
              }}
              transition={{
                duration: particle.duration * 1.2,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 0.9 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="relative w-full h-full flex flex-col items-center justify-center will-change-transform"
          >
            <div className="relative flex flex-col items-center space-y-12">
              {/* Ghost Container with "Breathe" and "Holographic" effects */}
              <motion.div 
                id="ghost"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.9, 1, 0.85, 1, 0.95, 1],
                }}
                transition={{ 
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  opacity: {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }
                }}
                className="relative"
              >
                {/* Scanline Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-10">
                  <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px]" />
                </div>

                <div id="red">
                  <div id="pupil"></div>
                  <div id="pupil1"></div>
                  <div id="eye"></div>
                  <div id="eye1"></div>
                  <div id="top0"></div>
                  <div id="top1"></div>
                  <div id="top2"></div>
                  <div id="top3"></div>
                  <div id="top4"></div>
                  <div id="st0"></div>
                  <div id="st1"></div>
                  <div id="st2"></div>
                  <div id="st3"></div>
                  <div id="st4"></div>
                  <div id="st5"></div>
                  <div id="an1"></div>
                  <div id="an2"></div>
                  <div id="an3"></div>
                  <div id="an4"></div>
                  <div id="an5"></div>
                  <div id="an6"></div>
                  <div id="an7"></div>
                  <div id="an8"></div>
                  <div id="an9"></div>
                  <div id="an10"></div>
                  <div id="an11"></div>
                  <div id="an12"></div>
                  <div id="an13"></div>
                  <div id="an14"></div>
                  <div id="an15"></div>
                  <div id="an16"></div>
                  <div id="an17"></div>
                  <div id="an18"></div>
                </div>
                <div id="shadow"></div>
              </motion.div>

              {/* Progress Bar Container */}
              <div className="w-48 h-0.5 bg-muted/20 overflow-hidden rounded-full">
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: `#0c8aff` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Single Status Line */}
              <div className="h-6 flex items-center justify-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-mono uppercase tracking-[0.2em] text-white/60"
                >
                  {progress < 100 ? "> initializing..." : "> system_ready"}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
