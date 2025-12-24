"use client";

import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail } from "lucide-react";
import { THEME } from "@/config";

interface FloatingDockProps {
  isDark: boolean;
  className?: string;
  animateEntrance?: boolean;
}

export function FloatingDock({ isDark, className, animateEntrance = true }: FloatingDockProps) {
  const items = [
    { icon: Code2, label: "Projects" },
    { icon: Github, label: "GitHub" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Mail, label: "Email" },
  ];

  const theme = isDark ? THEME.dark : THEME.light;

  return (
    <motion.nav
      initial={animateEntrance ? { y: -100, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: animateEntrance ? 0.3 : 0 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-xl border ${className || "z-50"}`}
      style={{ 
        borderColor: theme.glassBorder,
        backgroundColor: isDark ? "rgba(30, 30, 30, 0.4)" : "rgba(225, 225, 225, 0.4)"
      }}
    >
      <div className="flex gap-6">
        {items.map((item) => (
          <motion.button
            key={item.label}
            whileHover={{ 
              scale: 1.2, 
              y: -5,
              color: theme.primary 
            }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg"
            style={{ color: theme.foreground }}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
