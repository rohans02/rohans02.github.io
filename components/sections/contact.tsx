"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Terminal, 
  Send, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronRight,
  Code2,
  Database
} from "lucide-react";
import { Button, Magnetic } from "@/components/ui";

interface ContactProps {
  isDark: boolean;
}

export function Contact({ isDark }: ContactProps) {
  const [step, setStep] = useState(0);
  const [hasBooted, setHasBooted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const steps = [
    { id: 'name', label: 'Your Name', placeholder: 'Enter your name...', key: 'name' },
    { id: 'email', label: 'Email Address', placeholder: 'Enter your email...', key: 'email' },
    { id: 'message', label: 'Your Message', placeholder: 'How can I help you?', key: 'message' },
  ];

  // Boot sequence
  useEffect(() => {
    let isMounted = true;
    
    const boot = async () => {
      // Clear logs before starting to prevent duplicates in Strict Mode
      setLogs([]);
      
      const sequence = [
        "Initializing core protocols...",
        "Establishing secure uplink...",
        "System ready. Welcome guest."
      ];
      
      for (const msg of sequence) {
        if (!isMounted) return;
        addLog(msg);
        await new Promise(r => setTimeout(r, 400));
      }
      
      if (isMounted) setHasBooted(true);
    };
    
    boot();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs, step, isSubmitting]);

  // Focus input on mount and step change
  useEffect(() => {
    if (!isSent && !isSubmitting && hasBooted) {
      inputRef.current?.focus();
    }
  }, [step, isSent, isSubmitting, hasBooted]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    
    const sequence = [
      "Initializing secure handshake...",
      "Establishing encrypted tunnel...",
      "Parsing payload headers...",
      "Verifying checksums...",
      "Routing through edge nodes...",
      "Finalizing transmission...",
      "Message delivered successfully!"
    ];

    for (const msg of sequence) {
      addLog(msg);
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
    }

    setIsSubmitting(false);
    setIsSent(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && step < steps.length - 1) {
      e.preventDefault();
      if (formState[steps[step].key as keyof typeof formState]) {
        setStep(step + 1);
      }
    }
  };

  return (
    <section 
      data-section="contact" 
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
        className="max-w-6xl mx-auto w-full relative"
      >
        {/* Technical Header */}
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
              ~/src/contact/
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
            establish_uplink.sh
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Terminal Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 flex flex-col"
          >
            <div className="space-y-2 mb-6">
              <h2 className={cn(
                "text-2xl md:text-3xl font-bold tracking-tight",
                isDark ? "text-white" : "text-zinc-900"
              )}>
                Get In Touch
              </h2>
              <p className={cn(
                "text-sm font-mono uppercase tracking-widest",
                isDark ? "text-white/40" : "text-zinc-500"
              )}>
                Have a project in mind or just want to say hi? Drop me a message below.
              </p>
            </div>

            <div 
              className="flex-1 rounded-xl border overflow-hidden backdrop-blur-xl transition-all duration-500 shadow-2xl flex flex-col"
              style={{ 
                backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
              }}
            >
              {/* Terminal Header */}
              <div className={cn(
                "px-4 py-3 border-b flex items-center justify-between shrink-0",
                isDark ? "bg-black/40 border-white/5" : "bg-zinc-100/50 border-zinc-200"
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
                    <span>bash — guest@portfolio — 80x24</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-500/60 uppercase tracking-tighter">Online</span>
                  </div>
                </div>
              </div>

              {/* Terminal Body */}
              <div 
                ref={terminalRef}
                onClick={() => inputRef.current?.focus()}
                className="p-6 font-mono text-sm flex flex-col h-100 overflow-y-auto relative scrollbar-none"
              >
                {!isSent && (
                  <div className="space-y-2 mb-4">
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-emerald-500/80 text-xs"
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                )}

                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                      <Send className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={cn("text-lg font-bold tracking-tight", isDark ? "text-white" : "text-zinc-900")}>
                        MESSAGE_DELIVERED
                      </h3>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
                        Uplink established successfully.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Magnetic>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSent(false);
                            setStep(0);
                            setFormState({ name: "", email: "", message: "" });
                            setLogs([]);
                            setHasBooted(false);
                            // Trigger reboot
                            const sequence = [
                              "Initializing core protocols...",
                              "Establishing secure uplink...",
                              "System ready. Welcome guest."
                            ];
                            const boot = async () => {
                              for (const msg of sequence) {
                                addLog(msg);
                                await new Promise(r => setTimeout(r, 400));
                              }
                              setHasBooted(true);
                            };
                            boot();
                          }}
                          className="text-[9px] uppercase tracking-widest interactive h-9 px-6"
                        >
                          New_Session
                        </Button>
                      </Magnetic>
                    </div>
                  </motion.div>
                ) : isSubmitting ? (
                  <div className="space-y-6 py-8 flex flex-col items-center justify-center my-auto">
                    <div className="w-full max-w-xs space-y-4">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-emerald-500/60">
                        <span>Transmitting_Payload</span>
                        <span>{Math.min(100, Math.round((logs.filter(l => !l.includes("Initializing") && !l.includes("Establishing") && !l.includes("System ready")).length / 5) * 100))}%</span>
                      </div>
                      <div className="font-mono text-xs text-emerald-500/80 break-all leading-none">
                        {"[".split("").map((char, i) => <span key={i}>{char}</span>)}
                        {Array.from({ length: 20 }).map((_, i) => {
                          const progress = (logs.filter(l => !l.includes("Initializing") && !l.includes("Establishing") && !l.includes("System ready")).length / 5) * 20;
                          return (
                            <span key={i} className={i < progress ? "text-emerald-500" : "text-emerald-500/10"}>
                              █
                            </span>
                          );
                        })}
                        {"]".split("").map((char, i) => <span key={i}>{char}</span>)}
                      </div>
                      <div className="text-[9px] font-mono text-emerald-500/40 animate-pulse">
                        {logs[logs.length - 1]}
                      </div>
                    </div>
                  </div>
                ) : hasBooted && (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      {/* History of completed steps */}
                      {steps.slice(0, step).map((s, i) => (
                        <div key={s.id} className="flex items-baseline gap-2 opacity-50">
                          <span className="text-emerald-500 shrink-0 font-mono text-xs">
                            guest@portfolio:~/{s.id}$
                          </span>
                          <div className="flex-1">
                            <span className={cn("font-mono text-sm", isDark ? "text-white" : "text-zinc-900")}>
                              {formState[s.key as keyof typeof formState]}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Current active step */}
                      <motion.div 
                        key={steps[step].id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="text-emerald-500 shrink-0 font-mono text-xs">
                            guest@portfolio:~/{steps[step].id}$
                          </span>
                          <div className="flex-1 relative">
                            {steps[step].id === 'message' ? (
                              <div className="relative">
                                <div className="relative">
                                  <span className={cn(
                                    "whitespace-pre-wrap break-all font-mono text-sm",
                                    isDark ? "text-white" : "text-zinc-900"
                                  )}>
                                    {formState.message || (
                                      <span className="text-zinc-500/50">{steps[step].placeholder}</span>
                                    )}
                                    {!isSubmitting && isFocused && <span className="terminal-cursor" />}
                                  </span>
                                </div>
                                <textarea 
                                  ref={inputRef as any}
                                  required
                                  spellCheck={false}
                                  autoComplete="off"
                                  value={formState.message}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                  onKeyDown={handleKeyDown}
                                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                                  className="absolute inset-0 w-full h-full bg-transparent border-none outline-none p-0 text-sm resize-none text-transparent caret-transparent"
                                />
                              </div>
                            ) : (
                              <div className="relative flex items-center">
                                <div className="relative">
                                  <span className={cn(
                                    "whitespace-pre font-mono text-sm",
                                    isDark ? "text-white" : "text-zinc-900"
                                  )}>
                                    {formState[steps[step].key as keyof typeof formState] || (
                                      <span className="text-zinc-500/50">{steps[step].placeholder}</span>
                                    )}
                                    {!isSubmitting && isFocused && <span className="terminal-cursor" />}
                                  </span>
                                </div>
                                <input 
                                  ref={inputRef as any}
                                  type={steps[step].id === 'email' ? 'email' : 'text'}
                                  required
                                  spellCheck={false}
                                  autoComplete="off"
                                  value={formState[steps[step].key as keyof typeof formState]}
                                  onFocus={() => setIsFocused(true)}
                                  onBlur={() => setIsFocused(false)}
                                  onKeyDown={handleKeyDown}
                                  onChange={(e) => setFormState({...formState, [steps[step].key]: e.target.value})}
                                  className="absolute inset-0 w-full bg-transparent border-none outline-none p-0 text-sm text-transparent caret-transparent"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="pt-8 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full animate-pulse",
                          step === steps.length - 1 && formState.message ? "bg-emerald-500" : "bg-zinc-500/30"
                        )} />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                          {step === steps.length - 1 ? "Ready to send" : `Step ${step + 1} of 3`}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        {step > 0 && (
                          <Magnetic strength={0.1}>
                            <Button 
                              type="button"
                              onClick={() => setStep(step - 1)}
                              variant="ghost"
                              className="h-10 px-4 text-[10px] font-mono uppercase tracking-widest interactive"
                            >
                              cd ..
                            </Button>
                          </Magnetic>
                        )}
                        <Magnetic strength={0.1}>
                          <Button 
                            type="submit"
                            disabled={!formState[steps[step].key as keyof typeof formState]}
                            className={cn(
                              "h-10 px-6 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 interactive",
                              isDark
                                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            )}
                          >
                            {step === steps.length - 1 ? "./send_msg" : "Next"}
                          </Button>
                        </Magnetic>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* External Uplinks - Bento Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col"
          >
            <h3 className={cn(
              "text-[10px] font-mono uppercase tracking-[0.3em] mb-6",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              External_Uplinks
            </h3>
            
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* GitHub - Large Card */}
              <Magnetic className="col-span-2" strength={0.1}>
                <motion.a 
                  href="#"
                  whileHover={{ 
                    y: -4, 
                    backgroundColor: "#181717",
                    borderColor: "#181717"
                  }}
                  className="w-full h-full group relative flex flex-col justify-between p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-2xl overflow-hidden"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "p-3 rounded-xl transition-colors duration-500",
                      isDark ? "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-white/20 group-hover:text-white"
                    )}>
                      <Github size={24} />
                    </div>
                    <ExternalLink size={16} className="text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-500" />
                  </div>
                  <div className="mt-4 relative z-10">
                    <span className={cn("text-sm font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-white")}>GitHub</span>
                    <span className={cn("text-[10px] font-mono uppercase tracking-widest transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-white/60")}>github.com/profile</span>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.1] group-hover:text-white transition-all duration-700">
                    <Github size={120} />
                  </div>
                </motion.a>
              </Magnetic>

              {/* LinkedIn - Square Card */}
              <Magnetic className="col-span-1" strength={0.1}>
                <motion.a 
                  href="#"
                  whileHover={{ 
                    y: -4, 
                    backgroundColor: "#0077B5",
                    borderColor: "#0077B5"
                  }}
                  className="w-full h-full group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-500",
                    isDark ? "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-white/20 group-hover:text-white"
                  )}>
                    <Linkedin size={20} />
                  </div>
                  <div className="mt-4">
                    <span className={cn("text-xs font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-white")}>LinkedIn</span>
                    <span className={cn("text-[9px] font-mono uppercase transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-white/60")}>Connect</span>
                  </div>
                </motion.a>
              </Magnetic>

              {/* X (Twitter) - Square Card */}
              <Magnetic className="col-span-1" strength={0.1}>
                <motion.a 
                  href="#"
                  whileHover={{ 
                    y: -4, 
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FFFFFF"
                  }}
                  className="w-full h-full group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-500",
                    isDark ? "bg-white/5 text-white/40 group-hover:bg-black/5 group-hover:text-black" : "bg-zinc-100 text-zinc-500 group-hover:bg-black/5 group-hover:text-black"
                  )}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <div className="mt-4">
                    <span className={cn("text-xs font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-black")}>X</span>
                    <span className={cn("text-[9px] font-mono uppercase transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-black/60")}>Follow</span>
                  </div>
                </motion.a>
              </Magnetic>

              {/* LeetCode - Square Card */}
              <Magnetic className="col-span-1" strength={0.1}>
                <motion.a 
                  href="#"
                  whileHover={{ 
                    y: -4, 
                    backgroundColor: "#FFA116",
                    borderColor: "#FFA116"
                  }}
                  className="w-full h-full group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-500",
                    isDark ? "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-white/20 group-hover:text-white"
                  )}>
                    <Code2 size={20} />
                  </div>
                  <div className="mt-4">
                    <span className={cn("text-xs font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-white")}>LeetCode</span>
                    <span className={cn("text-[9px] font-mono uppercase transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-white/60")}>Solve</span>
                  </div>
                </motion.a>
              </Magnetic>

              {/* Kaggle - Square Card */}
              <Magnetic className="col-span-1" strength={0.1}>
                <motion.a 
                  href="#"
                  whileHover={{ 
                    y: -4, 
                    backgroundColor: "#20BEFF",
                    borderColor: "#20BEFF"
                  }}
                  className="w-full h-full group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                  style={{ 
                    backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                    borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-500",
                    isDark ? "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white" : "bg-zinc-100 text-zinc-500 group-hover:bg-white/20 group-hover:text-white"
                  )}>
                    <Database size={20} />
                  </div>
                  <div className="mt-4">
                    <span className={cn("text-xs font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-white")}>Kaggle</span>
                    <span className={cn("text-[9px] font-mono uppercase transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-white/60")}>Compete</span>
                  </div>
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Footer Integration */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className={cn(
              "text-[11px] font-mono tracking-widest",
              isDark ? "text-white/20" : "text-zinc-400"
            )}>
              © {new Date().getFullYear()} Rohan Shinde. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1">
            <span className={cn(
              "text-[9px] font-mono uppercase tracking-[0.3em]",
              isDark ? "text-emerald-500/60" : "text-emerald-600/60"
            )}>
              Built_With
            </span>
            <span className={cn(
              "text-[10px] font-mono tracking-widest",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              Next.js + Tailwind + Framer
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
