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
    location: "Bangalore , India",
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
    headline: "Sania Mehek",
    subtitle: "Creative Developer & UI/UX Designer",
    taglines: [
      "Data Analyst",
      "UI/UX Designer",
      "Creative Technologist"
    ],
    description: "I craft elegant digital experiences that blend aesthetics with functionality. Specializing in creating immersive web applications with a touch of luxury.",
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
      "Creative Developer with experience specializing in building exceptional digital experiences. I bridge the gap between design and technology, creating interfaces that are both beautiful and functional.",
      "My expertise spans across modern frontend frameworks, UI/UX design principles, and performance optimization. I'm passionate about creating immersive web experiences that leave lasting impressions.",
      "Based in Bangalore, I collaborate with startups and established brands to bring their visions to life through clean code and thoughtful design."
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
    sectionTitle: "Skills & Expertise",
    sectionSubtitle: "Technologies I Work With",
    description: "A blend of technical expertise and creative vision, honed through years of building digital products.",
    categories: [
      {
        name: "Frontend",
        icon: "🎨",
        skills: [
          { name: "HTML5", level: 95 },
          { name: "CSS3", level: 95 },
          { name: "JavaScript", level: 68 },
          { name: "Bootstrap & Tailwind", level: 80 },
          { name: "React", level: 60 },
          { name: "Next.js", level: 0, learningSoon: true }
        ]
      },
      {
        name: "Backend",
        icon: "⚙️",
        skills: [
          { name: "Python – Flask", level: 75 },
          { name: "Python – FastAPI", level: 60 },
          { name: "PHP", level: 40 },
          { name: "Node.js", level: 0, learningSoon: true },
          { name: "TypeScript", level: 0, learningSoon: true }
        ]
      },
      {
        name: "Databases",
        icon: "🗃️",
        skills: [
          { name: "MySQL", level: 90 },
          { name: "PostgreSQL", level: 70 },
          { name: "MongoDB", level: 0, learningSoon: true },
          { name: "Redis", level: 0, learningSoon: true }
        ]
      }
    ],
    tools: [
      { name: "GitHub", icon: "github" },
      { name: "PostgreSQL", icon: "database" },
      { name: "VS Code", icon: "terminal" },
      { name: "Neo4j", icon: "share-2" },
      { name: "Leadership", icon: "star" },
      { name: "AWS", icon: "cloud" }
      
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
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
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
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
        technologies: ["Python", "TensorFlow", "Vue.js"],
        liveUrl: "#",
        githubUrl: "https://github.com/sania08mehek/InternSaathi",
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
    location: "Banglore , India",
    availability: "Open for freelance projects",
    formFields: {
      name: {
        label: "Your Name",
        placeholder: "MR.IR"
      },
      email: {
        label: "Email Address",
        placeholder: "callme_x@gmail.com"
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
