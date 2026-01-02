"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  isDark: boolean;
  activeSection: string;
}

export function CustomCursor({ isDark, activeSection }: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Faster, snappier spring for the ring to reduce perceived lag
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Reactive offsets for crosshair lines - following the ring
  const topY = useTransform(ringY, (val) => val - 20);
  const bottomY = useTransform(ringY, (val) => val + 20);
  const leftX = useTransform(ringX, (val) => val - 20);
  const rightX = useTransform(ringX, (val) => val + 20);

  const getSectionColor = () => {
    switch (activeSection) {
      case 'about': return isDark ? "bg-cyan-400" : "bg-cyan-600";
      case 'projects': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      case 'experience': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      case 'contact': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      default: return isDark ? "bg-emerald-500" : "bg-emerald-600";
    }
  };

  const getSectionBorderColor = () => {
    switch (activeSection) {
      case 'about': return isDark ? "border-cyan-400/30" : "border-cyan-600/30";
      case 'projects': return isDark ? "border-emerald-500/30" : "border-emerald-600/30";
      case 'experience': return isDark ? "border-emerald-500/30" : "border-emerald-600/30";
      case 'contact': return isDark ? "border-emerald-500/30" : "border-emerald-600/30";
      default: return isDark ? "border-emerald-500/30" : "border-emerald-600/30";
    }
  };

  const getSectionLineColor = () => {
    switch (activeSection) {
      case 'about': return isDark ? "bg-cyan-400" : "bg-cyan-600";
      case 'projects': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      case 'experience': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      case 'contact': return isDark ? "bg-emerald-500" : "bg-emerald-600";
      default: return isDark ? "bg-emerald-500" : "bg-emerald-600";
    }
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.interactive') ||
        target.classList.contains('interactive') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 hidden md:block" style={{ cursor: 'none' }}>
      {/* Main Cursor Dot - Raw position for zero latency */}
      <motion.div
        className={cn(
          "absolute w-2 h-2 rounded-full transition-colors duration-300",
          getSectionColor()
        )}
        animate={{
          scale: isClicking ? 0.5 : 1,
        }}
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Outer Ring / Crosshair - Spring position for smooth follow */}
      <motion.div
        className={cn(
          "absolute border transition-all duration-300",
          getSectionBorderColor()
        )}
        animate={{
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
          rotate: isHovering ? 90 : 0,
          scale: isClicking ? 0.8 : 1,
          opacity: isClicking ? 0.8 : 1,
        }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", borderRadius: isHovering ? "4px" : "50%" }}
      />

      {/* Crosshair Lines (Visible on hover) */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute w-px h-2 -translate-x-1/2", getSectionLineColor())}
              style={{ x: ringX, y: topY, translateX: "-50%" }}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute w-px h-2 -translate-x-1/2", getSectionLineColor())}
              style={{ x: ringX, y: bottomY, translateX: "-50%" }}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute h-px w-2 -translate-y-1/2", getSectionLineColor())}
              style={{ x: leftX, y: ringY, translateY: "-50%" }}
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn("absolute h-px w-2 -translate-y-1/2", getSectionLineColor())}
              style={{ x: rightX, y: ringY, translateY: "-50%" }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
