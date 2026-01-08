
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredProjects, addProject, updateProject, deleteProject, getSiteConfig, saveSiteConfig } from '../utils/storage';
import { Project, SiteConfig } from '../types';
import { 
  Plus, Edit2, Trash2, Save, X, LogOut, LayoutGrid, 
  Image as ImageIcon, Upload, Settings, List,
  Monitor, Phone, MapPin, Mail, User, FileText, Download,
  Github, RefreshCw, Check, Loader2
} from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  
  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Settings State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig());

  // GitHub State
  const [githubConfig, setGithubConfig] = useState({
    owner: '',
    repo: '',
    token: '',
    path: 'data/projects.ts'
  });
  const [isPushing, setIsPushing] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const [formData, setFormData] = useState<Project>({
    year: '', month: '', name: '', type: '', location: '', scale: '', role: '', imageUrl: '', status: '완료'
  });

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    const fetchProjects = async () => {
        const storedProjects = await getStoredProjects();
        setProjects(storedProjects);
    };
    fetchProjects();
    
    // Load GitHub config
    const savedGhConfig = localStorage.getItem('github_config');
    if (savedGhConfig) {
      setGithubConfig(JSON.parse(savedGhConfig));
    }
  }, [navigate]);

  // Image Compression Logic
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsCompressing(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Canvas setup for resizing
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200; // 최대 가로 폭 제한
        const scaleSize = MAX_WIDTH / img.width;
        
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > MAX_WIDTH) {
            newWidth = MAX_WIDTH;
            newHeight = img.height * scaleSize;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            // Compress to JPEG with 0.7 quality (Greatly reduces size)
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            setFormData(prev => ({ ...prev, imageUrl: compressedBase64 }));
        }
        setIsCompressing(false);
      };
      img.onerror = () => {
          alert('이미지 처리 중 오류가 발생했습니다.');
          setIsCompressing(false);
      }
    };
    reader.onerror = () => {
        alert('파일을 읽는데 실패했습니다.');
        setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          e.preventDefault();
        }
        return;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        processFile(files[0]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  // Export functionality to save data locally as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mirae_projects_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // GitHub Sync Functionality
  const handleGithubPush = async () => {
    if (!githubConfig.owner || !githubConfig.repo || !githubConfig.token) {
      alert('GitHub 설정을 먼저 완료해주세요.');
      return;
    }

    if (!window.confirm('현재 데이터를 GitHub 저장소에 백업하시겠습니까?\n이 작업은 실제 소스코드를 업데이트하며, 자동 배포가 설정된 경우 사이트가 재배포됩니다.')) {
      return;
    }

    setIsPushing(true);
    try {
      // 1. Get current SHA of the file
      const apiUrl = `https://api.github.com/repos/${githubConfig.owner}/${githubConfig.repo}/contents/${githubConfig.path}`;
      const getResponse = await fetch(apiUrl, {
        headers: {
          'Authorization': `token ${githubConfig.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let sha = '';
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      } else if (getResponse.status !== 404) {
        throw new Error('GitHub에서 파일 정보를 가져오는데 실패했습니다.');
      }

      // 2. Prepare new content
      // Clean projects data (remove ID if needed, but ID is optional in type so fine)
      const cleanProjects = projects.map(({ id, ...rest }) => rest);
      
      const fileContent = `import { Project } from '../types';\n\nexport const PROJECTS: Project[] = ${JSON.stringify(cleanProjects, null, 2)};\n`;
      
      // UTF-8 to Base64 (browser compatible)
      const contentEncoded = window.btoa(unescape(encodeURIComponent(fileContent)));

      // 3. Push (PUT)
      const putResponse = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubConfig.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Update project data: ${new Date().toISOString().split('T')[0]}`,
          content: contentEncoded,
          sha: sha || undefined
        })
      });

      if (!putResponse.ok) {
        const err = await putResponse.json();
        throw new Error(err.message || 'GitHub 업데이트 실패');
      }

      alert('성공적으로 GitHub에 백업되었습니다! \n자동 배포가 설정되어 있다면 곧 사이트가 업데이트됩니다.');
    } catch (error: any) {
      alert(`오류 발생: ${error.message}`);
      console.error(error);
    } finally {
      setIsPushing(false);
    }
  };

  const handleSaveGithubConfig = () => {
    localStorage.setItem('github_config', JSON.stringify(githubConfig));
    alert('GitHub 설정이 저장되었습니다.');
  };

  const openAddModal = () => {
    const today = new Date();
    setFormData({ 
      year: today.getFullYear().toString(), 
      month: (today.getMonth() + 1).toString().padStart(2, '0'), 
      name: '', 
      type: '공동주택', 
      location: '', 
      scale: '', 
      role: '조직분양', 
      imageUrl: '', 
      status: '완료' 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCompressing) {
        alert("이미지 최적화 중입니다. 잠시만 기다려주세요.");
        return;
    }
    let updatedProjects;
    if (formData.id) {
      updatedProjects = await updateProject(formData);
    } else {
      updatedProjects = await addProject(formData);
    }
    setProjects(updatedProjects);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말로 이 실적을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다.')) {
      const updatedProjects = await deleteProject(id);
      setProjects(updatedProjects);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig(siteConfig);
    alert('사이트 설정이 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Dashboard Card */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 bg-gray-700 p-8 rounded-xl border border-gray-600 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <LayoutGrid className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-100 tracking-tighter uppercase">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm">실적 데이터 관리 및 웹사이트 설정</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={handleExport}
              className="bg-gray-600 hover:bg-gray-500 text-primary font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-gray-500"
              title="현재 데이터 JSON 다운로드"
            >
              <Download size={20} /> 로컬 백업
            </button>
             <button 
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-red-900/50 text-gray-300 hover:text-red-400 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-gray-500 hover:border-red-900"
            >
              <LogOut size={20} /> 로그아웃
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 bg-gray-700 p-1 rounded-xl border border-gray-600 w-fit">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'projects' ? 'bg-primary text-black shadow-lg' : 'text-gray-300 hover:text-gray-200'}`}
          >
            <List size={18} /> 실적 관리
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-black shadow-lg' : 'text-gray-300 hover:text-gray-200'}`}
          >
            <Settings size={18} /> 사이트 설정 & 배포
          </button>
        </div>

        {activeTab === 'projects' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                등록된 프로젝트 
                <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">{projects.length}건</span>
              </h2>
              <button 
                onClick={openAddModal}
                className="bg-primary hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm shadow-lg shadow-primary/20"
              >
                <Plus size={18} /> 새 실적 추가
              </button>
            </div>
            <div className="bg-gray-700 rounded-xl border border-gray-600 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-gray-600/50 text-gray-300 text-xs font-bold uppercase tracking-widest">
                      <th className="px-6 py-5">날짜</th>
                      <th className="px-6 py-5">프로젝트명</th>
                      <th className="px-6 py-5">상태</th>
                      <th className="px-6 py-5">유형</th>
                      <th className="px-6 py-5">위치</th>
                      <th className="px-6 py-5 text-center">액션</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-600/30 transition-colors">
                        <td className="px-6 py-5 text-gray-300 font-medium">{p.year}.{p.month}</td>
                        <td className="px-6 py-5 text-gray-100 font-bold">{p.name}</td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter ${p.status === '진행중' ? 'bg-red-900/40 text-red-400 border border-red-900/50' : 'bg-green-900/30 text-green-400 border border-green-900/30'}`}>
                            {p.status || "완료"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded">{p.type}</span>
                        </td>
                        <td className="px-6 py-5 text-gray-300 text-sm truncate max-w-xs">{p.location}</td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            <button onClick={() => openEditModal(p)} className="p-2 text-gray-400 hover:text-primary transition-colors bg-gray-600/50 rounded hover:bg-gray-600" title="수정"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(p.id!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-600/50 rounded hover:bg-gray-600" title="삭제"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium">
                                등록된 실적이 없습니다. '새 실적 추가' 버튼을 눌러 데이터를 입력해주세요.
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-10">
             {/* GitHub Settings & Push */}
             <div className="bg-gray-700 p-10 rounded-xl border border-gray-600 shadow-xl">
                <h3 className="text-lg font-black text-primary flex items-center gap-2 border-b border-gray-600 pb-3 uppercase tracking-tighter mb-6">
                   <Github size={20} /> GitHub 자동 백업 및 배포 설정
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-300 text-xs font-bold uppercase mb-2">GitHub 아이디 (Owner)</label>
                      <input 
                        type="text" 
                        value={githubConfig.owner}
                        onChange={(e) => setGithubConfig({...githubConfig, owner: e.target.value})}
                        placeholder="예: username"
                        className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-xs font-bold uppercase mb-2">저장소 이름 (Repo)</label>
                      <input 
                        type="text" 
                        value={githubConfig.repo}
                        onChange={(e) => setGithubConfig({...githubConfig, repo: e.target.value})}
                        placeholder="예: project-name"
                        className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 text-xs font-bold uppercase mb-2">Personal Access Token (Repo 권한 필요)</label>
                      <input 
                        type="password" 
                        value={githubConfig.token}
                        onChange={(e) => setGithubConfig({...githubConfig, token: e.target.value})}
                        placeholder="ghp_..."
                        className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                      />
                      <p className="text-[10px] text-gray-400 mt-2">* 이 토큰은 브라우저에만 저장되며 서버로 전송되지 않습니다.</p>
                    </div>
                </div>
                <div className="flex gap-4 border-t border-gray-600 pt-6">
                    <button 
                      onClick={handleSaveGithubConfig}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold rounded flex items-center gap-2"
                    >
                      <Save size={16} /> 설정 저장
                    </button>
                    <button 
                      onClick={handleGithubPush}
                      disabled={isPushing}
                      className={`flex-1 px-6 py-3 font-bold rounded flex items-center justify-center gap-2 transition-all ${isPushing ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                    >
                      {isPushing ? <RefreshCw className="animate-spin" size={20} /> : <Github size={20} />}
                      {isPushing ? '백업 진행중...' : 'GitHub에 데이터 백업 및 배포하기'}
                    </button>
                </div>
             </div>

             {/* Site General Settings */}
             <form onSubmit={handleSaveConfig} className="bg-gray-700 p-10 rounded-xl border border-gray-600 shadow-xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Hero Settings */}
                  <div className="space-y-6">
                     <h3 className="text-lg font-black text-primary flex items-center gap-2 border-b border-gray-600 pb-3 uppercase tracking-tighter">
                        <Monitor size={20} /> 메인 히어로 섹션
                     </h3>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">메인 타이틀 (상단 소제목)</label>
                       <input 
                         type="text" 
                         value={siteConfig.heroSubtitle} 
                         onChange={e => setSiteConfig({...siteConfig, heroSubtitle: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">대형 헤드라인 (중앙)</label>
                       <textarea 
                         rows={2}
                         value={siteConfig.heroTitle} 
                         onChange={e => setSiteConfig({...siteConfig, heroTitle: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">상세 설명 (하단)</label>
                       <textarea 
                         rows={3}
                         value={siteConfig.heroDescription} 
                         onChange={e => setSiteConfig({...siteConfig, heroDescription: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-6">
                     <h3 className="text-lg font-black text-primary flex items-center gap-2 border-b border-gray-600 pb-3 uppercase tracking-tighter">
                        <FileText size={20} /> 회사 정보 및 연락처
                     </h3>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">회사명</label>
                       <input 
                         type="text" 
                         value={siteConfig.companyName} 
                         onChange={e => setSiteConfig({...siteConfig, companyName: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-xs font-bold uppercase mb-2">대표 번호</label>
                          <input 
                            type="text" 
                            value={siteConfig.phone} 
                            onChange={e => setSiteConfig({...siteConfig, phone: e.target.value})} 
                            className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-300 text-xs font-bold uppercase mb-2">대표자명</label>
                          <input 
                            type="text" 
                            value={siteConfig.ceoName} 
                            onChange={e => setSiteConfig({...siteConfig, ceoName: e.target.value})} 
                            className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                          />
                        </div>
                     </div>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">이메일</label>
                       <input 
                         type="text" 
                         value={siteConfig.email} 
                         onChange={e => setSiteConfig({...siteConfig, email: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                     <div>
                       <label className="block text-gray-300 text-xs font-bold uppercase mb-2">사업자 등록번호</label>
                       <input 
                         type="text" 
                         value={siteConfig.businessNumber} 
                         onChange={e => setSiteConfig({...siteConfig, businessNumber: e.target.value})} 
                         className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                       />
                     </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-600 mt-6">
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">본사 주소</label>
                  <input 
                    type="text" 
                    value={siteConfig.address} 
                    onChange={e => setSiteConfig({...siteConfig, address: e.target.value})} 
                    className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                  />
               </div>

               <div className="flex justify-end mt-8">
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-yellow-300 text-black font-black px-10 py-4 rounded-lg flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20"
                  >
                    <Save size={20} /> 사이트 설정 저장하기
                  </button>
               </div>
            </form>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-gray-700 w-full max-w-2xl my-8 rounded-xl shadow-2xl border border-gray-600 overflow-hidden">
            <div className="p-8 border-b border-gray-600 flex justify-between items-center bg-gray-700/50">
              <h2 className="text-2xl font-black text-gray-100">{formData.id ? '실적 수정' : '새 실적 추가'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">조감도 이미지 (클릭 또는 붙여넣기)</label>
                <div 
                  onClick={() => !isCompressing && fileInputRef.current?.click()}
                  onPaste={!isCompressing ? handlePaste : undefined}
                  onDragOver={handleDragOver}
                  onDrop={!isCompressing ? handleDrop : undefined}
                  tabIndex={0}
                  className={`relative group cursor-pointer aspect-video rounded-lg border-2 border-dashed border-gray-500 bg-gray-600/50 hover:bg-gray-600 hover:border-primary transition-all overflow-hidden flex items-center justify-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${isCompressing ? 'cursor-wait opacity-50' : ''}`}
                >
                  {isCompressing ? (
                      <div className="flex flex-col items-center justify-center">
                          <Loader2 className="animate-spin text-primary mb-2" size={32} />
                          <p className="text-gray-300 font-bold">이미지 최적화 중...</p>
                      </div>
                  ) : formData.imageUrl ? (
                    <>
                      <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <div className="bg-primary text-black font-bold px-4 py-2 rounded shadow-lg flex items-center gap-2">
                           <Upload size={16} /> 이미지 교체
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8">
                      <div className="inline-flex p-4 bg-gray-500 rounded-full mb-4 text-gray-400 group-hover:text-primary transition-colors">
                        <ImageIcon size={32} />
                      </div>
                      <p className="text-gray-300 font-bold">이미지 파일을 클릭, 드래그 또는 <br />붙여넣기(Ctrl+V) 하세요.</p>
                      <p className="text-gray-400 text-xs mt-2">추천: 1200x800px 이상의 조감도 사진<br/>(자동으로 최적화되어 저장됩니다)</p>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">연도 (Year)</label>
                  <input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 2024" required />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">월 (Month)</label>
                  <input type="text" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 05" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">프로젝트명</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 신광교 클라우드 시티" required />
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">현장위치</label>
                <input type="text" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 경기도 용인시 기흥구" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">진행 상태</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200">
                    <option value="완료">완료</option>
                    <option value="진행중">진행중</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">사업유형</label>
                  <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 지식산업센터" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">사업규모</label>
                  <input type="text" value={formData.scale || ''} onChange={e => setFormData({...formData, scale: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 연면적 104,771평" />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">수행역할</label>
                  <input type="text" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" placeholder="예: 조직분양" />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isCompressing} className="w-full bg-primary hover:bg-yellow-300 text-black font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Save size={20} /> 데이터 저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
