// ============================================================
// Portfolio Data — Gregor Allen B. Mondragon
// ============================================================

export const personal = {
  name: "Gregor Allen B. Mondragon",
  alias: "DevGreg",
  tagline: "Software Engineer",
  subtitle: "BSIT – Software Engineering",
  bio: "I am Gregor Allen B. Mondragon, a dedicated 3rd-year student at the College of Computer Studies, Aklan State University – Kalibo Campus, currently pursuing a Bachelor of Science in Information Technology, majoring in Software Engineering.",
  bio2: "As the sole developer and architect behind this platform, I have meticulously engineered every interaction—from the fluid animations and high-end UI design to the underlying software architecture. This project represents the intersection of my technical expertise and my deep-rooted passion for showcasing Aklan's unmatched beauty to the world through a premium, immersive digital experience.",
  email: "gregor.mondragon@example.com",
  website: "devgreg.dev",
  location: "Aklan, Philippines",
  links: {
    github: "https://github.com/DevGreg",
    linkedin: "https://linkedin.com/in/DevGreg",
    instagram: "https://instagram.com/DevGreg",
  },
};

export const stats = [
  { label: "Total Projects",      value: "11+", icon: "code",  description: "Innovative web solutions crafted" },
  { label: "Certificates",        value: "7",   icon: "award", description: "Professional skills validated" },
  { label: "Years of Experience", value: "3+",  icon: "globe", description: "Continuous learning journey" },
];

export const skills = ["React", "JavaScript", "Node.js", "Tailwind CSS"];

export const techStack = [
  { name: "HTML",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Tailwind",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "ReactJS",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite",         icon: "https://vitejs.dev/logo.svg" },
  { name: "Node JS",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Bootstrap",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "Firebase",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Git",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Vercel",       icon: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
  { name: "VS Code",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

export const projects = [
  {
    id: 1, title: "Aritmatika Solver",
    description: "An intelligent arithmetic solver designed to help users solve math problems automatically with step-by-step solutions and an intuitive interface.",
    tags: ["JavaScript", "React", "Algorithm"],
    liveUrl: "#", detailUrl: "#", featured: true,
    color: "#0066FF",
  },
  {
    id: 2, title: "AutoChat-Discord",
    description: "An automation solution for sending scheduled messages to Discord channels. Users can configure message templates and timing for seamless communication.",
    tags: ["Node.js", "Discord API", "Automation"],
    liveUrl: "#", detailUrl: "#", featured: true,
    color: "#00D4FF",
  },
  {
    id: 3, title: "Buku Catatan",
    description: "A modern note-taking web app enabling users to create, save, and manage notes with a clean, distraction-free interface and local persistence.",
    tags: ["React", "Firebase", "Tailwind"],
    liveUrl: "#", detailUrl: "#", featured: false,
    color: "#0EA5E9",
  },
  {
    id: 4, title: "IT Support Hub",
    description: "A professional platform for IT support services — fast, effective solutions for common technical problems with an organized knowledge base.",
    tags: ["React", "Node.js", "Bootstrap"],
    liveUrl: "#", detailUrl: "#", featured: false,
    color: "#3B82F6",
  },
  {
    id: 5, title: "City Runner Game",
    description: "A fun browser-based endless runner game set in a vibrant pixel-art city. Features smooth controls, obstacles, and a high-score leaderboard.",
    tags: ["JavaScript", "Canvas API", "Game Dev"],
    liveUrl: "#", detailUrl: "#", featured: false,
    color: "#6366F1",
  },
  {
    id: 6, title: "Personal Portfolio v1",
    description: "The first iteration of my personal portfolio — a showcase of projects, skills, and journey as a frontend developer built with pure HTML/CSS.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#", detailUrl: "#", featured: false,
    color: "#0284C7",
  },
];

export const certificates = [
  { title: "Dicoding Front-End Web Basics",  issuer: "Dicoding",    year: "2023" },
  { title: "React JS Fundamentals",          issuer: "Dicoding",    year: "2023" },
  { title: "JavaScript Intermediate",        issuer: "Dicoding",    year: "2022" },
  { title: "Responsive Web Design",          issuer: "freeCodeCamp", year: "2022" },
  { title: "CSS Flexbox & Grid",             issuer: "Scrimba",     year: "2022" },
  { title: "Node.js Basics",                 issuer: "Dicoding",    year: "2023" },
  { title: "Git & GitHub Fundamentals",      issuer: "Dicoding",    year: "2022" },
];

export const navLinks = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact",   href: "#contact" },
];
