import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/config/constants";
import { cn } from "@/lib/utils";
import { Terminal, Briefcase, Calendar, Cpu, Hexagon } from "lucide-react";

interface ExperienceProps {
  isDark: boolean;
}

export function Experience({ isDark }: ExperienceProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section 
      data-section="experience" 
      className="relative z-10 min-h-screen py-32 px-4 overflow-hidden bg-transparent"
    >
      {/* Background Grid System */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Technical Header */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-sm overflow-hidden mb-20",
            isDark ? "border-white/5 bg-black/20" : "border-zinc-200 bg-zinc-50/50"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-[0.15em]",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              ~/src/experience/
            </span>
          </div>
          <div className={cn(
            "flex-1 h-px bg-linear-to-r to-transparent",
            isDark ? "from-emerald-500/20 via-emerald-500/10" : "from-emerald-500/10 via-emerald-500/5"
          )} />
          <span className={cn(
            "text-[9px] font-mono uppercase tracking-widest",
            isDark ? "text-emerald-400/60" : "text-emerald-600/60"
          )}>
            cat career_architecture.log
          </span>
        </motion.div>

        {/* The Schematic Bus */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: The Main Data Bus (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 overflow-hidden pointer-events-none">
              <div className={cn(
                "absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2",
                isDark ? "bg-white/10" : "bg-zinc-200"
              )}>
                {/* Flowing Data Stream */}
                <motion.div 
                  className="absolute top-0 left-0 w-full bg-linear-to-b from-transparent via-emerald-500 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                  style={{ height: '200px' }}
                  animate={{ 
                    top: ["-200px", "100%"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Experience Modules */}
          <div className="lg:col-span-11 space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceModule 
                key={exp.id}
                experience={exp}
                index={index}
                isDark={isDark}
                isHovered={hoveredId === exp.id}
                isAnyHovered={hoveredId !== null}
                onHover={() => {
                  setHoveredId(exp.id);
                }}
                onLeave={() => {
                  setHoveredId(null);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceModule({ 
  experience, 
  index, 
  isDark, 
  isHovered,
  isAnyHovered,
  onHover,
  onLeave 
}: { 
  experience: typeof EXPERIENCES[0]; 
  index: number;
  isDark: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const moduleRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={moduleRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative group transition-opacity duration-500 interactive",
        isAnyHovered && !isHovered ? "opacity-40" : "opacity-100"
      )}
    >
      {/* Connection Trace (Desktop) */}
      <div className={cn(
        "hidden lg:block absolute -left-12 top-12 w-12 h-px transition-colors duration-500",
        isHovered ? "bg-emerald-500" : "bg-emerald-500/20"
      )} />

      {/* Timeline Node - Hexagon */}
      <div className="hidden lg:flex absolute -left-[3.45rem] top-10 z-30 items-center justify-center">
        <motion.div
          animate={{ 
            rotate: isHovered ? 90 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          className={cn(
            "transition-colors duration-500",
            isHovered ? "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "text-zinc-500/40"
          )}
        >
          <Hexagon size={16} fill={isHovered ? "currentColor" : "transparent"} />
        </motion.div>
      </div>
      
      <div className={cn(
        "relative overflow-hidden rounded-sm border transition-all duration-500 interactive",
        isDark 
          ? "bg-zinc-950/40 border-white/5 hover:border-emerald-500/40" 
          : "bg-white border-zinc-200 hover:border-emerald-500/40",
        isHovered ? "translate-x-2" : ""
      )}>
        {/* Module Header */}
        <div className={cn(
          "flex items-center justify-between px-6 py-3 border-b transition-colors",
          isDark ? "border-white/5 bg-white/5" : "border-zinc-100 bg-zinc-50",
          isHovered && "border-emerald-500/20 bg-emerald-500/5"
        )}>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-emerald-500/60">
              MOD_0{index + 1}
            </span>
            <div className={cn(
              "w-1 h-1 rounded-full transition-colors duration-500",
              isHovered ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" : "bg-zinc-500/40"
            )} />
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-widest",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              {experience.period}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              experience.status === 'active' ? "bg-emerald-500 animate-pulse" : "bg-zinc-500/30"
            )} />
            <span className="text-[9px] font-mono uppercase text-zinc-500">
              {experience.status}
            </span>
          </div>
        </div>

        {/* Module Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Role & Company */}
          <div className="md:col-span-4 space-y-2">
            <h3 className={cn(
              "text-2xl font-bold tracking-tight",
              isDark ? "text-white" : "text-zinc-900"
            )}>
              {experience.role}
            </h3>
            <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              <Briefcase className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] font-mono text-emerald-500 uppercase tracking-wider">
                {experience.company}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-emerald-500/40">"description":</span>
            </div>
            <div className="relative pl-4 border-l border-emerald-500/10">
              <span className="absolute -left-1 top-0 text-emerald-500/40 font-mono text-xs">"</span>
              <p className={cn(
                "text-sm leading-relaxed font-light",
                isDark ? "text-zinc-400" : "text-zinc-600"
              )}>
                {experience.description}
              </p>
              <span className="absolute -right-1 bottom-0 text-emerald-500/40 font-mono text-xs">"</span>
            </div>
          </div>

          {/* Tech Stack / Sub-modules */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-3 h-3 text-zinc-500" />
              <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-widest">
                Dependencies
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {experience.stack.map((tech) => (
                <div 
                  key={tech}
                  className={cn(
                    "px-2 py-1 text-[9px] font-mono border transition-all duration-300",
                    isDark 
                      ? "bg-black/40 border-white/5 text-zinc-600" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-400",
                    isHovered && "text-emerald-500 border-emerald-500/30 bg-emerald-500/5"
                  )}
                >
                  "{tech}"
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Progress Bar (Visual only) */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-500/10">
          <motion.div 
            className="h-full bg-emerald-500/40"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        </div>
      </div>

      {/* Background Glow */}
      <div className={cn(
        "absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-full opacity-0 transition-opacity duration-500 pointer-events-none",
        isHovered && "opacity-100"
      )} />
    </motion.div>
  );
}
