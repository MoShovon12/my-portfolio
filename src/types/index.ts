// ─────────────────────────────────────────────
//  Portfolio TypeScript Interfaces
// ─────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface HeroData {
  name: string;
  title: string;
  tagline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutData {
  bio: string;
  profileImage: string;
  resumeUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  type?: 'job' | 'project';   // 'project' = industrial/academic project
  description: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade?: string;
  location: string;
}

export type SkillCategory =
  | 'Languages'
  | 'Frameworks & Libraries'
  | 'Data & Analytics'
  | 'AI & Machine Learning'
  | 'Tools & DevOps'
  | 'Cloud & Databases'
  | 'Other';

export interface Skill {
  name: string;
  category: SkillCategory;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeUrl?: string;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];       // full author list
  venue: string;           // conference / journal
  year: string;
  status: 'published' | 'in-progress' | 'preprint';
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactData {
  formspreeId: string;
  email: string;
  socials: SocialLink[];
}

// ─── Root data shape ────────────────────────
export interface PortfolioData {
  nav: NavLink[];
  hero: HeroData;
  about: AboutData;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: Skill[];
  certifications: Certification[];
  publications: Publication[];
  contact: ContactData;
}
