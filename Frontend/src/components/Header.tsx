import React from 'react';
import { Menu, X, Search } from 'lucide-react';

const Header = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (val: boolean) => void }) => (
  <header className="bg-gradient-to-r from-rose-100 to-purple-100 shadow-xl sticky top-0 z-50 border-b border-rose-200 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">🍛</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          Desi Rasoi
        </h1>
      </div>

      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-slate-700 hover:text-rose-600 font-medium">Home</a>
        <a href="#" className="text-slate-700 hover:text-rose-600 font-medium">Recipes</a>
        <a href="#" className="text-slate-700 hover:text-rose-600 font-medium">About</a>
        <a href="#" className="text-slate-700 hover:text-rose-600 font-medium">Contact</a>
      </nav>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search Indian recipes..."
            className="pl-10 pr-4 py-2 border border-rose-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-rose-400" />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-rose-100 rounded-full"
        >
          {isMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>

        <button className="hidden md:block bg-gradient-to-r from-rose-400 to-purple-400 text-white px-6 py-2 rounded-full hover:from-rose-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg">
          Share Recipe
        </button>
      </div>
    </div>
  </header>
);

export default Header;
