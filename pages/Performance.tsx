
import React, { useState, useMemo, useEffect } from 'react';
import { getStoredProjects } from '../utils/storage';
import { Project } from '../types';
import ProjectModal from '../components/ProjectModal';

const Performance: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('전체보기');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const categories = ['전체보기', '공동주택', '업무시설', '상업시설', '오피스텔', '기타분양'];
  const knownTypes = ['공동주택', '타운하우스', '지식산업센터', '오피스', '상업시설', '오피스텔'];

  useEffect(() => {
    const fetchProjects = async () => {
        const storedProjects = await getStoredProjects();
        setProjects(storedProjects);
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (filter !== '전체보기') {
      list = projects.filter(p => {
        const type = p.type;
        if (filter === '공동주택') return type.includes('공동주택') || type.includes('타운하우스');
        if (filter === '업무시설') return type.includes('지식산업센터') || type.includes('오피스');
        if (filter === '상업시설') return type.includes('상업시설');
        if (filter === '오피스텔') return type.includes('오피스텔');
        if (filter === '기타분양') return !knownTypes.some(t => type.includes(t));
        return false;
      });
    }
    return [...list].sort((a, b) => {
      const dateA = parseInt(a.year + a.month.padStart(2, '0'));
      const dateB = parseInt(b.year + b.month.padStart(2, '0'));
      return dateB - dateA;
    });
  }, [filter, projects]);

  return (
    <div className="pt-20 md:pt-24 min-h-screen bg-gray-800 text-gray-100">
      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 mb-10 md:mb-16 pt-8 md:pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-700 pb-8 md:pb-10 gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden shadow-2xl border border-gray-700 flex items-center justify-center bg-gray-700 rounded-lg flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80" alt="Achievement" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-gray-400 tracking-tighter uppercase">BUSINESS RESULT</h2>
              <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-gray-100 tracking-tighter leading-none uppercase break-keep">
                ACHIEVEMENT OF <span className="text-primary">{filter === '전체보기' ? '2009~ing' : filter}</span>
              </h3>
            </div>
          </div>
          <div className="hidden lg:block text-right">
             <p className="text-gray-400 text-[10px] font-black tracking-[0.2em] leading-tight uppercase">
              THE ULTIMATE PARTNER OF<br/>
              <span className="text-primary">REAL ESTATE DEVELOPMENT</span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 pb-20 md:pb-32">
        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12 md:mb-20 bg-gray-700/40 p-1.5 rounded-sm">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-8 py-2 text-[11px] md:text-[13px] font-bold transition-all duration-300 rounded-sm ${
                filter === cat 
                  ? 'bg-primary text-black shadow-lg shadow-primary/10' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id || idx} 
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Category Badges */}
              <div className="flex flex-wrap mb-3 md:mb-4 gap-1.5">
                {categories.slice(1).map(cat => {
                   const isActive = (() => {
                     const type = project.type;
                     if (cat === '공동주택') return type.includes('공동주택') || type.includes('타운하우스');
                     if (cat === '업무시설') return type.includes('지식산업센터') || type.includes('오피스');
                     if (cat === '상업시설') return type.includes('상업시설');
                     if (cat === '오피스텔') return type.includes('오피스텔');
                     if (cat === '기타분양') return !knownTypes.some(t => type.includes(t));
                     return false;
                   })();

                   return (
                     <div 
                       key={cat} 
                       className={`px-3 md:px-4 py-1 text-[9px] md:text-[10px] font-black border transition-all duration-300 ${
                         isActive 
                          ? 'bg-primary/20 text-primary border-primary/30 shadow-sm' 
                          : 'bg-gray-700 text-gray-500 border-gray-700 opacity-40'
                       }`}
                     >
                       {cat}
                     </div>
                   );
                })}
              </div>

              <h4 className="text-xl md:text-3xl font-black text-white tracking-tighter mb-4 md:mb-6 leading-tight group-hover:text-primary transition-colors break-keep">
                {project.name}
              </h4>

              <div className="relative aspect-[16/10] overflow-hidden mb-6 md:mb-8 shadow-2xl rounded-sm border border-gray-700 group-hover:border-primary/30 transition-all">
                <img 
                  src={project.imageUrl || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80`} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/40 to-transparent"></div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-primary text-black font-black px-6 py-2 text-xs md:text-sm tracking-widest uppercase">View details</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-3 md:gap-y-4">
                {[
                  { label: "시 기", value: `${project.year}.${project.month}` },
                  { label: "종 류", value: project.type },
                  { label: "상 태", value: project.status || "완료", highlight: project.status === '진행중' },
                  { label: "구 분", value: project.role || "조직분양" }
                ].map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-gray-700 pb-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] md:text-xs font-black text-primary/60 uppercase tracking-widest">{spec.label}</span>
                      <span className={`text-[12px] md:text-[15px] font-medium truncate ml-2 ${spec.highlight ? 'text-primary font-bold' : 'text-gray-300'}`}>
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-24 md:py-40 text-center">
            <p className="text-gray-500 font-bold text-lg md:text-xl">해당 카테고리의 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
