
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredProjects, addProject, updateProject, deleteProject, getSiteConfig, saveSiteConfig } from '../utils/storage';
import { Project, SiteConfig } from '../types';
import { 
  Plus, Edit2, Trash2, Save, X, LogOut, LayoutGrid, 
  Image as ImageIcon, Upload, Settings, List,
  Monitor, Phone, MapPin, Mail, User, FileText
} from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  
  // Projects State
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // Settings State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getSiteConfig());

  const [formData, setFormData] = useState<Project>({
    year: '', month: '', name: '', type: '', location: '', scale: '', role: '', imageUrl: '', status: '완료'
  });

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    setProjects(getStoredProjects());
  }, [navigate]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setFormData(prev => ({ ...prev, imageUrl: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setFormData({ year: '2024', month: '01', name: '', type: '공동주택', location: '', scale: '', role: '조직분양', imageUrl: '', status: '완료' });
    setIsModalOpen(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setFormData({ ...projects[index] });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setProjects(updateProject(editingIndex, formData));
    } else {
      setProjects(addProject(formData));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (window.confirm('정말로 이 실적을 삭제하시겠습니까?')) {
      setProjects(deleteProject(index));
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
              <h1 className="text-3xl font-black text-gray-100 tracking-tighter uppercase">Dashboard</h1>
              <p className="text-gray-300 text-sm">시스템의 데이터와 레이아웃을 관리합니다.</p>
            </div>
          </div>
          <div className="flex gap-4">
             <button 
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-500 text-gray-300 font-bold px-6 py-3 rounded-lg flex items-center gap-2 transition-all border border-gray-500"
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
            <Settings size={18} /> 사이트 설정
          </button>
        </div>

        {activeTab === 'projects' ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-100">프로젝트 리스트 ({projects.length})</h2>
              <button 
                onClick={openAddModal}
                className="bg-primary hover:bg-yellow-300 text-black font-bold px-5 py-2 rounded-lg flex items-center gap-2 transition-all text-sm"
              >
                <Plus size={18} /> 새 실적 추가
              </button>
            </div>
            <div className="bg-gray-700 rounded-xl border border-gray-600 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
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
                  {projects.map((p, idx) => (
                    <tr key={idx} className="hover:bg-gray-600/30 transition-colors">
                      <td className="px-6 py-5 text-gray-300 font-medium">{p.year}.{p.month}</td>
                      <td className="px-6 py-5 text-gray-100 font-bold">{p.name}</td>
                      <td className="px-6 py-5">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter ${p.status === '진행중' ? 'bg-red-900/40 text-red-400 border border-red-900/50' : 'bg-gray-500 text-gray-100'}`}>
                          {p.status || "완료"}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-primary text-xs font-bold bg-primary/10 px-3 py-1 rounded">{p.type}</span>
                      </td>
                      <td className="px-6 py-5 text-gray-300 text-sm truncate max-w-xs">{p.location}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => openEditModal(idx)} className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit2 size={18} /></button>
                          <button onClick={() => handleDelete(idx)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <form onSubmit={handleSaveConfig} className="space-y-8 bg-gray-700 p-10 rounded-xl border border-gray-600 shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Hero Settings */}
                <div className="space-y-6">
                   <h3 className="text-lg font-black text-primary flex items-center gap-2 border-b border-gray-600 pb-3 uppercase tracking-tighter">
                      <Monitor size={20} /> 메인 히어로 섹션
                   </h3>
                   <div>
                     <label className="block text-gray-300 text-xs font-bold uppercase mb-2">메인 타이틀 (상단)</label>
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

             <div className="pt-6 border-t border-gray-600">
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">본사 주소</label>
                <input 
                  type="text" 
                  value={siteConfig.address} 
                  onChange={e => setSiteConfig({...siteConfig, address: e.target.value})} 
                  className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-100 focus:border-primary focus:outline-none"
                />
             </div>

             <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-primary hover:bg-yellow-300 text-black font-black px-10 py-4 rounded-lg flex items-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20"
                >
                  <Save size={20} /> 설 정 저 장 하 기
                </button>
             </div>
          </form>
        )}
      </div>

      {/* Add/Edit Modal (Existing) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-gray-700 w-full max-w-2xl my-8 rounded-xl shadow-2xl border border-gray-600 overflow-hidden">
            <div className="p-8 border-b border-gray-600 flex justify-between items-center bg-gray-700/50">
              <h2 className="text-2xl font-black text-gray-100">{editingIndex !== null ? '실적 수정' : '새 실적 추가'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Image Upload Area (Existing) */}
              <div className="space-y-2">
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">조감도 이미지 (파일 선택 또는 붙여넣기)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer aspect-video rounded-lg border-2 border-dashed border-gray-500 bg-gray-600/50 hover:bg-gray-600 hover:border-primary transition-all overflow-hidden flex items-center justify-center"
                >
                  {formData.imageUrl ? (
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
                      <p className="text-gray-300 font-bold">이미지 파일을 업로드하거나 붙여넣으세요.</p>
                      <p className="text-gray-400 text-xs mt-2">추천: 1200x800px 이상의 조감도 사진</p>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">연도</label>
                  <input type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" required />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs font-bold uppercase mb-2">월</label>
                  <input type="text" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase mb-2">프로젝트명</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" required />
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
                  <input type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-600 border border-gray-500 p-3 rounded text-gray-200" />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-primary hover:bg-yellow-300 text-black font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]">
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