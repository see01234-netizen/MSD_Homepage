
import { Project, SiteConfig } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

const STORAGE_KEY = 'mirae_projects';
const CONFIG_KEY = 'mirae_site_config';

const DEFAULT_CONFIG: SiteConfig = {
  companyName: "(주)미래공간개발",
  heroTitle: "THE ULTIMATE PARTNER OF REAL ESTATE DEVELOPMENT",
  heroSubtitle: "Unique, More and Better",
  heroDescription: "(주)미래공간개발은 고객을 왕으로 만드는 \"KING MAKER\"로서 최고의 성공 파트너가 되어 드립니다.",
  phone: "1688-9641",
  address: "서울특별시 금천구 가산디지털1로 146, 14층 1403, 1404호(가산동)",
  email: "yahc1020@naver.com",
  businessNumber: "284-88-02512",
  ceoName: "임병섭, 윤용석"
};

export const getStoredProjects = (): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  return JSON.parse(stored);
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const addProject = (project: Project) => {
  const projects = getStoredProjects();
  const updated = [project, ...projects];
  saveProjects(updated);
  return updated;
};

export const updateProject = (index: number, project: Project) => {
  const projects = getStoredProjects();
  projects[index] = project;
  saveProjects(projects);
  return projects;
};

export const deleteProject = (index: number) => {
  const projects = getStoredProjects();
  const updated = projects.filter((_, i) => i !== index);
  saveProjects(updated);
  return updated;
};

export const getSiteConfig = (): SiteConfig => {
  const stored = localStorage.getItem(CONFIG_KEY);
  if (!stored) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
    return DEFAULT_CONFIG;
  }
  return JSON.parse(stored);
};

export const saveSiteConfig = (config: SiteConfig) => {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event('siteConfigUpdated'));
};
