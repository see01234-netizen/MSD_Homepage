
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredProjects, addProject, updateProject, deleteProject, replaceAllProjects } from '../utils/storage';
import { Project } from '../types';
import { 
  Plus, Edit2, Trash2, Save, X, LogOut, LayoutGrid, 
  Image as ImageIcon, Upload, Download,
  FileJson, Code, Loader2
} from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkJson, setBulkJson] = useState('');
  
  // Image Compression State
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

  // Generate projects.ts file for manual deployment
  const handleDownloadSource = () => {
    if (!window.confirm('현재 데이터를 기반으로 projects.ts 파일을 생성하여 다운로드하시겠습니까?\n이 파일을 프로젝트의 data/projects.ts 경로에 덮어쓰고 배포하면 사이트가 업데이트됩니다.')) {
      return;
    }

    const cleanProjects = projects.map(({ id, ...rest }) => rest);
    const timestamp = new Date().getTime();
    
    // Note: The structure here must match the data/projects.ts file structure
    const fileContent = `
import { Project } from '../types';

export const DATA_VERSION = "${timestamp}";

export const PROJECTS: Project[] = ${JSON.stringify(cleanProjects, null, 2)};
`;

    const blob = new Blob([fileContent], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "projects.ts";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const openBulkModal = () => {
    // ID 제외하고 깨끗한 JSON 생성
    const cleanProjects = projects.map(({id, ...rest}) => rest);
    setBulkJson(JSON.stringify(cleanProjects, null, 2));
    setIsBulkModalOpen(true);
  };

  const handleSaveBulkEdit = async () => {
    try {
        const parsed = JSON.parse(bulkJson);
        if (!Array.isArray(parsed)) throw new Error("데이터는 반드시 배열 형식이어야 합니다.");
        
        if (!window.confirm("기존 데이터를 모두 지우고 입력한 데이터로 교체하시겠습니까? \n이 작업은 되돌릴 수 없습니다.")) return;

        await replaceAllProjects(parsed);
        const updated = await getStoredProjects();
        setProjects(updated);
        setIsBulkModalOpen(false);
        alert("데이터가 성공적으로 교체되었습니다.");
    } catch (e: any) {
        alert("JSON 형식이 올바르지 않습니다.\n" + e.message);
    }
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
              <h1 className="text-3xl font-black text-gray-100 tracking-tighter uppercase">Project Manager</h1>
              <p className="text-gray-300 text-sm">사업실적 데이터 관리</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={handleExport}
              className="bg-gray-600 hover:bg-gray-500 text-primary font-bold px-4 py-3 rounded-lg flex items-center gap-2 transition-all border border-gray-500 text-sm"
              title="현재 데이터 JSON 다운로드"
            >
              <Download size={18} /> 백업
            </button>
             <button 
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-red-900/50 text-gray-300 hover:text-red-400 font-bold px-4 py-3 rounded-lg flex items-center gap-2 transition-all border border-gray-500 hover:border-red-900 text-sm"
            >
              <LogOut size={18} /> 로그아웃
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                등록된 실적
                <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">{projects.length}건</span>
                </h2>
                
                {/* Source Download Button - Compact */}
                <button 
                    onClick={handleDownloadSource}
                    className="text-gray-400 hover:text-green-400 flex items-center gap-1 text-xs font-bold border border-gray-600 px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                    title="소스 코드(projects.ts) 다운로드"
                >
                    <Code size={14} /> 소스파일 생성
                </button>
            </div>

            <div className="flex gap-3">
            <button 
                onClick={openBulkModal}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm border border-gray-500"
            >
                <FileJson size={18} /> 데이터 일괄 편집
            </button>
            <button 
                onClick={openAddModal}
                className="bg-primary hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm shadow-lg shadow-primary/20"
            >
                <Plus size={18} /> 새 실적 추가
            </button>
            </div>
        </div>

        {/* Project List Table */}
        <div className="bg-gray-700 rounded-xl border border-gray-600 overflow-hidden shadow-2xl mb-12">
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

      {/* Bulk Edit Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsBulkModalOpen(false)}></div>
          <div className="relative bg-gray-700 w-full max-w-4xl h-[80vh] my-8 rounded-xl shadow-2xl border border-gray-600 flex flex-col">
            <div className="p-6 border-b border-gray-600 flex justify-between items-center bg-gray-700/50">
              <div className="flex items-center gap-3">
                 <FileJson className="text-primary" size={24} />
                 <div>
                    <h2 className="text-xl font-black text-gray-100">실적 데이터 일괄 편집 (JSON)</h2>
                    <p className="text-xs text-gray-400">데이터를 텍스트로 직접 수정하거나, 외부 데이터를 붙여넣을 수 있습니다.</p>
                 </div>
              </div>
              <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <div className="flex-grow p-6 bg-gray-800">
                <textarea 
                    className="w-full h-full bg-gray-900 border border-gray-600 text-gray-200 font-mono text-sm p-4 rounded focus:border-primary focus:outline-none resize-none"
                    value={bulkJson}
                    onChange={(e) => setBulkJson(e.target.value)}
                    spellCheck={false}
                />
            </div>
            
            <div className="p-6 border-t border-gray-600 bg-gray-700 flex justify-end gap-4 items-center">
                <span className="text-xs text-yellow-400 font-bold mr-auto">
                    * 주의: 저장 시 기존 데이터가 모두 삭제되고 입력한 데이터로 대체됩니다.
                </span>
                <button 
                    onClick={() => setIsBulkModalOpen(false)}
                    className="px-6 py-3 text-gray-300 hover:text-white font-bold"
                >
                    취소
                </button>
                <button 
                    onClick={handleSaveBulkEdit}
                    className="bg-primary hover:bg-yellow-300 text-black font-black px-8 py-3 rounded flex items-center gap-2"
                >
                    <Save size={18} /> DB에 저장 (Apply)
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
