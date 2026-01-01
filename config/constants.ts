import { Project } from "@/lib/types";

// Site-wide constants

export const SITE_CONFIG = {
  name: "Portfolio",
  description: "Interactive Physics // Algorithmic Design",
  author: "Developer",
} as const;

export const HERO_WORDS = ["Engineering", "Ecosystems", "Rooted", "in", "Logic."];

export const PARTICLE_CONFIG = {
  desktop: 750,
  mobile: 80,
  mobileBreakpoint: 768,
} as const;

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Neural Synth",
    description: "AI-driven soundscape generator.",
    longDescription: "A generative audio engine that uses neural networks to synthesize bioluminescent-inspired soundscapes in real-time.",
    tags: ["AI", "Audio", "Generative"],
    stack: ["React", "TensorFlow.js", "Web Audio API"],
    image: "/textures/spider-web.jpeg",
    images: ["/textures/spider-web.jpeg", "/textures/about-frame.jpg", "/textures/spider-web.jpeg"],
    link: "https://example.com",
    github: "https://github.com",
    year: "2024",
    role: "Lead Developer",
  },
  {
    id: "02",
    title: "Eco-Sim",
    description: "Large-scale ecosystem simulator.",
    longDescription: "A high-performance simulation of complex biological systems, modeling predator-prey dynamics and environmental shifts.",
    tags: ["Simulation", "Physics", "WASM"],
    stack: ["Rust", "WebAssembly", "Three.js"],
    image: "/textures/about-frame.jpg",
    images: ["/textures/about-frame.jpg", "/textures/spider-web.jpeg", "/textures/about-frame.jpg"],
    link: "https://example.com",
    github: "https://github.com",
    year: "2023",
    role: "Core Architect",
  },
  {
    id: "03",
    title: "Lichen UI",
    description: "Organic design system component library.",
    longDescription: "A UI library inspired by growth patterns in nature, featuring self-organizing layouts and fluid animations.",
    tags: ["UI/UX", "Design System", "Animation"],
    stack: ["Next.js", "Framer Motion", "Tailwind"],
    image: "/textures/spider-web.jpeg",
    images: ["/textures/spider-web.jpeg", "/textures/about-frame.jpg", "/textures/spider-web.jpeg"],
    link: "https://example.com",
    github: "https://github.com",
    year: "2023",
    role: "UI Engineer",
  },
  {
    id: "04",
    title: "Aether OS",
    description: "Cloud-native operating system interface.",
    longDescription: "A conceptual web-based OS interface focusing on seamless cloud integration and minimalist aesthetics.",
    tags: ["OS", "Cloud", "Interface"],
    stack: ["React", "Node.js", "Socket.io"],
    image: "/textures/about-frame.jpg",
    images: ["/textures/about-frame.jpg", "/textures/spider-web.jpeg", "/textures/about-frame.jpg"],
    link: "https://example.com",
    github: "https://github.com",
    year: "2024",
    role: "Full Stack Developer",
  },
];
