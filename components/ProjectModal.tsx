
import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Building2, Ruler, CheckCircle, Briefcase } from 'lucide-react';
import type { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-gray-700 w-full max-w-5xl rounded-sm border border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/40 text-white/70 hover:text-primary hover:bg-black transition-all rounded-full"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-3/5 aspect-video lg:aspect-auto relative overflow-hidden bg-gray-600">
            <img 
              src={project.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-700 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Info Section */}
          <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-gray-700">
            <div className="mb-6">
              <span className="text-primary text-[11px] md:text-xs font-black bg-primary/10 px-3 py-1 uppercase tracking-widest rounded-sm inline-block mb-4">
                {project.type}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight break-keep">
                {project.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-10">
              {[
                { icon: <Calendar size={18} />, label: "추진시기", value: `${project.year}.${project.month}` },
                { icon: <Building2 size={18} />, label: "사업유형", value: project.type },
                { icon: <Ruler size={18} />, label: "사업규모", value: project.scale || project.units || "-" },
                { icon: <MapPin size={18} />, label: "현장위치", value: project.location || "전국" },
                { icon: <Briefcase size={18} />, label: "수행역할", value: project.role || "조직분양" },
                { icon: <CheckCircle size={18} />, label: "진행상태", value: project.status || "완료", highlight: project.status === '진행중' }
              ].map((item, i) => (
                <div key={i} className="flex items-start group">
                  <div className="text-primary/50 group-hover:text-primary transition-colors mt-1 mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-sm md:text-lg font-bold ${item.highlight ? 'text-primary' : 'text-gray-200'}`}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-transparent border border-primary/30 text-primary hover:bg-primary hover:text-black font-black text-xs md:text-sm uppercase tracking-[0.3em] transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;