/**
 * Central Content Management File
 *
 * Manage all website content from this single file.
 * Update any text, links, or data here and it will reflect across the entire website.
 */

// ============================================
// SITE METADATA & BRANDING
// ============================================
export const siteMetadata = {
  name: "DROX",
  fullName: "DRO X",
  tagline: "Building exceptional digital experiences and web solutions.",
  description:
    "Building exceptional digital experiences and web solutions. We transform bold ideas into powerful digital realities.",
  logo: {
    text: "DRO",
    highlight: "X",
  },
  badge: {
    text: "DROX Your TECH Partner",
  },
};

// ============================================
// NAVIGATION
// ============================================
export const navigation = {
  items: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    // { label: "Projects", href: "#portfolio" },
    // { label: "Process", href: "#process" },
    // { label: "Reviews", href: "#testimonials" },
  ],
  contactButton: {
    text: "Contact Now",
    href: "/contact",
  },
};

// ============================================
// HOMEPAGE CONTENT
// ============================================
export const homepage = {
  hero: {
    title: {
      part1: "Make",
      part2: "Beautiful",
      part3: "Digital Experiences",
    },
    subtitle: "Beautiful, fast and modern web solutions.",
    ctaButtons: [
      {
        text: "Documentation",
        href: "#",
        variant: "primary" as const,
      },
      {
        text: "GitHub",
        href: "https://github.com",
        variant: "bordered" as const,
        icon: "github",
      },
    ],
  },
  features: {
    title: "Features",
  },
  lastSection: {
    title: {
      part1: "Last",
      part2: "but",
      part3: "not",
      part4: "least.",
    },
    description: "Building exceptional digital experiences.",
  },
};

// ============================================
// ABOUT PAGE CONTENT
// ============================================
export const aboutPage = {
  hero: {
    title: {
      part1: "Building",
      part2: "Tomorrow's",
      part3: "Digital",
      part4: "Experiences",
      part5: "Today",
    },
    subtitle:
      "We are passionate creators and strategic thinkers dedicated to turning ambitious visions into extraordinary digital realities.",
  },
  mission: {
    title: "Our Mission",
    paragraphs: [
      "Our mission is crystal clear: to empower smart brands with exceptional digital solutions that drive growth and create meaningful connections. We believe technology should serve people, not the other way around.",
      "Every line of code we write, every design we craft, and every strategy we develop is centered around one goal—your success. We're not just service providers; we're your partners in building a digital future that matters.",
    ],
  },
  vision: {
    title: "Our Vision",
    paragraphs: [
      "To be the catalyst that transforms ideas into digital masterpieces. We envision a world where every brand has the tools, insights, and support needed to create unforgettable online experiences that resonate deeply with their audience.",
      "Through innovation, creativity, and unwavering dedication, we strive to set new standards in digital excellence and help our clients achieve remarkable success in their digital journey.",
    ],
  },
  values: {
    title: "What Sets Us Apart",
    subtitle:
      "Our unique combination of expertise, passion, and commitment makes us the ideal choice for your digital journey",
    items: [
      {
        title: "Innovation First",
        description:
          "We push boundaries and explore cutting-edge technologies to deliver solutions that set you apart.",
        gradient: "from-violet-400 to-purple-600",
      },
      {
        title: "Client-Centric",
        description:
          "Your success is our priority. We build lasting partnerships through transparent communication.",
        gradient: "from-pink-400 to-rose-600",
      },
      {
        title: "Technical Excellence",
        description:
          "Clean, scalable code and best practices ensure your project stands the test of time.",
        gradient: "from-blue-400 to-cyan-600",
      },
      {
        title: "Design-Driven",
        description:
          "Beautiful, intuitive interfaces that create memorable user experiences and drive conversions.",
        gradient: "from-yellow-400 to-orange-600",
      },
      {
        title: "Results-Oriented",
        description:
          "Every project is built with clear objectives and measurable outcomes in mind.",
        gradient: "from-green-400 to-emerald-600",
      },
      {
        title: "Collaborative Spirit",
        description:
          "We work as an extension of your team, bringing expertise and enthusiasm to every project.",
        gradient: "from-cyan-400 to-blue-600",
      },
    ],
  },
  story: {
    title: {
      part1: "From Vision to Reality:",
      part2: "Our Journey",
    },
    paragraphs: [
      "At DROX, we've built more than a company—we've cultivated a culture where creativity meets craftsmanship, and every project is infused with collaboration, passion, and purpose.",
      "Our team is the heartbeat of everything we do. It's not just about working together, but growing together—facing challenges head-on, celebrating victories big and small, and evolving as a unified force. We believe that the best results come from teams that are genuinely invested in each other's success.",
      "DROX is more than a workplace; it's a journey powered by ambition, unity, and unwavering dedication. Every client we serve, every project we complete, and every relationship we build is a testament to our commitment to excellence and our belief in the transformative power of great digital experiences.",
    ],
  },
  milestones: [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started with a vision to transform digital experiences",
    },
    {
      year: "2022",
      title: "Rapid Growth",
      description: "Expanded our team and delivered 50+ successful projects",
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Recognized as a leading creative technology partner",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanding our reach and serving clients worldwide",
    },
    {
      year: "2026",
      title: "Innovation Leader",
      description:
        "Setting new standards in digital transformation and innovation",
    },
  ],
  cta: {
    title: "Ready to Start Your Journey?",
    description:
      "Let's transform your vision into a digital reality. Get in touch and discover how we can elevate your brand.",
    buttonText: "Let's Talk",
    buttonHref: "/contact",
  },
};

// ============================================
// SERVICES PAGE CONTENT
// ============================================
export const servicesPage = {
  hero: {
    title: {
      part1: "Our",
      part2: "Services",
    },
    subtitle:
      "Comprehensive digital solutions tailored to your business needs. From concept to launch, we're with you every step of the way.",
  },
  services: {
    title: "What We Offer",
    subtitle:
      "A full spectrum of digital services to help your business thrive in the digital age",
    items: [
      {
        title: "Web Development",
        description:
          "Custom web applications built with modern technologies. From responsive websites to complex web platforms, we deliver scalable solutions that perform.",
        gradient: "from-violet-400 to-purple-600",
        features: [
          "React & Next.js Development",
          "Full-Stack Solutions",
          "API Integration",
          "Performance Optimization",
        ],
      },
      {
        title: "Mobile App Development",
        description:
          "Native and cross-platform mobile applications for iOS and Android. We create intuitive, high-performance apps that users love.",
        gradient: "from-blue-400 to-cyan-600",
        features: [
          "iOS & Android Apps",
          "React Native Development",
          "UI/UX Design",
          "App Store Optimization",
        ],
      },
      {
        title: "UI/UX Design",
        description:
          "Beautiful, user-centered designs that combine aesthetics with functionality. We create interfaces that engage users and drive conversions.",
        gradient: "from-pink-400 to-rose-600",
        features: [
          "User Research",
          "Wireframing & Prototyping",
          "Visual Design",
          "Design Systems",
        ],
      },
      {
        title: "E-Commerce Solutions",
        description:
          "Complete e-commerce platforms that drive sales. From product catalogs to payment integration, we build online stores that convert.",
        gradient: "from-yellow-400 to-orange-600",
        features: [
          "Online Store Development",
          "Payment Gateway Integration",
          "Inventory Management",
          "Analytics & Reporting",
        ],
      },
      {
        title: "Digital Marketing",
        description:
          "Data-driven marketing strategies that grow your business. We help you reach the right audience and maximize your ROI.",
        gradient: "from-green-400 to-emerald-600",
        features: [
          "SEO & SEM",
          "Social Media Marketing",
          "Content Strategy",
          "Analytics & Insights",
        ],
      },
      {
        title: "Maintenance & Support",
        description:
          "Ongoing support and maintenance to keep your digital assets running smoothly. We ensure your systems stay updated and secure.",
        gradient: "from-cyan-400 to-blue-600",
        features: [
          "24/7 Monitoring",
          "Security Updates",
          "Performance Tuning",
          "Technical Support",
        ],
      },
    ],
  },
  process: {
    title: {
      part1: "Our",
      part2: "Process",
    },
    subtitle: "A proven methodology that ensures successful project delivery",
    steps: [
      {
        title: "Discovery",
        description:
          "We start by understanding your business, goals, and challenges to create a tailored strategy.",
        gradient: "from-violet-400 to-purple-600",
      },
      {
        title: "Planning",
        description:
          "Our team designs a comprehensive roadmap with clear milestones and deliverables.",
        gradient: "from-blue-400 to-cyan-600",
      },
      {
        title: "Development",
        description:
          "We build your solution using best practices, ensuring quality and scalability.",
        gradient: "from-pink-400 to-rose-600",
      },
      {
        title: "Testing & Launch",
        description:
          "Rigorous testing ensures everything works perfectly before we launch your project.",
        gradient: "from-green-400 to-emerald-600",
      },
      {
        title: "Optimization",
        description:
          "We continuously monitor and optimize to ensure peak performance and results.",
        gradient: "from-yellow-400 to-orange-600",
      },
    ],
  },
  stats: {
    title: "Why Choose DROX?",
    subtitle: "What sets us apart in delivering exceptional digital solutions",
    items: [
      {
        value: "15+",
        label: "Projects Delivered",
        description:
          "Successfully completed projects across various industries",
      },
      {
        value: "100%",
        label: "Client Satisfaction",
        description: "Our clients love working with us and keep coming back",
      },
      {
        value: "24/7",
        label: "Support Available",
        description:
          "Round-the-clock support to keep your business running smoothly",
      },
    ],
  },
  cta: {
    title: "Ready to Get Started?",
    description:
      "Let's discuss how we can help transform your digital presence and achieve your business goals.",
    buttonText: "Get in Touch",
    buttonHref: "/contact",
  },
};

// ============================================
// CONTACT PAGE CONTENT
// ============================================
export const contactPage = {
  hero: {
    title: {
      part1: "Get in",
      part2: "Touch",
    },
    subtitle:
      "Have a project in mind? Let's discuss how we can bring your vision to life. We're here to help.",
  },
  contactInfo: {
    email: {
      address: "droxdev100@gmail.com",
      link: "mailto:droxdev100@gmail.com",
    },
    phone: {
      number: "+91 8111807089",
      display: "+91 8111807089",
      link: "tel:+918111807089",
      whatsapp: "918111807089", // For WhatsApp (no + or spaces)
    },
    location: {
      address: "Hilite Business Park, Calicut, Kerala, India",
      link: "#",
    },
  },
  form: {
    title: {
      part1: "Send us a",
      part2: "Message",
    },
    subtitle:
      "Fill out the form below and we'll get back to you as soon as possible",
    fields: {
      name: {
        label: "Name",
        placeholder: "Your name",
      },
      email: {
        label: "Email",
        placeholder: "your.email@example.com",
      },
      subject: {
        label: "Subject",
        placeholder: "What's this about?",
      },
      message: {
        label: "Message",
        placeholder: "Tell us about your project...",
      },
    },
    submitButton: {
      text: "Send Message",
      loadingText: "Sending...",
    },
  },
  social: {
    title: "Connect With Us",
    subtitle:
      "Follow us on social media to stay updated with our latest projects and insights",
    links: [
      {
        name: "GitHub",
        url: "https://github.com/droxhub",
        gradient: "from-gray-400 to-gray-600",
      },
      {
        name: "Whatsapp",
        url: "https://wa.me/918111807089",
        gradient: "from-blue-400 to-blue-600",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/company/drox-dev/?viewAsMember=true",
        gradient: "from-blue-500 to-blue-700",
      },
      {
        name: "Instagram",
        url: "https://instagram.com",
        gradient: "from-pink-400 to-purple-600",
      },
    ],
  },
  officeHours: {
    title: "Office Hours",
    hours: [
      {
        day: "Monday - Friday",
        time: "9:00 AM - 6:00 PM",
      },
      {
        day: "Saturday",
        time: "10:00 AM - 4:00 PM",
      },
      {
        day: "Sunday",
        time: "Closed",
      },
    ],
  },
  responseTime: {
    title: "Response Time",
    description:
      "We typically respond to inquiries within 24 hours. For urgent matters, please call us directly or use our priority support channel.",
    time: "24 hours",
  },
};

// ============================================
// FOOTER CONTENT
// ============================================
export const footer = {
  copyright: {
    text: `© ${new Date().getFullYear()} DROX. All rights reserved.`,
  },
};

// ============================================
// SOCIAL MEDIA LINKS
// ============================================
export const socialLinks = {
  github: "https://github.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
  discord: "#",
  sponsor: "#",
};

// ============================================
// EXPORT ALL CONTENT
// ============================================
export const websiteContent = {
  siteMetadata,
  navigation,
  homepage,
  aboutPage,
  servicesPage,
  contactPage,
  footer,
  socialLinks,
};

export type WebsiteContent = typeof websiteContent;
