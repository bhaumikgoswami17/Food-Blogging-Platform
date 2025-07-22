import React from 'react';

const CategoryTabs = ({ categories, activeTab, setActiveTab }: {
  categories: string[],
  activeTab: string,
  setActiveTab: (tab: string) => void
}) => (
  <section className="py-12 bg-gradient-to-r from-rose-50 to-purple-50">
    <div className="max-w-6xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-center mb-8 text-slate-700">Explore Indian Cuisine</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => {
          const tab = category.toLowerCase();
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-md ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-rose-400 to-purple-400 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

export default CategoryTabs;
