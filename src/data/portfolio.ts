import type { PortfolioData } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
//  ALL PORTFOLIO CONTENT LIVES HERE
//  Edit this file to update the website — no need to touch components.
// ─────────────────────────────────────────────────────────────────────────────

const portfolio: PortfolioData = {
  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    { label: 'About',           href: '#about' },
    { label: 'Experience',      href: '#experience' },
    { label: 'Skills',          href: '#skills' },
    { label: 'Certifications',  href: '#certifications' },
    { label: 'Contact',         href: '#contact' },
  ],

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    name: 'Muhammad Ohiduzzaman',
    title: 'Software Product Engineer & Data Professional',
    tagline:
      'Building production-grade web apps and end-to-end data solutions — from React UIs to ML models and BI dashboards.',
    ctaPrimary:   { label: 'View My Work',  href: '#experience' },
    ctaSecondary: { label: 'Get In Touch',  href: '#contact' },
  },

  // ── About ──────────────────────────────────────────────────────────────────
  about: {
    bio: `Results-driven Software Product Engineer and Data Professional with a solid foundation in Computer Science and advanced expertise in Data Science, AI, and full-stack product delivery.

I specialise in building production-grade web applications and end-to-end data workflows — from front-end engineering and UX design through to data pipeline development, BI reporting, machine learning, and predictive modelling.

With a proven track record in aviation-domain platforms, I translate complex operational requirements into scalable, reliable software and actionable data insights that improve decision-making and business performance. My experience spans cloud platforms, big data ecosystems, real-time analytics, and cross-functional delivery within Agile teams.`,
    profileImage: '/profile.jpg',
    resumeUrl: '/resume.pdf',
  },

  // ── Experience ─────────────────────────────────────────────────────────────
  experience: [
    {
      id: 'exp-1',
      company: 'CymrAI Software Solutions',
      role: 'Software Product Engineer',
      startDate: 'Nov 2025',
      endDate: 'Present',
      location: 'Greater Cardiff Area · Hybrid',
      type: 'job',
      description: [
        'Build data-heavy screens (tables, forms, workflow views), consistent UX states (loading/empty/error), and clear interaction patterns using JavaScript, React, TypeScript, and Tailwind CSS.',
        'Collaborate closely with developers and operational stakeholders to support inventory visibility and compliance-driven processes, translating complex needs into working features.',
        'Handle cross-stack integration including REST API integration, request/response mapping, validation, and structured error handling across UI → API → database.',
        'Support backend updates: implementing CRUD logic, enhancing API routing, and investigating data issues through query analysis and end-to-end debugging for correctness and traceability.',
        'Bridge communication between users, developers, and stakeholders; work within Azure DevOps (boards, PRs, reviews) with awareness of CI/CD pipelines and release workflows.',
      ],
      technologies: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Azure DevOps'],
    },
    {
      id: 'exp-2',
      company: 'CymrAI Software Solutions',
      role: 'Lead Data & BI Analyst',
      startDate: 'Jun 2025',
      endDate: 'Dec 2025',
      location: 'Cardiff, Wales',
      type: 'job',
      description: [
        'Owned end-to-end BI lifecycle: defining and standardising KPIs, translating stakeholder needs into analytical requirements, and delivering interactive Power BI reporting on operational performance, compliance status, risks, and opportunities.',
        'Built and maintained clean data pipelines — profiling datasets, resolving quality issues, normalising schemas, and implementing repeatable transformation logic (deduplication, validation rules, standardised mappings, reliable joins).',
        'Performed deep-dive investigations to identify trends and root causes; supported planning with forecasting and scenario insights; implemented rule-based alerts and exception reporting for proactive decision-making.',
        'Delivered BI for aviation inventory and compliance workflows, aligning data models with operational processes and providing reporting that supports traceability, audit readiness, and decision-making.',
        'Contributed to R&D work involving student mental health data, applying careful data handling, insight generation, and responsible analysis.',
      ],
      technologies: ['Power BI', 'SQL', 'Python', 'Pandas', 'Excel', 'Azure DevOps'],
    },
    {
      id: 'exp-3',
      company: 'University of South Wales',
      role: 'Data Analyst — ANA The Chatbot',
      startDate: 'Jan 2025',
      endDate: 'Present',
      location: 'University of South Wales',
      type: 'job',
      description: [
        'Analysing user queries to identify common issues, trends, and gaps in the chatbot\'s performance.',
        'Creating visualisations and dashboards to communicate findings to the development team.',
        'Suggesting improvements to enhance chatbot responses based on data-driven insights.',
      ],
      technologies: ['Python', 'Data Visualisation', 'Dashboarding'],
    },
    {
      id: 'exp-4',
      company: 'University of South Wales',
      role: 'Student Ambassador',
      startDate: 'Sep 2023',
      endDate: 'Jan 2025',
      location: 'University of South Wales',
      type: 'job',
      description: [
        'Provided front-line technical support for students, resolving IT-related issues including account access, software installation, Wi-Fi connectivity, and platform troubleshooting (Moodle, email).',
        'Acted as a bridge between IT services and students, delivering clear guidance and onboarding support during peak academic periods.',
        'Monitored and analysed student support data to identify common technical challenges, helping streamline IT support processes and improve response times.',
        'Played a key role in improving student engagement and satisfaction by combining technical problem-solving with data-driven support strategies.',
      ],
      technologies: ['IT Support', 'Data Analysis', 'Student Engagement'],
    },
    {
      id: 'exp-5',
      company: 'University of South Wales',
      role: 'Industrial Project — Student Mental Health Analysis',
      startDate: 'Jun 2023',
      endDate: 'Aug 2024',
      location: 'University of South Wales',
      type: 'project',
      description: [
        'Conducted a full-cycle data analysis project on mental health trends among students.',
        'Applied machine learning models (logistic regression, decision trees) to identify high-risk groups and behavioural patterns.',
        'Developed survey and data collection tools, cleaned large datasets, and presented findings to university stakeholders.',
      ],
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Data Collection', 'Predictive Modelling'],
    },
  ],

  // ── Education ──────────────────────────────────────────────────────────────
  education: [
    {
      id: 'edu-1',
      institution: 'University of South Wales',
      degree: 'M.Sc',
      field: 'Data Science',
      startYear: '2022',
      endYear: '2023',
      location: 'Wales, UK',
    },
    {
      id: 'edu-2',
      institution: 'Daffodil International University',
      degree: 'B.Sc',
      field: 'Computer Science',
      startYear: '2016',
      endYear: '2020',
      location: 'Dhaka, Bangladesh',
    },
  ],

  // ── Skills ─────────────────────────────────────────────────────────────────
  skills: [
    // Languages
    { name: 'JavaScript',     category: 'Languages', level: 'expert' },
    { name: 'TypeScript',     category: 'Languages', level: 'expert' },
    { name: 'Python',         category: 'Languages', level: 'expert' },
    { name: 'SQL',            category: 'Languages', level: 'advanced' },
    { name: 'HTML / CSS',     category: 'Languages', level: 'expert' },
    // Frameworks & Libraries
    { name: 'React',          category: 'Frameworks & Libraries', level: 'expert' },
    { name: 'Tailwind CSS',   category: 'Frameworks & Libraries', level: 'expert' },
    { name: 'Pandas',         category: 'Frameworks & Libraries', level: 'expert' },
    { name: 'REST APIs',      category: 'Frameworks & Libraries', level: 'advanced' },
    // Data & Analytics
    { name: 'Power BI',       category: 'Data & Analytics', level: 'expert' },
    { name: 'Data Visualisation', category: 'Data & Analytics', level: 'expert' },
    { name: 'ETL Pipelines',  category: 'Data & Analytics', level: 'advanced' },
    { name: 'Big Data',       category: 'Data & Analytics', level: 'advanced' },
    { name: 'Forecasting',    category: 'Data & Analytics', level: 'advanced' },
    { name: 'Excel',          category: 'Data & Analytics', level: 'advanced' },
    // AI & Machine Learning
    { name: 'Machine Learning',    category: 'AI & Machine Learning', level: 'advanced' },
    { name: 'Deep Learning',       category: 'AI & Machine Learning', level: 'intermediate' },
    { name: 'Predictive Modelling',category: 'AI & Machine Learning', level: 'advanced' },
    { name: 'Computer Vision',     category: 'AI & Machine Learning', level: 'intermediate' },
    { name: 'AI Integration',      category: 'AI & Machine Learning', level: 'advanced' },
    // Tools & DevOps
    { name: 'Git',            category: 'Tools & DevOps', level: 'expert' },
    { name: 'Azure DevOps',   category: 'Tools & DevOps', level: 'advanced' },
    { name: 'CI/CD',          category: 'Tools & DevOps', level: 'intermediate' },
    // Cloud & Databases
    { name: 'Cloud Databases',category: 'Cloud & Databases', level: 'intermediate' },
    // Other
    { name: 'Agile / Scrum',  category: 'Other', level: 'advanced' },
    { name: 'IoT Integration',category: 'Other', level: 'intermediate' },
  ],

  // ── Certifications ─────────────────────────────────────────────────────────
  certifications: [
    {
      id: 'cert-1',
      name: 'Business Communication',
      issuer: 'Daffodil International University',
      issueDate: '2018',
      description:
        'Completed Business Communication course at DIU in 2018, developing professional writing, presentation and interpersonal communication skills.',
    },
    {
      id: 'cert-2',
      name: 'Student Mentor Scheme',
      issuer: 'University of South Wales',
      issueDate: '2024',
      description:
        'Supported students as a mentor and IT ambassador at USW, resolving tech issues and providing academic guidance and onboarding support.',
    },
  ],

  // ── Publications ───────────────────────────────────────────────────────────
  publications: [
    {
      id: 'pub-1',
      title:
        'AI-Powered Physical Activity Monitoring: A Foundation for Social Prescribing',
      authors: [
        'Md Shoreef Uddin',
        'Muhammad Ohiduzzaman Shovon',
        'Mabrouka Abuhmida',
      ],
      venue:
        'International Conference on Emerging Technologies in Computing (iCETiC) 2025',
      year: '2025',
      status: 'in-progress',
    },
  ],

  // ── Contact ────────────────────────────────────────────────────────────────
  contact: {
    formspreeId: 'YOUR_FORMSPREE_ID', // ← replace with your Formspree form ID
    email: 'mohiduzzaman1434@gmail.com',
    socials: [
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/muhammad-ohiduzzaman',
        icon: 'linkedin',
      },
      {
        platform: 'GitHub',
        url: 'https://github.com/MoShovon12',
        icon: 'github',
      },
    ],
  },
};

export default portfolio;
