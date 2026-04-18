import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Vote, BarChart3, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay dark:opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-gray-800 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-gray-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            {t('hero', 'badge')}
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-tight">
            {t('hero', 'title1')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {t('hero', 'title2')}
            </span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            {t('hero', 'desc')}
          </p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link to="/vote" className="btn-primary flex items-center justify-center gap-2 text-lg">
              <Vote size={20} />
              {t('hero', 'voteNow')}
            </Link>
            <Link to="/" className="btn-secondary flex items-center justify-center gap-2 text-lg group">
              <BarChart3 size={20} className="text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              {t('hero', 'viewResults')}
              <ChevronRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden lg:block absolute top-1/4 left-[10%] glass-panel p-4 rotate-12"
      >
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
          <div className="text-sm font-medium dark:text-white">Vote Cast</div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute bottom-1/4 right-[10%] glass-panel p-4 -rotate-6"
      >
        <div className="flex flex-col gap-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">Live Turnout</div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">74.2%</div>
        </div>
      </motion.div>
    </div>
  );
}
