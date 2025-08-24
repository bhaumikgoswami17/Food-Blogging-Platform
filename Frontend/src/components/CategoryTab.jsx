import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Categories = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Breakfast",
      image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "250+ recipes"
    },
    {
      id: 2,
      name: "Desserts",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "180+ recipes"
    },
    {
      id: 3,
      name: "Main Course",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "420+ recipes"
    },
    {
      id: 4,
      name: "Appetizers",
      image: "https://images.pexels.com/photos/1833336/pexels-photo-1833336.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "160+ recipes"
    },
    {
      id: 5,
      name: "Beverages",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "90+ recipes"
    },
    {
      id: 6,
      name: "Salads",
      image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
      count: "130+ recipes"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(gridRef.current?.children || [],
        { opacity: 0, y: 100, scale: 0.8, rotation: 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)"
        },
        "-=0.4"
      );

    const cards = gridRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card) => {
        const cardElement = card;
        const image = cardElement.querySelector('img');
        const overlay = cardElement.querySelector('.category-overlay');

        cardElement.addEventListener('mouseenter', () => {
          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.4,
              ease: "power2.out"
            });
          }
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.8,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        cardElement.addEventListener('mouseleave', () => {
          if (image) {
            gsap.to(image, {
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          }
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.6,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-6"
        >
          Recipe <span className="text-orange-500">Categories</span>
        </h2>

        {/* Indian Cuisine Box with Button-style Links */}
        <div className="max-w-2xl mx-auto mb-12 p-6">
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              All
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              North Indian
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              South Indian
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Street Food
            </a>
            <a
              href="#"
              className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Indian Sweets
            </a>
          </div>
        </div>

        {/* Recipe Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 hover:-rotate-2 hover:shadow-2xl transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="aspect-square relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                />
                <div className="category-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

                <div className="absolute bottom-6 left-6 text-white transform group-hover:translate-y-2 group-hover:scale-110 transition-all duration-300">
                  <h3 className="text-xl lg:text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/90 text-sm">{category.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;