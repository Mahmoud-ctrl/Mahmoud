// SIGNAL — single source of truth for all portfolio content.

export interface Social {
  label: string;
  handle: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  phoneHref: string;
  cvUrl: string;
  socials: Social[];
  stats: Stat[];
}

export interface Capability {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  results: string;
  tags: string[];
  years: string;
  approach: string;
  image: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  index: string;
  title: string;
  year: number;
  category: string;
  pitch: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl: string;
  liveLabel: string;
  githubUrl: string;
  image: string;
}

export const profile: Profile = {
  name: 'Mahmoud Baderaldin',
  role: 'Full-Stack Engineer',
  tagline: 'Crafting digital experiences that matter — from sleek frontends to robust backends.',
  location: 'Lebanon',
  availability: 'Open for work',
  email: 'baderaldinmahmud@gmail.com',
  phone: '+961 71 736695',
  phoneHref: 'tel:+96171736695',
  cvUrl: 'https://lebwork.b-cdn.net/stuff/Mahmoud_Baderaldin_CV.docx',
  socials: [
    { label: 'GitHub', handle: '@Mahmoud-ctrl', href: 'https://github.com/Mahmoud-ctrl' },
    {
      label: 'LinkedIn',
      handle: 'mahmoud-baderaldin',
      href: 'https://www.linkedin.com/in/mahmoud-baderaldin-540399378/',
    },
  ],
  stats: [
    { label: 'Experience', value: '4+ YRS' },
    { label: 'Products live', value: '04' },
    { label: 'Based in', value: 'LEBANON 33.8°N' },
    { label: 'Available', value: 'WORLDWIDE' },
  ],
};

export const manifesto = {
  eyebrow: '00 / MANIFESTO',
  // Rendered word-by-word; `noise` gets struck through, `signal` ignites in accent.
  sentence:
    'Most of the web is noise. I build signal — products that load fast, work everywhere, and make money.',
  strikeWord: 'noise.',
  accentWord: 'signal',
};

export const about = {
  eyebrow: '01 / THE OPERATOR',
  pullQuote: 'Great software is built by people who refuse to ship mediocre things.',
  paragraphs: [
    "I'm Mahmoud — a full-stack engineer from Lebanon shipping products for clients worldwide. I own the whole stack: interface, API, database, deployment. No hand-offs, no excuses.",
    'I specialize in building web applications that are fast, reliable, and scalable. My focus is on creating products that not only look good but also perform well under pressure.',
  ],
  photoCaption: 'IMG_2025 — SOMEWHERE ABOVE SEA LEVEL, LEBANON',
  facts: [
    { label: 'Location', value: 'Lebanon → Worldwide' },
    { label: 'Focus', value: 'Full-stack product engineering' },
    { label: 'Stack', value: 'TS · React · Node · Flask · Postgres' },
    { label: 'Status', value: 'Open for work' },
  ],
};

export const capabilities: Capability[] = [
  {
    index: '01',
    title: 'Frontend Development',
    subtitle: 'User Interface Mastery',
    description:
      'Building modern, responsive web applications with React and Next.js. Pixel-perfect interfaces that work seamlessly across all devices and browsers.',
    results: '50+ responsive web applications built with 99.9% uptime',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    years: '4+ YRS',
    approach: 'Component-Driven',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    index: '02',
    title: 'Backend Development',
    subtitle: 'Server-Side Architecture',
    description:
      'Robust backend systems with Node.js and Flask. RESTful APIs and microservices that handle complex business logic efficiently.',
    results: 'APIs serving 10M+ requests monthly with 99.95% reliability',
    tags: ['Node.js', 'Flask', 'REST APIs', 'GraphQL'],
    years: '3+ YRS',
    approach: 'Security-First',
    image:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1200&auto=format&fit=crop',
  },
  {
    index: '03',
    title: 'Database Design',
    subtitle: 'Data Architecture',
    description:
      'Efficient database schemas and query optimization for maximum performance, across SQL and NoSQL.',
    results: 'Database queries optimized to run 300% faster on average',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
    years: '3+ YRS',
    approach: 'Performance-Focused',
    image:
      '/database-design.png',
  },
  {
    index: '04',
    title: 'Full-Stack Development',
    subtitle: 'End-to-End Development',
    description:
      'Connecting frontend and backend seamlessly — smooth data flow and optimal user experience across the entire stack.',
    results: 'Complete web applications delivered 40% faster than industry average',
    tags: ['Full-Stack', 'API Integration', 'State Management', 'Real-time Data'],
    years: '4+ YRS',
    approach: 'System Thinking',
    image:
      '/full-stack.png',
  },
  {
    index: '05',
    title: 'Cloud Deployment',
    subtitle: 'DevOps & Hosting',
    description:
      'Cloud deployments with CI/CD pipelines. Scalable, secure, and monitored in production.',
    results: 'Zero-downtime deployments with automated scaling and monitoring',
    tags: ['Vercel', 'VPS', 'Docker', 'CI/CD'],
    years: '2+ YRS',
    approach: 'Automation-First',
    image:
      '/AI-cloud.webp',
  },
  {
    index: '06',
    title: 'Performance Optimization',
    subtitle: 'Speed & Efficiency',
    description:
      'Core Web Vitals, SEO, and user experience — making sure your site loads fast and ranks well.',
    results: 'Average 85% improvement in page load speeds and SEO scores',
    tags: ['Web Vitals', 'SEO', 'Bundle Optimization', 'Caching'],
    years: '3+ YRS',
    approach: 'Metrics-Driven',
    image:
      '/performance-optimization.png',
  },
];

export const projects: Project[] = [
  {
    index: '01',
    title: 'Drape AI',
    year: 2026,
    category: 'Fashion / AI',
    pitch:
      'Transforms static garment photos into 4K video fashion campaigns.',
    stack: ['Next.js', 'Python', 'AI', "PostgreSQL"],
    metrics: [
      { label: 'Engine', value: 'AI Fashion' },
      { label: 'Market', value: 'Fashion' },
      { label: 'Status', value: 'LIVE' },
    ],
    liveUrl: 'https://drapenow.com',
    liveLabel: 'drapenow.com',
    githubUrl: 'https://github.com/Mahmoud-ctrl/Drape',
    image: '/drape.png',
  },
  {
    index: '02',
    title: 'Volt-UI',
    year: 2026,
    category: 'Npm / Open Source',
    pitch:
      'Volt UI is a library of production-ready, animated UI components designed for Next.js projects. It provides a seamless developer experience with pre-built components. With 1.5k+ Monthly Downloads, Volt UI is a popular choice for React and TypeScript developers.',
    stack: ['Next.js', 'TypeScript', 'npm', 'Tailwind'],
    metrics: [
      { label: 'Engine', value: 'Volt UI' },
      { label: 'Market', value: 'Npm' },
      { label: 'Status', value: 'LIVE' },
    ],
    liveUrl: 'https://volt-ui-two.vercel.app/',
    liveLabel: 'volt-ui-two.vercel.app',
    githubUrl: 'https://github.com/Mahmoud-ctrl/Volt-UI',
    image: '/volt-ui.png',
  },
  {
    index: '03',
    title: 'LEBWORK',
    year: 2025,
    category: 'Freelance Marketplace',
    pitch:
      'A freelance marketplace where businesses and freelancers collaborate — project management, secure payments, real-time chat, AI-powered insights.',
    stack: ['React', 'Flask', 'PostgreSQL', 'Whish Money'],
    metrics: [
      { label: 'Payments', value: 'Whish Money' },
      { label: 'Realtime', value: 'Chat + Notifications' },
      { label: 'Status', value: 'LIVE' },
    ],
    liveUrl: 'https://lebwork.net',
    liveLabel: 'lebwork.net',
    githubUrl: 'https://github.com/Mahmoud-ctrl/Lebwork',
    image: 'https://lebwork.b-cdn.net/stuff/f62008a8edae4c43ba4e6957d8a05e78.png',
  },
  {
    index: '04',
    title: 'XSIGNALS AI',
    year: 2025,
    category: 'Crypto / AI',
    pitch:
      'Trading intelligence that turns market complexity into precise, AI-powered signals for consistently profitable decisions.',
    stack: ['React', 'Python', 'Blockchain', 'AI'],
    metrics: [
      { label: 'Engine', value: 'AI Signals' },
      { label: 'Market', value: 'Crypto' },
      { label: 'Status', value: 'LIVE' },
    ],
    liveUrl: 'https://xsignalsai.com',
    liveLabel: 'xsignalsai.com',
    githubUrl: 'https://github.com/Mahmoud-ctrl/XSignalsAI',
    image: 'https://lebwork.b-cdn.net/stuff/1440x0.jpg',
  }
];

export const marqueeItems = [
  'NEXT.JS',
  'TYPESCRIPT',
  'REACT',
  'NODE.JS',
  'FLASK',
  'POSTGRESQL',
  'MONGODB',
  'REDIS',
  'DOCKER',
  'CI/CD',
  'GRAPHQL',
  'TAILWIND',
];

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const contactSubjects = [
  'Frontend Development',
  'Backend Development',
  'Fullstack Development',
  'Database Design',
  'Cloud Deployment',
  'Performance Optimization',
  'Other',
];

export const bootLog = [
  '$ ssh mahmoud@production',
  '> authenticating... ok',
  '> loading portfolio v3.0.0',
  '> 4 products live. 0 excuses.',
];
