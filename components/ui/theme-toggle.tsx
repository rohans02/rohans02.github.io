"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-xl border overflow-hidden ${
        isDark
          ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
          : "border-[#1A2F1A]/20 bg-[#1A2F1A]/5 hover:bg-[#1A2F1A]/10"
      }`}
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
          <Sun className="w-5 h-5 text-yellow-400" />
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
          <Moon className="w-5 h-5 text-[#1A2F1A]" />
        </motion.div>
      </div>

      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{
          boxShadow: isDark
            ? "0 0 20px rgba(250, 204, 21, 0.3)"
            : "0 0 20px rgba(26, 47, 26, 0.15)",
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
