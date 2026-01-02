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
  activeSection?: 'hero' | 'about' | 'projects' | 'experience' | 'contact';
}
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  stack: string[];
  image: string;
  images?: string[];
  link: string;
  github?: string;
  year: string;
  role: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
  status: "active" | "completed";
}
