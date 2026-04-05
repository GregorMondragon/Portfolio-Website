// ============================================================
// Portfolio Data — Gregor Allen B. Mondragon
// ============================================================

export const personal = {
  name: "Gregor Allen B. Mondragon",
  alias: "DevGreg",
  tagline: "Software Engineer",
  subtitle: "BSIT – Software Engineering",
  // GEMINI API KEY for ChatBot (Temporary frontend exposure for local development)
  geminiKey: "AIzaSyAayAxFEIZ-izyd5FKUiaLWxmYEGwvRk_Y",
  bio: "I am Gregor Allen B. Mondragon, a Software Engineer dedicated to architecting high-performance web solutions and premium digital experiences. I specialize in bridging complex technical requirements with elite UI/UX design, offering scalable full-stack development that exceeds expectations and delivers high-impact results.",
  bio2: "As the sole developer and architect behind this platform, I have meticulously engineered every interaction—from the fluid animations and high-end UI design to the underlying software architecture. This project represents the intersection of my technical expertise and my deep-rooted passion for showcasing Aklan's unmatched beauty to the world through a premium, immersive digital experience.",
  email: "gregormondragon16@gmail.com",
  website: "devgreg.dev",
  location: "Aklan, Philippines",
  links: {
    github: "https://github.com/GregorMondragon",
    linkedin: "https://linkedin.com/in/DevGreg",
    facebook: "https://www.facebook.com/gregorallenbarrientosmondragon/",
    instagram: "https://www.instagram.com/grgrllnmndrgn/",
    telegram: "https://t.me/grgrllnmndrgn",
  },
};

export const stats = [
  { label: "Total Projects", value: "4+", icon: "code", description: "Innovative web solutions crafted" },
  { label: "Certificates", value: "5", icon: "award", description: "Professional skills validated" },
  { label: "Years of Experience", value: "3+", icon: "globe", description: "Continuous learning journey" },
];

export const skills = ["React", "JavaScript", "Framer", "Node.js", "MongoDB", "and many more"];

export const techStack = [
  {
    category: "Front-End (Client-Side)",
    techs: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Vite", icon: "https://vitejs.dev/logo.svg" },
    ]
  },
  {
    category: "Back-End (Server-Side)",
    techs: [
      { name: "Node JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ]
  },
  {
    category: "Database Layer",
    techs: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ]
  },
  {
    category: "Creative & Prototyping Tools",
    techs: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Antigravity", icon: "/Images/Antigravity.jpg" },
      { name: "Claude", icon: "/Images/Claude.svg" },
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Wonders of Aklan",
    description: "A premium tourism platform meticulously designed to showcase the natural beauty and cultural heritage of Aklan through an immersive digital experience.",
    extendedDescription: "This project serves as a digital gateway to Aklan's most breathtaking destinations. It features high-resolution imagery, historical context, and an intuitive travel guide interface, all wrapped in a premium, fluid UI designed for modern explorers.",
    tags: ["React", "UI/UX", "Tourism"],
    image: "/Images/image.png",
    liveUrl: "https://aklan-tourism.vercel.app/",
    detailUrl: "#",
    status: "Deployed",
    color: "#0066FF",
  },
  {
    id: 2,
    title: "Banana Leaf Disease Detection",
    description: "An AI-driven agricultural solution leveraged for identifying diseases in banana leaves through image analysis, helping farmers protect their crops.",
    extendedDescription: "Developing a robust machine learning model to assist local farmers. The application uses specialized computer vision algorithms to detect early signs of Sigatoka and Panama disease, providing actionable insights directly to the user's mobile device.",
    tags: ["AI/ML", "Image Analysis", "In Progress"],
    image: "/Images/Musaic.png",
    liveUrl: "#",
    detailUrl: "#",
    status: "Developing",
    color: "#10B981",
  },
  {
    id: 3,
    title: "Weather Map - API",
    description: "A dynamic weather visualization tool utilizing real-time API data to provide interactive global weather patterns and forecasts.",
    extendedDescription: "A comprehensive weather dashboard that visualizes global atmospheric data in real-time. It integrates multiple API layers to show temperature heatmaps, wind vectors, and severe weather alerts with a dark-mode optimized GIS interface.",
    tags: ["API", "Geography", "Real-time"],
    image: "public/images/showcase/weather.png",
    liveUrl: "#",
    detailUrl: "#",
    status: "Developing",
    color: "#0EA5E9",
  },
  {
    id: 4,
    title: "Portfolio Version 1",
    description: "The initial foundation of my web presence, showcasing early explorations in structural web engineering and minimalist design principles.",
    extendedDescription: "My first foray into professional web development. This project focused on mastering the fundamentals of semantic HTML, responsive CSS architecture, and the beginning of my obsession with smooth, meaningful animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/Images/image copy.png",
    liveUrl: "#",
    detailUrl: "#",
    status: "Deployed",
    color: "#6366F1",
  },
];

export const certificates = [
  { title: "Web Development & Mobile App Design", issuer: "ActiveLearning, Inc. (Philippines)", year: "2026" },
  { title: "Google UX Design Professional Certificate", issuer: "Google", year: "2026" },
  { title: "Android Development", issuer: "Coursera", year: "2026" },
  { title: "Front-End Developer Professional Certificate", issuer: "Coursera", year: "2026" },
  { title: "Back-End Developer Professional Certificate", issuer: "Coursera", year: "2026" },
];

export const academic = {
  degree: "Bachelor of Science in Information Technology",
  major: "Major in Software Engineering",
  institution: "Aklan State University – College of Computer Studies",
  period: "2023 — Present",
  timeline: [
    {
      id: "01",
      year: "First Year",
      title: "The Foundations",
      focus: "Logic & Structural Web",
      concepts: ["OOP", "Data Structures", "Algorithms"],
      stack: ["Java", "HTML5", "CSS3"],
      project: "Personal Portfolio v1 — A minimalist introduction to web presence.",
      icon: "code"
    },
    {
      id: "02",
      year: "Second Year",
      title: "The Systems",
      focus: "Data Architecture & Networking",
      concepts: ["SQL", "Systems Integration", "Network Protocols"],
      stack: ["Advanced Java", "MySQL", "Cisco"],
      project: "Wonder of Aklan — A curated tourism platform showcasing local destinations with a clean, aesthetic UI.",
      icon: "database"
    },
    {
      id: "03",
      year: "Third Year",
      title: "The Modern Stack",
      focus: "Full-Stack & Quality Assurance",
      concepts: ["SQA", "API Design", "Component Architecture"],
      stack: ["React", "Node.js", "Express", "MongoDB"],
      project: "Banana Leaf Disease Detection — An AI-driven application designed to identify agricultural threats through image analysis.",
      status: "In Progress",
      icon: "layers"
    },
    {
      id: "04",
      year: "Current Focus",
      title: "Current Focus",
      status: "Building & Researching",
      deepDives: ["Advanced React Patterns", "Backend Scalability", "UI/UX Minimalism"],
      goal: "Bridging academic theory with industry-grade software deployment.",
      icon: "activity"
    }
  ]
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Academic", href: "#academic" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];
