"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode, 
  Terminal, 
  Folder, 
  ChevronRight, 
  Code, 
  Braces,
  Sparkles,
  Files
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutProps {
  isDark: boolean;
}

// 1. Define the "Files" content
const FILES = {
  "identity.tsx": {
    icon: <FileCode size={16} className="text-cyan-400" />,
    content: `const Developer = {
  name: "Your Name",
  role: "Creative Technologist",
  origin: "CS Major @ University",
  logic: "Building ecosystems, not apps.",
  mission: "Bridging retro aesthetics 
           with modern performance."
};`,
  },
  "stack.json": {
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "languages": ["TypeScript", "Rust", "Python"],
  "frontend": ["React", "Next.js", "Tailwind"],
  "backend": ["Node.js", "PostgreSQL", "Redis"],
  "tools": ["Neovim", "Docker", "Framer Motion"]
}`,
  },
  "history.git": {
    icon: <Terminal size={16} className="text-emerald-400" />,
    content: `// RECENT DEPLOYMENTS
> Initializing experience.log...
[2024] Intern @ Tech Corp
[2023] Open Source Contributor
[2022] Freelance Developer
> Status: Looking for new challenges.`,
  }
};

type FileKey = keyof typeof FILES;

export function About({ isDark }: AboutProps) {
  const [activeFile, setActiveFile] = useState<FileKey>("identity.tsx");

  useEffect(() => {
    const fileKeys = Object.keys(FILES) as FileKey[];
    const interval = setInterval(() => {
      setActiveFile((current) => {
        const currentIndex = fileKeys.indexOf(current);
        const nextIndex = (currentIndex + 1) % fileKeys.length;
        return fileKeys[nextIndex];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [activeFile]);

  return (
    <section data-section="about" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-transparent">
      
      {/* Background Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-250 blur-[160px] rounded-full pointer-events-none opacity-20"
        style={{ 
          background: isDark 
            ? `radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)`
            : `radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto w-full"
      >
        {/* Minimal Terminal-style Header */}
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
              ~/src/core/
            </span>
          </div>
          <div className={cn(
            "flex-1 h-px bg-linear-to-r to-transparent",
            isDark ? "from-emerald-500/20 via-emerald-500/10" : "from-emerald-500/10 via-emerald-500/5"
          )} />
          <span className={cn(
            "text-[9px] font-mono uppercase tracking-widest",
            isDark ? "text-cyan-400/60" : "text-cyan-600/60"
          )}>
            cat profile.md
          </span>
        </motion.div>

        {/* IDE WINDOW */}
        <div 
          className="w-full rounded-xl border overflow-hidden backdrop-blur-xl flex flex-col h-137.5 md:h-161 shadow-2xl transition-colors duration-500"
          style={{ 
            backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
            borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)'
          }}
        >
          
          {/* 1. TITLE BAR - Updated for consistency */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
                <Terminal size={12} />
                <span>src / core / {activeFile} — Visual Studio Code</span>
              </div>
            </div>
            <div className="w-10" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            
            {/* 2. SIDEBAR (The Explorer) */}
            <div className="w-12 md:w-56 border-r border-white/5 bg-black/10 hidden md:flex flex-col">
              <div className="p-3 text-[10px] uppercase tracking-wider text-cyan-400/40 font-bold flex items-center justify-between">
                <span>Explorer</span>
                <Files size={12} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 px-4 py-2 text-cyan-400/60 text-xs">
                  <ChevronRight size={14} />
                  <Folder size={14} />
                  <span className="font-semibold">PORTFOLIO</span>
                </div>
                {Object.keys(FILES).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setActiveFile(fileName as FileKey)}
                    className={`w-full flex items-center gap-2 px-8 py-2 text-xs transition-all hover:bg-cyan-500/5 ${
                      activeFile === fileName ? "bg-cyan-500/10 text-cyan-400" : "text-white/20"
                    }`}
                  >
                    {FILES[fileName as FileKey].icon}
                    <span>{fileName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. EDITOR AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* TABS */}
              <div className="flex bg-black/20 border-b border-white/5 overflow-x-auto no-scrollbar">
                {Object.keys(FILES).map((fileName) => (
                  <div
                    key={fileName}
                    onClick={() => setActiveFile(fileName as FileKey)}
                    className={`relative flex items-center gap-2 px-4 py-2 text-xs cursor-pointer border-r border-white/5 min-w-30 transition-all interactive ${
                      activeFile === fileName 
                        ? "bg-black/40 text-cyan-400" 
                        : "bg-black/20 text-white/20 hover:bg-black/40"
                    }`}
                  >
                    {FILES[fileName as FileKey].icon}
                    <span>{fileName}</span>
                    
                    {activeFile === fileName && (
                      <>
                        <motion.div 
                          layoutId="activeTabBorder"
                          className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400" 
                        />
                        <motion.div 
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 8, ease: "linear" }}
                          key={`progress-${fileName}`}
                          className="absolute bottom-0 left-0 h-px bg-cyan-400/30"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* CODE EDITOR */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 font-mono text-sm relative bg-black/5 no-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFile}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {/* Line Numbers */}
                    <div className="pr-6 border-r border-white/5 text-white/10 text-right select-none min-w-11.25">
                      {FILES[activeFile].content.split("\n").map((_, i) => (
                        <div key={i} className="h-6 leading-6">{i + 1}</div>
                      ))}
                    </div>
                    
                    {/* Code Content */}
                    <pre className={`pl-6 whitespace-pre-wrap leading-6 ${isDark ? 'text-white/80' : 'text-zinc-700'}`}>
                      {FILES[activeFile].content.split('\n').map((line, i) => (
                        <div key={i} className="group flex">
                          <span className="transition-colors group-hover:text-cyan-400">
                            {line}
                          </span>
                        </div>
                      ))}
                    </pre>
                  </motion.div>
                </AnimatePresence>
                
                {/* Visual Glow in the Editor corner */}
                <div className="absolute bottom-8 right-8 text-cyan-400/5 rotate-12 pointer-events-none">
                  <Code size={160} />
                </div>
              </div>
            </div>
          </div>

          {/* 4. STATUS BAR */}
          <div className="bg-linear-to-r from-cyan-600 to-emerald-600 px-4 py-1.5 flex items-center justify-between text-[10px] text-white font-mono">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-pointer interactive">
                <Terminal size={12} />
                <span>main*</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                  <span>0</span>
                </div>
                <span className="opacity-60">Errors</span>
              </div>
            </div>
            <div className="flex items-center gap-4 uppercase tracking-tighter">
              <div className="flex items-center gap-4 opacity-80">
                <span>UTF-8</span>
                <span>TypeScript JSX</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded">
                <Sparkles size={12} />
                <span>Copilot</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}