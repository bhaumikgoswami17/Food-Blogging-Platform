import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Users, Star } from 'lucide-react';

const FeaturedPosts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  const posts = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Sarah Johnson",
      time: "25 min",
      servings: 4,
      rating: 4.8,
      description: "A healthy and flavorful bowl packed with fresh vegetables and herbs."
    },
    {
      id: 2,
      title: "Homemade Sourdough Bread",
      image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Mike Chen",
      time: "4 hrs",
      servings: 8,
      rating: 4.9,
      description: "Learn the art of baking perfect sourdough with this detailed guide."
    },
    {
      id: 3,
      title: "Spicy Thai Green Curry",
      image: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=600",
      author: "Lisa Wang",
      time: "45 min",
      servings: 6,
      rating: 4.7,
      description: "Authentic Thai flavors with coconut milk and fresh vegetables."
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
    .fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 100, scale: 0.9, rotationX: 45, rotationY: 15 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
      "-=0.4"
    );

    // Hover animations for cards
    const cards = cardsRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card) => {
        const cardElement = card;

        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-16"
        >
          Featured <span className="text-orange-500">Recipes</span>
        </h2>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{post.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{post.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{post.servings}</span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-700">by {post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;