"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/config/constants";
import { Project } from "@/lib/types";
import { 
  ExternalLink, 
  Github, 
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui";

interface ProjectsProps {
  isDark: boolean;
}

export function Projects({ isDark }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      data-section="projects" 
      className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Background Grid System */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Background Atmosphere */}
      <div 
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-250 blur-[160px] rounded-full pointer-events-none opacity-20 transition-all duration-700",
          hoveredIndex !== null ? "max-w-7xl" : "max-w-6xl"
        )}
        style={{ 
          background: isDark 
            ? `radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)`
            : `radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)`
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        {/* Technical Header */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-sm overflow-hidden mb-12 w-full max-w-6xl",
            isDark ? "border-white/5 bg-black/20" : "border-zinc-200 bg-zinc-50/50"
          )}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-[0.15em]",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              ~/src/projects/
            </span>
          </motion.div>
          <div className={cn(
            "flex-1 h-px bg-linear-to-r to-transparent",
            isDark ? "from-emerald-500/20 via-emerald-500/10" : "from-emerald-500/10 via-emerald-500/5"
          )} />
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={cn(
              "text-[9px] font-mono uppercase tracking-widest",
              isDark ? "text-emerald-400/60" : "text-emerald-600/60"
            )}
          >
            ls -la selected_works
          </motion.span>
        </motion.div>

        <div className={cn(
          "w-full transition-all duration-700 ease-in-out h-[80vh] md:h-[60vh] min-h-[500px] max-h-[700px] flex flex-col md:flex-row gap-4",
          hoveredIndex !== null ? "max-w-7xl" : "max-w-6xl"
        )}>
          {PROJECTS.map((project, index) => (
            <BentoCard 
              key={project.id} 
              project={project} 
              index={index} 
              isDark={isDark}
              isHovered={hoveredIndex === index}
              isAnyHovered={hoveredIndex !== null}
              onHover={() => {
                setHoveredIndex(index);
              }}
              onLeave={() => {
                setHoveredIndex(null);
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function BentoCard({ 
  project, 
  index, 
  isDark, 
  isHovered,
  isAnyHovered,
  onHover,
  onLeave
}: { 
  project: Project, 
  index: number, 
  isDark: boolean, 
  isHovered: boolean,
  isAnyHovered: boolean,
  onHover: () => void,
  onLeave: () => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [project.image];
  const isShrunken = isAnyHovered && !isHovered;

  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        layout: { type: "spring", stiffness: 300, damping: 30 }
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative rounded-[2rem] border overflow-hidden cursor-pointer transition-all duration-500 interactive backdrop-blur-xl",
        isHovered ? "flex-[5]" : isAnyHovered ? "flex-[0.3]" : "flex-1"
      )}
      style={{ 
        backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
        borderColor: isHovered 
          ? (isDark ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.3)')
          : (isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)')
      }}
    >
      {/* Glitch Overlay on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-emerald-500/5 pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 animate-pulse bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(16,185,129,0.1)_1px,rgba(16,185,129,0.1)_2px)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Image / Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            alt={project.title} 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : isShrunken ? 0.05 : 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
          />
        </AnimatePresence>
        <div className={cn(
          "absolute inset-0 bg-linear-to-t transition-all duration-500",
          isDark ? "from-black/90 via-black/20 to-transparent" : "from-white/90 via-white/20 to-transparent",
          isHovered ? "opacity-100" : isShrunken ? "opacity-0" : "opacity-80"
        )} />
      </div>

      {/* Content */}
      <div className={cn(
        "relative z-10 h-full flex flex-col transition-all duration-500",
        isHovered ? "p-8" : "p-6",
        isShrunken ? "items-center justify-center" : "justify-between"
      )}>
        <div className={cn(
          "flex justify-between items-start w-full transition-all duration-500",
          isShrunken ? "opacity-0 scale-90 pointer-events-none hidden" : "opacity-100 scale-100 flex"
        )}>
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-2xl border backdrop-blur-md transition-all duration-500",
            isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10",
            isHovered ? "border-emerald-500/30" : ""
          )}>
            <Terminal size={20} className="text-emerald-500" />
            <span className="text-xs font-mono text-emerald-500/80 tracking-wider">{project.year}</span>
          </div>
          
          <div className={cn(
            "flex gap-2 transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          )}>
            {project.github && (
              <Magnetic strength={0.2}>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 interactive",
                    isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-500/50" : "bg-black/5 border-black/10 text-black/60 hover:text-emerald-600 hover:border-emerald-600/50"
                  )}
                >
                  <Github size={18} />
                </a>
              </Magnetic>
            )}
            <Magnetic strength={0.2}>
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "p-2.5 rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-emerald-500/10 interactive",
                  isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-500/50" : "bg-black/5 border-black/10 text-black/60 hover:text-emerald-600 hover:border-emerald-600/50"
                )}
              >
                <ExternalLink size={18} />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className={cn(
          "flex flex-col transition-all duration-500",
          isShrunken ? "absolute inset-0" : ""
        )}>
          <motion.div
            layout
            className={cn(
              "transition-all duration-500 flex flex-col",
              isHovered ? "space-y-3" : "space-y-1",
              isShrunken ? "h-full w-full items-center justify-center relative" : "items-start"
            )}
          >
            <h3 
              className={cn(
                "font-bold tracking-tighter transition-all duration-500 leading-tight",
                isHovered ? "text-3xl md:text-4xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] text-left" : "text-xl md:text-2xl text-left",
                isShrunken ? "-rotate-90 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] whitespace-nowrap" : !isHovered && (isDark ? "text-white" : "text-zinc-900")
              )}
            >
              {project.title}
            </h3>
            <p className={cn(
              "text-muted-foreground transition-all duration-500 font-light text-left",
              isHovered ? "text-sm md:text-base max-w-xl opacity-90 leading-relaxed" : "text-xs line-clamp-1",
              isShrunken ? "opacity-0 hidden" : "opacity-100"
            )}>
              {isHovered ? project.longDescription : project.description}
            </p>

            {/* Tech Stack */}
            <div className={cn(
              "flex flex-wrap gap-2 transition-all duration-500 delay-100",
              isHovered ? "opacity-100 translate-y-0 flex" : "opacity-0 translate-y-2 pointer-events-none hidden"
            )}>
              {project.stack.map((tech) => (
                <Magnetic key={tech} strength={0.1}>
                  <span className={cn(
                    "px-2 py-1 text-[10px] font-mono border rounded-md backdrop-blur-md interactive",
                    isDark ? "border-white/10 bg-white/5 text-emerald-400" : "border-black/10 bg-black/5 text-emerald-600"
                  )}>
                    {tech}
                  </span>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
