export type Locale = "th" | "en";

export interface LocalizedText {
  th: string;
  en: string;
}

export interface Profile {
  fullName: string;
  nickname: string;
  title: LocalizedText;
  summary: LocalizedText;
  email: string;
  phone?: string;
  location?: string;
  skills: Record<Locale, string[]>;
  languages: { name: string; level: LocalizedText }[];
  education: {
    degree: LocalizedText;
    institution: string;
    period: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: LocalizedText;
  period: string;
  bullets: Record<Locale, string[]>;
  achievements?: Record<Locale, string[]>;
}

export interface ProjectItem {
  slug: string;
  title: LocalizedText;
  role: LocalizedText;
  context: LocalizedText;
  challenge: LocalizedText;
  tools: Record<Locale, string[]>;
  actions: Record<Locale, string[]>;
  outcomes: Record<Locale, string[]>;
  evidenceType: LocalizedText;
  tags: string[];
  featured: boolean;
}

export interface CertificateItem {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  issuer: string;
  issueDate: string;
  category: string;
  fileUrl?: string;
  previewImage?: string;
  credentialId?: string;
  featured?: boolean;
  placeholder?: boolean;
}
