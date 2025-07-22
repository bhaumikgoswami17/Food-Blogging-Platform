import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/HeroSection';
import FeaturedPosts from './components/BlogCard';
import About from './components/about';
import Categories from './components/CategoryTab';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling and global animations
    gsap.set('body', { overflow: 'hidden' });
    
    // Page load animation
    const tl = gsap.timeline();
    tl.to('body', { overflow: 'auto', duration: 0.1, delay: 0.5 });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedPosts />
      <About />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;