"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ isDark, onToggle, className }: ThemeToggleProps) {
  return (
    <Magnetic strength={0.3}>
      <motion.button
        onClick={onToggle}
        className={cn(
          "z-100 p-3 rounded-full border backdrop-blur-xl transition-all duration-500 interactive",
          className
        )}
        style={{ 
          backgroundColor: isDark ? 'rgba(2, 13, 6, 0.4)' : 'rgba(248, 250, 245, 0.4)',
          borderColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'
        }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Toggle Theme"
      >
        <div className="relative w-5 h-5">
          {/* Sun Icon */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              scale: isDark ? 1 : 0,
              rotate: isDark ? 0 : 90,
              opacity: isDark ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Sun className="w-5 h-5 text-emerald-500" />
          </motion.div>

          {/* Moon Icon */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{
              scale: isDark ? 0 : 1,
              rotate: isDark ? -90 : 0,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Moon className="w-5 h-5 text-emerald-600" />
          </motion.div>
        </div>

        {/* Decorative corner accents */}
        <div className={cn(
          "absolute -top-px -left-px w-2 h-2 border-t border-l rounded-tl-full transition-colors duration-500",
          isDark ? "border-emerald-500/40" : "border-emerald-600/40"
        )} />
        <div className={cn(
          "absolute -bottom-px -right-px w-2 h-2 border-b border-r rounded-br-full transition-colors duration-500",
          isDark ? "border-emerald-500/40" : "border-emerald-600/40"
        )} />
      </motion.button>
    </Magnetic>
  );
}
