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
  
  // Smoother, more fluid spring for the follow effect
  const springConfig = { damping: 35, stiffness: 250, mass: 0.8 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const getSectionColor = () => {
    return "text-[#0095FF]"; // Rocket Blue
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
      {/* Rocket / Arrow Container */}
      <motion.div
        style={{ 
          x: cursorX, 
          y: cursorY, 
          translateX: "-50%", 
          translateY: "-50%",
          rotate: -20 // Standard cursor tilt
        }}
        className="relative flex flex-col items-center"
      >
        {/* Main Arrow Shape */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            scale: isClicking ? 0.85 : isHovering ? 1.1 : 1,
            y: isHovering ? -3 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn("drop-shadow-[0_0_8px_rgba(0,149,255,0.5)]", getSectionColor())}
        >
          <path
            d="M12 3L4 19C4 19 10 17 12 17C14 17 20 19 20 19L12 3Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Animated Trail Lines - "Rain Effect" */}
        <div className={cn("absolute top-[16px] flex gap-1 items-start", isHovering ? "opacity-100" : "opacity-0")}>
          <AnimatePresence>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  y: [0, 12],
                  opacity: 1,
                  height: [2, 6, 2],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4 + (i * 0.1),
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
                className={cn(
                  "w-[1px] rounded-full",
                  i === 1 ? "bg-[#FFD60A]" : "bg-[#0095FF]"
                )}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
