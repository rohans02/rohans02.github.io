"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Send, Github, Twitter, Linkedin, Mail, ExternalLink, ChevronRight } from "lucide-react";
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
    { id: 'name', label: 'Input_Identity', placeholder: 'Enter your name...', key: 'name' },
    { id: 'email', label: 'Input_Endpoint', placeholder: 'Enter your email...', key: 'email' },
    { id: 'message', label: 'Input_Payload', placeholder: 'Enter your message...', key: 'message' },
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
      "Initializing secure handshake...",
      "Encrypting payload with RSA-4096...",
      "Establishing uplink to primary server...",
      "Routing through proxy nodes...",
      "Transmitting data packets...",
      "Finalizing transmission..."
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
            className="lg:col-span-8"
          >
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
              <div className="p-6 font-mono text-sm min-h-[350px] flex flex-col">
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
                      TRANSMISSION SUCCESSFUL
                    </h3>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">
                      Message has been routed to the primary server.
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
                      Send_Another_Packet
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
                          {step === steps.length - 1 ? "Ready_For_Transmission" : `Step_0${step + 1}_Of_03`}
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
                          {step === steps.length - 1 ? "Execute_Send" : "Next_Step"}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* External Uplinks */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="space-y-6">
              <h3 className={cn(
                "text-[10px] font-mono uppercase tracking-[0.3em]",
                isDark ? "text-white/40" : "text-zinc-500"
              )}>
                External_Uplinks
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "GitHub", icon: <Github size={18} />, link: "#", label: "github.com/profile" },
                  { name: "LinkedIn", icon: <Linkedin size={18} />, link: "#", label: "linkedin.com/in/profile" },
                  { name: "Twitter", icon: <Twitter size={18} />, link: "#", label: "twitter.com/profile" },
                  { name: "Email", icon: <Mail size={18} />, link: "mailto:hello@example.com", label: "hello@example.com" },
                ].map((social) => (
                  <motion.a 
                    key={social.name}
                    href={social.link}
                    whileHover={{ x: 4, backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)' }}
                    className="group flex items-center justify-between p-4 rounded-xl border backdrop-blur-md transition-all duration-300 interactive shadow-lg"
                    style={{ 
                      backgroundColor: isDark ? 'rgba(2, 13, 6, 0.2)' : 'rgba(248, 250, 245, 0.2)',
                      borderColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)'
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2 rounded-md transition-colors",
                        isDark ? "bg-white/5 text-white/40 group-hover:text-emerald-500" : "bg-zinc-100 text-zinc-500 group-hover:text-emerald-600"
                      )}>
                        {social.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn("text-xs font-bold", isDark ? "text-white" : "text-zinc-900")}>
                          {social.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {social.label}
                        </span>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
