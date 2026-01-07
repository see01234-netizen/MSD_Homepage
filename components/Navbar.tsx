
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings } from 'lucide-react';
import { getSiteConfig } from '../utils/storage';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState(getSiteConfig());
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const checkAdmin = () => setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    checkAdmin();
    
    const handleConfigUpdate = () => setConfig(getSiteConfig());
    window.addEventListener('siteConfigUpdated', handleConfigUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('siteConfigUpdated', handleConfigUpdate);
    };
  }, [location]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: '회사소개', path: '/about' },
    { name: '주요사업', path: '/business' },
    { name: '사업실적', path: '/performance' },
    { name: '오시는길', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-gray-800/90 border-b border-gray-700 shadow-lg' : 'py-4 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="font-black text-2xl tracking-tighter text-gray-100 group-hover:text-primary transition-colors duration-300">
                {config.companyName}
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-1 py-2 text-sm font-bold tracking-widest transition-all relative group ${
                    location.pathname === link.path 
                      ? 'text-primary' 
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-left ${
                    location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Settings size={14} /> 관리자
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-primary hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 bg-gray-800/95 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full">
            {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-5 text-center text-2xl font-bold transition-all duration-300 ease-in-out w-full ${location.pathname === link.path ? 'text-primary' : 'text-gray-300 hover:text-primary'}`}
                >
                  {link.name}
                </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-5 text-center text-xl font-bold text-primary mt-4 border-t border-gray-700 w-full">관리자 대시보드</Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;