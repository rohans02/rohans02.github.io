// Shared TypeScript types

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseBrightness: number;
  homeX: number;  // Original/target position for this section
  homeY: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface BioluminescentCanvasProps {
  isDark: boolean;
  scrollProgress?: number;
  activeSection?: 'hero' | 'about' | 'projects' | 'contact';
}