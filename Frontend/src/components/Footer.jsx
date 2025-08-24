import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current?.children || [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mr-3"></div>
              <span className="text-2xl font-bold">Desi Rasoi</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bringing food lovers together through incredible recipes and culinary adventures.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 hover:-translate-y-1 hover:rotate-12 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 hover:-translate-y-1 hover:rotate-12 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 hover:-translate-y-1 hover:rotate-12 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 hover:scale-110 hover:-translate-y-1 hover:rotate-12 transition-all duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Recipes</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Breakfast</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Lunch</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Dinner</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Desserts</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Beverages</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Community</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Submit Recipe</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-300">Guidelines</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 FoodieHub. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" /> for food lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;