
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, FileText, ExternalLink } from 'lucide-react';
import { getSiteConfig } from '../utils/storage';

const Contact: React.FC = () => {
  const [config, setConfig] = useState(getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => setConfig(getSiteConfig());
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  const naverMapsUrl = `https://map.naver.com/v5/search/${encodeURIComponent(config.address)}`;

  return (
    <div className="pt-24 bg-gray-800">
      <div className="bg-gray-900 py-20 md:py-32 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" alt="Contact Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 px-6">
          <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-4 md:mb-6 uppercase">CONTACT US</h1>
          <p className="text-gray-400 tracking-[0.4em] font-light text-xs md:text-base">오시는길</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        {/* Responsive Layout: Single Col on Mobile, 2 Cols on Tablet/Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-4xl font-black mb-10 pb-4 border-b-4 border-primary inline-block text-gray-100 tracking-tighter">LOCATION</h2>
            <p className="text-gray-300 text-base md:text-xl mb-12 font-normal leading-relaxed break-keep">
              (주)미래공간개발은 비즈니스의 중심, 가산디지털단지에 위치하고 있습니다. <br className="hidden lg:block" />
              최고의 전문 인력들과 함께 귀사의 성공적인 개발 파트너가 되어 드리겠습니다.
            </p>

            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="bg-gray-700 p-5 rounded-lg mr-6 border border-gray-600 group-hover:border-primary/50 transition-colors">
                  <MapPin className="text-primary" size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl mb-2 text-gray-100 uppercase tracking-widest">Address</h4>
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-normal">{config.address}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-gray-700 p-5 rounded-lg mr-6 border border-gray-600 group-hover:border-primary/50 transition-colors">
                  <Phone className="text-primary" size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl mb-2 text-gray-100 uppercase tracking-widest">Call Center</h4>
                  <p className="text-gray-300 text-sm md:text-lg font-bold">{config.phone}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-gray-700 p-5 rounded-lg mr-6 border border-gray-600 group-hover:border-primary/50 transition-colors">
                  <Mail className="text-primary" size={28} />
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl mb-2 text-gray-100 uppercase tracking-widest">Email</h4>
                  <p className="text-gray-300 text-sm md:text-lg font-normal">{config.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-gray-700/50 p-8 md:p-12 rounded-lg border border-gray-600 shadow-2xl">
               <h4 className="font-black text-xl md:text-2xl mb-8 flex items-center text-gray-100">
                 <FileText size={24} className="mr-4 text-primary" />
                 Business Information
               </h4>
               <ul className="space-y-4 text-sm md:text-lg text-gray-300 font-normal">
                 <li className="flex justify-between border-b border-gray-600 pb-3"><span>상호명</span> <span className="font-black text-gray-100">{config.companyName}</span></li>
                 <li className="flex justify-between border-b border-gray-600 pb-3"><span>대표자</span> <span className="font-black text-gray-100">{config.ceoName}</span></li>
                 <li className="flex justify-between"><span>사업자번호</span> <span className="font-black text-gray-100">{config.businessNumber}</span></li>
               </ul>
            </div>
          </div>

          {/* Map / Image Section */}
          <div className="order-1 md:order-2 h-[400px] md:h-[600px] lg:h-[750px] w-full bg-gray-700 rounded-lg shadow-2xl overflow-hidden relative flex flex-col group border border-gray-600">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80')", filter: 'grayscale(0.5) brightness(0.5)' }}></div>
            <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-10 text-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <MapPin className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter">{config.companyName}</h3>
              <p className="text-gray-200 text-sm md:text-xl leading-relaxed font-normal max-w-sm mx-auto opacity-80">{config.address}</p>
            </div>
            <a href={naverMapsUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 block w-full text-center bg-primary hover:bg-yellow-300 text-black font-black py-6 md:py-8 transition-all flex items-center justify-center text-sm md:text-xl uppercase tracking-[0.3em]">
              <ExternalLink size={20} className="mr-3" /> Navigation Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;