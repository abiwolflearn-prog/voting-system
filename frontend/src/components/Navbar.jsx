import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckSquare, Moon, Sun, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    if (localStorage.getItem('theme') === 'dark' || 
       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: t('navbar', 'home'), path: '/' },
    { name: t('navbar', 'elections'), path: '/vote' },
    { name: t('navbar', 'candidates'), path: '/vote' },
    { name: t('navbar', 'results'), path: '/' },
    { name: t('navbar', 'about'), path: '/' },
    { name: t('navbar', 'contact'), path: '/' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg group-hover:shadow-indigo-500/50 transition-all">
              <CheckSquare size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              WCU<span className="text-indigo-600 dark:text-indigo-400">Vote</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1.5 flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-slate-300 transition-colors text-xs font-bold uppercase tracking-wider"
              aria-label="Toggle language"
            >
              <Globe size={16} className="text-indigo-500" />
              {lang}
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-gray-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-gray-700"></div>
            <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              {t('navbar', 'login')}
            </Link>
            <Link to="/register" className="btn-primary text-sm px-4 py-2">
              {t('navbar', 'register')}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleLanguage} className="text-slate-600 dark:text-slate-300 font-bold uppercase text-xs flex gap-1 items-center">
              <Globe size={16} />{lang}
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel mx-4 mt-2 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-gray-700 flex flex-col gap-3">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 rounded-lg border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar', 'login')}
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center btn-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar', 'register')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
