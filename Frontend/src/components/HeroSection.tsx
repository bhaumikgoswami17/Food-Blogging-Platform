import React from 'react';

const HeroSection = () => (
  <section className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 text-white py-24 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-white/10"></div>
    <div className="relative max-w-6xl mx-auto px-4">
      <h2 className="text-6xl font-bold mb-6 drop-shadow-lg">Authentic Indian Flavors</h2>
      <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
        Discover the magic of traditional Indian cooking with easy recipes, secret spices, and stories from our kitchen to yours!
      </p>
      <button className="bg-white text-rose-600 px-10 py-4 rounded-full font-semibold hover:bg-rose-50 transition-all transform hover:scale-105 shadow-2xl text-lg">
        Start Cooking Today
      </button>
    </div>
  </section>
);

export default HeroSection;
