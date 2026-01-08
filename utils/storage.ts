
import { Project, SiteConfig } from '../types';
import {
  getAllProjectsDB,
  addProjectDB,
  updateProjectDB,
  deleteProjectDB,
  replaceAllProjectsDB
} from './db';
import { PROJECTS } from '../constants';

const CONFIG_KEY = 'mirae_site_config';
const HASH_KEY = 'mirae_projects_hash';

const DEFAULT_CONFIG: SiteConfig = {
  companyName: "(주)미래공간개발",
  heroTitle: "THE ULTIMATE PARTNER OF REAL ESTATE DEVELOPMENT",
  heroSubtitle: "Unique, More and Better",
  heroDescription: "(주)미래공간개발은 고객을 최고의 자리로 이끄는 \"KING MAKER\"로서, 가장 신뢰받는 성공 파트너가 되어 드립니다.",
  phone: "1688-9641",
  address: "서울특별시 금천구 가산디지털1로 146, 14층 1403, 1404호(가산동)",
  email: "yahc1020@naver.com",
  businessNumber: "284-88-02512",
  ceoName: "임병섭, 윤용석"
};

export const getStoredProjects = async (): Promise<Project[]> => {
  try {
    // 소스 코드의 PROJECTS 데이터 변경 감지 (내용 기반 해시 비교)
    // 이를 통해 Studio(코드 편집기)에서 데이터를 직접 수정 시 자동으로 DB 업데이트
    const currentDataHash = JSON.stringify(PROJECTS);
    const storedDataHash = localStorage.getItem(HASH_KEY);
    
    // 소스 코드가 변경되었다면 DB를 강제로 동기화
    if (currentDataHash !== storedDataHash) {
       console.log('Source code data changed. Syncing DB...');
       await replaceAllProjectsDB(PROJECTS);
       localStorage.setItem(HASH_KEY, currentDataHash);
    }

    let projects = await getAllProjectsDB();
    
    // DB가 비어있는 경우 초기화
    if (projects.length === 0) {
      console.log("No projects found in DB, seeding initial data.");
      await replaceAllProjectsDB(PROJECTS);
      localStorage.setItem(HASH_KEY, currentDataHash);
      projects = await getAllProjectsDB();
    }
    
    return projects;
  } catch (error) {
    console.error("Failed to get projects, returning static data:", error);
    return PROJECTS;
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

export const replaceAllProjects = async (projects: Project[]): Promise<Project[]> => {
    await replaceAllProjectsDB(projects);
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
