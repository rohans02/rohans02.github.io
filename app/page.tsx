"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BioluminescentCanvas } from "@/components/canvas/bioluminescent-canvas";
import { Button, ThemeToggle, LoadingScreen, FloatingDock } from "@/components/ui";
import { About } from "@/components/sections/about";
import { HERO_WORDS, THEME } from "@/config";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [rippleActive, setRippleActive] = useState(false);
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const [proximityColor, setProximityColor] = useState("text-muted-foreground");
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleTheme = () => {
    // Trigger ripple animation
    setRippleActive(true);
    // After ripple expands, change theme and reset
    setTimeout(() => {
      setIsDark(!isDark);
      setRippleActive(false);
    }, 800);
  };

  // Apply dark class to html element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // System theme synchronizer
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(darkModeQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    darkModeQuery.addEventListener("change", handler);
    return () => darkModeQuery.removeEventListener("change", handler);
  }, []);

  // Proximity effect for scroll indicator
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (scrollArrowRef.current) {
        const rect = scrollArrowRef.current.getBoundingClientRect();
        const dist = Math.sqrt(
          Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
          Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
        );
        // Use particle colors from theme
        const activeColor = isDark 
          ? `text-[rgb(${THEME.dark.particle.colors[0]})]` 
          : `text-[rgb(${THEME.light.particle.colors[0]})]`;
        setProximityColor(dist < 120 ? activeColor : "text-muted-foreground");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDark]);

  // Sync scroll for overlay
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setScrollProgress(Math.min(y / window.innerHeight, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LoadingScreen isDark={isDark} onLoadingComplete={() => setIsLoading(false)} />
      
      {!isLoading && <FloatingDock isDark={isDark} className="z-50" />}

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen w-full overflow-x-hidden"
      >
        {/* 
          CLIP-PATH THEME TRANSITION:
        - Base layer: Current theme (canvas + content)
        - Overlay layer: New theme (clipped, reveals as circle expands)
        Both layers exist simultaneously, clip-path reveals the new one
      */}

      {/* ========== CURRENT THEME LAYER (z-0 to z-10) ========== */}
      
      {/* Current theme particles */}
      <BioluminescentCanvas isDark={isDark} scrollProgress={scrollProgress} />
      
      {/* Current theme content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div 
          className="relative space-y-10 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
        >
          <div className="space-y-6">
            <motion.h1
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              {HERO_WORDS.map((word, idx) => (
                <motion.span 
                  key={idx} 
                  variants={wordVariants}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            {/* <motion.p
              variants={wordVariants}
              className="text-xl md:text-2xl font-light tracking-wide opacity-70"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              Interactive Physics // Algorithmic Design.
            </motion.p> */}
          </div>

          <motion.div 
            variants={wordVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-10"
          >
              <Button
                size="lg"
                className={`h-14 px-10 text-md font-medium backdrop-blur-xl border transition-all duration-300 ${
                  isDark
                    ? `bg-[rgb(${THEME.dark.particle.colors[0]})]/20 hover:bg-[rgb(${THEME.dark.particle.colors[0]})]/30 border-[rgb(${THEME.dark.particle.colors[0]})]/40 text-[${THEME.dark.foreground}] hover:shadow-[0_0_25px_rgba(${THEME.dark.particle.colors[0]},0.3)]`
                    : `bg-[rgb(${THEME.light.particle.colors[0]})]/20 hover:bg-[rgb(${THEME.light.particle.colors[0]})]/30 border-[rgb(${THEME.light.particle.colors[0]})]/40 text-[${THEME.light.foreground}] hover:shadow-[0_0_25px_rgba(${THEME.light.particle.colors[0]},0.3)]`
                }`}
              >
                Explore Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`h-14 px-10 text-md font-medium backdrop-blur-xl transition-all duration-300 ${
                  isDark
                    ? `bg-[rgb(${THEME.dark.particle.colors[1]})]/50 hover:bg-[rgb(${THEME.dark.particle.colors[1]})]/70 border-[rgb(${THEME.dark.particle.colors[1]})] text-[${THEME.dark.foreground}] hover:shadow-[0_0_20px_rgba(${THEME.dark.particle.colors[1]},0.4)]`
                    : `bg-[rgb(${THEME.light.particle.colors[1]})]/20 hover:bg-[rgb(${THEME.light.particle.colors[1]})]/30 border-[rgb(${THEME.light.particle.colors[1]})]/40 text-[${THEME.light.foreground}] hover:shadow-[0_0_20px_rgba(${THEME.light.particle.colors[1]},0.3)]`
                }`}
              >
                Get in Touch
              </Button>
            </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div
          ref={scrollArrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
        >
          <p className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-500 ${proximityColor}`}>
            Scroll to discover
          </p>
          <div className={`w-px h-12 bg-linear-to-b from-current to-transparent transition-colors duration-500 ${proximityColor}`} />
        </div>
      </section>

      <About isDark={isDark} />

      {/* ========== NEW THEME LAYER (clip-path overlay) ========== */}
      <motion.div
        className="fixed inset-0 z-15 pointer-events-none overflow-hidden"
        initial={{ clipPath: "circle(0% at calc(100% - 42px) 42px)" }}
        animate={{
          clipPath: rippleActive 
            ? "circle(150% at calc(100% - 42px) 42px)" 
            : "circle(0% at calc(100% - 42px) 42px)"
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* New theme background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: isDark ? THEME.light.background : THEME.dark.background }}
        />

        {!isLoading && <FloatingDock isDark={!isDark} className="z-10" animateEntrance={false} />}
        
        {/* New theme content (opposite colors) */}
        <div style={{ transform: `translateY(-${scrollY}px)` }}>
          <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <motion.div 
              className="relative space-y-10 max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate={isLoading ? "hidden" : "visible"}
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
                  style={{ color: isDark ? THEME.light.foreground : THEME.dark.foreground }}
                >
                  {HERO_WORDS.map((word, idx) => (
                    <motion.span 
                      key={idx} 
                      variants={wordVariants}
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                {/* <motion.p
                  variants={wordVariants}
                  className="text-xl md:text-2xl font-light tracking-wide opacity-70"
                  style={{ color: isDark ? THEME.light.foreground : THEME.dark.foreground }}
                >
                  Interactive Physics // Algorithmic Design.
                </motion.p> */}
              </div>

              <motion.div 
                variants={wordVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center pt-10"
              >
                <Button
                  size="lg"
                  className={`h-14 px-10 text-md font-medium backdrop-blur-xl border ${
                    isDark
                      ? `bg-[rgb(${THEME.light.particle.colors[0]})]/20 border-[rgb(${THEME.light.particle.colors[0]})]/40 text-[${THEME.light.foreground}]`
                      : `bg-[rgb(${THEME.dark.particle.colors[0]})]/20 border-[rgb(${THEME.dark.particle.colors[0]})]/40 text-[${THEME.dark.foreground}]`
                  }`}
                >
                  Explore Work
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`h-14 px-10 text-md font-medium backdrop-blur-xl ${
                    isDark
                      ? `bg-[rgb(${THEME.light.particle.colors[1]})]/20 border-[rgb(${THEME.light.particle.colors[1]})]/40 text-[${THEME.light.foreground}]`
                      : `bg-[rgb(${THEME.dark.particle.colors[1]})]/50 border-[rgb(${THEME.dark.particle.colors[1]})] text-[${THEME.dark.foreground}]`
                  }`}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator (new theme) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
              <p 
                className="text-[10px] font-mono uppercase tracking-[0.2em]"
                style={{ color: isDark ? THEME.light.muted : THEME.dark.muted }}
              >
                Scroll to discover
              </p>
              <div 
                className="w-px h-12"
                style={{ background: `linear-gradient(to bottom, ${isDark ? THEME.light.muted : THEME.dark.muted}, transparent)` }}
              />
            </div>
          </section>

          <About isDark={!isDark} />
        </div>
      </motion.div>

      {/* Theme Toggle (always on top) */}
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </motion.main>
    </>
  );
}
