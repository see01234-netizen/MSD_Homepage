
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock } from 'lucide-react';
import { getSiteConfig } from '../utils/storage';

const Footer: React.FC = () => {
  const [config, setConfig] = useState(getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => setConfig(getSiteConfig());
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-8">
              <span className="font-black text-2xl tracking-tighter text-white">
                {config.companyName}
              </span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed mb-6">
              미래를 선도하는 부동산 개발의 동반자.<br />
              정직과 신뢰를 바탕으로 고객 가치를 실현합니다.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-primary pl-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-5 text-gray-200 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-primary flex-shrink-0" />
                <span className="leading-snug">{config.address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-primary" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-primary" />
                <span>{config.email}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-primary pl-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-4 text-gray-200 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">회사소개</Link></li>
              <li><Link to="/business" className="hover:text-primary transition-colors">주요사업</Link></li>
              <li><Link to="/performance" className="hover:text-primary transition-colors">사업실적</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">오시는길</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-primary pl-4 uppercase tracking-wider">Business Info</h4>
            <ul className="space-y-4 text-gray-200 text-sm">
              <li className="flex justify-between border-b border-gray-700 pb-2"><span>사업자번호</span> <span>{config.businessNumber}</span></li>
              <li className="flex justify-between border-b border-gray-700 pb-2"><span>대표이사</span> <span>{config.ceoName}</span></li>
              <li className="flex justify-between"><span>상호명</span> <span>{config.companyName}</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[11px] font-medium tracking-widest uppercase">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© 2024 {config.companyName.replace('(주)', '')} co., Ltd. All rights reserved.</p>
            <Link to="/login" className="flex items-center gap-1.5 text-gray-700 hover:text-primary transition-colors">
              <Lock size={12} />
              <span>관리자 로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;