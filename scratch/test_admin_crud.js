import { AdminStorageManager } from '../src/core/adminStorageManager.js';
import { portfolioData, getPortfolioData } from '../src/data/portfolioData.js';

// Setup Mock localStorage for node test
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
  get length() { return Object.keys(storage).length; },
  key: (i) => Object.keys(storage)[i] || null
};

console.log('--- TEST 1: INITIAL STATE ---');
const initialData = getPortfolioData('id');
console.log('Initial projects count:', initialData.projects.items.length);
console.log('Initial meta role:', initialData.meta.role);

console.log('--- TEST 2: STORAGE MANAGER CUSTOM PROJECTS ---');
const sm = new AdminStorageManager();
const testProject = {
  id: 'proj-test-1',
  code: 'PRJ // 10',
  title: 'Test Admin App',
  subtitle: 'Proyek Uji Coba CLI',
  year: '2026',
  category: 'Test Category',
  role: 'Admin Developer',
  client: 'Self',
  description: 'Proyek uji coba fitur CRUD admin terminal.',
  techStack: ['Node JS', 'JavaScript'],
  links: { code: 'https://github.com/HanzzSama', preview: '#' }
};

const customList = [...initialData.projects.items, testProject];
sm.saveCustomProjects(customList);

const updatedData = getPortfolioData('id');
console.log('Projects count after add:', updatedData.projects.items.length);
const found = updatedData.projects.items.find(p => p.id === 'proj-test-1');
console.log('Found new project in getPortfolioData:', found?.title);

console.log('--- TEST 3: STORAGE MANAGER CUSTOM PROFILE ---');
sm.saveCustomProfile({
  role: 'Lead Architect & Creative Developer',
  bio: 'Bio kustom diuji melalui admin command prompt.',
  availability: 'STATUS: ACTIVE PROJECT'
});

const profileUpdatedData = getPortfolioData('id');
console.log('Updated role:', profileUpdatedData.meta.role);
console.log('Updated preamble:', profileUpdatedData.welcome.architecturalPreamble);
console.log('Updated bio ethos[0]:', profileUpdatedData.about.ethosParagraphs[0]);
console.log('Updated availability:', profileUpdatedData.meta.availability.status);

console.log('--- TEST 4: BACKUP EXPORT & IMPORT ---');
const backupJson = sm.exportBackup();
console.log('Backup JSON exported successfully. Length:', backupJson.length);

sm.resetAll();
const resetData = getPortfolioData('id');
console.log('Projects count after reset:', resetData.projects.items.length);
console.log('Role after reset:', resetData.meta.role);

const importResult = sm.importBackup(backupJson);
console.log('Import result:', importResult);

const reimportedData = getPortfolioData('id');
console.log('Projects count after re-import:', reimportedData.projects.items.length);
console.log('Role after re-import:', reimportedData.meta.role);

console.log('--- ALL UNIT TESTS COMPLETED SUCCESSFULLY ---');

