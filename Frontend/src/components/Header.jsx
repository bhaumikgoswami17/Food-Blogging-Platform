import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, FileSpreadsheet, User, LogOut } from 'lucide-react';
import Button from "./ui/Button";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  const userNavLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'About', path: '/about' },

  ];


  const adminNavLinks = [
    { name: 'Admin Panel', path: '/admin', icon: <BarChart2 size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-md py-2'
        : 'bg-gradient-to-r from-white-100 via-white-50 to-white-200 py-4'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mr-3"></div>
            <span className="text-2xl font-bold text-gray-900">Desi Rasoi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {(user?.role === 'admin' ? adminNavLinks : userNavLinks).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive(link.path)
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-400"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button
  variant="secondary"
  size="sm"
  className="rounded-full px-4 py-1.5 text-sm font-medium bg-white border border-orange-500 !text-black"
>
  Login
</Button>


                </Link>

                <Link to="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-full px-4 py-1.5 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Register
                  </Button>
                </Link>

              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gray-900" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 transition-all">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {(user?.role === 'admin' ? adminNavLinks : userNavLinks).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`flex items-center space-x-2 py-2 text-sm font-medium ${isActive(link.path)
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Auth buttons */}
            {user ? (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-blue-400"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.email}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="flex items-center justify-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Link to="/login" onClick={closeMenu}>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    className="rounded-md py-2 bg-gray-100  text-gray-900"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    className="rounded-md py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
