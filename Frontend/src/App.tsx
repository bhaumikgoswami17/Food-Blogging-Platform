// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryTabs from './components/CategoryTab';
import BlogCard from './components/BlogCard';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import { blogPosts } from './data/BlogPosts';
import { categories } from './data/Categories';

const App = () => {
  const [likedPosts, setLikedPosts] = useState(new Set<number>());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const toggleLike = (postId: number) => {
    const updated = new Set(likedPosts);
    updated.has(postId) ? updated.delete(postId) : updated.add(postId);
    setLikedPosts(updated);
  };

  const filteredPosts = activeTab === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category.toLowerCase() === activeTab);

  return (
    <div>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection />
      <CategoryTabs categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
        {filteredPosts.map(post => (
          <BlogCard key={post.id} post={post} likedPosts={likedPosts} toggleLike={toggleLike} />
        ))}
      </main>
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-rose-400 to-purple-400 text-white px-12 py-4 rounded-full font-semibold hover:from-rose-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-xl text-lg">
          Discover More Recipes
        </button>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default App;
