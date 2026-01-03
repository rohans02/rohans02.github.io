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
import { Magnetic } from "@/components/ui";

interface AboutProps {
  isDark: boolean;
}

// 1. Define the "Files" content
const FILES = {
  "identity.tsx": {
    icon: <FileCode size={16} className="text-cyan-400" />,
    content: `/**
 * @module Identity
 * @description Core developer profile and mission statement.
 */

const Developer = {
  name: "Your Name",
  role: "Full-Stack Engineer & Creative Technologist",
  specialization: "High-Performance Web Ecosystems",
  location: "Remote / Global",
  
  philosophy: {
    logic: "Code is the architecture of thought.",
    mission: "Bridging retro-futuristic aesthetics with modern performance.",
    focus: "Scalability, Accessibility, and User Experience."
  }
};

export default Developer;`,
  },
  "stack.json": {
    icon: <Braces size={16} className="text-yellow-400" />,
    content: `{
  "core_dependencies": {
    "languages": ["TypeScript", "Rust", "Python", "Go"],
    "frameworks": ["React 19", "Next.js 15", "Node.js"],
    "styling": ["Tailwind CSS 4", "Framer Motion"],
    "database": ["PostgreSQL", "Redis", "Prisma"]
  },
  "infrastructure": {
    "cloud": ["AWS", "Vercel", "Docker"],
    "ci_cd": ["GitHub Actions", "TurboRepo"]
  },
  "tooling": ["Neovim", "Git", "Postman"]
}`,
  },
  "history.git": {
    icon: <Terminal size={16} className="text-emerald-400" />,
    content: `commit 8f2d3e1 (HEAD -> main)
Author: Your Name <hello@example.com>
Date:   Mon Jan 4 2026

    feat: implement neural-link interface
    refactor: optimize spatial rendering engine
    fix: resolve temporal paradox in state management

[2024-Present] Senior Software Engineer @ TechNova
[2022-2024] Full-Stack Developer @ CreativeFlow
[2020-2022] Open Source Contributor & Freelancer

> Status: Actively architecting the future.`,
  }
};

type FileKey = keyof typeof FILES;

export function About({ isDark }: AboutProps) {
  const [activeFile, setActiveFile] = useState<FileKey>("identity.tsx");
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleFileChange = (fileName: FileKey) => {
    if (fileName === activeFile) return;
    setIsGlitching(true);
    setTimeout(() => {
      setActiveFile(fileName);
      setIsGlitching(false);
    }, 150);
  };

  useEffect(() => {
    setIsMounted(true);
    const fileKeys = Object.keys(FILES) as FileKey[];
    const interval = setInterval(() => {
      const currentIndex = fileKeys.indexOf(activeFile);
      const nextIndex = (currentIndex + 1) % fileKeys.length;
      handleFileChange(fileKeys[nextIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeFile]);

  // Simple syntax highlighter
  const renderHighlightedCode = (code: string) => {
    const lines = code.split('\n');
    return lines.map((line, i) => {
      // 1. Escape HTML characters first to prevent XSS and broken tags
      const safeLine = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // 2. Use a single-pass regex to avoid "highlighting the highlights"
      // Order: comments > strings > keywords > types > numbers > properties
      const combinedRegex = /(\/\/.*$)|(".*?"|'.*?')|(\b(?:const|let|var|export|default|import|from|return|type|interface)\b)|(\b(?:Developer|DeveloperProps|FileKey|FILES)\b)|(\b\d+\b)|(\w+)(?=:)/g;

      const highlighted = safeLine.replace(combinedRegex, (match, comment, string, keyword, type, number, property) => {
        if (comment) return `<span class="text-zinc-500 italic">${comment}</span>`;
        if (string) return `<span class="text-emerald-400">${string}</span>`;
        if (keyword) return `<span class="text-purple-400">${keyword}</span>`;
        if (type) return `<span class="text-yellow-400">${type}</span>`;
        if (number) return `<span class="text-orange-400">${number}</span>`;
        if (property) return `<span class="text-blue-400">${property}</span>`;
        return match;
      });

      const isLastLine = i === lines.length - 1;

      return (
        <div key={i} className="flex group">
          <span className="w-12 shrink-0 text-right pr-6 text-white/10 select-none font-mono text-xs leading-6">
            {i + 1}
          </span>
          <div className="flex-1 flex items-center">
            <span 
              className="leading-6 whitespace-pre"
              dangerouslySetInnerHTML={{ __html: isMounted ? (highlighted || '&nbsp;') : (safeLine || '&nbsp;') }}
            />
            {isLastLine && isMounted && (
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-4 bg-emerald-500/60 ml-1"
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <section data-section="about" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pt-20 pb-10 overflow-hidden bg-transparent">
      
      {/* Background Grid System */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Background Atmosphere */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-250 blur-[160px] rounded-full pointer-events-none opacity-20"
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
        className="max-w-6xl mx-auto w-full"
      >
        {/* Minimal Terminal-style Header */}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-lg border backdrop-blur-sm overflow-hidden mb-12",
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
              ~/src/core/
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
            cat profile.md
          </motion.span>
        </motion.div>

        {/* IDE WINDOW */}
        <div 
          className={cn(
            "w-full rounded-xl border overflow-hidden backdrop-blur-xl flex flex-col h-[60vh] min-h-[450px] max-h-[650px] shadow-2xl transition-colors duration-500"
          )}
          style={{ 
            backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
            borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
          }}
        >
          {/* Glitch Overlay */}
          <AnimatePresence>
            {isGlitching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-cyan-500/5 backdrop-blur-[1px] pointer-events-none flex items-center justify-center"
              >
                <div className="text-cyan-400 font-mono text-xs animate-pulse">
                  RELOADING_BUFFER...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* 1. TITLE BAR */}
          <div className={cn(
            "flex items-center justify-between px-4 py-3 border-b",
            isDark ? "border-white/5 bg-black/40" : "border-zinc-200 bg-zinc-100/50"
          )}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className={cn(
                "flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ml-4",
                isDark ? "text-emerald-400/60" : "text-emerald-600/60"
              )}>
                <Terminal size={12} />
                <span>src / core / {activeFile} — Visual Studio Code</span>
              </div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            
            {/* 2. SIDEBAR (The Explorer) */}
            <div className={cn(
              "w-12 md:w-56 border-r hidden md:flex flex-col",
              isDark ? "border-white/5 bg-black/20" : "border-zinc-200 bg-zinc-50/30"
            )}>
              <div className={cn(
                "p-3 text-[10px] uppercase tracking-wider font-bold flex items-center justify-between",
                isDark ? "text-cyan-400/40" : "text-cyan-600/40"
              )}>
                <span>Explorer</span>
                <Files size={12} />
              </div>
              <div className="flex-1">
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 text-xs",
                  isDark ? "text-cyan-400/60" : "text-cyan-600/60"
                )}>
                  <ChevronRight size={14} />
                  <Folder size={14} />
                  <span className="font-semibold">PORTFOLIO</span>
                </div>
                {Object.keys(FILES).map((fileName) => (
                  <Magnetic key={fileName} strength={0.1}>
                    <button
                      onClick={() => handleFileChange(fileName as FileKey)}
                      className={cn(
                        "w-full flex items-center gap-2 px-8 py-2 text-xs transition-all interactive",
                        activeFile === fileName 
                          ? (isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-500/5 text-cyan-600")
                          : (isDark ? "text-white/20 hover:bg-white/5" : "text-zinc-400 hover:bg-zinc-100")
                      )}
                    >
                      {FILES[fileName as FileKey].icon}
                      <span>{fileName}</span>
                    </button>
                  </Magnetic>
                ))}
              </div>
            </div>

            {/* 3. EDITOR AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">
              
              {/* TABS */}
              <div className={cn(
                "flex border-b overflow-x-auto no-scrollbar",
                isDark ? "bg-black/40 border-white/5" : "bg-zinc-100/50 border-zinc-200"
              )}>
                {Object.keys(FILES).map((fileName) => (
                  <Magnetic key={fileName} strength={0.05}>
                    <button
                      onClick={() => handleFileChange(fileName as FileKey)}
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2 text-xs border-r min-w-30 transition-all interactive",
                        activeFile === fileName 
                          ? (isDark ? "bg-black/60 text-cyan-400 border-r-transparent" : "bg-white text-cyan-600 border-r-transparent")
                          : (isDark ? "bg-black/20 text-white/20 border-white/5 hover:bg-black/40" : "bg-zinc-100/50 text-zinc-400 border-zinc-200 hover:bg-zinc-200/50")
                      )}
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
                    </button>
                  </Magnetic>
                ))}
              </div>

              {/* CODE EDITOR */}
              <div className={cn(
                "flex-1 overflow-y-auto overflow-x-hidden p-6 font-mono text-sm relative no-scrollbar",
                isDark ? "bg-black/20" : "bg-white/50"
              )}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFile}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {renderHighlightedCode(FILES[activeFile].content)}
                  </motion.div>
                </AnimatePresence>
                
                {/* Visual Glow in the Editor corner */}
                <div className={cn(
                  "absolute bottom-8 right-8 rotate-12 pointer-events-none transition-colors duration-500",
                  isDark ? "text-cyan-400/5" : "text-cyan-600/5"
                )}>
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