"use client";

import { motion, AnimatePresence } from "framer-motion";
import { THEME } from "@/config";
import { useEffect, useState } from "react";
import "./loading.css";

interface LoadingScreenProps {
  isDark: boolean;
  onLoadingComplete?: () => void;
}

export function LoadingScreen({ isDark, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Number of vertical blocks for the exit animation
  const BLOCKS = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const theme = isDark ? THEME.dark : THEME.light;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 pointer-events-none overflow-hidden">
          {/* Vertical Blocks Exit Animation */}
          <div className="absolute inset-0 flex">
            {[...Array(BLOCKS)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                exit={{ 
                  y: "-100%",
                  transition: { 
                    duration: 0.8, 
                    ease: [0.645, 0.045, 0.355, 1], // cubic-bezier for smooth acceleration
                    delay: i * 0.05 
                  } 
                }}
                className="h-full flex-1 bg-black"
              />
            ))}
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              y: -20,
              transition: { duration: 0.4, ease: "easeIn" } 
            }}
            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative flex flex-col items-center space-y-12">
            {/* Ghost Animation from Uiverse.io */}
            <div id="ghost">
              <div id="red">
                <div id="pupil"></div>
                <div id="pupil1"></div>
                <div id="eye"></div>
                <div id="eye1"></div>
                <div id="top0"></div>
                <div id="top1"></div>
                <div id="top2"></div>
                <div id="top3"></div>
                <div id="top4"></div>
                <div id="st0"></div>
                <div id="st1"></div>
                <div id="st2"></div>
                <div id="st3"></div>
                <div id="st4"></div>
                <div id="st5"></div>
                <div id="an1"></div>
                <div id="an2"></div>
                <div id="an3"></div>
                <div id="an4"></div>
                <div id="an5"></div>
                <div id="an6"></div>
                <div id="an7"></div>
                <div id="an8"></div>
                <div id="an9"></div>
                <div id="an10"></div>
                <div id="an11"></div>
                <div id="an12"></div>
                <div id="an13"></div>
                <div id="an14"></div>
                <div id="an15"></div>
                <div id="an16"></div>
                <div id="an17"></div>
                <div id="an18"></div>
              </div>
              <div id="shadow"></div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-48 h-0.5 bg-muted/20 overflow-hidden rounded-full">
              <motion.div
                className="h-full"
                style={{ backgroundColor: `#0c8aff` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Subtle Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: theme.muted }}
            >
              Initializing Ecosystem
            </motion.p>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
