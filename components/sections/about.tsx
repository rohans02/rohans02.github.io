// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   FileCode, 
//   Terminal, 
//   Settings, 
//   Folder, 
//   ChevronRight, 
//   User, 
//   Code, 
//   Braces,
//   Sparkles,
//   Files,
//   Cpu,
//   Zap
// } from "lucide-react";

// interface AboutProps {
//   isDark: boolean;
// }

// // 1. Define the "Files" content
// const FILES = {
//   "identity.tsx": {
//     icon: <FileCode size={16} className="text-cyan-400" />,
//     content: `const Developer = {
//   name: "Your Name",
//   role: "Creative Technologist",
//   origin: "CS Major @ University",
//   logic: "Building ecosystems, not apps.",
//   mission: "Bridging retro aesthetics 
//            with modern performance."
// };`,
//   },
//   "stack.json": {
//     icon: <Braces size={16} className="text-yellow-400" />,
//     content: `{
//   "languages": ["TypeScript", "Rust", "Python"],
//   "frontend": ["React", "Next.js", "Tailwind"],
//   "backend": ["Node.js", "PostgreSQL", "Redis"],
//   "tools": ["Neovim", "Docker", "Framer Motion"]
// }`,
//   },
//   "history.git": {
//     icon: <Terminal size={16} className="text-emerald-400" />,
//     content: `// RECENT DEPLOYMENTS
// > Initializing experience.log...
// [2024] Intern @ Tech Corp
// [2023] Open Source Contributor
// [2022] Freelance Developer
// > Status: Looking for new challenges.`,
//   }
// };

// type FileKey = keyof typeof FILES;

// const MatrixRain = ({ isHovered }: { isHovered: boolean }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = 200;
//     canvas.height = 200;

//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
//     const fontSize = 10;
//     const columns = canvas.width / fontSize;
//     const drops: number[] = Array(Math.floor(columns)).fill(1);

//     const draw = () => {
//       ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.fillStyle = "#10b981"; // Emerald
//       ctx.font = `${fontSize}px monospace`;

//       for (let i = 0; i < drops.length; i++) {
//         const text = characters.charAt(Math.floor(Math.random() * characters.length));
//         ctx.fillText(text, i * fontSize, drops[i] * fontSize);

//         if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//           drops[i] = 0;
//         }
//         drops[i]++;
//       }
//     };

//     let interval: NodeJS.Timeout;
//     if (isHovered) {
//       interval = setInterval(draw, 33);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isHovered]);

//   return (
//     <canvas 
//       ref={canvasRef} 
//       className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-0'}`}
//     />
//   );
// };

// export function About({ isDark }: AboutProps) {
//   const [activeFile, setActiveFile] = useState<FileKey>("identity.tsx");
//   const [isAvatarHovered, setIsAvatarHovered] = useState(false);

//   // Auto-shift files every 8 seconds
//   useEffect(() => {
//     const fileKeys = Object.keys(FILES) as FileKey[];
//     const interval = setInterval(() => {
//       setActiveFile((current) => {
//         const currentIndex = fileKeys.indexOf(current);
//         const nextIndex = (currentIndex + 1) % fileKeys.length;
//         return fileKeys[nextIndex];
//       });
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [activeFile]); // Reset timer if user manually clicks a file

//   return (
//     <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-32 overflow-hidden bg-transparent">
      
//       {/* Background Atmosphere */}
//       <div 
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-[600px] blur-[120px] rounded-full pointer-events-none"
//         style={{ 
//           background: isDark 
//             ? `radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.1) 50%, transparent 70%)`
//             : `radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)`
//         }}
//       />

//       <motion.div 
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="max-w-6xl w-full space-y-12"
//       >
//         {/* Header */}
//         <div className="flex flex-col items-center space-y-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400"
//           >
//             <Sparkles size={12} />
//             <span>System Information</span>
//           </motion.div>
//           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center text-white">
//             About <span className="bg-linear-to-r from-cyan-400 to-emerald-500 bg-clip-text text-transparent">Me</span>
//           </h2>
//         </div>

//         {/* IDE WINDOW */}
//         <div 
//           className={`w-full rounded-xl border overflow-hidden backdrop-blur-xl flex flex-col h-[600px] shadow-2xl transition-colors duration-500`}
//           style={{ 
//             backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
//             borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)'
//           }}
//         >
          
//           {/* 1. TITLE BAR (Mac Style) */}
//           <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
//             <div className="flex gap-2">
//               <div className="w-3 h-3 rounded-full bg-red-500/50" />
//               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
//               <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
//             </div>
//             <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">
//               <Terminal size={12} />
//               <span>src / core / {activeFile} — Visual Studio Code</span>
//             </div>
//             <div className="w-10" /> {/* Spacer */}
//           </div>

//           <div className="flex flex-1 overflow-hidden">
            
//             {/* 2. SIDEBAR (The Explorer) */}
//             <div className="w-12 md:w-56 border-r border-white/5 bg-black/10 hidden md:flex flex-col">
//               <div className="p-3 text-[10px] uppercase tracking-wider text-cyan-400/40 font-bold flex items-center justify-between">
//                 <span>Explorer</span>
//                 <Files size={12} />
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 px-4 py-2 text-cyan-400/60 text-xs">
//                   <ChevronRight size={14} />
//                   <Folder size={14} />
//                   <span className="font-semibold">PORTFOLIO</span>
//                 </div>
//                 {Object.keys(FILES).map((fileName) => (
//                   <button
//                     key={fileName}
//                     onClick={() => setActiveFile(fileName as FileKey)}
//                     className={`w-full flex items-center gap-2 px-8 py-2 text-xs transition-all hover:bg-cyan-500/5 ${
//                       activeFile === fileName ? "bg-cyan-500/10 text-cyan-400" : "text-white/20"
//                     }`}
//                   >
//                     {FILES[fileName as FileKey].icon}
//                     <span>{fileName}</span>
//                   </button>
//                 ))}
//               </div>

//               {/* Mini Avatar in Sidebar */}
//               <div className="p-4 border-t border-white/5">
//                 <div 
//                   className="relative aspect-square rounded-lg overflow-hidden border border-white/10 group cursor-crosshair"
//                   onMouseEnter={() => setIsAvatarHovered(true)}
//                   onMouseLeave={() => setIsAvatarHovered(false)}
//                 >
//                   <div className={`absolute inset-0 bg-[url('/textures/texture1.png')] bg-cover bg-center grayscale transition-all duration-500 ${isAvatarHovered ? 'opacity-0 scale-110 blur-sm' : 'opacity-40 scale-100'}`} />
//                   <MatrixRain isHovered={isAvatarHovered} />
//                   <div className={`absolute inset-0 bg-[url('/textures/texture1.png')] bg-cover bg-center transition-all duration-700 ${isAvatarHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} />
//                   <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
//                   <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
//                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAvatarHovered ? 'bg-cyan-400' : 'bg-emerald-500'}`} />
//                     <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">
//                       {isAvatarHovered ? 'Decoding' : 'Encrypted'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* 3. EDITOR AREA */}
//             <div className="flex-1 flex flex-col overflow-hidden">
              
//               {/* TABS */}
//               <div className="flex bg-black/20 border-b border-white/5 overflow-x-auto no-scrollbar">
//                 {Object.keys(FILES).map((fileName) => (
//                   <div
//                     key={fileName}
//                     onClick={() => setActiveFile(fileName as FileKey)}
//                     className={`relative flex items-center gap-2 px-4 py-2 text-xs cursor-pointer border-r border-white/5 min-w-[120px] transition-all ${
//                       activeFile === fileName 
//                         ? "bg-black/40 text-cyan-400" 
//                         : "bg-black/20 text-white/20 hover:bg-black/40"
//                     }`}
//                   >
//                     {FILES[fileName as FileKey].icon}
//                     <span>{fileName}</span>
                    
//                     {/* Active Tab Indicator & Progress Bar */}
//                     {activeFile === fileName && (
//                       <>
//                         <motion.div 
//                           layoutId="activeTabBorder"
//                           className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400" 
//                         />
//                         <motion.div 
//                           initial={{ width: "0%" }}
//                           animate={{ width: "100%" }}
//                           transition={{ duration: 8, ease: "linear" }}
//                           key={`progress-${fileName}`}
//                           className="absolute bottom-0 left-0 h-[1px] bg-cyan-400/30"
//                         />
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* CODE EDITOR */}
//               <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 font-mono text-sm relative bg-black/5 no-scrollbar">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={activeFile}
//                     initial={{ opacity: 0, x: 10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="flex"
//                   >
//                     {/* Line Numbers */}
//                     <div className="pr-6 border-r border-white/5 text-white/10 text-right select-none min-w-[45px]">
//                       {FILES[activeFile].content.split("\n").map((_, i) => (
//                         <div key={i} className="h-6 leading-6">{i + 1}</div>
//                       ))}
//                     </div>
                    
//                     {/* Code Content */}
//                     <pre className="pl-6 text-white/80 whitespace-pre-wrap leading-6">
//                       {FILES[activeFile].content.split('\n').map((line, i) => (
//                         <div key={i} className="group flex">
//                           <span className="transition-colors group-hover:text-cyan-400">
//                             {line}
//                           </span>
//                         </div>
//                       ))}
//                     </pre>
//                   </motion.div>
//                 </AnimatePresence>
                
//                 {/* Visual Glow in the Editor corner */}
//                 <div className="absolute bottom-8 right-8 text-cyan-400/5 rotate-12 pointer-events-none">
//                   <Code size={160} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 4. STATUS BAR */}
//           <div className="bg-linear-to-r from-cyan-600 to-emerald-600 px-4 py-1.5 flex items-center justify-between text-[10px] text-white font-mono">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-0.5 rounded transition-colors cursor-pointer">
//                 <Terminal size={12} />
//                 <span>main*</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 rounded-full bg-white/20 flex items-center justify-center">
//                     <div className="w-1 h-1 rounded-full bg-white" />
//                   </div>
//                   <span>0</span>
//                 </div>
//                 <span className="opacity-60">Errors</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 uppercase tracking-tighter">
//               <div className="flex items-center gap-4 opacity-80">
//                 <span>UTF-8</span>
//                 <span>TypeScript JSX</span>
//               </div>
//               <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded">
//                 <Sparkles size={12} />
//                 <span>Copilot</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </motion.div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Zap, 
  Target, 
  Layers, 
  Fingerprint, 
  Activity,
  Maximize2,
  GitBranch,
  Search
} from "lucide-react";

interface AboutProps {
  isDark: boolean;
}

// 1. Define the "Core Modules" (Instead of files)
const MODULES = [
  {
    id: "core",
    label: "Kernel_Identity",
    icon: <Fingerprint size={18} />,
    title: "The Architect",
    desc: "A developer specializing in high-concurrency systems and fluid digital aesthetics. I treat code as a living ecosystem.",
    stats: { "Uptime": "5+ Years", "Efficiency": "99.9%", "Role": "Full-Stack" }
  },
  {
    id: "stack",
    label: "Neural_Stack",
    icon: <Layers size={18} />,
    title: "Technical Matrix",
    desc: "Mastery of the modern web stack with a focus on type-safety and performance engineering.",
    stats: { "Languages": "TS, Rust, Go", "Frontend": "Next.js", "Backend": "Node/Postgres" }
  },
  {
    id: "mission",
    label: "Logic_Path",
    icon: <Target size={18} />,
    title: "Strategic Vision",
    desc: "Bridging the gap between retro-visual nostalgia and cutting-edge system performance.",
    stats: { "Vision": "Creative Tech", "Method": "Agile/Clean", "Goal": "Scalability" }
  }
];

export function About({ isDark }: AboutProps) {
  const [activeModule, setActiveModule] = useState(MODULES[0]);
  const [isScanning, setIsScanning] = useState(false);

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      
      {/* Background Grid - Industrial/Technical Vibe */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        
        {/* --- LEFT COLUMN: NAVIGATION NODES --- */}
        <div className="lg:col-span-3 flex flex-col gap-4 justify-center order-2 lg:order-1">
          {MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod)}
              className={`relative group p-4 rounded-lg border transition-all duration-500 text-left overflow-hidden ${
                activeModule.id === mod.id 
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" 
                : "border-white/5 bg-white/5 text-white/40 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={`transition-transform duration-500 ${activeModule.id === mod.id ? 'scale-110 rotate-[360deg]' : ''}`}>
                  {mod.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{mod.label}</span>
              </div>
              {/* Pulse effect for active node */}
              {activeModule.id === mod.id && (
                <motion.div layoutId="nodePulse" className="absolute inset-0 bg-cyan-400/5 animate-pulse" />
              )}
            </button>
          ))}
          
          {/* Technical Readout Spacer */}
          <div className="mt-8 p-4 border-l-2 border-dashed border-white/10 hidden lg:block">
            <p className="text-[9px] font-mono text-white/20 leading-relaxed uppercase tracking-tighter">
              [SYSTEM_CHECK]: OK<br/>
              [LATENCY]: 12ms<br/>
              [ARCHITECTURE]: MODULAR<br/>
              [STATUS]: SCANNING_FOR_TALENT
            </p>
          </div>
        </div>

        {/* --- CENTER COLUMN: SCHEMATIC VISUAL --- */}
        <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
          <div className="relative w-full aspect-square max-w-[400px]">
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-emerald-500/10 animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* The Iris / Scanner */}
            <div 
              className="absolute inset-12 rounded-2xl border border-white/10 overflow-hidden cursor-none group"
              onMouseEnter={() => setIsScanning(true)}
              onMouseLeave={() => setIsScanning(false)}
            >
              <div className={`absolute inset-0 bg-[url('/textures/texture1.png')] bg-cover bg-center transition-all duration-700 ${isScanning ? 'scale-110 grayscale-0' : 'grayscale brightness-50'}`} />
              
              {/* Scanning Line */}
              {isScanning && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-20"
                />
              )}

              {/* Crosshairs */}
              <div className="absolute top-2 left-2 text-cyan-400 opacity-40"><Maximize2 size={12}/></div>
              <div className="absolute top-2 right-2 text-cyan-400 opacity-40 rotate-90"><Maximize2 size={12}/></div>
              <div className="absolute bottom-2 left-2 text-cyan-400 opacity-40 -rotate-90"><Maximize2 size={12}/></div>
              <div className="absolute bottom-2 right-2 text-cyan-400 opacity-40 rotate-180"><Maximize2 size={12}/></div>
            </div>

            {/* Orbiting Data Tags */}
            <div className="absolute top-0 right-0 p-2 border border-white/10 rounded backdrop-blur-md">
                <p className="text-[8px] font-mono text-cyan-400">POS: 37.7749° N</p>
            </div>
            <div className="absolute bottom-0 left-0 p-2 border border-white/10 rounded backdrop-blur-md">
                <p className="text-[8px] font-mono text-emerald-400">MTBF: 99.98%</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: DATA DISPLAY --- */}
        <div className="lg:col-span-4 flex flex-col justify-center order-3 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white tracking-tighter">{activeModule.title}</h3>
                <div className="h-1 w-12 bg-cyan-500" />
              </div>

              <p className="text-white/60 text-sm leading-relaxed font-light italic">
                "{activeModule.desc}"
              </p>

              {/* Stat Grid */}
              <div className="grid grid-cols-1 gap-4 pt-4">
                {Object.entries(activeModule.stats).map(([label, value]) => (
                  <div key={label} className="group flex flex-col p-3 rounded border border-white/5 bg-white/5 hover:border-cyan-500/30 transition-colors">
                    <span className="text-[8px] font-mono text-cyan-400 uppercase tracking-widest mb-1">{label}</span>
                    <span className="text-xs text-white/80 font-mono tracking-wider">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 pt-8">
            <button className="flex-1 py-3 text-[10px] font-mono uppercase tracking-[0.2em] border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:bg-emerald-500/10 transition-colors rounded">
              Download_Spec.pdf
            </button>
            <div className="p-3 border border-white/10 rounded text-white/20">
              <Search size={16} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}