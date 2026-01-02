"use client";

import { useState, useRef } from "react";
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
import { Button } from "@/components/ui/button";

interface ContactProps {
  isDark: boolean;
}

export function Contact({ isDark }: ContactProps) {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const steps = [
    { id: 'name', label: 'Your Name', placeholder: 'Enter your name...', key: 'name' },
    { id: 'email', label: 'Email Address', placeholder: 'Enter your email...', key: 'email' },
    { id: 'message', label: 'Your Message', placeholder: 'How can I help you?', key: 'message' },
  ];

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
    setLogs([]);
    
    const sequence = [
      "Preparing message...",
      "Securing connection...",
      "Connecting to server...",
      "Sending data...",
      "Message delivered!"
    ];

    for (const msg of sequence) {
      addLog(msg);
      await new Promise(resolve => setTimeout(resolve, 600));
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
      className="relative z-10 pt-24 pb-12 px-4 overflow-hidden bg-transparent"
    >
      {/* Background Grid System */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
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
              ~/src/contact/
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
            establish_uplink.sh
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Terminal Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="space-y-2">
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
              className="rounded-xl border overflow-hidden backdrop-blur-xl transition-all duration-500 shadow-2xl"
              style={{ 
                backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                borderColor: isDark ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.1)'
              }}
            >
              {/* Terminal Header */}
              <div className={cn(
                "px-4 py-3 border-b flex items-center justify-between",
                isDark ? "bg-black/20 border-white/5" : "bg-black/5 border-zinc-200"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className={cn(
                    "flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest",
                    isDark ? "text-emerald-400/60" : "text-emerald-600/60"
                  )}>
                    <Terminal size={12} />
                    <span>bash — 80x24 — establish_uplink.sh</span>
                  </div>
                </div>
                <div className="w-10" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm flex flex-col min-h-98">
                {isSent ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 py-8 text-center my-auto"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <Send className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className={cn("text-lg font-bold", isDark ? "text-white" : "text-zinc-900")}>
                      MESSAGE SENT
                    </h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">
                      Thank you! I'll get back to you as soon as possible.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setIsSent(false);
                        setStep(0);
                        setFormState({ name: "", email: "", message: "" });
                        setLogs([]);
                      }}
                      className="mt-6 text-[10px] uppercase tracking-widest interactive"
                    >
                      Send_Another_Message
                    </Button>
                  </motion.div>
                ) : isSubmitting ? (
                  <div className="space-y-2 py-4">
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-emerald-500/80 text-xs"
                      >
                        {log}
                      </motion.div>
                    ))}
                    <motion.div 
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-2 h-4 bg-emerald-500 inline-block ml-1"
                    />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <div className="space-y-6 flex-1">
                      {/* History of completed steps */}
                      {steps.slice(0, step).map((s, i) => (
                        <div key={s.id} className="flex items-start gap-3 opacity-50">
                          <span className="text-emerald-500 mt-1">
                            <ChevronRight size={14} />
                          </span>
                          <div className="flex-1">
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                              {s.label}
                            </div>
                            <div className={cn(isDark ? "text-white" : "text-zinc-900")}>
                              {formState[s.key as keyof typeof formState]}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Current active step */}
                      <motion.div 
                        key={steps[step].id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-emerald-500 mt-1">
                          <ChevronRight size={14} />
                        </span>
                        <div className="flex-1 space-y-1">
                          <label className="text-[10px] text-zinc-500 uppercase tracking-widest">
                            {steps[step].label}
                          </label>
                          {steps[step].id === 'message' ? (
                            <textarea 
                              autoFocus
                              required
                              placeholder={steps[step].placeholder}
                              rows={4}
                              value={formState.message}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => setFormState({...formState, message: e.target.value})}
                              className={cn(
                                "w-full bg-transparent border-none outline-none p-0 text-sm resize-none transition-colors",
                                isDark ? "text-white placeholder:text-white/10" : "text-zinc-900 placeholder:text-zinc-300"
                              )}
                            />
                          ) : (
                            <input 
                              autoFocus
                              type={steps[step].id === 'email' ? 'email' : 'text'}
                              required
                              placeholder={steps[step].placeholder}
                              value={formState[steps[step].key as keyof typeof formState]}
                              onKeyDown={handleKeyDown}
                              onChange={(e) => setFormState({...formState, [steps[step].key]: e.target.value})}
                              className={cn(
                                "w-full bg-transparent border-none outline-none p-0 text-sm transition-colors",
                                isDark ? "text-white placeholder:text-white/10" : "text-zinc-900 placeholder:text-zinc-300"
                              )}
                            />
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="pt-8 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full animate-pulse",
                          step === steps.length - 1 && formState.message ? "bg-emerald-500" : "bg-zinc-500/30"
                        )} />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                          {step === steps.length - 1 ? "Ready to send" : `Step ${step + 1} of 3`}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        {step > 0 && (
                          <Button 
                            type="button"
                            onClick={() => setStep(step - 1)}
                            variant="ghost"
                            className="h-10 px-4 text-[10px] font-mono uppercase tracking-widest interactive"
                          >
                            Back
                          </Button>
                        )}
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
                          {step === steps.length - 1 ? "Send Message" : "Next"}
                        </Button>
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
            className="lg:col-span-4 space-y-6"
          >
            <h3 className={cn(
              "text-[10px] font-mono uppercase tracking-[0.3em]",
              isDark ? "text-white/40" : "text-zinc-500"
            )}>
              External_Uplinks
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* GitHub - Large Card */}
              <motion.a 
                href="#"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "#181717",
                  borderColor: "#181717"
                }}
                className="col-span-2 group relative flex flex-col justify-between p-6 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-2xl overflow-hidden"
                style={{ 
                  backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
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
                <div className="mt-8 relative z-10">
                  <span className={cn("text-sm font-bold block transition-colors duration-500", isDark ? "text-white" : "text-zinc-900", "group-hover:text-white")}>GitHub</span>
                  <span className={cn("text-[10px] font-mono uppercase tracking-widest transition-colors duration-500", isDark ? "text-white/40" : "text-zinc-500", "group-hover:text-white/60")}>github.com/profile</span>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.1] group-hover:text-white transition-all duration-700">
                  <Github size={120} />
                </div>
              </motion.a>

              {/* LinkedIn - Square Card */}
              <motion.a 
                href="#"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "#0077B5",
                  borderColor: "#0077B5"
                }}
                className="col-span-1 group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                style={{ 
                  backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
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

              {/* X (Twitter) - Square Card */}
              <motion.a 
                href="#"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF"
                }}
                className="col-span-1 group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                style={{ 
                  backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
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

              {/* LeetCode - Square Card */}
              <motion.a 
                href="#"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "#FFA116",
                  borderColor: "#FFA116"
                }}
                className="col-span-1 group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                style={{ 
                  backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
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

              {/* Kaggle - Square Card */}
              <motion.a 
                href="#"
                whileHover={{ 
                  y: -4, 
                  backgroundColor: "#20BEFF",
                  borderColor: "#20BEFF"
                }}
                className="col-span-1 group flex flex-col justify-between p-5 rounded-2xl border backdrop-blur-xl transition-all duration-500 interactive shadow-xl"
                style={{ 
                  backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
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
      </div>
    </section>
  );
}
