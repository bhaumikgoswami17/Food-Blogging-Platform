import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Users, BookOpen, Award } from 'lucide-react';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { icon: Heart, value: "50k+", label: "Happy Cooks" },
    { icon: BookOpen, value: "2.5k+", label: "Recipes" },
    { icon: Users, value: "100+", label: "Expert Chefs" },
    { icon: Award, value: "5 Star", label: "Average Rating" }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(contentRef.current,
      { opacity: 0, x: -100, rotationY: -25 },
      { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { opacity: 0, x: 100, rotation: 5, rotationY: 25 },
      { opacity: 1, x: 0, rotation: 0, rotationY: 0, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(statsRef.current?.children || [],
      { opacity: 0, y: 50, scale: 0.8, rotationX: 45 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Number counting animation
    stats.forEach((stat, index) => {
      const element = statsRef.current?.children[index]?.querySelector('.stat-value');
      if (element) {
        const finalValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
        gsap.fromTo(element, 
          { innerText: 0 },
          {
            innerText: finalValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            onUpdate: function() {
              const currentValue = Math.round(this.targets()[0].innerText);
              element.textContent = stat.value.includes('k') ? `${currentValue}k+` : 
                                   stat.value.includes('Star') ? `${currentValue} Star` : 
                                   `${currentValue}+`;
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Where Food Lovers
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Connect & Create
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              FoodieHub is more than just a recipe platform. We're a community of passionate 
              food enthusiasts sharing culinary adventures, family traditions, and innovative 
              creations that bring people together around the table.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Driven</h3>
                  <p className="text-gray-600">Real recipes from real home cooks</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Tested</h3>
                  <p className="text-gray-600">Every recipe is tested and perfected</p>
                </div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Cooking together" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg transform hover:scale-110 hover:-translate-y-4 hover:rotate-2 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="stat-value text-3xl font-bold text-gray-900 mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;