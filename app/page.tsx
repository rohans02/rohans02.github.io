"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BioluminescentCanvas } from "@/components/canvas/bioluminescent-canvas";
import { Button, ThemeToggle } from "@/components/ui";
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
  const [isDark, setIsDark] = useState(true);
  const [rippleActive, setRippleActive] = useState(false);
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const [proximityColor, setProximityColor] = useState("text-muted-foreground");

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
        // Use particle colors: dark = Electric Blue, light = Golden Tan
        const activeColor = isDark ? "text-[rgb(3,25,226)]" : "text-[rgb(181,164,139)]";
        setProximityColor(dist < 120 ? activeColor : "text-muted-foreground");
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDark]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 
        CLIP-PATH THEME TRANSITION:
        - Base layer: Current theme (canvas + content)
        - Overlay layer: New theme (clipped, reveals as circle expands)
        Both layers exist simultaneously, clip-path reveals the new one
      */}

      {/* ========== CURRENT THEME LAYER (z-0 to z-10) ========== */}
      
      {/* Current theme particles */}
      <BioluminescentCanvas isDark={isDark} />
      
      {/* Current theme content */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="relative space-y-10 max-w-4xl">
          <div className="space-y-6">
            <h1
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              {HERO_WORDS.map((word, idx) => (
                <span key={idx} className="inline-block mr-3">{word}</span>
              ))}
            </h1>
            <p
              className="text-xl md:text-2xl font-light tracking-wide opacity-70"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              Interactive Physics // Algorithmic Design.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <Button
              size="lg"
              className={`h-14 px-10 text-md font-medium backdrop-blur-xl border transition-all duration-300 ${
                isDark
                  ? "bg-[rgb(3,25,226)]/20 hover:bg-[rgb(3,25,226)]/30 border-[rgb(3,25,226)]/40 text-[#ECFDF5] hover:shadow-[0_0_25px_rgba(3,25,226,0.3)]"
                  : "bg-[rgb(181,164,139)]/20 hover:bg-[rgb(181,164,139)]/30 border-[rgb(181,164,139)]/40 text-[#1A2F1A] hover:shadow-[0_0_25px_rgba(181,164,139,0.3)]"
              }`}
            >
              Explore Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`h-14 px-10 text-md font-medium backdrop-blur-xl transition-all duration-300 ${
                isDark
                  ? "bg-[rgb(0,8,74)]/50 hover:bg-[rgb(0,8,74)]/70 border-[rgb(0,8,74)] text-[#ECFDF5] hover:shadow-[0_0_20px_rgba(0,8,74,0.4)]"
                  : "bg-[rgb(210,190,160)]/20 hover:bg-[rgb(210,190,160)]/30 border-[rgb(210,190,160)]/40 text-[#1A2F1A] hover:shadow-[0_0_20px_rgba(210,190,160,0.3)]"
              }`}
            >
              Get in Touch
            </Button>
          </div>
        </div>

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
        
        {/* New theme content (opposite colors) */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="relative space-y-10 max-w-4xl">
            <div className="space-y-6">
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
                style={{ color: isDark ? THEME.light.foreground : THEME.dark.foreground }}
              >
                {HERO_WORDS.map((word, idx) => (
                  <span key={idx} className="inline-block mr-3">{word}</span>
                ))}
              </h1>
              <p
                className="text-xl md:text-2xl font-light tracking-wide opacity-70"
                style={{ color: isDark ? THEME.light.foreground : THEME.dark.foreground }}
              >
                Interactive Physics // Algorithmic Design.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
              <Button
                size="lg"
                className={`h-14 px-10 text-md font-medium backdrop-blur-xl border ${
                  isDark
                    ? "bg-[rgb(181,164,139)]/20 border-[rgb(181,164,139)]/40 text-[#1A2F1A]"
                    : "bg-[rgb(3,25,226)]/20 border-[rgb(3,25,226)]/40 text-[#ECFDF5]"
                }`}
              >
                Explore Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`h-14 px-10 text-md font-medium backdrop-blur-xl ${
                  isDark
                    ? "bg-[rgb(210,190,160)]/20 border-[rgb(210,190,160)]/40 text-[#1A2F1A]"
                    : "bg-[rgb(0,8,74)]/50 border-[rgb(0,8,74)] text-[#ECFDF5]"
                }`}
              >
                Get in Touch
              </Button>
            </div>
          </div>

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
      </motion.div>

      {/* Theme Toggle (always on top) */}
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
    </main>
  );
}