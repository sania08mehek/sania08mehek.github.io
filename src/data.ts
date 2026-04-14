// Portfolio Data Configuration
// All content is centralized here for easy customization

export const portfolioData = {
  // Personal Information
  personal: {
    greeting: "Hey there! It's",
    name: "Sania Mehek",
    title: "Creative Developer & UI/UX Designer",
    tagline: "Crafting Digital Experiences with Elegance",
    email: "sania08mehek@gmail.com",
    phone: "+91 8618436229",
    location: "Bengaluru , India",
    avatar: "/pfp.jpeg",
    resumeUrl: "#",
    socials: {
      github: "https://github.com/sania08mehek",
      linkedin: "https://www.linkedin.com/in/sania-mehek1508/",
      instagram: "https://www.instagram.com/_.sanu.meee._008/"
    }
  },

  // Navigation Links
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" }
  ],

  // Hero Section
  hero: {
    greeting: "Hey there! It's",
    headline: "Sania Mehek",
    subtitle: "Creative Developer & UI/UX Designer",
    taglines: [
      "Data Analyst",
      "UI/UX Designer",
      "Creative Technologist"
    ],
    description: "I design data-driven solutions where precision meets purpose. Creating models and insights that bring clarity to complex business challenges.",
    ctaPrimary: {
      label: "Download Resume",
      href: "/Resume.pdf"
    },
    ctaSecondary: { 
      label: "About Me",
      href: "#about"
    }
  },

  // About Section
  about: {
    sectionTitle: "About Me",
    sectionSubtitle: "The Story Behind The Code",
    headline: "Passionate About Creating Beautiful Digital Experiences",
    bio: [
      "A Data Science undergraduate with a strong analytical foundation and a deep interest in transforming data into actionable business insights. My work focuses on building end-to-end machine learning solutions that not only perform well technically but also solve real-world problems with measurable impact.",
      "I approach data challenges with a problem-first mindset breaking down complex, ambiguous scenarios into structured, logical components before designing scalable and reproducible solutions. From exploratory data analysis and feature engineering to model development and deployment, I enjoy working across the full data science lifecycle.",
      "With hands-on experience in predictive modeling, time-series analysis, and data visualization, I aim to bridge the gap between raw data and strategic decision-making."
    ],
    stats: [
      { value: "8+", label: "Years Experience" },
      { value: "150+", label: "Projects Completed" },
      { value: "50+", label: "Happy Clients" },
      { value: "12", label: "Awards Won" }
    ],
    image: "/pfp2.jpeg"
  },

  // Skills Section
  skills: {
    sectionTitle: "Tech Skills & Expertise",
    sectionSubtitle: "Technologies I Work With",
    description: "Expertise in the full data science lifecycle, from data exploration and feature engineering to model deployment and visualization.",
    categories: [
      {
        name: "Programming Core",
        icon: "💻",
        skills: [
          { name: "Python (NumPy, Pandas)", level: 95 },
          { name: "R", level: 88 },
          { name: "SQL", level: 75 },
          { name: "Advanced Excel", level: 70 },
          { name: "PyTorch", level: 0, learningSoon: true },
          { name: "HTML & CSS", level: 80 },
          { name: "JavaScript", level: 70 },
        ]
      },
      {
        name: "ML & Analytics",
        icon: "📊",
        skills: [
          { name: "TensorFlow", level: 80, learningSoon: true },
          { name: "Scikit-Learn", level: 85, learningSoon: true },
          { name: "Tableau & PowerBI", level: 90 },
          { name: "Matplotlib & Seaborn", level: 92 },
          { name: "EDA & Insights", level: 95 },
          { name: "Big Data (Spark)", level: 0, learningSoon: true },
        ]
      },
      {
        name: "Databases",
        icon: "🗃️",
        skills: [
          { name: "MySQL", level: 90 },
          { name: "PostgreSQL", level: 70 },
          { name: "MongoDB", level: 0, learningSoon: true },
          { name: "Neo4j", level: 0, learningSoon: true }
        ]
      }
    ],
    tools: [
      { name: "GitHub", icon: "github" },
      { name: "PowerBI", icon: "bar-chart" },
      { name: "VS Code", icon: "terminal" },
      { name: "Tableau", icon: "layout-dashboard" },
      { name: "Leadership", icon: "star" },
      { name: "TensorFlow", icon: "cpu" },
      { name: "Communication", icon: "message-square" },
      { name: "Problem Solving", icon: "brain" }
    ]
  },

  // Projects Section
  projects: {
    sectionTitle: "Featured Projects",
    sectionSubtitle: "A Selection of My Best Work",
    description: "Each project is a unique story of challenges, creativity, and solutions.",
    items: [
      {
        id: 1,
        title: "FinGraphix",
        category: "Financial Forensics",
        description: "A web-based Financial Forensics Engine that processes transaction data and exposes money muling networks through graph analysis and interactive visualization.",
        image: "/fingraphix-logo.jpg",
        technologies: ["Python", "GraphTheory", "FastAPI", "React"],
        liveUrl: "https://fin-graphix-79n1.vercel.app/",
        githubUrl: "https://github.com",
        featured: true
      },
      {
        id: 2,
        title: "InsiderNavs",
        category: "Indoor Navigation",
        description: "A smart indoor navigation & information system designed with a custom graph DB, OSM data and a routing engine, combining it with a locally optimized data layer for fast, offline-friendly access.",
        image: "/mainLogo.jpg",
        technologies: ["React", "D3.js", "Node.js"],
        liveUrl: "#",
        githubUrl: "https://github.com",
        featured: true
      },
      {
        id: 3,
        title: "RouteSaathi",
        category: "Fleet Management",
        description: "An AI-powered fleet management prototype designed to modernize the BMTC by bridging the gap between control centers and on-field conductors.",
        image: "/RouteSaathi_logo.png",
        technologies: ["React Native", "Firebase"],
        liveUrl: "https://routesaathi-prototype.vercel.app/",
        githubUrl: "https://github.com",
        featured: true
      },
      {
        id: 4,
        title: "InternSaathi",
        category: "Internship Platform",
        description: "A student-friendly internship recommendation platform designed for inclusivity and low-bandwidth environments.",
        image: "/logo_sih.png",
        technologies: ["Python", "TensorFlow", "Vue.js"],
        liveUrl: "#",
        githubUrl: "https://github.com/sania08mehek/InternSaathi",
        featured: false
      },
      {
        id: 5,
        title: "CraftFolio",
        category: "Portfolio",
        description: "A professional portfolio website recommendation platform designed for inclusivity and low-bandwidth environments.",
        image: "/Portfolio.png",
        technologies: ["Python", "TensorFlow", "Vue.js"],
        liveUrl: "#",
        githubUrl: "https://sania08mehek.github.io",
        featured: false
      },
      {
        id: 6,
        title: "Portfolio Website",
        category: "Portfolio",
        description: "A professional portfolio website recommendation platform designed for inclusivity and low-bandwidth environments.",
        image: "/Portfolio.png",
        technologies: ["Python", "TensorFlow", "Vue.js"],
        liveUrl: "#",
        githubUrl: "https://sania08mehek.github.io",
        featured: false
      }
    ]
  },

  // Certifications Section
  certifications: {
    sectionTitle: "Certifications",
    sectionSubtitle: "Professional Credentials",
    items: [
      {
        title: "AWS Solutions Architect",
        issuer: "Amazon Web Services",
        date: "Issued 2023 • Valid through 2026",
        icon: "award"
      },
      {
        title: "Meta Frontend Developer",
        issuer: "Meta (Facebook)",
        date: "Issued 2023 • No Expiration",
        icon: "code-2"
      },
      {
        title: "Certified Ethical Hacker",
        issuer: "EC-Council",
        date: "Issued 2022 • Valid through 2025",
        icon: "shield"
      },
      {
        title: "Google UX Design",
        issuer: "Google",
        date: "Issued 2022 • No Expiration",
        icon: "layout"
      },
      {
        title: "TensorFlow Developer",
        issuer: "Google DeepMind",
        date: "Issued 2023 • No Expiration",
        icon: "brain"
      },
      {
        title: "Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        date: "Issued 2023 • Valid through 2026",
        icon: "server"
      }
    ]
  },

  // Contact Section
  contact: {
    sectionTitle: "Get In Touch",
    sectionSubtitle: "Let's Create Something Beautiful",
    headline: "Have a project in mind?",
    description: "I'm always excited to collaborate on new projects and bring creative ideas to life. Whether you have a specific vision or just a spark of an idea, let's talk.",
    email: "sania08mehek@gmail.com",
    phone: "+91 8618436229",
    location: "Bengaluru , India",
    availability: "Open for freelance projects",
    formFields: {
      name: {
        label: "Your Name",
        placeholder: "ABC"
      },
      email: {
        label: "Email Address",
        placeholder: "name@email.com"
      },
      subject: {
        label: "Subject",
        placeholder: "Collab Discussion"
      },
      message: {
        label: "Your Message",
        placeholder: "Tell me about your project..."
      }
    },
    submitButton: "Send Message"
  },

  // Footer
  footer: {
    tagline: "Crafting digital experiences with passion and precision.",
    copyright: "© 2026 Sania Mehek. Built with Passion and 🍵",
    quickLinks: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Certifications", href: "#certifications" },
      { label: "Contact", href: "#contact" }
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/sania08mehek", icon: "Github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sania-mehek1508/", icon: "Linkedin" }
    ]
  }
};

export type PortfolioData = typeof portfolioData;
