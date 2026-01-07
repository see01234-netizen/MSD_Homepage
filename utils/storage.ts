
import { Project, SiteConfig } from '../types';
import {
  getAllProjectsDB,
  addProjectDB,
  updateProjectDB,
  deleteProjectDB,
  seedInitialData,
} from './db';

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

export const getStoredProjects = async (): Promise<Project[]> => {
  try {
    let projects = await getAllProjectsDB();
    if (projects.length === 0) {
      console.log("No projects found in DB, seeding initial data.");
      await seedInitialData();
      projects = await getAllProjectsDB();
    }
    return projects;
  } catch (error) {
    console.error("Failed to get projects, returning empty array:", error);
    return [];
  }
};

export const addProject = async (project: Project): Promise<Project[]> => {
  await addProjectDB(project);
  return await getAllProjectsDB();
};

export const updateProject = async (project: Project): Promise<Project[]> => {
  await updateProjectDB(project);
  return await getAllProjectsDB();
};

export const deleteProject = async (id: number): Promise<Project[]> => {
  await deleteProjectDB(id);
  return await getAllProjectsDB();
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