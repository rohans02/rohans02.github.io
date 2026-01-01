"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BioluminescentCanvas } from "@/components/canvas/bioluminescent-canvas";
import { Button, ThemeToggle, LoadingScreen, FloatingDock } from "@/components/ui";
import { About, Projects } from "@/components/sections";
import { HERO_WORDS, THEME } from "@/config";
import { cn } from "@/lib/utils";

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
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'projects' | 'contact'>('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringProject, setIsHoveringProject] = useState(false);

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

  // Hide scrollbar during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

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
      setMousePos({ x: e.clientX, y: e.clientY });
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

  // Intersection Observer to detect active section
  useEffect(() => {
    if (isLoading) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          if (id) {
            setActiveSection(id as 'hero' | 'about' | 'projects' | 'contact');
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

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
      <BioluminescentCanvas 
        isDark={isDark} 
        scrollProgress={scrollProgress} 
        activeSection={activeSection} 
        isHoveringProject={isHoveringProject}
      />
      
      {/* Global Blueprint Navigation Overlay */}
      {!isLoading && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Geometric Framing - Corner Brackets */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={cn("absolute top-12 left-12 w-24 h-24 border-t border-l transition-colors duration-500", isDark ? "border-white/10" : "border-black/10")} />
            <div className={cn("absolute top-12 right-12 w-24 h-24 border-t border-r transition-colors duration-500", isDark ? "border-white/10" : "border-black/10")} />
            <div className={cn("absolute bottom-12 left-12 w-24 h-24 border-b border-l transition-colors duration-500", isDark ? "border-white/10" : "border-black/10")} />
            <div className={cn("absolute bottom-12 right-12 w-24 h-24 border-b border-r transition-colors duration-500", isDark ? "border-white/10" : "border-black/10")} />
          </div>

          {/* Real-time Blueprint Data - Top */}
          <div className="absolute top-0 left-0 w-full px-20 py-16 flex justify-between items-start">
            <div className="flex flex-col gap-8">
              {/* <div className="flex flex-col gap-1">
                <span className={cn("text-[10px] font-mono uppercase tracking-[0.3em]", isDark ? "text-emerald-500/60" : "text-emerald-600/60")}>
                  Coordinate_Tracker
                </span>
                <div className="flex gap-4">
                  <span className={cn("text-[9px] font-mono uppercase tracking-widest", isDark ? "text-white/30" : "text-black/30")}>
                    X: {mousePos.x.toString().padStart(4, '0')}
                  </span>
                  <span className={cn("text-[9px] font-mono uppercase tracking-widest", isDark ? "text-white/30" : "text-black/30")}>
                    Y: {mousePos.y.toString().padStart(4, '0')}
                  </span>
                </div>
              </div> */}

              <div className="flex flex-col gap-2">
                <span className={cn("text-[10px] font-mono uppercase tracking-[0.3em]", isDark ? "text-white/40" : "text-black/40")}>
                  Section_Indexer
                </span>
                <div className="flex flex-col items-start gap-1">
                  {['hero', 'about', 'projects'].map((section) => (
                    <div key={section} className="flex items-center gap-2">
                      <div className={cn(
                        "w-1 h-1 rounded-full transition-all duration-300",
                        activeSection === section 
                          ? "bg-emerald-500 scale-125" 
                          : (isDark ? "bg-white/10" : "bg-black/10")
                      )} />
                      <span className={cn(
                        "text-[8px] font-mono uppercase tracking-widest transition-colors duration-300",
                        activeSection === section 
                          ? (isDark ? "text-emerald-500" : "text-emerald-600")
                          : (isDark ? "text-white/10" : "text-black/10")
                      )}>
                        {section}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-8 pointer-events-auto">
              {/* <div className="flex flex-col items-end gap-1">
                <span className={cn("text-[10px] font-mono uppercase tracking-[0.3em]", isDark ? "text-emerald-500/60" : "text-emerald-600/60")}>
                  System_Telemetry
                </span>
                <div className="flex gap-4">
                  <span className={cn("text-[9px] font-mono uppercase tracking-widest", isDark ? "text-white/30" : "text-black/30")}>
                    Scroll: {Math.round(scrollProgress * 100)}%
                  </span>
                  <span className={cn("text-[9px] font-mono uppercase tracking-widest", isDark ? "text-white/30" : "text-black/30")}>
                    Status: ACTIVE
                  </span>
                </div>
              </div> */}

              <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="relative" />
            </div>
          </div>

          {/* Side Blueprint Lines */}
          {/* <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <span className={cn("text-[8px] font-mono uppercase vertical-text tracking-[0.8em]", isDark ? "text-white/10" : "text-black/10")}>
                Blueprint_v1.0
              </span>
              <div className={cn("w-px h-32 mx-auto", isDark ? "bg-white/5" : "bg-black/5")} />
            </div>
          </div> */}
        </div>
      )}
      
      {/* Current theme content */}
      <section data-section="hero" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div 
          className="relative space-y-8 max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
        >
          <div className="space-y-4">
            <motion.h1
              className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.85] flex flex-col"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              <motion.span variants={wordVariants} className="block">ENGINEERING</motion.span>
              <motion.span variants={wordVariants} className="block text-emerald-500">ECOSYSTEMS</motion.span>
            </motion.h1>
            
            <motion.p
              variants={wordVariants}
              className={cn(
                "text-sm md:text-base font-mono tracking-[0.3em] uppercase max-w-2xl mx-auto pt-6",
                isDark ? "text-white/30" : "text-black/30"
              )}
            >
              Rooted in Logic // Driven by Light.
            </motion.p>
          </div>

          <motion.div 
            variants={wordVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-12"
          >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className={cn(
                    "h-12 px-10 text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-500",
                    isDark
                      ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-[0_0_30px_rgba(5,150,105,0.1)]"
                  )}
                >
                  Initialize_System
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "h-12 px-10 text-[10px] font-mono uppercase tracking-[0.3em] backdrop-blur-md transition-all duration-500",
                    isDark
                      ? "border-white/10 text-white/40 hover:text-white hover:bg-white/5"
                      : "border-black/10 text-black/40 hover:text-black hover:bg-black/5"
                  )}
                >
                  View_Specs
                </Button>
              </motion.div>
            </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div
          ref={scrollArrowRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer animate-bounce"
        >
          <p className={cn("text-[9px] font-mono uppercase tracking-[0.4em] transition-colors duration-500", proximityColor)}>
            Explore_Matrix
          </p>
          <div className={cn("w-px h-12 bg-linear-to-b from-current to-transparent transition-colors duration-500", proximityColor)} />
        </div>
      </section>

      <About isDark={isDark} />
      <Projects isDark={isDark} onHoverChange={setIsHoveringProject} />

      {/* ========== THEME TRANSITION OVERLAY (color wipe only) ========== */}
      <motion.div
        className="fixed inset-0 z-60 pointer-events-none"
        initial={{ clipPath: "circle(0% at calc(100% - 102px) 148px)" }}
        animate={{
          clipPath: rippleActive 
            ? "circle(150% at calc(100% - 102px) 148px)" 
            : "circle(0% at calc(100% - 102px) 148px)"
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          backgroundColor: isDark ? THEME.light.background : THEME.dark.background 
        }}
      />
    </motion.main>
    </>
  );
}
