// Shared TypeScript types

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseBrightness: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface BioluminescentCanvasProps {
  isDark: boolean;
}