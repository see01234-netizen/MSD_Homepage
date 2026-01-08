
import { Project } from '../types';
import { PROJECTS as INITIAL_PROJECTS } from '../constants';

const DB_NAME = 'MireaGongganDB';
const STORE_NAME = 'projects';
const DB_VERSION = 1;

let db: IDBDatabase;

// Function to initialize the database
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Database error:', request.error);
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

// Seed initial data if the store is empty
export const seedInitialData = async (): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    // Clear existing data before seeding
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
        // Add initial projects
        INITIAL_PROJECTS.forEach(project => {
          const { ...projectData } = project;
          store.add(projectData);
        });

        transaction.oncomplete = () => {
            console.log('Initial data seeded successfully.');
            resolve();
        };

        transaction.onerror = (event) => {
            console.error('Error seeding data:', transaction.error);
            reject('Error seeding data');
        };
    };
    clearRequest.onerror = (event) => {
        console.error('Error clearing store before seeding:', clearRequest.error);
        reject('Error clearing store');
    };
  });
};


// Get all projects
export const getAllProjectsDB = async (): Promise<Project[]> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      console.error('Error fetching projects:', request.error);
      reject('Error fetching projects');
    };
  });
};

// Add a project
export const addProjectDB = async (project: Project): Promise<number> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  // Omit id as it's auto-incremented.
  const { id, ...projectData } = project;
  const request = store.add(projectData);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result as number);
    };
    request.onerror = () => {
      console.error('Error adding project:', request.error);
      reject('Error adding project');
    };
  });
};

// Update a project
export const updateProjectDB = async (project: Project): Promise<number> => {
  if (!project.id) {
    return Promise.reject('Project must have an ID to be updated.');
  }
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.put(project);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result as number);
    };
    request.onerror = () => {
      console.error('Error updating project:', request.error);
      reject('Error updating project');
    };
  });
};

// Delete a project
export const deleteProjectDB = async (id: number): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      console.error('Error deleting project:', request.error);
      reject('Error deleting project');
    };
  });
};

// Replace all projects (Bulk Update)
export const replaceAllProjectsDB = async (projects: Project[]): Promise<void> => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const clearRequest = store.clear();
    clearRequest.onsuccess = () => {
      projects.forEach(p => {
        // Remove ID to let DB auto-increment and avoid key conflict
        const { id, ...data } = p;
        store.add(data);
      });
      resolve();
    };
    clearRequest.onerror = (event) => {
      console.error('Error clearing store for replacement:', clearRequest.error);
      reject('Error clearing store');
    };
    transaction.oncomplete = () => {
        resolve();
    }
    transaction.onerror = () => reject(transaction.error);
  });
};
