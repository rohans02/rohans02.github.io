"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEME } from "@/config";
import { Terminal as TerminalIcon, Cpu, GraduationCap, Compass, Sparkles, X, Github, Linkedin, Mail } from "lucide-react";

interface AboutProps {
  isDark: boolean;
}

const PILLARS = [
  {
    id: "architect",
    title: "The Architect",
    filename: "architect.ts",
    icon: Cpu,
    code: `class Architect {
  specialization = "Scalable Systems";
  focus = ["Performance", "Clean Code"];
  
  build() {
    return "Software that breathes";
  }
}`,
    description: "I specialize in building scalable backend systems and interactive frontend experiences. My focus is on the intersection of performance and clean code.",
    color: "rgb(16, 185, 129)" // Emerald
  },
  {
    id: "student",
    title: "The Student",
    filename: "student.rs",
    icon: GraduationCap,
    code: `struct Student {
  major: "Computer Science",
  philosophy: "Continuous Experimentation",
  
  fn study(system: System) {
    system.deconstruct().optimize();
  }
}`,
    description: "Currently a CS Major, I treat every project as an experiment in efficiency. I don't just write code; I study systems.",
    color: "rgb(56, 189, 248)" // Sky
  },
  {
    id: "explorer",
    title: "The Explorer",
    filename: "explorer.js",
    icon: Compass,
    code: `const explorer = {
  inspiration: "Nature's Complexity",
  hobbies: ["Outdoors", "Digital Gardening"],
  
  explore: () => "Beyond the terminal"
};`,
    description: "When I'm not in the terminal, I'm likely exploring the outdoors or researching digital gardening. I believe great engineering is inspired by nature.",
    color: "rgb(168, 85, 247)" // Purple
  }
];

const TerminalCarousel = ({ isDark, activeId, setActiveId }: { isDark: boolean, activeId: string, setActiveId: (id: string) => void }) => {
  const currentIndex = PILLARS.findIndex(p => p.id === activeId);

  return (
    <div className="w-full lg:w-1/2 relative group">
      <div className="relative h-112.5 w-full flex items-center justify-center">
        {PILLARS.map((pillar, index) => {
          // Calculate relative position in the stack (0 is front, 1 is middle, 2 is back)
          const position = (index - currentIndex + PILLARS.length) % PILLARS.length;
          
          return (
            <motion.div 
              key={pillar.id}
              animate={{
                scale: 1 - position * 0.05,
                y: position * -15,
                zIndex: PILLARS.length - position,
                opacity: 1 - position * 0.4,
                filter: position > 0 ? "blur(4px)" : "blur(0px)",
              }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 120,
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 rounded-xl border overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col"
              style={{ 
                backgroundColor: isDark ? "rgba(2, 13, 6, 0.6)" : "rgba(248, 250, 245, 0.6)",
                borderColor: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.1)",
                pointerEvents: position === 0 ? "auto" : "none"
              }}
            >
              {/* VS Code Header */}
              <div className="flex flex-col border-b border-white/5">
                {/* Title Bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-black/20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest">
                    Visual Studio Code — {pillar.filename}
                  </div>
                  <div className="w-12" /> {/* Spacer */}
                </div>

                {/* Tab Bar */}
                <div className="flex bg-black/40 overflow-x-auto no-scrollbar">
                  {PILLARS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => position === 0 && setActiveId(p.id)}
                      className={`group flex items-center gap-2 px-4 py-2 text-xs font-mono cursor-pointer border-r border-white/5 transition-colors ${
                        p.id === pillar.id 
                          ? "bg-[#1e1e1e] text-white border-t-2 border-t-emerald-500" 
                          : "text-white/40 hover:bg-white/5"
                      }`}
                      style={{ 
                        borderTopColor: p.id === pillar.id ? p.color : "transparent",
                        minWidth: "140px"
                      }}
                    >
                      <p.icon size={14} style={{ color: p.color }} />
                      <span className="flex-1 truncate">{p.filename}</span>
                      <div className="flex items-center justify-center w-4 h-4 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={10} />
                      </div>
                      {p.id === pillar.id && (
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 px-4 py-1 bg-[#1e1e1e] text-[10px] font-mono text-white/40">
                  <span>src</span>
                  <span>›</span>
                  <span>pillars</span>
                  <span>›</span>
                  <span className="text-white/60">{pillar.filename}</span>
                </div>
              </div>

              {/* Editor Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* VS Code Activity Bar (Left) */}
                <div className="w-12 bg-black/20 border-r border-white/5 flex flex-col items-center py-4 gap-4">
                  {PILLARS.map((p) => (
                    <div 
                      key={p.id}
                      className={`p-2 rounded-md transition-colors ${p.id === activeId ? 'text-white bg-white/10' : 'text-white/20 hover:text-white/40'}`}
                    >
                      <p.icon size={18} />
                    </div>
                  ))}
                </div>

                <div className="flex-1 flex flex-col relative overflow-hidden">
                  {/* Line Numbers */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/10 flex flex-col items-center py-8 text-white/10 select-none">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="h-6 leading-relaxed">{i + 1}</div>
                    ))}
                  </div>

                  <div className="pl-12 p-8 flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <pillar.icon size={24} style={{ color: pillar.color }} />
                      <span className="text-xl font-bold uppercase tracking-tighter">{pillar.title}</span>
                    </div>
                    <pre className="text-[13px] leading-relaxed overflow-x-auto p-4 rounded bg-black/20 border border-white/5">
                      <code style={{ color: pillar.color }}>
                        {pillar.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* VS Code Status Bar */}
              <div className="h-6 bg-emerald-600 flex items-center justify-between px-3 text-[10px] text-white font-mono" style={{ backgroundColor: pillar.color }}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span>Main*</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <X size={10} />
                    <span>0 Errors</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span>UTF-8</span>
                  <span>TypeScript</span>
                  <div className="flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>Copilot</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Garden = ({ isDark, activeId }: { isDark: boolean, activeId: string }) => {
  const activePillar = PILLARS.find(p => p.id === activeId) || PILLARS[0];

  return (
    <div className="w-full lg:w-1/2 relative min-h-120 flex items-center justify-center">
      {/* Profile / Identity Frame */}
      <div className="relative w-full max-w-md aspect-4/5 group">
        {/* Background Decorative Elements */}
        <motion.div 
          animate={{ 
            backgroundColor: activePillar.color,
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl blur-3xl -z-10"
        />

        {/* Main Frame */}
        <div 
          className="absolute inset-0 rounded-2xl border backdrop-blur-xl overflow-hidden flex flex-col shadow-2xl"
          style={{ 
            backgroundColor: isDark ? "rgba(2, 13, 6, 0.4)" : "rgba(248, 250, 245, 0.4)",
            borderColor: `${activePillar.color}33`
          }}
        >
          {/* Background Data Stream */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden font-mono text-[8px] leading-none flex flex-wrap gap-1 p-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              >
                {Math.random().toString(16).slice(2, 10)}
              </motion.div>
            ))}
          </div>

          {/* Frame Header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activePillar.color }} />
                <div className="absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-50" style={{ backgroundColor: activePillar.color }} />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">Identity_Protocol.v1</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-[10px] font-mono opacity-30">ID: 0x7F...{activeId.slice(0, 2).toUpperCase()}</div>
              <div className="w-px h-3 bg-white/10" />
              <div className="text-[10px] font-mono text-emerald-500/60">SECURE</div>
            </div>
          </div>

          {/* Photo / Avatar Area */}
          <div className="flex-1 relative p-8 flex flex-col items-center justify-center gap-8">
            <div className="relative w-48 h-48">
              {/* Corner Accents */}
              {[0, 90, 180, 270].map((rot) => (
                <div 
                  key={rot}
                  className="absolute w-6 h-6 border-t-2 border-l-2"
                  style={{ 
                    transform: `rotate(${rot}deg)`,
                    borderColor: activePillar.color,
                    top: rot < 180 ? "-4px" : "auto",
                    bottom: rot >= 180 ? "-4px" : "auto",
                    left: (rot === 0 || rot === 270) ? "-4px" : "auto",
                    right: (rot === 90 || rot === 180) ? "-4px" : "auto",
                  }}
                />
              ))}

              {/* Image Placeholder / Avatar */}
              <div className="w-full h-full rounded-lg overflow-hidden bg-black/20 border border-white/5 flex items-center justify-center relative group/img">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative">
                    <activePillar.icon size={48} style={{ color: activePillar.color }} className="opacity-20" />
                    {/* Wireframe Overlay */}
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-150 opacity-10" />
                    <div className="absolute inset-0 border border-white/5 rounded-full scale-125 opacity-20" />
                  </div>
                  <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Identity_Pending</span>
                </motion.div>
                
                {/* Scanning Effect with Glitch */}
                <motion.div 
                  animate={{ 
                    top: ["0%", "100%", "0%"],
                    opacity: [0.2, 0.5, 0.2],
                    scaleX: [1, 1.1, 1]
                  }}
                  transition={{ 
                    top: { duration: 4, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.2, repeat: Infinity },
                    scaleX: { duration: 0.1, repeat: Infinity }
                  }}
                  className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-current to-transparent z-10"
                  style={{ color: activePillar.color }}
                />

                {/* Corner Scan Markers */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />
              </div>
            </div>

            {/* System Stats / Metadata */}
            <div className="w-full space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Logic Level", value: "98.4%" },
                  { label: "Neural Sync", value: "Active" },
                  { label: "Uptime", value: "∞" },
                  { label: "Status", value: "Optimized" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[9px] font-mono uppercase opacity-40 tracking-wider">{stat.label}</div>
                    <div className="text-xs font-mono" style={{ color: activePillar.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-mono uppercase opacity-40">
                  <span>System Integration</span>
                  <span>{activeId === 'architect' ? '92%' : activeId === 'student' ? '85%' : '78%'}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    key={activeId}
                    initial={{ width: 0 }}
                    animate={{ width: activeId === 'architect' ? '92%' : activeId === 'student' ? '85%' : '78%' }}
                    className="h-full"
                    style={{ backgroundColor: activePillar.color }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer / Contact Blocks */}
          <div className="p-6 bg-black/20 border-t border-white/5 grid grid-cols-3 gap-3">
            {[
              { label: "GITHUB", value: "github.com/your-handle", icon: Github, href: "#" },
              { label: "LINKEDIN", value: "linkedin.com/in/your-profile", icon: Linkedin, href: "#" },
              { label: "EMAIL", value: "hello@yourdomain.com", icon: Mail, href: "mailto:hello@yourdomain.com" }
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex flex-col items-center justify-center gap-2 py-5 rounded-lg border border-white/5 hover:bg-white/5 transition-all group/link relative"
                style={{ borderColor: `${activePillar.color}22` }}
              >
                {/* VS Code Style Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-50 opacity-0 group-hover/link:opacity-100 pointer-events-none transition-all duration-200 translate-y-2 group-hover/link:translate-y-0 z-50">
                  <div className="bg-[#252526] border border-[#454545] shadow-xl rounded px-3 py-2 text-[10px] font-mono text-white/90 flex flex-col gap-1">
                    <div className="flex items-center gap-2 border-b border-white/10 pb-1 mb-1">
                      <link.icon size={10} style={{ color: activePillar.color }} />
                      <span className="font-bold">{link.label}</span>
                    </div>
                    <div className="text-white/50 break-all">{link.value}</div>
                    <div className="text-[8px] text-emerald-500/50 mt-1 italic">Click to open link</div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-2 h-2 bg-[#252526] border-r border-b border-[#454545] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover/link:opacity-10 transition-opacity pointer-events-none rounded-lg"
                  style={{ backgroundColor: activePillar.color }}
                />
                
                <link.icon size={20} className="opacity-40 group-hover/link:opacity-100 transition-all group-hover/link:scale-110" style={{ color: activePillar.color }} />
                <span className="text-[9px] font-mono opacity-30 group-hover/link:opacity-80 tracking-[0.2em]">{link.label}</span>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 rounded-tr-lg" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function About({ isDark }: AboutProps) {
  const [activeId, setActiveId] = useState("architect");

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 overflow-hidden">
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ 
          background: isDark 
            ? `radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)`
            : `radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl w-full space-y-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500"
          >
            <Sparkles size={12} />
            <span>Rooted in Logic</span>
          </motion.div>
          <h2 
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            style={{ color: isDark ? THEME.dark.foreground : THEME.light.foreground }}
          >
            The Terminal Garden
          </h2>
        </div>

        {/* Main Content: Split Screen */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <TerminalCarousel isDark={isDark} activeId={activeId} setActiveId={setActiveId} />
          <Garden isDark={isDark} activeId={activeId} />
        </div>
      </div>
    </section>
  );
}
