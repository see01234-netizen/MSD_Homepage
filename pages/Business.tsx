
import React from 'react';
import { BUSINESS_SCOPE } from '../constants';
import { CheckCircle2, Phone } from 'lucide-react';

const Business: React.FC = () => {
  return (
    <div className="pt-24 bg-gray-800">
      {/* Subpage Header */}
      <div className="bg-gray-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-tight mb-4 uppercase">MAJOR BUSINESS</h1>
            <p className="text-gray-300 tracking-[0.3em] font-light">주요사업</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-center text-lg md:text-xl text-gray-200 mb-20 md:mb-24 max-w-4xl mx-auto leading-relaxed font-normal">
          (주)미래공간개발은 <span className="text-primary font-bold">부동산 개발, 분양대행, 개발자문</span>을 중심으로 <br />
          부동산 영역 전반에 걸쳐 수준 높은 프로젝트 수행 능력을 보유하고 있습니다.
        </p>

        {BUSINESS_SCOPE.map((biz, idx) => (
          <section id={biz.id} key={biz.id} className={`py-20 flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20 border-b border-gray-700 last:border-0`}>
            <div className="w-full md:w-1/2">
               <div className="relative group overflow-hidden rounded-md shadow-2xl">
                <img 
                    src={biz.imageUrl} 
                    alt={biz.title} 
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                
                {/* Floating Premium Emblem Box - Semi-translucent Icon */}
                <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 z-20 transform transition-all duration-500 group-hover:-translate-y-4">
                  <div className="relative p-[1px] bg-gradient-to-br from-[#E2C38E] via-[#C5A059] to-[#8B6D31] rounded-sm shadow-[0_15px_50px_rgba(197,160,89,0.3)] group-hover:shadow-[0_20px_60px_rgba(197,160,89,0.5)]">
                    <div className="bg-gray-800/90 backdrop-blur-md p-6 md:p-8 flex items-center justify-center">
                      <div className="text-primary opacity-80 transform transition-all group-hover:scale-110 group-hover:opacity-100 duration-500">
                        {React.cloneElement(biz.icon as React.ReactElement, { size: 48, strokeWidth: 1.5 })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative border */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none opacity-50"></div>
               </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-0.5 bg-primary mr-4"></div>
                <h3 className="text-primary text-sm font-black uppercase tracking-[0.3em]">{biz.subtitle}</h3>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-black mb-10 text-gray-100 tracking-tighter">{biz.title}</h2>
              <p className="text-gray-200 text-lg mb-12 font-normal leading-relaxed">
                {biz.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-14">
                {biz.scope.map((s, i) => (
                  <div key={i} className="flex items-center text-gray-200 bg-gray-700/50 p-3 rounded-sm border-l-4 border-primary/20 hover:border-primary transition-all">
                    <CheckCircle2 size={18} className="text-primary mr-4 flex-shrink-0" />
                    <span className="font-bold text-base">{s}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-black mb-8 flex items-center text-gray-300 tracking-widest uppercase">
                  <span className="mr-4">Work Flow Process</span>
                  <div className="flex-grow h-[1px] bg-gray-700"></div>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {biz.workflow.map((step, i) => (
                    <div key={i} className="bg-gray-700 border border-gray-600 p-4 text-[13px] font-bold text-gray-300 rounded-sm shadow-sm hover:shadow-md hover:border-primary/20 transition-all text-center">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
      
      {/* Bottom Contact CTA */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-8 text-gray-100">성공적인 비즈니스를 위한 최고의 파트너</h2>
            <p className="text-gray-300 mb-12 font-normal">
                (주)미래공간개발은 고객의 비전을 현실로 만드는 전문성을 갖추고 있습니다.<br />
                궁금한 점이 있으시면 언제든지 연락주세요.
            </p>
            <div className="inline-flex flex-col items-center justify-center gap-4 bg-gray-700 p-8 rounded-lg shadow-lg border border-gray-600">
                <p className="text-gray-300 text-sm font-bold tracking-widest uppercase">대표 상담 전화</p>
                <div className="flex items-center text-4xl md:text-5xl font-black text-primary tracking-tight">
                    <Phone size={32} className="mr-4" />
                    1688-9641
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Business;