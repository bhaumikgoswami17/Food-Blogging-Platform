import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });
    
    // Main content animation
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 100, scale: 0.9, rotationX: 45 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50, rotationY: 15 },
      { opacity: 1, y: 0, rotationY: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(buttonsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.9, rotationZ: 10 },
      { opacity: 1, y: 0, scale: 1, rotationZ: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -5, rotationY: 25 },
      { opacity: 1, scale: 1, rotation: 0, rotationY: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Floating elements animation
    gsap.fromTo(floatingElementsRef.current?.children || [], 
      { opacity: 0, scale: 0, rotation: 45 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "back.out(1.7)",
        delay: 1.5
      }
    );

    // Continuous floating animation
    gsap.to(floatingElementsRef.current?.children || [], {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      delay: 2.5
    });

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
      {/* Floating decorative elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-red-200 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-green-200 rounded-full opacity-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          <div className="space-y-8">
            <h1 
              ref={titleRef}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Delicious
              </span>
              Recipes
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
            >
              Join thousands of food lovers sharing incredible recipes, cooking tips, 
              and culinary adventures from around the world.
            </p>
            
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Start Exploring
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <button className="group bg-white text-gray-700 px-8 py-4 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-orange-300 hover:text-orange-500 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Delicious food" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Decorative cards */}
            <div className="absolute -top-8 -left-8 bg-white p-4 rounded-xl shadow-lg z-20 transform hover:rotate-3 hover:scale-110 transition-all duration-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">5-Star Recipe</span>
              </div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-xl shadow-lg z-20 transform hover:-rotate-3 hover:scale-110 transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">2.5k+</div>
                <div className="text-sm text-gray-600">Recipes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;