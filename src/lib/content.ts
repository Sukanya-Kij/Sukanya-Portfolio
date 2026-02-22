import certificatesData from "@/content/certificates.json";
import experienceData from "@/content/experience.json";
import profileData from "@/content/profile.json";
import projectsData from "@/content/projects.json";
import type {
  CertificateItem,
  ExperienceItem,
  Profile,
  ProjectItem,
} from "@/lib/types";

export const profile = profileData as Profile;
export const experiences = experienceData as ExperienceItem[];
export const projects = projectsData as ProjectItem[];
export const certificates = certificatesData as CertificateItem[];
