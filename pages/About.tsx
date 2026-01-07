
import React from 'react';
import { PHILOSOPHY } from '../constants';
import { Users, Layers, ShieldCheck, Briefcase } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-20 md:pt-24 bg-gray-800">
      {/* Subpage Header */}
      <div className="bg-gray-900 py-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="About Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 px-6">
            <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-4 md:mb-6 uppercase">COMPANY INTRODUCTION</h1>
            <p className="text-gray-400 tracking-[0.4em] font-light text-xs md:text-base">회사소개</p>
        </div>
      </div>

      {/* CEO Message */}
      <section className="py-20 md:py-32 bg-gray-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/5 text-[20rem] md:text-[40rem] font-serif select-none leading-none z-0 hidden lg:block">
            “
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
              <h4 className="text-primary font-bold text-sm md:text-xl mb-4 uppercase tracking-[0.3em]">CEO Message</h4>
              <h2 className="text-2xl md:text-5xl font-black leading-tight text-gray-100 break-keep">
                고객의 성공이 곧 우리의 가치입니다.
              </h2>
            </div>
            
            <div className="font-serif space-y-6 md:space-y-10 text-gray-200 text-base md:text-2xl leading-relaxed md:leading-loose text-left md:text-justify font-normal bg-gray-700/60 backdrop-blur-xl p-8 md:p-20 rounded-lg border border-white/5 shadow-2xl break-keep relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary/20"></div>
              <p>안녕하십니까? (주)미래공간개발 대표이사입니다.</p>
              <p>부동산 개발 사업은 단순한 건설을 넘어 시대적 가치와 삶의 질까지 고려해야 하는 복합적인 예술이자 과학입니다. 우리는 고객의 소중한 자산 가치를 극대화하기 위해 끊임없이 도전하고 있습니다.</p>
              <p>저희 회사의 슬로건인 <strong>'KING MAKER'</strong>는 저희의 철학을 가장 잘 보여주는 단어입니다. 고객이 시장의 주인공이 되어 가장 높은 곳에 설 수 있도록 가장 확실한 전략과 실행력으로 뒷받침하겠습니다.</p>
              <p>시행부터 분양까지 투명성과 정직을 최우선으로 하며, 데이터에 기반한 정밀한 분석을 통해 수익을 극대화하겠습니다.</p>
              <p>결과로 증명하는 (주)미래공간개발이 되겠습니다. 감사합니다.</p>
              <div className="pt-10 md:pt-16 text-right">
                <p className="text-lg md:text-2xl font-black text-gray-100">(주)미래공간개발</p>
                <p className="text-primary font-bold text-sm md:text-lg mt-2 tracking-widest">대표이사 임병섭 · 윤용석</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Optimized Padding and Text Breaking */}
      <section className="py-20 md:py-32 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-2xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-gray-100">Management Philosophy</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {PHILOSOPHY.map((item, idx) => {
              // Extract Korean and English parts from the title for better styling
              const titleMatch = item.title.match(/(.+) \[(.+)\]/);
              const mainTitle = titleMatch ? titleMatch[1] : item.title;
              const subTitle = titleMatch ? `[ ${titleMatch[2]} ]` : "";

              return (
                <div key={idx} className={`bg-gray-700/40 p-8 md:p-10 lg:p-14 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 border border-gray-700 hover:border-primary/30 rounded-sm group ${idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="mb-8 md:mb-12 relative">
                     <div className="w-20 h-20 md:w-32 md:h-32 border border-primary/20 rounded-full flex items-center justify-center group-hover:border-primary transition-colors duration-500">
                       <div className="w-16 h-16 md:w-26 md:h-26 bg-gray-600 rounded-full flex items-center justify-center shadow-2xl">
                          {React.cloneElement(item.icon, { className: "w-8 h-8 md:w-14 md:h-14 text-primary opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" })}
                       </div>
                     </div>
                  </div>
                  
                  <div className="mb-6 md:mb-8 flex flex-col items-center">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-100 break-keep">
                      {mainTitle}
                    </h3>
                    {subTitle && (
                      <span className="text-sm md:text-lg font-bold text-gray-300 mt-1 opacity-80 group-hover:text-primary transition-colors">
                        {subTitle}
                      </span>
                    )}
                  </div>

                  <h4 className="text-primary font-bold mb-6 md:mb-10 text-xs md:text-base tracking-[0.2em]">{item.subtitle}</h4>
                  <div className="text-gray-300 text-sm md:text-lg leading-relaxed font-normal space-y-4 md:space-y-6 text-left break-keep">
                    {item.desc.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Organization Chart - Tablet Friendly */}
      <section className="py-20 md:py-32 bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-2xl md:text-5xl font-black mb-6 uppercase tracking-tighter text-gray-100">Organization Chart</h2>
            <p className="text-gray-400 font-normal mb-8 text-sm md:text-xl">체계적인 시스템과 분야별 전문가들이 유기적으로 협력합니다.</p>
            <div className="w-20 h-1.5 bg-primary mx-auto"></div>
          </div>

          {/* Desktop/Tablet Chart */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative mb-20">
              <div className="bg-primary text-black px-20 py-10 rounded-sm shadow-2xl shadow-primary/20 text-center w-80 transform transition-transform hover:scale-105 z-10 relative">
                <span className="text-xs opacity-70 uppercase block mb-2 tracking-[0.3em]">Chief Executive Officer</span>
                <span className="text-4xl font-black">대표이사</span>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-700"></div>
            </div>

            <div className="flex flex-row gap-12 lg:gap-40 items-center justify-center mb-20 relative w-full">
              <div className="w-64 bg-gray-700 border border-gray-600 py-6 text-center font-bold shadow-md rounded-sm text-gray-300 text-lg">이사위원회</div>
              <div className="w-64 bg-gray-600 text-white py-6 text-center font-bold shadow-md rounded-sm text-lg">전략기획실</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-1 bg-gray-700 -z-10 hidden lg:block"></div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                { title: "개발사업본부", icon: <Layers size={32} />, teams: ["개발사업 1팀", "개발사업 2팀", "PM 사업팀"] },
                { title: "분양사업본부", icon: <Briefcase size={32} />, teams: ["분양 1팀 (주거)", "분양 2팀 (비주거)", "마케팅 전략팀"] },
                { title: "경영지원본부", icon: <ShieldCheck size={32} />, teams: ["인사/총무 팀", "재무/회계 팀", "법무지원 파트"] }
              ].map((div, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gray-700 hidden lg:block"></div>
                  <div className="w-full bg-gray-700 border-t-4 border-primary p-10 shadow-2xl">
                    <div className="flex items-center justify-center mb-8 text-primary">
                      {div.icon}
                      <h4 className="text-2xl font-black text-gray-200 ml-4">{div.title}</h4>
                    </div>
                    <ul className="space-y-4">
                      {div.teams.map((t, j) => (
                        <li key={j} className="bg-gray-600/50 p-4 text-center text-gray-200 font-bold border border-gray-600 hover:border-primary/20 transition-colors">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Chart - Vertical Stack */}
          <div className="md:hidden flex flex-col items-center gap-6">
            <div className="bg-primary text-black px-10 py-6 rounded-sm shadow-xl text-center w-full max-w-[320px]">
              <span className="text-[10px] opacity-70 uppercase block tracking-[0.3em] mb-1">CEO</span>
              <span className="text-2xl font-black">대표이사</span>
            </div>
            <div className="w-1 h-8 bg-gray-700"></div>
            <div className="flex gap-4 w-full max-w-[320px]">
              <div className="flex-1 bg-gray-700 border border-gray-600 py-4 text-center font-bold text-gray-300 text-sm">이사위원회</div>
              <div className="flex-1 bg-gray-600 py-4 text-center font-bold text-white text-sm">전략기획실</div>
            </div>
            <div className="w-1 h-8 bg-gray-700"></div>
            <div className="w-full space-y-8">
              {[
                { title: "개발사업본부", teams: ["개발사업 1/2팀", "PM 사업팀"] },
                { title: "분양사업본부", teams: ["분양 1/2팀", "마케팅 전략팀"] },
                { title: "경영지원본부", teams: ["인사/총무 팀", "재무/법무 파트"] }
              ].map((div, i) => (
                <div key={i} className="w-full bg-gray-700 border-l-8 border-primary p-8 shadow-xl rounded-sm">
                  <h4 className="text-xl font-black text-gray-100 mb-4">{div.title}</h4>
                  <div className="flex flex-wrap gap-3">
                    {div.teams.map((t, j) => <span key={j} className="bg-gray-600 px-4 py-2 text-[13px] text-gray-200 font-bold border border-gray-500">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;