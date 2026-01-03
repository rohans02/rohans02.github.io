"use client";

import { motion } from "framer-motion";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
import { THEME } from "@/config";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";
import { ThemeToggle } from "./theme-toggle";

interface FloatingDockProps {
  isDark: boolean;
  onToggle: () => void;
  activeSection: string;
  className?: string;
  animateEntrance?: boolean;
}

export function FloatingDock({ isDark, onToggle, activeSection, className, animateEntrance = true }: FloatingDockProps) {
  const items = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  const theme = isDark ? THEME.dark : THEME.light;

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.scrollTo(element);
      } else {
        const top = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={animateEntrance ? { y: -100, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: animateEntrance ? 0.3 : 0 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-xl border ${className || "z-50"}`}
      style={{ 
        borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
        backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)'
      }}
    >
      <div className="flex gap-4 md:gap-6">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Magnetic key={item.id} strength={0.2}>
              <motion.button
                onClick={() => scrollToSection(item.id)}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 relative group interactive",
                  isActive ? "text-emerald-500" : (isDark ? "text-white/40" : "text-black/40")
                )}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="activeDot"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 0.5
                    }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  />
                )}

                {/* Tooltip */}
                <span className={cn(
                  "absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap",
                  isDark ? "bg-zinc-900 text-white border border-white/10" : "bg-white text-black border border-zinc-200"
                )}>
                  {item.label}
                </span>
              </motion.button>
            </Magnetic>
          );
        })}

        <div className={cn("w-px h-8 self-center mx-1", isDark ? "bg-white/10" : "bg-black/10")} />
        
        <ThemeToggle 
          isDark={isDark} 
          onToggle={onToggle} 
          className="!p-2 !border-none !bg-transparent !backdrop-blur-none" 
        />
      </div>
    </motion.nav>
  );
}
