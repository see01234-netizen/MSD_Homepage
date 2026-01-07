
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ProjectModal from '../components/ProjectModal';
import { BUSINESS_SCOPE } from '../constants';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { getStoredProjects } from '../utils/storage';

const Home: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await getStoredProjects();
      setProjects(storedProjects);
    };
    fetchProjects();
  }, []);


  const recentProjects = [...projects].sort((a, b) => {
    return parseInt(b.year + b.month) - parseInt(a.year + a.month);
  }).slice(0, 6);

  return (
    <div className="flex flex-col bg-gray-800">
      <Hero />

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* Intro Section - King Maker */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                  alt="부동산 개발 파트너십" 
                  className="rounded-lg shadow-2xl z-10 relative opacity-90 w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 -z-0 rounded-lg hidden md:block"></div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
              <span className="text-primary font-bold tracking-[0.3em] uppercase mb-4 block text-xs md:text-sm">Our Identity</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-10 leading-tight text-gray-100 break-keep">
                우리는 당신의 <br className="hidden lg:block" />
                <span className="text-primary">"KING MAKER"</span> 입니다.
              </h2>
              <div className="space-y-4 md:space-y-6 text-gray-300 text-base md:text-xl leading-relaxed font-normal break-keep max-w-2xl mx-auto lg:mx-0">
                <p>
                  역사에 큰 획을 남겼던 지도자들에게는 든든한 조력자가 있었습니다.
                </p>
                <p>
                  저희 (주)미래공간개발은 고객을 왕으로 만든다는 마음가짐으로 최고의 파트너, 킹 메이커로서의 역할을 다하겠습니다.
                </p>
              </div>
              <div className="mt-8 md:mt-12">
                <Link to="/about" className="inline-flex items-center text-primary font-bold group text-sm md:text-lg">
                  CEO 메시지 더보기 <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Scope Summary */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-black mb-6 uppercase tracking-tight text-gray-100">Major Business</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {BUSINESS_SCOPE.map((item) => (
              <div key={item.id} className="bg-gray-700/50 p-8 md:p-12 shadow-lg group hover:-translate-y-2 transition-all duration-500 rounded-sm border border-gray-700 hover:border-primary/30 flex flex-col items-center text-center">
                <div className="mb-10 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/40 transition-all"></div>
                  <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                    <div className="absolute inset-0 border border-primary/20 rounded-full scale-125 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full flex items-center justify-center shadow-inner overflow-hidden border border-white/5">
                      <div className="text-primary opacity-80 transform transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
                        {React.cloneElement(item.icon as React.ReactElement, { size: 40 })}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl md:text-3xl font-black mb-3 text-gray-100 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-[10px] md:text-xs mb-6 uppercase tracking-[0.2em] font-bold">{item.subtitle}</p>
                <p className="text-gray-300 text-sm md:text-lg mb-10 font-normal leading-relaxed break-keep">
                  {item.desc}
                </p>
                <Link to={`/business#${item.id}`} className="mt-auto flex items-center font-black text-[11px] md:text-xs text-primary uppercase tracking-[0.3em] hover:text-white transition-colors">
                  Learn More <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-16 md:py-24 lg:py-32 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 text-gray-100 uppercase tracking-tighter">BUSINESS RESULT</h2>
              <p className="text-gray-300 text-sm md:text-lg font-normal">전문성과 신뢰로 쌓아온 (주)미래공간개발의 주요 프로젝트 실적입니다.</p>
            </div>
            <Link to="/performance" className="text-primary font-bold border-b-2 border-primary/30 pb-1 hover:text-yellow-300 hover:border-yellow-300 transition-colors text-sm md:text-lg">전체 실적 보기</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
            {recentProjects.map((project, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(project)}
                className="group border-b border-gray-700 hover:border-primary/40 py-6 md:py-8 transition-all duration-300 flex items-center justify-between hover:bg-gray-700/30 px-2 -mx-2 cursor-pointer"
              >
                <div className="flex-grow pr-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-primary text-[10px] md:text-xs font-black bg-primary/10 px-2 py-1 uppercase tracking-widest rounded-sm">
                      {project.type}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-500">{project.year}.{project.month}</span>
                  </div>
                  <h4 className="text-lg md:text-2xl font-black text-gray-200 group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </h4>
                </div>
                <div className="flex items-center text-gray-700 group-hover:text-primary group-hover:translate-x-1 transition-all">
                  <span className="hidden md:block text-[10px] font-bold mr-2 opacity-0 group-hover:opacity-100 uppercase tracking-widest">Details</span>
                  <ChevronRight size={24} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:hidden">
            <Link to="/performance" className="block w-full text-center py-4 bg-gray-700 border border-gray-600 text-primary font-bold text-sm rounded-sm">
              전체 실적 확인하기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{filter: 'grayscale(0.5) brightness(0.5)'}}>
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80" 
            alt="City Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-gray-900"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="w-16 h-1.5 bg-primary mx-auto mb-12"></div>
          <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-black mb-12 leading-snug tracking-tight break-keep">
            귀사의 무궁한 발전을 기원하며 <br className="hidden md:block" /> 
            <span className="text-primary">분양의 처음부터 끝까지</span> 완벽한 조력자가 되겠습니다.
          </h2>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-4 md:px-16 md:py-5 border-2 border-primary text-primary font-black text-xs md:text-sm uppercase tracking-[0.4em] hover:bg-primary hover:text-black transition-all duration-500 rounded-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;