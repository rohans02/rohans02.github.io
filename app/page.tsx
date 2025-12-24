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
  const scrollArrowRef = useRef<HTMLDivElement>(null);
  const [proximityColor, setProximityColor] = useState("text-muted-foreground");

  const toggleTheme = () => setIsDark(!isDark);

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
    <main 
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: THEME.dark.background }}
    >
      {/* 
        LAYER 1: THE CIRCLE REVEAL (z-0)
        Targets the toggle button in top right 
      */}
      <motion.div
        initial={false}
        animate={{
          clipPath: isDark 
            ? "circle(0% at calc(100% - 48px) 48px)" 
            : "circle(150% at calc(100% - 48px) 48px)"
        }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        style={{ backgroundColor: THEME.light.background }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* LAYER 2: PARTICLES (z-1 inside component) */}
      <BioluminescentCanvas isDark={isDark} />

      {/* LAYER 3: UI CONTROLS (z-50) */}
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* LAYER 4: HERO CONTENT (z-10) */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="relative space-y-10 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-6">
            <motion.h1
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] transition-colors duration-700"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              {HERO_WORDS.map((word, idx) => (
                <motion.span key={idx} variants={wordVariants} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-light tracking-wide transition-colors duration-700 opacity-70"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
              variants={wordVariants}
            >
              Interactive Physics // Algorithmic Design.
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <motion.div variants={wordVariants} whileHover={{ scale: 1.05 }}>
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
            </motion.div>

            <motion.div variants={wordVariants} whileHover={{ scale: 1.05 }}>
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
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollArrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-500 ${proximityColor}`}>
            Scroll to discover
          </p>
          <div className={`w-px h-12 bg-linear-to-b from-current to-transparent transition-colors duration-500 ${proximityColor}`} />
        </motion.div>
      </section>
    </main>
  );
}