import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null); 
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo(logoRef.current, 
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(navRef.current?.children || [], 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(actionsRef.current?.children || [], 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div ref={logoRef} className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mr-3"></div>
            <span className="text-2xl font-bold text-gray-900">Desi Rasoi</span>
          </div>
          
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors duration-300">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors duration-300">Recipes</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors duration-300">Categories</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors duration-300">About</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors duration-300">Contact</a>
          </nav>
          
          <div ref={actionsRef} className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-orange-50">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-orange-50">
              <User size={20} />
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:text-orange-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300 rounded-full hover:bg-orange-50">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;