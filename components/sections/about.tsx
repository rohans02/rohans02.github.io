"use client";

import { motion } from "framer-motion";
import { THEME } from "@/config";
import { Cpu, GraduationCap, Compass, Code2, MapPin, Quote } from "lucide-react";

interface AboutProps {
  isDark: boolean;
}

const BentoBox = ({ 
  children, 
  className = "", 
  isDark,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  isDark: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={`relative group overflow-hidden rounded-3xl border backdrop-blur-md p-8 ${className}`}
    style={{ 
      backgroundColor: isDark ? "rgba(2, 13, 6, 0.4)" : "rgba(248, 250, 245, 0.4)",
      borderColor: isDark ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.2)"
    }}
  >
    {/* Glow effect on hover/view */}
    <motion.div 
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        background: isDark 
          ? `radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)`
          : `radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)`
      }}
    />
    
    {/* Border glow animation */}
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{
        border: `1px solid ${isDark ? "rgba(16, 185, 129, 0.4)" : "rgba(16, 185, 129, 0.3)"}`,
        borderRadius: "inherit"
      }}
    />

    <div className="relative z-10 h-full flex flex-col">
      {children}
    </div>
  </motion.div>
);

export function About({ isDark }: AboutProps) {
  const emerald = isDark ? "rgb(16, 185, 129)" : "rgb(5, 150, 105)";

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 overflow-hidden">
      {/* Subtle Vignette for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? `radial-gradient(circle at center, transparent 0%, rgba(2, 13, 6, 0.4) 100%)`
            : `radial-gradient(circle at center, transparent 0%, rgba(248, 250, 245, 0.4) 100%)`
        }}
      />

      <div className="max-w-6xl w-full space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
          >
            The Descent
          </h2>
          <div 
            className="h-1.5 w-32 rounded-full"
            style={{ backgroundColor: emerald }}
          />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Left: Photo (Large Square) */}
          <BentoBox isDark={isDark} className="md:row-span-2 flex items-center justify-center min-h-100">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-muted/20">
              {/* Placeholder for Photo */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                  alt="Profile"
                  className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${isDark ? "opacity-60 mix-blend-luminosity" : "opacity-80"}`}
                />
                {isDark && <div className="absolute inset-0 bg-emerald-900/20 mix-blend-color" />}
              </div>
            </div>
          </BentoBox>

          {/* Top Right: Mission Statement (Wide) */}
          <BentoBox isDark={isDark} className="md:col-span-2 flex flex-col justify-center" delay={0.1}>
            <Quote className="w-10 h-10 mb-6 opacity-20" style={{ color: emerald }} />
            <h3 
              className="text-3xl md:text-5xl font-medium tracking-tight leading-tight"
              style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
            >
              "I build software that <span style={{ color: emerald }}>breathes</span>."
            </h3>
          </BentoBox>

          {/* Middle: The Architect */}
          <BentoBox isDark={isDark} delay={0.2}>
            <Cpu className="w-8 h-8 mb-4" style={{ color: emerald }} />
            <h4 className="text-xl font-bold mb-3" style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}>The Architect</h4>
            <p className="text-sm md:text-base font-light opacity-70 leading-relaxed" style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}>
              I specialize in building scalable backend systems and interactive frontend experiences. My focus is on the intersection of performance and clean code.
            </p>
          </BentoBox>

          {/* Right: The Student */}
          <BentoBox isDark={isDark} delay={0.3}>
            <GraduationCap className="w-8 h-8 mb-4" style={{ color: emerald }} />
            <h4 className="text-xl font-bold mb-3" style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}>The Student</h4>
            <p className="text-sm md:text-base font-light opacity-70 leading-relaxed" style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}>
              Currently a CS Major, I treat every project as an experiment in efficiency. I don't just write code; I study systems.
            </p>
          </BentoBox>

        </div>
      </div>
    </section>
  );
}
