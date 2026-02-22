import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["th", "en"];
export const defaultLocale: Locale = "th";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const navItems = [
  { href: "", key: "home" },
  { href: "/about", key: "about" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/certificates", key: "certificates" },
  { href: "/contact", key: "contact" },
] as const;

export type Dictionary = {
  brand: string;
  nav: Record<(typeof navItems)[number]["key"], string>;
  home: {
    introLabel: string;
    ctaExperience: string;
    ctaProjects: string;
    ctaCertificates: string;
    keyHighlights: string;
    yearsExp: string;
    metricRenewal: string;
    metricAutomation: string;
  };
  about: {
    title: string;
    summaryTitle: string;
    skillsTitle: string;
    educationTitle: string;
    languagesTitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
    achievements: string;
  };
  projects: {
    title: string;
    subtitle: string;
    role: string;
    context: string;
    challenge: string;
    tools: string;
    actions: string;
    outcomes: string;
    evidenceType: string;
  };
  certificates: {
    title: string;
    subtitle: string;
    allCategories: string;
    allYears: string;
    preview: string;
    download: string;
    placeholder: string;
    issueDate: string;
    credentialId: string;
    category: string;
    noMatch: string;
    close: string;
    previewUnavailable: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  common: {
    footer: string;
    localeSwitch: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  th: {
    brand: "Sukanya Kijjapalo (Fern)",
    nav: {
      home: "หน้าหลัก",
      about: "เกี่ยวกับ",
      experience: "ประวัติการทำงาน",
      projects: "ผลงาน",
      certificates: "ใบ Certificate",
      contact: "ติดต่อ",
    },
    home: {
      introLabel: "Coordination & Operations Support Professional",
      ctaExperience: "ดูประสบการณ์",
      ctaProjects: "ดูผลงาน",
      ctaCertificates: "ดู Certificate",
      keyHighlights: "จุดเด่น",
      yearsExp: "ประสบการณ์มากกว่า 4 ปี",
      metricRenewal: "อัตราต่ออายุใบรับรองมากกว่า 90%",
      metricAutomation: "CRM Auto-Alert ลดงานซ้ำมากกว่า 30%",
    },
    about: {
      title: "เกี่ยวกับ Sukanya",
      summaryTitle: "Professional Summary",
      skillsTitle: "ทักษะหลัก",
      educationTitle: "การศึกษา",
      languagesTitle: "ภาษา",
    },
    experience: {
      title: "ประวัติการทำงาน",
      subtitle: "เส้นทางการทำงานด้านห้องปฏิบัติการและการประสานงานลูกค้า",
      achievements: "ผลงานที่วัดผลได้",
    },
    projects: {
      title: "ผลงานเด่น",
      subtitle: "Case studies จากการทำงานจริง",
      role: "บทบาท",
      context: "บริบท",
      challenge: "โจทย์",
      tools: "เครื่องมือ/กระบวนการ",
      actions: "สิ่งที่ดำเนินการ",
      outcomes: "ผลลัพธ์",
      evidenceType: "หลักฐานผลงาน",
    },
    certificates: {
      title: "คลัง Certificate",
      subtitle: "จัดเก็บใบรับรองและเอกสารประกอบแบบค้นหาได้",
      allCategories: "ทุกหมวดหมู่",
      allYears: "ทุกปี",
      preview: "ดูตัวอย่าง",
      download: "ดาวน์โหลด",
      placeholder: "รออัปโหลดไฟล์จริง",
      issueDate: "ออกเมื่อ",
      credentialId: "Credential ID",
      category: "หมวดหมู่",
      noMatch: "ไม่พบรายการที่ตรงกับเงื่อนไข",
      close: "ปิด",
      previewUnavailable: "ยังไม่มีตัวอย่างไฟล์",
    },
    contact: {
      title: "ติดต่อ",
      subtitle: "สามารถติดต่อผ่านอีเมลหรือส่งข้อความผ่านฟอร์ม",
      emailLabel: "อีเมล",
      formName: "ชื่อ",
      formEmail: "อีเมล",
      formSubject: "หัวข้อ",
      formMessage: "ข้อความ",
      submit: "ส่งข้อความ",
      submitting: "กำลังส่ง...",
      success: "ส่งข้อความเรียบร้อยแล้ว",
      error: "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่",
    },
    common: {
      footer: "Portfolio ของ Sukanya Kijjapalo",
      localeSwitch: "ภาษา",
    },
  },
  en: {
    brand: "Sukanya Kijjapalo (Fern)",
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      certificates: "Certificates",
      contact: "Contact",
    },
    home: {
      introLabel: "Coordination & Operations Support Professional",
      ctaExperience: "View Experience",
      ctaProjects: "View Projects",
      ctaCertificates: "View Certificates",
      keyHighlights: "Key Highlights",
      yearsExp: "4+ years of coordination and CRM operations experience",
      metricRenewal: "Over 90% certificate renewal retention",
      metricAutomation: "CRM Auto-Alert reduced repetitive work by 30%+",
    },
    about: {
      title: "About Sukanya",
      summaryTitle: "Professional Summary",
      skillsTitle: "Core Skills",
      educationTitle: "Education",
      languagesTitle: "Languages",
    },
    experience: {
      title: "Work Experience",
      subtitle: "Career path across laboratory operations and customer coordination",
      achievements: "Quantified Achievements",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Case studies based on real work outcomes",
      role: "Role",
      context: "Context",
      challenge: "Challenge",
      tools: "Tools / Process",
      actions: "Actions",
      outcomes: "Outcomes",
      evidenceType: "Evidence Type",
    },
    certificates: {
      title: "Certificate Repository",
      subtitle: "Centralized storage for certificates and supporting files",
      allCategories: "All categories",
      allYears: "All years",
      preview: "Preview",
      download: "Download",
      placeholder: "Awaiting uploaded file",
      issueDate: "Issued",
      credentialId: "Credential ID",
      category: "Category",
      noMatch: "No certificates match this filter",
      close: "Close",
      previewUnavailable: "Preview is not available yet",
    },
    contact: {
      title: "Contact",
      subtitle: "Reach out by email or send a message using the form",
      emailLabel: "Email",
      formName: "Name",
      formEmail: "Email",
      formSubject: "Subject",
      formMessage: "Message",
      submit: "Send message",
      submitting: "Sending...",
      success: "Message sent successfully",
      error: "Message could not be sent. Please try again.",
    },
    common: {
      footer: "Sukanya Kijjapalo Portfolio",
      localeSwitch: "Language",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
