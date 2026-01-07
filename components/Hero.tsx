
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSiteConfig } from '../utils/storage';

const Hero: React.FC = () => {
  const [config, setConfig] = useState(getSiteConfig());

  useEffect(() => {
    const handleUpdate = () => setConfig(getSiteConfig());
    window.addEventListener('siteConfigUpdated', handleUpdate);
    return () => window.removeEventListener('siteConfigUpdated', handleUpdate);
  }, []);

  return (
    <div className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto-format&fit=crop&w=1920&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-gray-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h2 className="text-primary text-sm sm:text-base md:text-xl font-bold mb-3 md:mb-4 tracking-[0.2em] md:tracking-[0.3em] opacity-90 uppercase">
          {config.heroSubtitle}
        </h2>
        <h1 className="text-white text-3xl sm:text-5xl lg:text-7xl font-black mb-6 md:mb-8 tracking-tighter leading-[1.2] md:leading-[1.15] whitespace-pre-line break-keep">
          {config.heroTitle}
        </h1>
        <p className="text-gray-100 text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed break-keep [text-shadow:0_2px_10px_rgba(0,0,0,0.7)]">
          {config.heroDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Link to="/about" className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 bg-primary text-black font-bold text-sm md:text-base rounded-sm hover:bg-yellow-300 transition-all shadow-lg shadow-primary/10">
            회사 소개
          </Link>
          <Link to="/performance" className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 bg-transparent border border-primary/50 text-primary font-bold text-sm md:text-base rounded-sm hover:bg-primary hover:text-black transition-all">
            주요 실적 확인
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-white w-8 h-8 md:w-10 md:h-10 opacity-30" />
      </div>
    </div>
  );
};

export default Hero;